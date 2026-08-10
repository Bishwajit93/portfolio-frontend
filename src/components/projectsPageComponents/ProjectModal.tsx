"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";

type Props = { project: Project; onClose: () => void };

export default function ProjectModal({ project, onClose }: Props) {
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

  const paragraphs = toParagraphs(project.description || "");
  const endDate = project.end_date || "Present";

  return (
    <motion.div
      className="detail-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.article
        className="detail-modal detail-modal-project"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 34, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="detail-modal-chrome">
          <div className="detail-modal-context"><i /> Work / engineering brief</div>
          <button type="button" className="detail-modal-close" onClick={onClose} aria-label="Close project details">
            <span>Close</span><b>×</b>
          </button>
        </div>

        <div className="detail-modal-scroll">
          <header className="detail-modal-hero">
            <div className="detail-modal-hero-line">
              <span className="detail-modal-index">Project / Detail</span>
              <span className={`detail-modal-status ${project.status === "Completed" ? "is-complete" : ""}`}>{project.status || "Project"}</span>
            </div>
            <h2 id="project-detail-title">{project.title}</h2>
            <p>{project.tech_stack || "Full-stack web application"}</p>
          </header>

          <div className="detail-modal-layout">
            <aside className="detail-modal-rail">
              <Meta label="Timeline" value={`${project.start_date || "—"} — ${endDate}`} />
              <Meta label="Status" value={project.status || "—"} />
              <Meta label="Stack" value={project.tech_stack || "—"} />
            </aside>

            <section className="detail-modal-copy">
              <span className="detail-modal-section-label">System brief</span>
              {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p className="is-muted">No project description has been added yet.</p>}

              {(project.live_url || project.github_frontend_url || project.github_backend_url) && (
                <div className="detail-modal-actions" aria-label="Project links">
                  {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer"><span>Live system</span><b>↗</b></a>}
                  {project.github_frontend_url && <a href={project.github_frontend_url} target="_blank" rel="noreferrer"><span>Frontend source</span><b>↗</b></a>}
                  {project.github_backend_url && <a href={project.github_backend_url} target="_blank" rel="noreferrer"><span>Backend source</span><b>↗</b></a>}
                </div>
              )}
            </section>
          </div>

          <footer className="detail-modal-footer">
            <span>Engineering work / AbdullahStack</span>
            <button type="button" onClick={onClose}>Return to work ↑</button>
          </footer>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div className="detail-modal-meta"><span>{label}</span><strong>{value}</strong></div>;
}

function toParagraphs(text: string, maxLength = 320): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (/\r?\n/.test(trimmed)) return trimmed.split(/\n\s*\n|[\r\n]+/).map((item) => item.trim()).filter(Boolean);

  const sentences = trimmed.split(/(?<=[.!?])\s+(?=[A-Z0-9])/);
  const paragraphs: string[] = [];
  let buffer = "";
  for (const sentence of sentences) {
    const candidate = buffer ? `${buffer} ${sentence}` : sentence;
    if (candidate.length > maxLength && buffer) {
      paragraphs.push(buffer);
      buffer = sentence;
    } else buffer = candidate;
  }
  if (buffer) paragraphs.push(buffer);
  return paragraphs;
}
