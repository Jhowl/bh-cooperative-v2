import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import LocaleShell from "../components/LocaleShell";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Brazilian Hands Cooperative",
    template: "%s | Brazilian Hands Cooperative",
  },
  description:
    "A community-powered cooperative offering trusted services across the region.",
  metadataBase: new URL("https://bhcooperative.com"),
  openGraph: {
    title: "Brazilian Hands Cooperative",
    description:
      "A community-powered cooperative offering trusted services across the region.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brazilian Hands Cooperative",
    description:
      "A community-powered cooperative offering trusted services across the region.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CTVCGDG3KM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CTVCGDG3KM');`}
        </Script>
        <LocaleShell>{children}</LocaleShell>
      </body>
    </html>
  );
}
