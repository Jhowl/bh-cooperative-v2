import HomePageContent from "../components/pages/home-page";

export const metadata = {
  title: "Home",
  description:
    "Trusted cooperative services in Ireland including cleaning, gardening, painting, women's beauty, and handyman support.",
  openGraph: {
    title: "Brazilian Hands Cooperative in Ireland",
    description:
      "Trusted cooperative services in Ireland including cleaning, gardening, painting, women's beauty, and handyman support.",
  },
  twitter: {
    title: "Brazilian Hands Cooperative in Ireland",
    description:
      "Trusted cooperative services in Ireland including cleaning, gardening, painting, women's beauty, and handyman support.",
  },
};

export default function HomePage() {
  return <HomePageContent locale="en" />;
}
