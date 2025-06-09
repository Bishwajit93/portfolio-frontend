export async function fetchProjects() {
    const res = await fetch("https://web-production-9824e.up.railway.app/api/projects/")

    if(!res.ok){
        throw new Error("Failed to fetch Projects Data")
    }
    return res.json()
}