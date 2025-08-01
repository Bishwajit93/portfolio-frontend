"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumePage() {
  const [lang, setLang] = useState<"en" | "de">("en");

  const downloadPDF = async () => {
    const input = document.getElementById("resume-pdf");
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
    pdf.addImage(imgData, "PNG", 20, 20, 555, 780);
    pdf.save(`Resume_Bishwajit_Karmaker_${lang.toUpperCase()}.pdf`);
  };

  const info = {
    name: "Bishwajit Karmaker",
    location: "Berlin, Germany",
    phone: "+49 1556 6062930",
    email: "contact@abdullahstack.com",
    website: "https://abdullahstack.com",
    linkedin: "https://www.linkedin.com/in/bishwajit-karmaker/",
    github: "https://github.com/Bishwajit93",
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <div className="flex gap-4">
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-1 text-sm rounded border border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-300 ${lang === "en" ? "bg-cyan-500/20" : ""}`}
            style={{ cursor: "pointer", boxShadow: "0 0 8px rgba(0,255,255,0.4)" }}
          >
            English
          </button>
          <button
            onClick={() => setLang("de")}
            className={`px-4 py-1 text-sm rounded border border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-300 ${lang === "de" ? "bg-cyan-500/20" : ""}`}
            style={{ cursor: "pointer", boxShadow: "0 0 8px rgba(0,255,255,0.4)" }}
          >
            Deutsch
          </button>
        </div>
        <button
          onClick={downloadPDF}
          className="text-sm px-4 py-2 font-semibold text-cyan-300 border border-cyan-400 rounded-md transition-all duration-300 hover:bg-cyan-500/10 hover:text-white"
          style={{ cursor: "pointer", boxShadow: "0 0 8px rgba(0,255,255,0.4)" }}
        >
          Download PDF
        </button>
      </div>

      <div id="resume-pdf" className="max-w-4xl mx-auto border border-cyan-400 rounded-xl p-6" style={{ boxShadow: "0 0 15px rgba(0,255,255,0.3)" }}>
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 text-center">{info.name}</h1>
        <p className="text-center text-cyan-200 text-sm mb-6">
          {info.location} • {info.phone} • {info.email}<br />
          <a href={info.website} target="_blank" className="text-blue-400 underline">abdullahstack.com</a> •{" "}
          <a href={info.linkedin} target="_blank" className="text-blue-400 underline">LinkedIn</a> •{" "}
          <a href={info.github} target="_blank" className="text-blue-400 underline">GitHub</a>
        </p>

        {lang === "en" ? (
          <>
            <Section title="Professional Summary">
              <p>Self-taught full-stack developer with practical experience building web applications using Django, PostgreSQL, React, Next.js, and Tailwind CSS. Focused on clean code, functional features, and continuous learning. Transitioning from retail to tech, bringing strong discipline, teamwork, and real-world experience.</p>
            </Section>

            <Section title="Technical Skills">
              <p><strong>Languages & Frameworks:</strong> Python (Intermediate), JavaScript (Basic), TypeScript (Beginner), Django, DRF, React, Next.js</p>
              <p><strong>Tools & Platforms:</strong> Git, GitHub, VS Code, Railway, Vercel, Resend API, SAP (Basic), Ubuntu Server</p>
              <p><strong>Backend & Database:</strong> PostgreSQL, SQLite, REST APIs, JWT Auth</p>
              <p><strong>Frontend & Styling:</strong> HTML, CSS, Tailwind CSS, Responsive Design</p>
            </Section>

            <Section title="Projects">
              <p><strong>2024 Portfolio Website:</strong> Full-stack personal portfolio built with Django, PostgreSQL, React, Next.js, and Tailwind CSS. Includes authentication (JWT), CRUD features, Resend API integration, and a fully responsive dark-themed UI.</p>
              <p>Live: <a href={info.website} className="text-blue-400 underline" target="_blank">abdullahstack.com</a></p>
            </Section>

            <Section title="Certifications">
              <p>2021 Full-Stack Web Development Bootcamp — Covered HTML, CSS, JavaScript, React, and backend principles. Built the foundation for Django and PostgreSQL skills.</p>
            </Section>

            <Section title="Education">
              <p><strong>2013–2018</strong> BSc in Mathematics, BRAC University, Dhaka, Bangladesh</p>
              <p><strong>2021–2025</strong> MSc (Not Completed), Technische Universität Berlin</p>
              <p className="text-gray-400">Initially studied at Hochschule Mittweida and TU Kaiserslautern, later transferred to TU Berlin. Shifted focus to full-time practical development.</p>
            </Section>

            <Section title="Work Experience">
              <p><strong>2024–Present</strong> Warehouse Associate, Intersport, Berlin, Germany</p>
              <p>Managed inventory and logistics using SAP; assisted customers on the sales floor; strong teamwork and responsibility.</p>

              <p><strong>2021–2022</strong> Warehouse Associate, Flink, Berlin, Germany</p>
              <p>Assisted with order picking, inventory organization, and product restocking in a fast-paced warehouse environment.</p>

              <p><strong>2019–2023</strong> Kitchen Assistant, Various Restaurants, Germany</p>
              <p>Worked in fast-paced kitchens supporting food preparation and hygiene. Built discipline, stress management, and teamwork.</p>
            </Section>

            <Section title="Languages">
              <p>English – Fluent</p>
              <p>German – Conversational (above basic)</p>
            </Section>

            <Section title="Personal Qualities">
              <ul className="list-disc pl-5">
                <li>Strong sense of responsibility and reliability</li>
                <li>Friendly, respectful, and team-oriented</li>
                <li>Open-minded and always willing to learn</li>
                <li>Calm under pressure and honest communicator</li>
                <li>Motivated by purpose, not just performance</li>
              </ul>
            </Section>

            <Section title="Note">
              <p>This CV and portfolio site were fully self-built, maintained, and deployed by me as part of my personal and professional growth journey.</p>
            </Section>
          </>
        ) : (
          <>
            <Section title="Profil">
              <p>Autodidaktischer Full-Stack-Webentwickler mit praktischer Erfahrung in der Erstellung von Webanwendungen mit Django, PostgreSQL, React, Next.js und Tailwind CSS. Fokus auf sauberem Code, funktionale Features und kontinuierliches Lernen. Ich wechsle derzeit vom Einzelhandel in die Tech-Branche und bringe Disziplin, Teamgeist und reale Lebenserfahrung mit.</p>
            </Section>

            <Section title="Technische Kenntnisse">
              <p><strong>Sprachen & Frameworks:</strong> Python (Fortgeschritten), JavaScript (Grundkenntnisse), TypeScript (Einsteiger), Django, DRF, React, Next.js</p>
              <p><strong>Tools & Plattformen:</strong> Git, GitHub, VS Code, Railway, Vercel, Resend API, SAP (Grundkenntnisse), Ubuntu Server</p>
              <p><strong>Backend & Datenbanken:</strong> PostgreSQL, SQLite, REST-APIs, JWT-Authentifizierung</p>
              <p><strong>Frontend & Design:</strong> HTML, CSS, Tailwind CSS, Responsives Design</p>
            </Section>

            <Section title="Projekte">
              <p><strong>2024 Portfolio-Website:</strong> Vollständige persönliche Portfolio-Website mit Django, PostgreSQL, React, Next.js und Tailwind CSS. Beinhaltet Authentifizierung (JWT), CRUD-Funktionen, E-Mail-Integration (Resend API) und ein responsives, dunkles UI-Design.</p>
              <p>Live: <a href={info.website} className="text-blue-400 underline" target="_blank">abdullahstack.com</a></p>
            </Section>

            <Section title="Zertifikate">
              <p>2021 Full-Stack Webentwicklungs-Bootcamp – Inhalte: HTML, CSS, JavaScript, React und Backend-Grundlagen.</p>
            </Section>

            <Section title="Ausbildung">
              <p><strong>2013–2018</strong> BSc in Mathematik, BRAC University, Dhaka, Bangladesch</p>
              <p><strong>2021–2025</strong> MSc (nicht abgeschlossen), Technische Universität Berlin</p>
              <p className="text-gray-400">Studium begann an der Hochschule Mittweida und TU Kaiserslautern, später Wechsel zur TU Berlin. Fokus nun auf praxisorientierter Entwicklung.</p>
            </Section>

            <Section title="Berufserfahrung">
              <p><strong>2024–heute</strong> Lagerist, Intersport, Berlin, Deutschland</p>
              <p>Verwaltung von Lagerbeständen mit SAP; Kundenbetreuung auf der Verkaufsfläche; Teamarbeit und Verantwortungsbewusstsein.</p>

              <p><strong>2021–2022</strong> Lagerhelfer, Flink, Berlin, Deutschland</p>
              <p>Kommissionierung, Lagerorganisation, Produktauffüllung im schnelllebigen Lagerumfeld.</p>

              <p><strong>2019–2023</strong> Küchenhilfe, Verschiedene Restaurants, Deutschland</p>
              <p>Essensvorbereitung, Hygiene, Zusammenarbeit in hektischer Umgebung.</p>
            </Section>

            <Section title="Sprachen">
              <p>Englisch – Fließend</p>
              <p>Deutsch – Konversationssicher</p>
            </Section>

            <Section title="Persönliche Eigenschaften">
              <ul className="list-disc pl-5">
                <li>Hohes Verantwortungsbewusstsein und Zuverlässigkeit</li>
                <li>Freundlich, respektvoll und teamfähig</li>
                <li>Lernbereit und offen für Feedback</li>
                <li>Belastbar und ruhig in Stresssituationen</li>
                <li>Motiviert durch Sinn, nicht nur durch Leistung</li>
              </ul>
            </Section>

            <Section title="Hinweis">
              <p>Dieser Lebenslauf sowie die Portfolio-Website wurden vollständig von mir selbst erstellt, gepflegt und bereitgestellt – als Teil meines persönlichen und beruflichen Entwicklungsweges.</p>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl text-cyan-300 font-semibold mb-2">{title}</h2>
      <div className="text-sm text-white space-y-1">{children}</div>
    </div>
  );
}
