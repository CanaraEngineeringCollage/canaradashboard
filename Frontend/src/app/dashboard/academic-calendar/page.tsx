"use client";

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Loader2, Upload, FileText, Plus, Trash2, Edit } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";
import { api } from "@/lib/axiosClient";
import TablePagination from "@/components/ui/TablePagination";

interface AcademicCalendar {
  id: number;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AcademicCalendarPage() {
  const [dataList, setDataList] = useState<AcademicCalendar[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Edit Form State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editSelectedFile, setEditSelectedFile] = useState<File | null>(null);

  // Delete State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

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
  }, [router]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      const res = await api.get("/academic-calendar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setDataList(res.data || []);
      } else {
        setDataList([]);
      }
    } catch (error) {
      console.error("Failed to fetch calendars", error);
      toast({
        title: "Error",
        description: "Failed to fetch academic calendars",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      setEditSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleEditDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      setEditSelectedFile(file);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
  };

  const resetEditForm = () => {
    setEditSelectedFile(null);
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "Missing file",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      const formData = new FormData();
      if (selectedFile) {
        formData.append("pdf", selectedFile);
      }

      await api.post("/academic-calendar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast({ title: "Success", description: "Academic Calendar added successfully" });

      resetForm();
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save calendar", error);
      toast({
        title: "Error",
        description: "Failed to save Academic Calendar",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (item: AcademicCalendar) => {
    setEditId(item.id);
    setEditSelectedFile(null);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editId) {
      return;
    }

    if (!editSelectedFile) {
      toast({
        title: "Missing file",
        description: "Please upload a new PDF file to update",
        variant: "destructive",
      });
      return;
    }

    setEditSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append("pdf", editSelectedFile);

      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      await api.patch(`/academic-calendar/${editId}`, formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({ title: "Success", description: "Updated successfully" });
      resetEditForm();
      setIsEditDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to update", error);
      toast({
        title: "Error",
        description: "Failed to update record",
        variant: "destructive",
      });
    } finally {
      setEditSubmitting(false);
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      await api.delete(`/academic-calendar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Success", description: "Record deleted successfully" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete", error);
      toast({ title: "Error", description: "Failed to delete record", variant: "destructive" });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const openPdf = (pdfUrl?: string) => {
    if (!pdfUrl) return;

    try {
      const fullUrl = `${api.defaults.baseURL}/academic-calendar/file/${pdfUrl}`;
      window.open(fullUrl, "_blank");
    } catch (e) {
      console.error("Error opening PDF", e);
      toast({ title: "Error", description: "Could not open PDF", variant: "destructive" });
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageTitle title="Academic Calendar" icon={Calendar} />

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Calendar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Academic Calendar</DialogTitle>
              <DialogDescription>Upload a new PDF to add to the academic calendar list.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("pdf-upload")?.click()}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-blue-500 mb-2" />
                      <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{selectedFile.name}</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className={`h-10 w-10 mb-3 ${isDragging ? "text-blue-500" : "text-gray-400"}`} />
                      <p className="text-sm text-gray-600 font-medium">{isDragging ? "Drop PDF here" : "Click to upload or drag and drop"}</p>
                      <p className="text-xs text-gray-400 mt-1">PDF items only</p>
                    </>
                  )}
                  <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} disabled={submitting} className="hidden" />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={submitting || !selectedFile}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Calendar"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) resetEditForm();
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Update Academic Calendar</DialogTitle>
              <DialogDescription>Upload a new PDF to update this document.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={handleEditDrop}
                  onClick={() => document.getElementById("pdf-edit-upload")?.click()}
                >
                  {editSelectedFile ? (
                    <div className="flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-blue-500 mb-2" />
                      <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{editSelectedFile.name}</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditSelectedFile(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className={`h-10 w-10 mb-3 ${isDragging ? "text-blue-500" : "text-gray-400"}`} />
                      <p className="text-sm text-gray-600 font-medium">{isDragging ? "Drop PDF here" : "Click to upload a new PDF"}</p>
                      <p className="text-xs text-gray-400 mt-1">PDF items only</p>
                    </>
                  )}
                  <input
                    id="pdf-edit-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleEditFileChange}
                    disabled={editSubmitting}
                    className="hidden"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={editSubmitting || !editSelectedFile}>
                {editSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Alert Dialog */}
        <DeleteConfirmationModal
          isOpen={isDeleteDialogOpen}
          id={deleteId || 0}
          itemName="this document"
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        {loading ? (
          <div className="flex flex-col items-center gap-2 py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Uploaded Date</th>
                  <th className="px-4 py-3 text-left font-medium">Last Modified</th>
                  <th className="px-4 py-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length > 0 ? (
                  dataList.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{new Date(item.updatedAt || item.createdAt).toLocaleDateString("en-GB")}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => openPdf(item.pdfUrl)}>
                            <FileText className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditClick(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setDeleteId(item.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="border-t px-4 py-8 text-center text-gray-500">
                      No calendars found. Please add a new academic calendar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  id: number;
  onClose: () => void;
  onConfirm: (id: number) => void;
  itemName?: string;
};

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
