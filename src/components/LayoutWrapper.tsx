"use client";

import { ReactNode, useEffect } from "react";
import { setViewportHeight } from "@/utils/setViewportHeight";
import { AuthProvider } from "@/context/AuthContext";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
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

  return (
    <AuthProvider>
      {/* Optional global background if you use it in your theme */}
      <div className="background" />

      {/* Right-side vertical nav visible on ALL pages (desktop only) */}
      <motion.nav
        variants={navContainer}
        initial="hidden"
        animate="show"
        className="hidden md:flex flex-col gap-7 fixed right-10 top-1/2 -translate-y-1/2 z-40"
      >
        {[
          { label: "About", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "Experience", href: "/experience" },
          { label: "Education", href: "/education" },
        ].map((item) => (
          <motion.div
            key={item.href}
            variants={navItem}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 230, damping: 15 }}
          >
            <Link
              href={item.href}
              className="
                inline-flex items-center justify-center
                w-36 px-5 py-2.5
                pill-button
                text-[12px] text-cyan-50
                text-center
              "
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
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

      {/* Mobile bottom navigation (unchanged) */}
      <MobileNav />
    </AuthProvider>
  );
}
