import CryptoJS from "crypto-js";

const getKey = () => {
  const key = process.env.NEXT_PUBLIC_ENC_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_ENC_KEY is not set; falling back to a default key. " +
          "Add it to your .env.local for proper token encryption."
      );
    }
    return "canara-dashboard-fallback-key";
  }
  return key;
};

const SECRET_KEY = getKey();

export const encryptToken = (token: string) => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

export const decryptToken = (encrypted: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
