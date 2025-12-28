"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { setViewportHeight } from "@/utils/setViewportHeight";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";

type Props = {
  children: ReactNode;
};

const navContainer: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.15, duration: 0.4 },
  },
};

const navItem: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

function LayoutInner({ children }: Props) {
  useEffect(() => {
    setViewportHeight();
  }, []);

  const pathname = usePathname();
  const { token, hydrated, logout } = useAuth();

  const isLoggedIn = hydrated && Boolean(token);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const items = useMemo(
    () => [
      { label: "About", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Experience", href: "/experience" },
      { label: "Education", href: "/education" },
    ],
    []
  );

  return (
    <>
      <div className="background pointer-events-none" />

      {/* ✅ Always-visible desktop Logout (top-right) */}
      {isLoggedIn && (
        <div className="hidden md:block fixed top-5 right-5 z-50">
          <button
            type="button"
            onClick={handleLogout}
            className="
              px-4 py-2 rounded-full text-xs font-semibold
              border border-red-400/70
              text-red-200
              bg-[rgba(6,12,24,0.98)]
              shadow-[0_0_12px_rgba(239,68,68,0.55)]
              hover:text-red-50 hover:border-red-300 hover:shadow-[0_0_16px_rgba(239,68,68,0.8)]
              cursor-pointer transition-all duration-300
            "
          >
            Logout
          </button>
        </div>
      )}

      {/* Right-side vertical nav (desktop only) */}
      <motion.nav
        variants={navContainer}
        initial="hidden"
        animate="show"
        className="
          hidden md:flex
          fixed right-10 top-1/2 -translate-y-1/2
          z-40
        "
      >
        <div className="relative flex flex-col items-end gap-6 pr-3 py-4 min-h-[260px]">
          <div className="timeline-rail pointer-events-none" />

          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                variants={navItem}
                whileHover={{ scale: 1.05, x: -4 }}
                className={[
                  "relative z-10 pr-4 transition-transform duration-300",
                  isActive ? "-translate-x-1" : "",
                ].join(" ")}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <span
                    className={[
                      "px-4 py-1.5 rounded-full text-[12px] font-medium",
                      "border border-cyan-400/60",
                      "bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_bottom,rgba(129,140,248,0.28),transparent_55%),rgba(6,12,24,0.98)]",
                      "shadow-[0_0_12px_rgba(34,211,238,0.65)]",
                      "transition-all duration-300",
                      isActive
                        ? "text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.95)] border-cyan-300"
                        : "text-cyan-200 hover:text-cyan-50 hover:shadow-[0_0_16px_rgba(34,211,238,0.8)] hover:border-cyan-300/80",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>

                  <span className="relative flex items-center justify-center">
                    <span
                      className={[
                        "block rounded-full transition-all duration-300",
                        isActive
                          ? "w-[11px] h-[11px] bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)]"
                          : "w-[7px] h-[7px] bg-cyan-500/80 shadow-[0_0_6px_rgba(34,211,238,0.8)]",
                      ].join(" ")}
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}

          {/* ✅ Logout in the right nav too (extra) */}
          {isLoggedIn && (
            <motion.div
              variants={navItem}
              whileHover={{ scale: 1.05, x: -4 }}
              className="relative z-10 pr-4"
            >
              <button
                type="button"
                onClick={handleLogout}
                className={[
                  "px-4 py-1.5 rounded-full text-[12px] font-medium",
                  "border border-red-400/70",
                  "bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(239,68,68,0.22),transparent_55%),rgba(6,12,24,0.98)]",
                  "shadow-[0_0_12px_rgba(239,68,68,0.55)]",
                  "transition-all duration-300 cursor-pointer",
                  "text-red-200 hover:text-red-50 hover:shadow-[0_0_16px_rgba(239,68,68,0.8)] hover:border-red-300/80",
                ].join(" ")}
              >
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <div className="app-shell flex flex-col items-center">
        <main className="flex-1 w-full max-w-6xl px-4 md:px-8 pt-8 pb-[100px] md:pt-10 md:pb-16">
          {children}

          <div className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] text-cyan-200/80">
            <Link
              href="/impressum"
              className="inline-flex items-center justify-center px-5 py-2.5 pill-button text-xs md:text-sm text-cyan-50"
            >
              Impressum
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center px-5 py-2.5 pill-button text-xs md:text-sm text-cyan-50"
            >
              Privacy policy
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-5 py-2.5 pill-button text-xs md:text-sm text-cyan-50"
            >
              Docs
            </Link>

            {/* ✅ Bottom-pill Logout backup */}
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center px-5 py-2.5 pill-button text-xs md:text-sm text-red-200 border border-red-400/60 hover:text-red-50 hover:border-red-300 cursor-pointer transition"
              >
                Logout
              </button>
            )}
          </div>
        </main>
      </div>

      <MobileNav />
    </>
  );
}

export default function LayoutWrapper({ children }: Props) {
  return (
    <AuthProvider>
      <LayoutInner>{children}</LayoutInner>
    </AuthProvider>
  );
}
