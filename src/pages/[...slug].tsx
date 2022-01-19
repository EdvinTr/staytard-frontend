import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { ssrFindProducts } from "../lib/page";

const getFullPath = (slug: string[]) => {
  const [first, ...rest] = slug;
  const fullUrl = `/${first}/${rest.join("/")}`;
  return fullUrl;
};
const SlugPage: NextPage = () => {
  const { data, fetchMore } = ssrFindProducts.usePage();
  const router = useRouter();
  const fullPath = getFullPath(router.query.slug as string[]);

  // TODO: use infinite scrolling
  return (
    <FadeInContainer className="text-stayhard-dark min-h-screen pb-40 text-center">
      <div className=" text-staytard-dark">
        <h2 className="text-center">Hello this is the products page</h2>
        {data?.products.items.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
      {data?.products.hasMore && (
        <button
          className="bg-staytard-yellow text-black p-4"
          onClick={async () => {
            await fetchMore({
              variables: {
                input: {
                  offset: data.products.items.length,
                  limit: 50,
                  categoryPath: fullPath,
                },
              },
            });
          }}
        >
          Load more
        </button>
      )}
    </FadeInContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [first, ...rest] = ctx.query.slug as string[];
  const fullUrl = `/${first}/${rest.join("/")}`;
  try {
    const { props } = await ssrFindProducts.getServerPage({
      variables: {
        input: {
          categoryPath: fullUrl,
          limit: 50,
          offset: 0,
        },
      },
    });

    return {
      props: {
        initialApolloState: props.apolloState,
      },
    };
  } catch (err) {
    console.log("I AM ERROR", err);

    return {
      props: {},
    };
  }
};

export default SlugPage;
