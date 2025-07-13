"use client";

import { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderError = (fieldName: string) => {
    const error = errors[fieldName];
    if (!error) return null;
    return (
      <p className="text-red-400 text-sm mb-2">
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
    <div className="p-4 rounded bg-gray-800 shadow-lg max-w-md mx-auto">
      <h2 className="text-xl mb-4 text-white">Add Skill</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Skill Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("name")}

        <input
          type="text"
          name="level"
          placeholder="Skill Level"
          value={form.level}
          onChange={handleChange}
          className="w-full mb-1 p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
        {renderError("level")}

        <div className="flex justify-between mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-600 rounded text-white">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
