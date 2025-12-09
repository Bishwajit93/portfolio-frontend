"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
    <motion.nav
      id="site-footer"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="md:hidden fixed bottom-0 left-0 w-full h-[80px] bg-black border-t border-blue-500/40 shadow-[0_4px_20px_rgba(0,191,255,0.4)] z-50"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Column: top = main nav, bottom = legal links */}
      <div className="flex flex-col h-full">
        {/* Main nav row */}
        <ul className="flex w-full flex-1 text-xs text-cyan-300">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.href}
                className="flex-1 flex items-center justify-center text-center"
              >
                <Link
                  href={item.href}
                  className="relative flex flex-col items-center justify-center h-full"
                >
                  <span
                    className={`text-[13px] font-medium px-1 transition-all duration-300 ${
                      isActive
                        ? "text-cyan-200 glow-text"
                        : "text-cyan-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="mt-[2px] w-8 h-[2px] bg-cyan-300 shadow-[0_0_6px_rgba(0,255,255,0.5)] rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Legal links row */}
        <div className="h-[26px] flex items-center justify-center gap-4 text-[10px] text-cyan-400 border-t border-blue-500/40 bg-black/90">
          <Link
            href="/impressum"
            className={`hover:text-white transition ${
              pathname === "/impressum" ? "text-white" : ""
            }`}
          >
            Impressum
          </Link>
          <Link
            href="/privacy"
            className={`hover:text-white transition ${
              pathname === "/privacy" ? "text-white" : ""
            }`}
          >
            Privacy
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
