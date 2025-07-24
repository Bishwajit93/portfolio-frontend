"use client";

import { useState } from "react";
import { updateEducation } from "@/lib/api/educationApi";
import { Education, EducationData } from "@/types/education";

type Props = {
  education: Education;
  onEducationUpdated: () => Promise<void>;
  onClose: () => void;
};

export default function EditEducationForm({
  education,
  onEducationUpdated,
  onClose,
}: Props) {
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
      <p className="text-red-400 text-sm mb-2">
        {msg.join(", ")}
      </p>
    );
  };

  return (
    <div className="relative p-6 bg-gray-800 rounded-lg shadow-lg">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-cyan-300 hover:text-cyan-100"
      >
        ✖
      </button>

      <h2 className="text-xl font-semibold text-white mb-4">Edit Education</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="institution_name"
            placeholder="Institution Name"
            value={form.institution_name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
            required
          />
          {renderError("institution_name")}
        </div>

        <div>
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={form.degree}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
            required
          />
          {renderError("degree")}
        </div>

        <div>
          <input
            type="text"
            name="field_of_study"
            placeholder="Field of Study"
            value={form.field_of_study}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
            required
          />
          {renderError("field_of_study")}
        </div>

        <div>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
            required
          />
          {renderError("start_date")}
        </div>

        <div>
          <input
            type="date"
            name="end_date"
            value={form.end_date ?? ""}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
          />
          {renderError("end_date")}
        </div>

        <div>
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={form.grade}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
          />
          {renderError("grade")}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
          />
          {renderError("description")}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-cyan-600 rounded text-white hover:bg-cyan-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
