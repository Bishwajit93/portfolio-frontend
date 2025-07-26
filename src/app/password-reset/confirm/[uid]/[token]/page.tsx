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

  // DEBUG: show uid/token in console to confirm routing works
  console.log("Reset Password Page loaded with uid:", uid, "token:", token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== retypePassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users/reset_password_confirm/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid,
            token,
            new_password: password,
            re_new_password: retypePassword,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        const values = Object.values(data);
        const message = Array.isArray(values[0]) ? values[0][0] : values[0];
        throw new Error(message || "Error resetting password");
      }

      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred.";
      setError(message);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h1>Password Reset Confirm</h1>
      <p>UID: {uid}</p>
      <p>Token: {token}</p>

      {success ? (
        <p style={{ color: "green" }}>
          Password reset successful! Redirecting to login...
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">New Password:</label><br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="retypePassword">Retype New Password:</label><br />
            <input
              id="retypePassword"
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Reset Password
          </button>
        </form>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Error: {error}
        </p>
      )}
    </div>
  );
}
