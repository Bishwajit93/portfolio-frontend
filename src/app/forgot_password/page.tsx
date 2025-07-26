"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/request-reset-password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) setMessage(data.detail);
    else setError(data.detail || "Something went wrong.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white bg-black">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-zinc-900 border border-zinc-700 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <input
          type="email"
          className="w-full p-2 rounded mb-4 bg-zinc-800 border border-zinc-600 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" type="submit">
          Send Reset Link
        </button>
        {message && <p className="text-green-400 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
