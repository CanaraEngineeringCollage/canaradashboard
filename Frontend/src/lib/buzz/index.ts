import { client } from '../client';

export interface Buzz {
  id: string;
  content: string;
  design: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllBuzz = () => {
  return client.get<Buzz[]>('/buzz');
};

export const createBuzz = (data: { content: string; design: string }) => {
  return client.post<Buzz>('/buzz', data);
};

export const updateBuzz = (id: string, data: { content: string; design: string }) => {
  return client.patch<Buzz>(`/buzz/${id}`, data);
};

export const deleteBuzz = (id: string) => {
  return client.delete(`/buzz/${id}`);
}; 