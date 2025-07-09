'use client';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xyzjjjkp');

  if (state.succeeded) {
    return (
      <p>✅ Thanks for your message!</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Contact Form
      </h2>

      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          required
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.25rem",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <ValidationError prefix="First Name" field="firstName" errors={state.errors} />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          required
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.25rem",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <ValidationError prefix="Last Name" field="lastName" errors={state.errors} />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.25rem",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.25rem",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        style={{
            padding: "0.6rem 2rem",
            border: "none",
            borderRadius: "4px",
            background: "#0070f3",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s"
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#0059c1")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#0070f3")}
        >
        Send
      </button>

    </form>
  );
}
