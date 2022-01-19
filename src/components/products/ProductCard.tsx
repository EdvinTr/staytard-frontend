import Image from "next/image";
import React from "react";
import { FindProductsQuery } from "../../lib/graphql";
interface ProductCardProps {
  product: FindProductsQuery["products"]["items"][0];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.images[0].imageUrl.replace("{size}", "400");
  return (
    <article className=" p-3 hover:shadow-md hover:transition-shadow hover:duration-300 hover:ease-in-out">
      <Image
        src={imageUrl}
        placeholder="blur"
        priority
        blurDataURL={imageUrl}
        objectFit="contain"
        width={400}
        height={600}
        alt={`${product.brand} - ${product.name}`}
      />
      <h2>
        <b className="text-xs block w-full uppercase">{product.brand.name}</b>
        <span className="text-[10px] block w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
          {product.name}
        </span>
      </h2>
      <strong className="text-13 font-semibold flex">
        {product.priceLabel}
      </strong>
    </article>
  );
};
