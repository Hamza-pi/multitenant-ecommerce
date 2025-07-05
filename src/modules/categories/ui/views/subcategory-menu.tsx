import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
  category: any;
  isOpen: boolean;
  position: { top: number; left: number };
}

const SubCategoryMenu = ({ category, isOpen, position }: Props) => {
  if (!isOpen || !category.subcategories || !category.subcategories.length)
    return null;

  const bgColor = category.color || "#F5F5F5";

  return (
    <menu
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      <div className="h-3 w-60" />
      <ul
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0_0_black]"
        style={{ backgroundColor: bgColor }}
      >
        {category.subcategories.map((subCateg: Category) => (
          <li
            key={subCateg.id}
            className="px-2 py-3 hover:bg-foreground/80 hover:text-background font-medium underline cursor-pointer"
          >
            <Link href={`/${category.slug}/${subCateg.slug}`}>
              {subCateg.name}
            </Link>
          </li>
        ))}
      </ul>
    </menu>
  );
};

export default SubCategoryMenu;
