"use client";

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, FileText, Loader2, Plus, Trash2, Edit } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";
import { api } from "@/lib/axiosClient";
import TablePagination from "@/components/ui/TablePagination";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AcademicSyllabus {
  id: number;
  department: string;
  category: string;
  pdfUrl?: string;
  createdAt: string;
}

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication Engineering",
  "Computer Science & Design",
  "Computer Science & Business System",
  "Artificial Intelligence & Machine Learning",
  "Mechanical Engineering",
  "Science & Humanities",
];

const CATEGORIES = ["Syllabus", "Scheme"];

export default function AcademicSyllabusPage() {
  const [dataList, setDataList] = useState<AcademicSyllabus[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filters
  const [filterDepartment, setFilterDepartment] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  // Create Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ department: "", category: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Edit Form State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({ department: "", category: "" });
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
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });
      if (filterDepartment) params.append("department", filterDepartment);
      if (filterCategory) params.append("category", filterCategory);

      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      const res = await api.get(`/academic-syllabus?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setDataList(res.data.data || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (error) {
      console.error("Failed to fetch academic syllabus", error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filterDepartment, filterCategory, toast]);

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

  const resetForm = () => {
    setFormData({ department: "", category: "" });
    setSelectedFile(null);
  };

  const resetEditForm = () => {
    setEditFormData({ department: "", category: "" });
    setEditSelectedFile(null);
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.department || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "Validation Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append("department", formData.department);
      formPayload.append("category", formData.category);
      formPayload.append("pdf", selectedFile);

      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      await api.post("/academic-syllabus", formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({ title: "Success", description: "Added successfully" });
      resetForm();
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save", error);
      toast({
        title: "Error",
        description: "Failed to save record",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (item: AcademicSyllabus) => {
    setEditId(item.id);
    setEditFormData({
      department: item.department,
      category: item.category,
    });
    setEditSelectedFile(null);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editFormData.department || !editFormData.category || !editId) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setEditSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append("department", editFormData.department);
      formPayload.append("category", editFormData.category);
      if (editSelectedFile) {
        formPayload.append("pdf", editSelectedFile);
      }

      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      await api.patch(`/academic-syllabus/${editId}`, formPayload, {
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

      await api.delete(`/academic-syllabus/${id}`, {
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
      const fullUrl = `${api.defaults.baseURL}/academic-syllabus/file/${pdfUrl}`;
      window.open(fullUrl, "_blank");
    } catch (e) {
      console.error("Error opening PDF", e);
      toast({ title: "Error", description: "Could not open PDF", variant: "destructive" });
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageTitle title="Academic Syllabus & Scheme" icon={BookOpen} />
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Syllabus / Scheme</DialogTitle>
              <DialogDescription>Upload a new PDF document.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department *</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">PDF File *</label>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full p-2 border rounded-md" required />
                {selectedFile && <p className="text-xs text-gray-500 mt-1">Selected: {selectedFile.name}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Record"
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
              <DialogTitle>Edit Syllabus / Scheme</DialogTitle>
              <DialogDescription>Modify document details or upload a new PDF.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department *</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={editFormData.department}
                  onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">PDF File (Optional)</label>
                <input type="file" accept="application/pdf" onChange={handleEditFileChange} className="w-full p-2 border rounded-md" />
                <p className="text-xs text-gray-400 mt-1">Leave blank to keep existing file.</p>
                {editSelectedFile && <p className="text-xs text-gray-500 mt-1">Selected: {editSelectedFile.name}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={editSubmitting}>
                {editSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
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

      <div className="bg-white p-4 rounded-lg shadow border flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Filter by Department</label>
          <select
            className="w-full p-2 border rounded-md"
            value={filterDepartment}
            onChange={(e) => {
              setFilterDepartment(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Filter by Category</label>
          <select
            className="w-full p-2 border rounded-md"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        {loading ? (
          <div className="flex flex-col items-center gap-2 py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Department</th>
                    <th className="px-4 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.length > 0 ? (
                    dataList.map((item) => (
                      <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3">{item.department}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${item.category === "Syllabus" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
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
                      <td colSpan={4} className="border-t px-4 py-8 text-center text-gray-500">
                        No records found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {dataList.length > 0 && (
              <div className="mt-6">
                <TablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  rowsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onRowsPerPageChange={(rows) => {
                    setItemsPerPage(rows);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
          </>
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
