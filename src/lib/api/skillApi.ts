import { API_BASE_URL } from "./apiBase";
import {Skill, SkillData} from "@/types/skill";

export async function fetchSkills(): Promise<Skill[]>{
    const res = await fetch(`${API_BASE_URL}/skills/`);
    if(!res.ok) throw new Error("Failed to fetch Skills Data")
        return res.json()
}

export async function fetchSkill(id: number): Promise<Skill>{
    const res = await fetch(`${API_BASE_URL}/skills/${id}`)
    if(!res.ok) throw new Error("Failed to fetch Skill detail")
    return res.json()
}

export async function createSkill(data:SkillData): Promise<Skill> {
    const res = await fetch(`${API_BASE_URL}/skills/`, {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })
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
        console.error("Create skill failed (handled):", errors);
        throw errors;
    }
    return res.json()
}

export async function updateSkill(id: number, data: SkillData): Promise<Skill> {
    const res = await fetch(`${API_BASE_URL}/skills/${id}/`, {
        method: "PUT",
        headers: {"Content-Type":"aplication/json"},
        body: JSON.stringify(data),
    })
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
        console.error("Create skill failed (handled):", errors);
        throw errors;
    }
    return res.json()
}

export async function deleteSkill(id: number): Promise<boolean>{
    const res = await fetch(`${API_BASE_URL}/skills/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const text = await res.text();
        console.error("Delete skill failed:", text);
        throw new Error(text || "Unknown server error.");
    }
    return true
}