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
      className="max-w-2xl mx-auto p-6 bg-black border border-cyan-400/20 rounded-xl 
      shadow-[0_0_25px_rgba(0,255,255,0.3)] text-white"
    >
      {/* Close */}
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
        {saving ? "Saving..." : "Edit Project"}
      </h2>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block mb-1 text-cyan-300">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 
            text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block mb-1 text-cyan-300">Tech Stack</label>
          <input
            type="text"
            name="tech_stack"
            value={form.tech_stack}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 
            text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 text-cyan-300">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 
            text-white focus:outline-none"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        {/* Dates */}
        <div>
          <label className="block mb-1 text-cyan-300">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 
            text-cyan-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-cyan-300">End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 
            text-cyan-100 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-cyan-300">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 
            text-white focus:outline-none"
          />
        </div>

        {/* URLs */}
        {([
          { name: "github_frontend_url", label: "Frontend URL" },
          { name: "github_backend_url", label: "Backend URL" },
          { name: "live_url", label: "Live URL" },
        ] as { name: keyof ProjectData; label: string }[]).map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-cyan-300">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={form[field.name] ?? ""}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-black border border-cyan-400/40 
              text-white focus:outline-none"
            />
          </div>
        ))}

        {/* Error Display */}
        {Object.entries(errors).length > 0 && (
          <div className="text-red-400 text-sm">
            {Object.entries(errors).map(([k, v]) => (
              <p key={k}>
                {k}: {Array.isArray(v) ? v.join(", ") : v}
              </p>
            ))}
          </div>
        )}

        {/* Buttons */}
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
