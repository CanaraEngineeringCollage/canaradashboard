"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/redux/slices/authSlice";
export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/login", form);

      if (res.status === 200) router.push("/dashboard");
      dispatch(
        setAdmin({
          name: res.data.data.admin.name,
          email: res.data.data.admin.email,
        })
      );
      setIsLoading(false);

      toast({
        title: "Success",
        description: "Logged successfully.",
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold">Admin Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="email" type="email" placeholder="Email" className="border p-2 w-full" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="border p-2 w-full" value={form.password} onChange={handleChange} />
        <button type="submit" disabled={isLoading} className={`w-full ${isLoading ? "bg-blue-300" : "bg-blue-600"} text-white p-2 rounded`}>
          Login
        </button>
      </form>
    </div>
  );
}
