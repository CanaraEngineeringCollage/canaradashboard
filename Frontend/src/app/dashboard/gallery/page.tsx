"use client";
import React, { useEffect, useState } from "react";
import GalleryModal from "./components/GalleryModal/GalleryModal";
import { PageTitle } from "@/components/page-title";
import { Images, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createGallery, deleteGallery, editGallery, getAllGallery, getGalleryCategories } from "@/lib/gallery";
import { useToast } from "@/hooks/use-toast";
import TablePagination from "@/components/ui/TablePagination";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";
import { api } from "@/lib/axiosClient";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  id: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemName?: string;
}

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState(0);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const encrypted = localStorage.getItem("token");
    if (!encrypted) {
      router.push("/login");
      return;
    }
    try {
      const decrypted = decryptToken(encrypted);
      if (!decrypted || decrypted.length < 10) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, []);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const { data, total } = await getAllGallery(currentPage, rowsPerPage, selectedCategory, search);
      setGalleryItems(data || []);
      setTotalItems(total || 0);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      toast({
        title: "Error",
        description: "Failed to load gallery items.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getGalleryCategories();
      if (Array.isArray(data)) {
        const validCategories = ["All", ...data.filter((cat: string) => cat && typeof cat === "string" && cat.trim() !== "")];
        setCategories(validCategories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [currentPage, rowsPerPage, selectedCategory, search]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteGallery(id);
      fetchGallery();
      fetchCategories();
      toast({
        title: "Success",
        description: "Item deleted successfully.",
      });
    } catch (err) {
      console.error("Error deleting item:", err);
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      });
    } finally {
      setDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", selectedItem.title || "");
    formData.append("category", selectedItem.category || "");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    setIsSubmitting(true);
    try {
      if (isEdit && selectedItem.id) {
        await editGallery(selectedItem.id, formData);
      } else {
        await createGallery(formData);
      }
      toast({
        title: "Success",
        description: "Gallery item saved successfully.",
      });
      setShowModal(false);
      setSelectedItem({});
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsEdit(false);
      fetchGallery();
      fetchCategories();
    } catch (err) {
      console.error("Error saving item:", err);
      toast({
        title: "Error",
        description: "Failed to save gallery item.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setSelectedItem({
        ...selectedItem,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedItem({
      ...selectedItem,
      category: value,
    });
  };

  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    return `${api.defaults.baseURL}/gallery/file/${imageUrl}`;
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  return (
    <div className="p-6">
      <PageTitle
        title="Gallery Management"
        icon={Images}
        action={
          <Button
            onClick={() => {
              setIsEdit(false);
              setSelectedItem({});
              setSelectedFile(null);
              setPreviewUrl(null);
              setShowModal(true);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        }
      />
      <div className="flex items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border rounded px-3 py-2 max-w-xs">
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleryItems.map((item) => (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">
                  {item.imageUrl ? (
                    <img src={getImageUrl(item.imageUrl) || ""} alt={item.title} className="w-20 h-20 object-cover rounded" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">No Image</div>
                  )}
                </td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <button
                      className="px-3 py-1 rounded bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 mr-2 text-sm"
                      onClick={() => {
                        setDeleteId(item.id);
                        setDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 text-sm"
                      onClick={() => {
                        setIsEdit(true);
                        setSelectedItem(item);
                        setSelectedFile(null);
                        setPreviewUrl(getImageUrl(item.imageUrl));
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {isLoading ? (
              <tr>
                <td colSpan={4} className="border px-4 py-6 text-center text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : galleryItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={(p) => setCurrentPage(p)}
          onRowsPerPageChange={(r) => {
            setRowsPerPage(r);
            setCurrentPage(1);
          }}
        />
      </div>
      <GalleryModal
        isOpen={showModal}
        isEdit={isEdit}
        galleryData={selectedItem}
        imagePreview={previewUrl}
        onClose={() => {
          setShowModal(false);
          setIsEdit(false);
          setSelectedItem({});
          setSelectedFile(null);
          setPreviewUrl(null);
        }}
        onChange={handleInputChange}
        onCategoryChange={handleCategoryChange}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        id={deleteId || ""}
        itemName="this item"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default GalleryPage;

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
