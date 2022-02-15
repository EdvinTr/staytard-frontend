import { HTMLMotionProps, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ADMIN_SUB_PAGE_ROUTE, APP_PAGE_ROUTE } from "../../../../../constants";
import { ProductItem } from "../../../../../typings/GetProductsResponse.interface";
interface ProductViewRowProps extends HTMLMotionProps<"div"> {
  product: ProductItem;
}

export const ProductViewRow: React.FC<ProductViewRowProps> = ({
  product,
  ...props
}) => {
  const discountPercentage = Math.floor(
    ((product.originalPrice - product.currentPrice) / product.originalPrice) *
      100
  );
  const imageUrl = product.images[0].imageUrl.replace("{size}", "90");
  return (
    <motion.div {...props}>
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
    </motion.div>
  );
};

const SmallContainer: React.FC = ({ children }) => {
  return (
    <div className="min-w-[11rem] max-w-[11rem] xl:min-w-[13rem] xl:max-w-[13rem]">
      {children}
    </div>
  );
};
