import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import Footer from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import SearchFilters, {
  SearchFiltersSkeleton,
} from "@/modules/home/ui/components/search-filters";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <section className="flex-1 bg-accent">{children}</section>
      <Footer />
    </main>
  );
};

export default Layout;
