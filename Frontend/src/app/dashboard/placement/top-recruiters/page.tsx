"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/page-title";
import TablePagination from "@/components/ui/TablePagination";
import { Briefcase, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";
import { apiFetch } from "@/lib/client";
import CreateRecruiterModal from "./CreateRecruiterModal";
import EditRecruiterModal from "./EditRecruiterModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import Delete Modal
import { Button } from "@/components/ui/button";

export type TopRecruiter = {
  id: number;
  companyName: string;
  mode: string;
  type: string;
  package: string;
  studentsRecruited: number;
  year: string;
};

export default function TopRecruitersPage() {
  const router = useRouter();
  const [data, setData] = useState<TopRecruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [year, setYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Delete modal state
  const [selectedRecruiter, setSelectedRecruiter] = useState<TopRecruiter | null>(null);
  const [recruiterToDelete, setRecruiterToDelete] = useState<TopRecruiter | null>(null); // State for deletion

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const encrypted = localStorage.getItem("token");
    if (!encrypted) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [year, currentPage, debouncedSearch, itemsPerPage]);

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;
      const response = await apiFetch("/placement/top-recruiters/years", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response)) {
        setAvailableYears(response);
      }
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      const queryYear = year === "all" ? "" : year;
      console.log("Fetching data:", { year, currentPage, itemsPerPage });
      const response = await apiFetch(
        `/placement/top-recruiters?year=${queryYear}&page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("API Response:", response);

      setData(response.data);
      if (response.meta) {
        setTotalPages(response.meta.totalPages);
      } else {
        console.error("Missing meta in response", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
    fetchYears();
  };

  const handleEdit = (recruiter: TopRecruiter) => {
    setSelectedRecruiter(recruiter);
    setEditModalOpen(true);
  };

  // Open delete modal
  const confirmDelete = (recruiter: TopRecruiter) => {
    setRecruiterToDelete(recruiter);
    setDeleteModalOpen(true);
  };

  // Perform delete
  const handleDelete = async (id: number) => {
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      await apiFetch(`/placement/top-recruiters/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeleteModalOpen(false);
      setRecruiterToDelete(null);
      refreshData();
    } catch (error) {
      console.error("Error deleting recruiter:", error);
    }
  };

  return (
    <div className="p-6">
      <EditRecruiterModal open={editModalOpen} onOpenChange={setEditModalOpen} data={selectedRecruiter} onSuccess={refreshData} />

      <CreateRecruiterModal open={createModalOpen} onOpenChange={setCreateModalOpen} onSuccess={refreshData} />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        id={recruiterToDelete?.id || null}
        itemName={recruiterToDelete?.companyName}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <PageTitle
        title="Top Recruiters"
        icon={Briefcase}
        action={
          <Button onClick={() => setCreateModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Recruiter
          </Button>
        }
      />

      <div className="flex items-center gap-4 mb-4">
        <select value={year} onChange={(e) => setYear(e.target.value)} className="border outline-none rounded p-2 w-full md:w-1/4">
          <option value="all">All Years</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border outline-none rounded p-2 w-full md:w-1/2"
        />
      </div>

      <div className="relative">
        <div className="bg-white rounded-md border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Sl no</th>
                <th className="px-4 py-2 text-left">Company Name</th>
                <th className="px-4 py-2 text-left">On Campus/Pool</th>
                <th className="px-4 py-2 text-left">Type of Company</th>
                <th className="px-4 py-2 text-left">Package (LPA)</th>
                <th className="px-4 py-2 text-left">Total students recruited</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-2 font-medium">{item.companyName}</td>
                  <td className="px-4 py-2">{item.mode}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.package}</td>
                  <td className="px-4 py-2">{item.studentsRecruited}</td>
                  <td className="px-4 py-2 flex">
                    <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => confirmDelete(item)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr>
                  <td colSpan={7} className="border px-4 py-6 text-center text-gray-600">
                    Loading data...
                  </td>
                </tr>
              )}
              {!loading && data.length === 0 && (
                <tr>
                  <td colSpan={7} className="border px-4 py-2 text-center">
                    No data found for the selected year.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(rows) => {
              setItemsPerPage(rows); // Now set items per page from inside component
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
