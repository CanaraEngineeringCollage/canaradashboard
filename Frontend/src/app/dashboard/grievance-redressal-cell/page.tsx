"use client"
import { PageTitle } from '@/components/page-title'
import { getGrievances } from '@/lib/grievance'
import { ShieldCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [grievances, setGrievances] = useState([]);
    console.log(grievances);
    
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getGrievances();
      // sort by created_at descending (latest first)
      const sorted = res.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setGrievances(sorted);
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
          title="Grievance Redressal Cell"
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
                <th className="px-4 py-2 text-left">Related To</th>
                <th className="px-4 py-2 text-left">Nature</th>
              </tr>
            </thead>
     <tbody>
  {grievances.map((g) => (
    <tr key={g.id} className="border-t border-gray-200 hover:bg-gray-50">
     <td className="px-4 py-2">
  {new Date(g.date).toLocaleDateString('en-GB')} 
</td>
      <td className="px-4 py-2">{g.name}</td>
      <td className="px-4 py-2">{g.grievance_from}</td>
      <td className="px-4 py-2">{g.contact_number}</td>
      <td className="px-4 py-2">{g.email}</td>
      <td className="px-4 py-2">{g.grievance_related_to}</td>
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
