"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api/apiBase";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const uid = params.get("uid")!;
  const token = params.get("token")!;

  const [form, setForm] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const res = await fetch(
      `${API_BASE_URL}/auth/users/reset_password_confirm/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, ...form }),
      }
    );

    if (res.ok) {
      setMessage("Password reset! Redirecting to login…");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      const err = await res.json();
      setError(
        Object.entries(err)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join("; ")
      );
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-800 border-2 border-cyan-500 rounded-xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Reset Password
        </h2>

        {message && <p className="text-green-400 text-center">{message}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        <div>
          <label className="block text-white mb-1">New Password</label>
          <input
            name="new_password"
            type="password"
            value={form.new_password}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-1">
            Confirm New Password
          </label>
          <input
            name="re_new_password"
            type="password"
            value={form.re_new_password}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
