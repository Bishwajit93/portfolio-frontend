// apiBase.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://your-backend-url.com/api";

// apiBase.ts

export const getAuthToken = () => localStorage.getItem('accessToken');

// Updated getAuthHeaders to handle headers correctly
export const getAuthHeaders = () => {
  const token = getAuthToken();
  
  // Only include Authorization header if token is present
  const headers: { [key: string]: string } = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`; // Add the token if available
  }
  
  return headers;
};

