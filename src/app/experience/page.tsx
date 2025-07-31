"use client";

import { useEffect, useState } from "react";
import { fetchExperiences, deleteExperience } from "@/lib/api/experienceApi";
import { Experience } from "@/types/experience";
import { useAuth } from "@/context/AuthContext";
import AddExperienceForm from "@/components/experiencePageComponents/AddExperienceForm";
import EditExperienceForm from "@/components/experiencePageComponents/EditExperienceForm";
import ExperienceModal from "@/components/experiencePageComponents/ExperienceModal";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";
import { motion } from "framer-motion";
import "@/styles/experienceCard.css";

export default function ExperiencePage() {
  const { token } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalExperience, setModalExperience] = useState<Experience | null>(null);
  const [experienceToDelete, setExperienceToDelete] = useState<Experience | null>(null);
  const [addMode, setAddMode] = useState(false);

  const loadExperiences = async () => {
    setLoading(true);
    try {
      const data = await fetchExperiences();
      setExperiences(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleDeleteConfirmed = async () => {
    if (!experienceToDelete) return;
    try {
      await deleteExperience(experienceToDelete.id);
      setExperiences(prev => prev.filter(e => e.id !== experienceToDelete.id));
      setExperienceToDelete(null);
    } catch (err) {
      console.error("Delete experience failed:", err);
      alert("Could not delete experience. See console for details.");
    }
  };

  return (
    <main className="min-h-screen text-white pt-[100px] pb-[60px] px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-cyan-400">
          Experience
        </h1>

        {token && (
          <button
            className="mb-10 px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
            hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
            onClick={() => {
              setAddMode(true);
              setSelectedExperience(null);
            }}
          >
            + Add Experience
          </button>
        )}

        {loading && <p className="text-gray-400">Loading experiences...</p>}
        {error && <p className="text-red-500">{error}</p>}

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

        {!addMode &&
          !selectedExperience &&
          !loading &&
          experiences.length === 0 && <p>No experience available.</p>}

        {!addMode &&
          !selectedExperience &&
          experiences.length > 0 && (
            <ul className="space-y-6">
              {experiences.map((exp, i) => (
                <li
                    key={exp.id}
                    onClick={() => setModalExperience(exp)}
                    className="relative flex flex-col justify-between h-full p-6 border border-cyan-400/30 
                      rounded-xl bg-black text-gray-100 shadow-[0_0_20px_rgba(0,255,255,0.3)] 
                      hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition duration-500 cursor-pointer group overflow-hidden"
                    >

                  <h2 className="text-xl font-semibold text-cyan-300 mb-2">
                    {exp.job_title} at {exp.company_name}
                  </h2>
                  <p>
                    <strong>Location:</strong> {exp.location}
                  </p>
                  <p>
                    <strong>Duration:</strong> {exp.start_date} to{" "}
                    {exp.end_date ?? (exp.still_working ? "Present" : "N/A")}
                  </p>
                  <p className="mt-3">{exp.description}</p>

                  {token && (
                    <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setSelectedExperience(exp);
                          setAddMode(false);
                        }}
                        className="px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
                          shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
                          hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setExperienceToDelete(exp)}
                        className="px-4 py-1.5 text-sm font-semibold text-red-400 border border-red-500 rounded-md 
                          shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 
                          hover:text-black hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] cursor-pointer transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  <span className="absolute inset-0 rounded-xl pointer-events-none z-0 glow-border" />
                </li>
              ))}
            </ul>
          )}

        {modalExperience && (
          <ExperienceModal
            experience={modalExperience}
            onClose={() => setModalExperience(null)}
          />
        )}

        {experienceToDelete && (
          <DeleteConfirmationModal
            message={`Are you sure you want to delete "${experienceToDelete.job_title}" at "${experienceToDelete.company_name}"?`}
            onConfirm={handleDeleteConfirmed}
            onCancel={() => setExperienceToDelete(null)}
          />
        )}
      </div>
    </main>
  );
}
