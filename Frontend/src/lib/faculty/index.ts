import { apiFetch } from '../client';
import type { FacultyFormData } from '../schemas';

export async function createFaculty(data: FormData) {
  return apiFetch('/faculty', {
    method: 'POST',
    body: data,
  });
}

export async function getAllFaculty() {
  return apiFetch('/faculty', {
    method: 'GET',
  });
}

export async function getFacultyById(id: string) {
  return apiFetch(`/faculty/${id}`, {
    method: 'GET',
  });
}

export async function updateFaculty(id: string, data: FormData) {
  return apiFetch(`/faculty/${id}`, {
    method: 'PATCH',
    body: data,
  });
}

export async function deleteFaculty(id: string) {
  return apiFetch(`/faculty/${id}`, {
    method: 'DELETE',
  });
}
