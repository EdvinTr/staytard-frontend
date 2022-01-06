import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <div>
      <h1 className="text-5xl font-semibold uppercase">Staytard</h1>
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
