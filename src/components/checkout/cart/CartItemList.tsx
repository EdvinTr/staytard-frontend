import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { APP_PAGE_ROUTE } from "../../../constants";
import CartContext from "../../../contexts/CartContext";
import { useFindProductsBySkusQuery } from "../../../lib/graphql";
interface CartItemListProps {}

export const CartItemList: React.FC<CartItemListProps> = ({}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const { data: cartProducts } = useFindProductsBySkusQuery({
    variables: {
      input: { limit: 50, offset: 0, skus: cart.map((item) => item.sku) },
    },
  });

  return (
    <div className="bg-white p-2">
      <div className="space-y-8">
        {cartProducts?.productsBySku.items.map((cartItem) => (
          <div key={cartItem.id} className="text-13 flex space-x-4">
            <Image
              src={cartItem.images[0].imageUrl.replace("{size}", "100")}
              width={100}
              height={140}
              alt={`${cartItem.brand.name} - ${cartItem.name}`}
            />
            <div className="w-full">
              <div className="flex items-start justify-between">
                <div>
                  {/* item name and brand */}
                  <div className="uppercase font-bold">
                    {cartItem.brand.name}
                  </div>
                  <Link href={`${APP_PAGE_ROUTE.PRODUCT}/${cartItem.id}`}>
                    <a className="hover:underline">{cartItem.name}</a>
                  </Link>
                </div>
                {/* prices */}
                <div className="font-bold">
                  {cartItem.currentPrice === cartItem.originalPrice ? (
                    <div>{cartItem.currentPrice} EUR</div>
                  ) : (
                    <div className="flex flex-col text-right">
                      <del className="text-gray-600 text-[10px]">
                        {cartItem.originalPrice} EUR
                      </del>
                      <div className="text-staytard-red">
                        {cartItem.currentPrice} EUR
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* attributes */}
              <dl className="flex text-xs font-bold mt-2">
                {cartItem.attributes.map((attribute) => (
                  <Fragment>
                    {/* use <dt> for describing the detail */}
                    <dd className="mr-2">{attribute.size.value}</dd>
                    <dd>{attribute.color.value}</dd>
                  </Fragment>
                ))}
              </dl>
              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={() => removeFromCart(cartItem.attributes[0].sku)}
                  className="border-2 p-1 inline-block hover:border-black transition-colors duration-150 ease-in-out"
                >
                  <MinusIcon className="w-4" />
                </button>
                <div className="font-bold">
                  {
                    cart.find((i) => i.sku === cartItem.attributes[0].sku)
                      ?.quantity
                  }
                </div>
                <button
                  onClick={() =>
                    addToCart({ quantity: 1, sku: cartItem.attributes[0].sku })
                  }
                  className="border-2 p-1 inline-block hover:border-black transition-colors duration-150 ease-in-out"
                >
                  <PlusIcon className="w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};