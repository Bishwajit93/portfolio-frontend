"use client";

import { useState } from "react";
import { createProject } from "@/lib/api/projectApi";
import { ProjectData } from "@/types/project";

type Props = {
  onProjectAdded: () => Promise<void>;
  onClose: () => void;
};

export default function AddProjectForm({ onProjectAdded, onClose }: Props) {
  const [inProgress, setInProgress] = useState(true);
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

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = () => {
    setInProgress((prev) => !prev);
    setForm((prev) => ({
      ...prev,
      status: !inProgress ? "In Progress" : "Completed",
      end_date: !inProgress ? null : prev.end_date,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const payload: ProjectData = {
      ...form,
      status: inProgress ? "In Progress" : "Completed",
      end_date: inProgress ? null : form.end_date,
    };

    try {
      await createProject(payload);
      await onProjectAdded();
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
        {saving ? "Saving..." : "Add Project"}
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
            className="w-full p-2 rounded bg-zinc-800 text-white border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
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
            className="w-full p-2 rounded bg-zinc-800 text-white border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 text-cyan-300">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
          />
        </div>

        {/* In Progress Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={inProgress}
            onChange={handleCheckbox}
            className="accent-cyan-400 w-4 h-4"
            id="inprogress"
          />
          <label htmlFor="inprogress" className="text-cyan-300">
            Project is still in progress
          </label>
        </div>

        {/* End Date (disabled if inProgress is true) */}
        <div>
          <label className="block mb-1 text-cyan-300">End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date || ""}
            onChange={handleChange}
            disabled={inProgress}
            className={`w-full p-2 rounded bg-zinc-800 text-white border shadow-[0_0_10px_rgba(0,255,255,0.5)] ${
              inProgress ? "border-gray-400 text-gray-400 cursor-not-allowed" : "border-cyan-400"
            }`}
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
            className="w-full p-2 rounded bg-zinc-800 text-white border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
          />
        </div>

        {/* URLs */}
        {(["github_frontend_url", "github_backend_url", "live_url"] as const).map((field) => (
          <div key={field}>
            <label className="block mb-1 text-cyan-300">
              {field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </label>
            <input
              type="text"
              name={field}
              value={form[field] ?? ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
            />
          </div>
        ))}

        {/* Error Messages */}
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
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 hover:text-white"
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 border border-red-500 text-red-400 rounded-md 
            shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 hover:text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
