import { PlusIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toast";
import useSWR from "swr";
import {
  ADMIN_PAGE_QUERY_KEY,
  MAX_PRODUCT_LIMIT,
} from "../../../../../constants";
import { useSsrCompatible } from "../../../../../hooks/useSsrCompatible";
import { Localized } from "../../../../../Localized";
import { GetProductsResponse } from "../../../../../typings/GetProductsResponse.interface";
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
  /*   const [modalData, setModalData] = useState<ProductItem | null>(null); */
  const [pageIndex, setPageIndex] = useState(1);
  /*   const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = */
  useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);

  const router = useRouter();
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  /*  const [
    deleteProduct,
    { loading: isDeleteProductLoading, error: deleteProductError },
  ] = useDeleteProductMutation(); */
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

  /*  const handleDeleteProduct = async (id?: number) => {
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
  }; */
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

            {/* <ConfirmDeletionModal
              heading={`Are you sure you want to delete ${modalData?.name}?`}
              loading={isDeleteProductLoading}
              onClose={() => setIsDeleteProductModalOpen(false)}
              show={isDeleteProductModalOpen}
              onDelete={() => handleDeleteProduct(modalData?.id)}
            /> */}
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
