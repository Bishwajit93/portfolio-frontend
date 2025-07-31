"use client";

import { useEffect, useState } from "react";
import { fetchProjects, deleteProject } from "@/lib/api/projectApi";
import { Project } from "@/types/project";
import { useAuth } from "@/context/AuthContext";
import AddProjectForm from "@/components/projectsPageComponents/AddProjectForm";
import EditProjectForm from "@/components/projectsPageComponents/EditProjectForm";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";
import ProjectModal from "@/components/projectsPageComponents/ProjectModal.ts";
import "@/styles/experienceCard.css";

export default function ProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null); // ✅

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

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete.id);
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      setProjectToDelete(null);
    } catch (err) {
      console.error("Failed to delete project", err);
      alert("Could not delete project. Check console for details.");
    }
  };

  return (
    <main className="min-h-screen text-white pt-[100px] pb-[60px] px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-cyan-400">
          Projects
        </h1>

        {token && (
          <button
            className="mb-10 px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
            hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
            onClick={() => {
              setAddMode(true);
              setSelectedProject(null);
            }}
          >
            + Add Project
          </button>
        )}

        {loading && <p className="text-gray-400">Loading projects...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {addMode && token && (
          <AddProjectForm
            onProjectAdded={async () => {
              await loadProjects();
              setAddMode(false);
            }}
            onClose={() => setAddMode(false)}
          />
        )}

        {selectedProject && token && (
          <EditProjectForm
            project={selectedProject}
            onProjectUpdated={async () => {
              await loadProjects();
              setSelectedProject(null);
            }}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {!addMode && !selectedProject && !loading && projects.length === 0 && (
          <p>No projects available.</p>
        )}

        {!addMode && !selectedProject && projects.length > 0 && (
          <ul className="space-y-6">
            {projects.map((project) => (
                <li
                  key={project.id}
                  onClick={() => setModalProject(project)}
                  className="relative flex flex-col justify-between h-full p-6 border border-cyan-400/30 
                    rounded-xl bg-black text-gray-100 shadow-[0_0_20px_rgba(0,255,255,0.3)] 
                    hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition duration-500 cursor-pointer group overflow-hidden"
                >

                <h2 className="text-xl font-semibold text-cyan-300 mb-2">
                  {project.title}
                </h2>
                <p><strong>Tech Stack:</strong> {project.tech_stack}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Duration:</strong> {project.start_date} to {project.end_date ?? "Present"}</p>
                <p className="mt-3">{project.description}</p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  {project.github_frontend_url && (
                    <a href={project.github_frontend_url} target="_blank" rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300">Frontend</a>
                  )}
                  {project.github_backend_url && (
                    <a href={project.github_backend_url} target="_blank" rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300">Backend</a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                      className="text-green-400 underline hover:text-green-300">Live</a>
                  )}
                </div>

                {token && (
                  <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setAddMode(false);
                      }}
                      className="px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
                        shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
                        hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setProjectToDelete(project)}
                      className="px-4 py-1.5 text-sm font-semibold text-red-400 border border-red-500 rounded-md 
                        shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 
                        hover:text-black hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] cursor-pointer transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <span className="absolute inset-0 rounded-xl pointer-events-none z-0 glow-border" />
              </li>
            ))}
          </ul>
        )}

        {projectToDelete && (
          <DeleteConfirmationModal
            message={`Are you sure you want to delete the project "${projectToDelete.title}"?`}
            onConfirm={confirmDelete}
            onCancel={() => setProjectToDelete(null)}
          />
        )}

        {modalProject && (
          <ProjectModal
            project={modalProject}
            onClose={() => setModalProject(null)}
          />
        )}
      </div>
    </main>
  );
}
