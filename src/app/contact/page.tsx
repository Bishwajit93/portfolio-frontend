"use client";

import { useState, useEffect } from "react";
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact-form/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong.");
      } else {
        setStatusMessage("Message sent successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Typing animation for headings
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

  // Reset first to prevent duplication
  setHeading("");
  setSubHeading("");

  // Start animation
  typeTitle();

  // Cleanup
  return () => {
    titleText = "";
    subtitleText = "";
  };
  }, []);



  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-screen text-white flex items-start justify-center pt-[70px] pb-8"
    >
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 drop-shadow-sm min-h-[2.5rem]">
            {heading}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-cyan-200 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
            Whether you want to collaborate, hire me, or just ask a question — feel free to drop a message.
          </p>
          <div className="flex justify-center gap-8 text-cyan-300 mt-2">
            {[
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/bishwajit-karmaker/", title: "LinkedIn" },
              { icon: FaGithub, href: "https://github.com/Bishwajit93", title: "GitHub" },
              { icon: FaFileAlt, href: "/resume", title: "Resume" }
            ].map(({ icon: Icon, href, title }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={title}
                whileHover={{ scale: 1.2 }}
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="relative flex flex-col items-center group cursor-pointer"
              >
                <Icon className="text-lg sm:text-xl text-cyan-300 drop-shadow-[0_0_6px_cyan]" />
                <span
                  className="absolute top-full mt-1 px-1 py-0.5 text-xs sm:text-sm text-cyan-100 bg-black border border-cyan-400 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                >
                  {title}
                </span>
              </motion.a>
            ))}
          </div>

        </div>

        {/* Subheading */}
        <h2 className="text-lg sm:text-xl font-semibold text-center text-cyan-300 mt-8 mb-2 min-h-[2rem]">
          {subHeading}
        </h2>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-transparent p-4 sm:p-6 rounded-xl w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl mx-auto space-y-4 
          border border-cyan-400/30 shadow-[0_0_16px_rgba(0,255,255,0.2)]"
        >
          {/* First & Last Name */}
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { label: "First Name", value: firstName, setValue: setFirstName, placeholder: "Enter your first name" },
              { label: "Last Name", value: lastName, setValue: setLastName, placeholder: "Enter your last name" }
            ].map(({ label, value, setValue, placeholder }, i) => (
              <div key={i} className="w-full sm:w-1/2">
                <label className="block text-sm text-cyan-300 mb-1">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-zinc-800 text-white placeholder-cyan-200 
                    border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
                    focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
                />
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded bg-zinc-800 text-white placeholder-cyan-200 
                border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
                focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Subject</label>
            <input
              type="text"
              placeholder="What is this about?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-2 rounded bg-zinc-800 text-white placeholder-cyan-200 
                border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
                focus:outline-none focus:ring-2 focus:ring-cyan-400 transition cursor-text"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Message</label>
            <textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full p-2 rounded bg-zinc-800 text-white placeholder-cyan-200 
                border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] 
                focus:outline-none focus:ring-2 focus:ring-cyan-400 transition resize-none cursor-text"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-bold text-cyan-300 border border-cyan-400 rounded 
              bg-zinc-900 hover:bg-black transition duration-300 
              shadow-[0_0_8px_rgba(0,255,255,0.4)] hover:shadow-[0_0_14px_rgba(0,255,255,0.7)] 
              hover:text-white cursor-pointer"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {statusMessage && <p className="text-green-400 text-center">{statusMessage}</p>}
          {error && <p className="text-red-400 text-center">{error}</p>}
        </motion.form>
      </div>
    </motion.div>
  );
}
