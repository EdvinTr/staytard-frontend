import React from "react";

interface AdminProductReviewsViewProps {}

export const AdminProductReviewsView: React.FC<
  AdminProductReviewsViewProps
> = ({}) => {
  return (
    <div className="w-96 bg-red-500">
      <h1 className="text-2xl font-bold">
        Reviews for products are shown here
      </h1>
    </div>
  );
};
