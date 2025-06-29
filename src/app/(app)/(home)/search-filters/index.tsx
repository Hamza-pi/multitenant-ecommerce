import { payload } from "@/lib/payload";
import { Category } from "@/payload-types";

import SearchInput from "./search-input";
import Categories from "./categories";

const SearchFilters = async () => {
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Because of depth 1 we are confident that "doc" will be type of "Category"
      ...(doc as Category),
    })),
  }));

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <Categories data={formattedData} />
    </div>
  );
};

export default SearchFilters;
