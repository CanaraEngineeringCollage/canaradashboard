import { apiFetch } from "../client";

export async function getGrievances() {
  return apiFetch('/grievances', {
    method: 'GET',
  });
}