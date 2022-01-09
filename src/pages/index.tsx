import { NextPage } from "next";
import Link from "next/link";
import { APP_PAGE_ROUTE } from "../constants";
import { useMeQuery } from "../lib/graphql";
const IndexPage: NextPage = () => {
  const { data: meData, loading } = useMeQuery();
  if (loading) {
    return <div>Loading...</div>;
  }

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
          <button className="p-4 border">Logout</button>
        </div>
      </div>
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
