"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const { uid, token } = useParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password-confirm/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, token, new_password: newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(data.detail || "Reset failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-lg w-full max-w-md border border-zinc-700">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 mb-4"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 mb-4"
          required
        />
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded">Set New Password</button>
        {message && <p className="text-green-400 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
