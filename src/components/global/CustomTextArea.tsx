import { FloatingLabel } from "./BaseInput";

export interface CustomTextAreaProps
  extends React.HTMLProps<HTMLTextAreaElement> {
  hasError?: boolean;
  currentValue: string;
  label: string;
}
export const CustomTextArea = ({
  hasError,
  currentValue,
  label,
  ...props
}: CustomTextAreaProps) => {
  const currentValueLength = currentValue?.toString().length ?? 0;

  return (
    <div className="relative">
      <textarea
        {...props}
        className={`focus:border-opacity-100
          ${props.className ? props.className : ""} border-opacity-50
          ${label && currentValueLength > 0 ? "pt-6" : ""} 
           ${
             hasError
               ? "border-red-600 border-opacity-100 placeholder-red-600 focus:border-red-600"
               : "border-black border-opacity-10 focus:border-black"
           } `}
      ></textarea>
      {currentValueLength > 0 && (
        <FloatingLabel hasError={!!hasError}>
          {label.toUpperCase()}
        </FloatingLabel>
      )}
    </div>
  );
};
