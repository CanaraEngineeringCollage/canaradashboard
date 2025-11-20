import { apiFetch } from "../client";
import { decryptToken } from "../encrypt";

export interface Buzz {
  id: string;
  content: string;
  design: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllEvents = () => {
  return apiFetch('/events', { method: 'GET' });
};

export const deleteEvent = (id: string) => {
     const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;
  return apiFetch(`/events/${id}`, { method: 'DELETE',  headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    }, }
   
  );
};

export const createEvent = (formData: FormData) => {
     const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;
  return apiFetch('/events', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },

  });
};

export const editEvent = (id: string, formData: FormData) => {
     const encrypted = localStorage.getItem("token");
  const token = encrypted ? decryptToken(encrypted) : null;
  return apiFetch(`/events/${id}`, {
    method: 'PUT', 
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },

  });
};
