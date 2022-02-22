import { motion } from "framer-motion";
import React from "react";
import { useMyCustomerOrdersQuery } from "../../../lib/graphql";
import { CustomerOrderTableRow } from "./CustomerOrderTableRow";

export const CustomerOrderTable = () => {
  const { data } = useMyCustomerOrdersQuery({
    variables: {
      input: {
        limit: 50,
        offset: 0,
      },
    },
  });
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const variantItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <div className="mx-auto max-w-5xl overflow-auto px-4">
      <table className="mx-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-4 pr-20 text-left text-sm font-semibold  text-gray-500">
              Order ID
            </th>
            <th className="pr-20 text-left text-sm font-semibold  text-gray-500">
              Address
            </th>
            <th className="pr-20 text-left text-sm font-semibold  text-gray-500">
              Date
            </th>
            <th className="pr-20 text-left text-sm font-semibold  text-gray-500">
              Cost
            </th>
            <th className="pr-20 text-left text-sm font-semibold  text-gray-500">
              Status
            </th>
          </tr>
        </thead>
        <motion.tbody
          variants={containerVariant}
          initial="hidden"
          animate="show"
        >
          {data?.myOrders.items.map((order) => (
            <CustomerOrderTableRow
              key={order.id}
              variants={variantItem}
              customerOrder={order}
            />
          ))}
          {/* TODO: add load more button */}
        </motion.tbody>
      </table>
    </div>
  );
};
