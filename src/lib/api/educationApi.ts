import { error } from "console";
import { API_BASE_URL} from "./apiBase";
import { Education, EducationData } from "@/types/education";

export async function fetchEducations(): Promise<Education[]> {
    const res = await fetch(`${API_BASE_URL}/education/`);
    if(!res.ok) throw new Error("Failed to fetch Education Data");
    return res.json()
}

export async function fetchEducation(id:number): Promise<Education>{
    const res = await fetch(`${API_BASE_URL}/education/${id}`)
    if(!res.ok) throw new Error("Failed to fetch Education detail");
    return res.json()
}   

export async function createEducation(data:EducationData): Promise<Education>{
    const res = await fetch(`${API_BASE_URL}/education/`, {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(data),
    })
    if(!res.ok){
        let errors = {}
        try{
            errors = await res.json()
            if(!errors|| Object.keys(errors).length === 0) {
                errors = {non_field_errors: ["Unknown server error."]}
            }
        } catch {
            const text = await res.text()
            console.error("Create education failed (raw text):", text)
            errors = {non_field_errors: [text || "Unknown server error."]}
        }
        console.error("Create education failed (handled):", errors)
        throw errors
    }
    return await res.json()
}

export async function updateEducation(id:number, data:EducationData): Promise<Education> {
    const res = await fetch(`${API_BASE_URL}/education/${id}/`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(data),
    })
    if(!res.ok) {
        let errors = {}
        try {
            errors = await res.json()
            if(!errors || Object.keys(errors).length === 0) {
                errors = {non_field_errors: ["Unknown server error."]}
            }
        } catch {
            const text = await res.text()
            console.error("Update education failed (raw text):", text)
            errors = {non_field_errors: [text || "Unknown server error."]}
        }
        console.error("Update education failed (handled):", errors)
        throw errors
    }
    return res.json()
}

export async function deleteEducation(id: number): Promise<boolean> {
    const res= await fetch(`${API_BASE_URL}/education/${id}/`, {
        method: "DELETE",
    })
    if(!res.ok) {
        const text = await res.text()
        console.error("Delete education failed (raw text):", text)
        throw new Error(text || "Unknown server error.")
    }
    return true;
}