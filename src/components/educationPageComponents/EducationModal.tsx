"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Education } from "@/types/education";

type Props = {
  education: Education;
  onClose: () => void;
};

export default function EducationModal({ education, onClose }: Props) {
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
        className="
          w-[92vw] max-w-md sm:max-w-2xl
          h-[78dvh] sm:h-[80vh]
          hero-shell
          rounded-2xl overflow-hidden
          flex flex-col
        "
      >
        {/* Sticky header */}
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

        {/* Scrollable content */}
        <div
          className="grow overflow-y-auto overscroll-contain px-6 py-6"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-200 mb-4 text-center">
            {education.degree}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-cyan-100/90">
            <p>
              <span className="text-cyan-300 font-semibold">
                Institution:
              </span>{" "}
              {education.institution_name}
            </p>

            <p>
              <span className="text-cyan-300 font-semibold">
                Field of Study:
              </span>{" "}
              {education.field_of_study}
            </p>

            {education.grade && (
              <p>
                <span className="text-cyan-300 font-semibold">Grade:</span>{" "}
                {education.grade}
              </p>
            )}

            <p className="text-cyan-100/80 italic">
              <span className="text-cyan-300 font-semibold">Period:</span>{" "}
              {education.start_date} to{" "}
              {education.end_date ?? "Present"}
            </p>

            {education.description && (
              <div>
                <span className="text-cyan-300 font-semibold">
                  Description:
                </span>
                <p className="mt-2 text-cyan-100/90 whitespace-pre-line leading-relaxed break-words hyphens-auto">
                  {education.description}
                </p>
              </div>
            )}
          </div>

          <div className="h-6" />
        </div>
      </motion.div>
    </div>
  );
}
