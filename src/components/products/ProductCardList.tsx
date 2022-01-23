import { ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BeatLoader } from "react-spinners";
import useSWRInfinite from "swr/infinite";
import {
  GetProductsResponse,
  ProductItem,
} from "../../typings/GetProductsResponse.interface";
import { getPathFromParams } from "../../utils/getPathFromParams";
import { ProductCard } from "./ProductCard";
interface ProductCardListProps {}

const MAX_LIMIT = 50;

const getKey = (
  pageIndex: number,
  previousPageData: any,
  path: string,
  pageSize: number
) => {
  //if (previousPageData && !previousPageData.length) return null; // reached the end

  return `${
    process.env.NEXT_PUBLIC_REST_API_ENDPOINT
  }/products?limit=${pageSize}&page=${pageIndex + 1}&categoryPath=${path}`;
};

const fetcher = (url: string) => axios.get(url).then((r) => r.data);
export const ProductCardList: React.FC<ProductCardListProps> = ({}) => {
  const router = useRouter();
  const currentPathParams = getPathFromParams(router.query.slug as string[]);

  const { data, size, setSize, error } = useSWRInfinite<GetProductsResponse>(
    (...args) => getKey(...args, currentPathParams, MAX_LIMIT),
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
    <Fragment>
      {!isLoadingMore && allProducts.length === 0 && (
        <h2 className="text-xl min-h-[10rem]">No products.</h2>
      )}
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
    </Fragment>
  );
};
