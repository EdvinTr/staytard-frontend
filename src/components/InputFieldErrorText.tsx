import React from "react";

interface InputFieldErrorTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  isInputFocused: boolean;
}

export const InputFieldErrorText: React.FC<InputFieldErrorTextProps> = ({
  children,
  isInputFocused,
  ...props
}) => {
  return (
    <p
      {...props}
      className={`py-2 text-left text-[11px] 
                  ${
                    isInputFocused
                      ? "opacity-50 text-black"
                      : "text-red-600 opacity-100"
                  }`}
    >
      {children}
    </p>
  );
};
