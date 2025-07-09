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
        try{
            const data = await fetchExperiences()
            setExperiences(data);
        } catch(error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false)
        }
    } 
    loadExperiences()
  }, []);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Experience</h1>

      {loading && <p>Loading experiences...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {experiences.map((exp) => (
          <li key={exp.id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">
              {exp.job_title} at {exp.company_name}
            </h2>
            <p className="text-sm mb-1"><strong>Location:</strong> {exp.location}</p>
            <p className="text-sm mb-1">
              <strong>Duration:</strong> {exp.start_date} to {exp.end_date || (exp.still_working ? "Present" : "N/A")}
            </p>
            <p className="mt-3">{exp.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
