import { decryptToken } from "./encrypt";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  const url = `${baseUrl}${endpoint}`;

  try {
    const handleUnauthorized = (status: number, message?: string) => {
      const tokenError = message && /unauthori(?:s|z)ed|token/i.test(message);
      if (status === 401 || status === 403 || tokenError) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return true;
      }
      return false;
    };

    const fetchOptions: RequestInit = {
      ...options,
      credentials: options.credentials || "include",
      headers: {
        ...options.headers,
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      },
      cache: "no-store",
    };

    if (typeof window !== "undefined") {
      const encryptedToken = localStorage.getItem("token");
      if (encryptedToken) {
        try {
          const token = decryptToken(encryptedToken);
          // @ts-ignore
          fetchOptions.headers["Authorization"] = `Bearer ${token}`;
        } catch (error) {
          console.error("Failed to decrypt token:", error);
        }
      }
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (handleUnauthorized(response.status, errorData.message)) {
        throw new Error("Unauthorized. Redirecting to login.");
      }
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    if (response.status === 204 || options.method === "DELETE") {
      return null;
    }

    const data = await response.json().catch(() => null);
    return data;
  } catch (error) {
    console.error("API Request Failed:", {
      url,
      error: error instanceof Error ? error.message : error,
    });
    throw error;
  }
}
