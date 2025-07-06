import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { User } from "payload";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  user?: (User & { collection: "users" }) | null;
}

const NavSidebar = ({ open, onOpenChange, user }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        {user ? (
          <div className="p-2 w-full">
            <Button
              asChild
              className="border-0 w-full rounded-none px-12 bg-black text-background hover:bg-primary hover:text-black text-lg"
              onClick={() => onOpenChange(false)}
            >
              <Link href={"/admin"}>Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-2">
            <Button
              asChild
              variant={"secondary"}
              className="border-0 rounded-none px-12 bg-white hover:bg-primary text-lg"
              onClick={() => onOpenChange(false)}
            >
              <Link href={"/sign-in"}>Log in</Link>
            </Button>
            <Button
              asChild
              className="border-0 rounded-none px-12 bg-black text-background hover:bg-primary hover:text-black text-lg"
              onClick={() => onOpenChange(false)}
            >
              <Link href={"/sign-up"}>Start Selling</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NavSidebar;
