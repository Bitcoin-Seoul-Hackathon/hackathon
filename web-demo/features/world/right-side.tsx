"use client";

import { BoxContainer } from "@/components/custom/container";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const invoices = [
  {
    name: "Jake",
    game: "Doki meki Band Club",
    points: 12322,
  },
  {
    name: "Aiiden",
    game: "Space war",
    points: 10122,
  },
  {
    name: "Polili",
    game: "Space war",
    points: 9123,
  },
];
export default function RightSideCards() {
  return (
    <div className={"sm:col-span-2 flex flex-col gap-2.5"}>
      <BoxContainer title={"My Digital Physics Point"}>
        <div
          className={
            "relative px-2 py-3 flex items-center gap-3 z-10 rounded-md"
          }
        >
          <img
            className={"z-0 absolute inset-0 w-full h-full object-cover"}
            src={"/bg-spacewar.png"}
            alt={"the-galactic"}
          />
          <Avatar>
            <img
              src={"/avatar-space.png"}
              alt={"space"}
              width={48}
              height={48}
            />
          </Avatar>
          <div className={"flex flex-col gap-3 z-10"}>
            <p className={"text-xs font-semibold"}>Space War: The galatic</p>
            <p className={"text-lg font-semibold"}>320 Pt</p>
          </div>
        </div>
        <div
          className={
            "relative -mt-3 px-2 py-3 flex items-center gap-3 z-10 border border-purple-600 rounded-md"
          }
        >
          <img
            className={"z-0 absolute inset-0 w-full h-full object-cover"}
            src={"/bg-dokimeki.png"}
            alt={"dokimeki"}
          />
          <Avatar>
            <img
              src={"/avatar-doki.png"}
              alt={"space"}
              width={48}
              height={48}
            />
          </Avatar>
          <div className={"flex flex-col gap-3 z-10"}>
            <p className={"text-xs font-semibold"}>Doki Meki Band club</p>
            <p className={"text-lg font-semibold"}>12,322 Pt</p>
          </div>
          <Badge
            className={"bg-purple-600 absolute top-0 right-0 -translate-y-1/2"}
          >
            1st Place
          </Badge>
        </div>
        <div className={"flex items-center gap-2 justify-between"}>
          <small>
            Wanna
            <br />
            get more point?
          </small>
          <Link href={"https://store.steampowered.com/"} target={"_blank"}>
            <Button>Play More Games</Button>
          </Link>
        </div>
      </BoxContainer>
      <BoxContainer title={"Leaderboard"} subtitle={"Check your world rank"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Game</TableHead>
              <TableHead className="text-right">Point</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, i) => (
              <TableRow className={"text-xs"} key={i}>
                <TableCell className="font-medium">{invoice.name}</TableCell>
                <TableCell className={"truncate"}>{invoice.game}</TableCell>
                <TableCell className="text-right">
                  {invoice.points.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </BoxContainer>
    </div>
  );
}
