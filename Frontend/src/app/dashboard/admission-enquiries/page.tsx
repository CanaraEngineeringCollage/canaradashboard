"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/page-title";
import TablePagination from "@/components/ui/TablePagination";
import { UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";
import { apiFetch } from "@/lib/client";

export type AdmissionEnquiryType = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  comments: string;
  createdAt: string;
};

const AdmissionEnquiriesPage = () => {
  const [data, setData] = useState<AdmissionEnquiryType[]>([]);
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
  }, [router]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const encrypted = localStorage.getItem("token");
        const token = encrypted ? decryptToken(encrypted) : null;
        const result = await apiFetch(`/admission-enquiries?page=${currentPage}&limit=${itemsPerPage}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data: resultData, total } = result;
        setData(resultData || []);
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (err) {
        console.error("Failed to fetch admission enquiries", err);
      }
      setLoading(false);
    };

    loadData();
  }, [currentPage, itemsPerPage]);

  return (
    <div className="p-6">
      <PageTitle title="Admission Enquiries" icon={UserCheck} />

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
                {data.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2">{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-2">{item.fullName}</td>
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.phoneNumber}</td>
                    <td className="px-4 py-2">{item.comments}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="border px-4 py-2 text-center">
                      No admission enquiries found.
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

export default AdmissionEnquiriesPage;
