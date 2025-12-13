// src/components/projectsPageComponents/ProjectModal.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  // Lock page scroll + neutralize footer taps while modal is open
  useEffect(() => {
    const bodyPrev = document.body.style.overflow;
    const footer = document.getElementById("site-footer");
    const footerPrevPointer = footer?.style.pointerEvents ?? "";

    document.body.style.overflow = "hidden";
    if (footer) footer.style.pointerEvents = "none";

    return () => {
      document.body.style.overflow = bodyPrev;
      if (footer) footer.style.pointerEvents = footerPrevPointer;
    };
  }, []);

  // helper: split description into paragraphs
  function toParagraphs(text: string, maxLen = 320): string[] {
    const t = (text || "").trim();
    if (!t) return [];

    if (/\r?\n/.test(t)) {
      return t.split(/\n\s*\n|[\r\n]+/).map((s) => s.trim()).filter(Boolean);
    }

    const sentences = t.split(/(?<=[.!?])\s+(?=[A-Z0-9])/);
    const paras: string[] = [];
    let buf = "";

    for (const s of sentences) {
      const candidate = buf ? `${buf} ${s}` : s;
      if (candidate.length > maxLen && buf) {
        paras.push(buf);
        buf = s;
      } else {
        buf = candidate;
      }
    }
    if (buf) paras.push(buf);
    return paras;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-3 sm:px-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="
          w-[92vw] max-w-md sm:max-w-2xl
          h-[78dvh] sm:h-[80vh]
          hero-shell
          rounded-2xl overflow-hidden
          flex flex-col
        "
      >
        {/* Sticky header with close button */}
        <div className="shrink-0 sticky top-0 z-10 bg-black/70 backdrop-blur-sm border-b border-cyan-400/20 px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="
              text-cyan-200 hover:text-cyan-50
              text-xs md:text-sm font-medium
              px-3 py-1.5 rounded-full
              border border-cyan-400/70
              bg-black/40
              shadow-[0_0_10px_rgba(34,211,238,0.6)]
              cursor-pointer transition
            "
          >
            Close
          </button>
        </div>

        {/* Scrollable content within fixed panel */}
        <div
          className="grow overflow-y-auto overscroll-contain px-6 py-6"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-200 mb-4 text-center">
            {project.title}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-cyan-100/90">
            <p>
              <span className="text-cyan-300 font-semibold">Tech Stack: </span>
              {project.tech_stack}
            </p>
            <p>
              <span className="text-cyan-300 font-semibold">Status: </span>
              {project.status}
            </p>
            <p>
              <span className="text-cyan-300 font-semibold">Duration: </span>
              {project.start_date} to {project.end_date || "Present"}
            </p>

            <div>
              <span className="text-cyan-300 font-semibold">Description:</span>
              <div className="mt-2 space-y-3 leading-relaxed">
                {toParagraphs(project.description).map((para, i) => (
                  <p
                    key={i}
                    className="text-cyan-100/90 break-words hyphens-auto"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              {project.github_frontend_url && (
                <a
                  href={project.github_frontend_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 hover:text-cyan-50 underline underline-offset-4"
                >
                  Frontend Code
                </a>
              )}
              {project.github_backend_url && (
                <a
                  href={project.github_backend_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 hover:text-cyan-50 underline underline-offset-4"
                >
                  Backend Code
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-400 hover:text-green-200 underline underline-offset-4"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>

          <div className="h-6" />
        </div>
      </motion.div>
    </div>
  );
}
