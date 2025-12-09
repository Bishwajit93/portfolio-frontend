"use client";

import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import MotionCard from "@/components/MotionCard";
import Link from "next/link";

export default function AboutPage() {
  return (
    <AnimatedPageWrapper key="about">
      <main className="min-h-screen text-white pt-[40px] pb-[80px] px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
          {/* === HERO / INTRO === */}
          <section>
            <div className="hero-shell px-6 py-7 md:px-10 md:py-9 relative">
              <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start md:items-center">
                {/* Left: main intro text + socials */}
                <div className="flex-1 space-y-4 md:space-y-5">
                  <p className="text-[12px] uppercase tracking-[0.24em] text-cyan-100/90 drop-shadow-[0_0_3px_rgba(34,211,238,0.45)]">
                    Full-Stack Web Developer · Berlin
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-cyan-50">
                    Bishwajit Karmaker
                  </h1>

                  <p className="text-sm md:text-base text-cyan-100/85 max-w-xl">
                    I am a full-stack web developer
                    building end-to-end applications with Next.js, TypeScript,
                    Django REST Framework and PostgreSQL. I focus on clear
                    structure, maintainable code and features that work reliably
                    in production.
                  </p>

                  {/* Social / profile links inside hero */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="https://www.linkedin.com/in/bishwajit-karmaker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center
                        px-5 py-2.5
                        pill-button
                        text-xs md:text-sm text-cyan-50
                      "
                      >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/Bishwajit93"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center
                        px-5 py-2.5
                        pill-button
                        text-xs md:text-sm text-cyan-50
                      "
                      >
                      GitHub
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center
                        px-5 py-2.5
                        pill-button
                        text-xs md:text-sm text-cyan-50
                      "
                      >
                      Contact
                    </Link>
                  </div>
                </div>

                {/* Right: two consistent info cards */}
                <div className="flex-1 max-w-xs w-full">
                  <div className="grid gap-4">
                    <div className="glass-card px-5 py-5 h-full flex flex-col gap-2">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-300/85">
                        Snapshot
                      </p>
                      <p className="text-xs text-cyan-100/90">
                        Background in mathematics, now
                        focused on full-stack web development. Comfortable with
                        REST APIs, auth flows, relational databases and
                        deployment to platforms like Railway.
                      </p>
                      <div className="grid grid-cols-2 gap-3 mt-2 text-[11px] text-cyan-100/85">
                        <div>
                          <p className="text-cyan-200/90 mb-0.5">Core stack</p>
                          <p>Next.js, TypeScript, Django, DRF, PostgreSQL</p>
                        </div>
                        <div>
                          <p className="text-cyan-200/90 mb-0.5">
                            Currently seeking
                          </p>
                          <p>Junior / Full-Stack / Web Developer roles</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card px-5 py-5 h-full flex flex-col gap-2">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-300/85">
                        Recent focus
                      </p>
                      <ul className="list-disc list-inside text-[11px] text-cyan-100/90 space-y-1.5">
                        <li>
                          Linda Art Gallery – custom portfolio and inquiry
                          system.
                        </li>
                        <li>
                          abdullahstack.com – full-stack personal developer
                          platform.
                        </li>
                        <li>
                          Secure auth, password reset and professional contact
                          flow.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Under-hero buttons: only resume + contact */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/resume"
                className="inline-flex items-center justify-center
                        px-5 py-2.5
                        pill-button
                        text-xs md:text-sm text-cyan-50
                      "
              >
                Resume
              </Link>
            </div>
          </section>

          {/* === CORE SKILLS SECTION === */}
          <section>
            <h2 className="text-xl md:text-2xl text-cyan-300 text-center mb-6">
              Core skills
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <MotionCard>
                <li className="glass-card px-5 py-5 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-cyan-200">Languages</p>
                    <p className="text-sm text-cyan-100">
                      JavaScript / TypeScript, Python, SQL
                    </p>
                  </div>
                </li>
              </MotionCard>

              <MotionCard>
                <li className="glass-card px-5 py-5 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-cyan-200">Frameworks</p>
                    <p className="text-sm text-cyan-100">
                      Next.js, React, Tailwind CSS, Framer Motion, Django, DRF
                    </p>
                  </div>
                </li>
              </MotionCard>

              <MotionCard>
                <li className="glass-card px-5 py-5 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-cyan-200">
                      Databases and tools
                    </p>
                    <p className="text-sm text-cyan-100">
                      PostgreSQL, Railway, Vercel, Git, Resend, BunnyCDN
                    </p>
                  </div>
                </li>
              </MotionCard>
            </ul>
          </section>

          {/* === PERSONAL QUALITIES === */}
          <section>
            <h2 className="text-xl md:text-2xl text-cyan-300 text-center mb-6">
              Personal qualities
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                "Responsible and reliable in every project I take on.",
                "Collaborative team player with clear, honest communication.",
                "Calm under pressure and focused on delivering working solutions.",
                "Driven to grow – I turn challenges into motivation to improve.",
                "Detail-oriented with a strong focus on code readability.",
                "Curious by default – always learning new tools and patterns."
              ].map((quality, idx) => (
                <MotionCard key={idx}>
                  <li className="glass-card px-5 py-5 h-full flex flex-col justify-between">
                    <p className="text-[14px] text-cyan-100 leading-snug">
                      {quality}
                    </p>
                  </li>
                </MotionCard>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
