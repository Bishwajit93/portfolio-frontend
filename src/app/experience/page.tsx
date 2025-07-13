"use client";

import { useEffect, useState } from "react";
import { fetchExperiences } from "@/lib/api/experienceApi";
import { Experience } from "@/types/experience";
import AddExperienceForm from "@/components/experiencePageComponents/AddExperienceForm";
import EditExperienceForm from "@/components/experiencePageComponents/EditExperienceForm";

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
    const [addMode, setAddMode] = useState(false);

    const loadExperiences = async () => {
        try {
            const data = await fetchExperiences();
            setExperiences(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExperiences();
    }, []);

    return (
        <main className="experience-page-container p-6">
            <h1 className="experience-page-heading text-3xl font-bold mb-6">Experience</h1>

            <button
                className="mb-6 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow"
                onClick={() => {
                    setAddMode(true);
                    setSelectedExperience(null);
                }}
            >
                + Add Experience
            </button>

            {loading && <p>Loading experiences...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {addMode && (
                <AddExperienceForm
                    onExperienceAdded={async () => {
                        await loadExperiences();
                        setAddMode(false);
                    }}
                    onClose={() => setAddMode(false)}
                />
            )}

            {selectedExperience && (
                <EditExperienceForm
                    experience={selectedExperience}
                    onExperienceUpdated={async () => {
                        await loadExperiences();
                        setSelectedExperience(null);
                    }}
                    onClose={() => setSelectedExperience(null)}
                />
            )}

            {!addMode && !selectedExperience && (
                <ul className="space-y-6">
                    {experiences.map((exp) => (
                        <li key={exp.id} className="p-6 border rounded shadow bg-gray-800 text-gray-100">
                            <h2 className="text-xl font-semibold mb-2">
                                {exp.job_title} at {exp.company_name}
                            </h2>
                            <p><strong>Location:</strong> {exp.location}</p>
                            <p><strong>Duration:</strong> {exp.start_date} to {exp.end_date || (exp.still_working ? "Present" : "N/A")}</p>
                            <p className="mt-3">{exp.description}</p>
                            <button
                                className="mt-4 border border-cyan-400 text-cyan-300 px-4 py-2 rounded hover:bg-cyan-200/10 transition"
                                onClick={() => {
                                    setSelectedExperience(exp);
                                    setAddMode(false);
                                }}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );

}
