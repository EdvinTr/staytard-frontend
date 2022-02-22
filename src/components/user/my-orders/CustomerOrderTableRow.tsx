import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
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
      className="mx-auto max-w-5xl border-t border-b text-sm shadow-md transition-colors duration-200  hover:bg-gray-100 "
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
          className={`rounded-md p-2 bg-${getOrderStatusColorName(
            customerOrder.orderStatus.status as ORDER_STATUS
          )}-100`}
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

export const getOrderStatusColorName = (orderStatus: ORDER_STATUS) => {
  switch (orderStatus) {
    case ORDER_STATUS.PENDING:
      return "yellow";

    case ORDER_STATUS.PROCESSING:
      return "yellow";

    case ORDER_STATUS.SHIPPED:
      return "blue";

    case ORDER_STATUS.ON_HOLD:
      return "blue";

    case ORDER_STATUS.COMPLETED:
      return "green";

    case ORDER_STATUS.CANCELLED:
      return "red";

    case ORDER_STATUS.FAILED:
      return "red";

    case ORDER_STATUS.REFUNDED:
      return "orange";

    default:
      return "";
  }
};
