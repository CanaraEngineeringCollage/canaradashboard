import { apiFetch } from "../client";

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
    const token = localStorage.getItem("token");
  return apiFetch(`/events/${id}`, { method: 'DELETE',  headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    }, }
   
  );
};

export const createEvent = (formData: FormData) => {
    const token = localStorage.getItem("token");
  return apiFetch('/events', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },

  });
};

export const editEvent = (id: string, formData: FormData) => {
    const token = localStorage.getItem("token");
  return apiFetch(`/events/${id}`, {
    method: 'PUT', 
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`, // ✅ send token
    },

  });
};
