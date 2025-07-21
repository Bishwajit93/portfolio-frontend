// experienceApi.ts
import { API_BASE_URL } from "./apiBase"; // Assuming API_BASE_URL is already set in apiBase.ts
import { getAuthHeaders } from "./apiBase"; // Import the getAuthHeaders function
import { Experience, ExperienceData } from "@/types/experience"; // Assuming Experience and ExperienceData types are defined

// Fetch all experiences (no token needed for viewing experiences)
export async function fetchExperiences(): Promise<Experience[]> {
  const res = await fetch(`${API_BASE_URL}/experiences/`); // No token required for normal users to view
  if (!res.ok) throw new Error("Failed to fetch Experience Data");
  return res.json();
}

// Fetch a single experience by ID (no token required for viewing details)
export async function fetchExperience(id: number): Promise<Experience> {
  const res = await fetch(`${API_BASE_URL}/experiences/${id}/`); // No token needed for normal users to view
  if (!res.ok) throw new Error("Failed to fetch Experience detail");
  return res.json();
}

// Create a new experience (requires token)
export async function createExperience(data: ExperienceData): Promise<Experience> {
  const res = await fetch(`${API_BASE_URL}/experiences/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  // Only specify Content-Type here
      ...getAuthHeaders(), // Attach token if available
    },
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
      console.error("Create experience failed (raw text):", text);
      errors = { non_field_errors: [text || "Unknown server error."] };
    }
    console.error("Create Experience failed (handled):", errors);
    throw errors;
  }
  return res.json();
}

// Update an existing experience (requires token)
export async function updateExperience(id: number, data: ExperienceData): Promise<Experience> {
  const res = await fetch(`${API_BASE_URL}/experiences/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Only specify Content-Type here
      ...getAuthHeaders(), // Attach token if available
    },
    body: JSON.stringify(data),
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

// Delete an experience (requires token)
export async function deleteExperience(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/experiences/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(), // Attach token if available
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete experience failed:", text);
    throw new Error("Failed to delete experience");
  }

  return true;
}
