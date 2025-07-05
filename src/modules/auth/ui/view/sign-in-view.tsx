"use client";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/modules/auth/schema";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { poppins } from "@/lib/font";
import { Button } from "@/components/ui/button";
import InputField from "@/components/form/input-field";
import PasswordField from "@/components/form/password-field";
import { toast } from "sonner";

const SignInView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => toast.error(error?.message),
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => mutate(data);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-accent h-screen w-full flex flex-col gap-6 p-4 lg:p-16 lg:col-span-3 overflow-y-auto"
        >
          <div className="flex items-center justify-between">
            <Link
              href={"/"}
              className={`${poppins.className} text-2xl border-0 w-fit text-foreground font-semibold`}
            >
              StoreVault
            </Link>
            <Button asChild variant={"ghost"} className="underline border-none">
              <Link href={"/sign-up"}>Sign up</Link>
            </Button>
          </div>
          <h1 className="text-4xl font-medium">
            Welcome Back! Discover, create and connect with amazing creators
          </h1>
          <InputField control={form.control} name="email" label="Email" />
          <PasswordField
            control={form.control}
            name="password"
            label="Password"
          />
          <Button
            size={"lg"}
            disabled={isPending}
            variant={"elevated"}
            className="hover:bg-primary hover:text-accent"
          >
            Login
          </Button>
        </form>
      </Form>
      <div className="h-screen w-full lg:col-span-2 hidden lg:block">
        <Image
          alt="Auth Background Image"
          src={"/auth-bg.png"}
          width={1536}
          height={1024}
          className="object-cover w-full h-full"
        />
      </div>
    </main>
  );
};

export default SignInView;
