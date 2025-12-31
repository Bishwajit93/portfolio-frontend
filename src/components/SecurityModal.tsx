"use client";

import { useEffect, useRef, useState } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api/apiBase";
import { useAuth } from "@/context/AuthContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Mode = "password" | "email" | "username";

export default function SecurityModal({ isOpen, onClose }: Props) {
  const { logout } = useAuth();

  const [mode, setMode] = useState<Mode>("password");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  // Password change
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  // Email change
  const [newEmail1, setNewEmail1] = useState("");
  const [newEmail2, setNewEmail2] = useState("");

  // Username change
  const [newUsername1, setNewUsername1] = useState("");
  const [newUsername2, setNewUsername2] = useState("");

  // Current password LAST
  const [currentPassword, setCurrentPassword] = useState("");

  // ✅ Show / Hide toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPasswords, setShowNewPasswords] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const resetFields = () => {
    setResult("");
    setNewPassword1("");
    setNewPassword2("");
    setNewEmail1("");
    setNewEmail2("");
    setNewUsername1("");
    setNewUsername2("");
    setCurrentPassword("");
    setShowCurrentPassword(false);
    setShowNewPasswords(false);
  };

  const closeModal = () => {
    resetFields();
    onClose();
  };

  // ✅ IMPORTANT: hooks must run every render, so we keep useEffect ABOVE the early return
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);

    // lock background scroll while modal open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const setPrettyResult = async (res: Response) => {
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

    return res.ok;
  };

  const submit = async () => {
    setLoading(true);
    setResult("");

    try {
      // Current password required for all modes
      if (!currentPassword) {
        setResult(JSON.stringify({ detail: "Current password is required." }, null, 2));
        setLoading(false);
        return;
      }

      if (mode === "password") {
        if (!newPassword1 || !newPassword2) {
          setResult(JSON.stringify({ detail: "Please fill all fields." }, null, 2));
          setLoading(false);
          return;
        }
        if (newPassword1 !== newPassword2) {
          setResult(JSON.stringify({ detail: "New passwords do not match." }, null, 2));
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/auth/change-password/`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword1,
          }),
        });

        const ok = await setPrettyResult(res);
        if (ok) {
          logout();
        }
      }

      if (mode === "email") {
        if (!newEmail1 || !newEmail2) {
          setResult(JSON.stringify({ detail: "Please fill all fields." }, null, 2));
          setLoading(false);
          return;
        }

        const e1 = newEmail1.trim().toLowerCase();
        const e2 = newEmail2.trim().toLowerCase();

        if (e1 !== e2) {
          setResult(JSON.stringify({ detail: "New emails do not match." }, null, 2));
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/auth/change-email/`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            current_password: currentPassword,
            new_email: e1,
          }),
        });

        await setPrettyResult(res);
      }

      if (mode === "username") {
        if (!newUsername1 || !newUsername2) {
          setResult(JSON.stringify({ detail: "Please fill all fields." }, null, 2));
          setLoading(false);
          return;
        }

        const u1 = newUsername1.trim();
        const u2 = newUsername2.trim();

        if (u1 !== u2) {
          setResult(JSON.stringify({ detail: "New usernames do not match." }, null, 2));
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/auth/change-username/`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            current_password: currentPassword,
            new_username: u1,
          }),
        });

        await setPrettyResult(res);
      }
    } catch (e) {
      setResult(JSON.stringify({ detail: "Network error", error: String(e) }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ label, value }: { label: string; value: Mode }) => {
    const active = mode === value;

    return (
      <button
        onClick={() => {
          setMode(value);
          setResult("");
        }}
        className={`pill-button px-4 py-2 text-sm md:text-base ${
          active ? "opacity-100" : "opacity-70 hover:opacity-100"
        }`}
        style={{ cursor: "pointer" }}
        type="button"
      >
        {label}
      </button>
    );
  };

  const inputClass =
    "w-full p-3 rounded-lg bg-black/60 border border-cyan-400/30 focus:outline-none focus:border-cyan-300 " +
    "shadow-[0_0_14px_rgba(56,189,248,0.20)]";

  const panelClass = "glass-card p-5 md:p-6";

  // ✅ Small reusable show/hide button
  const ShowButton = ({
    shown,
    onToggle,
  }: {
    shown: boolean;
    onToggle: () => void;
  }) => {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="pill-button px-4 py-2 text-xs md:text-sm opacity-85 hover:opacity-100"
        style={{ cursor: "pointer" }}
      >
        {shown ? "Hide" : "Show"}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={closeModal} />

      {/* Modal */}
      <div className="relative max-w-2xl mx-auto mt-10 md:mt-16 px-4">
        <div
            ref={modalRef}
            className="hero-shell p-5 md:p-7 max-h-[85vh] overflow-hidden flex flex-col"
            >

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold glow-text">Security</h2>
              <p className="text-sm text-white/70 mt-2 max-w-xl">
                Change password, email, or username. Confirm with your current password at the end.
              </p>
            </div>

            <button
              onClick={closeModal}
              className="pill-button px-5 py-2"
              style={{ cursor: "pointer" }}
              type="button"
            >
              Close
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mt-6">
            <TabButton label="Change Password" value="password" />
            <TabButton label="Change Email" value="email" />
            <TabButton label="Change Username" value="username" />
          </div>

          {/* Body */}
          <div className="mt-6 space-y-4 overflow-y-auto pr-2">

            {/* Action panel */}
            <div className={panelClass}>
              {mode === "password" && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <label className="block text-sm text-white/80">New Password</label>
                      <ShowButton
                        shown={showNewPasswords}
                        onToggle={() => setShowNewPasswords((v) => !v)}
                      />
                    </div>

                    <input
                      className={inputClass}
                      type={showNewPasswords ? "text" : "password"}
                      value={newPassword1}
                      onChange={(e) => setNewPassword1(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">New Password Again</label>
                    <input
                      className={inputClass}
                      type={showNewPasswords ? "text" : "password"}
                      value={newPassword2}
                      onChange={(e) => setNewPassword2(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              )}

              {mode === "email" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">New Email</label>
                    <input
                      className={inputClass}
                      value={newEmail1}
                      onChange={(e) => setNewEmail1(e.target.value)}
                      placeholder="Enter new email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">New Email Again</label>
                    <input
                      className={inputClass}
                      value={newEmail2}
                      onChange={(e) => setNewEmail2(e.target.value)}
                      placeholder="Confirm new email"
                    />
                  </div>
                </div>
              )}

              {mode === "username" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">New Username</label>
                    <input
                      className={inputClass}
                      value={newUsername1}
                      onChange={(e) => setNewUsername1(e.target.value)}
                      placeholder="Enter new username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">New Username Again</label>
                    <input
                      className={inputClass}
                      value={newUsername2}
                      onChange={(e) => setNewUsername2(e.target.value)}
                      placeholder="Confirm new username"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Current password panel at the END */}
            <div className={panelClass}>
              <div className="flex items-center justify-between gap-3 mb-2">
                <label className="block text-sm text-white/80">
                  Confirm with Current Password
                </label>

                <ShowButton
                  shown={showCurrentPassword}
                  onToggle={() => setShowCurrentPassword((v) => !v)}
                />
              </div>

              <input
                className={inputClass}
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password to confirm changes"
              />

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={submit}
                  disabled={loading}
                  className={`pill-button px-6 py-2 ${loading ? "opacity-60" : ""}`}
                  style={{ cursor: loading ? "not-allowed" : "pointer" }}
                  type="button"
                >
                  {loading ? "Working..." : "Save Changes"}
                </button>

                <button
                  onClick={resetFields}
                  disabled={loading}
                  className={`pill-button px-6 py-2 opacity-75 hover:opacity-100 ${
                    loading ? "opacity-50" : ""
                  }`}
                  style={{ cursor: loading ? "not-allowed" : "pointer" }}
                  type="button"
                >
                  Clear
                </button>
              </div>

              <p className="text-xs text-white/60 mt-3">
                Note: Changing your password will log you out on success.
              </p>
            </div>

            {/* Result panel (scrollable) */}
            <div className="glass-card p-4">
              <div className="text-sm font-semibold text-white mb-2">Result</div>

              <div className="max-h-[260px] overflow-auto rounded-lg border border-white/10 bg-black/40 p-3">
                <pre className="text-xs whitespace-pre-wrap break-words text-white/80">
                  {result || "No request yet."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
