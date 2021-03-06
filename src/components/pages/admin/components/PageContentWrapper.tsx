import React from "react";

interface PageContentWrapperProps {}

export const PageContentWrapper: React.FC<PageContentWrapperProps> = ({
  children,
}) => {
  return <div className="text-app-dark w-full lg:pl-20">{children}</div>;
};
