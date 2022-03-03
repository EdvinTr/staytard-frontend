import React from "react";
import { useCart } from "../../../hooks/useCart";
import { useFindProductsBySkusQuery } from "../../../lib/graphql";
import { CartItemRow } from "./CartItemRow";
interface CartItemListProps {}

export const CartItemList: React.FC<CartItemListProps> = ({}) => {
  const { cart } = useCart();

  const { data: cartProducts } = useFindProductsBySkusQuery({
    variables: {
      input: { limit: 50, offset: 0, skus: cart.map((item) => item.sku) },
    },
  });

  return (
    <div className="">
      <div className="space-y-8">
        {cartProducts?.productsBySku.items.map((cartItem, idx) => (
          <CartItemRow product={cartItem} key={idx} />
        ))}
      </div>
    </div>
  );
};
