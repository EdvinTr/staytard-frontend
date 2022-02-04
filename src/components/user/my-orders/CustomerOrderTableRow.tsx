import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
import { CustomerOrdersQuery } from "../../../lib/graphql";

interface CustomerOrderTableRowProps extends HTMLMotionProps<"div"> {
  customerOrder: CustomerOrdersQuery["customerOrders"]["items"][0];
}

export const CustomerOrderTableRow = ({
  customerOrder,
  ...props
}: CustomerOrderTableRowProps) => {
  customerOrder;
  return (
    <motion.tr
      {...props}
      className="max-w-5xl hover:bg-gray-100 transition-colors duration-200 border-t shadow-md border-b mx-auto  text-sm "
    >
      {/* order id */}
      <td className="py-12 px-4 font-semibold">{customerOrder.id}</td>
      {/* address */}
      <td className="font-semibold">
        {customerOrder.deliveryAddress}, {customerOrder.city},{" "}
        {customerOrder.postalCode}
      </td>
      {/* created at */}
      <td className="font-semibold">{customerOrder.createdAt.split("T")[0]}</td>
      {/* total price */}
      <td className="font-semibold">{customerOrder.grandTotal} EUR</td>
      {/* status */}
      <td className={`font-semibold`}>
        <span
          className={`p-2 rounded-md ${getOrderStatusClassNames(
            customerOrder.orderStatus.status as ORDER_STATUS
          )}`}
        >
          {customerOrder.orderStatus.status}
        </span>
      </td>
    </motion.tr>
  );
};
export enum ORDER_STATUS {
  PENDING = "Pending",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  REFUNDED = "Refunded",
  FAILED = "Failed",
  ON_HOLD = "On-Hold",
}

const getOrderStatusClassNames = (orderStatus: ORDER_STATUS) => {
  switch (orderStatus) {
    case ORDER_STATUS.PENDING:
      return "bg-yellow-100 ";
    case ORDER_STATUS.PROCESSING:
      return "bg-yellow-100 ";
    case ORDER_STATUS.SHIPPED:
      return "bg-blue-100";
    case ORDER_STATUS.ON_HOLD:
      return "bg-blue-100";
    case ORDER_STATUS.COMPLETED:
      return "bg-green-100";
    case ORDER_STATUS.CANCELLED:
      return "bg-red-100";
    case ORDER_STATUS.FAILED:
      return "bg-red-100";
    case ORDER_STATUS.REFUNDED:
      return "bg-orange-100";
    default:
      return "";
  }
};
