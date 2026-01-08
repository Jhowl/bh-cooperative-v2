import { getTranslations, type Locale } from "../../lib/i18n";

type ServicesPageContentProps = {
  locale: Locale;
};

export default function ServicesPageContent({ locale }: ServicesPageContentProps) {
  const t = getTranslations(locale);

  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none space-y-10 px-6 sm:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            {t.services.badge}
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            {t.services.title}
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">{t.services.intro}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {t.services.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
            >
              <h2 className="font-display text-xl text-charcoal">{group.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                {group.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-mist bg-pine px-6 py-8 text-white">
          <h3 className="font-display text-2xl">{t.services.ctaTitle}</h3>
          <p className="mt-3 text-sm text-white/80">{t.services.ctaCopy}</p>
        </div>
      </div>
    </div>
  );
}
