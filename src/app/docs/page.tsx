"use client";

import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";

export default function DocsPage() {
  return (
    <AnimatedPageWrapper key="docs">
      <main className="min-h-screen text-white pt-[100px] pb-[60px] px-4 md:px-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 text-center mb-8">
            Portfolio Documentation
          </h1>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Overview</h2>
            <p className="text-sm font-light text-cyan-200">
              This portfolio showcases my work as a self-taught full-stack developer. Built from scratch using modern technologies, it features responsive design, project and experience CRUD, user authentication, email integration, and a clean visual theme.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Tech Stack Used</h2>
            <ul className="list-disc ml-6 text-sm text-cyan-200">
              <li><strong>Frontend:</strong> Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion</li>
              <li><strong>Backend:</strong> Django REST Framework (DRF)</li>
              <li><strong>Database:</strong> PostgreSQL</li>
              <li><strong>Auth:</strong> JWT-based authentication (SimpleJWT)</li>
              <li><strong>Email:</strong> Resend API + Zoho Mail</li>
              <li><strong>Deployment:</strong> Vercel (Frontend), Railway (Backend)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Frontend Structure</h2>
            <p className="text-sm text-cyan-200">
              The frontend is modularized for maintainability. Each main route (`/projects`, `/experience`, etc.) has its own component and CSS. Framer Motion handles animations. API calls are abstracted into the `lib/api` folder for a clean separation of concerns.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Backend Structure</h2>
            <p className="text-sm text-cyan-200">
              The Django backend provides secure API endpoints for Projects, Experience, Education, Skills, and Contact Form. Permissions restrict POST/PUT/DELETE to authenticated users, while GET is open for all visitors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Authentication & Authorization</h2>
            <p className="text-sm text-cyan-200">
              JWT tokens are issued via a custom login endpoint. Frontend stores the token securely in memory context. Only logged-in users can access Add, Edit, or Delete forms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Contact Form & Email Setup</h2>
            <p className="text-sm text-cyan-200">
              The contact form posts to a backend endpoint, which uses Resend API to send styled emails. Emails are sent from my Zoho Mail domain and CC my personal Gmail. This replaces third-party form services for a more professional setup.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Deployment Strategy</h2>
            <p className="text-sm text-cyan-200">
              The project is fully deployed using cloud platforms:
            </p>
            <ul className="list-disc ml-6 mt-1">
                <li><strong>Frontend:</strong> Vercel — automatic deploy on push</li>
                <li><strong>Backend:</strong> Railway — PostgreSQL + Django APIs</li>
                <li><strong>Domain:</strong> Custom domain connected (abdullahstack.com)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Challenges & Fixes</h2>
            <ul className="list-disc ml-6 text-sm text-cyan-200">
              <li>Email integration was tricky — switched from Djoser to a fully custom flow</li>
              <li>PDF download was failing due to unsupported color formats — resolved with `html2canvas` + `jsPDF`</li>
              <li>Style consistency and responsiveness were adjusted through multiple iterations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Future Improvements</h2>
            <ul className="list-disc ml-6 text-sm text-cyan-200">
              <li>Add blog and testimonials section</li>
              <li>Implement language toggle using i18n for the entire site</li>
              <li>Set up unit and integration tests</li>
            </ul>
          </section>
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
