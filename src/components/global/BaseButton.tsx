import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${props.className}  ${
        loading ? "" : "hover:bg-black hover:text-white "
      } w-full p-4 mt-5 outline-none focus-visible:bg-black  focus-visible:text-white uppercase text-sm font-bold tracking-wider bg-staytard-yellow transition-all duration-300 ease-out `}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};
