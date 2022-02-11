import React from "react";

export interface MyCheckboxProps
  extends React.HTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  error?: string;
  className?: string;
}
export const MyCheckbox: React.FC<MyCheckboxProps> = (props) => {
  return (
    <input
      {...props}
      type="checkbox"
      className="checked:ring-staytard-yellow h-5 w-5 rounded-full checked:bg-black checked:text-black checked:ring-2 focus:outline-none focus:ring-0 "
    />
  );
};
