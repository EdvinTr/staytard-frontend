import { PlusIcon } from "@heroicons/react/solid";
import axios from "axios";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import useSWR from "swr";
import { MAX_PRODUCT_LIMIT } from "../../../../constants";
import { GetProductsResponse } from "../../../../typings/GetProductsResponse.interface";
interface AdminProductsViewProps {}

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [categoryPath, setCategoryPath] = useState("/");
  const { data, error } = useSWR<GetProductsResponse>(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products?limit=${MAX_PRODUCT_LIMIT}&page=${pageIndex}&categoryPath=${categoryPath}`,
    fetcher
  );
  return (
    <Fragment>
      <div className="bg-[#F8F8F9]">
        <ContainerWithPadding>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold lg:text-4xl">Products</h1>
            <button className="flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold uppercase text-white">
              <PlusIcon className="mr-2 h-4" />
              Create Product
            </button>
          </div>
        </ContainerWithPadding>
      </div>
      <ContainerWithPadding>
        <div className="">
          {data &&
            data.products.map((product) => {
              const imageUrl = product.images[0].imageUrl.replace(
                "{size}",
                "90"
              );
              return (
                <article
                  key={product.id}
                  className="flex items-center border-t border-gray-100 py-3 text-sm"
                >
                  <Image
                    width={30}
                    height={50}
                    src={imageUrl}
                    blurDataURL={imageUrl}
                    objectFit="contain"
                    placeholder="blur"
                    alt={`${product.brand.name} - ${product.name}`}
                  />
                  <div className="ml-4">
                    <h2 className="font-medium">{product.name}</h2>
                    <h3 className="text-xs text-gray-500">
                      {product.attributes.length} Variants
                    </h3>
                  </div>
                  <div>
                    <h4>
                      <span className="font-medium">Current price:</span>
                      <span className="text-gray-500">
                        {product.currentPrice} EUR
                      </span>
                    </h4>
                  </div>
                </article>
              );
            })}
        </div>
      </ContainerWithPadding>
    </Fragment>
  );
};

const ContainerWithPadding: React.FC = ({ children }) => {
  return <div className="p-5 lg:p-8">{children}</div>;
};
