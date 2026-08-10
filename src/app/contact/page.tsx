"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setStatusMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact-form/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await response.json();
      if (!response.ok) setError(data.detail || "Something went wrong.");
      else {
        setStatusMessage("Message received. I’ll get back to you as soon as possible.");
        setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPageWrapper key="contact-v2">
      <main className="contact-v2">
        <section className="contact-v2-hero">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            <p className="eyebrow">Contact / Berlin</p>
            <h1>Good software starts<br />with a clear conversation.</h1>
          </motion.div>
          <div className="contact-v2-intro">
            <span className="contact-v2-status"><i /> Open to relevant opportunities</span>
            <p>Backend, full-stack, data-oriented software work, collaborations, or a serious technical conversation — send me the context and I’ll respond directly.</p>
          </div>
        </section>

        <section className="contact-v2-grid">
          <aside className="contact-v2-rail">
            <p className="contact-v2-label">Direct channels</p>
            <a href="mailto:contact@abdullahstack.com" className="contact-v2-email">contact@abdullahstack.com <span>↗</span></a>
            <div className="contact-v2-links">
              <a href="https://www.linkedin.com/in/bishwajit-karmaker/" target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn <span>↗</span></a>
              <a href="https://github.com/Bishwajit93" target="_blank" rel="noreferrer"><FaGithub /> GitHub <span>↗</span></a>
              <Link href="/resume">Résumé <span>↗</span></Link>
            </div>

            <div className="contact-v2-note">
              <span>Signal / 01</span>
              <strong>Less noise. More context.</strong>
              <p>If you’re contacting me about a role, project, or technical problem, a few concrete details are more useful than a generic message.</p>
            </div>
          </aside>

          <motion.form
            className="contact-v2-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, delay: .08 }}
          >
            <div className="contact-v2-form-head">
              <div><span>Message interface</span><strong>Start a conversation</strong></div>
              <em>Secure form / API connected</em>
            </div>

            <div className="contact-v2-fields two">
              <Field label="First name" value={form.firstName} onChange={(value) => update("firstName", value)} autoComplete="given-name" />
              <Field label="Last name" value={form.lastName} onChange={(value) => update("lastName", value)} autoComplete="family-name" />
            </div>
            <div className="contact-v2-fields two">
              <Field type="email" label="Email" value={form.email} onChange={(value) => update("email", value)} autoComplete="email" />
              <Field label="Subject" value={form.subject} onChange={(value) => update("subject", value)} />
            </div>

            <label className="contact-v2-field contact-v2-message">
              <span>Message</span>
              <textarea required rows={7} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="A little context goes a long way…" />
            </label>

            {(statusMessage || error) && <div className={`contact-v2-feedback ${error ? "error" : "success"}`}>{error || statusMessage}</div>}

            <div className="contact-v2-submit-row">
              <p>Your message is sent through the portfolio backend. No public email exposure beyond this page.</p>
              <button type="submit" disabled={loading}><span>{loading ? "Sending…" : "Send message"}</span><b>↗</b></button>
            </div>
          </motion.form>
        </section>
      </main>
    </AnimatedPageWrapper>
  );
}

function Field({ label, value, onChange, type = "text", autoComplete }: { label: string; value: string; onChange: (value: string) => void; type?: string; autoComplete?: string }) {
  return <label className="contact-v2-field"><span>{label}</span><input required type={type} value={value} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} /></label>;
}
