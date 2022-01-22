import { ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import NextHead from "next/head";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { SWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ProductCard } from "../components/products/ProductCard";
import { APP_NAME } from "../constants";
import { GetOneCategoryQuery } from "../lib/graphql";
import { ssrGetOneCategory } from "../lib/page";
import {
  GetProductsResponse,
  ProductItem,
} from "../typings/GetProductsResponse.interface";
interface SlugPageProps {
  category: GetOneCategoryQuery["getOneCategory"];
}
const getFullPath = (slug: string[]) => {
  const [first, ...rest] = slug;
  let fullPath = `/${first}`;
  if (rest.length > 0) {
    fullPath = `/${first}/${rest.join("/")}`;
  }
  return fullPath;
};
const fetcher = (url: string) => axios.get(url).then((r) => r.data);

const MAX_LIMIT = 50;

// TODO:
// 1. Have all categories here in frontend
// 2. Show category description stuff
// 3. Show breadcrumbs
const SlugPage: NextPage<SlugPageProps> = ({ fallback }: any) => {
  const { data: categoryData } = ssrGetOneCategory.usePage();
  const router = useRouter();
  const currentPathParams = getFullPath(router.query.slug as string[]);

  const { data, size, setSize, error } = useSWRInfinite<GetProductsResponse>(
    (index) =>
      `${
        process.env.NEXT_PUBLIC_REST_API_ENDPOINT
      }/products?limit=${MAX_LIMIT}&page=${
        index + 1
      }&categoryPath=${currentPathParams}`,
    fetcher
  );
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const merged: GetProductsResponse[] = data ? [].concat(...(data as [])) : [];

  let allProducts: ProductItem[] = [];
  for (const arr of merged) {
    allProducts = [...allProducts, ...arr.products];
  }

  const latestPagination = data && data[data?.length - 1].pagination;
  const nextPage = latestPagination?.nextPage;

  return (
    <SWRConfig value={{ fallback }}>
      <FadeInContainer className="text-staytard-dark min-h-screen py-16 relative">
        <NextHead>
          <title>
            {categoryData?.getOneCategory.name} | Large assortment for men - Buy
            online at {APP_NAME}
            .com
          </title>
          <meta
            name="description"
            content={categoryData?.getOneCategory.description}
          />
        </NextHead>
        <MyContainer className=" text-staytard-dark">
          <div className="overflow-x-auto overflow-y-hidden"></div>
          {/* product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 gap-x-4 md:gap-x-0">
            {/* product cards */}
            {allProducts.map((item, idx) => {
              return <ProductCard key={idx} product={item} />;
            })}
          </div>
          <div className="pt-8 max-w-xs mx-auto space-y-4 relative">
            {!isLoadingMore && (
              <div className="px-2 space-y-1 text-center">
                {/* pagination progress */}
                <p className="text-[#6b6b6b]">
                  You have seen {allProducts.length} of{" "}
                  {latestPagination?.totalItems} products
                </p>
                <progress
                  max={latestPagination?.totalItems}
                  value={allProducts.length}
                  className="appearance-none bg-gray-50 w-full block h-[0.125rem]"
                  style={{
                    color: "#222",
                  }}
                ></progress>
              </div>
            )}
            {isLoadingMore && (
              <div className="absolute inset-0">
                <BeatLoader
                  color="#faba"
                  css="display:flex; justify-content:center;"
                />
              </div>
            )}
            {/* load more button */}
            {nextPage && !isLoadingMore && (
              <button
                disabled={isLoadingMore}
                className="text-white w-full bg-staytard-dark p-4 flex justify-center items-center"
                onClick={() => {
                  setSize(size + 1); // controls index var in SWR
                }}
              >
                <span>Show more</span>
                <ChevronDownIcon className="w-6" />
              </button>
            )}
          </div>
        </MyContainer>
      </FadeInContainer>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categoryPath = getFullPath(ctx.query.slug as string[]);
  try {
    const API_URL = `${
      process.env.NEXT_PUBLIC_REST_API_ENDPOINT
    }/products?limit=${MAX_LIMIT}&page=${1}&categoryPath=${categoryPath}`;
    const data: GetProductsResponse = await fetcher(API_URL);

    const { props: categoryProps } = await ssrGetOneCategory.getServerPage({
      variables: {
        path: categoryPath,
      },
    });
    if (data.pagination.totalItems === 0) {
      throw new Error();
    }
    return {
      props: {
        initialApolloState: categoryProps.apolloState,
        fallback: {
          [API_URL]: data,
        },
      },
    };
  } catch (err) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default SlugPage;
