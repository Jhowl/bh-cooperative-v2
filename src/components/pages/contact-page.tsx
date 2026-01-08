import ContactForm from "../../app/contact/contact-form";
import { getTranslations, type Locale } from "../../lib/i18n";

type ContactPageContentProps = {
  locale: Locale;
};

export default function ContactPageContent({ locale }: ContactPageContentProps) {
  const t = getTranslations(locale);

  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none grid gap-10 px-6 sm:px-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            {t.contact.badge}
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">{t.contact.intro}</p>
          <div className="mt-8 space-y-3 text-sm text-charcoal/70">
            <p>{t.contact.infoPhone}</p>
            <p>{t.contact.infoEmail}</p>
            <p>{t.contact.infoHours}</p>
          </div>
        </div>
        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
