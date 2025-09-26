import { apiFetch } from "../client";

export interface Buzz {
  id: string;
  content: string;
  design: string;
  category: string; // Added category here
  createdAt: string;
  updatedAt: string;
}

export const getAllBuzz = () => {
  return apiFetch("/buzz", {
    method: "GET",
  });
};

export const deleteBuzz = (id: string) => {
   const token = localStorage.getItem("token");
  return apiFetch(`/buzz/${id}`, {
    method: "DELETE",
     headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },
  });
};

export const createBuzz = (content: string, design: object, category: string,eventDate:string) => {
  const token = localStorage.getItem("token");
  return apiFetch("/buzz", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content, design, category,eventDate }), // send category
  });
};

export const editBuzz = (id: string, content: string, design: object, category: string,eventDate:string) => {
   const token = localStorage.getItem("token");
  return apiFetch(`/buzz/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content, design, category,eventDate }), // send category
  });
};
