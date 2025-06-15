import { poppins } from "@/lib/font";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className={cn("border-t font-semibold p-6", poppins.className)}>
      Store Vault Inc.
    </footer>
  );
};

export default Footer;
