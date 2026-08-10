"use client";

import { useEffect, useState } from "react";
import { fetchEducations, deleteEducation } from "@/lib/api/educationApi";
import type { Education } from "@/types/education";
import { useAuth } from "@/context/AuthContext";
import AddEducationForm from "@/components/educationPageComponents/AddEducationForm";
import EditEducationForm from "@/components/educationPageComponents/EditEducationForm";
import EducationModal from "@/components/educationPageComponents/EducationModal";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";

export default function EducationPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Education | null>(null);
  const [modal, setModal] = useState<Education | null>(null);
  const [deleting, setDeleting] = useState<Education | null>(null);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchEducations();
      setItems([...data].sort((a, b) => new Date(b.end_date || b.start_date).getTime() - new Date(a.end_date || a.start_date).getTime()));
    } finally { setLoading(false); }
  };
  useEffect(() => { load().catch(console.error); }, []);

  const remove = async () => {
    if (!deleting) return;
    try {
      await deleteEducation(deleting.id);
      setItems((current) => current.filter((item) => item.id !== deleting.id));
      setDeleting(null);
    } catch { alert("Could not delete education. Check the console for details."); }
  };

  return (
    <AnimatedPageWrapper key="education-v2">
      <main className="story-page">
        <header className="story-header education-hero">
          <p className="eyebrow">Education</p>
          <h1>Mathematics trained<br />the way I think.</h1>
          <p>My academic background gave me a structured, analytical approach to ambiguity — useful long before a framework or programming language enters the picture.</p>
          {token && <button className="button button-ghost" onClick={() => { setAdding(true); setSelected(null); }}>+ Add education</button>}
        </header>

        {loading && <div className="work-state">Loading education…</div>}
        {adding && token && <AddEducationForm onEducationAdded={async () => { await load(); setAdding(false); }} onClose={() => setAdding(false)} />}
        {selected && token && <EditEducationForm education={selected} onEducationUpdated={async () => { await load(); setSelected(null); }} onClose={() => setSelected(null)} />}

        {!adding && !selected && items.length > 0 && (
          <section className="education-list">
            {items.map((item, index) => (
              <article key={item.id} className="education-entry" onClick={() => setModal(item)}>
                <div className="education-index">0{index + 1}</div>
                <div className="education-main"><p>{item.institution_name}</p><h2>{item.degree}</h2><span>{item.field_of_study}</span>{item.description && <p className="education-description">{item.description}</p>}</div>
                <div className="education-meta"><span>{item.start_date} — {item.end_date || "Present"}</span>{item.grade && <span>Grade · {item.grade}</span>}</div>
                {token && <div className="timeline-admin" onClick={(event) => event.stopPropagation()}><button onClick={() => setSelected(item)}>Edit</button><button onClick={() => setDeleting(item)}>Delete</button></div>}
              </article>
            ))}
          </section>
        )}

        {modal && <EducationModal education={modal} onClose={() => setModal(null)} />}
        {deleting && <DeleteConfirmationModal message={`Are you sure you want to delete “${deleting.degree}” at “${deleting.institution_name}”?`} onConfirm={remove} onCancel={() => setDeleting(null)} />}
      </main>
    </AnimatedPageWrapper>
  );
}
