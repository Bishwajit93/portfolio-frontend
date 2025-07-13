"use client";

import { useState } from "react";
import { updateProject } from "@/lib/api/projectApi";
import { Project, ProjectData } from "@/types/project";

type Props = {
  project: Project;
  onProjectUpdated: (updated: Project) => void;
  onClose: () => void;
};

export default function EditProjectForm({ project, onProjectUpdated, onClose }: Props) {
  const [form, setForm] = useState<ProjectData>({
    title: project.title,
    description: project.description,
    tech_stack: project.tech_stack,
    github_frontend_url: project.github_frontend_url ?? "",
    github_backend_url: project.github_backend_url ?? "",
    live_url: project.live_url ?? "",
    start_date: project.start_date ?? "",
    end_date: project.end_date ?? "",
    status: project.status,
  });

  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      await updateProject(project.id, form);
      onProjectUpdated({ ...form, id: project.id });
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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-900 border border-cyan-400 rounded-xl p-8 shadow-2xl"
    >
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
        {saving ? "Saving..." : "Edit Project"}
      </h2>

      <div className="space-y-5">
        {([
          { name: "title", label: "Title", type: "text" },
          { name: "tech_stack", label: "Tech Stack", type: "text" },
          { name: "github_frontend_url", label: "Frontend URL", type: "text" },
          { name: "github_backend_url", label: "Backend URL", type: "text" },
          { name: "live_url", label: "Live URL", type: "text" },
          { name: "start_date", label: "Start Date", type: "date" },
          { name: "end_date", label: "End Date", type: "date" },
        ] as { name: keyof ProjectData; label: string; type: string }[]).map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-cyan-300">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name] ?? ""}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-cyan-400 focus:outline-none"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 text-cyan-300">Description</label>
          <textarea
            name="description"
            value={form.description ?? ""}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 rounded bg-gray-800 border border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-cyan-300">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-cyan-400 focus:outline-none"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        {Object.entries(errors).length > 0 && (
          <div className="text-red-400">
            {Object.entries(errors).map(([k, v]) => (
              <p key={k}>{k}: {Array.isArray(v) ? v.join(", ") : v}</p>
            ))}
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded transition"
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
      </div>
    </form>
  );
}
