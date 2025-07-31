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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-username/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

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
    <main className="min-h-screen flex items-center justify-center px-4 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#0a0a0a] border border-cyan-400/40 rounded-xl 
          shadow-[0_0_30px_rgba(0,255,255,0.3)] p-6 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300">
          Forgot Username
        </h2>

        <div>
          <label className="block mb-1 text-cyan-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            required
            className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
              rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
              focus:outline-none focus:border-cyan-300 
              focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
            hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
        >
          {loading ? "Sending..." : "Send Username"}
        </button>

        {message && (
          <p className="text-green-400 text-center text-sm">{message}</p>
        )}
        {error && (
          <p className="text-red-400 text-center text-sm">{error}</p>
        )}
      </form>
    </main>
  );
}
