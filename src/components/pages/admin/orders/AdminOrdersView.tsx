import React from "react";

interface AdminOrdersViewProps {}

export const AdminOrdersView: React.FC<AdminOrdersViewProps> = ({}) => {
  return (
    <div className="w-96 bg-red-500">
      <h1 className="text-2xl font-bold">Orders</h1>
    </div>
  );
};
