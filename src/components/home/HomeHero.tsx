"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function HomeHero({ onRecruiterMode }: { onRecruiterMode: () => void }) {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="availability-line">
          <span className="availability-dot" />
          <span>Berlin · Open to full-time opportunities</span>
        </div>
        <p className="eyebrow">Backend · Full-stack · Systems</p>
        <h1 id="hero-title">
          I build software that<br />
          <span>survives beyond the demo.</span>
        </h1>
        <p className="hero-lede">
          I’m Bishwajit Karmaker — a developer focused on dependable APIs, structured data and interfaces that make complex systems feel simple.
        </p>
        <div className="hero-actions">
          <Link href="/projects" className="button button-primary">
            Explore my work <ArrowIcon className="button-arrow" />
          </Link>
          <button type="button" onClick={onRecruiterMode} className="button button-ghost">
            ⚡ 60-second overview
          </button>
        </div>
      </motion.div>

      <motion.div
        className="hero-console"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="console-head"><span>engineering.profile</span><span>● live</span></div>
        <div className="console-body">
          <ConsoleRow label="role" value="Backend / Full-stack Developer" />
          <ConsoleRow label="core" value="Django · DRF · PostgreSQL" />
          <ConsoleRow label="interface" value="TypeScript · Next.js" />
          <ConsoleRow label="approach" value="production-first" accent />
        </div>
        <div className="console-signal" aria-hidden="true">
          {[28, 52, 38, 72, 46, 86, 58, 100, 67, 83, 48, 63].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ConsoleRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="console-row"><span>{label}</span><strong className={accent ? "accent" : ""}>{value}</strong></div>;
}
