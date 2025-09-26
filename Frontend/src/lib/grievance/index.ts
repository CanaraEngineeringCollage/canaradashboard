import { apiFetch } from "../client";

export async function getGrievances() {
  console.log('Fetching grievances...');
   const token = localStorage.getItem("token");
  try {
    const data = await apiFetch('/grievances', {
      method: 'GET',
      headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },
    });
    console.log('Grievances fetched:', data);
    return data;
  } catch (err) {
    console.error('Grievances error:', err.message);
    throw err;
  }
}