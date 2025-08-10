// src/components/projectsPageComponents/ProjectModal.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [footerOffset, setFooterOffset] = useState(0);

  // Lock page scroll + neutralize footer taps while modal is open
  useEffect(() => {
    const bodyPrev = document.body.style.overflow;
    const footer = document.getElementById("site-footer");
    const footerPrevPointer = footer?.style.pointerEvents ?? "";

    document.body.style.overflow = "hidden";
    if (footer) footer.style.pointerEvents = "none";

    const updateOffset = () => setFooterOffset(footer?.offsetHeight ?? 0);
    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => {
      document.body.style.overflow = bodyPrev;
      if (footer) footer.style.pointerEvents = footerPrevPointer;
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  // Keep panel clear of the fixed mobile footer
  const panelStyle = useMemo<React.CSSProperties>(() => {
    return {
      maxHeight: `calc(100dvh - ${footerOffset}px - 16px)`, // little breathing room
      WebkitOverflowScrolling: "touch",
      willChange: "transform",
    };
  }, [footerOffset]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 px-3 sm:px-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        style={panelStyle}
        className={`
          w-full max-w-2xl rounded-2xl border border-cyan-400/30 bg-[#0a0a0a]
          shadow-[0_6px_30px_rgba(0,255,255,0.25)] overflow-hidden
        `}
      >
        {/* Sticky header keeps close reachable */}
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-[1px] border-b border-cyan-400/15 px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="text-cyan-300 hover:text-white cursor-pointer"
          >
            ✖ Close
          </button>
        </div>

        {/* Scrollable content (inherits maxHeight) */}
        <div className="overflow-y-auto overscroll-contain px-6 py-6" style={{ maxHeight: "inherit" }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4 text-center">
            {project.title}
          </h2>

          <div className="space-y-4 text-gray-200">
            <p><span className="text-cyan-400 font-semibold">Tech Stack:</span> {project.tech_stack}</p>
            <p><span className="text-cyan-400 font-semibold">Status:</span> {project.status}</p>
            <p>
              <span className="text-cyan-400 font-semibold">Duration:</span>{" "}
              {project.start_date} to {project.end_date || "Present"}
            </p>
            <p><span className="text-cyan-400 font-semibold">Description:</span> {project.description}</p>

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

          {/* Spacer so last item isn't under iOS rubber-band */}
          <div className="h-6" />
        </div>
      </motion.div>
    </div>
  );
}
