"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import type { Locale } from "../lib/i18n";

type LocaleShellProps = {
  children: React.ReactNode;
};

export default function LocaleShell({ children }: LocaleShellProps) {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname.startsWith("/pt") ? "pt" : "en";

  return (
    <div className="flex min-h-screen flex-col bg-snow text-charcoal">
      <SiteHeader locale={locale} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
