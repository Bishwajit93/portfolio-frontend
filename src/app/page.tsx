"use client";

import { useState, useEffect } from "react";
import { fetchSkills, deleteSkill } from "@/lib/api/skillApi";
import { Skill } from "@/types/skill";
import AddSkillForm from "@/components/skillComponents/AddSkillForm";
import EditSkillModal from "@/components/skillComponents/EditSkillForm";

export default function AboutPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await fetchSkills();
      setSkills(data);
    } catch (err) {
      console.error("Failed to load skills", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id);
      await loadSkills();
    } catch (err) {
      console.error("Failed to delete skill", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">About Me</h1>

      <section className="mt-8">
        <h2 className="text-2xl mb-4">My Skills</h2>

        {addMode ? (
          <AddSkillForm
            onSkillAdded={async () => {
              await loadSkills();
              setAddMode(false);
            }}
            onClose={() => setAddMode(false)}
          />
        ) : (
          <button
            onClick={() => setAddMode(true)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add New Skill
          </button>
        )}

        {loading ? (
          <p>Loading skills...</p>
        ) : skills.length === 0 ? (
          <p>No skills found.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded bg-gray-800 border border-gray-600 text-white shadow w-full max-w-xs"
              >
                <div>{skill.name} - {skill.level}</div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setEditId(skill.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>

                {editId === skill.id && (
                  <EditSkillModal
                    skill={skill}
                    onSkillUpdated={async () => {
                      await loadSkills();
                      setEditId(null);
                    }}
                    onClose={() => setEditId(null)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
