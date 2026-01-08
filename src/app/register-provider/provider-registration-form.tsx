"use client";

import { useMemo, useState } from "react";

const services = [
  "Heavy Cleaning",
  "Regular Cleaning",
  "Gardening",
  "Painting",
  "Handyman (minor repairs)",
];

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function ProviderRegistrationForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const defaultAvailability = useMemo(
    () => "Weekdays 8am-5pm, weekends flexible",
    [],
  );

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
      const response = await fetch("/api/register-provider", {
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
      setMessage("Thank you for registering! We will be in touch soon.");
    } catch {
      setStatus("error");
      setMessage("Unable to submit at the moment. Please try again later.");
    }
  }

  return (
    <form
      action={handleSubmit}
      className="grid gap-6 rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            Full name
          </span>
          <input
            name="name"
            required
            className="w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
            placeholder="Maria Oliveira"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
            placeholder="maria@email.com"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            required
            pattern="^\+?[0-9\\s().-]{7,}$"
            title="Enter a valid phone number"
            className="w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
            placeholder="(617) 555-0132"
            onInput={(event) => {
              event.currentTarget.value = formatPhone(event.currentTarget.value);
            }}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
            City
          </span>
          <input
            name="city"
            required
            className="w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
            placeholder="Cork, Ireland"
          />
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          Services offered
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {services.map((service) => (
            <label key={service} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="services"
                value={service}
                className="h-4 w-4 rounded border-mist text-pine"
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="space-y-2 text-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          Availability
        </span>
        <textarea
          name="availability"
          defaultValue={defaultAvailability}
          className="min-h-[96px] w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
        />
      </label>

      <label className="space-y-2 text-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          Upload resume or certifications
        </span>
        <div className="flex flex-col gap-2 rounded-2xl border border-mist bg-white px-4 py-3">
          <input
            id="provider-file"
            name="file"
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              setFileName(file ? file.name : null);
            }}
          />
          <label
            htmlFor="provider-file"
            className="inline-flex w-fit cursor-pointer rounded-full bg-sun px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal"
          >
            Choose file
          </label>
          <span className="text-xs text-charcoal/60">
            {fileName ?? "No file selected"}
          </span>
        </div>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex items-center justify-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine-dark disabled:cursor-not-allowed disabled:bg-pine/40"
      >
        {status === "submitting" && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        )}
        {status === "submitting" ? "Submitting..." : "Submit registration"}
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
