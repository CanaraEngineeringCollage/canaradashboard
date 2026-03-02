"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/page-title";
import TablePagination from "@/components/ui/TablePagination";
import { Brain, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";
import { apiFetch } from "@/lib/client";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the type for counselling entries
export type CounsellingType = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  comments?: string;
  createdAt: string;
};

// Props for fetching data (optional, can fetch inside component)
interface CounsellingTableProps {
  fetchData?: () => Promise<CounsellingType[]>;
}

const CounsellingTable: React.FC<CounsellingTableProps> = ({ fetchData }) => {
  const [counsellingData, setCounsellingData] = useState<CounsellingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let data: CounsellingType[] = [];
        if (fetchData) {
          data = await fetchData();
        } else {
          const encrypted = localStorage.getItem("token");
          const token = encrypted ? decryptToken(encrypted) : null;
          const result = await apiFetch(`/counselling?page=${currentPage}&limit=${itemsPerPage}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // ✅ send token
            },
          });
          const { data: resultData, total } = result;
          data = resultData;
          setTotalPages(Math.ceil(total / itemsPerPage));
        }

        // Sort latest first
        const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setCounsellingData(sorted);
      } catch (err) {
        console.error("Failed to fetch counselling data", err);
      }
      setLoading(false);
    };

    loadData();
  }, [fetchData, currentPage, itemsPerPage]);

  const handleDownloadCsv = async () => {
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;
      const result = await apiFetch(`/counselling?page=1&limit=100000`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = result.data || [];
      if (data.length === 0) return;

      const headers = ["Date", "Full Name", "Email", "Phone", "Comments"];
      const csvRows = [headers.join(",")];

      data.forEach((c: CounsellingType) => {
        const row = [
          new Date(c.createdAt).toLocaleDateString("en-GB"),
          `"${(c.fullName || "").replace(/"/g, '""')}"`,
          `"${(c.email || "").replace(/"/g, '""')}"`,
          `"${(c.phone || "").replace(/"/g, '""')}"`,
          `"${(c.comments || "").replace(/"/g, '""')}"`,
        ];
        csvRows.push(row.join(","));
      });

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "counselling_submissions.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download CSV", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <PageTitle title="Counselling Submissions" icon={Brain} />
        <Button onClick={handleDownloadCsv} className="bg-primary text-white">
          <Download className="mr-2 h-4 w-4" /> Download CSV
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Comments</th>
                </tr>
              </thead>
              <tbody>
                {counsellingData.map((c) => (
                  <tr key={c.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2">{new Date(c.createdAt).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-2">{c.fullName}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2">{c.phone}</td>
                    <td className="px-4 py-2">{c.comments}</td>
                  </tr>
                ))}
                {counsellingData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="border px-4 py-2 text-center">
                      No counselling submissions found.
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
                setItemsPerPage(rows);
                setCurrentPage(1);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CounsellingTable;
