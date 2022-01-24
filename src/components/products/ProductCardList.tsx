import { ChevronDownIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";
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

const getKey = (
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
      getKey(
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

  return (
    <div>
      {!isLoadingMore && allProducts.length === 0 && (
        <h2 className="text-xl min-h-[10rem]">No products.</h2>
      )}

      {/* sort */}
      <div className="text-sm flex justify-end my-4">
        {!isLoadingMore && (
          <SortProductsPopover totalItems={latestPagination?.totalItems || 0} />
        )}
      </div>
      {currentWindowWidth < 768 && categoryDescription.length > 0 && (
        <p className="text-[11px] py-3 md:text-sm md:pr-8 ">
          {categoryDescription.slice(0, 800)}
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 gap-x-4 md:gap-x-0">
        {/* product cards */}
        {currentWindowWidth >= 768 && categoryDescription.length > 0 && (
          <p className="text-[11px] py-3 md:text-sm md:pr-8 ">
            {categoryDescription.slice(0, 800)}
          </p>
        )}
        {allProducts.map((item, idx) => {
          return (
            <ProductCard key={idx} product={item} isLoading={!!isLoadingMore} />
          );
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
    </div>
  );
};
