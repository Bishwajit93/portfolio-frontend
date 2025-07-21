// skillsApi.ts
import { API_BASE_URL } from "./apiBase"; // Assuming API_BASE_URL is already set in apiBase.ts
import { getAuthHeaders } from "./apiBase"; // Import the getAuthHeaders function
import { Skill, SkillData } from "@/types/skill"; // Assuming Skill and SkillData types are defined

// Fetch all skills (no token needed for viewing)
export async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch(`${API_BASE_URL}/skills/`); // No token required for normal users to view
  if (!res.ok) throw new Error("Failed to fetch Skills Data");
  return res.json();
}

// Fetch a single skill by ID (no token required for viewing details)
export async function fetchSkill(id: number): Promise<Skill> {
  const res = await fetch(`${API_BASE_URL}/skills/${id}/`); // No token needed for normal users to view
  if (!res.ok) throw new Error("Failed to fetch Skill detail");
  return res.json();
}

// Create a new skill (requires token)
export async function createSkill(data: SkillData): Promise<Skill> {
  const res = await fetch(`${API_BASE_URL}/skills/`, {
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
      console.error("Create skill failed (raw text):", text);
      errors = { non_field_errors: [text || "Unknown server error."] };
    }
    console.error("Create Skill failed (handled):", errors);
    throw errors;
  }
  return res.json();
}

// Update an existing skill (requires token)
export async function updateSkill(id: number, data: SkillData): Promise<Skill> {
  const res = await fetch(`${API_BASE_URL}/skills/${id}/`, {
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

// Delete a skill (requires token)
export async function deleteSkill(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/skills/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(), // Attach token if available
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete skill failed:", text);
    throw new Error("Failed to delete skill");
  }

  return true;
}
