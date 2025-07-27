"use client";

import { useState } from "react";

type ContactFormData = {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
};

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

    const formData: ContactFormData = {
      first_name: firstName,
      last_name: lastName,
      email,
      subject,
      message,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact-form/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Contact form error:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-lg w-full max-w-lg border border-zinc-700 space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center mb-4">Contact Me</h2>

        <div className="flex gap-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="w-1/2 p-2 rounded bg-zinc-800 border border-zinc-600"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="w-1/2 p-2 rounded bg-zinc-800 border border-zinc-600"
          />
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600"
        />

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          required
          rows={5}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {statusMessage && <p className="text-green-400 text-center">{statusMessage}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
      </form>
    </div>
  );
}
