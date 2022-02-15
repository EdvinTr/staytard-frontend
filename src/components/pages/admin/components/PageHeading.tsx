import React from "react";

interface PageHeadingProps {
  visibleOnMobile?: boolean;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  children,
  visibleOnMobile,
}) => {
  return (
    <h1
      className={`${
        visibleOnMobile ? "" : "hidden"
      } font-semibold lg:block lg:text-3xl`}
    >
      {children}
    </h1>
  );
};
