import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}
const CategoriesBar = ({ open, onOpenChange, data }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none bg-background">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <NavigationMenu
          viewport={false}
          className="items-start max-w-full [&>div]:min-w-full"
        >
          <NavigationMenuList className="flex-col">
            {data.map((cat: any) => (
              <NavigationMenuItem className="w-full" key={cat.id}>
                {cat.subcategories && cat.subcategories.length ? (
                  <>
                    <NavigationMenuTrigger className="w-full justify-between cursor-pointer">
                      <Link href={`/${cat.slug}`}>{cat.name}</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      className="z-50 !w-full ml-2"
                      style={{ backgroundColor: `${cat.color}` }}
                    >
                      {cat.subcategories?.map((sub: any) => (
                        <Link
                          key={sub.id}
                          href={`/${cat.slug}/${sub.slug}`}
                          className="font-medium text-foreground block p-2 underline hover:bg-accent/50"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={`/${cat.slug === "all" ? "" : cat.slug}`}
                    className="ml-4 font-medium text-sm"
                  >
                    {cat.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
      <SheetDescription className="sr-only" />
    </Sheet>
  );
};

export default CategoriesBar;
