"use client";

import { useState } from "react";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";

export default function ResumePage() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const isGerman = lang === "de";

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      {/* Header Buttons */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        {/* Toggle */}
        <div className="flex gap-2">
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

      {/* CV Content */}
      <div className="max-w-4xl mx-auto border border-cyan-400 rounded-xl p-6 space-y-8 shadow-[0_0_25px_rgba(0,255,255,0.3)]">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">
            Bishwajit Karmaker
          </h1>
          <h2 className="text-sm text-cyan-300 mb-2">
            {isGerman
              ? "Junior Full-Stack Webentwickler"
              : "Junior Full-Stack Developer"}
          </h2>
          <p className="text-cyan-200 text-xs md:text-sm">
            Berlin, {isGerman ? "Deutschland" : "Germany"} • +49 1556 6062930 •
            contact@abdullahstack.com
            <br />
            <a
              href="https://abdullahstack.com"
              target="_blank"
              className="underline text-blue-400"
            >
              abdullahstack.com
            </a>{" "}
            •{" "}
            <a
              href="https://github.com/Bishwajit93"
              target="_blank"
              className="underline text-blue-400"
            >
              GitHub
            </a>{" "}
            •{" "}
            <a
              href="https://www.linkedin.com/in/bishwajit-karmaker/"
              target="_blank"
              className="underline text-blue-400"
            >
              LinkedIn
            </a>
          </p>
        </div>

        {/* Profile */}
        <Section title={isGerman ? "Profil" : "Profile"}>
          {isGerman
            ? "Autodidaktischer Full-Stack-Webentwickler mit praktischer Erfahrung in Django, Next.js, Tailwind CSS und PostgreSQL. Fokus auf sauberen Code, funktionale Features und kontinuierliches Lernen. Umsetzung mehrerer realer Projekte mit End-to-End-Verantwortung, einschließlich Deployment und Dokumentation."
            : "Self-taught full-stack developer with practical experience in Django, Next.js, Tailwind CSS, and PostgreSQL. Focused on writing clean, maintainable code, delivering functional features, and continuous learning. Completed several real-world projects with end-to-end responsibility, including deployment and documentation."}
        </Section>

        {/* Projects */}
        <Section title={isGerman ? "Projekte" : "Projects"}>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-200">
            <li>
              <strong>
                {isGerman
                  ? "Portfolio Website (2025)"
                  : "Portfolio Website (2025)"}
                :
              </strong>{" "}
              {isGerman
                ? "Vollständige persönliche Portfolio-Website mit Django, PostgreSQL, Next.js und Tailwind CSS. Features: JWT-Authentifizierung, CRUD, Resend API für E-Mails, responsives Dark-UI."
                : "Full-stack personal portfolio built with Django, PostgreSQL, Next.js, and Tailwind CSS. Features: JWT authentication, CRUD operations, Resend API integration, fully responsive dark UI."}{" "}
              <a
                href="https://abdullahstack.com"
                target="_blank"
                className="underline text-blue-400"
              >
                Live
              </a>
            </li>
            <li>
              <strong>
                {isGerman
                  ? "Linda Art Gallery (2025)"
                  : "Linda Art Gallery (2025)"}
                :
              </strong>{" "}
              {isGerman
                ? "Individuelle Plattform für eine Berliner Künstlerin mit Galerie (Bilder/Videos), Kontaktformular für Preisabfragen, responsive Gestaltung. Backend mit Django REST, Frontend mit Next.js & Tailwind, Deployment über Vercel und Railway."
                : "Custom platform for a Berlin-based artist with image/video gallery, price request contact form, responsive design. Backend with Django REST, frontend with Next.js & Tailwind, deployed on Vercel & Railway."}
            </li>
          </ul>
        </Section>

        {/* Work Experience */}
        <Section title={isGerman ? "Berufserfahrung" : "Work Experience"}>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-200">
            <li>
              <strong>
                {isGerman
                  ? "2024–heute: Sport Voswinkel GmbH, Berlin"
                  : "2024–Present: Sport Voswinkel GmbH, Berlin"}
              </strong>{" "}
              —{" "}
              {isGerman
                ? "Kundenberatung, Lagerorganisation, SAP; effiziente Prozesse im Team und eigenständig."
                : "Customer service, inventory management, SAP usage; efficient processes in team-based and independent work."}
            </li>
            <li>
              <strong>
                {isGerman ? "2021–2022: Flink SE, Berlin" : "2021–2022: Flink SE, Berlin"}
              </strong>{" "}
              —{" "}
              {isGerman
                ? "Kommissionierung, Lagerorganisation, Produkthandling, Teamarbeit."
                : "Order picking, warehouse organization, product handling, teamwork."}
            </li>
            <li>
              <strong>
                {isGerman
                  ? "2019–2024: Küchenhilfe (Berlin)"
                  : "2019–2024: Kitchen Assistant (Berlin)"}
              </strong>{" "}
              —{" "}
              {isGerman
                ? "Unterstützung in Küche/Service, Hygiene und Schichtarbeit in multikulturellen Teams."
                : "Supported kitchen/service, maintained hygiene, worked shifts in multicultural teams."}
            </li>
          </ul>
        </Section>

        {/* Education */}
        <Section title={isGerman ? "Bildung" : "Education"}>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-200">
            <li>
              <strong>2013–2018:</strong>{" "}
              {isGerman
                ? "BSc in Mathematik, BRAC University, Dhaka"
                : "BSc in Mathematics, BRAC University, Dhaka"}{" "}
              —{" "}
              {isGerman
                ? "Starke Grundlagen in Logik und Problemlösung."
                : "Strong foundation in logic and problem-solving."}
            </li>
            <li>
              <strong>2021–2025:</strong>{" "}
              {isGerman
                ? "MSc Scientific Computing, TU Berlin (nicht abgeschlossen)"
                : "MSc Scientific Computing, TU Berlin (not completed)"}{" "}
              —{" "}
              {isGerman
                ? "Fokus auf Programmierung und angewandte Informatik, später Fokuswechsel auf Praxisprojekte."
                : "Focus on programming and applied computer science, later shifted fully to practical projects."}
            </li>
          </ul>
        </Section>

        {/* Certifications */}
        <Section title={isGerman ? "Zertifikate" : "Certifications"}>
          <p className="text-sm text-gray-200">
            {isGerman
              ? "2021 Full-Stack Webentwicklungs-Bootcamp – Inhalte: HTML, CSS, JavaScript, React und Backend-Grundlagen. Legte das Fundament für meine Kenntnisse in Django und PostgreSQL."
              : "2021 Full-Stack Web Development Bootcamp — Covered HTML, CSS, JavaScript, React, and backend fundamentals. Built the foundation for Django and PostgreSQL skills."}
          </p>
        </Section>

        {/* Skills */}
        <Section title={isGerman ? "Technische Kenntnisse" : "Technical Skills"}>
          <p className="text-sm text-gray-200">
            <strong>{isGerman ? "Sprachen" : "Languages"}:</strong> Python,
            JavaScript, TypeScript <br />
            <strong>{isGerman ? "Frameworks" : "Frameworks"}:</strong> Django,
            DRF, React, Next.js, Tailwind CSS <br />
            <strong>{isGerman ? "Datenbanken" : "Databases"}:</strong> PostgreSQL{" "}
            <br />
            <strong>{isGerman ? "Tools" : "Tools"}:</strong> Git/GitHub, Railway,
            Vercel, Bunny, SAP, Ubuntu, VS Code
          </p>
        </Section>

        {/* Languages */}
        <Section title={isGerman ? "Sprachen" : "Languages"}>
          <p className="text-sm text-gray-200">
            {isGerman ? "Englisch – Fließend" : "English – Fluent"} <br />
            {isGerman ? "Deutsch – Mittelstufe (B1/B2)" : "German – Intermediate (B1/B2)"}{" "}
            <br />
            {isGerman ? "Bengalisch – Muttersprache" : "Bengali – Native"}
          </p>
        </Section>

        {/* Personal Strengths */}
        <Section title={isGerman ? "Persönliche Stärken" : "Personal Strengths"}>
          <p className="text-sm text-gray-200">
            {isGerman
              ? "Teamfähigkeit • Zuverlässigkeit • Belastbarkeit • Selbstmotivation • Lernbereitschaft"
              : "Teamwork • Reliability • Resilience • Self-motivation • Willingness to learn"}
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">{title}</h3>
      <div>{children}</div>
    </section>
  );
}
