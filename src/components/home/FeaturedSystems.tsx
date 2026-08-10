"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchProjects } from "@/lib/api/projectApi";
import type { Project } from "@/types/project";
import ArrowIcon from "@/components/ui/ArrowIcon";

const fallback: Project[] = [
  {
    id: -1,
    title: "OPSHUB",
    description: "A multi-tenant operations platform designed around real business workflows: POS, inventory, finance, permissions and auditability.",
    tech_stack: "Django · DRF · PostgreSQL · Next.js · TypeScript",
    github_frontend_url: null,
    github_backend_url: null,
    live_url: null,
    start_date: null,
    end_date: null,
    status: "In Progress",
  },
  {
    id: -2,
    title: "Linda Art Gallery",
    description: "A production art portfolio and inquiry platform built for a real client, including media delivery, authentication and deployment.",
    tech_stack: "Django · DRF · PostgreSQL · Next.js · BunnyCDN",
    github_frontend_url: null,
    github_backend_url: null,
    live_url: "https://lindaartgallery.de",
    start_date: null,
    end_date: null,
    status: "Completed",
  },
  {
    id: -3,
    title: "AbdullahStack",
    description: "The full-stack system behind this portfolio, with API-managed content, owner authentication, contact workflows and résumé generation.",
    tech_stack: "Next.js · TypeScript · Django · PostgreSQL",
    github_frontend_url: "https://github.com/Bishwajit93",
    github_backend_url: null,
    live_url: null,
    start_date: null,
    end_date: null,
    status: "In Progress",
  },
];

export default function FeaturedSystems() {
  const [projects, setProjects] = useState<Project[]>(fallback);

  useEffect(() => {
    fetchProjects()
      .then((data) => data.length && setProjects(data))
      .catch(() => undefined);
  }, []);

  const featured = useMemo(() => projects.slice(0, 3), [projects]);

  return (
    <section className="systems-section" aria-labelledby="selected-systems">
      <div className="section-heading">
        <div><p className="eyebrow">Selected systems</p><h2 id="selected-systems">Proof, not promises.</h2></div>
        <p>Projects where architecture, product decisions and production constraints matter as much as the interface.</p>
      </div>

      <div className="system-list">
        {featured.map((project, index) => (
          <article className="system-card" key={project.id}>
            <div className="system-index">0{index + 1}</div>
            <div className="system-main">
              <div className="system-title-row">
                <h3>{project.title}</h3>
                <span className={`status-chip ${project.status === "Completed" ? "completed" : ""}`}>{project.status}</span>
              </div>
              <p>{project.description}</p>
              <div className="tech-line">{project.tech_stack}</div>
            </div>
            <div className="system-links">
              {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer">Live ↗</a>}
              {project.github_frontend_url && <a href={project.github_frontend_url} target="_blank" rel="noreferrer">Source ↗</a>}
              <a href="/projects" aria-label={`View ${project.title} details`} className="round-arrow"><ArrowIcon /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
