"use client";

import { ReactNode, useEffect } from "react";
import { setViewportHeight } from "@/utils/setViewportHeight";
import { AuthProvider } from "@/context/AuthContext";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";

type Props = {
  children: ReactNode;
};

// Animation container for stagger
const navContainer: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.4,
    },
  },
};

const navItem: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45 },
  },
};

export default function LayoutWrapper({ children }: Props) {
  useEffect(() => {
    setViewportHeight();
  }, []);

  const pathname = usePathname();

  const items = [
    { label: "About", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Education", href: "/education" },
  ];

  return (
    <AuthProvider>
      {/* Optional global background if you use it in your theme */}
      <div className="background" />

      {/* Right-side vertical nav visible on ALL pages (desktop only) */}
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
        {/* Wrapper for the vertical line + points */}
        <div className="relative flex flex-col items-end gap-6 pr-3 py-4 min-h-[260px]">
          {/* Glowing vertical line (uses the .timeline-rail style from globals.css) */}
          <div className="timeline-rail" />

          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                variants={navItem}
                whileHover={{ scale: 1.05, x: -4 }}
                className={`
                  relative z-10 pr-4
                  transition-transform duration-300
                  ${isActive ? "-translate-x-1" : ""}
                `}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3"
                >
                  {/* Label pill */}
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

                  {/* Dot on the line */}
                  <span className="relative flex items-center justify-center">
                    <span
                      className={[
                        "block rounded-full",
                        "transition-all duration-300",
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
        </div>
      </motion.nav>

      {/* Main content area */}
      <div className="app-shell flex flex-col items-center">
        <main className="flex-1 w-full max-w-6xl px-4 md:px-8 pt-8 pb-[100px] md:pt-10 md:pb-16">
          {children}

          {/* Bottom legal + utility pills (instead of big footer) */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] text-cyan-200/80">
            <Link
              href="/impressum"
              className="
                inline-flex items-center justify-center
                px-5 py-2.5
                pill-button
                text-xs md:text-sm text-cyan-50
              "
            >
              Impressum
            </Link>
            <Link
              href="/privacy"
              className="
                inline-flex items-center justify-center
                px-5 py-2.5
                pill-button
                text-xs md:text-sm text-cyan-50
              "
            >
              Privacy policy
            </Link>
            <Link
              href="/docs"
              className="
                inline-flex items-center justify-center
                px-5 py-2.5
                pill-button
                text-xs md:text-sm text-cyan-50
              "
            >
              Docs
            </Link>
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </AuthProvider>
  );
}
