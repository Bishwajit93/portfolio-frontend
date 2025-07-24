"use client";

import { useState } from "react";
import { createProject } from "@/lib/api/projectApi";
import { ProjectData } from "@/types/project";

type Props = {
  onProjectAdded: () => Promise<void>;
  onClose: () => void;
};

export default function AddProjectForm({ onProjectAdded, onClose }: Props) {
  const [form, setForm] = useState<ProjectData>({
    title: "",
    description: "",
    tech_stack: "",
    github_frontend_url: "",
    github_backend_url: "",
    live_url: "",
    start_date: "",
    end_date: "",
    status: "In Progress",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    // If no end_date, force status to "In Progress"
    const payload: ProjectData = {
      ...form,
      status: form.end_date ? form.status : "In Progress",
      end_date: form.end_date || "",
    };

    try {
      await createProject(payload);
      await onProjectAdded();
      onClose();
    } catch (err: unknown) {
      // Narrow the error shape
      if (typeof err === "object" && err !== null) {
        setErrors(err as Record<string, string[]>);
      } else {
        setErrors({ non_field_errors: ["An unexpected error occurred."] });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-900 border border-cyan-400 rounded-xl p-8 space-y-6"
    >
      <div className="flex justify-end">
        <button
          onClick={onClose}
          type="button"
          className="text-cyan-300 hover:text-cyan-100"
        >
          ✖
        </button>
      </div>
      <h2 className="text-2xl font-bold text-cyan-300 text-center">
        {saving ? "Saving..." : "Add New Project"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-cyan-300 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-cyan-400 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-cyan-300 mb-1">Tech Stack</label>
          <input
            name="tech_stack"
            value={form.tech_stack}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-cyan-400 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-cyan-300 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-cyan-400 rounded"
          >
            <option>In Progress</option>
            <option>Completed</option>
            <option>Paused</option>
          </select>
        </div>

        <div>
          <label className="block text-cyan-300 mb-1">Start Date</label>
          <input
            name="start_date"
            type="date"
            value={form.start_date || ""}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-cyan-400 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-cyan-300 mb-1">
            End Date (optional)
          </label>
          <input
            name="end_date"
            type="date"
            value={form.end_date ?? ""}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-cyan-400 rounded"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave blank to mark as “In Progress.”
          </p>
        </div>

        <div>
          <label className="block text-cyan-300 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-cyan-400 rounded"
            required
          />
        </div>

        {(["github_frontend_url", "github_backend_url", "live_url"] as const).map(
          (field) => (
            <div key={field}>
              <label className="block text-cyan-300 mb-1">
                {field.replace(/_/g, " ").replace(/\b\w/g, (c) =>
                  c.toUpperCase()
                )}
              </label>
              <input
                name={field}
                value={form[field] ?? ""}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-cyan-400 rounded"
              />
            </div>
          )
        )}

        {Object.keys(errors).length > 0 && (
          <div className="text-red-400 space-y-1">
            {Object.entries(errors).map(([field, msgs]) => (
              <p key={field}>
                <strong>{field}:</strong>{" "}
                {Array.isArray(msgs) ? msgs.join(", ") : msgs}
              </p>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2 bg-cyan-600 rounded text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Project"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 bg-gray-600 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
