"use client";

import { useState, useEffect } from "react";
import { createProject } from "@/lib/api/projectApi";
import { ProjectData } from "@/types/project";

type Props = {
  onProjectAdded: () => Promise<void>;
  onClose: () => void;
};

export default function AddProjectForm({ onProjectAdded, onClose }: Props) {
  const [form, setForm] = useState<ProjectData & { ongoing: boolean }>({
    title: "",
    description: "",
    tech_stack: "",
    github_frontend_url: "",
    github_backend_url: "",
    live_url: "",
    start_date: "",
    end_date: "",
    status: "In Progress",
    ongoing: true, // default checked
  });
  const [errors, setErrors] = useState<Record<string,string[]>>({});
  const [saving, setSaving] = useState(false);

  // When ongoing toggles on, clear end_date & force status
  useEffect(() => {
    if (form.ongoing) {
      setForm(f => ({ ...f, end_date: "", status: "In Progress" }));
    }
  }, [form.ongoing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (name === "ongoing") {
      setForm(f => ({ ...f, ongoing: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      // strip our local-only `ongoing` flag before sending
      const { ongoing, ...payload } = form;
      await createProject(payload);
      await onProjectAdded();
      onClose();
    } catch (err: any) {
      setErrors(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-900 border border-cyan-400 rounded-xl p-8 space-y-6">
      {/* Close & Title */}
      <div className="flex justify-end">
        <button onClick={onClose} type="button" className="text-cyan-300 hover:text-cyan-100">✖</button>
      </div>
      <h2 className="text-2xl font-bold text-cyan-300 text-center">
        {saving ? "Saving..." : "Add New Project"}
      </h2>

      {/* Title */}
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

      {/* Tech Stack */}
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

      {/* Ongoing checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="ongoing"
          checked={form.ongoing}
          onChange={handleChange}
          id="ongoing"
          className="accent-cyan-500"
        />
        <label htmlFor="ongoing" className="text-cyan-300">
          Ongoing (no end date)
        </label>
      </div>

      {/* Status selector */}
      <div>
        <label className="block text-cyan-300 mb-1">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          disabled={form.ongoing}
          className={
            "w-full p-2 bg-gray-800 border rounded " +
            (form.ongoing ? "border-gray-600 opacity-50" : "border-cyan-400")
          }
        >
          <option>In Progress</option>
          <option>Completed</option>
          <option>Paused</option>
        </select>
      </div>

      {/* Start Date */}
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

      {/* End Date */}
      <div>
        <label className="block text-cyan-300 mb-1">End Date</label>
        <input
          name="end_date"
          type="date"
          value={form.end_date || ""}
          onChange={handleChange}
          disabled={form.ongoing}
          className={
            "w-full p-2 bg-gray-800 border rounded " +
            (form.ongoing
              ? "border-gray-600 opacity-50 cursor-not-allowed"
              : "border-cyan-400")
          }
          required={!form.ongoing}
        />
      </div>

      {/* Description */}
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

      {/* URLs */}
      {["github_frontend_url","github_backend_url","live_url"].map((name) => (
        <div key={name}>
          <label className="block text-cyan-300 mb-1">
            {name.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())}
          </label>
          <input
            name={name}
            value={form[name as keyof ProjectData]||""}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-cyan-400 rounded"
          />
        </div>
      ))}

      {/* Errors */}
      {Object.keys(errors).length > 0 && (
        <div className="text-red-400 space-y-1">
          {Object.entries(errors).map(([field,msgs]) => (
            <p key={field}>
              <strong>{field}:</strong> {Array.isArray(msgs)?msgs.join(", "):msgs}
            </p>
          ))}
        </div>
      )}

      {/* Actions */}
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
    </form>
  );
}
