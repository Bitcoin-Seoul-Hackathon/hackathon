import { Icons } from "@/components/custom/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRightSquare, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen py-20 px-2 sm:px-0 max-w-screen-sm mx-auto">
      <header className="pb-10">
        <Icons.logo />
      </header>
      <div className="flex flex-col">
        <Card className="h-80 sm:h-60 flex items-center relative overflow-hidden">
          <CardHeader className="flex flex-col gap-4">
            <CardTitle className="text-4xl font-bold relative z-10">
              The Vanguard of <br />
              Autonomous Worlds, <br />
              using Bitcoin.
            </CardTitle>
            <Link
              href="/login"
              className={buttonVariants({
                size: "lg",
                className: "z-10 w-40",
              })}
            >
              Enter World
            </Link>
          </CardHeader>
          <video
            playsInline
            autoPlay
            muted
            loop
            className="w-72 absolute -right-20 -bottom-20 z-0 opacity-70"
          >
            {/* webm */}
            <source src="/autobit-world.webm" type="video/webm" />
          </video>
        </Card>

        <article>
          <header className="pt-20 pb-7">
            <h3 className="text-4xl font-bold text-center">Features</h3>
          </header>
          <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="border rounded-lg p-6 flex flex-col gap-6 bg-white">
                <Image
                  className="mx-auto"
                  src="/features/feature-1.png"
                  width={160}
                  height={120}
                  alt="Passport"
                />
                <div>
                  <h4 className="text-lg font-semibold">Passport</h4>
                  <p className="text-sm text-gray-400">
                    Secure your identity with AutoBit Passport. Experience
                    seamless and private authentication using your Bitcoin
                    wallet.
                  </p>
                </div>
              </li>
              <li className="border rounded-lg p-6 flex flex-col gap-6 bg-white">
                <Image
                  className="mx-auto"
                  src="/features/feature-2.png"
                  width={160}
                  height={120}
                  alt="Vault"
                />
                <div>
                  <h4 className="text-lg font-semibold">Vault</h4>
                  <p className="text-sm text-gray-400">
                    Safeguard your assets with AutoBit Vault. Manage and store
                    your Bitcoin securely with ease.
                  </p>
                </div>
              </li>
              <li className="border rounded-lg p-6 flex flex-col gap-6 bg-white">
                <Image
                  className="mx-auto"
                  src="/features/feature-3.png"
                  width={160}
                  height={120}
                  alt="Gateway"
                />
                <div>
                  <h4 className="text-lg font-semibold">Gateway</h4>
                  <p className="text-sm text-gray-400">
                    Effortlessly convert fiat to Bitcoin and vice versa. Use
                    GenesisGateway for deposits and ExodusPath for withdrawals.
                  </p>
                </div>
              </li>
              <li className="border rounded-lg p-6 flex flex-col gap-6 bg-white">
                <Image
                  className="mx-auto"
                  src="/features/feature-4.png"
                  width={160}
                  height={120}
                  alt="Portal"
                />
                <div>
                  <h4 className="text-lg font-semibold">Portal</h4>
                  <p className="text-sm text-gray-400">
                    Connect seamlessly with various Web2 services using AutoBit
                    Portal. Utilize Bitcoin identity for easy and secure logins.
                  </p>
                </div>
              </li>
              <li className="border rounded-lg p-6 flex flex-col gap-6 bg-white">
                <Image
                  className="mx-auto"
                  src="/features/feature-5.png"
                  width={160}
                  height={120}
                  alt="Digital Physics"
                />
                <div>
                  <h4 className="text-lg font-semibold">Digital Physics</h4>
                  <p className="text-sm text-gray-400">
                    Experience in-world interactions. All logic and data stored
                    and managed on the blockchain.
                  </p>
                </div>
              </li>
              <li className="border rounded-lg p-6 flex flex-col gap-6 bg-white">
                <Image
                  className="mx-auto"
                  src="/features/feature-6.png"
                  width={160}
                  height={120}
                  alt="Sanctum"
                />
                <div>
                  <h4 className="text-lg font-semibold">Sanctum</h4>
                  <p className="text-sm text-gray-400">
                    Empower your development with Sanctum. Access APIs and SDKs
                    to build and innovate within AutoBitWorld.
                  </p>
                </div>
              </li>
              <li className="border sm:col-span-2 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6 bg-white">
                <Image
                  className="mx-auto"
                  src="/features/feature-7.png"
                  width={160}
                  height={120}
                  alt="Sanctum"
                />
                <div>
                  <h4 className="text-lg font-semibold">Quest</h4>
                  <p className="text-sm text-gray-400">
                    Learn and earn with Quest. Complete educational modules on
                    Bitcoin and blockchain technology and get rewarded.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </article>
        <article className="py-14">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold relative z-10 leading-snug text-center">
                Learn more about <br />
                Autonomous Worlds
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link
                href="https://www.coindesk.com/consensus-magazine/2023/10/31/in-cryptos-autonomous-worlds-creators-are-architects-and-users-are-stakeholders/"
                className={buttonVariants({
                  size: "lg",
                  className: "gap-3",
                })}
                rel="noopener noreferrer"
                target="_blank"
              >
                Read Article <ArrowUpRightSquare className="w-3" />
              </Link>
            </CardContent>
          </Card>
        </article>

        <article className="bg-white border  flex items-center justify-between p-6 rounded-lg">
          <h3 className="text-base font-semibold">Contact Us</h3>
          <Link
            href="mailto:web3isthefuture@gmail.com"
            className={buttonVariants({
              size: "lg",
              className: "gap-3",
            })}
          >
            Contact <MailIcon className="w-3" />
          </Link>
        </article>
      </div>
    </main>
  );
}
