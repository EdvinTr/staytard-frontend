import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { APP_PAGE_ROUTE } from "../../../constants";
import CartContext from "../../../contexts/CartContext";
import { useFindProductsBySkusQuery } from "../../../lib/graphql";
interface CartItemListProps {}

export const CartItemList: React.FC<CartItemListProps> = ({}) => {
  const { cart } = useContext(CartContext);

  const { data: cartProducts } = useFindProductsBySkusQuery({
    variables: {
      input: { limit: 50, offset: 0, skus: cart.map((item) => item.sku) },
    },
  });

  return (
    <div className="bg-white p-2">
      {cartProducts?.productsBySku.items.map((cartItem) => (
        <div key={cartItem.id} className="text-13 flex space-x-4">
          <Image
            src={cartItem.images[0].imageUrl.replace("{size}", "100")}
            width={80}
            height={120}
            alt={`${cartItem.brand.name} - ${cartItem.name}`}
          />
          <div className="w-full">
            <div className="flex items-start justify-between">
              <div>
                {/* item name and brand */}
                <div className="uppercase font-bold">{cartItem.brand.name}</div>
                <Link href={`${APP_PAGE_ROUTE.PRODUCT}/${cartItem.id}`}>
                  <a>{cartItem.name}</a>
                </Link>
              </div>
              {/* prices */}
              <div>
                <div>{cartItem.originalPrice}</div>
              </div>
            </div>

            {/* attributes */}
            <dl className="flex text-xs font-bold mt-4">
              {cartItem.attributes.map((attribute) => (
                <Fragment>
                  {/* use <dt> for describing the detail */}
                  <dd className="mr-2">{attribute.size.value}</dd>
                  <dd>{attribute.color.value}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
};
