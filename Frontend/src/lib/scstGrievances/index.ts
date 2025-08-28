import { apiFetch } from "../client";

export async function getScStGrievances() {
  return apiFetch('/scst-grievances', {
    method: 'GET',
  });
}