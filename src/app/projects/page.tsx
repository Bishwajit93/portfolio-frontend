"use client";

import { useEffect, useState } from "react";
import AddProjectForm from "./components/AddProjectForm";
import ProjectCard from "./components/ProjectCard";
import { Project } from "@/types/project";
import { fetchProjects, createProject } from "@/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAddProject = async (projectData: { title: string; description: string; techStack: string }) => {
    try {
      const newProject = await createProject(projectData);
      setProjects((prev) => [...prev, newProject]);
    } catch (err: any) {
      alert("Error adding project: " + err.message);
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <AddProjectForm onAdd={handleAddProject} />
      <ul className="mt-8 space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </main>
  );
}
