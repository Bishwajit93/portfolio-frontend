// src/app/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import { fetchSkills, deleteSkill } from "@/lib/api/skillApi";
import { Skill } from "@/types/skill";
import { useAuth } from "@/context/AuthContext";
import AddSkillForm from "@/components/skillComponents/AddSkillForm";
import EditSkillModal from "@/components/skillComponents/EditSkillForm";

export default function AboutPage() {
  const { token } = useAuth();    // ← pull token from context
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Load skills on component mount
  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await fetchSkills();  // public endpoint
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

  // Handle delete skill
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id);  // requires token
      await loadSkills();
    } catch (err) {
      console.error("Failed to delete skill", err);
      alert("Could not delete skill. See console for details.");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl mb-6">About Me</h1>

      <section className="mt-8">
        <h2 className="text-2xl mb-4">My Skills</h2>

        {/* + Add button only for logged-in user */}
        {token && !addMode && editId === null && (
          <button
            onClick={() => setAddMode(true)}
            className="mb-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded shadow"
          >
            + Add New Skill
          </button>
        )}

        {/* Add form modal */}
        {addMode && token && (
          <AddSkillForm
            onSkillAdded={async () => {
              await loadSkills();
              setAddMode(false);
            }}
            onClose={() => setAddMode(false)}
          />
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
                <div>
                  {skill.name} — {skill.level}
                </div>

                {/* Edit/Delete only for logged-in user */}
                {token && (
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setEditId(skill.id)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-400 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* Edit modal */}
                {editId === skill.id && token && (
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
    </main>
  );
}
