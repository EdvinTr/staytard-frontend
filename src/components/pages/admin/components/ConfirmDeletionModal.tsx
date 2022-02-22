import React from "react";
import { BaseButton } from "../../../global/BaseButton";
import { Modal } from "../../../global/Modal";

interface ConfirmDeletionModalProps {
  show: boolean;
  onClose: () => void;
  loading: boolean;
  error?: string;
  onDelete: (args?: any) => void;
  heading: string;
}

export const ConfirmDeletionModal: React.FC<ConfirmDeletionModalProps> = ({
  show,
  loading,
  onClose,
  error,
  onDelete,
  heading,
  children,
}) => {
  return (
    <Modal show={show} onClose={() => onClose()}>
      <div className="p-8">
        <h1 className="pb-8 text-2xl font-semibold">{heading}</h1>
        <div>{children}</div>
        {error && <p className="pb-2 text-red-600">{error}</p>}
        <div className="space-x-4">
          <BaseButton
            onClick={() => onDelete()}
            loading={loading}
            type="button"
          >
            Confirm
          </BaseButton>
          <BaseButton type="button" variant="outline" onClick={() => onClose()}>
            Cancel
          </BaseButton>
        </div>
      </div>
    </Modal>
  );
};
