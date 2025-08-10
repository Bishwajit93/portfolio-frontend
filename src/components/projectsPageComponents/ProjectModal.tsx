// src/components/projectsPageComponents/ProjectModal.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Project } from "@/types/project";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [footerOffset, setFooterOffset] = useState(0);

  // Lock background scroll + neutralize footer pointer/taps while modal is open
  useEffect(() => {
    const bodyPrev = document.body.style.overflow;
    const footer = document.getElementById("site-footer");
    const footerPrevPointer = footer?.style.pointerEvents ?? "";

    document.body.style.overflow = "hidden";
    if (footer) footer.style.pointerEvents = "none";

    const updateOffset = () => {
      const h = footer?.offsetHeight ?? 0;
      setFooterOffset(h);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => {
      document.body.style.overflow = bodyPrev;
      if (footer) footer.style.pointerEvents = footerPrevPointer;
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  // Panel max-height avoids the footer. Use 100dvh for iOS dynamic viewport correctness.
  const panelStyle = useMemo<React.CSSProperties>(() => {
    return {
      maxHeight: `calc(100dvh - ${footerOffset}px - 16px)`, // 16px breathing room
      WebkitOverflowScrolling: "touch",
      willChange: "transform",
    };
  }, [footerOffset]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 px-3 sm:px-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // tap backdrop closes
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        className="
          w-full max-w-2xl rounded-2xl border border-cyan-400/30 bg-[#0a0a0a]
          shadow-[0_6px_30px_rgba(0,255,255,0.25)]
          overflow-hidden
          translate-y-2 opacity-0 animate-[modalIn_160ms_ease-out_forwards]
          sm:translate-y-0
        "
        style={panelStyle}
      >
        {/* Sticky header keeps the close button reachable */}
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-[1px] border-b border-cyan-400/15 px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="text-cyan-300 hover:text-white cursor-pointer"
          >
            ✖ Close
          </button>
        </div>

        {/* Scrollable content (inherits maxHeight from panel) */}
        <div className="overflow-y-auto overscroll-contain px-6 py-6" style={{ maxHeight: "inherit" }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4 text-center">
            {project.title}
          </h2>

          <div className="space-y-4 text-gray-200">
            <p>
              <span className="text-cyan-400 font-semibold">Tech Stack:</span> {project.tech_stack}
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">Status:</span> {project.status}
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">Duration:</span>{" "}
              {project.start_date} to {project.end_date || "Present"}
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">Description:</span> {project.description}
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

          {/* bottom spacer so last link never hides under mobile footer rubber-band */}
          <div className="h-6" />
        </div>
      </div>

      {/* tiny keyframes, no plugin needed */}
      <style jsx>{`
        @keyframes modalIn {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
