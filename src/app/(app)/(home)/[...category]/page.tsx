interface Props {
  params: Promise<{
    category: string[];
  }>;
}

const Page = async ({ params }: Props) => {
  const [category, subcategory] = (await params).category;
  return (
    <div>
      Category:{category} <br />
      SubCategory:{subcategory}
    </div>
  );
};

export default Page;
