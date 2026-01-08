"use client";

import { useState } from "react";

const services = [
  "Heavy Cleaning",
  "Regular Cleaning",
  "Gardening",
  "Painting",
  "Handyman (minor repairs)",
  "Other",
];

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function HeroRequestForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");

  function formatPhone(value: string) {
    const sanitized = value.replace(/[^0-9+()\s.-]/g, "");
    const withoutExtraPlus = sanitized.replace(/\+(?=.)/g, "");
    const hasLeadingPlus = sanitized.trimStart().startsWith("+");
    const normalized = hasLeadingPlus ? `+${withoutExtraPlus}` : withoutExtraPlus;
    return normalized.slice(0, 20);
  }

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setMessage(null);

    try {
      const response = await fetch("/api/request-service", {
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
      setMessage("Thanks! We will contact you shortly to confirm details.");
    } catch {
      setStatus("error");
      setMessage("Unable to submit at the moment. Please try again later.");
    }
  }

  return (
    <form action={handleSubmit} className="mt-4 space-y-3 text-sm">
      <input
        name="name"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder="Your name"
        required
      />
      <input
        name="phone"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder="Your phone number"
        type="tel"
        required
        pattern="^\+?[0-9\s().-]{7,}$"
        title="Enter a valid phone number"
        onInput={(event) => {
          event.currentTarget.value = formatPhone(event.currentTarget.value);
        }}
      />
      <input
        name="email"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder="Your email"
        type="email"
        required
      />
      <select
        name="service"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        required
        value={selectedService}
        onChange={(event) => setSelectedService(event.target.value)}
      >
        <option value="">Choose a service</option>
        {services.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
      {selectedService === "Other" ? (
        <textarea
          name="otherService"
          className="min-h-[96px] w-full rounded-2xl border border-mist bg-snow px-4 py-2"
          placeholder="Tell us about the service you need"
          required
        />
      ) : null}
      <input
        name="zipcode"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder="Zipcode"
        required
      />
      <select
        name="referralSource"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        required
      >
        <option value="">How did you find our company</option>
        <option>Referral</option>
        <option>Google search</option>
        <option>Social media</option>
      </select>
      <label className="flex items-center gap-2 text-[11px] text-charcoal/70">
        <input
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 rounded border-mist"
        />
        I agree to the terms and conditions
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-semibold text-charcoal disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal/40 border-t-charcoal" />
        )}
        {status === "submitting" ? "Sending..." : "Request Services"}
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
