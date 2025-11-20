import { apiFetch } from "../client";
import { decryptToken } from "@/lib/encrypt";

export async function getGrievances() {
  const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;

  if (!token || token.length < 10) {
    console.error("Invalid or missing JWT");
    return [];
  }

  try {
    const data = await apiFetch("/grievances", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    return data;

  } catch (err) {
    console.error("Grievances Error:", err);
    return [];
  }
}
