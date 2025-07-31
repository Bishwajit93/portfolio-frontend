"use client";

import { useEffect } from "react";

type Props = {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmationModal({
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="relative max-w-md w-full bg-[#0a0a0a] rounded-xl border border-cyan-400/40 shadow-[0_0_30px_rgba(0,255,255,0.3)] p-6 text-center">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Confirm Deletion</h2>
        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
              shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
              hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 text-sm font-semibold text-red-400 border border-red-500 rounded-md 
              shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 
              hover:text-black hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] cursor-pointer transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
