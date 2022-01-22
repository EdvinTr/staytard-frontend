import { ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ProductCard } from "../components/products/ProductCard";
import { GetOneCategoryQuery } from "../lib/graphql";
import { GetProductsResponse } from "../typings/GetProductsResponse.interface";
interface SlugPageProps {
  category: GetOneCategoryQuery["getOneCategory"];
}
const getFullPath = (slug: string[]) => {
  const [first, ...rest] = slug;
  const fullUrl = `/${first}/${rest.join("/")}`;
  return fullUrl;
};
const fetcher = (url: string) => axios.get(url).then((r) => r.data);

const LIMIT = 50;

// TODO:
// 1. Use query params from category
// 2. Have all categories here in frontend
// 3. Show loading spinner when fetching more
// 4. Hide load more button when is at the end of pagination (e.g., nextPage === null)
// 6. Show category description stuff
// 7. Show breadcrumbs
const SlugPage: NextPage<SlugPageProps> = ({ fallback }: any) => {
  const router = useRouter();
  const pathVariables = router.query.slug as string[];
  const fullPath = getFullPath(pathVariables);

  const { data, size, setSize, error, isValidating, mutate } =
    useSWRInfinite<GetProductsResponse>(
      (index) =>
        `${
          process.env.NEXT_PUBLIC_REST_API_ENDPOINT
        }/products?limit=${LIMIT}&page=${index + 1}`,
      fetcher
    );
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const merged: GetProductsResponse[] = data ? [].concat(...(data as [])) : [];

  const allProducts = [];
  for (const arr of merged) {
    for (const item of arr.products) {
      allProducts.push(item);
    }
  }

  const latestPagination = data && data[data?.length - 1].pagination;
  const nextPage = latestPagination?.nextPage;

  return (
    <SWRConfig value={{ fallback }}>
      <FadeInContainer className="text-staytard-dark min-h-screen py-16 relative">
        <MyContainer className=" text-staytard-dark">
          <div className="overflow-x-auto overflow-y-hidden"></div>
          {/* product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 gap-x-4 md:gap-x-0">
            {/* product cards */}
            {allProducts.map((item, idx) => {
              return <ProductCard key={idx} product={item} />;
            })}
          </div>
          {/* load more group */}
          <div className="pt-8 max-w-xs mx-auto space-y-4 relative">
            <div className="px-2 space-y-1 text-center">
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

            {/* load more button */}
            {nextPage && (
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
  const [first, ...rest] = ctx.query.slug as string[];
  let fullUrl = `/${first}`;
  if (rest.length > 0) {
    fullUrl = `/${first}/${rest.join("/")}`;
  }
  try {
    const API_BASE = `${
      process.env.NEXT_PUBLIC_REST_API_ENDPOINT
    }/products?limit=${LIMIT}&page=${1}`;
    const data: GetProductsResponse = await fetcher(API_BASE);
    return {
      props: {
        fallback: {
          [API_BASE]: data,
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
