"use client";

import { useEffect, useState } from "react";
import { fetchExperiences, deleteExperience } from "@/lib/api/experienceApi";
import type { Experience } from "@/types/experience";
import { useAuth } from "@/context/AuthContext";
import AddExperienceForm from "@/components/experiencePageComponents/AddExperienceForm";
import EditExperienceForm from "@/components/experiencePageComponents/EditExperienceForm";
import ExperienceModal from "@/components/experiencePageComponents/ExperienceModal";
import DeleteConfirmationModal from "@/components/experiencePageComponents/DeleteConfirmationModal";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";

export default function ExperiencePage() {
  const { token } = useAuth();
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Experience | null>(null);
  const [modal, setModal] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState<Experience | null>(null);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExperiences();
      setItems([...data].sort((a, b) => {
        if (a.still_working !== b.still_working) return a.still_working ? -1 : 1;
        return new Date(b.end_date || b.start_date).getTime() - new Date(a.end_date || a.start_date).getTime();
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load experience.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const remove = async () => {
    if (!deleting) return;
    try {
      await deleteExperience(deleting.id);
      setItems((current) => current.filter((item) => item.id !== deleting.id));
      setDeleting(null);
    } catch { alert("Could not delete experience. Check the console for details."); }
  };

  return (
    <AnimatedPageWrapper key="experience-v2">
      <main className="story-page">
        <header className="story-header">
          <p className="eyebrow">Experience</p>
          <h1>Work taught me<br />how to be dependable.</h1>
          <p>Software is now the craft. Reliability, process discipline, communication and ownership came first — and they still shape how I build.</p>
          {token && <button className="button button-ghost" onClick={() => { setAdding(true); setSelected(null); }}>+ Add experience</button>}
        </header>

        {loading && <div className="work-state">Loading experience…</div>}
        {error && <div className="work-state error">{error}</div>}
        {adding && token && <AddExperienceForm onExperienceAdded={async () => { await load(); setAdding(false); }} onClose={() => setAdding(false)} />}
        {selected && token && <EditExperienceForm experience={selected} onExperienceUpdated={async () => { await load(); setSelected(null); }} onClose={() => setSelected(null)} />}

        {!adding && !selected && items.length > 0 && (
          <section className="timeline-list">
            {items.map((item, index) => (
              <article key={item.id} className="timeline-entry" onClick={() => setModal(item)}>
                <div className="timeline-year">{String(index + 1).padStart(2, "0")}</div>
                <div className="timeline-role">
                  <div className="timeline-title"><h2>{item.job_title}</h2>{item.still_working && <span className="status-chip">Current</span>}</div>
                  <p className="timeline-company">{item.company_name} · {item.location}</p>
                  {item.description && <p className="timeline-description">{item.description}</p>}
                </div>
                <div className="timeline-period">{item.start_date}<span>→</span>{item.still_working ? "Present" : item.end_date || "—"}</div>
                {token && <div className="timeline-admin" onClick={(event) => event.stopPropagation()}><button onClick={() => setSelected(item)}>Edit</button><button onClick={() => setDeleting(item)}>Delete</button></div>}
              </article>
            ))}
          </section>
        )}

        {modal && <ExperienceModal experience={modal} onClose={() => setModal(null)} />}
        {deleting && <DeleteConfirmationModal message={`Are you sure you want to delete “${deleting.job_title}” at “${deleting.company_name}”?`} onConfirm={remove} onCancel={() => setDeleting(null)} />}
      </main>
    </AnimatedPageWrapper>
  );
}
