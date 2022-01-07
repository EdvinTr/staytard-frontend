import { NextPage } from "next";
import Link from "next/link";
import { APP_PAGE_ROUTE } from "../constants";
import { useMeQuery } from "../lib/graphql";
const IndexPage: NextPage = () => {
  const { data: meData } = useMeQuery();
  return (
    <div>
      <h1 className="text-5xl font-semibold uppercase">Staytard</h1>
      {meData ? (
        <Link href={APP_PAGE_ROUTE.LOGIN}>
          <a>Login</a>
        </Link>
      ) : (
        <button>Logout</button>
      )}
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
