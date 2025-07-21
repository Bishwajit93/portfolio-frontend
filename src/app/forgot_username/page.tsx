"use client";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/api/apiBase";

export default function ForgotUsernamePage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    const res = await fetch(`${API_BASE_URL}/auth/username/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      const data = await res.json();
      setResult(`Your username is: ${data.username}`);
    } else {
      const err = await res.json();
      setError(err.email?.join(", ") || "No account found with that email.");
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-800 border-2 border-cyan-500 rounded-xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Forgot Username
        </h2>

        {result && <p className="text-green-400 text-center">{result}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        <div>
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded"
        >
          Retrieve Username
        </button>
      </form>
    </div>
  );
}
