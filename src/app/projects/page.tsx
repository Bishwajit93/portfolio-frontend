"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/api/projectApi";
import { Project } from "@/types/project";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
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
        loadProjects();
    }, []);

    return (
        <main className="projects-page-container p-6">
            <h1 className="projects-page-heading text-3xl font-bold mb-6">Projects</h1>

            {loading && <p className="projects-loading">Loading projects...</p>}
            {error && <p className="projects-error text-red-500">{error}</p>}

            <ul className="projects-list space-y-6">
                {projects.map((project) => (
                    <li key={project.id} className="project-card mb-4 p-6 border rounded-lg shadow">
                        <h2 className="project-title text-xl font-semibold mb-2">{project.title}</h2>
                        <p className="project-tech text-sm mb-1">
                            <strong>Tech Stack:</strong> {project.tech_stack}
                        </p>
                        <p className="project-status text-sm mb-1">
                            <strong>Status:</strong> {project.status}
                        </p>
                        <p className="project-duration text-sm mb-1">
                            <strong>Duration:</strong> {project.start_date} to {project.end_date || "Present"}
                        </p>

                        <div className="project-links flex gap-4 mt-3 flex-wrap">
                            {project.github_frontend_url && (
                                <a href={project.github_frontend_url} target="_blank" className="project-link-frontend text-blue-500 underline">
                                    Frontend Repo
                                </a>
                            )}
                            {project.github_backend_url && (
                                <a href={project.github_backend_url} target="_blank" className="project-link-backend text-blue-500 underline">
                                    Backend Repo
                                </a>
                            )}
                            {project.live_url && (
                                <a href={project.live_url} target="_blank" className="project-link-live text-green-600 underline">
                                    Live Site
                                </a>
                            )}
                        </div>

                        <p className="project-description mt-4">{project.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
