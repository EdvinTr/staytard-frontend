import React from "react";

interface BasicCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const BasicCard: React.FC<BasicCardProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={`shadow-md  ${props.className ? props.className : ""}`}
    >
      {children}
    </div>
  );
};
