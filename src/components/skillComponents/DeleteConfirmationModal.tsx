// src/components/skillComponents/DeleteConfirmationModal.tsx
"use client";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmationModal({ onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0a0a0a] border border-cyan-400 rounded-lg shadow-[0_0_25px_rgba(0,255,255,0.4)] max-w-sm w-full p-6 text-white text-center">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-gray-300">Are you sure you want to delete this skill?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-red-500 text-red-400 rounded-md 
            hover:bg-red-600 hover:text-black shadow-[0_0_6px_rgba(255,0,0,0.3)] 
            hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] transition-all duration-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 border border-cyan-400 text-cyan-300 rounded-md 
            hover:bg-cyan-500/10 hover:text-white shadow-[0_0_6px_rgba(0,255,255,0.4)] 
            hover:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
