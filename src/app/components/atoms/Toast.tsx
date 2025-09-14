"use client";

import { useEffect } from "react";

type Props = { message: string; onClose: () => void };

export const Toast = ({ message, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-4 rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg">
      {message}
    </div>
  );
};
