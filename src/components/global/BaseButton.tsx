import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "outline" | "solid";
interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}
const smallButtonClasses = "px-8 py-3";
const mediumButtonClasses = "p-4";
const largeButtonClasses = "p-4 w-full";

const outlineClassNames =
  "border-2 border-black hover:border-black border-opacity-25";

const solidClassNames =
  "bg-staytard-yellow transition-all duration-300 ease-out hover:bg-black hover:text-white";
export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  loading,
  variant = "solid",
  size = "sm",
  ...props
}) => {
  const buttonSizeClassNames = getButtonClassNamesFromSize(size);
  const variantClassNames = getButtonVariantClassNames(variant);

  const allClassNames = [
    props.className,
    buttonSizeClassNames,
    variantClassNames,
    "focus-visible:text-white",
    "uppercase",
    "text-sm",
    "font-bold",
    "tracking-wider",
    loading
      ? variant === "solid"
        ? "hover:bg-staytard-yellow focus-visible:bg-staytard-yellow"
        : ""
      : "",
  ].join(" ");

  return (
    <button {...props} className={allClassNames}>
      {loading ? <LoadingSpinner size={25} /> : children}
    </button>
  );
};

const getButtonVariantClassNames = (variant: ButtonVariant): string => {
  switch (variant) {
    case "outline":
      return outlineClassNames;

    default:
      return solidClassNames;
  }
};

const getButtonClassNamesFromSize = (size: ButtonSize): string => {
  switch (size) {
    case "sm":
      return smallButtonClasses;
    case "md":
      return mediumButtonClasses;
    case "lg":
      return largeButtonClasses;
    default:
      return mediumButtonClasses;
  }
};
