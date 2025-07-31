// src/components/skillComponents/AddSkillForm.tsx
"use client";

import { useEffect, useState } from "react";
import { createSkill } from "@/lib/api/skillApi";
import { SkillData } from "@/types/skill";

type Props = {
  onSkillAdded: () => Promise<void>;
  onClose: () => void;
};

export default function AddSkillForm({ onSkillAdded, onClose }: Props) {
  const [form, setForm] = useState<SkillData>({
    name: "",
    level: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderError = (fieldName: string) => {
    const error = errors[fieldName];
    if (!error) return null;
    return (
      <p className="text-red-400 text-sm mt-1">
        {Array.isArray(error) ? error.join(", ") : error}
      </p>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createSkill(form);
      await onSkillAdded();
      onClose();
    } catch (err: unknown) {
      console.error("Error creating skill:", err);
      setErrors(err as { [key: string]: string | string[] });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-[#0a0a0a] rounded-xl border border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.4)] p-6">
        {/* Cyan border overlay */}
        <div className="absolute inset-0 rounded-xl border border-cyan-400/20 pointer-events-none z-0" />

        <h2 className="text-2xl font-bold text-cyan-300 mb-4 z-10 relative">Add Skill</h2>

        <form onSubmit={handleSubmit} className="z-10 relative space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Skill Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-black border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {renderError("name")}
          </div>
          <div>
            <input
              type="text"
              name="level"
              placeholder="Skill Level"
              value={form.level}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-black border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {renderError("level")}
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 border border-cyan-400 text-cyan-300 rounded-md 
              shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
              hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-red-500 text-red-400 rounded-md 
              shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 
              hover:text-black hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] cursor-pointer transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
