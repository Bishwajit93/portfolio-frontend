"use client";

import { useEffect, useState } from "react";
import AddProjectForm from "./components/AddProjectForm";
import ProjectCard from "./components/ProjectCard";
import { Project } from "@/types/project";

export async function createProject(data: { title: string; description: string; techStack: string }) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!apiUrl) throw new Error("Missing backend URL");

  const res = await fetch(`${apiUrl}/projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      tech_stack: data.techStack,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend response:", text);
    throw new Error("Failed to create project");
  }

  return res.json();
}
export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/`)
      .then((res) => res.json())
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // This function will be passed to AddProjectForm
  const handleAddProject = async (projectData: { title: string; description: string; techStack: string }) => {
    try {
      const newProject = await createProject(projectData);
      setProjects((prev) => [...prev, newProject]); // add new project to state list
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
