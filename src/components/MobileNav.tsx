"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const publicItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "Story", href: "/experience" },
  { label: "CV", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { token, hydrated } = useAuth();
  const items = hydrated && token ? [...publicItems.slice(0, 4), { label: "Account", href: "/account" }] : publicItems;

  return (
    <motion.nav
      className="mobile-dock"
      aria-label="Mobile navigation"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={active ? "active" : ""}>
            <span className="dock-dot" />
            {item.label}
          </Link>
        );
      })}
    </motion.nav>
  );
}
