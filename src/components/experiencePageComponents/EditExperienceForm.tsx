"use client"

import { useState } from "react"
import { Experience, ExperienceData } from "@/types/experience"
import { updateExperience } from "@/lib/api/experienceApi"

type Props= {
    experience: Experience
    onExperienceUpdated: () => Promise<void>
    onClose:() => void
}

export default function EditExperienceForm({experience, onExperienceUpdated, onClose}: Props) {
    const [form, setForm] = useState<ExperienceData>({
        company_name: experience.company_name,
        job_title: experience.job_title,
        start_date: experience.start_date,
        end_date: experience.end_date,
        still_working: experience.still_working,
        description: experience.description,
        location: experience.location
    })

    const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            await updateExperience(experience.id, form);
            await onExperienceUpdated();
            onClose();
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null) {
            setErrors(err as { [key: string]: string | string[] });
            } else {
            setErrors({ non_field_errors: ["An unexpected error occurred."] });
            }
        } finally {
            setSaving(false);
        }
    };


    const handleChange= (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value, type} = e.target
        setForm({
            ...form,
            [name]: type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value
        })
    }
    return(
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-900 border border-cyan-400 rounded-xl p-8 shadow-2xl">

            <div className="flex justify-end mb-4">
                <button
                type="button"
                onClick={onClose}
                className="text-cyan-300 hover:text-cyan-100 font-semibold"
                >
                ✖ Close
                </button>
            </div>

            <h2 className="text-3xl font-bold text-center text-cyan-300 mb-8">
                {saving ? "Saving..." : "Edit Experience"}
            </h2>

            <div className="mb-4">
                <label className="block mb-1 text-cyan-300">Company Name</label>
                <input
                type="text"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-cyan-400 focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-cyan-300">Job Title</label>
                <input
                type="text"
                name="job_title"
                value={form.job_title}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-cyan-400 focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-cyan-300">Start Date</label>
                <input
                type="date"
                name="start_date"
                value={form.start_date || ""}
                onChange={handleChange}
                className="w-full p-3 rounded border border-cyan-400 focus:outline-none text-cyan-100 bg-gray-800"
                />
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                <label className="text-cyan-300">End Date</label>
                <div className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    name="still_working"
                    checked={form.still_working}
                    onChange={handleChange}
                    className="w-5 h-5 accent-cyan-600"
                    />
                    <span className="text-cyan-300 text-sm">Still Working</span>
                </div>
                </div>
                <input
                type="date"
                name="end_date"
                value={form.end_date || ""}
                onChange={handleChange}
                disabled={form.still_working}
                className={`w-full p-3 rounded border border-cyan-400 focus:outline-none text-cyan-100 bg-gray-800 ${form.still_working ? "opacity-50 cursor-not-allowed" : ""}`}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-cyan-300">Location</label>
                <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 rounded border border-cyan-400 focus:outline-none text-cyan-100 bg-gray-800"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-cyan-300">Description</label>
                <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded border border-cyan-400 focus:outline-none text-cyan-100 bg-gray-800"
                />
            </div>

            {Object.entries(errors).length > 0 && (
                <div className="text-red-400 mb-4">
                {Object.entries(errors).map(([k, v]) => (
                    <p key={k}>{k}: {Array.isArray(v) ? v.join(", ") : v}</p>
                ))}
                </div>
            )}

            <div className="flex gap-4 mt-6">
                <button
                type="submit"
                disabled={saving}
                className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded transition disabled:opacity-50"
                >
                {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded transition"
                >
                Cancel
                </button>
            </div>

        </form>

    )
}