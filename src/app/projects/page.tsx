"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/api/projectApi";
import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-sm mb-1"><strong>Tech Stack:</strong> {project.tech_stack}</p>
            <p className="text-sm mb-1"><strong>Status:</strong> {project.status}</p>
            <p className="text-sm mb-1">
              <strong>Duration:</strong> {project.start_date} to {project.end_date || "Present"}
            </p>
            <div className="flex gap-4 mt-2 flex-wrap">
              {project.github_frontend_url && (
                <a href={project.github_frontend_url} target="_blank" className="text-blue-500 underline">
                  Frontend Repo
                </a>
              )}
              {project.github_backend_url && (
                <a href={project.github_backend_url} target="_blank" className="text-blue-500 underline">
                  Backend Repo
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" className="text-green-600 underline">
                  Live Site
                </a>
              )}
            </div>
            <p className="mt-3">{project.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
