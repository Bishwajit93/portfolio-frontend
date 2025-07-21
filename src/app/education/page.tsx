"use client";

import { useState, useEffect } from "react";
import { fetchEducations, deleteEducation } from "@/lib/api/educationApi";
import { Education } from "@/types/education";
import AddEducationForm from "@/components/educationPageComponents/AddEducationForm";
import EditEducationForm from "@/components/educationPageComponents/EditEducationForm";

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Load educations on component mount
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

  // Handle delete education
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this education?")) return;
    try {
      await deleteEducation(id);
      await loadEducations();
    } catch (err) {
      console.error("Failed to delete education", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Education</h1>

      {/* Add Education Form or Button */}
      {addMode ? (
        <AddEducationForm
          onEducationAdded={loadEducations}
          onClose={() => setAddMode(false)}
        />
      ) : (
        <button
          onClick={() => setAddMode(true)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add New Education
        </button>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {educations.length === 0 ? (
            <p>No education available.</p> // No education available message
          ) : (
            educations.map((education) => (
              <div
                key={education.id}
                className="border p-4 mb-4 rounded shadow"
              >
                {editId === education.id ? (
                  <EditEducationForm
                    education={education}
                    onEducationUpdated={loadEducations}
                    onClose={() => setEditId(null)}
                  />
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {education.institution_name}
                    </h2>
                    <p><strong>Degree:</strong> {education.degree}</p>
                    <p><strong>Field:</strong> {education.field_of_study}</p>
                    <p><strong>Period:</strong> {education.start_date} - {education.end_date ?? "Present"}</p>
                    <p><strong>Grade:</strong> {education.grade}</p>
                    <p><strong>Description:</strong> {education.description}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => setEditId(education.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(education.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
