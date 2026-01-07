export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none grid gap-10 px-6 sm:px-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            Let’s match you with the right provider.
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">
            Reach out to discuss services, availability, or partnership
            opportunities. Our coordinators respond within one business day.
          </p>
          <div className="mt-8 space-y-3 text-sm text-charcoal/70">
            <p>Phone: (617) 555-0144</p>
            <p>Email: hello@bhcooperative.com</p>
            <p>Hours: Monday – Friday, 8:30am – 6pm</p>
          </div>
        </div>
        <form className="space-y-4 rounded-3xl border border-mist bg-white/70 p-6 shadow-sm">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              Name
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
              placeholder="Your name"
              type="text"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              Email
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
              placeholder="you@email.com"
              type="email"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              How can we help?
            </label>
            <textarea
              className="mt-2 w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
              placeholder="Tell us about your needs"
              rows={4}
            />
          </div>
          <button
            type="button"
            className="w-full rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
