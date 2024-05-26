import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "./(font)/Pretendard-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./(font)/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./(font)/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./(font)/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./(font)/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./(font)/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./(font)/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./(font)/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./(font)/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--pretendard",
});

export const metadata: Metadata = {
  title: { template: "%s, AutoBitWorld", default: "Hello, AutoBitWorld" },
  description: "Blockchain Gaming Studio with bitcoin environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn([pretendard.variable, "font-pretendard bg-gray-50"])}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
