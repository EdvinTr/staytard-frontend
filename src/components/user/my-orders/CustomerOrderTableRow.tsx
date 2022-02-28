import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
import { orderStatusColors } from "../../../constants";
import { MyCustomerOrdersQuery } from "../../../lib/graphql";

interface CustomerOrderTableRowProps extends HTMLMotionProps<"div"> {
  customerOrder: MyCustomerOrdersQuery["myOrders"]["items"][0];
}

export const CustomerOrderTableRow = ({
  customerOrder,
  ...props
}: CustomerOrderTableRowProps) => {
  customerOrder;
  return (
    <motion.tr
      {...props}
      className={`mx-auto max-w-5xl border-t border-b text-sm shadow-md transition-colors duration-200 hover:bg-gray-100`}
    >
      {/* order id */}
      <td className="py-12 px-4 font-medium">{customerOrder.id}</td>
      {/* address */}
      <td className="pr-8 font-medium">
        {customerOrder.deliveryAddress}, {customerOrder.city},{" "}
        {customerOrder.postalCode}
      </td>
      {/* created at */}
      <td className="font-medium">{customerOrder.createdAt.split("T")[0]}</td>
      {/* total price */}
      <td className="font-medium">{customerOrder.grandTotal} EUR</td>
      {/* status */}
      <td className={`font-medium`}>
        <span
          className={`rounded-md p-2 tracking-wide ${
            orderStatusColors[customerOrder.orderStatus.status]
          }`}
        >
          {customerOrder.orderStatus.status}
        </span>
      </td>
    </motion.tr>
  );
};
