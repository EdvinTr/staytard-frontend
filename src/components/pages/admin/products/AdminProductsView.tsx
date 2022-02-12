import { PlusIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
interface AdminProductsViewProps {}

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({}) => {
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
    </Fragment>
  );
};

const ContainerWithPadding: React.FC = ({ children }) => {
  return <div className="p-5 lg:p-8">{children}</div>;
};
