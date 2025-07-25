import { API_BASE_URL } from "./apiBase";

export async function retrieveUsername(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/username/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data: Record<string, unknown> = await res.json();

  if (!res.ok) {
    const firstKey = Object.keys(data)[0];
    const value = data[firstKey];

    const message =
      Array.isArray(value) && typeof value[0] === "string"
        ? value[0]
        : typeof value === "string"
        ? value
        : "Something went wrong";

    throw new Error(message);
  }

  return data as { username: string };
}

export async function requestPasswordReset(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/users/reset_password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data: Record<string, unknown> = await res.json();

  if (!res.ok) {
    const firstKey = Object.keys(data)[0];
    const value = data[firstKey];

    const message =
      Array.isArray(value) && typeof value[0] === "string"
        ? value[0]
        : typeof value === "string"
        ? value
        : "Something went wrong";

    throw new Error(message);
  }

  return data;
}
