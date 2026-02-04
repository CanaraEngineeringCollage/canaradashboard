"use client";

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Loader2, Upload, FileText, Pencil, Trash2, Plus, Filter } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/axiosClient";
import TablePagination from "@/components/ui/TablePagination";

const allDepartments = [
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication Engineering",
  "Computer Science & Design",
  "Computer Science & Business System",
  "Artificial Intelligence & Machine Learning",
  "Mechanical Engineering",
  "Science & Humanities",
];

interface AcademicCalendar {
  id: number;
  year: string;
  department: string;
  pdf: { type: string; data: number[] } | string;
  createdAt: string;
}

export default function AcademicCalendarPage() {
  const [calendars, setCalendars] = useState<AcademicCalendar[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination & Filtering State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterYear, setFilterYear] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  // Modal & Form State
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    fetchAvailableData();
  }, []);

  const fetchAvailableData = async () => {
    try {
      const depts = await api.get("/academic-calendar/departments");
      setAvailableDepartments(depts.data);
      const years = await api.get("/academic-calendar/years");
      setAvailableYears(years.data);
    } catch (error) {
      console.error("Failed to fetch available data", error);
    }
  };

  const fetchCalendars = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        year: filterYear !== "all" ? filterYear : undefined,
        department: filterDepartment !== "all" ? filterDepartment : undefined,
      };

      const res = await api.get("/academic-calendar", { params });

      setCalendars(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
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
  }, [page, limit, filterYear, filterDepartment, toast]);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

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
    setYear("");
    setDepartment("");
    setSelectedFile(null);
    setEditId(null);
  };

  const handleEdit = (calendar: AcademicCalendar) => {
    setYear(calendar.year);
    setDepartment(calendar.department);
    setEditId(calendar.id);
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !department) {
      toast({
        title: "Missing fields",
        description: "Year and Department are required",
        variant: "destructive",
      });
      return;
    }

    if (!editId && !selectedFile) {
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
      formData.append("year", year);
      formData.append("department", department);
      if (selectedFile) {
        formData.append("pdf", selectedFile);
      }

      if (editId) {
        await api.patch(`/academic-calendar/${editId}`, formData, {
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
      fetchCalendars();
      fetchAvailableData(); // Refresh available departments/years
    } catch (error) {
      console.error("Failed to save calendar", error);
      toast({
        title: "Error",
        description: `Failed to ${editId ? "update" : "add"} Academic Calendar`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/academic-calendar/${deleteId}`);
      toast({ title: "Success", description: "Calendar deleted successfully" });
      fetchCalendars();
      fetchAvailableData();
    } catch (error) {
      console.error("Failed to delete", error);
      toast({
        title: "Error",
        description: "Failed to delete calendar",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const openPdf = (pdfData: any) => {
    if (!pdfData) return;

    try {
      if (pdfData.type === "Buffer" && Array.isArray(pdfData.data)) {
        const byteArray = new Uint8Array(pdfData.data);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else if (typeof pdfData === "string") {
        window.open(pdfData, "_blank");
      }
    } catch (e) {
      console.error("Error opening PDF", e);
      toast({ title: "Error", description: "Could not open PDF", variant: "destructive" });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
              <DialogTitle>{editId ? "Edit Academic Calendar" : "Add Academic Calendar"}</DialogTitle>
              <DialogDescription>
                {editId ? "Update details or replace the PDF." : "Upload a new academic calendar PDF for a specific department and year."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="year" className="text-sm font-medium">
                  Year
                </label>
                <Input id="year" placeholder="e.g. 2024-2025" value={year} onChange={(e) => setYear(e.target.value)} disabled={submitting} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={department} onValueChange={setDepartment} disabled={submitting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {allDepartments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{editId ? "Replace PDF (Optional)" : "Upload PDF"}</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
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
                      <FileText className="h-8 w-8 text-blue-500 mb-2" />
                      <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{selectedFile.name}</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-6 text-red-600 hover:bg-red-50 text-xs"
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
                      <Upload className={`h-8 w-8 mb-2 ${isDragging ? "text-blue-500" : "text-gray-400"}`} />
                      <p className="text-xs text-gray-600 font-medium">{isDragging ? "Drop PDF here" : "Click or drag PDF"}</p>
                      {editId && <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing file</p>}
                    </>
                  )}
                  <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} disabled={submitting} className="hidden" />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={submitting || !year || !department || (!editId && !selectedFile)}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editId ? "Updating..." : "Adding..."}
                  </>
                ) : editId ? (
                  "Update Calendar"
                ) : (
                  "Add Calendar"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border flex flex-col gap-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center w-full md:w-auto">
            {/* Year Filter */}
            <div className="w-full md:w-48">
              <Select
                value={filterYear}
                onValueChange={(val) => {
                  setFilterYear(val);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {availableYears.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div className="w-full md:w-64">
              <Select
                value={filterDepartment}
                onValueChange={(val) => {
                  setFilterDepartment(val);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {availableDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* <div className="text-sm text-gray-500">
            Total Records: <span className="font-semibold text-gray-900">{total}</span>
          </div> */}
        </div>

        {/* Table View */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Uploaded On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-500 mr-2" />
                      Loading...
                    </div>
                  </TableCell>
                </TableRow>
              ) : calendars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                    No academic calendars found.
                  </TableCell>
                </TableRow>
              ) : (
                calendars.map((calendar) => (
                  <TableRow key={calendar.id}>
                    <TableCell className="font-medium">{calendar.year}</TableCell>
                    <TableCell>{calendar.department}</TableCell>
                    <TableCell>{new Date(calendar.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openPdf(calendar.pdf)}>
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(calendar)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setDeleteId(calendar.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && total > 0 && (
          <TablePagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            rowsPerPage={limit}
            onRowsPerPageChange={(r) => {
              setLimit(r);
              setPage(1);
            }}
          />
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the academic calendar.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
