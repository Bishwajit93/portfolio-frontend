"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";

type Lang = "en" | "de";

export default function ResumePage() {
  const [lang, setLang] = useState<Lang>("en");
  const isGerman = lang === "de";

  return (
    <AnimatedPageWrapper key={`resume-${lang}`}>
      <main className="min-h-screen text-white pt-[40px] pb-[80px] px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          {/* === TOP BAR: BACK BUTTON === */}
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full
                border border-cyan-400/90 bg-cyan-500/20 text-[12px] md:text-sm text-cyan-50
                shadow-[0_0_16px_rgba(34,211,238,0.7)]
                hover:bg-cyan-500/30 hover:shadow-[0_0_24px_rgba(34,211,238,1)]
                transition cursor-pointer"
            >
              ← Back to About
            </Link>
          </div>

          {/* === HERO / HEADER === */}
          <section>
            <div className="hero-shell px-6 py-7 md:px-10 md:py-9">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left: Name + title + contact */}
                <div className="space-y-3">
                  <p className="text-[12px] uppercase tracking-[0.22em] text-cyan-200 drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]">
                    {isGerman ? "Lebenslauf" : "Resume"}
                  </p>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl text-cyan-50">
                    Bishwajit Karmaker
                  </h1>

                  <p className="text-sm md:text-base text-cyan-100/85">
                    {isGerman
                      ? "Full-Stack Webentwickler · Berlin, Deutschland"
                      : "Full-Stack Web Developer · Berlin, Germany"}
                  </p>

                  <p className="text-xs md:text-sm text-cyan-100/80 leading-relaxed">
                    Berlin · +49 1556 6062930 ·{" "}
                    <span className="text-cyan-200">
                      contact@abdullahstack.com
                    </span>{" "}
                    •{" "}
                    <br />
                    <a
                      href="https://abdullahstack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-cyan-300 hover:text-cyan-100"
                    >
                      abdullahstack.com
                    </a>{" "}
                    •{" "}
                    <a
                      href="https://github.com/Bishwajit93"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-cyan-300 hover:text-cyan-100"
                    >
                      GitHub
                    </a>{" "}
                    •{" "}
                    <a
                      href="https://www.linkedin.com/in/bishwajit-karmaker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-cyan-300 hover:text-cyan-100"
                    >
                      LinkedIn
                    </a>
                  </p>
                </div>

                {/* Right: language toggle only */}
                <div className="flex flex-col items-start md:items-end gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLang("en")}
                      className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full border text-xs md:text-sm transition
                        ${
                          lang === "en"
                            ? "border-cyan-400/90 bg-cyan-500/25 text-cyan-50 shadow-[0_0_16px_rgba(34,211,238,0.8)] cursor-pointer"
                            : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10 hover:text-white cursor-pointer"
                        }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLang("de")}
                      className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full border text-xs md:text-sm transition
                        ${
                          lang === "de"
                            ? "border-cyan-400/90 bg-cyan-500/25 text-cyan-50 shadow-[0_0_16px_rgba(34,211,238,0.8)] cursor-pointer"
                            : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10 hover:text-white cursor-pointer"
                        }`}
                    >
                      Deutsch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === DOWNLOAD BUTTON (CENTERED UNDER HERO) === */}
          <section className="flex justify-center">
            <ResumeDownloadButton lang={lang} />
          </section>

          {/* === BODY SECTIONS === */}
          <section className="space-y-6 md:space-y-7">
            {/* Profile */}
            <ResumeSection title={isGerman ? "Profil" : "Profile"}>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                {isGerman
                  ? "Autodidaktischer Full-Stack-Webentwickler mit Erfahrung in der Entwicklung, Bereitstellung und Wartung moderner Webanwendungen. Fundiertes Wissen in Django, Django REST Framework, Next.js, Tailwind CSS und PostgreSQL. Übernimmt Verantwortung für komplette Entwicklungsprozesse – von Konzeption über Backend- und Frontend-Entwicklung bis hin zum Deployment. Bringt Zuverlässigkeit, Lernbereitschaft und lösungsorientiertes Arbeiten aus langjähriger Berufserfahrung mit."
                  : "Self-taught full-stack web developer with strong experience in building, deploying, and maintaining modern web applications. Skilled in Django, Django REST Framework, Next.js, Tailwind CSS, and PostgreSQL. Able to take full ownership of projects from concept to production with focus on clean code, scalability, and user-friendly design, supported by years of professional work discipline."}
              </p>
            </ResumeSection>

            {/* Projects */}
            <ResumeSection title={isGerman ? "Projekte" : "Projects"}>
              <div className="space-y-4 text-sm text-cyan-100/90">
                <div>
                  <p className="text-[13px] text-cyan-200 mb-1">
                    <span className="font-semibold">
                      Portfolio Website (2025)
                    </span>
                    {" · "}
                    {isGerman ? "Eigenes Projekt" : "Personal project"}
                  </p>
                  <p className="leading-relaxed">
                    {isGerman
                      ? "Full-Stack-Portfolio mit Django, PostgreSQL, Next.js und Tailwind CSS. Enthält JWT-Authentifizierung, vollständige CRUD-Funktionen, Projekt- und Erfahrungsverwaltung sowie ein integriertes Kontaktformular mit der Resend API. Responsives Dark-UI, bereitgestellt über Vercel (Frontend) und Railway (Backend)."
                      : "Full-stack portfolio platform built with Django, PostgreSQL, Next.js, and Tailwind CSS. Includes JWT authentication, full CRUD features, project and experience management, and an integrated contact system using the Resend API. Fully responsive dark UI deployed via Vercel (frontend) and Railway (backend)."}
                  </p>
                  <p className="mt-1">
                    <span className="text-cyan-200">
                      {isGerman ? "Live:" : "Live:"}
                    </span>{" "}
                    <a
                      href="https://abdullahstack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-cyan-300 hover:text-cyan-100"
                    >
                      abdullahstack.com
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-cyan-200 mb-1">
                    <span className="font-semibold">
                      Linda Art Gallery (2025)
                    </span>
                    {" · "}
                    {isGerman
                      ? "Portfolio-Plattform für eine Berliner Künstlerin"
                      : "Custom portfolio platform for a Berlin-based artist"}
                  </p>
                  <p className="leading-relaxed">
                    {isGerman
                      ? "Individuelle Kunstgalerie- und Portfolio-Plattform mit dynamischer Bild- und Videodarstellung, Preisanfrageformular mit automatisierten E-Mails, responsivem Layout und JWT-basierter Authentifizierung. Backend mit Django REST Framework, Frontend mit Next.js und Tailwind CSS, Deployment über Vercel und Railway."
                      : "Custom gallery and portfolio platform featuring dynamic image and video presentation, artwork inquiry form with automated emails, responsive layout, and JWT-based authentication. Backend built with Django REST Framework, frontend with Next.js and Tailwind CSS, deployed via Vercel and Railway."}
                  </p>
                </div>
              </div>
            </ResumeSection>

            {/* Work Experience */}
            <ResumeSection
              title={isGerman ? "Berufserfahrung" : "Work Experience"}
            >
              <div className="space-y-4 text-sm text-cyan-100/90">
                <div>
                  <p className="text-[13px] text-cyan-200 mb-1">
                    <span className="font-semibold">
                      {isGerman
                        ? "Einzelhandelsmitarbeiter – Sport Voswinkel GmbH, Berlin"
                        : "Retail Associate – Sport Voswinkel GmbH, Berlin"}
                    </span>{" "}
                    · 2024–{isGerman ? "heute" : "present"}
                  </p>
                  <p className="leading-relaxed">
                    {isGerman
                      ? "Kundenbetreuung, Warenpräsentation und Lagerverwaltung mit SAP und digitalen Systemen. Optimierung von Abläufen, präzise Organisation und zuverlässige Teamarbeit in einem schnelllebigen Umfeld. Aufbau von Verantwortungsbewusstsein, Zeitmanagement und Kommunikationsfähigkeit."
                      : "Customer support, merchandise presentation, and inventory operations using SAP and digital systems. Improved workflow structure, accuracy, and coordination in a fast-paced environment. Built reliability, time management, and strong communication skills."}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-cyan-200 mb-1">
                    <span className="font-semibold">
                      {isGerman
                        ? "Lagerhelfer – Flink SE, Berlin"
                        : "Warehouse Associate – Flink SE, Berlin"}
                    </span>{" "}
                    · 2021–2022
                  </p>
                  <p className="leading-relaxed">
                    {isGerman
                      ? "Kommissionierung, Bestandskontrolle und Lagerprozesse unter Zeitdruck. Hohe Genauigkeit, effiziente Teamarbeit und strukturiertes Arbeiten in dynamischen Situationen."
                      : "Handled order preparation, stock control, and warehouse processes under time pressure. Strengthened teamwork, efficiency, and attention to detail in a dynamic environment."}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-cyan-200 mb-1">
                    <span className="font-semibold">
                      {isGerman
                        ? "Küchenhilfe – Verschiedene Restaurants (Berlin)"
                        : "Kitchen Assistant – Multiple Restaurants (Berlin)"}
                    </span>{" "}
                    · 2019–2024
                  </p>
                  <p className="leading-relaxed">
                    {isGerman
                      ? "Arbeit in multikulturellen, schnelllebigen Küchen. Einhaltung von Hygiene- und Sicherheitsstandards, enge Abstimmung im Team und zuverlässige Leistung während hoher Auslastung."
                      : "Worked in multicultural, fast-paced kitchen environments. Maintained hygiene and safety standards, coordinated closely with teams, and delivered reliable performance during peak hours."}
                  </p>
                </div>
              </div>
            </ResumeSection>

            {/* Education */}
            <ResumeSection title={isGerman ? "Bildung" : "Education"}>
              <div className="space-y-3 text-sm text-cyan-100/90">
                <div>
                  <p className="text-[13px] text-cyan-200 mb-1">
                    <span className="font-semibold">
                      M.Sc. Scientific Computing – TU Berlin
                    </span>{" "}
                    · 2021–2024{" "}
                    <span className="text-cyan-300/80">
                      ({isGerman ? "nicht abgeschlossen" : "not completed"})
                    </span>
                  </p>
                  <p className="leading-relaxed">
                    {isGerman
                      ? "Vertiefung in Programmierung und angewandter Informatik; später Fokuswechsel auf praxisorientierte Webentwicklung und eigene Projekte."
                      : "Focused on programming and applied scientific computing; later shifted fully towards practical web development and self-directed projects."}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-cyan-200 mb-1">
                    <span className="font-semibold">
                      B.Sc. Mathematics – BRAC University, Dhaka
                    </span>{" "}
                    · 2013–2018
                  </p>
                  <p className="leading-relaxed">
                    {isGerman
                      ? "Fundierte Grundlagen in Logik, Analyse und strukturiertem Problemlösen."
                      : "Built a strong foundation in logic, analysis, and structured problem-solving."}
                  </p>
                </div>
              </div>
            </ResumeSection>

            {/* Technical skills */}
            <ResumeSection
              title={isGerman ? "Technische Kenntnisse" : "Technical Skills"}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-cyan-100/90">
                <div className="space-y-2">
                  <p className="text-cyan-200 text-[13px]">
                    {isGerman
                      ? "Programmiersprachen & Frameworks"
                      : "Languages & Frameworks"}
                  </p>
                  <p>Python, JavaScript, TypeScript</p>
                  <p>Django, Django REST Framework</p>
                  <p>React, Next.js, Tailwind CSS</p>
                </div>
                <div className="space-y-2">
                  <p className="text-cyan-200 text-[13px]">
                    {isGerman ? "Datenbanken & Tools" : "Databases & Tools"}
                  </p>
                  <p>PostgreSQL, SQLite</p>
                  <p>Git, GitHub, GitLab</p>
                  <p>Railway, Vercel, BunnyCDN</p>
                  <p>Ubuntu, VS Code, SAP</p>
                </div>
              </div>
            </ResumeSection>

            {/* Languages */}
            <ResumeSection title={isGerman ? "Sprachen" : "Languages"}>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                {isGerman
                  ? "Englisch (fließend) · Deutsch (konversationssicher – B1/B2) · Bengalisch (Muttersprache)"
                  : "English (fluent) · German (conversational – B1/B2) · Bengali (native)"}
              </p>
            </ResumeSection>

            {/* Strengths */}
            <ResumeSection title={isGerman ? "Persönliche Stärken" : "Strengths"}>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                {isGerman
                  ? "Zuverlässigkeit · Teamfähigkeit · Problemlösung · Schnelles Lernen · Selbstmotivation"
                  : "Reliability · Teamwork · Problem-solving · Fast learning · Self-motivation"}
              </p>
            </ResumeSection>
          </section>
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="glass-card px-5 py-5 md:px-7 md:py-6 space-y-3">
        <h2 className="text-base md:text-lg text-cyan-300">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
