"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/page-title";
import TablePagination from "@/components/ui/TablePagination";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";

export type PlacementSubmission = {
  id: number;
  fullName: string;
  designation: string;
  organization: string;
  email: string;
  phone: string;
  createdAt: string;
};

interface PlacementTableProps {
  fetchData?: () => Promise<PlacementSubmission[]>;
}

const PlacementSubmissions: React.FC<PlacementTableProps> = ({ fetchData }) => {
  const [submissions, setSubmissions] = useState<PlacementSubmission[]>([]);
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
    const encrypted = localStorage.getItem("token");
    const token = encrypted ? decryptToken(encrypted) : null;

    const loadData = async () => {
      setLoading(true);
      try {
        let data: PlacementSubmission[] = [];
        if (fetchData) {
          data = await fetchData();
        } else {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/placement?page=${currentPage}&limit=${itemsPerPage}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const result = await res.json();
            const { data: resultData, total } = result;
            data = resultData;
            setTotalPages(Math.ceil(total / itemsPerPage));
          } else {
            console.error("Failed to fetch submissions");
          }
        }

        // Sort latest first
        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSubmissions(sorted);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
      setLoading(false);
    };

    loadData();
  }, [fetchData, currentPage, itemsPerPage]);

  return (
    <div className="p-6">
      <PageTitle title="Placement Submissions" icon={Briefcase} />

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
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Organization</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {new Date(submission.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2">{submission.fullName}</td>
                  <td className="px-4 py-2">{submission.designation}</td>
                  <td className="px-4 py-2">{submission.organization}</td>
                  <td className="px-4 py-2">{submission.email}</td>
                  <td className="px-4 py-2">{submission.phone}</td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="border px-4 py-2 text-center">
                    No placement submissions found.
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

export default PlacementSubmissions;
