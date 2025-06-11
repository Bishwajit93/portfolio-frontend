export async function fetchProjects() {
  const res = await fetch('/api/projects/');
  if (!res.ok) throw new Error('Failed to fetch Projects Data');
  return res.json();
}
