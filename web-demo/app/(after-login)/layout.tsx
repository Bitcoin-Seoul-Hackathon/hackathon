import { Icons } from '@/components/custom/icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My, AutoBitWorld',
  description: 'Blockchain Gaming Studio with bitcoin environment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={'flex flex-col gap-8 mx-auto w-full max-w-screen-sm my-20'}
    >
      <Icons.logo />
      {children}
    </main>
  );
}
