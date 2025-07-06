import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import Link from "next/link";

interface Props {
  category: CategoriesGetManyOutput[0] | undefined;
  subCategory: CategoriesGetManyOutput[0]["subcategories"][0] | undefined;
}

const BreadcrumbNavigation = ({ category, subCategory }: Props) => {
  if (!category) return null;

  return (
    <Breadcrumb>
      {subCategory ? (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-xl font-medium text-foreground underline"
            >
              <Link href={`/${category.slug}`}>{category.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-foreground [&>svg]:size-6" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl text-foreground">
              {subCategory?.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      ) : (
        <BreadcrumbItem>
          <BreadcrumbPage className="text-xl text-foreground">
            {category?.name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default BreadcrumbNavigation;
