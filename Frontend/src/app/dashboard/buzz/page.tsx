"use client";

import { useState, useEffect } from "react";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { PlusCircle, Megaphone } from "lucide-react";
import { BuzzEditor } from "./components/buzz-editor";
import { useToast } from "@/hooks/use-toast";
import { createBuzz, deleteBuzz, editBuzz, getAllBuzz } from "@/lib/buzz";

interface Buzz {
  id: string;
  content: string;
  design: object;
  createdAt: string;
  updatedAt: string;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  id: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemName?: string;
}

function DeleteConfirmationModal({ isOpen, id, onClose, onConfirm, itemName = "this item" }: DeleteConfirmationModalProps) {
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
}

export default function BuzzPage() {
  const [buzzes, setBuzzes] = useState<Buzz[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBuzz, setEditingBuzz] = useState<Buzz | null>(null);
  const [deleteBuzzId, setDeleteBuzzId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBuzzes();
  }, []);

  const fetchBuzzes = async () => {
    try {
      const response = await getAllBuzz();

      setBuzzes(response);
    } catch (error) {
      console.error("Error fetching buzzes:", error);
      toast({
        title: "Error",
        description: "Failed to load buzzes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const DeleteBuzz = async (id: string) => {
    try {
      const response = await deleteBuzz(id);
      await fetchBuzzes();
      toast({
        title: "Success",
        description: "Buzz deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting buzz:", error);
      toast({
        title: "Error",
        description: "Failed to delete buzz. Please try again.",
        variant: "destructive",
      });
    }
    setDeleteBuzzId(null); // Close the modal after deletion
  };

  const handleAddBuzz = () => {
    setEditingBuzz(null);
    setIsEditorOpen(true);
  };

  const handleEditBuzz = (buzz: Buzz) => {
    setEditingBuzz(buzz);
    setIsEditorOpen(true);
  };

  const handleSave = () => {
    fetchBuzzes();
  };

  return (
    <>
      <PageTitle
        title="Manage Buzz"
        icon={Megaphone}
        action={
          <Button onClick={handleAddBuzz}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Buzz
          </Button>
        }
      />

      <div className="mt-6 space-y-6">
        {buzzes.map((buzz) => (
          <div key={buzz.id} className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: buzz.content }} />
            <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
              <div>Last updated: {new Date(buzz.updatedAt).toLocaleDateString()}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setDeleteBuzzId(buzz.id)}>
                  Delete
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditBuzz(buzz)}>
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}

        {buzzes.length === 0 && <div className="text-center py-12 text-muted-foreground">No buzz items yet. Click "Add Buzz" to create one.</div>}
      </div>

      <DeleteConfirmationModal
        isOpen={!!deleteBuzzId}
        id={deleteBuzzId}
        onClose={() => setDeleteBuzzId(null)}
        onConfirm={DeleteBuzz}
        itemName="this buzz"
      />

      <BuzzEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingBuzz(null);
        }}
        onSave={async (html, design) => {
         

          try {
             const response = editingBuzz ? await editBuzz(editingBuzz.id, html, design) : await createBuzz(html, design);

            await fetchBuzzes();

            toast({
              title: "Success",
              description: `${editingBuzz ? "Updated" : "Created"} buzz successfully.`,
            });
          } catch (error) {
            console.error(`Error ${editingBuzz ? "updating" : "creating"} buzz:`, error);
            toast({
              title: "Error",
              description: `${editingBuzz ? "Update" : "Create"} buzz. Please try again.`,
              variant: "destructive",
            });
          }
        }}
        initialDesign={editingBuzz?.design}
      />
    </>
  );
}
