"use client";

import { useState } from "react";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import HomeHero from "@/components/home/HomeHero";
import FeaturedSystems from "@/components/home/FeaturedSystems";
import EngineeringProfile from "@/components/home/EngineeringProfile";
import RecruiterMode from "@/components/home/RecruiterMode";
import Link from "next/link";

export default function HomePage() {
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  return (
    <AnimatedPageWrapper key="home">
      <main className="portfolio-home">
        <HomeHero onRecruiterMode={() => setRecruiterOpen(true)} />
        <div className="proof-strip" aria-label="Key capabilities">
          <span>Python / Django</span><span>REST APIs</span><span>PostgreSQL</span><span>TypeScript / Next.js</span><span>Production deployment</span>
        </div>
        <FeaturedSystems />
        <EngineeringProfile />
        <section className="closing-cta">
          <p className="eyebrow">Next conversation</p>
          <h2>Have a system to build<br />or a team I can help?</h2>
          <div className="closing-actions">
            <Link href="/contact" className="button button-primary">Start a conversation →</Link>
            <Link href="/resume" className="button button-ghost">Read my résumé</Link>
          </div>
        </section>
        <RecruiterMode open={recruiterOpen} onClose={() => setRecruiterOpen(false)} />
      </main>
    </AnimatedPageWrapper>
  );
}
