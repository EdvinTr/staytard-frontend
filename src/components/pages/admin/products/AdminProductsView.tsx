import React from "react";

interface AdminProductsViewProps {}

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({}) => {
  return (
    <div className="bg-red-500">
      <h1 className="text-2xl font-bold">
        Products are shown here so ucan update and stuffg are shown here
      </h1>
    </div>
  );
};
