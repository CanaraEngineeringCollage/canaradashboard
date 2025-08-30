"use client";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createTimeTable } from "@/lib/time-table";
import { BookOpenCheck, PlusCircle } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

// =============================
// AdminUploadModal.tsx
// =============================

export type UploadPayload = {
  academicYear: string;
  file: File;
};

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  id: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemName?: string;
}

interface AdminUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: UploadPayload) => void | Promise<void>;
  startYear?: number;
  maxSizeBytes?: number;
}

function AdminUploadModal({ open, onClose, onSubmit, startYear = 2000, maxSizeBytes = 15 * 1024 * 1024 }: AdminUploadModalProps) {
  const [academicYear, setAcademicYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Build a list like 2000-2001, 2001-2002, ...
  const academicYears = useMemo(() => {
    const now = new Date();
    const current = now.getFullYear();
    const end = current + 1;
    const list: string[] = [];
    for (let y = startYear; y <= end; y++) {
      list.push(`${y}-${y + 1}`);
    }
    return list.reverse();
  }, [startYear]);

  function resetState() {
    setAcademicYear("");
    setFile(null);
    setDragActive(false);
    setSubmitting(false);
  }

  function closeModal() {
    resetState();
    onClose();
  }

  function validateAndSet(selected: File | null) {
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      alert("Please select a PDF file (.pdf)");
      return;
    }
    if (selected.size > maxSizeBytes) {
      alert("File is too large!");
      return;
    }
    setFile(selected);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    validateAndSet(f);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }
  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0] || null;
    validateAndSet(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !academicYear) return;
    try {
      setSubmitting(true);
      await onSubmit({ academicYear, file });
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onKeyDown={(e) => {
        if (e.key === "Escape") closeModal();
      }}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

      {/* Modal Panel */}
      <div className="relative w-[92vw] max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-semibold">Upload PDF</h3>
          <button type="button" onClick={closeModal} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Academic Year */}
          <div className="grid gap-2">
            <label htmlFor="academicYear" className="text-sm font-medium">
              Academic Year
            </label>
            <select
              id="academicYear"
              className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-gray-900 focus:outline-none"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              required
            >
              <option value="" disabled>
                Select year (e.g., 2000-2001)
              </option>
              {academicYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* PDF Input */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">PDF File</label>
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
                dragActive ? "border-gray-900 bg-gray-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input ref={fileInputRef} type="file" accept="application/pdf" onChange={onFileChange} className="sr-only" id="pdfInput" />
              <label htmlFor="pdfInput" className="block cursor-pointer">
                <p className="text-sm">
                  Drag & drop your PDF here, or <span className="underline">choose file</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">PDF only • Max {Math.floor(maxSizeBytes / (1024 * 1024))} MB</p>
              </label>

              {file && (
                <div className="mt-3 rounded-xl bg-gray-50 p-3 text-left text-sm">
                  <p className="truncate font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button type="button" onClick={closeModal} className="rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || !academicYear || submitting}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =============================
// Demo wrapper with API call
// =============================

export default function DemoAdminUploadModal() {
  const [open, setOpen] = useState(false);
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { toast } = useToast();

  // In your DemoAdminUploadModal.tsx file

// In your DemoAdminUploadModal.tsx file

async function handleSubmit(payload: UploadPayload) {
  const formData = new FormData();
  formData.append("academicYear", payload.academicYear);
  formData.append("file", payload.file);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetables`, {
      method: "POST",
      body: formData,
      // Add this line to send the authentication cookie automatically
      credentials: "include", 
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    toast({
      title: "Success",
      description: "Timetable Uploaded successfully!",
    });
    setOpen(false);
    getTimetables(); // refresh after upload

  } catch (error) {
    console.error("Upload failed:", error);
    toast({
      variant: "destructive",
      title: "Upload Failed",
      description: "Please check your connection or log in again.",
    });
  }
}
  async function getTimetables() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetables`, { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch timetables");
      const data = await res.json();
      setTimetables(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetables/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete timetable");
      toast({
        title: "Success",
        description: "Timetable deleted successfully.",
      });
      setTimetables((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteModalOpen(false);
      setDeleteId(null);
    }
  }

  useEffect(() => {
    getTimetables();
  }, []);

  return (
    <div className="p-4">
      <PageTitle
        title="Exam Timetables"
        icon={BookOpenCheck}
        action={
          <Button onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Timetable
          </Button>
        }
      />

      <AdminUploadModal open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} startYear={2000} maxSizeBytes={15 * 1024 * 1024} />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        id={deleteId || 0}
        itemName="this timetable"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Academic Year</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((t) => {
              const pdfData = new Uint8Array(t.file.data);
              const blob = new Blob([pdfData], { type: t.mimetype });
              const url = URL.createObjectURL(blob);

              return (
                <tr key={t.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{t.filename}</td>
                  <td className="px-4 py-2">{t.academicYear}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => window.open(url, "_blank")} className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 mr-2">
                      View
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(t.id);
                        setDeleteModalOpen(true);
                      }}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {timetables.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No timetables found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
