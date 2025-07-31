"use client"

import { useEffect, useState } from "react";
import { fetchSkills, deleteSkill} from "@/lib/api/skillApi";
import { Skill } from "@/types/skill";
import { useAuth } from "@/context/AuthContext";
import AddSkillForm from "@/components/skillComponents/AddSkillForm";
import EditSkillModal from "@/components/skillComponents/EditSkillForm";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";

export default function AboutPage() {
  const { token } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteSkillId, setDeleteSkillId] = useState<number | null>(null);

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

  const handleDeleteConfirmed = async () => {
    if (deleteSkillId === null) return;
    try {
      await deleteSkill(deleteSkillId);
      setSkills(prev => prev.filter(s => s.id !== deleteSkillId));
    } catch (err) {
      console.error("Failed to delete skill", err);
      alert("Could not delete skill. See console for details.");
    } finally {
      setDeleteSkillId(null);
    }
  };

  const handleSkillUpdated = async (updated: Skill) => {
    setSkills(prev =>
      prev.map(s => (s.id === updated.id ? updated : s))
    );
    setEditId(null);
  };

  return (
    <main className="min-h-screen text-white pt-[100px] pb-[60px] px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-cyan-400">
          About Me
        </h1>

        <p className="text-lg md:text-xl text-cyan-200 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          I am a passionate and determined full-stack developer with a strong foundation in web technologies. I enjoy solving problems, building sleek user interfaces, and ensuring clean, scalable backend logic. Whether it is a small business app or a personal creative project, I always strive to deliver elegant solutions with full dedication and continuous learning.
        </p>

        <h2 className="text-3xl md:text-4xl text-cyan-300 font-semibold mb-8 text-center">
          My Skills
        </h2>

        {token && !addMode && editId === null && (
          <div className="text-center mb-8">
            <button
              onClick={() => setAddMode(true)}
              className="px-6 py-2 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
              shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
              hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] cursor-pointer transition-all duration-300"
            >
              + Add Skill
            </button>
          </div>
        )}

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
          <p className="text-center text-gray-400">Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="text-center text-gray-400">No skills found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="relative p-6 border border-cyan-400/30 rounded-xl bg-black text-white 
                shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] 
                transition duration-500 group"
              >
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                  {skill.name}
                </h3>
                <p className="text-gray-300 mb-3">
                  <strong>Level:</strong> {skill.level}
                </p>

                {token && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditId(skill.id)}
                      className="px-4 py-1.5 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md 
                      shadow-[0_0_6px_rgba(0,255,255,0.4)] hover:bg-cyan-500/10 
                      hover:text-white hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteSkillId(skill.id)}
                      className="px-4 py-1.5 text-sm font-semibold text-red-400 border border-red-500 rounded-md 
                      shadow-[0_0_6px_rgba(255,0,0,0.3)] hover:bg-red-600 
                      hover:text-black hover:shadow-[0_0_10px_rgba(255,0,0,0.6)] transition-all duration-300 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {editId === skill.id && token && (
                  <EditSkillModal
                    skill={skill}
                    onSkillUpdated={async () => {
                      const updated = await fetchSkills().then(data =>
                        data.find(s => s.id === skill.id)
                      );
                      if (updated) await handleSkillUpdated(updated);
                    }}
                    onClose={() => setEditId(null)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        {deleteSkillId !== null && (
          <DeleteConfirmationModal
            message="Are you sure you want to delete this skill?"
            onConfirm={handleDeleteConfirmed}
            onCancel={() => setDeleteSkillId(null)}
          />
        )}
      </div>
    </main>
  );
}
