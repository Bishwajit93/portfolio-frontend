// src/app/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchProjects, deleteProject } from "@/lib/api/projectApi";
import { Project } from "@/types/project";
import { useAuth } from "@/context/AuthContext";
import AddProjectForm from "@/components/projectsPageComponents/AddProjectForm";
import EditProjectForm from "@/components/projectsPageComponents/EditProjectForm";

export default function ProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [addMode, setAddMode] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete project", err);
      alert("Could not delete project. Check console for details.");
    }
  };

  return (
    <main className="projects-page-container p-6">
      <h1 className="projects-page-heading text-3xl font-bold mb-6">Projects</h1>

      {/* + Add button only for you */}
      {token && (
        <button
          className="mb-6 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            setAddMode(true);
            setSelectedProject(null);
          }}
        >
          + Add New Project
        </button>
      )}

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add form modal */}
      {addMode && token && (
        <AddProjectForm
          onProjectAdded={async () => {
            await loadProjects();
            setAddMode(false);
          }}
          onClose={() => setAddMode(false)}
        />
      )}

      {/* Edit form modal */}
      {selectedProject && token && (
        <EditProjectForm
          project={selectedProject}
          onProjectUpdated={async (updated) => {
            setProjects((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
            setSelectedProject(null);
          }}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Project list */}
      {!addMode && !selectedProject && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <li
                key={project.id}
                className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p>
                  <strong>Tech:</strong> {project.tech_stack}
                </p>
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {project.start_date} to {project.end_date || "Present"}
                </p>
                <p className="mt-2">{project.description}</p>

                <div className="flex gap-3 mt-4 flex-wrap">
                  {project.github_frontend_url && (
                    <a
                      href={project.github_frontend_url}
                      target="_blank"
                      className="text-blue-400 underline"
                    >
                      Frontend
                    </a>
                  )}
                  {project.github_backend_url && (
                    <a
                      href={project.github_backend_url}
                      target="_blank"
                      className="text-blue-400 underline"
                    >
                      Backend
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      className="text-green-400 underline"
                    >
                      Live
                    </a>
                  )}
                </div>

                {/* Edit/Delete only for you */}
                {token && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setAddMode(false);
                      }}
                      className="border border-cyan-400 text-cyan-300 px-3 py-1 rounded hover:bg-cyan-200/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="border border-red-400 text-red-300 px-3 py-1 rounded hover:bg-red-400/20"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li>No projects available.</li>
          )}
        </ul>
      )}
    </main>
  );
}
