import RegisterProviderPageContent from "../../components/pages/register-provider-page";

export const metadata = {
  title: "Provider Registration",
  description:
    "Join our Ireland cooperative as a service provider for cleaning, women's beauty, gardening, painting, and handyman work.",
  openGraph: {
    title: "Provider Registration in Ireland",
    description:
      "Join our Ireland cooperative as a service provider for cleaning, women's beauty, gardening, painting, and handyman work.",
  },
  twitter: {
    title: "Provider Registration in Ireland",
    description:
      "Join our Ireland cooperative as a service provider for cleaning, women's beauty, gardening, painting, and handyman work.",
  },
};

export default function RegisterProviderPage() {
  return <RegisterProviderPageContent locale="en" />;
}
