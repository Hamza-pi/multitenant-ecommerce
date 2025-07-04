"use client";
import SearchInput from "./search-input";
import Categories from "@/modules/categories/ui/views/categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full bg-muted">
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full bg-muted">
      <SearchInput disabled />
      <div className="h-11 w-full bg-accent" />
    </div>
  );
};

export default SearchFilters;
