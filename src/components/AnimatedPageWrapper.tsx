"use client";

import { motion } from "framer-motion";

export default function AnimatedPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
    className="w-full"
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 2, ease: "easeOut" }}
    >
    {children}
    </motion.div>

  );
}
