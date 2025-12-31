"use client";

import { useState } from "react";

export default function ForgotUsernamePage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
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

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        data = { detail: "No JSON response body." };
      }

      setResult(
        JSON.stringify(
          {
            status: res.status,
            ok: res.ok,
            data,
          },
          null,
          2
        )
      );
    } catch (err) {
      setResult(
        JSON.stringify({ detail: "Network error", error: String(err) }, null, 2)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm hero-shell p-6 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center glow-text">
          Forgot Username
        </h2>

        <div className="glass-card p-4 space-y-3">
          <label className="block text-sm text-white/80">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            required
            className="w-full p-3 rounded-lg bg-black/60 border border-cyan-400/30 focus:outline-none focus:border-cyan-300 shadow-[0_0_14px_rgba(56,189,248,0.20)]"
          />
          <button
            type="submit"
            disabled={loading}
            className={`pill-button w-full py-2 ${loading ? "opacity-60" : ""}`}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Sending..." : "Send Username"}
          </button>
        </div>

        <div className="glass-card p-4">
          <div className="text-sm font-semibold text-white mb-2">Result</div>
          <pre className="text-xs whitespace-pre-wrap break-words text-white/80 max-h-[220px] overflow-auto">
            {result || "No request yet."}
          </pre>
        </div>
      </form>
    </main>
  );
}
