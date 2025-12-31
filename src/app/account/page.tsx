"use client";

import { useState } from "react";
import SecurityModal from "@/components/SecurityModal";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { token, hydrated } = useAuth();
  const [open, setOpen] = useState(false);

  if (!hydrated) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-white">
        <div className="glass-card p-6 text-center">
          Loading…
        </div>
      </div>
    );
  }

  const isLoggedIn = Boolean(token);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      {/* Main container */}
      <div className="hero-shell p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold glow-text mb-6">
          Account
        </h1>

        {!isLoggedIn ? (
          <div className="glass-card p-6">
            <p className="text-white/80">
              You must be logged in to access account settings.
            </p>
          </div>
        ) : (
          <div className="glass-card p-6">
            <p className="text-white/80 max-w-xl">
              Manage your login security settings such as password, email, and username.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setOpen(true)}
                className="pill-button px-6 py-2"
                style={{ cursor: "pointer" }}
                type="button"
              >
                Open Security Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Security modal */}
      <SecurityModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
