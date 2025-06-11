const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchProjects() {
  if (!apiUrl) throw new Error("Missing backend URL");

  const res = await fetch(`${apiUrl}/projects/`);
  if (!res.ok) throw new Error("Failed to fetch Projects Data");

  return res.json();
}

export async function createProject(data: { title: string; description: string; techStack: string }) {
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
