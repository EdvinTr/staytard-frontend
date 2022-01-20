import { ChevronDownIcon } from "@heroicons/react/solid";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ProductCard } from "../components/products/ProductCard";
import { ssrFindProducts } from "../lib/page";

const getFullPath = (slug: string[]) => {
  const [first, ...rest] = slug;
  const fullUrl = `/${first}/${rest.join("/")}`;
  return fullUrl;
};
const SlugPage: NextPage = (props) => {
  const { data, fetchMore } = ssrFindProducts.usePage();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fullPath = getFullPath(router.query.slug as string[]);

  // TODO: do something else when no data
  if (!data || data.products.totalCount === 0) {
    return (
      <FadeInContainer className="text-stayhard-dark min-h-screen pb-40 text-center">
        <h2 className="text-center">No Products.</h2>
      </FadeInContainer>
    );
  }
  const onFetchMore = async () => {
    try {
      setIsLoading(true);
      await fetchMore({
        variables: {
          input: {
            offset: data.products.items.length,
            limit: 50,
            categoryPath: fullPath,
          },
        },
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  const { hasMore, items, totalCount } = data.products;
  return (
    <FadeInContainer className="text-stayhard-dark min-h-screen pb-40 relative">
      <MyContainer className=" text-staytard-dark">
        {/* grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-y-4">
          {/* product cards */}
          {data?.products.items.map((item, idx) => {
            return <ProductCard key={idx} product={item} />;
          })}
        </div>
      </MyContainer>
      {/* load more group */}
      <div className="pt-8 max-w-xs mx-auto space-y-4 relative">
        {isLoading && (
          <div className="absolute inset-0">
            <BeatLoader
              color="#faba"
              css="display:flex; justify-content:center;"
            />
          </div>
        )}
        <div className="px-2 space-y-1 text-center">
          <p className="text-[#6b6b6b]">
            You have seen {items.length} of {totalCount} products
          </p>
          <progress
            max={totalCount}
            value={items.length}
            className="appearance-none bg-gray-50 w-full block h-[0.125rem]"
            style={{
              color: "#222",
            }}
          ></progress>
        </div>

        {/* load more button */}
        {hasMore && (
          <button
            className="text-white w-full bg-staytard-dark p-4 flex justify-center items-center"
            onClick={async () => {
              await onFetchMore();
            }}
          >
            <span>Show more</span>
            <ChevronDownIcon className="w-6" />
          </button>
        )}
      </div>
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
    return {
      props: {},
    };
  }
};

export default SlugPage;
