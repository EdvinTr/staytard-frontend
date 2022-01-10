import { useApolloClient } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Navbar } from "../components/navbar/Navbar";
import { useLogoutMutation, useMeQuery } from "../lib/graphql";
const IndexPage: NextPage = () => {
  const router = useRouter();
  const { data: meData, loading } = useMeQuery();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apollo = useApolloClient();
  if (loading) {
    return <div>Loading...</div>;
  }

  const onLogoutClick = async () => {
    try {
      const { data } = await logout();
      console.log(data);

      if (!data || !data.logout) {
        throw new Error();
      }
      await apollo.resetStore();
    } catch {
      // i refuse to do more error handling than this
      router.reload();
    }
  };
  return (
    <div className=" text-staytard-dark">
      <Navbar />
    </div>
  );
};

export default IndexPage;
