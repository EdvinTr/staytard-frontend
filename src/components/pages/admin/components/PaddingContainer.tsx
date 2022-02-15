import { DetailedHTMLProps, HTMLAttributes } from "react";

interface PaddingContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const PaddingContainer: React.FC<PaddingContainerProps> = (props) => {
  const { className, children } = props;
  return (
    <div {...props} className={`p-5 lg:p-8 ${className ? className : ""}`}>
      {children}
    </div>
  );
};
