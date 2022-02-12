import { PlusIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { Fragment, useState } from "react";
import useSWR from "swr";
import { MAX_PRODUCT_LIMIT } from "../../../../constants";
interface AdminProductsViewProps {}

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [categoryPath, setCategoryPath] = useState("/");
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products?limit=${MAX_PRODUCT_LIMIT}&page=${pageIndex}&categoryPath=${categoryPath}`,
    fetcher
  );
  console.log(data);
  return (
    <Fragment>
      <div className="bg-[#F8F8F9]">
        <ContainerWithPadding>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold lg:text-4xl">Products</h1>
            <button className="bg-success  flex items-center rounded-md px-3 py-2 text-sm font-semibold uppercase text-white">
              <PlusIcon className="mr-2 h-4" />
              Create Product
            </button>
          </div>
        </ContainerWithPadding>
      </div>
      <ContainerWithPadding></ContainerWithPadding>
    </Fragment>
  );
};

const ContainerWithPadding: React.FC = ({ children }) => {
  return <div className="p-5 lg:p-8">{children}</div>;
};
