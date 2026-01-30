import ContactPageContent from "../../components/pages/contact-page";

export const metadata = {
  title: "Contact",
  description:
    "Contact our Ireland team to request services including women's beauty, cleaning, and home support.",
  openGraph: {
    title: "Contact Brazilian Hands Cooperative",
    description:
      "Contact our Ireland team to request services including women's beauty, cleaning, and home support.",
  },
  twitter: {
    title: "Contact Brazilian Hands Cooperative",
    description:
      "Contact our Ireland team to request services including women's beauty, cleaning, and home support.",
  },
};

export default function ContactPage() {
  return <ContactPageContent locale="en" />;
}
