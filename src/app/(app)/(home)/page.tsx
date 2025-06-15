import { payload } from "@/lib/payload";

const Home = async () => {
  const data = await payload.find({
    collection: "categories",
  });
  return <div className="space-y-4 p-4">{JSON.stringify(data.docs, null, 2)}</div>;
};

export default Home;
