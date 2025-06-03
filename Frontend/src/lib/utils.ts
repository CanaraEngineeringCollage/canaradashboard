import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function bufferToBase64(buffer: number[]): string {
  // Process buffer in chunks of 1024 to prevent stack overflow
  const chunkSize = 1024;
  let binary = '';
  
  for (let i = 0; i < buffer.length; i += chunkSize) {
    const chunk = buffer.slice(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  
  return `data:image/jpeg;base64,${btoa(binary)}`;
}
