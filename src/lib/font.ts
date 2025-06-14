import { DM_Sans, Poppins } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "700",
});

export { dmSans,poppins };
