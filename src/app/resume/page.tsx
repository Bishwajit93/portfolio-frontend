"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";

type Lang = "en" | "de";
type Entry = { title: string; meta: string; bullets: string[]; link?: { label: string; href: string } };

export default function ResumePage() {
  const [lang, setLang] = useState<Lang>("en");
  const de = lang === "de";
  const copy = getCopy(de);

  return (
    <AnimatedPageWrapper key={`resume-${lang}`}>
      <main className="resume-v3">
        <section className="resume-v3-hero">
          <div className="resume-v3-identity">
            <div className="resume-v3-signal"><i /> {de ? "Berlin · offen für relevante Rollen" : "Berlin · open to relevant roles"}</div>
            <div className="resume-v3-kicker"><span>{de ? "Lebenslauf" : "Résumé"}</span><b>2026</b></div>
            <h1>Bishwajit <span>Karmaker</span></h1>
            <p className="resume-v3-role">{copy.role}</p>
            <div className="resume-v3-contact-row">
              <a href="mailto:contact@abdullahstack.com">contact@abdullahstack.com ↗</a>
              <a href="https://github.com/Bishwajit93" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://gitlab.com/abdullahbk" target="_blank" rel="noreferrer">GitLab ↗</a>
            </div>
          </div>

          <aside className="resume-v3-kit">
            <div className="resume-v3-kit-head"><span>{de ? "Bewerbungsset" : "Application kit"}</span><b>01</b></div>
            <div className="resume-language" aria-label="Resume language">
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
              <button className={lang === "de" ? "active" : ""} onClick={() => setLang("de")}>DE</button>
            </div>
            <ResumeDownloadButton lang={lang} />
            <div className="resume-v3-kit-facts">
              <Fact label={de ? "Schwerpunkt" : "Focus"} value={de ? "Backend · Full Stack" : "Data · Backend"} />
              <Fact label="Core" value="Python · Django · DRF" />
              <Fact label="Data" value="PostgreSQL · Relational Models" />
            </div>
          </aside>
        </section>

        <section className="resume-v3-overview" aria-label="Professional overview">
          <OverviewCard index="01" label={de ? "Profil" : "Profile"} value={de ? "Backend-first Entwickler" : "Backend-first builder"} detail={de ? "Mathematik · APIs · relationale Daten" : "Mathematics · APIs · relational data"} />
          <OverviewCard index="02" label={de ? "Produktion" : "Production"} value="Railway · Vercel" detail={de ? "Deployments · Logs · Konfiguration" : "Deployments · logs · configuration"} />
          <OverviewCard index="03" label={de ? "Aktuell" : "Current"} value="OPSHUB" detail={de ? "Multi-Tenant SaaS in aktiver Entwicklung" : "Multi-tenant SaaS in active development"} />
        </section>

        <div className="resume-v3-body">
          <ResumeSection index="01" title={de ? "Profil" : "Profile"} lead>
            <p className="resume-v3-profile-copy">{copy.profile}</p>
          </ResumeSection>

          <ResumeSection index="02" title={de ? "Technische Kenntnisse" : "Technical Skills"}>
            <div className="resume-v3-skills">
              {copy.skills.map((skill) => <SkillCard key={skill.label} label={skill.label} values={skill.values} />)}
            </div>
          </ResumeSection>

          <ResumeSection index="03" title={de ? "Ausgewählte Softwareprojekte" : "Selected Software Projects"}>
            <div className="resume-v3-projects">{copy.projects.map((entry, index) => <ProjectEntry key={entry.title} entry={entry} index={index + 1} />)}</div>
          </ResumeSection>

          <ResumeSection index="04" title={de ? "Berufserfahrung" : "Professional Experience"}>
            <div className="resume-v3-experience"><span className="resume-v3-current-dot" /> <EntryCard entry={copy.work} /></div>
          </ResumeSection>

          <ResumeSection index="05" title={de ? "Bildung" : "Education"}>
            <div className="resume-v3-education">
              <EducationCard title="BRAC University, Dhaka" detail="Bachelor of Science in Mathematics" meta="2018" />
              <EducationCard title={de ? "Full-Stack Web Development Bootcamp (Präsenz)" : "Full-Stack Web Development Bootcamp (in-class)"} detail="HTML · CSS · JavaScript · Ruby · Ruby on Rails" meta="2021" />
            </div>
          </ResumeSection>

          <ResumeSection index="06" title={de ? "Sprachen" : "Languages"}>
            <div className="resume-v3-languages">
              {(de ? [["Deutsch", "Berufliche Kommunikation"], ["Englisch", "Fließend"], ["Bengali", "Muttersprache"]] : [["English", "Fluent"], ["German", "Professional communication"], ["Bengali", "Native"]]).map(([name, level]) => <div key={name}><span>{name}</span><strong>{level}</strong></div>)}
            </div>
          </ResumeSection>
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}

function ResumeSection({ index, title, children, lead = false }: { index: string; title: string; children: ReactNode; lead?: boolean }) {
  return <section className={`resume-v3-section${lead ? " is-lead" : ""}`}><header><span>{index}</span><h2>{title}</h2></header><div>{children}</div></section>;
}
function Fact({ label, value }: { label: string; value: string }) { return <div><span>{label}</span><strong>{value}</strong></div>; }
function OverviewCard({ index, label, value, detail }: { index: string; label: string; value: string; detail: string }) { return <article><span>{index} / {label}</span><strong>{value}</strong><p>{detail}</p></article>; }
function SkillCard({ label, values }: { label: string; values: string[] }) { return <article><span>{label}</span>{values.map((value) => <p key={value}>{value}</p>)}</article>; }
function ProjectEntry({ entry, index }: { entry: Entry; index: number }) { return <article className="resume-v3-project"><span className="resume-v3-project-index">0{index}</span><div><div className="resume-v3-entry-head"><h3>{entry.title}</h3><span>{entry.meta}</span></div><ul>{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>{entry.link && <a href={entry.link.href} target="_blank" rel="noreferrer">{entry.link.label} ↗</a>}</div></article>; }
function EntryCard({ entry }: { entry: Entry }) { return <article className="resume-v3-entry-card"><div className="resume-v3-entry-head"><h3>{entry.title}</h3><span>{entry.meta}</span></div><ul>{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>; }
function EducationCard({ title, detail, meta }: { title: string; detail: string; meta: string }) { return <article><span>{meta}</span><h3>{title}</h3><p>{detail}</p></article>; }

function getCopy(de: boolean) {
  const projects: Entry[] = de ? [
    { title: "OPSHUB — SaaS-Plattform für Operations, Finance & POS", meta: "2025–heute · aktive Entwicklung / V1", bullets: ["Entwicklung einer mandantenfähigen Business-Anwendung zur Digitalisierung betrieblicher Prozesse mit Modulen für POS, Inventar, Finanzen und weitere Unternehmensabläufe.", "Konzeption organisations- und filialbezogener Datenstrukturen, rollenbasierter Berechtigungen sowie nachvollziehbarer Backend-Workflows für sensible Geschäftsprozesse.", "Umsetzung REST-basierter Validierungs-, Authentifizierungs- und Transaktionslogik mit Fokus auf Datenkonsistenz, Wartbarkeit und schrittweise Erweiterbarkeit."] },
    { title: "Linda Art Gallery — Kundenprojekt", meta: "2025–2026 · Django · PostgreSQL · Next.js · Railway", bullets: ["Entwicklung und technische Betreuung einer produktiven Galerieplattform für einen realen Kunden mit Medienverwaltung, Kontaktprozessen und Backend-Validierung.", "Implementierung von REST-API-Logik und E-Mail-Workflows sowie klarer Trennung von Geschäftslogik, API und Benutzeroberfläche.", "Deployment und strukturierte Fehleranalyse im laufenden Betrieb anhand von Logs, API-Responses und Produktionskonfiguration."], link: { label: "lindaartgallery.de", href: "https://lindaartgallery.de" } },
    { title: "Portfolio-Webanwendung", meta: "2025–heute · Django · PostgreSQL · Next.js · JWT", bullets: ["Aufbau einer Full-Stack-Webanwendung mit CRUD-Endpunkten, Validierung, JWT-basierter Authentifizierung und geschützten Frontend-Bereichen.", "Konfiguration von Deployment, Umgebungsvariablen und Datenbankanbindung sowie systematische Analyse technischer Fehler über Logs."], link: { label: "abdullahstack.com", href: "https://abdullahstack.com" } },
  ] : [
    { title: "OPSHUB — Multi-tenant Operations, Finance & POS SaaS", meta: "2025–Present · active V1 development", bullets: ["Designing a multi-tenant business platform with organization- and branch-scoped data models across POS, inventory and finance workflows.", "Implementing permission-controlled backend workflows, validation and transactional business logic with emphasis on data integrity and auditability.", "Working extensively with relational models, migrations, API contracts and structured production-style debugging."] },
    { title: "Linda Art Gallery — Client Project", meta: "2025–2026 · Django · PostgreSQL · Next.js · Railway", bullets: ["Developed and deployed a production gallery platform for a real client, including media management, validated contact workflows and email integration.", "Maintained the deployed application and diagnosed production issues using logs, API responses and configuration analysis."], link: { label: "lindaartgallery.de", href: "https://lindaartgallery.de" } },
    { title: "Portfolio Web Application", meta: "2025–Present · Django · PostgreSQL · Next.js · JWT", bullets: ["Built a full-stack application with CRUD APIs, relational data models, validation, JWT authentication and protected frontend areas."], link: { label: "abdullahstack.com", href: "https://abdullahstack.com" } },
  ];

  return {
    role: de ? "Junior Backend / Full-Stack Developer · Python · Django · REST APIs · PostgreSQL" : "Junior Data Engineer / Backend Developer · Mathematics · Python · PostgreSQL · REST APIs",
    profile: de ? "Junior Backend / Full-Stack Developer mit Bachelorabschluss in Mathematik und Schwerpunkt auf Python, Django REST Framework, PostgreSQL und datengetriebenen Webanwendungen. Praktische Erfahrung in der Entwicklung und dem produktionsnahen Betrieb von REST-APIs, JWT-Authentifizierung, relationalen Datenmodellen und Cloud-Deployments. Entwickelt eigene sowie kundenbezogene Softwareprojekte von der Anforderungsstrukturierung bis zur Bereitstellung und arbeitet sich systematisch in neue Technologien und bestehende Codebasen ein." : "Junior software and data professional with a Bachelor of Science in Mathematics and hands-on experience with Python, Django REST Framework, PostgreSQL, relational data modelling, REST APIs and production deployments. Experienced in designing structured backend domains, validating transactional data, debugging through logs and API responses, and maintaining database-backed applications. Seeking to develop further in data engineering, ETL, database systems and scalable data processing.",
    skills: de ? [
      { label: "Programmierung", values: ["Python · TypeScript · JavaScript", "HTML · CSS"] },
      { label: "Daten & Datenbanken", values: ["PostgreSQL · SQL-Grundlagen", "relationale Datenmodellierung · Django-Migrationen · Datenvalidierung"] },
      { label: "Backend & APIs", values: ["Django · Django REST Framework", "REST API Design · Serializer/Validation · JWT Authentication"] },
      { label: "Tools & Delivery", values: ["Git · GitHub · GitLab · Linux", "Railway · Vercel · VS Code · ENV-Konfiguration · Log-Debugging"] },
    ] : [
      { label: "Programming", values: ["Python · TypeScript · JavaScript", "HTML · CSS"] },
      { label: "Data & Databases", values: ["PostgreSQL · SQL fundamentals", "relational data modelling · Django migrations · data validation"] },
      { label: "Backend & APIs", values: ["Django · Django REST Framework", "REST API design · serializers · authentication/authorization · JWT"] },
      { label: "Tools & Delivery", values: ["Git · GitHub · GitLab · Linux", "Railway · Vercel · VS Code · environment configuration · log-based debugging"] },
    ],
    projects,
    work: { title: "Sport Voswinkel GmbH (INTERSPORT), Berlin · Store Associate", meta: de ? "2024–heute" : "2024–Present", bullets: de ? ["Arbeit mit SAP-gestützten Warenwirtschafts- und operativen Prozessen im laufenden Filialbetrieb.", "Sorgfältige Durchführung strukturierter Arbeitsabläufe und Dokumentation auch bei hohem Kundenaufkommen und Zeitdruck.", "Team- und kundenorientierte Kommunikation sowie zuverlässige Übernahme operativer Verantwortung."] : ["Work with SAP-supported merchandise and operational processes in a high-volume retail environment.", "Execute structured workflows and documentation accurately under time pressure while coordinating with colleagues and customers."] } as Entry,
  };
}
