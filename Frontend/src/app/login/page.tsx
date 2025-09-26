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
    const res = await axios.post(`https://testapi.megamind.studio/admin/login`, form, {
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
