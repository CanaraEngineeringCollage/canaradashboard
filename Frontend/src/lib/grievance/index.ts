import { apiFetch } from "../client";

export async function getGrievances() {
  console.log('Fetching grievances...');
  try {
    const data = await apiFetch('/grievances', {
      method: 'GET',
      credentials: 'include',
    });
    console.log('Grievances fetched:', data);
    return data;
  } catch (err) {
    console.error('Grievances error:', err.message);
    throw err;
  }
}