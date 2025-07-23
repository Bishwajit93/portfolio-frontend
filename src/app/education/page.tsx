// src/app/education/page.tsx
"use client";

import { useState, useEffect } from "react";
import { fetchEducations, deleteEducation } from "@/lib/api/educationApi";
import { Education } from "@/types/education";
import { useAuth } from "@/context/AuthContext";
import AddEducationForm from "@/components/educationPageComponents/AddEducationForm";
import EditEducationForm from "@/components/educationPageComponents/EditEducationForm";

export default function EducationPage() {
  const { token } = useAuth();
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const loadEducations = async () => {
    setLoading(true);
    try {
      const data = await fetchEducations();
      setEducations(data);
    } catch (err) {
      console.error("Failed to load educations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this education?")) return;
    try {
      await deleteEducation(id);
      setEducations((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete education", err);
      alert("Could not delete education. See console for details.");
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Education</h1>

      {token && !addMode && editId === null && (
        <button
          onClick={() => setAddMode(true)}
          className="mb-6 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded shadow"
        >
          + Add New Education
        </button>
      )}

      {loading && <p>Loading...</p>}

      {addMode && token && (
        <AddEducationForm
          onEducationAdded={async () => {
            await loadEducations();
            setAddMode(false);
          }}
          onClose={() => setAddMode(false)}
        />
      )}

      {educations.length === 0 && !loading && <p>No education available.</p>}

      {educations.map((education) => (
        <div
          key={education.id}
          className="border p-6 mb-6 rounded-lg shadow bg-gray-800 text-gray-100"
        >
          {editId === education.id && token ? (
            <EditEducationForm
              education={education}
              onEducationUpdated={async () => {
                await loadEducations();
                setEditId(null);
              }}
              onClose={() => setEditId(null)}
            />
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-2">
                {education.institution_name}
              </h2>
              <p>
                <strong>Degree:</strong> {education.degree}
              </p>
              <p>
                <strong>Field:</strong> {education.field_of_study}
              </p>
              <p>
                <strong>Period:</strong> {education.start_date} -{" "}
                {education.end_date ?? "Present"}
              </p>
              <p>
                <strong>Grade:</strong> {education.grade}
              </p>
              <p className="mt-3">{education.description}</p>

              {token && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setEditId(education.id)}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(education.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </main>
  );
}
