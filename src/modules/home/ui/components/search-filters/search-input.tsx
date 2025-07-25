"use client";
import {
  BookmarkCheck,
  BookmarkCheckIcon,
  ListFilterIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoriesBar from "@/modules/categories/ui/views/categories-sidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: Props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <section className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
        />
      </div>
      {!disabled && (
        <Button
          className="block lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
          variant={"elevated"}
        >
          <ListFilterIcon />
        </Button>
      )}
      {session.data?.user && (
        <Button asChild variant={"elevated"}>
          <Link href={"/library"}>
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
      <CategoriesBar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      {/* TODO: Add library button */}
    </section>
  );
};

export default SearchInput;
