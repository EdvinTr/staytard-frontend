import React, { useContext } from "react";
import CartContext from "../../../contexts/CartContext";
import { useFindProductsBySkusQuery } from "../../../lib/graphql";

interface CartItemListProps {}

export const CartItemList: React.FC<CartItemListProps> = ({}) => {
  const { getCart } = useContext(CartContext);

  const { data: cartProducts } = useFindProductsBySkusQuery({
    variables: {
      input: { limit: 50, offset: 0, skus: getCart().map((item) => item.sku) },
    },
  });
  console.log("FindBySkus Cart:", cartProducts);

  return (
    <div>
      <div>
        {cartProducts?.productsBySku.items.map((cartItem) => (
          <div key={cartItem.id}>{cartItem.name}</div>
        ))}
      </div>
    </div>
  );
};
