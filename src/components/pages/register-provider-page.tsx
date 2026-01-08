import ProviderRegistrationForm from "../../app/register-provider/provider-registration-form";
import { getTranslations, type Locale } from "../../lib/i18n";

type RegisterProviderPageContentProps = {
  locale: Locale;
};

export default function RegisterProviderPageContent({
  locale,
}: RegisterProviderPageContentProps) {
  const t = getTranslations(locale);

  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none space-y-8 px-6 sm:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            {t.registerProvider.badge}
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            {t.registerProvider.title}
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">
            {t.registerProvider.intro}
          </p>
        </div>
        <ProviderRegistrationForm locale={locale} />
      </div>
    </div>
  );
}
