import React, { useContext } from "react";
import CartContext from "../../../contexts/CartContext";
import { useFindProductsBySkusQuery } from "../../../lib/graphql";
import { CartItemRow } from "./CartItemRow";
interface CartItemListProps {}

export const CartItemList: React.FC<CartItemListProps> = ({}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

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
