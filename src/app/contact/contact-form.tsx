"use client";

import { useMemo, useState } from "react";
import { getTranslations, type Locale } from "../../lib/i18n";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  locale: Locale;
};

export default function ContactForm({ locale }: ContactFormProps) {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const t = useMemo(() => getTranslations(locale), [locale]);

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
        setMessage(payload?.error ?? t.forms.contact.error);
        return;
      }

      setStatus("success");
      setMessage(t.forms.contact.success);
    } catch {
      setStatus("error");
      setMessage(t.forms.contact.error);
    }
  }

  async function handleFormSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleSubmit(formData);
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
    >
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          {t.forms.contact.name}
        </label>
        <input
          name="name"
          className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
          placeholder={t.forms.contact.namePlaceholder}
          type="text"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          {t.forms.contact.email}
        </label>
        <input
          name="email"
          className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
          placeholder={t.forms.contact.emailPlaceholder}
          type="email"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
          {t.forms.contact.message}
        </label>
        <textarea
          name="message"
          className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
          placeholder={t.forms.contact.messagePlaceholder}
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-pine/70"
      >
        {status === "submitting"
          ? t.forms.contact.submitting
          : t.forms.contact.submit}
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
