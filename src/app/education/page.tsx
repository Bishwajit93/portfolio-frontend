"use client";

import { useEffect, useState } from "react";
import { fetchEducations, deleteEducation } from "@/lib/api/educationApi";
import { Education } from "@/types/education";
import { useAuth } from "@/context/AuthContext";
import AddEducationForm from "@/components/educationPageComponents/AddEducationForm";
import EditEducationForm from "@/components/educationPageComponents/EditEducationForm";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";
import EducationModal from "@/components/educationPageComponents/EducationModal";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import MotionCard from "@/components/MotionCard";
import "@/styles/experienceCard.css";

export default function EducationPage() {
  const { token } = useAuth();
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [modalEducation, setModalEducation] = useState<Education | null>(null);
  const [educationToDelete, setEducationToDelete] = useState<Education | null>(null);
  const [addMode, setAddMode] = useState(false);

  const loadEducations = async () => {
    setLoading(true);
    try {
      const data = await fetchEducations();

      // Sort newest first by end_date (or ongoing)
      const sorted = data.sort((a, b) => {
        const endA = a.end_date ? new Date(a.end_date).getTime() : Infinity;
        const endB = b.end_date ? new Date(b.end_date).getTime() : Infinity;
        return endB - endA;
      });

      setEducations(sorted);
    } catch (err) {
      console.error("Failed to load educations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleDeleteConfirmed = async () => {
    if (!educationToDelete) return;
    try {
      await deleteEducation(educationToDelete.id);
      setEducations((prev) => prev.filter((e) => e.id !== educationToDelete.id));
      setEducationToDelete(null);
    } catch (err) {
      console.error("Delete education failed:", err);
      alert("Could not delete education. See console for details.");
    }
  };

  return (
    <AnimatedPageWrapper key="education">
      <main className="min-h-screen text-white pt-[40px] pb-[80px] px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          {/* Page Title + intro */}
          <section className="text-center space-y-4">
            <h1 className="text-2xl md:text-3xl text-cyan-300 mb-2">
              Education
            </h1>
            <p className="text-sm md:text-[15px] text-cyan-100/90 max-w-2xl mx-auto leading-relaxed">
              B.Sc. in Mathematics from BRAC University with a strong analytical
              background. I now apply this mindset to full-stack development
              with Django, PostgreSQL, React, and Next.js.
            </p>

            {token && (
              <button
                className="inline-flex items-center justify-center mt-3 px-5 py-2.5 rounded-full 
                  border border-cyan-400/90 bg-cyan-500/20 text-[13px] text-cyan-50 
                  shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:bg-cyan-500/30 
                  hover:shadow-[0_0_28px_rgba(34,211,238,1)] transition cursor-pointer"
                onClick={() => {
                  setAddMode(true);
                  setSelectedEducation(null);
                }}
              >
                + Add Education
              </button>
            )}
          </section>

          {/* Loading indicator */}
          {loading && (
            <p className="text-center text-sm text-cyan-200/80">
              Loading education...
            </p>
          )}

          {/* Add / Edit forms */}
          {addMode && token && (
            <AddEducationForm
              onEducationAdded={async () => {
                await loadEducations();
                setAddMode(false);
              }}
              onClose={() => setAddMode(false)}
            />
          )}

          {selectedEducation && token && (
            <EditEducationForm
              education={selectedEducation}
              onEducationUpdated={async () => {
                await loadEducations();
                setSelectedEducation(null);
              }}
              onClose={() => setSelectedEducation(null)}
            />
          )}

          {/* Empty state */}
          {!addMode && !selectedEducation && !loading && educations.length === 0 && (
            <p className="text-center text-sm text-cyan-200/80">
              No education entries available yet.
            </p>
          )}

          {/* Education cards (hero-shell style, one per row) */}
          {!addMode && !selectedEducation && educations.length > 0 && (
            <section className="space-y-6">
              {educations.map((edu) => (
                <MotionCard key={edu.id}>
                  <div
                    onClick={() => setModalEducation(edu)}
                    className="hero-shell px-6 py-6 cursor-pointer transition-all duration-300"
                  >
                    {/* Title */}
                    <h2 className="text-[17px] text-cyan-200 mb-2">
                      {edu.degree} — {edu.institution_name}
                    </h2>

                    {/* Details */}
                    <div className="space-y-1 text-sm text-cyan-100/90">
                      <p>
                        <span className="text-cyan-300">Field: </span>
                        {edu.field_of_study}
                      </p>

                      <p>
                        <span className="text-cyan-300">Period: </span>
                        {edu.start_date} — {edu.end_date ?? "Present"}
                      </p>

                      {edu.grade && (
                        <p>
                          <span className="text-cyan-300">Grade: </span>
                          {edu.grade}
                        </p>
                      )}

                      {edu.description && (
                        <p className="mt-2 text-cyan-100/80 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>

                    {/* Admin Buttons */}
                    {token && (
                      <div
                        className="mt-5 flex gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setSelectedEducation(edu);
                            setAddMode(false);
                          }}
                          className="
                            inline-flex items-center justify-center px-4 py-1.5 rounded-full
                            border border-cyan-400/90 bg-cyan-500/20 text-[12px] text-cyan-50
                            shadow-[0_0_14px_rgba(34,211,238,0.7)]
                            hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,1)]
                            transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setEducationToDelete(edu)}
                          className="
                            inline-flex items-center justify-center px-4 py-1.5 rounded-full
                            border border-red-500/80 bg-red-600/10 text-[12px] text-red-300
                            shadow-[0_0_10px_rgba(248,113,113,0.7)]
                            hover:bg-red-500/30 hover:text-black
                            hover:shadow-[0_0_18px_rgba(248,113,113,1)]
                            transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </MotionCard>
              ))}
            </section>
          )}

          {/* Modals */}
          {modalEducation && (
            <EducationModal
              education={modalEducation}
              onClose={() => setModalEducation(null)}
            />
          )}

          {educationToDelete && (
            <DeleteConfirmationModal
              message={`Are you sure you want to delete "${educationToDelete.degree}" at "${educationToDelete.institution_name}"?`}
              onConfirm={handleDeleteConfirmed}
              onCancel={() => setEducationToDelete(null)}
            />
          )}
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
