"use client";

import { useState } from "react";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen  text-white flex items-start justify-center pt-[70px] pb-8"
    >
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 drop-shadow-sm">
            Let us work together!
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-cyan-200 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
            Whether you want to collaborate, hire me, or just ask a question — feel free to drop a message.
          </p>
          <div className="flex justify-center gap-5 text-lg sm:text-xl text-cyan-300 mt-1">
            <a
              href="https://www.linkedin.com/in/bishwajit-karmaker/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Bishwajit93"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="/resume"
              className="hover:text-white transition"
              title="Resume"
            >
              <FaFileAlt />
            </a>
          </div>
        </div>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-zinc-900 p-4 sm:p-6 rounded-xl w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl mx-auto space-y-3 
          border border-cyan-400/30 shadow-[0_0_16px_rgba(0,255,255,0.2)]"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-center text-cyan-300">Contact Me</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
              className="w-full sm:w-1/2 p-2 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
              className="w-full sm:w-1/2 p-2 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Hidden email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
            className="hidden"
          />

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            required
            rows={4}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded shadow-md transition duration-300"
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
