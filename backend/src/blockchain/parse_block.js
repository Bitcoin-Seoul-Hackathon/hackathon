import bitcoin from 'bitcoinjs-lib';
import fs from 'fs';
import fetch, { Headers } from 'node-fetch';

// Request headers
const headers = new Headers();
headers.append('Content-Type', 'application/json');

// Function to get JSON-RPC response
const rpcRequest = async (method, params) => {
  const body = JSON.stringify({ method, params });
  const response = await (
    await fetch('https://lb.drpc.org/ogrpc?network=bitcoin-testnet&dkey=Ani0sA5_DkuLnL03Wv-Q6J0RGuOOGwAR77mQsvbGyHm5', {
      method: 'POST',
      headers,
      body,
    })
  ).json();
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.result;
};

// Read the last checked block number from JSON file
const getLastCheckedBlockNumber = () => {
  try {
    const data = fs.readFileSync('last_checked_block.json', 'utf8');
    return JSON.parse(data).lastCheckedBlock;
  } catch (err) {
    return 0;
  }
};

// Save the last checked block number to JSON file
const saveLastCheckedBlockNumber = (blockNumber) => {
  const data = JSON.stringify({ lastCheckedBlock: blockNumber });
  fs.writeFileSync('last_checked_block.json', data, 'utf8');
};

// Read wallet addresses from JSON file
const getWalletAddresses = () => {
  try {
    const data = fs.readFileSync('wallet_addresses.json', 'utf8');
    return JSON.parse(data).addresses;
  } catch (err) {
    return [];
  }
};

// Helper function to decode output script
const decodeOutputScript = (script) => {
  try {
    return bitcoin.address.fromOutputScript(script, bitcoin.networks.testnet);
  } catch (e) {
    const scriptChunks = bitcoin.script.decompile(script);
    if (!scriptChunks) return 'Non-standard script';
    // P2SH
    if (
      scriptChunks.length === 3 &&
      scriptChunks[0] === bitcoin.opcodes.OP_HASH160 &&
      scriptChunks[2] === bitcoin.opcodes.OP_EQUAL
    ) {
      const redeemScriptHash = scriptChunks[1];
      return bitcoin.address.toBase58Check(redeemScriptHash, bitcoin.networks.testnet.scriptHash);
    }
    // P2WPKH
    if (scriptChunks[0] === bitcoin.opcodes.OP_0 && scriptChunks[1].length === 20) {
      return bitcoin.address.fromWitnessPubKeyHash(scriptChunks[1], bitcoin.networks.testnet);
    }
    // P2WSH
    if (scriptChunks[0] === bitcoin.opcodes.OP_0 && scriptChunks[1].length === 32) {
      return bitcoin.address.fromWitnessScriptHash(scriptChunks[1], bitcoin.networks.testnet);
    }
    return 'Non-standard script';
  }
};

// Function to get transaction details from txid
const getTransactionDetails = async (txid) => {
  const rawTx = await rpcRequest('getrawtransaction', [txid, true]);
  return rawTx;
};

// Function to process a block and print transaction details
const processBlock = async (blockHash) => {
  const block = await rpcRequest('getblock', [blockHash]);
  const txHashes = block.tx;

  const transactions = await Promise.all(
    txHashes.map(async (txid) => {
      const txDetails = await getTransactionDetails(txid);
      const tx = bitcoin.Transaction.fromHex(txDetails.hex);

      // Get input details
      const inputs = await Promise.all(
        tx.ins.map(async (input) => {
          const inputTxid = Buffer.from(input.hash).reverse().toString('hex');
          const index = input.index;

          // Check if the input is a coinbase transaction
          if (inputTxid === '0000000000000000000000000000000000000000000000000000000000000000') {
            return {
              hash: inputTxid,
              index: index,
              script: input.script.toString('hex'),
              sequence: input.sequence,
              address: 'Coinbase',
              value: 0,
            };
          }

          let inputTx;
          try {
            inputTx = await getTransactionDetails(inputTxid);
          } catch (e) {
            console.error(`Error fetching input transaction ${inputTxid}: ${e.message}`);
            return {
              hash: inputTxid,
              index: index,
              script: input.script.toString('hex'),
              sequence: input.sequence,
              address: 'Unknown',
              value: 0,
            };
          }
          const inputTxOut = inputTx.vout[index];
          if (!inputTxOut) {
            console.error(`Transaction output not found for input ${inputTxid} index ${index}`);
            return {
              hash: inputTxid,
              index: index,
              script: input.script.toString('hex'),
              sequence: input.sequence,
              address: 'Unknown',
              value: 0,
            };
          }
          let address;
          try {
            address = decodeOutputScript(Buffer.from(inputTxOut.scriptPubKey.hex, 'hex'));
          } catch (e) {
            address = 'Non-standard script';
          }
          return {
            hash: inputTxid,
            index: index,
            script: input.script.toString('hex'),
            sequence: input.sequence,
            address: address,
            value: inputTxOut.value * 1e8, // Convert BTC to satoshis
          };
        })
      );

      // Get output details
      const outputs = tx.outs.map((out) => {
        let address;
        try {
          address = decodeOutputScript(out.script);
        } catch (e) {
          address = 'Non-standard script';
        }
        return {
          value: out.value,
          script: out.script.toString('hex'),
          address: address,
        };
      });

      // Print all transactions
      console.log(`Transaction ${txid}:`);
      const senders = inputs.map((input) => ({
        address: input.address,
        amount: input.value,
      }));
      const receivers = outputs.map((output) => ({
        address: output.address,
        amount: output.value,
      }));

      senders.forEach((sender) => {
        console.log(`  Sender: ${sender.address}, Amount: ${sender.amount} satoshis`);
      });

      receivers.forEach((receiver) => {
        console.log(`  Receiver: ${receiver.address}, Amount: ${receiver.amount} satoshis`);
      });

      return { inputs, outputs };
    })
  );

  console.log(`Block ${block.height} processed.`);
};

// Main function to periodically check for new blocks and process them
const checkForNewBlocks = async () => {
  const latestBlockNumber = await rpcRequest('getblockcount');
  let lastCheckedBlockNumber = getLastCheckedBlockNumber();

  if (lastCheckedBlockNumber === 0) {
    // Initial sync: process the latest block
    const blockHash = await rpcRequest('getblockhash', [latestBlockNumber]);
    console.log(`Initial sync, processing latest block ${latestBlockNumber}: ${blockHash}`);
    await processBlock(blockHash);
    saveLastCheckedBlockNumber(latestBlockNumber);
  } else if (latestBlockNumber > lastCheckedBlockNumber) {
    for (let i = lastCheckedBlockNumber + 1; i <= latestBlockNumber; i++) {
      const blockHash = await rpcRequest('getblockhash', [i]);
      console.log(`Processing block ${i}: ${blockHash}`);
      await processBlock(blockHash);
      saveLastCheckedBlockNumber(i);
    }
  } else {
    console.log('No new blocks to process');
  }
};

// Periodically check for new blocks every 2 seconds
setInterval(checkForNewBlocks, 2000);
