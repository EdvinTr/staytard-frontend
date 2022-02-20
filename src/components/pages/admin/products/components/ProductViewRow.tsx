import { ChevronRightIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ADMIN_SUB_PAGE_ROUTE, APP_PAGE_ROUTE } from "../../../../../constants";
import { ProductItem } from "../../../../../typings/GetProductsResponse.interface";
import { BasicCard } from "../../../../global/BasicCard";
interface ProductViewRowProps {
  product: ProductItem;
}

const calculateDiscountPercentage = (
  originalPrice: number,
  currentPrice: number
) => {
  return Math.floor(((originalPrice - currentPrice) / originalPrice) * 100);
};
export const ProductViewRow = ({ product }: ProductViewRowProps) => {
  const discountPercentage = calculateDiscountPercentage(
    product.originalPrice,
    product.currentPrice
  );
  const imageUrl = product.images[0].imageUrl.replace("{size}", "90");
  return (
    <div>
      <Link
        href={
          APP_PAGE_ROUTE.ADMIN +
          ADMIN_SUB_PAGE_ROUTE.EDIT_PRODUCT +
          `/${product.id}`
        }
      >
        <a>
          <article
            key={product.id}
            className="flex items-center border-t border-gray-100 py-3 transition-all duration-100 hover:bg-gray-50 lg:text-xs xl:text-sm"
          >
            <Image
              width={30}
              height={50}
              src={imageUrl}
              objectFit="contain"
              alt={`${product.brand.name} - ${product.name}`}
            />
            <div className="ml-4 lg:min-w-[15rem] xl:min-w-[18rem]">
              <h2 className="max-w-[15rem] font-medium">{product.name}</h2>
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
          </article>
        </a>
      </Link>
    </div>
  );
};

export const SmallDeviceProductViewRow = ({ product }: ProductViewRowProps) => {
  const discountPercentage = calculateDiscountPercentage(
    product.originalPrice,
    product.currentPrice
  );

  return (
    <BasicCard>
      <Link
        href={
          APP_PAGE_ROUTE.ADMIN +
          ADMIN_SUB_PAGE_ROUTE.EDIT_PRODUCT +
          `/${product.id}`
        }
      >
        <a>
          <article className="p-4 text-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{product.name}</h2>
              <ChevronRightIcon className="w-6" />
            </div>
            <div className="mt-4">
              <ItemDetailRow
                backgroundColor="gray"
                label="Brand"
                value={`${product.brand.name}`}
              />
              <ItemDetailRow
                backgroundColor="none"
                label="Original price"
                value={`${product.originalPrice} EUR`}
              />
              <ItemDetailRow
                backgroundColor="gray"
                label="Current price"
                value={`${product.currentPrice} EUR`}
              />
              <ItemDetailRow
                backgroundColor="none"
                label="Discount"
                value={`${discountPercentage.toFixed(0)}%`}
                valueClassName={`${
                  discountPercentage > 0 ? "text-red-600" : ""
                }`}
              />
            </div>
          </article>
        </a>
      </Link>
    </BasicCard>
  );
};
interface ItemDetailRowProps {
  label: string;
  value: string | React.ReactNode;
  backgroundColor?: "gray" | "none";
  valueClassName?: string;
}
export const ItemDetailRow = ({
  label,
  value,
  backgroundColor = "gray",
  valueClassName,
}: ItemDetailRowProps) => {
  return (
    <div
      className={`flex justify-between space-x-8 rounded-lg ${
        backgroundColor === "gray" ? "bg-gray-50" : ""
      } p-3 text-xs`}
    >
      <div className="min-w-[3rem] font-light text-stone-600 ">{label}</div>
      <div className={`font-medium ${valueClassName ? valueClassName : ""}`}>
        {value}
      </div>
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
