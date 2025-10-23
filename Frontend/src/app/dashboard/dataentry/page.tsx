"use client";

import { useState, useEffect } from "react";

interface FileItem {
  id: number;
  name: string;
  mimetype: string;
  type: "pdf" | "image";
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "image">("image");
  const [customName, setCustomName] = useState<string>("");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<"all" | "pdf" | "image">("all");

  // Fetch files from backend
  const fetchFiles = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files`);
      const data = await res.json();
      setFiles(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle file upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const query = new URLSearchParams();
      query.append("type", fileType);
      if (customName.trim()) query.append("name", customName.trim());

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/upload?${query.toString()}`, {
        method: "POST",
        body: formData,
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

  // Delete file
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this file?")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/${id}`, {
        method: "DELETE",
      });
      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Filter files based on search term and type
  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === "all" || f.type === typeFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">📁 Upload Files</h1>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value as "pdf" | "image")}
            className="border rounded-lg px-3 py-2"
          >
            <option value="image">Image</option>
            <option value="pdf">PDF</option>
          </select>

          <input
            type="file"
            accept={fileType === "pdf" ? "application/pdf" : "image/*"}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Custom file name (optional)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {/* File List */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">📂 Uploaded Files</h2>

        {/* Search & Type Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-3 py-2 flex-1"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | "pdf" | "image")}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All</option>
            <option value="image">Images</option>
            <option value="pdf">PDFs</option>
          </select>
        </div>

        {filteredFiles.length === 0 ? (
          <p className="text-gray-500">No files found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredFiles.map((f) => (
              <div
                key={f.id}
                className="p-4 bg-white rounded-xl shadow border flex flex-col items-center"
              >
                {f.type === "image" ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/files/${f.name}`}
                    alt={f.name}
                    className="w-40 h-40 object-cover rounded-md border"
                  />
                ) : (
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/files/${f.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline truncate mt-4"
                  >
                    {f.name}
                  </a>
                )}

                <p className="mt-3 text-gray-700 text-sm truncate">{f.name}</p>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
