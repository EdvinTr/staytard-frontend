import React, { useCallback, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
interface ModalProps {
  onClose: () => void;
  show: boolean;
}

export const Modal: React.FC<ModalProps> = ({ onClose, show, children }) => {
  const closeOnEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);
  return (
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal z-30" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
