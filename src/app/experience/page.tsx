"use client";

import { useEffect, useState } from "react";
import { fetchExperiences, deleteExperience } from "@/lib/api/experienceApi";
import { Experience } from "@/types/experience";
import { useAuth } from "@/context/AuthContext";
import AddExperienceForm from "@/components/experiencePageComponents/AddExperienceForm";
import EditExperienceForm from "@/components/experiencePageComponents/EditExperienceForm";
import ExperienceModal from "@/components/experiencePageComponents/ExperienceModal";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import MotionCard from "@/components/MotionCard";
import "@/styles/experienceCard.css";

export default function ExperiencePage() {
  const { token } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [modalExperience, setModalExperience] =
    useState<Experience | null>(null);
  const [experienceToDelete, setExperienceToDelete] =
    useState<Experience | null>(null);
  const [addMode, setAddMode] = useState(false);

  const loadExperiences = async () => {
    setLoading(true);
    try {
      const data = await fetchExperiences();

      const sorted = data.sort((a, b) => {
        if (a.still_working && !b.still_working) return -1;
        if (!a.still_working && b.still_working) return 1;

        const endA = a.end_date ? new Date(a.end_date).getTime() : 0;
        const endB = b.end_date ? new Date(b.end_date).getTime() : 0;
        return endB - endA;
      });

      setExperiences(sorted);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const confirmDelete = async () => {
    if (!experienceToDelete) return;
    try {
      await deleteExperience(experienceToDelete.id);
      setExperiences((prev) =>
        prev.filter((e) => e.id !== experienceToDelete.id)
      );
      setExperienceToDelete(null);
    } catch (err) {
      console.error("Delete experience failed:", err);
      alert("Could not delete experience. See console for details.");
    }
  };

  return (
    <AnimatedPageWrapper key="experience">
      <main className="min-h-screen text-white pt-[40px] pb-[80px] px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          {/* Page Title */}
          <section className="text-center space-y-4">
            <h1 className="text-2xl md:text-3xl text-cyan-300 mb-2">
              Experience
            </h1>
            <p className="text-sm md:text-[15px] text-cyan-100/90 max-w-2xl mx-auto leading-relaxed">
              Strong reliability, teamwork and discipline from past roles —
              qualities I now apply to full-stack software development.
            </p>

            {token && (
              <button
                className="inline-flex items-center justify-center mt-3 px-5 py-2.5 rounded-full 
                border border-cyan-400/90 bg-cyan-500/20 text-[13px] text-cyan-50 
                shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:bg-cyan-500/30 
                hover:shadow-[0_0_28px_rgba(34,211,238,1)] transition cursor-pointer"
                onClick={() => {
                  setAddMode(true);
                  setSelectedExperience(null);
                }}
              >
                + Add Experience
              </button>
            )}
          </section>

          {/* Loading */}
          {loading && (
            <p className="text-center text-sm text-cyan-200/80">
              Loading experience…
            </p>
          )}

          {/* Forms */}
          {addMode && token && (
            <AddExperienceForm
              onExperienceAdded={async () => {
                await loadExperiences();
                setAddMode(false);
              }}
              onClose={() => setAddMode(false)}
            />
          )}

          {selectedExperience && token && (
            <EditExperienceForm
              experience={selectedExperience}
              onExperienceUpdated={async () => {
                await loadExperiences();
                setSelectedExperience(null);
              }}
              onClose={() => setSelectedExperience(null)}
            />
          )}

          {/* Empty */}
          {!addMode &&
            !selectedExperience &&
            !loading &&
            experiences.length === 0 && (
              <p className="text-center text-sm text-cyan-200/80">
                No experience entries yet.
              </p>
            )}

          {/* Experience Cards */}
          {!addMode && !selectedExperience && experiences.length > 0 && (
            <section className="space-y-6">
              {experiences.map((exp) => (
                <MotionCard key={exp.id}>
                  <div
                    onClick={() => setModalExperience(exp)}
                    className="hero-shell px-6 py-6 cursor-pointer transition-all duration-300"
                  >
                    {/* Job Title */}
                    <h2 className="text-[17px] text-cyan-200 mb-2">
                      {exp.job_title} — {exp.company_name}
                    </h2>

                    {/* Job Details */}
                    <div className="space-y-1 text-sm text-cyan-100/90">
                      {exp.location && (
                        <p>
                          <span className="text-cyan-300">Location: </span>
                          {exp.location}
                        </p>
                      )}

                      <p>
                        <span className="text-cyan-300">Duration: </span>
                        {exp.start_date} —{" "}
                        {exp.still_working ? "Present" : exp.end_date ?? "N/A"}
                      </p>

                      {exp.description && (
                        <p className="mt-2 text-cyan-100/80 leading-relaxed line-clamp-3">
                          {exp.description}
                        </p>
                      )}
                    </div>

                    {/* Admin Controls */}
                    {token && (
                      <div
                        className="mt-5 flex gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setSelectedExperience(exp);
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
                          onClick={() => setExperienceToDelete(exp)}
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
          {modalExperience && (
            <ExperienceModal
              experience={modalExperience}
              onClose={() => setModalExperience(null)}
            />
          )}

          {experienceToDelete && (
            <DeleteConfirmationModal
              message={`Are you sure you want to delete "${experienceToDelete.job_title}" at "${experienceToDelete.company_name}"?`}
              onConfirm={confirmDelete}
              onCancel={() => setExperienceToDelete(null)}
            />
          )}
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
