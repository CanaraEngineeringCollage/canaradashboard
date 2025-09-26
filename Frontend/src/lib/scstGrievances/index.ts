import { apiFetch } from "../client";

export async function getScStGrievances() {
      const token = localStorage.getItem("token");
  return apiFetch('/scst-grievances', {
    method: 'GET',
 headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },
  });
}