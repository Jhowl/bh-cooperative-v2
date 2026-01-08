import Image from "next/image";
import Link from "next/link";
import { getTranslations, localizePath, type Locale } from "../lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

export default function SiteFooter({ locale }: SiteFooterProps) {
  const t = getTranslations(locale);

  return (
    <footer className="bg-pine text-white">
      <div className="mx-auto flex w-full max-w-none flex-col gap-6 px-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo_w.png"
              alt="Brazilian Hands Cooperative"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <p className="font-display text-xl">{t.footer.brand}</p>
          </div>
          <p className="mt-2 text-sm text-white/70">
            {t.footer.tagline}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
          {t.footer.links.map((link) => (
            <Link
              key={link.href}
              href={localizePath(locale, link.href)}
              className="hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-white/60">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
