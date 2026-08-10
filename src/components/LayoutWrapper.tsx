"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import MobileNav from "@/components/MobileNav";
import { setViewportHeight } from "@/utils/setViewportHeight";

type Props = { children: ReactNode };

function LayoutInner({ children }: Props) {
  const pathname = usePathname();
  const { token, hydrated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = hydrated && Boolean(token);

  useEffect(() => setViewportHeight(), []);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const items = useMemo(() => {
    const base = [
      { label: "Work", href: "/projects" },
      { label: "Experience", href: "/experience" },
      { label: "Education", href: "/education" },
      { label: "Résumé", href: "/resume" },
    ];
    return isLoggedIn ? [...base, { label: "Account", href: "/account" }] : base;
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="site-frame">
      <motion.header
        className={`site-header ${scrolled ? "is-scrolled" : ""}`}
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="site-header-inner">
          <Link href="/" className="site-brand" aria-label="Bishwajit Karmaker home">
            <span className="brand-mark">BK</span>
            <span className="brand-copy">
              <strong>Bishwajit Karmaker</strong>
              <small>Developer · Berlin</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            {isLoggedIn ? (
              <button type="button" onClick={handleLogout} className="header-contact danger">Logout</button>
            ) : (
              <Link href="/contact" className="header-contact">Contact <span>↗</span></Link>
            )}
          </div>
        </div>
      </motion.header>

      <div className="page-shell">{children}</div>

      <footer className="site-footer">
        <div><strong>Bishwajit Karmaker</strong><span>Built end-to-end with Next.js + Django.</span></div>
        <nav aria-label="Footer navigation">
          <Link href="/docs">Docs</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/privacy">Privacy</Link>
          <a href="https://github.com/Bishwajit93" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </footer>

      <MobileNav />
    </div>
  );
}

export default function LayoutWrapper({ children }: Props) {
  return <AuthProvider><LayoutInner>{children}</LayoutInner></AuthProvider>;
}
