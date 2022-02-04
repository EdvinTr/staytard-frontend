import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { BaseButton } from "../../global/BaseButton";

interface EditFormProps {
  label: string;
  loading?: boolean;
  onSubmit: (e: FormEvent) => Promise<void>;
  error?: string;
  showChildren?: boolean;
}

export const EditForm: React.FC<EditFormProps> = ({
  label,
  children,
  loading,
  showChildren = true,
  error,
  onSubmit,
}) => {
  const [childrenVisible, setChildrenVisible] = useState(false);

  useEffect(() => {
    setChildrenVisible(showChildren); // set initial value based on props
  }, [showChildren]);
  const handleOnSubmit = async (e: FormEvent) => {
    await onSubmit(e);
  };
  return (
    <Fragment>
      <form
        onSubmit={handleOnSubmit}
        className={`max-w-3xl border mx-auto px-6 py-4 mt-8 shadow-sm ${
          childrenVisible ? "border-t-4 border-t-staytard-yellow" : ""
        }`}
      >
        <div className="flex justify-between items-center border-b border-black py-4 border-opacity-10">
          <div className="font-bold text-sm uppercase">{label}</div>
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
                type="button"
                variant="outline"
                onClick={() => setChildrenVisible(false)}
              >
                Cancel
              </BaseButton>
            </div>
          </div>
        )}
      </form>
    </Fragment>
  );
};
