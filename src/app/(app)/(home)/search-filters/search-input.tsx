"use client";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoriesBar from "./categories-sidebar";
import { useState } from "react";

interface Props {
  disabled?: boolean;
  data: any;
}

const SearchInput = ({ disabled, data }: Props) => {
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
      <Button
        className="block lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
        variant={"elevated"}
      >
        <ListFilterIcon />
      </Button>
      <CategoriesBar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      {/* TODO: Add library button */}
    </section>
  );
};

export default SearchInput;
