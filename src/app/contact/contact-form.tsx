"use client";

import { useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(payload?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("Thanks! We will reply within one business day.");
    } catch {
      setStatus("error");
      setMessage("Unable to submit at the moment. Please try again later.");
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
    >
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          Name
        </label>
        <input
          name="name"
          className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
          placeholder="Your name"
          type="text"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          Email
        </label>
        <input
          name="email"
          className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
          placeholder="you@email.com"
          type="email"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          How can we help?
        </label>
        <textarea
          name="message"
          className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
          placeholder="Tell us about your needs"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-pine/70"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
      {message && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-pine/40 bg-mint text-pine-dark"
              : "border-sun/40 bg-sun/10 text-charcoal"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
