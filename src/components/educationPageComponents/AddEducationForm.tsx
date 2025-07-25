"use client";

import { useState } from "react";
import { createEducation } from "@/lib/api/educationApi";
import { EducationData } from "@/types/education";

type Props = {
  onEducationAdded: () => Promise<void>;
  onClose: () => void;
};

export default function AddEducationForm({ onEducationAdded, onClose }: Props) {
  const [form, setForm] = useState<EducationData>({
    institution_name: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    grade: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderError = (fieldName: string) => {
    const error = errors[fieldName];
    if (!error) return null;
    return (
      <p className="text-red-500 text-sm mb-2">
        {Array.isArray(error) ? error.join(", ") : error}
      </p>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createEducation(form);
      await onEducationAdded();
      onClose();
    } catch (err: unknown) {
      console.error("Error creating education:", err);
      setErrors(err as { [key: string]: string | string[] });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 rounded bg-gray-800 shadow-lg max-w-md mx-auto">
      <h2 className="text-xl mb-4 text-white">Add Education</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="institution_name"
          placeholder="Institution Name"
          value={form.institution_name}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("institution_name")}

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={form.degree}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("degree")}

        <input
          type="text"
          name="field_of_study"
          placeholder="Field of Study"
          value={form.field_of_study}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("field_of_study")}

        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("start_date")}

        <input
          type="date"
          name="end_date"
          value={form.end_date ?? ""}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("end_date")}

        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={form.grade}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("grade")}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("description")}

        <div className="flex justify-between mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-600 rounded text-white">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
