"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropDownPosition } from "./use-dropdown-position";
import SubCategoryMenu from "./subcategory-menu";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  category: CategoriesGetManyOutput[0];
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

const CategoryDropDown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLLIElement>(null);
  const { getDropDownPosition } = useDropDownPosition(dropDownRef);

  const handleMouseEnter = () => {
    if (category.subcategories?.length) setIsOpen(true);
  };

  const handleMouseLeave = () => setIsOpen(false);

  const dropDownPosition = getDropDownPosition();

  return (
    <li className="relative" ref={dropDownRef} onMouseLeave={handleMouseLeave}>
      <div className="relative w-fit">
        <Button
          variant={"elevated"}
          onMouseEnter={handleMouseEnter}
          className={cn(
            "h-11 bg-transparent border-transparent hover:border-muted-foreground text-foreground rounded-full",
            {
              "border-muted-foreground":
                (isActive && !isNavigationHovered) || isOpen,
            }
          )}
        >
          <Link href={`${category.slug === "all" ? "" : category.slug}`}>{category.name}</Link>
        </Button>
        {category.subcategories && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-x-[10px] border-b-[10px] border-x-transparent border-b-black left-1/2 -translate-x-1/2",
              { "opacity-100": isOpen }
            )}
          />
        )}
      </div>
      <SubCategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropDownPosition}
      />
    </li>
  );
};

export default CategoryDropDown;
