import React from "react";

interface PaginationLoadMoreContainerProps {}

export const PaginationLoadMoreContainer: React.FC<
  PaginationLoadMoreContainerProps
> = ({ children }) => {
  return <div className="mx-auto max-w-xs space-y-4 pt-8">{children}</div>;
};
