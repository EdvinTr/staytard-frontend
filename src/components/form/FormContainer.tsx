import React from "react";

interface FormContainerProps extends React.HTMLProps<HTMLDivElement> {}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`sm:max-w-md lg:max-w-lg 2xl:max-w-4xl mx-auto px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
