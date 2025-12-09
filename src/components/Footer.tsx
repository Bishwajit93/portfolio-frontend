"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const pathname = usePathname();

  return (
    <motion.footer
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hidden md:block w-full bg-black text-cyan-300 border-t border-blue-500/40 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-blue-500/40 shadow-[0_-4px_20px_rgba(0,191,255,0.4)]">
        <div className="py-6 text-center space-y-3 border-t border-blue-500/20">
          <div className="flex justify-center flex-wrap text-sm font-medium divide-x divide-cyan-400/30">
            <a
              href="https://www.linkedin.com/in/bishwajit-karmaker/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 text-cyan-300 glow-text hover:text-white transition duration-300 hover:shadow-[0_0_6px_rgba(0,255,255,0.4)]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Bishwajit93"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 text-cyan-300 glow-text hover:text-white transition duration-300 hover:shadow-[0_0_6px_rgba(0,255,255,0.4)]"
            >
              GitHub
            </a>
            <Link
              href="/resume"
              className={`px-4 glow-text transition duration-300 ${
                pathname === "/resume"
                  ? "text-white border-b border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.6)]"
                  : "text-cyan-300 hover:text-white hover:shadow-[0_0_6px_rgba(0,255,255,0.4)]"
              }`}
            >
              Resume
            </Link>
            <Link
              href="/docs"
              className={`px-4 glow-text transition duration-300 ${
                pathname === "/docs"
                  ? "text-white border-b border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.6)]"
                  : "text-cyan-300 hover:text-white hover:shadow-[0_0_6px_rgba(0,255,255,0.4)]"
              }`}
            >
              Docs
            </Link>
            <Link
              href="/impressum"
              className={`px-4 glow-text transition duration-300 ${
                pathname === "/impressum"
                  ? "text-white border-b border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.6)]"
                  : "text-cyan-300 hover:text-white hover:shadow-[0_0_6px_rgba(0,255,255,0.4)]"
              }`}
            >
              Impressum
            </Link>
            <Link
              href="/privacy"
              className={`px-4 glow-text transition duration-300 ${
                pathname === "/privacy"
                  ? "text-white border-b border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.6)]"
                  : "text-cyan-300 hover:text-white hover:shadow-[0_0_6px_rgba(0,255,255,0.4)]"
              }`}
            >
              Privacy Policy
            </Link>
          </div>

          <p className="text-xs text-cyan-500">
            &copy; {new Date().getFullYear()} Portfolio of Bishwajit Karmaker. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
