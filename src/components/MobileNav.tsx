"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { token, hydrated, logout } = useAuth();

  const isLoggedIn = hydrated && Boolean(token);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const navItems = [
    { label: "About", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Education", href: "/education" },
    { label: "Contact", href: "/contact" },
    ...(isLoggedIn ? [{ label: "Account", href: "/account" }] : []),
  ];

  return (
    <motion.nav
      id="site-footer"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={[
        "md:hidden fixed bottom-0 left-0 w-full",
        isLoggedIn ? "h-[85px]" : "h-[55px]",
        "bg-black",
        "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_60%)]",
        "border-t border-cyan-400/40",
        "shadow-[0_0_22px_rgba(34,211,238,0.45)]",
        "z-50",
      ].join(" ")}
      style={{ transform: "translateZ(0)" }}
    >
      <div className="flex flex-col h-full">
        {/* MAIN NAV ROW */}
        <ul className="flex w-full flex-1 text-xs text-cyan-200 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.href}
                className="flex-1 flex items-center justify-center text-center"
              >
                <Link
                  href={item.href}
                  className="relative flex flex-col items-center justify-center"
                >
                  <span
                    className={[
                      "px-1 text-[11px] font-medium transition-all duration-300",
                      isActive ? "text-cyan-50" : "text-cyan-200 hover:text-white",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="mt-[1px] w-6 h-[2px] bg-cyan-50 shadow-[0_0_4px_rgba(0,255,255,0.5)] rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* LOGOUT ROW (only when logged in) */}
        {isLoggedIn && (
          <div className="h-[30px] flex items-center justify-center border-t border-cyan-400/20">
            <button
              type="button"
              onClick={handleLogout}
              className="
                text-[11px] font-medium
                text-red-300
                px-4 py-1 rounded-full
                border border-red-400/60
                bg-[rgba(6,12,24,0.95)]
                shadow-[0_0_10px_rgba(239,68,68,0.5)]
                hover:text-red-50
                hover:shadow-[0_0_14px_rgba(239,68,68,0.8)]
                transition
                cursor-pointer
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
