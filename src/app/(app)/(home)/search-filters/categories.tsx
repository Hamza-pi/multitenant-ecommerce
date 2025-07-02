"use client";

import { Category } from "@/payload-types";
import CategoryDropDown from "./category-dropdown";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import CategoriesBar from "./categories-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  data: CategoriesGetManyOutput;
}

const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const measureRef = useRef<HTMLUListElement>(null);
  const viewAllRef = useRef<HTMLLIElement>(null);

  const [visibleCount, setVisibleCount] = useState(0);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  const activeCateg = "all";
  const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCateg);
  const isActiveCategHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  const calculateVisible = () => {
    if (!containerRef.current || !measureRef.current || !viewAllRef.current)
      return;
    const containerWidth = containerRef.current.offsetWidth;
    const viewAllWidth = viewAllRef.current.offsetWidth;
    const availableWidth = containerWidth - viewAllWidth;

    const items = Array.from(measureRef.current.children);
    let totalWidth = 0;
    let visible = 0;
    for (const item of items) {
      const width = item.getBoundingClientRect().width;
      if (totalWidth + width > availableWidth) break;
      totalWidth += width;
      visible++;
    }
    setVisibleCount(visible);
  };

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      {/* Invisible Items for calculation */}
      <ul
        ref={measureRef}
        className="flex opacity-0 pointer-events-none fixed -top-full -left-full"
      >
        {data.map((category) => (
          <CategoryDropDown
            key={category.id}
            category={category}
            isActive={activeCateg === category.slug}
            isNavigationHovered={false}
          />
        ))}
      </ul>
      {/* Visible Items */}
      <ul
        ref={containerRef}
        className="flex flex-nowrap items-center"
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data.slice(0, visibleCount).map((category) => (
          <CategoryDropDown
            key={category.id}
            category={category}
            isActive={activeCateg === category.slug}
            isNavigationHovered={isAnyHovered}
          />
        ))}
        <li ref={viewAllRef} className="shrink-0">
          <Button
            variant={"elevated"}
            onClick={() => setIsSideBarOpen(true)}
            className={cn(
              "h-11 bg-transparent border-transparent space-x-2 hover:border-muted-foreground text-foreground rounded-full",
              {
                "border-muted-foreground": isActiveCategHidden && !isAnyHovered,
              }
            )}
          >
            View All
            <ListFilterIcon />
          </Button>
        </li>
      </ul>
      <CategoriesBar open={isSidebarOpen} onOpenChange={setIsSideBarOpen} />
    </>
  );
};

export default Categories;
