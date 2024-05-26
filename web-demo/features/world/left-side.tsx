"use client";

import { BoxContainer } from "@/components/custom/container";
import { Icons } from "@/components/custom/icons";
import { Button } from "@/components/ui/button";
import {
  DepositButton,
  WithdrawalButton,
} from "@/features/world/popover-buttons";
import { useEffect, useState } from "react";

function convertSatoshisToBTC(satoshis: number): number {
  return satoshis / 100000000;
}

const chatLogs = [
  {
    profile: "/avatar-polili.png",
    name: "Polili",
    text: "Hey, How are you?",
  },
  {
    profile: "/avatar-04.png",
    name: "Aiiiden",
    text: "I need your power bro!",
  },
];

export default function LeftSideCards() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!window?.okxwallet?.bitcoin) {
      return;
    }
    window.okxwallet.bitcoin
      .getBalance()
      .then(
        (res: { confirmed: number; unconfirmed: number; total: number }) => {
          console.log(res);
          setBalance(res.total);
        }
      );
  }, []);

  return (
    <div className={"sm:col-span-2 flex flex-col gap-2.5"}>
      <BoxContainer title={"Assets"}>
        <div
          className={"p-2 flex items-center gap-3 bg-gray-100 font-semibold"}
        >
          <Icons.bitcoin />
          {balance !== null ? convertSatoshisToBTC(balance) : "-"} BTC
        </div>
        <div className={"flex items-center gap-2 self-end"}>
          <DepositButton />
          <WithdrawalButton />
        </div>
      </BoxContainer>
      <BoxContainer
        title={"Contact Friends on World"}
        subtitle={`Connect with friends you've met in game`}
      >
        <div className={"flex flex-col gap-2"}>
          {chatLogs.map((chat) => (
            <div className={"flex items-center gap-2.5"} key={chat.name}>
              <img
                className={"rounded-full"}
                src={chat.profile}
                alt={chat.profile}
                width={48}
                height={48}
              />
              <div className={"flex flex-col gap-1"}>
                <p className={"text-sm font-semibold"}>{chat.name}</p>
                <p className={"text-xs truncate bg-gray-100 w-full px-2 py-1"}>
                  {chat.text}
                </p>
              </div>
            </div>
          ))}
          <Button className={"mt-4"} disabled>
            Coming soon...
          </Button>
        </div>
      </BoxContainer>
      <BoxContainer
        title={"Marketplace"}
        subtitle={"Purchase world item for the next!"}
      >
        <div className="flex flex-col gap-4">
          <div className={"flex items-center gap-2.5"}>
            <img
              className={"rounded-full"}
              src={"/avatar-bomb.png"}
              alt={"avatar-bomb"}
              width={48}
              height={48}
            />
            <div className={"flex flex-col gap-1"}>
              <p className={"text-sm font-semibold"}>Nuclear bomb</p>
              <div className={"flex items-center gap-1 font-semibold"}>
                <Icons.bitcoin className={"size-4"} />
                0.0001 BTC
              </div>
            </div>
          </div>
          <div className={"flex items-center gap-2.5"}>
            <img
              className={"rounded-full"}
              src={"/avatar-meteor.png"}
              alt={"avatar-meteor"}
              width={48}
              height={48}
            />
            <div className={"flex flex-col gap-1"}>
              <p className={"text-sm font-semibold"}>Meteor</p>
              <div className={"flex items-center gap-1 font-semibold"}>
                <Icons.bitcoin className={"size-4"} />
                0.003 BTC
              </div>
            </div>
          </div>
        </div>
        <Button disabled>Coming soon...</Button>
      </BoxContainer>
    </div>
  );
}
