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
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-[50px] bg-black border-t border-cyan-600 z-50 shadow-[0_-2px_10px_rgba(0,255,255,0.3)]">
      <ul className="flex w-full h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className="flex-1 flex items-center justify-center text-center">
              <Link
                href={item.href}
                className="relative inline-block w-full h-full flex items-center justify-center"
              >
                <span
                  className={`text-xs font-medium transition-all duration-300
                    ${
                      isActive
                        ? "text-cyan-200 glow-text"
                        : "text-cyan-300 hover:text-white"
                    }`}
                >
                  {item.label}
                </span>

                {/* Glowing underline for active link */}
                {isActive && (
                  <span className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-cyan-300 shadow-[0_0_6px_rgba(0,255,255,0.6)] rounded-full"></span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
