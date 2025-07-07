import { apiFetch } from '../client';

export interface Event {
  id: number;
  title: string;
  tagline: string;
  date: string;
  type: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export const getAllEvents = () => {
  return apiFetch('/events', {
    method: 'GET',
  });
};

export const getFeaturedEvent = () => {
  return apiFetch('/events/featured', {
    method: 'GET',
  });
};

export const createEvent = (data: Omit<Event, 'id' | 'createdAt'>) => {
  return apiFetch('/events', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateEvent = (id: number, data: Partial<Event>) => {
  return apiFetch(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteEvent = (id: number) => {
  return apiFetch(`/events/${id}`, {
    method: 'DELETE',
  });
};
