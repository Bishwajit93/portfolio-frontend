// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); // send you back to the login page
  };

  return (
    <header className="w-full py-4 bg-black text-white shadow-lg">
      <nav className="container mx-auto flex justify-between items-center px-10">
        {/* Logo / Name */}
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:underline">
            Bishwajit Karmaker
          </Link>
        </div>

        {/* Navigation links */}
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/experience" className="hover:underline">
              Experience
            </Link>
          </li>
          <li>
            <Link href="/education" className="hover:underline">
              Education
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>

          {/* Only show Logout when logged in */}
          {token && (
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-500"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
