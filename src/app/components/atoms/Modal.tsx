import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-lg p-6 z-10 w-80">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
