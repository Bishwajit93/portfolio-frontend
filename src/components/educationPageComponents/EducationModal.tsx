"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Education } from "@/types/education";

type Props = { education: Education; onClose: () => void };

export default function EducationModal({ education, onClose }: Props) {
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

  return (
    <motion.div
      className="detail-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="education-detail-title"
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
          <div className="detail-modal-context"><i /> Education / academic record</div>
          <button type="button" className="detail-modal-close" onClick={onClose} aria-label="Close education details">
            <span>Close</span><b>×</b>
          </button>
        </div>

        <div className="detail-modal-scroll">
          <header className="detail-modal-hero">
            <span className="detail-modal-index">Education / Detail</span>
            <h2 id="education-detail-title">{education.degree}</h2>
            <p>{education.institution_name}</p>
          </header>

          <div className="detail-modal-layout">
            <aside className="detail-modal-rail">
              <Meta label="Field" value={education.field_of_study || "—"} />
              <Meta label="Period" value={`${education.start_date} — ${education.end_date || "Present"}`} />
              {education.grade && <Meta label="Grade" value={education.grade} />}
            </aside>

            <section className="detail-modal-copy">
              <span className="detail-modal-section-label">Academic context</span>
              <p className={!education.description ? "is-muted" : ""}>
                {education.description || "No additional description has been added for this education entry yet."}
              </p>
            </section>
          </div>

          <footer className="detail-modal-footer">
            <span>Education record / AbdullahStack</span>
            <button type="button" onClick={onClose}>Return to education ↑</button>
          </footer>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div className="detail-modal-meta"><span>{label}</span><strong>{value}</strong></div>;
}
