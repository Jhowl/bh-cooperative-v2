import ServicesPageContent from "../../../components/pages/services-page";

export const metadata = {
  title: "Servicos",
  description:
    "Descubra servicos de limpeza, jardinagem, pintura, beleza feminina e pequenos reparos na Irlanda.",
  openGraph: {
    title: "Servicos na Irlanda",
    description:
      "Descubra servicos de limpeza, jardinagem, pintura, beleza feminina e pequenos reparos na Irlanda.",
  },
  twitter: {
    title: "Servicos na Irlanda",
    description:
      "Descubra servicos de limpeza, jardinagem, pintura, beleza feminina e pequenos reparos na Irlanda.",
  },
};

export default function PortugueseServicesPage() {
  return <ServicesPageContent locale="pt" />;
}
