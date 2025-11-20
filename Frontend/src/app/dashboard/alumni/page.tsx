"use client";
import { PageTitle } from "@/components/page-title";
import { decryptToken } from "@/lib/encrypt";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// your API fetch function

export interface Alumni {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  usn: string;
  address: string;
  comments: string;
  createdAt: string;
}

const AlumniPage = () => {
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
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
    const fetchData = async () => {
         const encrypted = localStorage.getItem("token");
     const token = encrypted ? decryptToken(encrypted) : null;
      setLoading(true);
      try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alumni`, { method: "GET", headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    }, });
      if (!res.ok) throw new Error("Failed to fetch timetables");
      const data = await res.json();
        // sort by createdAt descending
        const sorted = data.sort(
          (a: Alumni, b: Alumni) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAlumniList(sorted);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <PageTitle title="Alumni Network" icon={GraduationCap} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Date of Birth</th>
                <th className="px-4 py-2 text-left">USN</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Comments</th>
              </tr>
            </thead>
            <tbody>
              {alumniList.map((alumni) => (
                <tr
                  key={alumni.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{alumni.fullName}</td>
                  <td className="px-4 py-2">{alumni.email}</td>
                  <td className="px-4 py-2">{alumni.phone}</td>
                  <td className="px-4 py-2">
                    {new Date(alumni.dateOfBirth).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2">{alumni.usn}</td>
                  <td className="px-4 py-2">{alumni.address}</td>
                  <td className="px-4 py-2">{alumni.comments}</td>
                </tr>
              ))}
            </tbody>
               {alumniList.length === 0 && (
            <tr>
              <td colSpan={7} className="border px-4 py-2 text-center">
                No alumni found.
              </td>
            </tr>
          )}
          </table>
        </div>
      )}
    </div>
  );
};

export default AlumniPage;
