import React from "react";

type Rounded = "none" | "sm" | "md" | "lg" | "full";
export interface MyCheckboxProps
  extends React.HTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  error?: string;
  className?: string;
  rounded?: Rounded;
}
export const MyCheckbox: React.FC<MyCheckboxProps> = (props) => {
  return (
    <input
      {...props}
      type="checkbox"
      className={`checked:ring-staytard-yellow h-5 w-5 rounded-full checked:bg-black checked:text-black checked:ring-2 focus:outline-none focus:ring-0 ${
        props.className ? props.className : ""
      } ${getRoundedClassName(props.rounded)}`}
    />
  );
};

const getRoundedClassName = (rounded?: Rounded) => {
  if (!rounded) {
    return "rounded-full";
  }
  switch (rounded) {
    case "none":
      return "";
    case "sm":
      return "rounded-sm";
    case "md":
      return "rounded-md";
    case "lg":
      return "rounded-lg";
    case "full":
      return "rounded-full";
    default:
      return "rounded-full";
  }
};
