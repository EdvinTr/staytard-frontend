import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";

interface LoadMoreButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className="bg-staytard-dark flex w-full items-center justify-center p-4 text-white"
    >
      {children}
      <ChevronDownIcon className="w-6" />
    </button>
  );
};
