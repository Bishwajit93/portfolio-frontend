// src/components/projectsPageComponents/DeleteProjectConfirmationModal.tsx
"use client";

import { useEffect } from "react";

type Props = {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteProjectConfirmationModal({
  message = "Are you sure you want to delete this project?",
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
      <div className="relative max-w-md w-full bg-[#0a0a0a] border border-cyan-400/40 rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.3)] p-6 text-center">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Confirm Deletion</h2>
        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-500 text-gray-300 hover:bg-gray-700/30 hover:text-white cursor-pointer transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md border border-red-500 text-red-400 hover:bg-red-600/20 hover:text-white shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:shadow-[0_0_10px_rgba(255,0,0,0.5)] cursor-pointer transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
