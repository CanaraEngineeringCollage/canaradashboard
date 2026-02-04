import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  id: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemName?: string;
}

const DeleteConfirmationModal = ({ isOpen, id, onClose, onConfirm, itemName = "this item" }: DeleteConfirmationModalProps) => {
  if (!isOpen || !id) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={() => onConfirm(id)} className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
