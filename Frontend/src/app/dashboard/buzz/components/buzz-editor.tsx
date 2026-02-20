"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/client";
import { PlusCircle, Trash2 } from "lucide-react";

const EmailEditor = dynamic(() => import("react-email-editor"), { ssr: false });

interface BuzzEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    html: string,
    design: object,
    category: string,
    eventDate: string,
    eventName: string,
    weeklyDigest?: { editionName: string; items: { name: string; pdf: string }[] }[],
  ) => void;
  initialDesign?: object;
  initialCategory?: string;
  initialEventDate?: string;
  isEditing: any;
  initalEventName?: string;
  existingEditions?: string[];
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
  existingEditions = [],
}: BuzzEditorProps) {
  const emailEditorRef = useRef<any>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [html, setHtml] = useState("");
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [category, setCategory] = useState(initialCategory || "Sports");
  const [eventDate, setEventDate] = useState(initialEventDate || "");
  const [eventName, setEventName] = useState(initalEventName || "");
  const [uploading, setUploading] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState<{ editionName: string; items: { name: string; pdf: string; file?: File }[] }[]>([]);

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
    "Weekly Digest",
  ];

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
    if (initialEventDate) setEventDate(initialEventDate);
    if (initalEventName) setEventName(initalEventName);

    if (isEditing && initialCategory === "Weekly Digest" && isEditing.weeklyDigest) {
      setWeeklyDigest(
        isEditing.weeklyDigest.map((ed: any) => ({
          editionName: ed.editionName,
          items: ed.items.map((item: any) => ({ name: item.name, pdf: item.pdf })),
        })),
      );
    } else {
      setWeeklyDigest([]);
    }
  }, [initialCategory, initialEventDate, initalEventName, isEditing, isOpen]);

  const handleItemFileChange = (e: React.ChangeEvent<HTMLInputElement>, editionIdx: number, itemIdx: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDigest = [...weeklyDigest];
      newDigest[editionIdx].items[itemIdx].file = file;
      setWeeklyDigest(newDigest);
    }
  };

  const uploadPdf = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await apiFetch("/files/upload?type=pdf&department=Common", {
        method: "POST",
        body: formData,
      });
      return response.name;
    } catch (error) {
      console.error("PDF Upload failed", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (category !== "Weekly Digest" && !eventName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an Event Name",
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

    if (category === "Weekly Digest") {
      const editionNames = weeklyDigest.map((ed) => ed.editionName.trim().toLowerCase());
      const uniqueNames = new Set(editionNames);
      if (uniqueNames.size !== editionNames.length) {
        toast({
          title: "Error",
          description: "Edition names must be unique within this digest. Please resolve any duplicates.",
          variant: "destructive",
        });
        return;
      }

      const existingEditionsLower = existingEditions.map((e) => e.toLowerCase());
      const originalEditionNames = isEditing && isEditing.weeklyDigest ? isEditing.weeklyDigest.map((ed: any) => ed.editionName.toLowerCase()) : [];

      const hasGlobalDuplicate = editionNames.some((name) => existingEditionsLower.includes(name) && !originalEditionNames.includes(name));

      if (hasGlobalDuplicate) {
        toast({
          title: "Error",
          description: "One or more edition names already exist in the database. Edition names must be globally unique.",
          variant: "destructive",
        });
        return;
      }

      for (const edition of weeklyDigest) {
        if (!edition.editionName.trim()) {
          toast({ title: "Error", description: "All editions must have a name.", variant: "destructive" });
          return;
        }
        if (edition.items.length === 0) {
          toast({ title: "Error", description: `Edition "${edition.editionName}" must have at least one PDF item.`, variant: "destructive" });
          return;
        }
        for (const item of edition.items) {
          if (!item.name.trim()) {
            toast({ title: "Error", description: `All items in "${edition.editionName}" must have a name.`, variant: "destructive" });
            return;
          }
          if (!item.pdf && !item.file) {
            toast({ title: "Error", description: `All items in "${edition.editionName}" must have a PDF file attached.`, variant: "destructive" });
            return;
          }
        }
      }

      setUploading(true);
      try {
        const processedDigest = await Promise.all(
          weeklyDigest.map(async (edition) => {
            const processedItems = await Promise.all(
              edition.items.map(async (item) => {
                if (item.file) {
                  const uploadedName = await uploadPdf(item.file);
                  return { name: item.name, pdf: uploadedName };
                }
                return { name: item.name, pdf: item.pdf };
              }),
            );
            return { editionName: edition.editionName, items: processedItems };
          }),
        );

        onSave(
          `<h1>${category === "Weekly Digest" ? "Weekly Digest" : eventName}</h1>`,
          {},
          category,
          eventDate,
          category === "Weekly Digest" ? "Weekly Digest" : eventName,
          processedDigest,
        );
        onClose();
        resetForm();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload one or more PDFs",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
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
    setWeeklyDigest([]);
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
          {category !== "Weekly Digest" && (
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
          )}
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

          {category !== "Weekly Digest" && (
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

        {category === "Weekly Digest" ? (
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Weekly Digest Editions</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  let newName = `Edition ${weeklyDigest.length + 1}`;
                  let counter = weeklyDigest.length + 1;
                  const allExistingNames = [...existingEditions.map((e) => e.toLowerCase()), ...weeklyDigest.map((e) => e.editionName.toLowerCase())];

                  while (allExistingNames.includes(newName.toLowerCase())) {
                    counter++;
                    newName = `Edition ${counter}`;
                  }
                  setWeeklyDigest([...weeklyDigest, { editionName: newName, items: [] }]);
                }}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Edition
              </Button>
            </div>
            {weeklyDigest.map((ed, edIdx) => (
              <div key={edIdx} className="p-4 border border-gray-300 rounded-md bg-gray-50 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="w-1/2 flex flex-col gap-1">
                    <input
                      type="text"
                      value={ed.editionName}
                      onChange={(e) => {
                        const newDigest = [...weeklyDigest];
                        newDigest[edIdx].editionName = e.target.value;
                        setWeeklyDigest(newDigest);
                      }}
                      placeholder="Edition Name"
                      className={`rounded-md border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        weeklyDigest.filter((d, i) => i !== edIdx && d.editionName.trim().toLowerCase() === ed.editionName.trim().toLowerCase())
                          .length > 0 ||
                        (existingEditions.map((e) => e.toLowerCase()).includes(ed.editionName.trim().toLowerCase()) &&
                          !isEditing?.weeklyDigest?.map((orig: any) => orig.editionName.toLowerCase()).includes(ed.editionName.trim().toLowerCase()))
                          ? "border-red-500 text-red-600 focus:ring-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {(() => {
                      const isLocalDuplicate =
                        weeklyDigest.filter((d, i) => i !== edIdx && d.editionName.trim().toLowerCase() === ed.editionName.trim().toLowerCase())
                          .length > 0;
                      const isGlobalDuplicate =
                        existingEditions.map((e) => e.toLowerCase()).includes(ed.editionName.trim().toLowerCase()) &&
                        !isEditing?.weeklyDigest?.map((orig: any) => orig.editionName.toLowerCase()).includes(ed.editionName.trim().toLowerCase());

                      if (isLocalDuplicate) return <span className="text-xs text-red-500">Duplicate name in form</span>;
                      if (isGlobalDuplicate) return <span className="text-xs text-red-500">Edition already exists in database</span>;
                      return null;
                    })()}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newDigest = [...weeklyDigest];
                        newDigest[edIdx].items.push({ name: "", pdf: "" });
                        setWeeklyDigest(newDigest);
                      }}
                    >
                      Add PDF Item
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newDigest = [...weeklyDigest];
                        newDigest.splice(edIdx, 1);
                        setWeeklyDigest(newDigest);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {ed.items.length > 0 && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-300 mt-2">
                    {ed.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex flex-wrap items-center gap-3 bg-white p-2 rounded border border-gray-200">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const newDigest = [...weeklyDigest];
                            newDigest[edIdx].items[itemIdx].name = e.target.value;
                            setWeeklyDigest(newDigest);
                          }}
                          placeholder="Item Name (e.g. Circular 1)"
                          className="flex-1 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none"
                        />
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleItemFileChange(e, edIdx, itemIdx)}
                            className="text-sm w-full"
                          />
                          {(item.file || item.pdf) && (
                            <span className="text-xs text-green-600 font-semibold truncate max-w-[150px]">
                              {item.file ? item.file.name : item.pdf}
                            </span>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            const newDigest = [...weeklyDigest];
                            newDigest[edIdx].items.splice(itemIdx, 1);
                            setWeeklyDigest(newDigest);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {weeklyDigest.length === 0 && (
              <p className="text-center text-gray-500 my-4">No editions added yet. Click &quot;Add Edition&quot; to start.</p>
            )}
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

        {(!isPreview || category === "Weekly Digest") && (
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="rounded-full px-6 py-2 text-base font-semibold bg-primary text-white"
              onClick={handleSave}
              disabled={(!isEditorLoaded && category !== "Weekly Digest") || uploading}
            >
              {uploading ? "Uploading..." : "Save Buzz"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
