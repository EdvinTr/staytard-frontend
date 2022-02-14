import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { ADMIN_PAGE_QUERY_KEY, MAX_PRODUCT_LIMIT } from "../../../../constants";
import { useSsrCompatible } from "../../../../hooks/useSsrCompatible";
import { useDeleteProductMutation } from "../../../../lib/graphql";
import {
  GetProductsResponse,
  ProductItem,
} from "../../../../typings/GetProductsResponse.interface";
import { MyCheckbox } from "../../../global/MyCheckbox";
import { MyPagination } from "../../../global/MyPagination";
import { ConfirmDeletionModal } from "../components/ConfirmDeletionModal";
import { CreateProductModal } from "./components/CreateProductModal";

interface AdminProductsViewProps {}

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({}) => {
  const [categoryPath, setCategoryPath] = useState("/");
  const [modalData, setModalData] = useState<ProductItem | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);

  const router = useRouter();
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const [
    deleteProduct,
    { loading: isDeleteProductLoading, error: deleteProductError },
  ] = useDeleteProductMutation();
  const { data, error, mutate } = useSWR<GetProductsResponse>(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products?limit=${MAX_PRODUCT_LIMIT}&page=${pageIndex}&categoryPath=${categoryPath}`,
    fetcher
  );

  const currentPageQuery = router.query[ADMIN_PAGE_QUERY_KEY.PAGE];
  useEffect(() => {
    if (currentPageQuery) {
      setPageIndex(parseInt(currentPageQuery as string));
    }
  }, [currentPageQuery]); // reruns when the page query changes

  const handleDeleteProduct = async (id?: number) => {
    if (!id) {
      return;
    }
    try {
      await deleteProduct({
        variables: {
          id,
        },
        fetchPolicy: "network-only",
      });
      setIsDeleteProductModalOpen(false);
      setModalData(null);
      mutate(); // refetch product data
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative pb-20">
      <div className="bg-[#F8F8F9]">
        <ContainerWithPadding>
          <div className="flex items-center lg:justify-between">
            <h1 className="hidden lg:block lg:text-4xl lg:font-semibold">
              Products
            </h1>
            <button
              onClick={() => setIsCreateProductModalOpen(true)}
              className="flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold uppercase text-white"
            >
              <PlusIcon className="mr-2 h-4" />
              Create Product
            </button>
            <CreateProductModal
              show={isCreateProductModalOpen}
              onClose={() => setIsCreateProductModalOpen(false)}
              loading={false}
            />
          </div>
        </ContainerWithPadding>
      </div>
      <ContainerWithPadding>
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
          <div className="">
            {data &&
              data.products.map((product) => {
                const discountPercentage = Math.floor(
                  ((product.originalPrice - product.currentPrice) /
                    product.originalPrice) *
                    100
                );
                const imageUrl = product.images[0].imageUrl.replace(
                  "{size}",
                  "90"
                );
                return (
                  <article
                    key={product.id}
                    className="flex items-center border-t border-gray-100 py-3 lg:text-xs xl:text-sm"
                  >
                    <MyCheckbox
                      aria-label="Select product"
                      rounded="md"
                      className="mr-8"
                      onChange={() => console.log("checked", product.name)}
                    />
                    <Image
                      width={30}
                      height={50}
                      src={imageUrl}
                      objectFit="contain"
                      alt={`${product.brand.name} - ${product.name}`}
                    />
                    <div className="ml-4 lg:min-w-[15rem] xl:min-w-[18rem]">
                      <h2 className="max-w-[15rem] font-medium">
                        {product.name}
                      </h2>
                      <h3 className="text-xs text-gray-500">
                        {product.attributes.length}{" "}
                        {product.attributes.length > 1 ? "Variants" : "Variant"}
                      </h3>
                    </div>
                    <div className="min-w-[8rem] max-w-[10rem] xl:min-w-[10rem]">
                      <span className="font-medium">{product.brand.name}</span>
                    </div>
                    <SmallContainer>
                      <p>
                        <span className="font-medium">Current price:</span>
                        <span className="text-gray-500">
                          {" "}
                          {product.currentPrice} EUR
                        </span>
                      </p>
                    </SmallContainer>
                    <SmallContainer>
                      <p>
                        <span className="font-medium">Original price:</span>
                        <span className="text-gray-500">
                          {" "}
                          {product.originalPrice} EUR
                        </span>
                      </p>
                    </SmallContainer>
                    <div className="hidden xl:block">
                      <div className="min-w-[9rem] max-w-[9rem] xl:min-w-[13rem] xl:max-w-[13rem]">
                        <p>
                          <span
                            className={`${
                              discountPercentage > 0 ? "text-staytard-red" : ""
                            } tracking-wide`}
                          >
                            {`-${discountPercentage.toFixed(0)}`}% discount
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setIsDeleteProductModalOpen(true);
                          setModalData(product);
                        }}
                        aria-label="Open delete product modal"
                        className="rounded-md  bg-red-100 p-2 text-red-600 transition-colors duration-150 ease-in-out hover:bg-red-600 hover:text-white"
                      >
                        <TrashIcon className="h-4 lg:h-5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            <ConfirmDeletionModal
              heading={`Are you sure you want to delete ${modalData?.name}?`}
              loading={isDeleteProductLoading}
              onClose={() => setIsDeleteProductModalOpen(false)}
              show={isDeleteProductModalOpen}
              onDelete={() => handleDeleteProduct(modalData?.id)}
            />
          </div>
        ) : (
          <div>I small</div>
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
      </ContainerWithPadding>
    </div>
  );
};

const SmallContainer: React.FC = ({ children }) => {
  return (
    <div className="min-w-[11rem] max-w-[11rem] xl:min-w-[13rem] xl:max-w-[13rem]">
      {children}
    </div>
  );
};

const ContainerWithPadding: React.FC = ({ children }) => {
  return <div className="p-5 lg:p-8">{children}</div>;
};
