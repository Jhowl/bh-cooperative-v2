import HomePageContent from "../../components/pages/home-page";

export const metadata = {
  title: "Inicio",
  description:
    "Servicos cooperativos na Irlanda, incluindo limpeza, jardinagem, pintura, beleza feminina e pequenos reparos.",
  openGraph: {
    title: "Brazilian Hands Cooperative na Irlanda",
    description:
      "Servicos cooperativos na Irlanda, incluindo limpeza, jardinagem, pintura, beleza feminina e pequenos reparos.",
  },
  twitter: {
    title: "Brazilian Hands Cooperative na Irlanda",
    description:
      "Servicos cooperativos na Irlanda, incluindo limpeza, jardinagem, pintura, beleza feminina e pequenos reparos.",
  },
};

export default function PortugueseHomePage() {
  return <HomePageContent locale="pt" />;
}
