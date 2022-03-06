import { ChevronDownIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { BeatLoader } from "react-spinners";
import useSWRInfinite from "swr/infinite";
import { MAX_PRODUCT_LIMIT } from "../../constants";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import {
  GetProductsResponse,
  ProductItem,
} from "../../typings/GetProductsResponse.interface";
import { getPathFromParams } from "../../utils/getPathFromParams";
import { PaginationProgressTracker } from "../global/PaginationProgressTracker";
import { ProductCard } from "./ProductCard";
import {
  PRODUCT_SORT_BY,
  SortProductsPopover,
  SORT_DIRECTION,
} from "./SortProductsPopover";

interface ProductCardListProps {
  categoryDescription: string;
}

export interface ProductFetchParams {
  categoryPath: string;
  sortBy?: string;
  sortDirection?: string;
}

export const getSortString = (sortBy?: string, sortDirection?: string) => {
  if (!sortBy || !sortDirection) {
    return "";
  }
  return `&sortBy=${sortBy}&sortDirection=${sortDirection}`;
};

export const getProductsKey = (
  pageIndex: number,
  previousPageData: any,
  { categoryPath, sortBy, sortDirection }: ProductFetchParams,
  pageSize: number
) => {
  const sortString = getSortString(sortBy, sortDirection);
  const url = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products`;

  return `${url}?limit=${pageSize}&page=${
    pageIndex + 1
  }&categoryPath=${categoryPath}${sortString}`;
};

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

export const ProductCardList: React.FC<ProductCardListProps> = ({
  categoryDescription,
}) => {
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const router = useRouter();
  const currentPathParams = getPathFromParams(router.query.slug as string[]);
  const { sortBy, sortDirection } = router.query;

  const { data, size, setSize, error } = useSWRInfinite<GetProductsResponse>(
    (...args) =>
      getProductsKey(
        ...args,
        {
          categoryPath: currentPathParams,
          sortBy: (sortBy as PRODUCT_SORT_BY) || "",
          sortDirection: (sortDirection as SORT_DIRECTION) || "",
        },
        MAX_PRODUCT_LIMIT
      ),
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
  const latestPagination = data && data[data.length - 1].pagination;
  const nextPage = latestPagination?.nextPage;

  if (!isLoadingMore && allProducts.length === 0) {
    return <h2 className="min-h-[10rem] text-xl">No products.</h2>;
  }
  return (
    <div>
      <Head>
        {allProducts.length > 0 && (
          <>
            {/*   <meta
              property="og:image"
              content={
                allProducts[0].images[0].imageUrl.replace("{size}", "1200") +
                "&h=630"
              }
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:image"
              content={
                allProducts[0].images[0].imageUrl.replace("{size}", "1200") +
                "&h=630"
              }
            /> */}
            {/*  <MyMetaTags
              image={
                allProducts[0].images[0].imageUrl.replace("{size}", "1200") +
                "&h=630"
              }
            /> */}
          </>
        )}
      </Head>
      {/* sort */}
      <div className="my-4 flex justify-end text-sm">
        {!isLoadingMore && (
          <SortProductsPopover totalItems={latestPagination?.totalItems || 0} />
        )}
      </div>
      {/* category description on small device */}
      {currentWindowWidth < 768 && categoryDescription.length > 0 && (
        <p className="py-3 text-[11px] md:pr-8 md:text-sm ">
          {categoryDescription.slice(0, 800)}
        </p>
      )}
      <div className="grid grid-cols-2 gap-y-4 gap-x-4 md:grid-cols-3 md:gap-x-0 xl:grid-cols-4 2xl:grid-cols-5">
        {/* category description on medium device and above */}
        {currentWindowWidth >= 768 && categoryDescription.length > 0 && (
          <p className="py-3 text-[11px] md:pr-8 md:text-sm ">
            {categoryDescription.slice(0, 800)}
          </p>
        )}
        {/* product cards */}
        {allProducts.map((item, idx) => {
          return (
            <ProductCard key={idx} product={item} isLoading={!!isLoadingMore} />
          );
        })}
      </div>
      <div className="relative mx-auto max-w-xs space-y-4 pt-8">
        {!isLoadingMore && latestPagination && (
          <PaginationProgressTracker
            currentCount={allProducts.length}
            totalCount={latestPagination.totalItems}
            text={`You have seen ${allProducts.length} of ${latestPagination?.totalItems} products`}
          />
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
            className="bg-app-dark flex w-full items-center justify-center p-4 text-white"
            onClick={() => {
              setSize(size + 1); // controls pageIndex variable in SWR
            }}
          >
            <span>Show more</span>
            <ChevronDownIcon className="w-6" />
          </button>
        )}
      </div>
    </div>
  );
};
