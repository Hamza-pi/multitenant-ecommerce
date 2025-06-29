import { Suspense } from "react";
import Footer from "./footer";
import { Navbar } from "./navbar";
import SearchFilters from "./search-filters";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Suspense fallback={<>Loading...</>}>
        <SearchFilters/>
      </Suspense>
      <section className="flex-1 bg-accent">{children}</section>
      <Footer />
    </main>
  );
};

export default Layout;
