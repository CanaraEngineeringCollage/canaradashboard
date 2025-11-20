"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setIsLoading(true);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, form, {
    });

    console.log('Response Status:', res.status);
    console.log('Response Data:', res.data);

    if (res.status === 200 || res.status === 201) {
      if (res.data.message === 'Login successful') {
           toast({
        title: 'Success',
        description: 'Logged successfully.',
        
      });
  
          console.log('Attempting navigation to /dashboard');
          console.log('Cookies after login:', document.cookie);
        localStorage.setItem('token', res.data.token); // ✅ save JWT
  dispatch(setAdmin({ name: res.data.admin.name, email: res.data.admin.email }));
  router.push('/dashboard');
        dispatch(
          setAdmin({
            name: res.data.admin?.name || res.data.name,
            email: res.data.admin?.email || res.data.email,
          })
        );
        console.log('Dispatched Admin:', {
          name: res.data.admin?.name || res.data.name,
          email: res.data.admin?.email || res.data.email,
        });
        setIsLoading(false);
      } else {
        throw new Error(res.data.message || 'Unexpected response');
      }
    } else {
      throw new Error(`Unexpected status: ${res.status}`);
    }
  } catch (err: any) {
    console.error('Error:', err.response?.data?.message || err.message || 'Login failed');
    setError(err?.response?.data?.message || 'Login failed');
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
};

  return (
   <div className="min-h-screen flex flex-col relative bg-gray-50">
  {/* Logo (top-left) */}
  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 md:left-6 md:translate-x-0">
    <img src="/logo.svg" alt="Logo" className="w-56 h-auto" />
  </div>

  {/* Centered form */}
  <div className="flex justify-center items-center flex-1">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 border rounded-xl shadow-md space-y-5 w-full max-w-sm"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Admin Login
      </h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full p-3 rounded-lg text-white font-medium transition ${
          isLoading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-[#2883c8] hover:bg-[#2883c8]"
        }`}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
</div>

  );
}
