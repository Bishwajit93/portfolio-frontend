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
      <ul className="flex h-full w-full text-xs text-cyan-300">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className="flex-1 flex items-center justify-center text-center">
              <Link
                href={item.href}
                className={`relative w-full inline-block transition-all duration-300 font-medium
                  ${isActive ? "text-cyan-200 glow-text" : "hover:text-white"}
                `}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-cyan-300 shadow-[0_0_6px_rgba(0,255,255,0.6)] rounded-full"></span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
