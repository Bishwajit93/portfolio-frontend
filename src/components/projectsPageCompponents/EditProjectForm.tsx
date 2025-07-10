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
      onProjectUpdated({ ...form, id: project.id }); // instant local update
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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-gray-900 border border-cyan-400 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Edit Project</h2>
      {([
        { name: "title", label: "Title", type: "text" },
        { name: "tech_stack", label: "Tech Stack", type: "text" },
        { name: "github_frontend_url", label: "Frontend URL", type: "text" },
        { name: "github_backend_url", label: "Backend URL", type: "text" },
        { name: "live_url", label: "Live URL", type: "text" },
        { name: "start_date", label: "Start Date", type: "date" },
        { name: "end_date", label: "End Date", type: "date" },
      ] as { name: keyof ProjectData; label: string; type: string }[]).map((field) => (
        <div key={field.name} className="mb-3">
          <label className="block mb-1 text-cyan-300">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name] ?? ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-cyan-400 focus:outline-none"
          />
        </div>
      ))}
      <div className="mb-3">
        <label className="block mb-1 text-cyan-300">Description</label>
        <textarea
          name="description"
          value={form.description ?? ""}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 rounded bg-gray-800 border border-cyan-400 focus:outline-none"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 text-cyan-300">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-cyan-400 focus:outline-none"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Paused">Paused</option>
        </select>
      </div>
      {Object.entries(errors).length > 0 && (
        <div className="mb-3 text-red-400">
          {Object.entries(errors).map(([key, val]) => (
            <p key={key}>{key}: {Array.isArray(val) ? val.join(", ") : val}</p>
          ))}
        </div>
      )}
      <button
        type="submit"
        disabled={saving}
        className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
