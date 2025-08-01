"use client";

import { useState } from "react";
import { updateEducation } from "@/lib/api/educationApi";
import { Education, EducationData } from "@/types/education";

type Props = {
  education: Education;
  onEducationUpdated: () => Promise<void>;
  onClose: () => void;
};

export default function EditEducationForm({ education, onEducationUpdated, onClose }: Props) {
  const [form, setForm] = useState<EducationData>({
    institution_name: education.institution_name || "",
    degree: education.degree || "",
    field_of_study: education.field_of_study || "",
    start_date: education.start_date || "",
    end_date: education.end_date || "",
    grade: education.grade || "",
    description: education.description || "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      await updateEducation(education.id, form);
      await onEducationUpdated();
      onClose();
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null) {
        setErrors(err as Record<string, string[]>);
      } else {
        setErrors({ non_field_errors: ["Unexpected error"] });
      }
    } finally {
      setSaving(false);
    }
  };

  const renderError = (field: string) => {
    const msg = errors[field];
    if (!msg) return null;
    return (
      <p className="text-red-400 text-sm mb-2">{msg.join(", ")}</p>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-black border border-cyan-400/20 rounded-xl 
      shadow-[0_0_25px_rgba(0,255,255,0.3)] text-white"
    >
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={onClose}
          className="text-cyan-300 hover:text-white font-semibold cursor-pointer transition duration-300"
        >
          ✖ Close
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center text-cyan-300 mb-8">
        {saving ? "Saving..." : "Edit Education"}
      </h2>

      <div className="space-y-5">
        {/* Institution Name */}
        <div>
          <label className="block mb-1 text-cyan-300">Institution Name</label>
          <input
            type="text"
            name="institution_name"
            value={form.institution_name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
              placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
            required
          />
          {renderError("institution_name")}
        </div>

        {/* Degree */}
        <div>
          <label className="block mb-1 text-cyan-300">Degree</label>
          <input
            type="text"
            name="degree"
            value={form.degree}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
              placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
            required
          />
          {renderError("degree")}
        </div>

        {/* Field of Study */}
        <div>
          <label className="block mb-1 text-cyan-300">Field of Study</label>
          <input
            type="text"
            name="field_of_study"
            value={form.field_of_study}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
              placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
            required
          />
          {renderError("field_of_study")}
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 text-cyan-300">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
              placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
            required
          />
          {renderError("start_date")}
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-1 text-cyan-300">End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
              placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
          />
          {renderError("end_date")}
        </div>

        {/* Grade */}
        <div>
          <label className="block mb-1 text-cyan-300">Grade</label>
          <input
            type="text"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
              placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
          />
          {renderError("grade")}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-cyan-300">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
            placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
          />
          {renderError("description")}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3 border border-cyan-400 text-cyan-300 rounded-md 
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
            hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 border border-red-500 text-red-400 rounded-md 
            shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 
            hover:text-black hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] cursor-pointer transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
