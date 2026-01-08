"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getTranslations, type Locale } from "../lib/i18n";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type HeroRequestFormProps = {
  locale: Locale;
};

export default function HeroRequestForm({ locale }: HeroRequestFormProps) {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const serviceSelectRef = useRef<HTMLSelectElement>(null);
  const t = useMemo(() => getTranslations(locale), [locale]);

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
      setMessage(t.forms.request.success);
    } catch {
      setStatus("error");
      setMessage(t.forms.request.error);
    }
  }

  async function handleFormSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleSubmit(formData);
  }

  useEffect(() => {
    if (serviceSelectRef.current?.value) {
      setSelectedService(serviceSelectRef.current.value);
    }
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="mt-4 space-y-3 text-sm">
      <input
        name="name"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder={t.forms.request.name}
        required
      />
      <input
        name="phone"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder={t.forms.request.phone}
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
        placeholder={t.forms.request.email}
        type="email"
        required
      />
      <select
        name="service"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        required
        defaultValue=""
        ref={serviceSelectRef}
        onChange={(event) => setSelectedService(event.target.value)}
      >
        <option value="">{t.forms.request.servicePlaceholder}</option>
        {t.forms.request.services.map((service) => (
          <option key={service.value} value={service.value}>
            {service.label}
          </option>
        ))}
      </select>
      {selectedService === "Other" ? (
        <textarea
          name="otherService"
          className="min-h-[96px] w-full rounded-2xl border border-mist bg-snow px-4 py-2"
          placeholder={t.forms.request.otherPlaceholder}
          required
        />
      ) : null}
      <input
        name="zipcode"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder={t.forms.request.zipcode}
        required
      />
      <select
        name="referralSource"
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        required
      >
        <option value="">{t.forms.request.referralPlaceholder}</option>
        {t.forms.request.referralOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="flex items-center gap-2 text-[11px] text-charcoal/70">
        <input
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 rounded border-mist"
        />
        {t.forms.request.terms}
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`flex w-full items-center justify-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-semibold text-charcoal disabled:cursor-not-allowed disabled:opacity-70 ${
          status === "submitting" ? "animate-pulse" : ""
        }`}
      >
        {status === "submitting" && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal/40 border-t-charcoal" />
        )}
        {status === "submitting"
          ? t.forms.request.submitting
          : t.forms.request.submit}
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
