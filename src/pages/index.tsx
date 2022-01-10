import { useApolloClient } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { APP_PAGE_ROUTE } from "../constants";
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
    <div className="container mx-auto">
      <h1 className="text-5xl font-semibold uppercase">Staytard</h1>
      <div className=" space-y-8 pt-20">
        <div>
          <Link href={APP_PAGE_ROUTE.LOGIN}>
            <a className="p-4 border">Login</a>
          </Link>
        </div>
        <div>
          <Link href={APP_PAGE_ROUTE.REGISTER}>
            <a className="p-4 border">Register</a>
          </Link>
        </div>
        <div>
          {/* //TODO: reset apollo cache, and clear local storage, hard reload after. */}
          <button className="p-4 border" onClick={() => onLogoutClick()}>
            Logout
          </button>
        </div>
      </div>
      <h1>
        {meData?.me.firstName} {meData?.me.lastName} is logged in
      </h1>
      <h2>email: {meData?.me.email}</h2>
    </div>
  );
};

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  const getMediaVars: QueryMediasArgs = { input: { limit: 10, page: 1 } };
  const { props } = await ssrGetMedias.getServerPage(
    { variables: getMediaVars },
    context
  );

  return {
    props: {
      initialApolloState: props.apolloState,
    },
  };
}; */

export default IndexPage;
