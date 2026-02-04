import { apiFetch } from "./client";

export const getAllHomePageImages = async () => {
  return apiFetch("/home-page-images");
};

export const createHomePageImage = async (formData: FormData) => {
  return apiFetch("/home-page-images", {
    method: "POST",
    body: formData,
  });
};

export const deleteHomePageImage = async (id: string) => {
  return apiFetch(`/home-page-images/${id}`, {
    method: "DELETE",
  });
};
