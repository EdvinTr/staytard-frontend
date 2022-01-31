import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { APP_PAGE_ROUTE } from "../../../constants";
import CartContext from "../../../contexts/CartContext";
import { FindProductsBySkusQuery } from "../../../lib/graphql";

interface CartItemRowProps {
  product: FindProductsBySkusQuery["productsBySku"]["items"][0];
}

export const CartItemRow = ({ product }: CartItemRowProps) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // TODO: place this in cart context
  const getQuantityFromCartBySku = (sku: string): number => {
    const cartItem = cart.find((item) => item.sku === sku);
    if (!cartItem) {
      return 0; // TODO: if item is not in cart, return 1 or 0?
    }
    return cartItem.quantity;
  };

  return (
    <div className="text-13 flex space-x-4">
      <Image
        src={product.images[0].imageUrl.replace("{size}", "120")}
        width={110}
        height={150}
        priority
        alt={`${product.brand.name} - ${product.name}`}
        className="w-4"
      />
      <div className="w-full">
        <div className="flex items-start justify-between">
          <div>
            {/* item name and brand */}
            <div className="uppercase font-bold">{product.brand.name}</div>
            <Link href={`${APP_PAGE_ROUTE.PRODUCT}/${product.id}`}>
              <a className="hover:underline">{product.name}</a>
            </Link>
          </div>
          {/* prices */}
          <div className="font-bold">
            {product.currentPrice === product.originalPrice ? (
              <div>
                {product.currentPrice *
                  getQuantityFromCartBySku(product.attributes[0].sku)}{" "}
                EUR
              </div> /* product has no discount */
            ) : (
              <div className="flex flex-col text-right">
                <del className="text-gray-600 text-[10px]">
                  {product.originalPrice *
                    getQuantityFromCartBySku(product.attributes[0].sku)}{" "}
                  EUR
                </del>
                <div className="text-staytard-red">
                  {product.currentPrice *
                    getQuantityFromCartBySku(product.attributes[0].sku)}{" "}
                  EUR
                </div>
              </div>
            )}
          </div>
        </div>

        {/* attributes */}
        <dl className="hidden md:flex space-x-1 mt-6 text-xs">
          <dt>Art.nr.</dt>
          <dd className="mr-1 font-bold">{product.attributes[0].sku}</dd>
        </dl>
        <dl className="flex items-center text-xs mt-1">
          {product.attributes.map((attribute, idx) => (
            <Fragment key={idx}>
              <dt className="mr-1 hidden md:block">Size</dt>
              <dd className="mr-1 font-bold">{attribute.size.value}</dd>
              <dt className="mr-1 md:hidden text-gray-300">|</dt>
              <dt className="mr-1 hidden md:block">-</dt>
              <dt className="mr-1 hidden md:block">Color</dt>
              <dd className="font-bold">{attribute.color.value}</dd>
            </Fragment>
          ))}
        </dl>
        <div className="flex items-center space-x-4 mt-4">
          {/* delete from cart button */}
          <CartActionButton
            ariaLabel="decrement quantity"
            onClick={() => removeFromCart(product.attributes[0].sku)}
          >
            <MinusIcon className="w-4" />
          </CartActionButton>
          <div className="font-bold">
            {cart.find((i) => i.sku === product.attributes[0].sku)?.quantity}
          </div>
          {/* increment quantity button */}

          <CartActionButton
            ariaLabel="increment quantity"
            onClick={() =>
              addToCart({ quantity: 1, sku: product.attributes[0].sku })
            }
          >
            <PlusIcon className="w-4" />
          </CartActionButton>
        </div>
      </div>
    </div>
  );
};

const CartActionButton = ({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="border-2 p-1 inline-block hover:border-black transition-colors duration-150 ease-in-out"
    >
      {children}
    </button>
  );
};
