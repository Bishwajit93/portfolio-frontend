"use client";

import { useEffect, useState } from "react";
import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact-form/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            subject,
            message,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong.");
      } else {
        setStatusMessage("✅ Message sent successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Typing animation
  useEffect(() => {
    const title = "Let us work together!";
    const subtitle = "Contact Me";

    let titleIndex = 0;
    let subtitleIndex = 0;
    let titleText = "";
    let subtitleText = "";

    const typeTitle = () => {
      if (titleIndex < title.length) {
        titleText += title.charAt(titleIndex);
        setHeading(titleText);
        titleIndex++;
        setTimeout(typeTitle, 80);
      } else {
        setTimeout(typeSubtitle, 400);
      }
    };

    const typeSubtitle = () => {
      if (subtitleIndex < subtitle.length) {
        subtitleText += subtitle.charAt(subtitleIndex);
        setSubHeading(subtitleText);
        subtitleIndex++;
        setTimeout(typeSubtitle, 70);
      }
    };

    setHeading("");
    setSubHeading("");
    typeTitle();

    return () => {
      titleText = "";
      subtitleText = "";
    };
  }, []);

  return (
    <AnimatedPageWrapper key="contact">
      <main className="min-h-screen text-white pt-[40px] pb-[80px] px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hero-shell px-5 py-6 md:px-8 md:py-8 
                       flex flex-col md:flex-row md:items-start md:gap-10 
                       gap-8"
          >
            {/* LEFT: text + icons */}
            <div className="flex-1 space-y-4">
              <h1 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-cyan-50 drop-shadow-sm min-h-[2.3rem]">
                {heading}
              </h1>

              <h2 className="text-lg sm:text-xl font-semibold text-cyan-50 min-h-[2rem]">
                {subHeading}
              </h2>

              <p className="text-sm sm:text-base text-cyan-50 max-w-md leading-relaxed">
                Open to opportunities, collaborations, and questions. Send a
                message and I will get back to you as soon as possible.
              </p>

              <div className="flex gap-8 text-cyan-50 mt-4">
                {[
                  {
                    icon: FaLinkedin,
                    href: "https://www.linkedin.com/in/bishwajit-karmaker/",
                    title: "LinkedIn",
                  },
                  {
                    icon: FaGithub,
                    href: "https://github.com/Bishwajit93",
                    title: "GitHub",
                  },
                  { icon: FaFileAlt, href: "/resume", title: "Resume" },
                ].map(({ icon: Icon, href, title }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={title}
                    whileHover={{ scale: 1.18 }}
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5,
                      ease: "easeInOut",
                    }}
                    className="relative flex flex-col items-center group cursor-pointer"
                  >
                    <Icon className="text-2xl sm:text-3xl text-cyan-50 drop-shadow-[0_0_8px_cyan]" />
                    <span className="absolute top-full mt-1 px-2 py-1 text-[10px] sm:text-xs text-cyan-100 bg-black border border-cyan-400 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      {title}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* RIGHT: form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex-1 w-full max-w-full md:max-w-md 
                         bg-black/60 border border-cyan-400/40 
                         rounded-xl p-5 sm:p-6 
                         shadow-[0_0_20px_rgba(34,211,238,0.5)] space-y-5"
            >
              {/* First + Last Name */}
              <div className="flex flex-col sm:flex-row gap-4">
                {[
                  { label: "First Name", value: firstName, setValue: setFirstName },
                  { label: "Last Name", value: lastName, setValue: setLastName },
                ].map(({ label, value, setValue }, i) => (
                  <div key={i} className="w-full sm:w-1/2">
                    <label className="block text-xs sm:text-sm text-cyan-50 mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      required
                  className="
                    w-full px-4 py-3 
                    rounded-xl 
                    bg-[rgba(6,12,24,0.98)]
                    border border-[rgba(56,189,248,0.7)]
                    text-cyan-50 text-sm
                    shadow-[0_0_16px_rgba(56,189,248,0.45)]
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/80
                    transition
                    resize-none"
                    />
                  </div>
                ))}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm text-cyan-50 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="
                    w-full px-4 py-3 
                    rounded-xl 
                    bg-[rgba(6,12,24,0.98)]
                    border border-[rgba(56,189,248,0.7)]
                    text-cyan-50 text-sm
                    shadow-[0_0_16px_rgba(56,189,248,0.45)]
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/80
                    transition
                    resize-none"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs sm:text-sm text-cyan-50 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="
                    w-full px-4 py-3 
                    rounded-xl 
                    bg-[rgba(6,12,24,0.98)]
                    border border-[rgba(56,189,248,0.7)]
                    text-cyan-50 text-sm
                    shadow-[0_0_16px_rgba(56,189,248,0.45)]
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/80
                    transition
                    resize-none"
                  />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm text-cyan-50 mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="
                    w-full px-4 py-3 
                    rounded-xl 
                    bg-[rgba(6,12,24,0.98)]
                    border border-[rgba(56,189,248,0.7)]
                    text-cyan-50 text-sm
                    shadow-[0_0_16px_rgba(56,189,248,0.45)]
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/80
                    transition
                    resize-none
                  "
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  inline-flex items-center justify-center w-full
                  px-5 py-2.5
                  pill-button
                  text-xs md:text-sm text-cyan-50
                  shadow-[0_0_20px_rgba(34,211,238,0.8)]
                  hover:shadow-[0_0_28px_rgba(34,211,238,1)]
                  transition cursor-pointer
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Status messages */}
              {statusMessage && (
                <p className="text-green-400 text-center mt-2 drop-shadow-[0_0_6px_rgba(0,255,0,0.6)]">
                  {statusMessage}
                </p>
              )}
              {error && (
                <p className="text-red-400 text-center mt-2 drop-shadow-[0_0_6px_rgba(255,0,0,0.6)]">
                  {error}
                </p>
              )}
            </motion.form>
          </motion.section>
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
