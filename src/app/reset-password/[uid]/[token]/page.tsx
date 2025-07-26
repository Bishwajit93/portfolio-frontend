"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { uid, token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password-confirm/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            token,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      } else {
        setError(data.detail || "Something went wrong.");
      }
    } catch (err) {
        console.error("Reset failed:", err);
        setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-lg w-full max-w-md border border-zinc-700">
        <h1 className="text-2xl font-semibold mb-6 text-center">Reset Your Password</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Set New Password
          </button>
        </form>

        {message && <p className="text-green-400 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
