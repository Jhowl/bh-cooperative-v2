import Image from "next/image";
import Link from "next/link";
import { getTranslations, localizePath, type Locale } from "../lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const t = getTranslations(locale);

  return (
    <header className="border-b border-mist bg-white">
      <div className="bg-pine text-white">
        <div className="mx-auto flex w-full max-w-none items-center justify-between px-8 py-2 text-xs">
          <span>{t.header.topBar}</span>
          <span>{t.header.phone}</span>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-none items-center justify-between px-8 py-4">
        <Link
          href={localizePath(locale, "/")}
          className="flex items-center gap-3 text-lg font-semibold"
        >
          <Image
            src="/assets/logo_g.png"
            alt="Brazilian Hands Cooperative"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="font-display text-2xl tracking-tight text-charcoal">
            {t.header.brand}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {t.header.nav.map((item) => (
            <Link
              key={item.href}
              href={localizePath(locale, item.href)}
              className="text-charcoal/70 transition hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={localizePath(locale, "/register-provider")}
          className="rounded-full bg-sun px-4 py-2 text-sm font-semibold text-charcoal transition hover:translate-y-[-1px] hover:bg-sun/90"
        >
          {t.header.cta}
        </Link>
      </div>
    </header>
  );
}
