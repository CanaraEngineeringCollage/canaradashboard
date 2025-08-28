"use client"
import { PageTitle } from '@/components/page-title'
import { getScStGrievances } from '@/lib/scstGrievances'

import { ScstGrievance } from '@/lib/types'
import { ShieldCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'


const page = () => {
  const [grievances, setGrievances] = useState<ScstGrievance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getScStGrievances();
         // parse JSON response
        setGrievances(res);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <PageTitle
        title="SC/ST/OBC Grievance Section"
        icon={ShieldCheck}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Nature</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map((g) => (
                <tr key={g.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{g.date}</td>
                  <td className="px-4 py-2">{g.name}</td>
                  <td className="px-4 py-2">{g.grievance_from}</td>
                  <td className="px-4 py-2">{g.contact_number}</td>
                  <td className="px-4 py-2">{g.email}</td>
                  <td className="px-4 py-2">{g.category}</td>
                  <td className="px-4 py-2">{g.nature_of_grievance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default page
