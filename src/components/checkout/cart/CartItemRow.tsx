import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { HTMLMotionProps, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { APP_PAGE_ROUTE } from "../../../constants";
import CartContext from "../../../contexts/CartContext";
import { FindProductsBySkusQuery } from "../../../lib/graphql";

interface CartItemRowProps extends HTMLMotionProps<"div"> {
  product: FindProductsBySkusQuery["productsBySku"]["items"][0];
  loading?: boolean;
}

export const CartItemRow = ({
  product,
  loading,
  ...props
}: CartItemRowProps) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // TODO: place this in cart context
  const getQuantityFromCartBySku = (sku: string): number => {
    const cartItem = cart.find((item) => item.sku === sku);
    if (!cartItem) {
      return 0;
    }
    return cartItem.quantity;
  };

  return (
    <motion.div {...props} className="text-13 flex space-x-4">
      <Image
        src={product.images[0].imageUrl.replace("{size}", "120")}
        width={110}
        height={150}
        priority
        alt={`${product.brand.name} - ${product.name}`}
        className={`w-4 ${loading ? "opacity-60" : ""}`}
      />
      <div className="w-full">
        <div className="flex items-start justify-between">
          <div>
            {/* item name and brand */}
            <div className="font-bold uppercase">{product.brand.name}</div>
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
                <del className="text-[10px] text-gray-600">
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
        <dl className="mt-6 hidden space-x-1 text-xs md:flex">
          <dt>Art.nr.</dt>
          <dd className="mr-1 font-bold">{product.attributes[0].sku}</dd>
        </dl>
        <dl className="mt-1 flex items-center text-xs">
          {product.attributes.map((attribute, idx) => (
            <Fragment key={idx}>
              <dt className="mr-1 hidden md:block">Size</dt>
              <dd className="mr-1 font-bold">{attribute.size.value}</dd>
              <dt className="mr-1 text-gray-300 md:hidden">|</dt>
              <dt className="mr-1 hidden md:block">-</dt>
              <dt className="mr-1 hidden md:block">Color</dt>
              <dd className="font-bold">{attribute.color.value}</dd>
            </Fragment>
          ))}
        </dl>
        <div className="mt-4 flex items-center space-x-4">
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
              addToCart({
                quantity: 1,
                sku: product.attributes[0].sku,
                price: product.currentPrice,
              })
            }
          >
            <PlusIcon className="w-4" />
          </CartActionButton>
        </div>
      </div>
    </motion.div>
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
      className="inline-block border-2 p-1 transition-colors duration-150 ease-in-out hover:border-black"
    >
      {children}
    </button>
  );
};
