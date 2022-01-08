import React, { Fragment } from "react";

interface BaseInputProps extends React.ComponentPropsWithRef<"input"> {
  label?: string;
  isFocused?: boolean;
  hasError?: boolean;
  hasLeftIcon?: boolean;
  errorMessage?: string | null;
}

export const BaseInput = ({
  label,
  isFocused,
  hasError,
  errorMessage,
  hasLeftIcon,
  ...props
}: BaseInputProps) => {
  const currentValueLength = props.value?.toString().length ?? 0;

  return (
    <Fragment>
      <input
        {...props}
        className={`
        pr-12 w-full text-xs placeholder-opacity-60 placeholder:font-normal focus:text-sm font-bold  h-[50px] ring-0 focus:ring-0 focus:ring-black border-black border-opacity-50 focus:border-opacity-50 focus:placeholder-opacity-50 focus:placeholder-black
        ${props.className} 
        ${label && currentValueLength > 0 ? "pt-6" : ""} 
        ${
          hasError
            ? "border-red-600 placeholder-red-600 placeholder-opacity-100"
            : "border-black"
        } 
        ${hasLeftIcon ? "pl-12" : "pl-4"}`}
      />

      {currentValueLength > 0 && (
        /* floating label */
        <span
          className={`absolute top-2 py-0 text-[10px] tracking-[1.6px]
          ${hasLeftIcon ? "left-12" : "left-3"}  
          ${hasError && !isFocused && "text-red-600"}
          ${isFocused && "opacity-50 "}
          `}
        >
          {label?.toUpperCase()}
        </span>
      )}
      {/* error message */}
      {hasError && (
        <p
          className={`py-2 text-left text-[11px] 
          ${isFocused ? "opacity-50 text-black" : "text-red-600 opacity-100"}`}
        >
          {errorMessage}
        </p>
      )}
    </Fragment>
  );
};
