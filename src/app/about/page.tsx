import AboutPageContent from "../../components/pages/about-page";

export const metadata = {
  title: "About",
  description:
    "Learn about Brazilian Hands Cooperative in Ireland, connecting trusted providers for cleaning, women's beauty, and home services.",
  openGraph: {
    title: "About Brazilian Hands Cooperative",
    description:
      "Learn about Brazilian Hands Cooperative in Ireland, connecting trusted providers for cleaning, women's beauty, and home services.",
  },
  twitter: {
    title: "About Brazilian Hands Cooperative",
    description:
      "Learn about Brazilian Hands Cooperative in Ireland, connecting trusted providers for cleaning, women's beauty, and home services.",
  },
};

export default function AboutPage() {
  return <AboutPageContent locale="en" />;
}
