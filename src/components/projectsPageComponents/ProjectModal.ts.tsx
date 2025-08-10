// src/components/projectsPageComponents/ProjectModal.tsx
"use client";

import { useEffect } from "react";
import { Project } from "@/types/project";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // click backdrop closes
    >
      <div
        // stop clicks inside from closing
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-[#0a0a0a] border border-cyan-400/40 text-white 
                   shadow-[0_0_40px_rgba(0,255,255,0.4)] rounded-xl 
                   overflow-y-auto overscroll-contain 
                   max-h-[90dvh] p-0" // move padding inside so header can be sticky
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Sticky header so Close stays visible */}
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur border-b border-cyan-400/20 px-6 py-3">
          <button
            onClick={onClose}
            className="ml-auto block text-gray-300 hover:text-cyan-300 text-lg font-bold cursor-pointer transition"
          >
            ✖ Close
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <h2 className="text-3xl font-bold text-cyan-300 mb-4 text-center">
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
                  className="text-cyan-300 hover:text-white underline"
                  rel="noreferrer"
                >
                  Frontend Code
                </a>
              )}
              {project.github_backend_url && (
                <a
                  href={project.github_backend_url}
                  target="_blank"
                  className="text-cyan-300 hover:text-white underline"
                  rel="noreferrer"
                >
                  Backend Code
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  className="text-green-400 hover:text-white underline"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
