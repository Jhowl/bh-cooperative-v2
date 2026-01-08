import ContactForm from "./contact-form";

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
        <ContactForm />
      </div>
    </div>
  );
}
