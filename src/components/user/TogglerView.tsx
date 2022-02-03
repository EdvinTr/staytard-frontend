import React, { useState } from "react";

interface TogglerViewProps {
  label: string;
}

const togglerButtonClassNames =
  "border-2 border-black hover:border-black border-opacity-25";

export const TogglerView: React.FC<TogglerViewProps> = ({
  label,
  children,
}) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div
      className={`max-w-3xl border mx-auto px-6 py-4 mt-8 shadow-sm ${
        isShow ? "border-t-4 border-t-staytard-yellow" : ""
      }`}
    >
      <div className="flex justify-between items-center border-b border-black py-4 border-opacity-10">
        <div className="font-bold text-sm uppercase pb-5">{label}</div>
        {!isShow && (
          <BaseEditButton
            className={togglerButtonClassNames}
            onClick={() => setIsShow(true)}
          >
            Update
          </BaseEditButton>
        )}
      </div>
      {isShow && (
        <div className="mt-6">
          <div className="border-b border-black border-opacity-10">
            {children}
          </div>
          <div className="pt-4 space-x-2">
            <BaseEditButton
              className="bg-staytard-yellow border-none"
              onClick={() => console.log("save")}
            >
              Save
            </BaseEditButton>
            <BaseEditButton
              onClick={() => setIsShow(false)}
              className={togglerButtonClassNames}
            >
              Cancel
            </BaseEditButton>
          </div>
        </div>
      )}
    </div>
  );
};

const BaseEditButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...props
}) => {
  const className = props.className ? props.className : "";
  return (
    <button
      onClick={onClick}
      {...props}
      className={`${className} px-8 py-3 text-sm font-bold uppercase tracking-wide `}
    >
      {children}
    </button>
  );
};
