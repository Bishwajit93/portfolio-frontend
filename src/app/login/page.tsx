"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/api/apiBase";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/jwt/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Login failed");
        return;
      }

      const { access, refresh } = data;  // ✅ Fixed here
      login(access, refresh);
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center px-4 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#0a0a0a] border border-cyan-400/40 rounded-xl 
          shadow-[0_0_30px_rgba(0,255,255,0.3)] p-6 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300">Log In</h2>

        {error && <p className="text-red-400 text-center text-sm">{error}</p>}

        <div>
          <label className="block mb-1 text-cyan-200">Username</label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Your Username"
            className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
              rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
              focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-cyan-200">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Your Password"
              className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
                rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
                focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-sm text-cyan-300 hover:text-cyan-100 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
            hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
        >
          Log In
        </button>

        <div className="flex justify-between text-sm text-cyan-300">
          <Link href="/forgot_password" className="hover:underline hover:text-white transition">
            Forgot Password?
          </Link>
          <Link href="/forgot_username" className="hover:underline hover:text-white transition">
            Forgot Username?
          </Link>
        </div>
      </form>
    </main>
  );
}
