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
        className={`mx-auto mt-8 max-w-3xl border px-6 py-4 shadow-sm ${
          childrenVisible ? "border-t-app-yellow border-t-4" : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-black border-opacity-10 py-4">
          <div className="text-sm font-bold uppercase">{label}</div>
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
            {error && <div className="text-app-red pt-4 text-xs">{error}</div>}
            <div className="space-x-2 pt-4">
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
