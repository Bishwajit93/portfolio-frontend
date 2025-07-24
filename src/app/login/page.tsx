// src/app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/api/apiBase";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

      console.log("🔑 Sending login request with:", form);
  const res = await fetch(`${API_BASE_URL}/auth/jwt/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.detail || JSON.stringify(data));
      return;
    }

    const { access } = await res.json();
    console.log("🎉 Received access token:", access);
    login(access);
    console.log("✅ Stored in localStorage:", localStorage.getItem("accessToken"));
    router.push("/"); // or wherever
  };

  return (
    <div className="flex justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-800 border-2 border-cyan-500 rounded-xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Log In
        </h2>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <div>
          <label className="block text-white mb-1">Username</label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="your-username"
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded"
        >
          Log In
        </button>

        <div className="flex justify-between text-sm text-cyan-300 mt-2">
          <Link href="/forgot_password" className="hover:underline">
            Forgot Password?
          </Link>
          <Link href="/forgot_username" className="hover:underline">
            Forgot Username?
          </Link>
        </div>
      </form>
    </div>
  );
}
