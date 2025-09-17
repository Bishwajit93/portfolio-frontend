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
      <main className="min-h-screen text-white pt-[100px] pb-[60px] px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 text-center mb-6">
            Education
          </h1>

          {/* Intro */}
          <div className="text-base md:text-lg text-cyan-300 text-center font-normal max-w-2xl mx-auto mb-16 leading-loose space-y-6">
            <p className="text-base font-light text-gray-300 max-w-2xl mx-auto text-center leading-relaxed">
              B.Sc. degree in Mathematics (BRAC University) with strong analytical skills, now focused on full-stack development using Django, PostgreSQL, React, and Next.js.
            </p>

          </div>

          {/* Add Button */}
          {token && (
            <button
              className="mb-10 px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
              shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
              hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
              onClick={() => {
                setAddMode(true);
                setSelectedEducation(null);
              }}
            >
              + Add Education
            </button>
          )}

          {loading && <p className="text-gray-400">Loading education...</p>}

          {/* Forms */}
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

          {/* List */}
          {!addMode && !selectedEducation && !loading && educations.length === 0 && (
            <p>No education available.</p>
          )}

          {!addMode && !selectedEducation && educations.length > 0 && (
            <ul className="space-y-6">
              {educations.map((edu) => (
                <li key={edu.id}>
                  <MotionCard>
                    <div
                      onClick={() => setModalEducation(edu)}
                      className="relative flex flex-col justify-between h-full p-6 border border-cyan-400/30 
                        rounded-xl bg-black text-gray-100 shadow-[0_0_20px_rgba(0,255,255,0.3)] 
                        hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition duration-500 cursor-pointer group overflow-hidden"
                    >
                      <h2 className="text-lg font-semibold text-cyan-300 mb-2">
                        {edu.degree} — {edu.institution_name}
                      </h2>
                      <p className="text-sm text-gray-300">
                        <span className="text-cyan-400">Field:</span> {edu.field_of_study}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="text-cyan-400">Period:</span> {edu.start_date} to{" "}
                        {edu.end_date ?? "Present"}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="text-cyan-400">Grade:</span> {edu.grade}
                      </p>
                      <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                        <span className="text-cyan-400">Description:</span> {edu.description}
                      </p>

                      {/* Admin Controls */}
                      {token && (
                        <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              setSelectedEducation(edu);
                              setAddMode(false);
                            }}
                            className="px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
                              shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
                              hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setEducationToDelete(edu)}
                            className="px-4 py-1.5 text-sm font-semibold text-red-400 border border-red-500 rounded-md 
                              shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 
                              hover:text-black hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] cursor-pointer transition-all duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      <span className="absolute inset-0 rounded-xl pointer-events-none z-0 glow-border" />
                    </div>
                  </MotionCard>
                </li>
              ))}
            </ul>
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
