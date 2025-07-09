"use client";

import { useEffect, useState } from "react";
import { fetchSkills } from "@/lib/api/skillApi";
import { Skill } from "@/types/skill";

export default function Home() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSkills = async () => {
            try {
                const data = await fetchSkills();
                setSkills(data);
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
        loadSkills();
    }, []);

    return (
        <main className="home-page-container p-6">
            <h1 className="home-page-heading text-4xl font-bold mb-4">
                Welcome to my Portfolio
            </h1>
            <p className="home-page-intro text-lg mb-6">
                I am Abdullah, a passionate developer focused on Python, Django, PostgreSQL and Next.js.
            </p>

            <section className="skills-section">
                <h2 className="skills-heading text-2xl font-bold mb-2">Skills</h2>

                {loading && <p className="skills-loading">Loading skills...</p>}
                {error && <p className="skills-error text-red-500">{error}</p>}

                <ul className="skills-list flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <li key={skill.id} className="skill-item px-3 py-1 bg-gray-700 text-white rounded-full">
                            {skill.name}{skill.level ? ` (${skill.level})` : ""}
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
