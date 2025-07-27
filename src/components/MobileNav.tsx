"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "About", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-[50px] bg-black border-t border-cyan-600 shadow-[0_-2px_10px_rgba(0,255,255,0.3)] z-50">
      <ul className="flex justify-evenly items-center h-full px-1 text-xs text-cyan-300">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li
              key={item.href}
              className="relative flex items-center justify-center h-full"
            >
              <Link
                href={item.href}
                className={`inline-block px-2 py-2 transition-all duration-300 hover:text-white ${
                  isActive ? "after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-[2px] after:bg-cyan-300 after:shadow-[0_0_6px_rgba(0,255,255,0.6)] after:rounded-full" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
