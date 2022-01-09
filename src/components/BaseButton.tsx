import React from "react";

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${props.className} w-full p-4 mt-5 outline-none focus-visible:bg-black  focus-visible:text-white uppercase text-sm font-bold tracking-wider bg-staytard-yellow transition-all duration-300 ease-out `}
    >
      {children}
    </button>
  );
};
