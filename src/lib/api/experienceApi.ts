import { API_BASE_URL } from "./apiBase";
import { Experience, ExperienceData } from "@/types/experience";


export async function fetchExperiences(): Promise<Experience[]> {
    const res = await fetch(`${API_BASE_URL}/experience/`)
    if(!res.ok) throw new Error("Failed to fetch Experience Data")
        return res.json()
}

export async function fetchExperience(id: number): Promise<Experience> {
    const res = await fetch(`${API_BASE_URL}/experience/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch Experience detail");
    return res.json();
}

export async function createExperience(data: ExperienceData): Promise<Experience>{
    const res = await fetch(`${API_BASE_URL}/experience/`, {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })

    if(!res.ok){
        let errors = {}
        try {
            errors = await res.json()
            if(!errors || Object.keys(errors).length === 0) {
                errors={non_field_errors: ["Unknown server error."]}
            }
        } catch {
            const text = await res.text()
            console.error("Create experience failed (raw text):", text)
            errors = {non_field_errors: [text || "Unknown server error."]}
        }
        console.error("Create Experience failed (handled):", errors)
        throw errors
    }
    return await res.json()
}

export async function updateExperience(id: number, data:ExperienceData): Promise<Experience> {
    const res = await fetch(`${API_BASE_URL}/experience/${id}/`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data)
    })
    if(!res.ok) {
        let errors = {}
        try {
            errors = await res.json()
            if(!errors || Object.keys(errors).length === 0) {
                errors = {non_fielld_errors: ["unknown server error."]}
            }
        }catch {
            const text = await res.text()
            console.error("Update experience failed(raw text):", text)
            errors = {non_field_errors: [text || "Unknown server error."]}
        }
        console.error("Update experience failed(handled):", errors)
        throw errors
    }
    return await res.json()
}

export async function deleteExperience(id: number): Promise<boolean>{
    const res = await fetch(`${API_BASE_URL}/experience/${id}`, {
        method: "DELETE",
    })
    if(!res.ok){
        const text = await res.text()
        console.error("Delete experience failed:", text)
        throw new Error("Failed to delete experience")
    }

    return true
}