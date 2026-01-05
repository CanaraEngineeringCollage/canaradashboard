import { apiFetch } from "./client";

export const getAllGallery = async (page: number, limit: number, category: string, search: string) => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(category && category !== "All" ? { category } : {}),
    ...(search ? { search } : {}),
  });
  return apiFetch(`/gallery?${query.toString()}`);
};

export const createGallery = async (formData: FormData) => {
  return apiFetch("/gallery", {
    method: "POST",
    body: formData,
  });
};

export const editGallery = async (id: string, formData: FormData) => {
  return apiFetch(`/gallery/${id}`, {
    method: "PATCH",
    body: formData,
  });
};

export const deleteGallery = async (id: string) => {
  return apiFetch(`/gallery/${id}`, {
    method: "DELETE",
  });
};

export const getGalleryCategories = async () => {
  return apiFetch("/gallery/categories");
};

export const getGalleryCount = async () => {
  return apiFetch("/gallery/count");
};
