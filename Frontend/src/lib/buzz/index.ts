import { apiFetch } from "../client";
import { decryptToken } from "../encrypt";

export interface Buzz {
  id: string;
  content: string;
  design: string;
  category: string;
  eventDate?: string;
  eventName?: string;
  weeklyDigest?: any;
  createdAt: string;
  updatedAt: string;
}

// ✅ Updated: supports category + search filters
export const getAllBuzz = (page: number = 1, limit: number = 10, category: string = "", search: string = "", edition: string = "") => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (category) params.append("category", category);
  if (search) params.append("search", search);
  if (edition) params.append("edition", edition);

  return apiFetch(`/buzz?${params.toString()}`, {
    method: "GET",
  });
};

// ✅ New: fetch unique categories from backend
export const getCategories = () => {
  return apiFetch("/buzz/categories", {
    method: "GET",
  });
};

export const getWeeklyDigestEditions = () => {
  return apiFetch("/buzz/weekly-digest/editions", {
    method: "GET",
  });
};

export const getBuzzById = (id: string) => {
  return apiFetch(`/buzz/${id}`, {
    method: "GET",
  });
};

export const deleteBuzz = (id: string) => {
  const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;

  return apiFetch(`/buzz/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBuzz = (content: string, design: object, category: string, eventDate: string, eventName: string, weeklyDigest?: any) => {
  const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;

  return apiFetch("/buzz", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content,
      design,
      category,
      eventDate,
      eventName,
      weeklyDigest,
    }),
  });
};

export const editBuzz = (id: string, content: string, design: object, category: string, eventDate: string, eventName: string, weeklyDigest?: any) => {
  const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;

  return apiFetch(`/buzz/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content,
      design,
      category,
      eventDate,
      eventName,
      weeklyDigest,
    }),
  });
};
