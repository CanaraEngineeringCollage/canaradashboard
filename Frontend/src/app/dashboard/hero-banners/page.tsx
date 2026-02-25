"use client";
import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/page-title";
import { Image as ImageIcon, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getAllHomePageImages, createHomePageImage, deleteHomePageImage } from "@/lib/home-page-images";
import AddImageModal from "./components/AddImageModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { getImageUrl } from "@/lib/utils";

const HomePageImagesPage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { toast } = useToast();

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const data = await getAllHomePageImages();
      setImages(data || []);
    } catch (err) {
      console.error("Error fetching images:", err);
      toast({
        title: "Error",
        description: "Failed to load images.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    try {
      await createHomePageImage(formData);
      toast({ title: "Success", description: "Image uploaded successfully." });
      setIsModalOpen(false);
      fetchImages();
    } catch (err) {
      console.error("Error uploading image:", err);
      toast({
        title: "Error",
        description: "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHomePageImage(id);
      toast({ title: "Success", description: "Image deleted successfully." });
      fetchImages();
    } catch (err) {
      console.error("Error deleting image:", err);
      toast({
        title: "Error",
        description: "Failed to delete image.",
        variant: "destructive",
      });
    } finally {
      setDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6">
      <PageTitle
        title="Home Page Hero Images"
        icon={ImageIcon}
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {images.map((img) => (
          <div key={img.id} className="border rounded-lg overflow-hidden shadow-sm relative group">
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
              {img.image ? (
                <img src={getImageUrl(img.image as any) || ""} alt="Desktop Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400">No Desktop Image</div>
              )}

              {/* Mobile Image Overlay (bottom right corner) */}
              <div className="absolute bottom-2 right-2 w-16 h-24 border-2 border-white shadow-md bg-gray-200 overflow-hidden rounded-md z-10 hover:scale-150 transition-transform origin-bottom-right">
                {img.mobileImage ? (
                  <img src={getImageUrl(img.mobileImage as any) || ""} alt="Mobile Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-[8px] text-gray-500 text-center p-1">No Mobile</div>
                )}
              </div>
            </div>
            <div className="p-4 flex justify-end items-center bg-white">
              <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => confirmDelete(img.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {isLoading && images.length === 0 && <div className="text-center py-10 text-gray-500">Loading images...</div>}

      {!isLoading && images.length === 0 && <div className="text-center py-10 text-gray-500">No images found. upload one to get started.</div>}

      <AddImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleUpload} isLoading={isSubmitting} />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        id={deleteId}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName="this image"
      />
    </div>
  );
};

export default HomePageImagesPage;
