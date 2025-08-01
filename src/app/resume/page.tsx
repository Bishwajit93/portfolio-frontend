"use client";

import { useState } from "react";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";



export default function ResumePage() {
  const [lang, setLang] = useState<"en" | "de">("en");

  const info = {
    name: "Bishwajit Karmaker",
    title: "Full-Stack Web Developer",
    location: "Berlin, Germany",
    phone: "+49 1556 6062930",
    email: "contact@abdullahstack.com",
    website: "https://abdullahstack.com",
    linkedin: "https://www.linkedin.com/in/bishwajit-karmaker/",
    github: "https://github.com/Bishwajit93",
  };

  const isGerman = lang === "de";

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      {/* Header Buttons */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        {/* Toggle */}
        <div className="flex gap-2 ">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 text-sm rounded border border-cyan-400 cursor-pointer ${
              lang === "en" ? "bg-cyan-600 text-white" : "text-cyan-300"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang("de")}
            className={`px-3 py-1 text-sm rounded border border-cyan-400 cursor-pointer ${
              lang === "de" ? "bg-cyan-600 text-white" : "text-cyan-300"
            }`}
          >
            Deutsch
          </button>
        </div>

        {/* Download PDF */}
        <ResumeDownloadButton lang={lang} />
      </div>

      {/* CV Preview */}
      <div className="max-w-4xl mx-auto border border-cyan-400 rounded-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{info.name}</h1>
          <h2 className="text-sm text-cyan-300 mb-2">{info.title}</h2>
          <p className="text-cyan-200 text-xs">
            {info.location} • {info.phone} • {info.email}
            <br />
            <a href={info.website} className="underline text-blue-400" target="_blank">abdullahstack.com</a> •{" "}
            <a href={info.linkedin} className="underline text-blue-400" target="_blank">LinkedIn</a> •{" "}
            <a href={info.github} className="underline text-blue-400" target="_blank">GitHub</a>
          </p>
        </div>

        {/* CV Content */}
        <Section title={isGerman ? "Profil" : "Professional Summary"}>
          <p>
            {isGerman
              ? "Autodidaktischer Full-Stack-Webentwickler mit praktischer Erfahrung in der Erstellung von Webanwendungen mit Django, PostgreSQL, React, Next.js und Tailwind CSS. Fokus auf sauberem Code, funktionale Features und kontinuierliches Lernen. Ich wechsle derzeit vom Einzelhandel in die Tech-Branche und bringe Disziplin, Teamgeist und reale Lebenserfahrung mit."
              : "Self-taught full-stack developer with practical experience building web applications using Django, PostgreSQL, React, Next.js, and Tailwind CSS. Focused on clean code, functional features, and continuous learning. Transitioning from retail to tech, bringing strong discipline, teamwork, and real-world experience."}
          </p>
        </Section>

        <Section title={isGerman ? "Technische Kenntnisse" : "Technical Skills"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="text-cyan-300 font-semibold mb-1">{isGerman ? "Sprachen & Frameworks" : "Languages & Frameworks"}</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>{isGerman ? "Python (Fortgeschritten)" : "Python (Intermediate)"}</li>
                <li>{isGerman ? "JavaScript (Grundkenntnisse), TypeScript (Einsteiger)" : "JavaScript (Basic), TypeScript (Beginner)"}</li>
                <li>Django, DRF, React, Next.js</li>
              </ul>
              <h4 className="text-cyan-300 font-semibold mt-4 mb-1">{isGerman ? "Tools & Plattformen" : "Tools & Platforms"}</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Git, GitHub, VS Code</li>
                <li>Railway, Vercel, Resend API</li>
                <li>{isGerman ? "SAP (Grundkenntnisse)" : "SAP (Basic)"}, Ubuntu Server</li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-300 font-semibold mb-1">{isGerman ? "Backend & Datenbanken" : "Backend & Database"}</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>PostgreSQL, SQLite</li>
                <li>{isGerman ? "REST-APIs, JWT-Authentifizierung" : "REST APIs, JWT Auth"}</li>
              </ul>
              <h4 className="text-cyan-300 font-semibold mt-4 mb-1">{isGerman ? "Frontend & Design" : "Frontend & Styling"}</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>HTML, CSS, Tailwind CSS</li>
                <li>{isGerman ? "Responsives Design" : "Responsive Design"}</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title={isGerman ? "Projekte" : "Projects"}>
          <p className="text-sm">
            <strong>{isGerman ? "2024 – Portfolio-Website" : "2024 – Portfolio Website"}:</strong>{" "}
            {isGerman
              ? "Vollständige persönliche Portfolio-Website mit Django, PostgreSQL, React, Next.js und Tailwind CSS. Beinhaltet Authentifizierung (JWT), CRUD-Funktionen, E-Mail-Integration (Resend API) und ein responsives, dunkles UI-Design."
              : "Full-stack personal portfolio built with Django, PostgreSQL, React, Next.js, and Tailwind CSS. Includes authentication (JWT), CRUD features, Resend API integration, and a fully responsive dark-themed UI."}
            <br />
            <a href={info.website} target="_blank" className="underline text-blue-400">Live: abdullahstack.com</a>
          </p>
        </Section>

        <Section title={isGerman ? "Zertifikate" : "Certifications"}>
          <p className="text-sm">
            {isGerman
              ? "2021 Full-Stack Webentwicklungs-Bootcamp – Inhalte: HTML, CSS, JavaScript, React und Backend-Grundlagen. Legte das Fundament für meine Kenntnisse in Django und PostgreSQL."
              : "2021 Full-Stack Web Development Bootcamp — Covered HTML, CSS, JavaScript, React, and backend principles. Built the foundation for Django and PostgreSQL skills."}
          </p>
        </Section>

        <Section title={isGerman ? "Ausbildung" : "Education"}>
          <ul className="list-disc pl-4 space-y-2 text-sm">
            <li>
              <strong>2013–2018:</strong> {isGerman ? "BSc in Mathematik, BRAC University, Dhaka" : "BSc in Mathematics, BRAC University, Dhaka"}<br />
              {isGerman ? "Starke Grundlagen in Logik und strukturiertem Problemlösen." : "Strong foundation in logic and structured problem-solving."}
            </li>
            <li>
              <strong>2021–2025:</strong> {isGerman ? "MSc (nicht abgeschlossen), TU Berlin" : "MSc (Not Completed), TU Berlin"}<br />
              {isGerman ? "Studium begann an der Hochschule Mittweida und TU Kaiserslautern, später Wechsel zur TU Berlin. Fokus nun auf praxisorientierter Entwicklung." : "Initially studied at Hochschule Mittweida and TU Kaiserslautern, later transferred to TU Berlin. Shifted focus to full-time practical development."}
            </li>
          </ul>
        </Section>

        <Section title={isGerman ? "Berufserfahrung" : "Work Experience"}>
          <ul className="list-disc pl-4 space-y-4 text-sm">
            <li>
              <strong>{isGerman ? "2024–heute: Lagerist, Intersport, Berlin" : "2024–Present: Warehouse Associate, Intersport, Berlin"}</strong><br />
              {isGerman ? "Verwaltung von Lagerbeständen mit SAP; Kundenbetreuung; Teamarbeit und Verantwortungsbewusstsein." : "Managed inventory and logistics using SAP; assisted customers on the sales floor; strong teamwork and responsibility."}
            </li>
            <li>
              <strong>{isGerman ? "2021–2022: Lagerhelfer, Flink, Berlin" : "2021–2022: Warehouse Associate, Flink, Berlin"}</strong><br />
              {isGerman ? "Kommissionierung, Lagerorganisation, Produktauffüllung, Einhaltung von Sicherheitsvorgaben, Teamarbeit." : "Assisted with order picking, inventory organization, and product restocking. Maintained cleanliness and safety procedures."}
            </li>
            <li>
              <strong>{isGerman ? "2019–2023: Küchenhilfe, Restaurants" : "2019–2023: Kitchen Assistant, Various Restaurants"}</strong><br />
              {isGerman ? "Vorbereitung, Hygiene, Zusammenarbeit im Küchenteam." : "Worked in fast-paced kitchens supporting food preparation and hygiene. Built discipline and teamwork."}
            </li>
          </ul>
        </Section>

        <Section title={isGerman ? "Sprachen" : "Languages"}>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>{isGerman ? "Englisch – Fließend" : "English – Fluent"}</li>
            <li>{isGerman ? "Deutsch – Konversationssicher" : "German – Conversational"}</li>
          </ul>
        </Section>

        <Section title={isGerman ? "Persönliche Eigenschaften" : "Personal Qualities"}>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>{isGerman ? "Hohes Verantwortungsbewusstsein und Zuverlässigkeit" : "Strong sense of responsibility and reliability"}</li>
            <li>{isGerman ? "Freundlich, respektvoll und teamfähig" : "Friendly, respectful, and team-oriented"}</li>
            <li>{isGerman ? "Lernbereit und offen für Feedback" : "Open-minded and always willing to learn"}</li>
            <li>{isGerman ? "Belastbar in Stresssituationen" : "Calm under pressure and honest communicator"}</li>
            <li>{isGerman ? "Motiviert durch Sinn, nicht nur Leistung" : "Motivated by purpose, not just performance"}</li>
          </ul>
        </Section>

        <Section title={isGerman ? "Hinweis" : "Note"}>
          <p className="text-sm">
            {isGerman
              ? "Dieser Lebenslauf sowie die Portfolio-Website wurden vollständig von mir selbst erstellt, gepflegt und bereitgestellt – als Teil meines persönlichen und beruflichen Entwicklungsweges."
              : "This CV and portfolio site were fully self-built, maintained, and deployed by me as part of my personal and professional growth journey."}
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">{title}</h3>
      <div>{children}</div>
    </section>
  );
}
