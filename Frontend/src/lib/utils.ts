import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  // If the path is already a full URL, return it
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Force absolute path resolution to the backend on port 3000
  // to avoid browser turning it into relative 9002 paths during render.
  let baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl || baseUrl.trim() === "") {
    baseUrl = "http://localhost:3000";
  }
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}
