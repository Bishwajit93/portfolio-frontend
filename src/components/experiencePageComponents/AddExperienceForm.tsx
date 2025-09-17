"use client";

import { useState } from "react";
import { createExperience } from "@/lib/api/experienceApi";
import { ExperienceData } from "@/types/experience";

type Props = {
  onExperienceAdded: () => Promise<void>;
  onClose: () => void;
};

export default function AddExperienceForm({ onExperienceAdded, onClose }: Props) {
  const [form, setForm] = useState<ExperienceData>({
    company_name: "",
    job_title: "",
    start_date: "",
    end_date: null,
    still_working: false,
    description: "",
    location: ""
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && name === "still_working") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({
        ...form,
        still_working: checked,
        end_date: checked ? null : form.end_date,  // ✅ clear end_date if still working
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      await createExperience(form);
      await onExperienceAdded();
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
        {saving ? "Saving..." : "Add Experience"}
      </h2>

      <div className="space-y-5">
        {/* Company Name */}
        <div>
          <label className="block mb-1 text-cyan-300">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block mb-1 text-cyan-300">Job Title</label>
          <input
            type="text"
            name="job_title"
            value={form.job_title}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 text-cyan-300">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-black border border-cyan-400/40 text-cyan-100 focus:outline-none"
          />
        </div>

        {/* End Date + Still Working */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-cyan-300">End Date</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="still_working"
                checked={form.still_working}
                onChange={handleChange}
                className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
                  placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
                  focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
              />
              <span className="text-cyan-300 text-sm">Still Working</span>
            </div>
          </div>
          <input
            type="date"
            name="end_date"
            value={form.end_date || ""}
            onChange={handleChange}
            disabled={form.still_working}
            className={`w-full p-3 rounded-md bg-black border border-cyan-400/40 text-cyan-100 focus:outline-none ${
              form.still_working ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 text-cyan-300">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
              placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
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
            className="w-full p-2 rounded bg-zinc-800 text-white font-sans text-sm font-light 
              placeholder-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
          />
        </div>

        {/* Error Display */}
        {Object.entries(errors).length > 0 && (
          <div className="text-red-400 text-sm">
            {Object.entries(errors).map(([k, v]) => (
              <p key={k}>{k}: {Array.isArray(v) ? v.join(", ") : v}</p>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3 border border-cyan-400 text-cyan-300 rounded-md 
            shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
            hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
          >
            {saving ? "Saving..." : "Save"}
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
