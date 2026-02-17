"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/client";

const EmailEditor = dynamic(() => import("react-email-editor"), { ssr: false });

interface BuzzEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (html: string, design: object, category: string, eventDate: string, eventName: string, newsLetter?: string) => void;
  initialDesign?: object;
  initialCategory?: string;
  initialEventDate?: string;
  isEditing: any;
  initalEventName?: string;
}

export function BuzzEditor({
  isOpen,
  onClose,
  onSave,
  initialDesign,
  initialCategory,
  initialEventDate,
  isEditing,
  initalEventName,
}: BuzzEditorProps) {
  const emailEditorRef = useRef<any>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [html, setHtml] = useState("");
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [category, setCategory] = useState(initialCategory || "Sports");
  const [eventDate, setEventDate] = useState(initialEventDate || "");
  const [eventName, setEventName] = useState(initalEventName || "");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentPdfName, setCurrentPdfName] = useState<string>("");

  const { toast } = useToast();
  const categories = [
    "Student Achievements",
    "Sports",
    "Fest",
    "Academics",
    "Cultural Events",
    "Technical Events",
    "Exams",
    "CSR",
    "Alumni",
    "Career Guidance",
    "Newsletter",
  ];

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
    if (initialEventDate) setEventDate(initialEventDate);
    if (initalEventName) setEventName(initalEventName);

    // If editing a newsletter, we might want to show the existing file name
    // Since we don't pass the full object here, we rely on parent to pass it or we just show a placeholder
    if (isEditing && initialCategory === "Newsletter" && isEditing.newsLetter) {
      setCurrentPdfName(isEditing.newsLetter);
    } else {
      setCurrentPdfName("");
    }
  }, [initialCategory, initialEventDate, initalEventName, isEditing, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const uploadPdf = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      // Upload with type=pdf
      const response = await apiFetch("/files/upload?type=pdf&department=Common", {
        method: "POST",
        body: formData,
      });
      return response.name; // Use the 'name' field from the FileEntity response
    } catch (error) {
      console.error("PDF Upload failed", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!eventName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Event Name",
        variant: "destructive",
      });
      return;
    }
    if (!category.trim()) {
      toast({
        title: "Error",
        description: " Please select a Category",
        variant: "destructive",
      });
      return;
    }

    if (category === "Newsletter") {
      let newsLetterName = currentPdfName;

      if (pdfFile) {
        setUploading(true);
        try {
          const uploadedName = await uploadPdf(pdfFile);
          newsLetterName = uploadedName;
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to upload PDF",
            variant: "destructive",
          });
          setUploading(false);
          return;
        }
        setUploading(false);
      } else if (!isEditing && !pdfFile) {
        toast({
          title: "Error",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }

      // For newsletter, we might not need HTML/Design provided by email editor
      onSave(`<h1>${eventName}</h1>`, {}, category, eventDate, eventName, newsLetterName);
      onClose();
      resetForm();
      return;
    }

    if (emailEditorRef.current?.editor && isEditorLoaded) {
      emailEditorRef.current.editor.exportHtml((data: { design: object; html: string }) => {
        setHtml(data.html);
        onSave(data.html, data.design, category, eventDate, eventName);
        onClose();
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setEventName("");
    setEventDate("");
    setCategory("Sports");
    setPdfFile(null);
    setCurrentPdfName("");
  };

  const closeHandler = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeHandler}>
      <DialogContent className="max-w-5xl h-[95vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{isEditing ? "Editing Buzz" : "Create Buzz"}</DialogTitle>
        </DialogHeader>

        {/* Category + Date */}
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {category === "Newsletter" ? "Name of the Newsletter" : "Name of Event"}
            </label>
            <input
              required
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {category !== "Newsletter" && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Event</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {category === "Newsletter" ? (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10">
            <h3 className="text-lg font-medium mb-4">Upload Newsletter PDF</h3>
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
            {currentPdfName && !pdfFile && <p className="text-sm text-green-600 mb-2">Current File: {currentPdfName}</p>}
            {pdfFile && <p className="text-sm text-blue-600 mb-2">Selected: {pdfFile.name}</p>}
            <p className="text-xs text-gray-500">Max file size: 150MB</p>
          </div>
        ) : !isPreview ? (
          <div className="flex-1 min-h-0">
            <EmailEditor
              ref={emailEditorRef}
              minHeight="60vh"
              projectId={1234}
              options={{ displayMode: "email", appearance: { theme: "dark" } }}
              onReady={() => {
                setIsEditorLoaded(true);
                if (initialDesign && emailEditorRef.current?.editor) {
                  emailEditorRef.current.editor.loadDesign(initialDesign);
                }
              }}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-white rounded p-4 prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )}

        {(!isPreview || category === "Newsletter") && (
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="rounded-full px-6 py-2 text-base font-semibold bg-primary text-white"
              onClick={handleSave}
              disabled={(!isEditorLoaded && category !== "Newsletter") || uploading}
            >
              {uploading ? "Uploading..." : "Save Buzz"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
