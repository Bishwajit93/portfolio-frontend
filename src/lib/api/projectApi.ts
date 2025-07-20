import { API_BASE_URL } from "../api/apiBase";
import { Project, ProjectData } from "@/types/project";

// Helper to get the access token from localStorage
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("accessToken");
  console.log("✅ Using access token:", token); // <== TEMP DEBUG
  return token
    ? { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

// Fetch all projects
export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects/`);
  if (!res.ok) throw new Error("Failed to fetch Projects Data");
  return res.json();
}

// Fetch a single project by ID
export async function fetchProject(id: number): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}/`);
  if (!res.ok) throw new Error("Failed to fetch Project detail");
  return res.json();
}

// Create a new project
export async function createProject(data: ProjectData): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errors = {};
    try {
      errors = await res.json();
      if (!errors || Object.keys(errors).length === 0) {
        errors = { non_field_errors: ["Unknown server error."] };
      }
    } catch {
      const text = await res.text();
      errors = { non_field_errors: [text || "Unknown server error."] };
    }
    throw errors;
  }

  return res.json();
}

// Update a project
export async function updateProject(id: number, data: ProjectData): Promise<Project> {
  const safeData = {
    ...data,
    start_date: data.start_date || "",
    end_date: data.end_date || "",
    github_frontend_url: data.github_frontend_url || "",
    github_backend_url: data.github_backend_url || "",
    live_url: data.live_url || "",
  };

  const res = await fetch(`${API_BASE_URL}/projects/${id}/`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(safeData),
  });

  if (!res.ok) {
    let errors = {};
    try {
      errors = await res.json();
    } catch {
      const text = await res.text();
      errors = { non_field_errors: [text || "Unknown server error."] };
    }
    throw errors;
  }

  return res.json();
}

// Delete a project
export async function deleteProject(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete project failed:", text);
    throw new Error("Failed to delete project");
  }

  return true;
}
