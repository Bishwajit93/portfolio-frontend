"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function RecruiterMode({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="recruiter-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Recruiter overview"
            className="recruiter-panel"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="recruiter-topbar">
              <span className="eyebrow">60-second overview</span>
              <button type="button" onClick={onClose} className="icon-button" aria-label="Close recruiter mode">×</button>
            </div>

            <div className="recruiter-grid">
              <div className="recruiter-primary">
                <p className="kicker">Bishwajit Karmaker · Berlin</p>
                <h2>Backend-minded full-stack developer building production software.</h2>
                <p className="lede">
                  Python, Django REST Framework, PostgreSQL, TypeScript and Next.js — with hands-on work across authentication,
                  relational data, deployment and real client systems.
                </p>
                <div className="recruiter-actions">
                  <Link href="/resume" className="button button-primary" onClick={onClose}>View résumé</Link>
                  <Link href="/contact" className="button button-ghost" onClick={onClose}>Contact me</Link>
                </div>
              </div>

              <div className="recruiter-facts">
                <Fact label="Primary stack" value="Python · Django · DRF · PostgreSQL" />
                <Fact label="Frontend" value="TypeScript · React · Next.js" />
                <Fact label="Production" value="REST · JWT · Railway · Vercel · Git" />
                <Fact label="Focus" value="Backend · Full-stack · IT systems" />
              </div>
            </div>

            <div className="recruiter-projects">
              <MiniProject index="01" title="OPSHUB" text="Multi-tenant operations platform spanning POS, inventory, finance and permissions." />
              <MiniProject index="02" title="Linda Art Gallery" text="Production client platform with media delivery, enquiries, auth and deployment." />
              <MiniProject index="03" title="AbdullahStack" text="API-driven portfolio with owner tools, résumé generation and secure content workflows." />
            </div>

            <div className="recruiter-footer">
              <a href="https://github.com/Bishwajit93" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/bishwajit-karmaker/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <Link href="/projects" onClick={onClose}>Explore engineering work →</Link>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="fact-row"><span>{label}</span><strong>{value}</strong></div>;
}

function MiniProject({ index, title, text }: { index: string; title: string; text: string }) {
  return <article><span>{index}</span><div><h3>{title}</h3><p>{text}</p></div></article>;
}
