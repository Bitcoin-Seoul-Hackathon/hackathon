"use client";

import { BoxContainer } from "@/components/custom/container";
import { LOCAL_WALLET_KEY } from "@/components/custom/okx-button";
import { Button } from "@/components/ui/button";
import { MailIcon, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PassportCard() {
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const savedAddress = window.localStorage.getItem(LOCAL_WALLET_KEY);
    setAddress(savedAddress);
  }, []);

  return (
    <BoxContainer className={"relative sm:col-span-4"}>
      <img
        src={"passport.png"}
        alt={"passport-bg"}
        className={"absolute inset-0 z-0 w-full h-full object-cover"}
      />
      <header className={"flex justify-between gap-4 z-10"}>
        <h2 className={"text-lg font-semibold"}>Passport</h2>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={async () => {
            window.localStorage.removeItem(LOCAL_WALLET_KEY);
            if (window?.okxwallet?.bitcoin) {
              await window.okxwallet.bitcoin.disconnect();
            }

            router.push("/login");
          }}
        >
          Leave World
        </Button>
      </header>
      <div className={"flex items-start gap-8 z-10"}>
        <img
          className={"rounded-full"}
          src={"/avatar-02.png"}
          alt={"sample-avatar"}
          width={80}
          height={80}
        />
        <div className={"flex flex-col gap-2.5 justify-between h-full"}>
          <p>Jake Choi</p>
          <div className={"flex items-start sm:items-center gap-3"}>
            <MailIcon className={"mt-0.5 sm:mt-0 w-3.5 h-3.5 shrink-0"} />
            <small className="break-all">jake@protonmail.com</small>
          </div>
          <div className={"flex items-start sm:items-center gap-3"}>
            <Wallet className={"mt-0.5 sm:mt-0 w-3.5 h-3.5 shrink-0"} />
            <small className="break-all">{address}</small>
          </div>
        </div>
      </div>
    </BoxContainer>
  );
}
