import React from "react";

interface MyContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MyContainer: React.FC<MyContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`container mx-auto px-4 ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};
