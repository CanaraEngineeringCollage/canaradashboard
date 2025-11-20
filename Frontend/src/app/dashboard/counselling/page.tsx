"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/page-title";
import { Brain, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";

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
      let data: CounsellingType[] = [];
      if (fetchData) {
        data = await fetchData();
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/counselling`, {
          method: "GET",
          headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch counselling data");
        }
        data = await res.json();
      }

      
      

      // Sort latest first
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setCounsellingData(sorted);
    } catch (err) {
      console.error("Failed to fetch counselling data", err);
    }
    setLoading(false);
  };

  loadData();
}, [fetchData]);





  return (
    <div className="p-6">
      <PageTitle title="Counselling Submissions" icon={Brain } />

      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
};

export default CounsellingTable;
