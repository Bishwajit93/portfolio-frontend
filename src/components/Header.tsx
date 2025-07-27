"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "About", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Education", href: "/education" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-black text-white fixed top-0 left-0 z-50 shadow-md border-b border-blue-500/40">
      <div className="h-[50px] md:h-[80px] flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-blue-500/20 shadow-[0_4px_20px_rgba(0,191,255,0.4)]">
        {/* Logo / Name */}
        <div className="text-sm md:text-lg font-extrabold text-cyan-300 tracking-wide">
          <Link href="/" className="hover:text-white transition">
            Bishwajit Karmaker
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-6">
          {/* Navigation (Desktop only) */}
          <ul className="hidden md:flex space-x-5 text-sm font-semibold text-cyan-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-1.5 rounded-md transition-all duration-300 border 
                    ${
                      pathname === item.href
                        ? "border-cyan-400 bg-cyan-300 text-black shadow-[0_0_10px_rgba(0,255,255,0.6)]"
                        : "border-transparent hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(0,255,255,0.5)] hover:bg-cyan-600/20 hover:text-white"
                    } cursor-pointer`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {token && (
            <button
              onClick={handleLogout}
              className="px-2 py-1 text-xs md:px-4 md:py-1.5 md:text-sm font-semibold text-red-400 border border-red-500 rounded-md 
               shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 hover:text-black 
               hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] cursor-pointer transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
