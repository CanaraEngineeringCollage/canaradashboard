import { apiFetch } from "../client";

export interface Buzz {
  id: string;
  content: string;
  design: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllEvents = () => {
   return apiFetch('/events', {
    method: 'GET',
  });
};


export const deleteEvents = (id: string) => {
  return apiFetch(`/events/${id}`, {
    method: 'DELETE',
  });
}

export const createEvents = (data) => {
  return apiFetch('/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export const editEvents = (id, data) => {
  return apiFetch(`/events/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

