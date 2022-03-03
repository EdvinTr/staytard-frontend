import React from "react";

interface BasicCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const BasicCard: React.FC<BasicCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`shadow-md ${className ? className : ""}`}>
      {children}
    </div>
  );
};
