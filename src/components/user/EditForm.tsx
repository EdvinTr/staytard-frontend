import React, { useState } from "react";
import { BaseButton } from "../global/BaseButton";

interface EditFormProps {
  label: string;
  loading?: boolean;
  onSubmit: () => void;
  error?: string;
}

export const EditForm: React.FC<EditFormProps> = ({
  label,
  children,
  loading,
  error,
  onSubmit,
}) => {
  const [childrenVisible, setChildrenVisible] = useState(false);
  return (
    <form
      onSubmit={onSubmit}
      className={`max-w-3xl border mx-auto px-6 py-4 mt-8 shadow-sm ${
        childrenVisible ? "border-t-4 border-t-staytard-yellow" : ""
      }`}
    >
      <div className="flex justify-between items-center border-b border-black py-4 border-opacity-10">
        <div className="font-bold text-sm uppercase pb-5">{label}</div>
        {!childrenVisible && (
          <BaseButton
            variant="outline"
            onClick={() => setChildrenVisible(true)}
          >
            Update
          </BaseButton>
        )}
      </div>
      {childrenVisible && (
        <div className="mt-6">
          <div className="border-b border-black border-opacity-10">
            {children}
          </div>
          {error && (
            <div className="text-xs text-staytard-red pt-4">{error}</div>
          )}
          <div className="pt-4 space-x-2">
            <BaseButton type="submit" loading={loading}>
              Save
            </BaseButton>
            <BaseButton
              variant="outline"
              onClick={() => setChildrenVisible(false)}
            >
              Cancel
            </BaseButton>
          </div>
        </div>
      )}
    </form>
  );
};
