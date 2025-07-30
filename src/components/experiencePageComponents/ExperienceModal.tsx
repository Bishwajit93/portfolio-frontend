"use client";

import { Experience } from "@/types/experience";

type Props = {
  experience: Experience;
  onClose: () => void;
};

export default function ExperienceModal({ experience, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4">
      <div className="bg-[#0a0a0a] border border-cyan-500/30 text-white rounded-xl max-w-2xl w-full p-6 relative">
        <button
        className="absolute top-2 right-4 text-gray-400 hover:text-cyan-400 text-xl cursor-pointer"
        onClick={onClose}
        >
        ✕
        </button>
        <h2 className="text-2xl font-bold text-cyan-300 mb-2">
          {experience.job_title} at {experience.company_name}
        </h2>
        <p className="text-sm text-gray-400 mb-1">
          <strong>Location:</strong> {experience.location}
        </p>
        <p className="text-sm text-gray-500 mb-4 italic">
          <strong>Duration:</strong> {experience.start_date} to{" "}
          {experience.end_date ?? (experience.still_working ? "Present" : "N/A")}
        </p>
        <p className="text-gray-200 whitespace-pre-line">{experience.description}</p>
      </div>
    </div>
  );
}
