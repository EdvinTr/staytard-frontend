import { motion } from "framer-motion";
import React from "react";
import { useCustomerOrdersQuery } from "../../../lib/graphql";
import { CustomerOrderTableRow } from "./CustomerOrderTableRow";

export const CustomerOrderTable = () => {
  const { data } = useCustomerOrdersQuery({
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
    <div className="max-w-5xl mx-auto overflow-auto px-4">
      <table className="mx-auto w-full">
        <thead>
          <tr>
            <th className="px-4 font-semibold text-gray-500 py-4 pr-20 text-sm  text-left">
              Order ID
            </th>
            <th className="font-semibold text-gray-500 pr-20 text-sm  text-left">
              Address
            </th>
            <th className="font-semibold text-gray-500 pr-20 text-sm  text-left">
              Date
            </th>
            <th className="font-semibold text-gray-500 pr-20 text-sm  text-left">
              Cost
            </th>
            <th className="font-semibold text-gray-500 pr-20 text-sm  text-left">
              Status
            </th>
          </tr>
        </thead>
        <motion.tbody
          variants={containerVariant}
          initial="hidden"
          animate="show"
        >
          {data?.customerOrders.items.map((order) => (
            <CustomerOrderTableRow
              key={order.id}
              variants={variantItem}
              customerOrder={order}
            />
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};
