"use client";

import { useEffect, useState } from "react";
import { fetchProjects, deleteProject } from "@/lib/api/projectApi";
import type { Project } from "@/types/project";
import { useAuth } from "@/context/AuthContext";
import AddProjectForm from "@/components/projectsPageComponents/AddProjectForm";
import EditProjectForm from "@/components/projectsPageComponents/EditProjectForm";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";
import ProjectModal from "@/components/projectsPageComponents/ProjectModal";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function ProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [modal, setModal] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects([...data].sort((a, b) => Number(b.status === "In Progress") - Number(a.status === "In Progress")));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteProject(deleting.id);
      setProjects((current) => current.filter((project) => project.id !== deleting.id));
      setDeleting(null);
    } catch {
      alert("Could not delete project. Check the console for details.");
    }
  };

  return (
    <AnimatedPageWrapper key="projects-v2">
      <main className="work-page">
        <header className="work-header">
          <div>
            <p className="eyebrow">Engineering work</p>
            <h1>Systems I’ve built<br />and shipped.</h1>
          </div>
          <div className="work-header-copy">
            <p>Selected work across backend architecture, product interfaces, authentication, relational data and production deployment.</p>
            {token && <button className="button button-ghost" onClick={() => { setAdding(true); setSelected(null); }}>+ Add project</button>}
          </div>
        </header>

        <div className="work-meta"><span>Selected work / {projects.length.toString().padStart(2, "0")}</span><span>Click any system for the full brief</span></div>

        {loading && <div className="work-state">Loading engineering work…</div>}
        {error && <div className="work-state error">{error}</div>}

        {adding && token && (
          <AddProjectForm onProjectAdded={async () => { await load(); setAdding(false); }} onClose={() => setAdding(false)} />
        )}
        {selected && token && (
          <EditProjectForm project={selected} onProjectUpdated={async () => { await load(); setSelected(null); }} onClose={() => setSelected(null)} />
        )}

        {!adding && !selected && !loading && projects.length === 0 && <div className="work-state">No projects are published yet.</div>}

        {!adding && !selected && projects.length > 0 && (
          <section className="work-grid">
            {projects.map((project, index) => (
              <article key={project.id} className="work-card" onClick={() => setModal(project)}>
                <div className="work-card-top">
                  <span className="work-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className={`status-chip ${project.status === "Completed" ? "completed" : ""}`}>{project.status}</span>
                </div>
                <div className="work-card-body">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
                <div className="work-card-bottom">
                  <div><span>Stack</span><strong>{project.tech_stack || "Full-stack web application"}</strong></div>
                  <div><span>Timeline</span><strong>{formatPeriod(project)}</strong></div>
                  <button className="round-arrow" aria-label={`Open ${project.title}`}><ArrowIcon /></button>
                </div>

                <div className="work-external" onClick={(event) => event.stopPropagation()}>
                  {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer">Live ↗</a>}
                  {project.github_frontend_url && <a href={project.github_frontend_url} target="_blank" rel="noreferrer">Frontend ↗</a>}
                  {project.github_backend_url && <a href={project.github_backend_url} target="_blank" rel="noreferrer">Backend ↗</a>}
                  {token && <><button onClick={() => setSelected(project)}>Edit</button><button className="danger-text" onClick={() => setDeleting(project)}>Delete</button></>}
                </div>
              </article>
            ))}
          </section>
        )}

        {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
        {deleting && (
          <DeleteConfirmationModal message={`Are you sure you want to delete “${deleting.title}”?`} onConfirm={confirmDelete} onCancel={() => setDeleting(null)} />
        )}
      </main>
    </AnimatedPageWrapper>
  );
}

function formatPeriod(project: Project) {
  const start = project.start_date || "—";
  return `${start} — ${project.end_date || "Present"}`;
}
