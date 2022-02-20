import { TrashIcon } from "@heroicons/react/solid";
import React from "react";

interface DeleteButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const DeleteButton = ({ ...props }: DeleteButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      className="bg-red-100 p-2 text-red-600 transition-all duration-100 ease-in-out hover:bg-red-600 hover:text-white"
    >
      <TrashIcon className="h-4" aria-hidden />
    </button>
  );
};
