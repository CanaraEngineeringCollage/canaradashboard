import { apiFetch } from "../client";

export interface Buzz {
  id: string;
  content: string;
  design: string;
  createdAt: string;
  updatedAt: string;
}

// export const getAllEvents = () => {
//   return apiFetch('/events', { method: 'GET' });
// };

// export const deleteEvent = (id: string) => {
//   return apiFetch(`/events/${id}`, { method: 'DELETE' });
// };

export const createTimeTable = (formData: FormData) => {
  return apiFetch('/timetables', {
    method: 'POST',
    body: formData,
  });
};

// export const editEvent = (id: string, formData: FormData) => {
//   return apiFetch(`/events/${id}`, {
//     method: 'PUT', 
//     body: formData,
//   });
// };
