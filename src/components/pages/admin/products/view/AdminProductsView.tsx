import { PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toast";
import useSWR from "swr";
import { useDebounce } from "usehooks-ts";
import {
  ADMIN_PAGE_QUERY_KEY,
  MAX_PRODUCT_LIMIT,
} from "../../../../../constants";
import { useSsrCompatible } from "../../../../../hooks/useSsrCompatible";
import { Localized } from "../../../../../Localized";
import { GetProductsResponse } from "../../../../../typings/GetProductsResponse.interface";
import { BaseInput } from "../../../../global/BaseInput";
import { MyPagination } from "../../../../global/MyPagination";
import { PaddingContainer } from "../../components/PaddingContainer";
import { PageHeading } from "../../components/PageHeading";
import { CreateProductModal } from "../components/CreateProductModal";
import {
  ProductViewRow,
  SmallDeviceProductViewRow,
} from "../components/ProductViewRow";

interface AdminProductsViewProps {}

const { createProductSuccessMessage } = Localized.page.admin;
const fetcher = (url: string) => axios.get(url).then((r) => r.data);

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({}) => {
  const [categoryPath, setCategoryPath] = useState("/");
  const [pageIndex, setPageIndex] = useState(1);
  useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    router.query.q ? (router.query.q as string) : ""
  );
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);

  const { data, error, mutate } = useSWR<GetProductsResponse>(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products?limit=${MAX_PRODUCT_LIMIT}&page=${pageIndex}&categoryPath=${categoryPath}&q=${debouncedSearchTerm}`,
    fetcher
  );

  const currentPageQuery = router.query[ADMIN_PAGE_QUERY_KEY.PAGE];
  useEffect(() => {
    if (currentPageQuery) {
      setPageIndex(parseInt(currentPageQuery as string));
    }
  }, [currentPageQuery]); // reruns when the page query changes

  useEffect(() => {
    Router.replace({
      query: {
        ...Router.query,
        q: debouncedSearchTerm,
      },
    }); // Using default Router to avoid missing dependency eslint warnings
  }, [debouncedSearchTerm]); // update URL when search term changes

  const showSuccessToast = (): void =>
    toast.success(createProductSuccessMessage, {
      backgroundColor: "black",
      color: "white",
    });
  return (
    <div className="relative pb-20">
      <div className="bg-[#F8F8F9]">
        <PaddingContainer>
          <div className="flex items-center lg:justify-between">
            <PageHeading>Products</PageHeading>
            <button
              onClick={() => setIsCreateProductModalOpen(true)}
              className="flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold uppercase text-white"
            >
              <PlusIcon className="mr-2 h-4" />
              Create Product
            </button>
            <CreateProductModal
              onSuccess={() => {
                showSuccessToast();
                setIsCreateProductModalOpen(false);
                mutate();
              }}
              show={isCreateProductModalOpen}
              onClose={() => setIsCreateProductModalOpen(false)}
            />
          </div>
        </PaddingContainer>
      </div>
      <PaddingContainer>
        <div className="relative md:max-w-sm">
          <BaseInput
            type="text"
            aria-label="Search"
            className="mb-3 border-opacity-[0.1]"
            placeholder="Search"
            label="Search"
            name="search"
            autoComplete="off"
            hasLeftIcon
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute top-3 left-3 w-6 text-stone-700" />
        </div>
        {!data && !error && (
          <div className="fixed top-1/2 left-0 right-0 ">
            <BeatLoader
              color="#faba"
              size={20}
              css="display:flex; justify-content:center; align-items:center;"
            />
          </div>
        )}
        {currentWindowWidth >= 1024 ? (
          <div>
            {data?.products.map((product) => {
              return <ProductViewRow product={product} key={product.id} />;
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data?.products.map((product) => {
              return (
                <SmallDeviceProductViewRow product={product} key={product.id} />
              );
            })}
          </div>
        )}
        {data && (
          <div className="flex justify-center pt-14">
            <MyPagination
              currentPage={pageIndex - 1}
              totalPages={data.pagination.totalPages}
              onPageChange={(page) => {
                router.replace({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: page + 1,
                  },
                });
              }}
            />
          </div>
        )}
        <div className="z-50">
          <ToastContainer
            position={
              currentWindowWidth <= 768 ? "bottom-center" : "bottom-left"
            }
          />
        </div>
      </PaddingContainer>
    </div>
  );
};
