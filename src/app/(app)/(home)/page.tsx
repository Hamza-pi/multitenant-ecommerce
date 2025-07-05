import { getQueryClient, trpc } from "@/trpc/server";

const Home = async () => {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(trpc.auth.session.queryOptions())
  
  return <div className="space-y-4 p-4">{JSON.stringify(data.user,null,2)}</div>;
};

export default Home;
