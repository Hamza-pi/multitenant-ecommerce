"use client";
import Link from "next/link";

import { poppins } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavSidebar from "./nav-sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const Navbar = () => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <nav className="h-20 flex border-b justify-between font-medium">
      <Link href={"/"} className="self-center pl-4 md:pl-6">
        <span
          className={cn(
            "text-3xl md:text-5xl font-semibold",
            poppins.className
          )}
        >
          StoreVault
        </span>
      </Link>

      {session.data?.user ? (
        <div className="hidden md:flex">
          <Button
            asChild
            className="border-0 border-l h-full rounded-none px-12 bg-black text-background hover:bg-primary hover:text-black text-lg"
          >
            <Link href={"/admin"}>Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden md:flex">
          <Button
            asChild
            variant={"secondary"}
            className="border-0 border-l h-full rounded-none px-12 bg-white hover:bg-primary text-lg"
          >
            <Link href={"/sign-in"}>Log in</Link>
          </Button>
          <Button
            asChild
            className="border-0 border-l h-full rounded-none px-12 bg-black text-background hover:bg-primary hover:text-black text-lg"
          >
            <Link href={"/sign-up"}>Start Selling</Link>
          </Button>
        </div>
      )}

      <NavSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        user={session?.data?.user}
      />
      <Button
        className="flex md:hidden self-center border-none"
        variant={"outline"}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="size-8" />
      </Button>
    </nav>
  );
};
