import AboutPageContent from "../../../components/pages/about-page";

export const metadata = {
  title: "Sobre",
  description:
    "Conheca a Brazilian Hands Cooperative na Irlanda, conectando prestadores confiaveis para limpeza, beleza feminina e servicos domesticos.",
  openGraph: {
    title: "Sobre a Brazilian Hands Cooperative",
    description:
      "Conheca a Brazilian Hands Cooperative na Irlanda, conectando prestadores confiaveis para limpeza, beleza feminina e servicos domesticos.",
  },
  twitter: {
    title: "Sobre a Brazilian Hands Cooperative",
    description:
      "Conheca a Brazilian Hands Cooperative na Irlanda, conectando prestadores confiaveis para limpeza, beleza feminina e servicos domesticos.",
  },
};

export default function PortugueseAboutPage() {
  return <AboutPageContent locale="pt" />;
}
