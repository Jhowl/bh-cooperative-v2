import { getTranslations, type Locale } from "../../lib/i18n";

type AboutPageContentProps = {
  locale: Locale;
};

export default function AboutPageContent({ locale }: AboutPageContentProps) {
  const t = getTranslations(locale);

  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none space-y-10 px-6 sm:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            {t.about.badge}
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            {t.about.title}
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">{t.about.intro}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {t.about.values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
            >
              <h2 className="font-display text-xl text-charcoal">{value.title}</h2>
              <p className="mt-3 text-sm text-charcoal/70">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-mist bg-white/60 p-6">
          <h3 className="font-display text-2xl text-charcoal">
            {t.about.teamTitle}
          </h3>
          <p className="mt-3 text-sm text-charcoal/70">{t.about.teamCopy}</p>
        </div>
      </div>
    </div>
  );
}
