"use client";
import SearchInput from "./search-input";
import Categories from "@/modules/categories/ui/views/categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import BreadcrumbNavigation from "./breadcrumb-navigation";

const SearchFilters = () => {
  const trpc = useTRPC();
  const params = useParams();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const category = params.category as string[] | undefined;
  const activeCateg = data.find((cat) => cat.slug === category?.[0]);
  const activeSubCateg = activeCateg?.subcategories?.find(
    (subCat) => subCat.slug === category?.[1]
  );

  return (
    <div
      className={
        "px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full bg-muted"
      }
      style={{ backgroundColor: activeCateg?.color || "" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        category={activeCateg}
        subCategory={activeSubCateg}
      />
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
