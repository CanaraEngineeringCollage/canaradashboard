import { apiFetch } from "../client";
import { decryptToken } from "@/lib/encrypt";

export async function getScStGrievances() {
  const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;

  if (!token || token.length < 10) {
    console.error("Invalid or missing JWT token");
    return [];
  }

  return apiFetch('/scst-grievances', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // 🔥 real decrypted token
    },
  });
}
