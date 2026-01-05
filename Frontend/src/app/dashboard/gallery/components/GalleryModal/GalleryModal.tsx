import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  isEdit: boolean;
  galleryData: any;
  onClose: () => void;
  onChange: (e: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  imagePreview: string | null;
  onCategoryChange: (value: string) => void;
}

const CATEGORIES = [
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication Engineering",
  "Computer Science & Design",
  "Computer Science & Business System",
  "Artificial Intelligence & Machine Learning",
  "Mechanical Engineering",
  "Science & Humanities",
];

const GalleryModal = ({ isOpen, isEdit, galleryData, onClose, onChange, onSubmit, isLoading, imagePreview, onCategoryChange }: GalleryModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Gallery Item" : "Add Gallery Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={galleryData.title || ""} onChange={onChange} placeholder="Enter title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={galleryData.category} onValueChange={(value) => onCategoryChange(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={onChange}
                required={!isEdit} // Required only for new items
              />
              {imagePreview && (
                <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
