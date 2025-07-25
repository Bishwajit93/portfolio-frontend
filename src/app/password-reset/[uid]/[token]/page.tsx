"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function PasswordResetConfirmPage() {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== retypePassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("https://web-production-9824e.up.railway.app/api/auth/users/reset_password_confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid,
          token,
          new_password: password,
          re_new_password: retypePassword,
        }),
      });

      if (!res.ok) {
        const data: Record<string, string[] | string> = await res.json();
        const values = Object.values(data);
        const message = Array.isArray(values[0]) ? values[0][0] : values[0];
        throw new Error(message || "Error resetting password");

      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error occurred.";
      setError(message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Reset Password</h2>

      {success ? (
        <p>Password reset successful! Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Retype New Password:</label>
            <input
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={{ marginTop: "1rem" }}>Reset Password</button>
        </form>
      )}

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}
