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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main>
            <h1 className="text-3xl font-bold mb-4">Education</h1>

            {loading && <p>Loading education records...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <ul>
                {educations.map((edu) => (
                <li key={edu.id} className="mb-4 p-4 border rounded shadow">
                    <h2 className="text-xl font-semibold">
                    {edu.degree} in {edu.field_of_study} at {edu.institution_name}
                    </h2>
                    <p className="text-sm mb-1">
                    <strong>Grade:</strong> {edu.grade || "N/A"}
                    </p>
                    <p className="text-sm mb-1">
                    <strong>Duration:</strong> {edu.start_date} to {edu.end_date || "Present"}
                    </p>
                    <p className="mt-3">{edu.description}</p>
                </li>
                ))}
            </ul>
        </main>
    );
}