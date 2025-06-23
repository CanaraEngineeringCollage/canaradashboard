"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

const EmailEditor = dynamic(() => import("react-email-editor"), { ssr: false });

interface BuzzEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (html: string, design: object) => void;
  initialDesign?: object;
}

export function BuzzEditor({ isOpen, onClose, onSave, initialDesign }: BuzzEditorProps) {
  const emailEditorRef = useRef<any>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [html, setHtml] = useState("");
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  console.log(html,"html");
  
  const handleSave = () => {
    if (emailEditorRef.current?.editor && isEditorLoaded) {
      emailEditorRef.current.editor.exportHtml((data: { design: object; html: string }) => {
        setHtml(data.html);
        onSave(data.html, data.design);
        onClose();
      });
    } else {
      console.warn("Email editor not loaded yet.");
    }
  };

  const handlePreview = () => {
    if (emailEditorRef.current?.editor && isEditorLoaded) {
      emailEditorRef.current.editor.exportHtml((data: { design: object; html: string }) => {
        setHtml(data.html);
        setIsPreview(true);
      });
    } else {
      console.warn("Email editor not loaded yet.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create/Edit Buzz</DialogTitle>
        </DialogHeader>
        {!isPreview ? (
          <div className="flex-1 min-h-0">
            <EmailEditor
              ref={emailEditorRef}
              minHeight="60vh"
              projectId={1234} // Replace with your actual Unlayer project ID
              options={{
                displayMode: "email",
                appearance: {
                  theme: "dark",
                },
              }}
              onReady={(editor: any) => {
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
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 text-base font-semibold"
                onClick={() => setIsPreview(false)}
              >
                Edit
              </Button>
              <Button
                className="rounded-full px-6 py-2 text-base font-semibold bg-primary text-white"
                onClick={handleSave}
              >
                Save Buzz
              </Button>
            </div>
          </div>
        )}
        {!isPreview && (
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 text-base font-semibold"
              onClick={handlePreview}
              disabled={!isEditorLoaded}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              className="rounded-full px-6 py-2 text-base font-semibold bg-primary text-white"
              onClick={handleSave}
              disabled={!isEditorLoaded}
            >
              Save Buzz
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}