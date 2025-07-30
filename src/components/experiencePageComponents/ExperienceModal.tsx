"use client";

import { Experience } from "@/types/experience";

type Props = {
  experience: Experience;
  onClose: () => void;
};

export default function ExperienceModal({ experience, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="relative w-full max-w-2xl p-6 bg-black border border-cyan-400/30 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.4)] overflow-hidden">
        {/* Glowing Border Overlay */}
        <span className="absolute inset-0 rounded-xl pointer-events-none glow-border z-0" />

        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-cyan-300 text-xl font-bold z-10 cursor-pointer transition duration-300"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-3">
            {experience.job_title} at {experience.company_name}
          </h2>
          <p className="text-sm text-gray-400 mb-1">
            <strong>Location:</strong> {experience.location}
          </p>
          <p className="text-sm text-gray-500 italic mb-4">
            <strong>Duration:</strong> {experience.start_date} to{" "}
            {experience.end_date ?? (experience.still_working ? "Present" : "N/A")}
          </p>
          <p className="text-gray-200 whitespace-pre-line text-sm md:text-base leading-relaxed">
            {experience.description}
          </p>
        </div>
      </div>
    </div>
  );
}
