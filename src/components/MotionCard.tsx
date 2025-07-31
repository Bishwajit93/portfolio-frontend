"use client";

import { motion } from "framer-motion";

export default function MotionCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
