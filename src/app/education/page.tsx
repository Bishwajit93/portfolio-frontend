"use client"

import { useEffect, useState } from "react";
import { fetchEducations } from "@/lib/api/educationApi";
import { Education } from "@/types/education";

export default function EducationPage() {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEducations = async () => {
            try {
                const data = await fetchEducations();
                setEducations(data);
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

        loadEducations();
    }, []);

    return (
        <main className="education-page-container p-6">
            <h1 className="education-page-heading text-3xl font-bold mb-6">Education</h1>

            {loading && <p className="education-loading">Loading education records...</p>}
            {error && <p className="education-error text-red-500">{error}</p>}

            <ul className="education-list space-y-6">
                {educations.map((edu) => (
                    <li key={edu.id} className="education-card mb-4 p-6 border rounded-lg shadow">
                        <h2 className="education-title text-xl font-semibold mb-2">
                            {edu.degree} in {edu.field_of_study} at {edu.institution_name}
                        </h2>
                        <p className="education-grade text-sm mb-1">
                            <strong>Grade:</strong> {edu.grade || "N/A"}
                        </p>
                        <p className="education-duration text-sm mb-1">
                            <strong>Duration:</strong> {edu.start_date} to {edu.end_date || "Present"}
                        </p>
                        <p className="education-description mt-3">{edu.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
