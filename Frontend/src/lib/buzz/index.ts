import { apiFetch } from "../client";
import { decryptToken } from "../encrypt";

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
   const encrypted = localStorage.getItem("token");
     const token = encrypted ? decryptToken(encrypted) : null;
  return apiFetch(`/buzz/${id}`, {
    method: "DELETE",
     headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },
  });
};

export const createBuzz = (content: string, design: object, category: string,eventDate:string, eventName:string) => {
  const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;
  return apiFetch("/buzz", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content, design, category,eventDate ,eventName}), // send category
  });
};

export const editBuzz = (id: string, content: string, design: object, category: string,eventDate:string, eventName:string) => {
   const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;
  return apiFetch(`/buzz/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content, design, category,eventDate,eventName }), // send category
  });
};
