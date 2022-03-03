import { motion } from "framer-motion";
import React, { useContext } from "react";
import CartContext from "../../../contexts/CartContext";
import { useFindProductsBySkusQuery } from "../../../lib/graphql";
import { CenteredBeatLoader } from "../../global/CenteredBeatLoader";
import { CartItemRow } from "./CartItemRow";
interface CartItemListProps {}

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const variantItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const CartItemList: React.FC<CartItemListProps> = ({}) => {
  const { cart } = useContext(CartContext);

  const {
    data: cartProducts,
    loading,
    previousData,
  } = useFindProductsBySkusQuery({
    variables: {
      input: { limit: 50, offset: 0, skus: cart.map((item) => item.sku) },
    },
  });

  return (
    <div className="">
      {loading && (
        <>
          {previousData?.productsBySku.items.map((cartItem, idx) => (
            <CartItemRow product={cartItem} key={idx} loading={loading} />
          ))}
          <CenteredBeatLoader />
        </>
      )}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {cartProducts?.productsBySku.items.map((cartItem, idx) => (
          <CartItemRow product={cartItem} key={idx} variants={variantItem} />
        ))}
      </motion.div>
    </div>
  );
};
