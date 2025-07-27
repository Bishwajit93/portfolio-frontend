"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hidden md:block w-full bg-black text-cyan-300 border-t border-blue-500/40 shadow-md"
    >
      {/* INNER glowing border box, like header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-blue-500/40 shadow-[0_-4px_20px_rgba(0,191,255,0.4)]">
        <div className="py-6 text-center space-y-3 border-t border-blue-500/20">
          <div className="flex justify-center flex-wrap gap-6 text-sm font-medium">
            <a
              href="https://www.linkedin.com/in/bishwajit-karmaker/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Bishwajit93"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300"
            >
              GitHub
            </a>
            <Link
              href="/resume"
              className="hover:text-white transition duration-300"
            >
              Resume
            </Link>
          </div>
          <p className="text-xs text-cyan-400">
            &copy; {new Date().getFullYear()} Portfolio of Bishwajit Karmaker. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
