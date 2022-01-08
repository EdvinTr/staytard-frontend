import React, { Fragment } from "react";

interface BaseInputProps extends React.ComponentPropsWithRef<"input"> {
  label?: string;
  isFocused?: boolean;
  hasError: boolean;
  hasLeftIcon?: boolean;
  errorMessage?: string | null;
}
const inputErrorClassNames =
  "ring-red-500 ring-opacity-100 placeholder-red-600 placeholder-opacity-100";

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
        className={`${props.className} ${
          label && currentValueLength > 0 ? "pt-6" : ""
        } ${hasError && inputErrorClassNames}  ${
          hasLeftIcon && "pl-12"
        } w-full  text-xs  placeholder-opacity-60 placeholder:font-normal focus:text-sm font-bold ring-black h-[50px] ring-1 ring-opacity-25 focus:ring-1 focus:ring-black focus:ring-opacity-60 border-none focus:border-none focus:placeholder-opacity-50 focus:placeholder-black`}
      />

      {currentValueLength > 0 && (
        /* floating label */
        <span
          className={`absolute top-2 ${
            hasLeftIcon ? "left-12" : "left-3"
          } py-0 text-[10px] ${isFocused && "opacity-50"}`}
        >
          {label?.toUpperCase()}
        </span>
      )}
      {hasError && (
        <p
          className={`pt-2  text-left text-[11px] ${
            isFocused ? "opacity-50 text-black" : "text-red-600 opacity-100"
          }`}
          // data-cy="email-input-error"
        >
          {errorMessage}
        </p>
      )}
    </Fragment>
  );
};
