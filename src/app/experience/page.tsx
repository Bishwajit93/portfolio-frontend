"use client";

import { useEffect, useState } from "react";
import { fetchExperiences } from "@/lib/api/experienceApi";
import { Experience } from "@/types/experience";

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
        loadExperiences();
    }, []);

    return (
        <main className="experience-page-container p-6">
            <h1 className="experience-page-heading text-3xl font-bold mb-6">Experience</h1>

            {loading && <p className="experience-loading">Loading experiences...</p>}
            {error && <p className="experience-error text-red-500">{error}</p>}

            <ul className="experience-list space-y-6">
                {experiences.map((exp) => (
                    <li key={exp.id} className="experience-card mb-4 p-6 border rounded-lg shadow">
                        <h2 className="experience-title text-xl font-semibold mb-2">
                            {exp.job_title} at {exp.company_name}
                        </h2>
                        <p className="experience-location text-sm mb-1">
                            <strong>Location:</strong> {exp.location}
                        </p>
                        <p className="experience-duration text-sm mb-1">
                            <strong>Duration:</strong> {exp.start_date} to {exp.end_date || (exp.still_working ? "Present" : "N/A")}
                        </p>
                        <p className="experience-description mt-3">
                            {exp.description}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
