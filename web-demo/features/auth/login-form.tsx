"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BoxContainer } from "@/components/custom/container";
import { Icons } from "@/components/custom/icons";
import OKXButton, { LOCAL_WALLET_KEY } from "@/components/custom/okx-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const SAMPLE_WALLET_ADDRESS =
  "bc1p5uwtvdv8mcr4cn6j2xezw8297xhzwppg5cnnpxyaasraftasej7qllm2au";
const FormSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .refine((value) => value.endsWith("@protonmail.com"), {
      message: "Email must end with @protonmail.com",
    }),
  password: z.string(),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    window.localStorage.setItem(LOCAL_WALLET_KEY, SAMPLE_WALLET_ADDRESS);
    router.push("/passport");
  }

  return (
    <div className={"grid grid-cols-1 w-full sm:grid-cols-2 gap-3"}>
      <BoxContainer>
        <header className={"flex flex-col gap-2"}>
          <h2 className={"text-[18px] font-semibold"}>
            Login with anonymous email
          </h2>
          <h4 className={"text-sm text-subtile"}>
            You can login with proton email
          </h4>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={"Email"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"password"}
                      type={"password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={"mt-8 w-full"}>
              Signin
            </Button>
          </form>
        </Form>
      </BoxContainer>
      <BoxContainer>
        <header className={"flex flex-col gap-2"}>
          <h2 className={"text-[18px] font-semibold"}>Login with wallet</h2>
          <h4 className={"text-sm text-subtile"}>
            You can login with wallet which support Bitcoin network.
          </h4>
        </header>
        <div
          className={
            "size-52 w-full bg-[#f1f5f9] flex flex-col items-center justify-center gap-6"
          }
        >
          <Icons.okx className={"w-[70px]"} />
          <OKXButton />
        </div>
      </BoxContainer>
    </div>
  );
}
