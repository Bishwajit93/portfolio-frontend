export async function createProject(data: { title: string; description: string; techStack: string }) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!apiUrl) throw new Error("Missing backend URL");

  console.log("Sending data to backend:", data);  // Add this line to debug

  const res = await fetch(`${apiUrl}/projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();  // Read response text for debugging
    console.error("Backend response:", text);
    throw new Error("Failed to create project");
  }

  return res.json();
}
