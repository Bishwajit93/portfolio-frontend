"use client"

import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import MotionCard from "@/components/MotionCard";

export default function AboutPage() {
  return (
    <AnimatedPageWrapper key="about">
      <main className="min-h-screen text-white pt-[100px] pb-[60px] px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* ---- About Me ---- */}
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 text-center mb-6">
            About Me
          </h1>
          <p className="text-[15px] font-normal leading-relaxed text-gray-200 text-center max-w-3xl mx-auto mb-5">
            I am Abdullah (Bishwajit Karmaker), a full-stack developer in Berlin. 
            I design clean UIs and build solid backends with modern, practical tools.
          </p>
          <p className="text-[15px] font-normal leading-relaxed text-gray-200 text-center max-w-3xl mx-auto mb-14">
            My expertise includes React, Next.js, Tailwind CSS, Django REST Framework, and PostgreSQL. 
            I focus on delivering reliable, user-focused applications with scalable architecture.
          </p>

          {/* ---- Core Skills ---- */}
          <h2 className="text-xl md:text-3xl font-bold text-cyan-400 text-center mb-6">
            Core Skills
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <MotionCard>
              <li className="p-6 border border-cyan-400/30 rounded-xl bg-black text-gray-200 
                shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition duration-500">
                <h3 className="text-cyan-300 font-semibold mb-2">Languages</h3>
                <p className="text-gray-200 text-sm">JavaScript/TypeScript, Python, SQL</p>
              </li>
            </MotionCard>
            <MotionCard>
              <li className="p-6 border border-cyan-400/30 rounded-xl bg-black text-gray-200 
                shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition duration-500">
                <h3 className="text-cyan-300 font-semibold mb-2">Frameworks</h3>
                <p className="text-gray-200 text-sm">Next.js, React, Tailwind CSS, Framer Motion, Django, DRF</p>
              </li>
            </MotionCard>
            <MotionCard>
              <li className="p-6 border border-cyan-400/30 rounded-xl bg-black text-gray-200 
                shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition duration-500">
                <h3 className="text-cyan-300 font-semibold mb-2">Databases & Tools</h3>
                <p className="text-gray-200 text-sm">PostgreSQL, Railway, Vercel, Git</p>
              </li>
            </MotionCard>
          </ul>

          {/* ---- Personal Qualities ---- */}
          <h2 className="text-xl md:text-3xl font-bold text-cyan-400 text-center mt-16 mb-6">
            Personal Qualities
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Responsible and reliable in every project I take on.",
              "Collaborative team player with clear communication.",
              "Calm under pressure and focused on delivering results.",
              "Driven to grow — turning challenges into motivation."
            ].map((quality, idx) => (
              <MotionCard key={idx}>
                <li
                  className="p-6 border border-cyan-400/30 rounded-xl bg-black text-gray-200 
                    shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition duration-500"
                >
                  <p className="text-[14px] font-light text-gray-300 leading-snug">{quality}</p>
                </li>
              </MotionCard>
            ))}
          </ul>
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
