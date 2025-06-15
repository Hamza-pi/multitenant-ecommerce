import Footer from "./footer";
import { Navbar } from "./navbar";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1 bg-accent">{children}</section>
      <Footer />
    </main>
  );
};

export default Layout;
