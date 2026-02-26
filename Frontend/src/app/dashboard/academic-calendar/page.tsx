"use client";

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Loader2, Upload, FileText, Plus } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/axiosClient";

interface AcademicCalendar {
  id: number;
  year: string;
  department: string;
  pdfUrl?: string;
  createdAt: string;
}

export default function AcademicCalendarPage() {
  const [calendar, setCalendar] = useState<AcademicCalendar | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  const fetchCalendar = useCallback(async () => {
    setLoading(true);
    try {
      // Just fetch the latest one
      const res = await api.get("/academic-calendar");
      if (res.data) {
        setCalendar(res.data);
      } else {
        setCalendar(null);
      }
    } catch (error) {
      console.error("Failed to fetch calendar", error);
      toast({
        title: "Error",
        description: "Failed to fetch academic calendar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

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

  const resetForm = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If adding new (no calendar exists), file is required.
    // If updating (calendar exists), file is required if we are not just changing metadata (but here we only have file).
    // Actually, since we only have file upload, it is always required unless we were keeping the old file, but what's the point of updating then?
    // Let's assume for update, they must provide a new file if they clicked "Update".

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
      const formData = new FormData();
      // Hardcode required backend fields
      // formData.append("year", "Current");
      // formData.append("department", "General");

      if (selectedFile) {
        formData.append("pdf", selectedFile);
      }

      if (calendar) {
        await api.patch(`/academic-calendar/${calendar.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({ title: "Success", description: "Calendar updated successfully" });
      } else {
        await api.post("/academic-calendar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast({ title: "Success", description: "Academic Calendar added successfully" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchCalendar();
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
      <PageTitle title="Academic Calendar" icon={Calendar} />

      <div className="bg-white p-6 rounded-lg shadow border flex flex-col gap-6 items-center justify-center min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading calendar...</p>
          </div>
        ) : calendar ? (
          <div className="flex flex-col items-center gap-4 text-center max-w-md w-full">
            <div className="bg-blue-50 p-6 rounded-full">
              <FileText className="h-12 w-12 text-blue-600" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Current Academic Calendar</h3>
              <p className="text-sm text-gray-500">Uploaded {new Date(calendar.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-3 w-full mt-2">
              <Button variant="outline" className="flex-1" onClick={() => openPdf(calendar.pdfUrl)}>
                View PDF
              </Button>

              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}
              >
                <DialogTrigger asChild>
                  <Button className="flex-1">Update PDF</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Update Academic Calendar</DialogTitle>
                    <DialogDescription>Upload a new PDF to replace the current academic calendar.</DialogDescription>
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
                        <input
                          id="pdf-upload"
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          disabled={submitting}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={submitting || !selectedFile}>
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Calendar"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="bg-gray-100 p-6 rounded-full">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium">No Calendar Found</h3>
              <p className="text-sm text-gray-500 max-w-sm">There is currently no academic calendar uploaded.</p>
            </div>

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
                  <DialogDescription>Upload the academic calendar PDF.</DialogDescription>
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
                      <input
                        id="pdf-upload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        disabled={submitting}
                        className="hidden"
                      />
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
          </div>
        )}
      </div>
    </div>
  );
}
