import { SearchIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import { Modal } from "../global/Modal";

interface SearchModalProps {
  onClose: () => void;
  show: boolean;
}

export const SearchModal = ({ onClose, show }: SearchModalProps) => {
  return (
    <Modal onClose={onClose} show={show}>
      <div className="px-12 py-4">
        <div className="flex items-center justify-between border-b border-black border-opacity-20">
          <div className="flex w-full items-center">
            <SearchIcon className="w-6" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none border-black focus:ring-0"
              autoFocus
            />
          </div>
          <button aria-label="close" onClick={onClose}>
            <XIcon className="w-6" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
