"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api/apiBase";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          Object.entries(data)
            .map(
              ([k, v]) =>
                `${k}: ${Array.isArray(v) ? (v as string[]).join(", ") : v}`
            )
            .join("; ")
        );
      }

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#0a0a0a] border border-cyan-400/40 rounded-xl 
        shadow-[0_0_30px_rgba(0,255,255,0.3)] p-6 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300">Sign Up</h2>

        {error && (
          <div className="text-red-400 text-center text-sm leading-tight">{error}</div>
        )}

        <div>
          <label className="block mb-1 text-cyan-200">Username</label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="your-username"
            className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
              rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
              focus:outline-none focus:border-cyan-300 
              focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-cyan-200">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
              rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
              focus:outline-none focus:border-cyan-300 
              focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-cyan-200">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
              rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
              focus:outline-none focus:border-cyan-300 
              focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-cyan-200">Confirm Password</label>
          <input
            name="re_password"
            type="password"
            value={form.re_password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
              rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
              focus:outline-none focus:border-cyan-300 
              focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
            hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
        >
          Register
        </button>
      </form>
    </main>
  );
}
