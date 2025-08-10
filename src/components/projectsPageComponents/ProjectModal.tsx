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
        className={`
          w-[92vw] max-w-md sm:max-w-2xl
          h-[78dvh] sm:h-[80vh]  /* fixed height so the rest scrolls */
          rounded-2xl border border-cyan-400/30 bg-[#0a0a0a]
          shadow-[0_6px_30px_rgba(0,255,255,0.25)]
          overflow-hidden flex flex-col
        `}
      >
        {/* Sticky header keeps close reachable */}
        <div className="shrink-0 sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-[1px] border-b border-cyan-400/15 px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="text-cyan-300 hover:text-white cursor-pointer"
          >
            ✖ Close
          </button>
        </div>

        {/* Scrollable content within fixed panel */}
        <div className="grow overflow-y-auto overscroll-contain px-6 py-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4 text-center">
            {project.title}
          </h2>

          <div className="space-y-4 text-gray-200">
            <p>
              <span className="text-cyan-400 font-semibold">Tech Stack:</span>{" "}
              {project.tech_stack}
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">Status:</span>{" "}
              {project.status}
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">Duration:</span>{" "}
              {project.start_date} to {project.end_date || "Present"}
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">Description:</span>{" "}
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {project.github_frontend_url && (
                <a
                  href={project.github_frontend_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 hover:text-white underline"
                >
                  Frontend Code
                </a>
              )}
              {project.github_backend_url && (
                <a
                  href={project.github_backend_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 hover:text-white underline"
                >
                  Backend Code
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-400 hover:text-white underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Bottom breathing space */}
          <div className="h-6" />
        </div>
      </motion.div>
    </div>
  );
}
