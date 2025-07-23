// src/app/experience/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchExperiences, deleteExperience } from "@/lib/api/experienceApi";
import { Experience } from "@/types/experience";
import { useAuth } from "@/context/AuthContext";
import AddExperienceForm from "@/components/experiencePageComponents/AddExperienceForm";
import EditExperienceForm from "@/components/experiencePageComponents/EditExperienceForm";

export default function ExperiencePage() {
  const { token } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      await deleteExperience(id); // requires token
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete experience", err);
      alert("Could not delete experience. See console for details.");
    }
  };

  return (
    <main className="experience-page-container p-6">
      <h1 className="experience-page-heading text-3xl font-bold mb-6">Experience</h1>

      {/* Add button visible only when logged in */}
      {token && (
        <button
          className="mb-6 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            setAddMode(true);
            setSelectedExperience(null);
          }}
        >
          + Add Experience
        </button>
      )}

      {loading && <p>Loading experiences...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add form */}
      {addMode && token && (
        <AddExperienceForm
          onExperienceAdded={async () => {
            await loadExperiences();
            setAddMode(false);
          }}
          onClose={() => setAddMode(false)}
        />
      )}

      {/* Edit form */}
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

      {/* No experience message */}
      {!addMode &&
        !selectedExperience &&
        !loading &&
        experiences.length === 0 && <p>No experience available.</p>}

      {/* Experience list */}
      {!addMode &&
        !selectedExperience &&
        experiences.length > 0 && (
          <ul className="space-y-6">
            {experiences.map((exp) => (
              <li
                key={exp.id}
                className="p-6 border rounded shadow bg-gray-800 text-gray-100"
              >
                <h2 className="text-xl font-semibold mb-2">
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

                {/* Edit/Delete visible only when logged in */}
                {token && (
                  <div className="mt-4 flex gap-2">
                    <button
                      className="px-4 py-2 border border-cyan-400 text-cyan-300 rounded hover:bg-cyan-200/10"
                      onClick={() => {
                        setSelectedExperience(exp);
                        setAddMode(false);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 border border-red-400 text-red-300 rounded hover:bg-red-400/20"
                      onClick={() => handleDelete(exp.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
    </main>
  );
}
