import { ChevronDownIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { BeatLoader } from "react-spinners";
import { MAX_PRODUCT_LIMIT } from "../../constants";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import { GetProductsResponse } from "../../typings/GetProductsResponse.interface";
import { getPathFromParams } from "../../utils/getPathFromParams";
import { PaginationProgressTracker } from "../global/PaginationProgressTracker";
import { ProductCard } from "./ProductCard";
import { SortProductsPopover } from "./SortProductsPopover";

interface ProductCardListProps {
  categoryDescription: string;
  initialData: GetProductsResponse;
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

const BASE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${MAX_PRODUCT_LIMIT}`;

export const ProductCardList: React.FC<ProductCardListProps> = ({
  categoryDescription,
  initialData,
}) => {
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const router = useRouter();

  const currentPathParams = getPathFromParams(router.query.slug as string[]);
  const { sortBy, sortDirection } = router.query;
  const API_URL = `${BASE_API_URL}&categoryPath=${currentPathParams}${getSortString(
    sortBy as string,
    sortDirection as string
  )}`;
  const { data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<GetProductsResponse>(
      [`paginatedProducts-${currentPathParams}-${API_URL}`],
      async ({ pageParam = 1 }) => {
        const { data } = await axios.get(`${API_URL}&page=${pageParam}`);
        return data;
      },
      {
        initialData: { pages: [initialData], pageParams: [1] },
      }
    );

  const allProducts = data?.pages.flatMap(({ products }) => products) || [];
  const latestPagination = data?.pages[data.pages.length - 1].pagination;
  const hasNextPage = !!latestPagination?.nextPage;

  if (!isFetchingNextPage && allProducts.length === 0) {
    return <h2 className="min-h-[10rem] text-xl">No products.</h2>;
  }

  return (
    <div>
      <div className="my-4 flex justify-end text-sm">
        {!isFetchingNextPage && (
          <SortProductsPopover totalItems={latestPagination?.totalItems || 0} />
        )}
      </div>
      {currentWindowWidth < 768 && categoryDescription.length > 0 && (
        <p className="py-3 text-[11px] md:pr-8 md:text-sm ">
          {categoryDescription.slice(0, 800)}
        </p>
      )}
      <div className="grid grid-cols-2 gap-y-4 gap-x-4 md:grid-cols-3 md:gap-x-0 xl:grid-cols-4 2xl:grid-cols-5">
        {currentWindowWidth >= 768 && categoryDescription.length > 0 && (
          <p className="py-3 text-[11px] md:pr-8 md:text-sm ">
            {categoryDescription.slice(0, 800)}
          </p>
        )}
        {allProducts.map((item, idx) => {
          return (
            <ProductCard
              key={idx}
              product={item}
              isLoading={!!isFetchingNextPage}
            />
          );
        })}
      </div>
      <div className="relative mx-auto max-w-xs space-y-4 pt-8">
        {!isFetchingNextPage && latestPagination && (
          <PaginationProgressTracker
            currentCount={allProducts.length}
            totalCount={latestPagination.totalItems}
            text={`You have seen ${allProducts.length} of ${latestPagination?.totalItems} products`}
          />
        )}
        {isFetchingNextPage && (
          <div className="absolute inset-0">
            <BeatLoader
              color="#faba"
              css="display:flex; justify-content:center;"
            />
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <button
            disabled={isFetchingNextPage}
            className="bg-app-dark flex w-full items-center justify-center p-4 text-white"
            onClick={() => {
              fetchNextPage({ pageParam: latestPagination.nextPage });
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
