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
      setEducations(data);
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
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-cyan-400">
            Education
          </h1>

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
                      <h2 className="text-xl font-semibold text-cyan-300 mb-2">
                        {edu.degree} at {edu.institution_name}
                      </h2>
                      <p><strong>Field:</strong> {edu.field_of_study}</p>
                      <p><strong>Period:</strong> {edu.start_date} - {edu.end_date ?? "Present"}</p>
                      <p><strong>Grade:</strong> {edu.grade}</p>
                      <p className="mt-3">{edu.description}</p>

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
