"use client";

import { useEffect, useState } from "react";
import { fetchProjects, deleteProject } from "@/lib/api/projectApi";
import { Project } from "@/types/project";
import { useAuth } from "@/context/AuthContext";
import AddProjectForm from "@/components/projectsPageComponents/AddProjectForm";
import EditProjectForm from "@/components/projectsPageComponents/EditProjectForm";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";
import ProjectModal from "@/components/projectsPageComponents/ProjectModal";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import MotionCard from "@/components/MotionCard";
import "@/styles/experienceCard.css";

export default function ProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
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

  function toParagraphs(text: string, maxLen = 160): string[] {
    const t = (text || "").trim();
    if (!t) return [];

    if (/\r?\n/.test(t)) {
      return t
        .split(/\n\s*\n|[\r\n]+/)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const sentences = t.split(/(?<=[.!?])\s+(?=[A-Z0-9])/);
    const paras: string[] = [];
    let buf = "";

    for (const s of sentences) {
      const candidate = buf ? `${buf} ${s}` : s;
      if (candidate.length > maxLen && buf) {
        paras.push(buf);
        buf = s;
      } else {
        buf = candidate;
      }
    }
    if (buf) paras.push(buf);
    return paras;
  }

  return (
    <AnimatedPageWrapper key="projects">
      <main className="min-h-screen text-white pt-[40px] pb-[80px] px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          {/* Page title + intro */}
          <section className="text-center space-y-4">
            <h1 className="text-2xl md:text-3xl text-cyan-300 mb-2">
              Projects
            </h1>
            <p className="text-sm md:text-[15px] text-cyan-100/90 max-w-2xl mx-auto leading-relaxed">
              Selected work that shows end-to-end delivery—from backend APIs and
              auth to responsive UI, animation, and deployment.
            </p>

            {token && (
              <button
                className="inline-flex items-center justify-center mt-3 px-5 py-2.5 rounded-full 
                  border border-cyan-400/90 bg-cyan-500/20 text-[13px] text-cyan-50 
                  shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:bg-cyan-500/30 
                  hover:shadow-[0_0_28px_rgba(34,211,238,1)] transition cursor-pointer"
                onClick={() => {
                  setAddMode(true);
                  setSelectedProject(null);
                }}
              >
                + Add Project
              </button>
            )}
          </section>

          {/* Loading / error */}
          {loading && (
            <p className="text-center text-sm text-cyan-200/80">
              Loading projects...
            </p>
          )}
          {error && (
            <p className="text-center text-sm text-red-400 mt-2">{error}</p>
          )}

          {/* Forms */}
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

          {/* Empty state */}
          {!addMode &&
            !selectedProject &&
            !loading &&
            projects.length === 0 && (
              <p className="text-center text-sm text-cyan-200/80">
                No projects available yet.
              </p>
            )}

          {/* Project cards (hero-shell style, single column) */}
          {!addMode && !selectedProject && projects.length > 0 && (
            <section className="space-y-6">
              {projects.map((project) => (
                <MotionCard key={project.id}>
                  <div
                    onClick={() => setModalProject(project)}
                    className="hero-shell px-6 py-6 cursor-pointer transition-all duration-300"
                  >
                    {/* Title */}
                    <h2 className="text-[17px] text-cyan-200 mb-2">
                      {project.title}
                    </h2>

                    {/* Basic info */}
                    <div className="space-y-1 text-sm text-cyan-100/90">
                      {project.tech_stack && (
                        <p>
                          <span className="text-cyan-300">Tech stack: </span>
                          {project.tech_stack}
                        </p>
                      )}

                      <p>
                        <span className="text-cyan-300">Duration: </span>
                        {project.start_date} —{" "}
                        {project.end_date ?? "Present"}
                      </p>
                    </div>

                    {/* Description preview */}
                    <div className="mt-3 text-sm text-cyan-100/90">
                      <span className="text-cyan-300">Description: </span>
                      {(() => {
                        const paras = toParagraphs(project.description, 160);
                        const preview = paras[0] ?? "";
                        const hasMore =
                          paras.length > 1 || preview.length > 160;

                        return (
                          <div className="mt-2 space-y-2">
                            <p className="text-cyan-100/90 break-words hyphens-auto">
                              {preview}
                              {hasMore && " …"}
                            </p>

                            {hasMore && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModalProject(project);
                                }}
                                className="inline-block text-cyan-300 hover:text-white underline underline-offset-4 cursor-pointer transition"
                                aria-label={`Read more about ${project.title}`}
                              >
                                Read more
                              </button>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Links (Live / GitHub) */}
                    <div
                      className="flex flex-wrap gap-4 mt-4 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.github_frontend_url && (
                        <a
                          href={project.github_frontend_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 underline underline-offset-4 hover:text-white transition"
                        >
                          Frontend
                        </a>
                      )}
                      {project.github_backend_url && (
                        <a
                          href={project.github_backend_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 underline underline-offset-4 hover:text-white transition"
                        >
                          Backend
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-300 underline underline-offset-4 hover:text-emerald-100 transition"
                        >
                          Live
                        </a>
                      )}
                    </div>

                    {/* Admin buttons */}
                    {token && (
                      <div
                        className="mt-5 flex gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setAddMode(false);
                          }}
                          className="
                            inline-flex items-center justify-center px-4 py-1.5 rounded-full
                            border border-cyan-400/90 bg-cyan-500/20 text-[12px] text-cyan-50
                            shadow-[0_0_14px_rgba(34,211,238,0.7)]
                            hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,1)]
                            transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setProjectToDelete(project)}
                          className="
                            inline-flex items-center justify-center px-4 py-1.5 rounded-full
                            border border-red-500/80 bg-red-600/10 text-[12px] text-red-300
                            shadow-[0_0_10px_rgba(248,113,113,0.7)]
                            hover:bg-red-500/30 hover:text-black
                            hover:shadow-[0_0_18px_rgba(248,113,113,1)]
                            transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </MotionCard>
              ))}
            </section>
          )}

          {/* Delete confirmation modal */}
          {projectToDelete && (
            <DeleteConfirmationModal
              message={`Are you sure you want to delete the project "${projectToDelete.title}"?`}
              onConfirm={confirmDelete}
              onCancel={() => setProjectToDelete(null)}
            />
          )}

          {/* Full project modal */}
          {modalProject && (
            <ProjectModal
              project={modalProject}
              onClose={() => setModalProject(null)}
            />
          )}
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
