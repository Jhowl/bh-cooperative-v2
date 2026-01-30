import ContactPageContent from "../../../components/pages/contact-page";

export const metadata = {
  title: "Contato",
  description:
    "Entre em contato com nossa equipe na Irlanda para solicitar servicos, incluindo beleza feminina e cuidados para o lar.",
  openGraph: {
    title: "Contato Brazilian Hands Cooperative",
    description:
      "Entre em contato com nossa equipe na Irlanda para solicitar servicos, incluindo beleza feminina e cuidados para o lar.",
  },
  twitter: {
    title: "Contato Brazilian Hands Cooperative",
    description:
      "Entre em contato com nossa equipe na Irlanda para solicitar servicos, incluindo beleza feminina e cuidados para o lar.",
  },
};

export default function PortugueseContactPage() {
  return <ContactPageContent locale="pt" />;
}
