import { ChevronDownIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import { GetServerSideProps, NextPage } from "next";
import NextHead from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ProductCard } from "../components/products/ProductCard";
import { APP_NAME } from "../constants";
import { useSsrCompatible } from "../hooks/useSsrCompatible";
import { GetOneCategoryQuery } from "../lib/graphql";
import { ssrFindProducts, ssrGetOneCategory } from "../lib/page";

interface SlugPageProps {
  category: GetOneCategoryQuery["getOneCategory"];
}
const getFullPath = (slug: string[]) => {
  const [first, ...rest] = slug;
  const fullUrl = `/${first}/${rest.join("/")}`;
  return fullUrl;
};
const SlugPage: NextPage<SlugPageProps> = (props) => {
  const { data: productData, fetchMore } = ssrFindProducts.usePage();
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fullPath = getFullPath(router.query.slug as string[]);

  // TODO: do something else when no data
  if (!productData || productData.products.totalCount === 0) {
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
            offset: productData.products.items.length,
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
  const { category } = props;

  const CategoryDescriptionJsx = () => (
    <p className="text-[11px] pt-3 md:text-sm md:pr-8 ">
      {category.description.slice(0, 800)}
    </p>
  );

  const { hasMore, items, totalCount } = productData.products;
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen py-16 relative">
      <NextHead>
        <title>
          {category.name} | Large assortment for men - Buy online at {APP_NAME}
          .com
        </title>
        <meta name="description" content={category.description} />
      </NextHead>
      <MyContainer className=" text-staytard-dark">
        {/* category */}
        <h1 className="text-3xl font-semibold">{category.name}</h1>
        <div className="overflow-x-auto overflow-y-hidden">
          {/* sub category list */}
          <ul className="py-4 flex items-start flex-shrink-0   space-x-3 text-sm">
            {category.children?.map((child, idx) => {
              return (
                <li
                  key={idx}
                  className="p-3 border flex-shrink-0  font-medium border-black border-opacity-20"
                >
                  <Link href={child.path}>
                    <a>{child.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* product grid */}
        {currentWindowWidth < 768 && <CategoryDescriptionJsx />}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 gap-x-4 md:gap-x-0">
          {currentWindowWidth >= 768 && <CategoryDescriptionJsx />}
          {/* product cards */}
          {productData?.products.items.map((item, idx) => {
            return <ProductCard key={idx} product={item} />;
          })}
        </div>
        {/* load more group */}
        <div className="pt-8 max-w-xs mx-auto space-y-4 relative">
          {/* loading spinner */}
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
      </MyContainer>
    </FadeInContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [first, ...rest] = ctx.query.slug as string[];
  let fullUrl = `/${first}`;
  if (rest.length > 0) {
    fullUrl = `/${first}/${rest.join("/")}`;
  }
  try {
    const { props: productProps } = await ssrFindProducts.getServerPage({
      variables: {
        input: {
          categoryPath: fullUrl,
          limit: 50,
          offset: 0,
        },
      },
    });
    const { props: categoryProps } = await ssrGetOneCategory.getServerPage({
      variables: {
        path: fullUrl,
      },
    });
    return {
      props: {
        initialApolloState: productProps.apolloState,
        category: categoryProps.data.getOneCategory,
      },
    };
  } catch (err) {
    return {
      props: {}, // TODO: return NotFound page
      notFound: true,
    };
  }
};

export default SlugPage;
