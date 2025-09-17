"use client";

import { useEffect } from "react";
import { Experience } from "@/types/experience";

type Props = {
  experience: Experience;
  onClose: () => void;
};

export default function ExperienceModal({ experience, onClose }: Props) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-xl overflow-hidden border border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.4)]">
        {/* ✨ Clean border glow - NO animation inside */}
        <div className="absolute inset-0 rounded-xl border border-cyan-400/20 pointer-events-none z-0" />

        {/* Scrollable Content */}
        <div className="relative z-10 max-h-[90vh] overflow-y-auto p-6 pr-5 scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-transparent">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-cyan-300 text-xl font-bold cursor-pointer transition duration-300 z-20"
          >
            ✖
          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-3">
            {experience.job_title} at {experience.company_name}
          </h2>
          <p className="text-sm text-gray-400 mb-1">
            <strong>Location:</strong> {experience.location}
          </p>
          <p className="text-sm text-gray-500 italic mb-4">
            <strong>Duration:</strong> {experience.start_date} to{" "}
            {experience.still_working
              ? "Present"
              : experience.end_date || "N/A"}
          </p>
          <p className="text-gray-200 whitespace-pre-line text-sm md:text-base leading-relaxed">
            {experience.description}
          </p>
        </div>
      </div>
    </div>
  );
}
