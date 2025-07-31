"use client";

import { useState, useEffect, useRef } from "react";
import { updateSkill } from "@/lib/api/skillApi";
import { Skill, SkillData } from "@/types/skill";

type Props = {
  skill: Skill;
  onSkillUpdated: () => Promise<void>;
  onClose: () => void;
};

export default function EditSkillModal({ skill, onSkillUpdated, onClose }: Props) {
  const [form, setForm] = useState<SkillData>({
    name: skill.name || "",
    level: skill.level || "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});
  const [saving, setSaving] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderError = (fieldName: string) => {
    const error = errors[fieldName];
    if (!error) return null;
    return (
      <p className="text-red-400 text-xs mt-1">
        {Array.isArray(error) ? error.join(", ") : error}
      </p>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSkill(skill.id, form);
      await onSkillUpdated();
      onClose();
    } catch (err: unknown) {
      console.error("Error updating skill:", err);
      setErrors(err as { [key: string]: string | string[] });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-[#0a0a0a] p-6 rounded-xl border border-cyan-400 
                   shadow-[0_0_25px_rgba(0,255,255,0.3)] w-full max-w-md"
      >
        <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Edit Skill</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Skill Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black border border-cyan-400/40 text-cyan-100 
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              className="w-full p-2 rounded bg-black border border-cyan-400/40 text-cyan-100 
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
