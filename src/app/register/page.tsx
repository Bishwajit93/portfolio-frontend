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
    <div className="flex justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-800 border-2 border-cyan-500 rounded-xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Sign Up
        </h2>

        {error && <div className="text-red-400 text-center">{error}</div>}

        <div>
          <label className="block text-white mb-1">Username</label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="your-username"
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 focus:border-cyan-400 focus:outline-none text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 focus:border-cyan-400 focus:outline-none text-white"
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
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 focus:border-cyan-400 focus:outline-none text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Confirm Password</label>
          <input
            name="re_password"
            type="password"
            value={form.re_password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 focus:border-cyan-400 focus:outline-none text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
