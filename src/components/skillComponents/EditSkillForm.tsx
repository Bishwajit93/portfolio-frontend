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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl mb-4 font-semibold text-gray-100">Edit Skill</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Skill Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {renderError("level")}
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
