"use client";

import { Button } from "@/components/ui/button";
import { toSimpleHash } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LOCAL_WALLET_KEY = "_my-bitcoin-wallet";

export default function OKXButton() {
  const router = useRouter();
  const [isInstalled, setIsInstalled] = useState(false);
  const [address, setAddress] = useState("");

  const handleOnclick = async () => {
    if (window.okxwallet.isconnected) {
      router.push("/passport");
      return;
    }

    if (window.okxwallet.bitcoin) {
      await window.okxwallet.bitcoin.connect();
      const wallets = await window.okxwallet.bitcoin.requestAccounts();
      const result = await window.okxwallet.bitcoin.signMessage(
        `Let's dive to AutoBitWorld service.\n` + `Are u ready?`,
        "ecdsa"
      );
      window.localStorage.setItem(LOCAL_WALLET_KEY, wallets[0]);
      setAddress(wallets[0]);
      router.push("/passport");
    }
  };

  useEffect(() => {
    if (typeof window.okxwallet !== "undefined") {
      setIsInstalled(true);
    }

    const wallet = window.localStorage.getItem(LOCAL_WALLET_KEY);
    if (wallet && wallet.length > 0) {
      setAddress(wallet);
    }
  }, []);

  if (!isInstalled) {
    <Button
      onClick={() => {
        window.open("https://www.okx.com/web3", "_blank");
      }}
    >
      Go to install OKX Wallet
    </Button>;
  }
  return (
    <Button onClick={handleOnclick}>
      {address ? toSimpleHash(address) : "Connect Bitcoin Wallet"}
    </Button>
  );
}
