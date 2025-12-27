"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const EmailEditor = dynamic(() => import("react-email-editor"), { ssr: false });

interface BuzzEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (html: string, design: object, category: string, eventDate: string, eventName: string) => void;
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

  const { toast } = useToast();
  const categories = ["Student Achievements","Sports", "Fest", "Academics", "Cultural Events", "Technical Events", "Exams", "CSR", "Alumni","Career Guidance"];

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
    if (initialEventDate) setEventDate(initialEventDate);
    if (initalEventName) setEventName(initalEventName);
  }, [initialCategory, initialEventDate, initalEventName]);

  const handleSave = () => {
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
    // if (!eventDate.trim()) {
    //   toast({
    //     title: "Error",
    //     description: " Please select a Date",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    if (emailEditorRef.current?.editor && isEditorLoaded) {
      emailEditorRef.current.editor.exportHtml((data: { design: object; html: string }) => {
        setHtml(data.html);
        onSave(data.html, data.design, category, eventDate, eventName);
        onClose();
      });
      setEventName("");
      setEventDate("");
      setCategory("Sports");
    }
  };

  const closeHandler = () => {
    onClose();
    setEventName("");
    setEventDate("");
    setCategory("Sports");
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Name of Event</label>
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

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Event</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {!isPreview ? (
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

        {!isPreview && (
          <div className="flex justify-end gap-4 mt-4">
            <Button className="rounded-full px-6 py-2 text-base font-semibold bg-primary text-white" onClick={handleSave} disabled={!isEditorLoaded}>
              Save Buzz
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
