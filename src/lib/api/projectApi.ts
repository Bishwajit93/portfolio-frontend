// projectApi.ts
import { API_BASE_URL } from "./apiBase"; // Assuming API_BASE_URL is already set in apiBase.ts
import { getAuthHeaders } from "./apiBase"; // Import the getAuthHeaders function
import { Project, ProjectData } from "@/types/project"; // Assuming Project and ProjectData types are defined

// Fetch all projects (no token needed for viewing projects)
export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects/`); // No token required for normal users to view
  if (!res.ok) throw new Error("Failed to fetch Projects Data");
  return res.json();
}

// Fetch a single project by ID (no token required for viewing details)
export async function fetchProject(id: number): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}/`); // No token needed for normal users to view
  if (!res.ok) throw new Error("Failed to fetch Project Detail");
  return res.json();
}

// Create a new project (requires token)
export async function createProject(data: ProjectData): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/`, {
    method: "POST",
    headers: getAuthHeaders(), // Attach headers, including token if available
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errors = await res.json();
    throw errors;
  }

  return res.json();
}

// Update an existing project (requires token)
export async function updateProject(id: number, data: ProjectData): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}/`, {
    method: "PUT",
    headers: getAuthHeaders(), // Attach headers, including token if available
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errors = await res.json();
    throw errors;
  }

  return res.json();
}

// Delete a project (requires token)
export async function deleteProject(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(), // Attach headers, including token if available
  });

  if (!res.ok) throw new Error("Failed to delete project");
  return true;
}
