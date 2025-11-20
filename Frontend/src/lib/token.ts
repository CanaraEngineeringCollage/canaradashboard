import { decryptToken } from "@/lib/encrypt";

export const getToken = () => {
  const encrypted = localStorage.getItem("token");
  if (!encrypted) return null;

  try {
    const decrypted = decryptToken(encrypted);
    return decrypted && decrypted.length > 10 ? decrypted : null;
  } catch {
    return null;
  }
};
