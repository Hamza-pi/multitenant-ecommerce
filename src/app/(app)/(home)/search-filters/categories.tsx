import { Category } from "@/payload-types";
import CategoryDropDown from "./category-dropdown";

interface Props {
  data: any;
}

const Categories = ({ data }: Props) => {
  return (
    <ul className="flex flex-nowrap items-center">
      {data.map((category: Category) => (
        <CategoryDropDown
          key={category.id}
          category={category}
          isActive={false}
          isNavigationHovered={false}
        />
      ))}
    </ul>
  );
};

export default Categories;
