import ServicesPageContent from "../../components/pages/services-page";

export const metadata = {
  title: "Services",
  description:
    "Explore cleaning, gardening, painting, women's beauty, and handyman services across Ireland.",
  openGraph: {
    title: "Services in Ireland",
    description:
      "Explore cleaning, gardening, painting, women's beauty, and handyman services across Ireland.",
  },
  twitter: {
    title: "Services in Ireland",
    description:
      "Explore cleaning, gardening, painting, women's beauty, and handyman services across Ireland.",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent locale="en" />;
}
