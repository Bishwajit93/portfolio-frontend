"use client";

import { useEffect } from "react";
import { Education } from "@/types/education";

type Props = {
  education: Education;
  onClose: () => void;
};

export default function EducationModal({ education, onClose }: Props) {
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
        {/* ✨ Border glow layer */}
        <div className="absolute inset-0 rounded-xl border border-cyan-400/20 pointer-events-none z-0" />

        {/* Scrollable content */}
        <div className="relative z-10 max-h-[90vh] overflow-y-auto p-6 pr-5 scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-transparent">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-cyan-300 text-xl font-bold cursor-pointer transition duration-300 z-20"
          >
            ✖
          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-3">
            {education.institution_name}
          </h2>

          <p className="text-sm text-gray-400 mb-1">
            <strong>Degree:</strong> {education.degree}
          </p>

          <p className="text-sm text-gray-400 mb-1">
            <strong>Field of Study:</strong> {education.field_of_study}
          </p>

          <p className="text-sm text-gray-400 mb-1">
            <strong>Grade:</strong> {education.grade}
          </p>

          <p className="text-sm text-gray-500 italic mb-4">
            <strong>Period:</strong> {education.start_date} to{" "}
            {education.end_date ?? "Present"}
          </p>

          <p className="text-gray-200 whitespace-pre-line text-sm md:text-base leading-relaxed">
            {education.description}
          </p>
        </div>
      </div>
    </div>
  );
}
