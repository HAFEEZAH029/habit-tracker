"use client";
import { IoTrashBinOutline } from "react-icons/io5";
import { useEffect } from "react";



type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({isOpen, onClose, onConfirm}: Props) {

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
        if (e.key === "Escape") {
          onClose();
        }
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
       document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />


      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 sm:p-7 text-center">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 text-lg"
        >
          x
        </button>

        <div className="w-14 h-14 mx-auto mb-4 p-4 rounded-full bg-red-100 flex items-center justify-center">
          <IoTrashBinOutline className="text-red-600" />
        </div>

        <h2 className="text-lg font-semibold text-(--primary) mb-2">
          Delete Habit?
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Are you sure you want to delete this habit? This action cannot be undone.
        </p>


        <div className="flex flex-col-reverse sm:flex-row gap-3">

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-slate-200 text-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            data-testid="confirm-delete-button"
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:opacity-95"
            aria-label="delete habit"
            role="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}