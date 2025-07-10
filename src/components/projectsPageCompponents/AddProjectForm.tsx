"use client";

import { useState } from "react";
import { createProject } from "@/lib/api/projectApi";
import { ProjectData } from "@/types/project";

type Props = {
  onProjectAdded: () => Promise<void>;
};

export default function AddProjectForm({ onProjectAdded }: Props) {
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
      await createProject(form);
      await onProjectAdded();
      setForm({
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
      <h2 className="text-3xl font-bold text-center text-cyan-300 mb-8">
        {saving ? "Saving..." : "Add New Project"}
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

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded transition"
        >
          {saving ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
