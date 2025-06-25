import { apiFetch } from "../client";

export interface Buzz {
  id: string;
  content: string;
  design: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllBuzz = () => {
   return apiFetch('/buzz', {
    method: 'GET',
  });
};


export const deleteBuzz = (id: string) => {
  return apiFetch(`/buzz/${id}`, {
    method: 'DELETE',
  });
}

export const createBuzz = (content: string, design: object) => {
  return apiFetch('/buzz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, design }),
  });
}

export const editBuzz = (id: string, content: string, design: object) => {
  return apiFetch(`/buzz/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, design }),
  });
}

