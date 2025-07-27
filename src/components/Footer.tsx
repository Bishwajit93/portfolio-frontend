"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-cyan-300 mt-auto border-t border-blue-500/40">
      {/* This is the glowing part that matches header nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-blue-500/20 shadow-[0_-4px_20px_rgba(0,191,255,0.4)]">
        <div className="py-6 text-center space-y-3">
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
    </footer>
  );
}
