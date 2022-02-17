import React from "react";

export interface BaseInputProps extends React.ComponentPropsWithRef<"input"> {
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
    <div className="relative">
      <input
        {...props}
        className={`
        h-[50px] w-full border-opacity-50 pr-12 text-xs font-bold placeholder-opacity-60  ring-0 placeholder:font-normal focus:border-black focus:border-opacity-50 focus:text-sm focus:placeholder-black focus:placeholder-opacity-50 focus:ring-0
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
        <FloatingLabel
          hasError={!!hasError}
          isFocused={!!isFocused}
          hasLeftIcon={!!hasLeftIcon}
        >
          {label?.toUpperCase()}
        </FloatingLabel>
      )}
    </div>
  );
};

interface FloatingLabelProps {
  hasLeftIcon?: boolean;
  hasError?: boolean;
  isFocused?: boolean;
}
export const FloatingLabel: React.FC<FloatingLabelProps> = ({
  children,
  hasLeftIcon = false,
  hasError = false,
  isFocused = false,
}) => {
  return (
    <span
      className={`absolute top-[6px] py-0 text-[10px] tracking-[1.6px] opacity-[0.62]
          ${hasLeftIcon ? "left-12" : "left-4"}  
          ${hasError && !isFocused && "text-red-600 opacity-100"}
          ${isFocused && "opacity-50"}
          `}
    >
      {children}
    </span>
  );
};
