"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const encrypted = localStorage.getItem("token");

    // No token stored → redirect
    if (!encrypted) {
      router.push("/login");
      return;
    }

    try {
      const decrypted = decryptToken(encrypted);

      // If decrypt failed or token invalid → redirect
      if (!decrypted || decrypted.length < 10) {
        localStorage.removeItem("token");
        router.push("/login");
      }

    } catch (error) {
      // Decryption error → token corrupted or modified
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
