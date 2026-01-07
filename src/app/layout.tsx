import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

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
        <div className="flex min-h-screen flex-col bg-snow text-charcoal">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
