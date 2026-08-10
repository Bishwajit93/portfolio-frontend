"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Experience } from "@/types/experience";

type Props = { experience: Experience; onClose: () => void };

export default function ExperienceModal({ experience, onClose }: Props) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const endDate = experience.still_working ? "Present" : experience.end_date || "—";

  return (
    <motion.div
      className="detail-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-detail-title"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.article
        className="detail-modal"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 34, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="detail-modal-chrome">
          <div className="detail-modal-context"><i /> Work / selected history</div>
          <button type="button" className="detail-modal-close" onClick={onClose} aria-label="Close work details">
            <span>Close</span><b>×</b>
          </button>
        </div>

        <div className="detail-modal-scroll">
          <header className="detail-modal-hero">
            <span className="detail-modal-index">Experience / Detail</span>
            <h2 id="experience-detail-title">{experience.job_title}</h2>
            <p>{experience.company_name}</p>
          </header>

          <div className="detail-modal-layout">
            <aside className="detail-modal-rail">
              <Meta label="Location" value={experience.location || "—"} />
              <Meta label="Period" value={`${experience.start_date} — ${endDate}`} />
              <Meta label="Status" value={experience.still_working ? "Current role" : "Completed"} />
            </aside>

            <section className="detail-modal-copy">
              <span className="detail-modal-section-label">Scope & contribution</span>
              <p className={!experience.description ? "is-muted" : ""}>
                {experience.description || "No additional description has been added for this role yet."}
              </p>
            </section>
          </div>

          <footer className="detail-modal-footer">
            <span>Professional history / AbdullahStack</span>
            <button type="button" onClick={onClose}>Return to timeline ↑</button>
          </footer>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div className="detail-modal-meta"><span>{label}</span><strong>{value}</strong></div>;
}
