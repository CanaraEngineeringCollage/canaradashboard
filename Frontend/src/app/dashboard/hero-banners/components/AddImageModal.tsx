import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const AddImageModal = ({ isOpen, onClose, onSubmit, isLoading }: AddImageModalProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [mobileFile, setMobileFile] = React.useState<File | null>(null);
  const [mobilePreviewUrl, setMobilePreviewUrl] = React.useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileState: React.Dispatch<React.SetStateAction<File | null>>,
    setPreviewState: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFileState(selectedFile);
      setPreviewState(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !mobileFile) return;

    // We need to pass both files. Since the onSubmit prop only takes the event,
    // we should modify the form data before it reaches the parent or just let the parent handle the form data extraction.
    // The parent uses `new FormData(e.currentTarget)`.
    // Since our inputs have `name="image"` and `name="mobileImage"`, the FormData will automatically include both!
    // So we just need to trigger the onSubmit.
    onSubmit(e);
  };

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setPreviewUrl(null);
      setMobileFile(null);
      setMobilePreviewUrl(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Home Page Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="image">Desktop Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFile, setPreviewUrl)} required />
              {previewUrl && (
                <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={previewUrl} alt="Desktop Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mobileImage">Mobile Image</Label>
              <Input
                id="mobileImage"
                name="mobileImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setMobileFile, setMobilePreviewUrl)}
                required
              />
              {mobilePreviewUrl && (
                <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={mobilePreviewUrl} alt="Mobile Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file || !mobileFile || isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddImageModal;
