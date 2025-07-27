"use client";

import { useState } from "react";

export default function ForgotUsernamePage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-username/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong.");
      } else {
        setMessage("If the email is registered, your username has been sent.");
      }
    } catch (err) {
        console.error("Forgot username error:", err);
        setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Forgot Username</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registered email"
          className="w-full p-2 rounded border border-zinc-600 bg-zinc-800 text-white mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded"
        >
          {loading ? "Sending..." : "Send Username"}
        </button>

        {message && <p className="text-green-400 text-center mt-4">{message}</p>}
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
}
