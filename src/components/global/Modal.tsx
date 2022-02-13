import React, { useCallback, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
interface ModalProps {
  onClose: () => void;
  show: boolean;
}
// TODO: should use teleport, is a bit hacky to implement in NextJS
export const Modal: React.FC<ModalProps> = ({ onClose, show, children }) => {
  const closeOnEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    },
    [onClose]
  );
  const nodeRef = useRef(null);

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div ref={nodeRef} className="modal z-50" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
