"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const { uid, token } = useParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password-confirm/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, new_password: newPassword }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Password reset successful. Redirecting to login...");
      setTimeout(() => router.push("/login"), 2500);
    } else {
      setError(data.detail || "Reset failed.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#0a0a0a] border border-cyan-400/40 rounded-xl 
        shadow-[0_0_30px_rgba(0,255,255,0.3)] p-6 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300">
          Reset Password
        </h2>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
              rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
              focus:outline-none focus:border-cyan-300 
              focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all pr-20"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-cyan-300 hover:text-white"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-2.5 bg-black text-white border border-cyan-400/30 
              rounded-md shadow-[0_0_5px_rgba(0,255,255,0.2)] 
              focus:outline-none focus:border-cyan-300 
              focus:shadow-[0_0_10px_rgba(0,255,255,0.6)] transition-all pr-20"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-cyan-300 hover:text-white"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
            hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
        >
          Set New Password
        </button>

        {message && (
          <p className="text-green-400 text-sm text-center mt-2">{message}</p>
        )}
        {error && (
          <p className="text-red-400 text-sm text-center mt-2">{error}</p>
        )}
      </form>
    </main>
  );
}
