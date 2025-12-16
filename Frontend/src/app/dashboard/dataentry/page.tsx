"use client";

import TablePagination from "@/components/ui/TablePagination";
import { apiFetch } from "@/lib/client";
import { decryptToken } from "@/lib/encrypt";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FileItem {
  id: number;
  name: string;
  mimetype: string;
  type: "pdf" | "image" | "video";
  department: string;
}

const departments = [
  "Common",
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication Engineering",
  "Computer Science & Design",
  "Computer Science & Business System",
  "Artificial Intelligence & Machine Learning",
  "Mechanical Engineering",
  "Science & Humanities",
  "Mandatory Disclosure",
];

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "image" | "video">("image");
  const [customName, setCustomName] = useState<string>("");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<"all" | "pdf" | "image" | "video">("all");
  const [department, setDepartment] = useState("Common");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
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
  }, []);

  // ✅ Fetch files WITH backend filters + pagination
  const fetchFiles = async () => {
    try {
      const query = new URLSearchParams();
      query.append("page", String(currentPage));
      query.append("limit", String(rowsPerPage));
      if (searchTerm.trim()) query.append("search", searchTerm.trim());
      if (typeFilter !== "all") query.append("type", typeFilter);
      if (departmentFilter !== "All") query.append("department", departmentFilter);

      const data = await apiFetch(`/files?${query.toString()}`);

      setFiles(Array.isArray(data.data) ? data.data : []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [searchTerm, typeFilter, departmentFilter, currentPage, rowsPerPage]);

  const handleUpload = async (e: React.FormEvent) => {
    const encrypted = localStorage.getItem("token");
    const token = encrypted ? decryptToken(encrypted) : null;
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const query = new URLSearchParams();
      query.append("type", fileType);
      query.append("department", department);
      if (customName.trim()) query.append("name", customName.trim());

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/upload?${query.toString()}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to upload file");

      setFile(null);
      setCustomName("");
      fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (file: FileItem) => {
    setFileToDelete(file);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async (id: number) => {
    const encrypted = localStorage.getItem("token");
    const token = encrypted ? decryptToken(encrypted) : null;
    try {
      await apiFetch(`/files/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleteModalOpen(false);
      setFileToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Upload UI */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">📁 Upload Files</h1>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="border rounded-lg px-3 py-2">
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select value={fileType} onChange={(e) => setFileType(e.target.value as "pdf" | "image" | "video")} className="border rounded-lg px-3 py-2">
            <option value="image">Image</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
          </select>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files?.[0];
              if (droppedFile) setFile(droppedFile);
            }}
            onPaste={(e) => {
              const pastedFile = Array.from(e.clipboardData.files)?.[0];
              if (pastedFile) setFile(pastedFile);
            }}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
          >
            <p className="text-gray-500 text-sm">Drag & drop or Paste your file here</p>
            <label className="text-blue-600 underline cursor-pointer mt-1 block">
              Select File
              <input
                type="file"
                accept={fileType === "pdf" ? "application/pdf" : fileType === "video" ? "video/*" : "image/*"}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>

            {file && (
              <div className="mt-4 flex flex-col items-center">
                {file.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-40 h-40 object-cover rounded-md border" />
                ) : file.type.startsWith("video/") ? (
                  <video src={URL.createObjectURL(file)} controls className="w-40 h-40 object-cover rounded-md border" />
                ) : (
                  <embed src={URL.createObjectURL(file)} type="application/pdf" className="w-40 h-40 border rounded-md" />
                )}
                <p className="mt-2 text-sm text-green-600 font-medium">{file.name}</p>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Custom file name (optional)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mt-10 flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as "all" | "pdf" | "image" | "video")}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="pdf">PDFs</option>
          <option value="video">Videos</option>
        </select>

        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="All">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* File List */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {files.length === 0 ? (
          <p className="text-gray-500">No files found.</p>
        ) : (
          files.map((f) => (
            <div key={f.id} className="p-4 bg-white rounded-xl shadow border flex flex-col items-center">
              {f.type === "image" ? (
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/files/${f.name}`} className="w-40 h-40 object-cover rounded-md border" />
              ) : f.type === "video" ? (
                <video src={`${process.env.NEXT_PUBLIC_API_URL}/files/${f.name}`} controls className="w-40 h-40 object-cover rounded-md border" />
              ) : (
                <a href={`${process.env.NEXT_PUBLIC_API_URL}/files/${f.name}`} target="_blank" className="text-blue-600 underline mt-4 truncate">
                  {f.name}
                </a>
              )}

              <p className="mt-3 text-gray-700 text-sm truncate">{f.name}</p>
              <p className="text-xs text-gray-500">{f.department}</p>

              <button onClick={() => openDeleteModal(f)} className="mt-2 text-sm text-red-600 hover:underline">
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* ✅ Pagination */}
      <div className="max-w-4xl mx-auto mt-6">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        id={fileToDelete?.id || null}
        itemName={fileToDelete?.name}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  id: number | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
  itemName?: string;
}

function DeleteConfirmationModal({ isOpen, id, onClose, onConfirm, itemName = "this item" }: DeleteConfirmationModalProps) {
  if (!isOpen || id === null) return null;
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
