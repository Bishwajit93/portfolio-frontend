// educationApi.ts
import { API_BASE_URL } from "./apiBase"; // Assuming API_BASE_URL is already set in apiBase.ts
import { getAuthHeaders } from "./apiBase"; // Import the getAuthHeaders function
import { Education, EducationData } from "@/types/education"; // Assuming Education and EducationData types are defined

// Fetch all educations (no token needed for viewing)
export async function fetchEducations(): Promise<Education[]> {
  const res = await fetch(`${API_BASE_URL}/educations/`); // No token required for normal users to view
  if (!res.ok) throw new Error("Failed to fetch Education Data");
  return res.json();
}

// Fetch a single education by ID (no token required for viewing details)
export async function fetchEducation(id: number): Promise<Education> {
  const res = await fetch(`${API_BASE_URL}/educations/${id}/`); // No token needed for normal users to view
  if (!res.ok) throw new Error("Failed to fetch Education detail");
  return res.json();
}

// Create a new education (requires token)
export async function createEducation(data: EducationData): Promise<Education> {
  const res = await fetch(`${API_BASE_URL}/educations/`, {
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
      console.error("Create education failed (raw text):", text);
      errors = { non_field_errors: [text || "Unknown server error."] };
    }
    console.error("Create Education failed (handled):", errors);
    throw errors;
  }
  return res.json();
}

// Update an existing education (requires token)
export async function updateEducation(id: number, data: EducationData): Promise<Education> {
  const res = await fetch(`${API_BASE_URL}/educations/${id}/`, {
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

// Delete an education (requires token)
export async function deleteEducation(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/educations/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(), // Attach token if available
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete education failed:", text);
    throw new Error("Failed to delete education");
  }

  return true;
}
