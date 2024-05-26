import { Icons } from "@/components/custom/icons";
import { LoginForm } from "@/features/auth/login-form";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center py-20 px-2 sm:px-0 gap-4 max-w-screen-sm mx-auto">
      <header className="pb-6">
        <Link href="/">
          <Icons.logo />
        </Link>
      </header>
      <LoginForm />
    </main>
  );
}
