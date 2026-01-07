"use client";

import { useState } from "react";

export default function HeroRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const parts = [];
    if (digits.length > 0) parts.push(`(${digits.slice(0, 3)}`);
    if (digits.length >= 4) parts[0] += ")";
    if (digits.length >= 4) parts.push(` ${digits.slice(3, 6)}`);
    if (digits.length >= 7) parts.push(`-${digits.slice(6, 10)}`);
    return parts.join("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  }

  return (
    <form className="mt-4 space-y-3 text-sm" onSubmit={handleSubmit}>
      <input
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder="Your name"
        required
      />
      <input
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
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder="Your email"
        type="email"
        required
      />
      <select
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        required
      >
        <option value="">Choose a service</option>
        <option>Heavy Cleaning</option>
        <option>Regular Cleaning</option>
        <option>Gardening</option>
        <option>Painting</option>
        <option>Handyman (minor repairs)</option>
      </select>
      <input
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        placeholder="Zipcode"
        required
      />
      <select
        className="w-full rounded-2xl border border-mist bg-snow px-4 py-2"
        required
      >
        <option value="">How did you find our company</option>
        <option>Referral</option>
        <option>Google search</option>
        <option>Social media</option>
      </select>
      <label className="flex items-center gap-2 text-[11px] text-charcoal/70">
        <input type="checkbox" className="h-4 w-4 rounded border-mist" />
        I agree to the terms and conditions
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-semibold text-charcoal disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal/40 border-t-charcoal" />
        )}
        Request Services
      </button>
    </form>
  );
}
