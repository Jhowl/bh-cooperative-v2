import RegisterProviderPageContent from "../../../components/pages/register-provider-page";

export const metadata = {
  title: "Cadastro de Prestador",
  description:
    "Junte-se a cooperativa na Irlanda como prestador de limpeza, beleza feminina, jardinagem, pintura e pequenos reparos.",
  openGraph: {
    title: "Cadastro de Prestador na Irlanda",
    description:
      "Junte-se a cooperativa na Irlanda como prestador de limpeza, beleza feminina, jardinagem, pintura e pequenos reparos.",
  },
  twitter: {
    title: "Cadastro de Prestador na Irlanda",
    description:
      "Junte-se a cooperativa na Irlanda como prestador de limpeza, beleza feminina, jardinagem, pintura e pequenos reparos.",
  },
};

export default function PortugueseRegisterProviderPage() {
  return <RegisterProviderPageContent locale="pt" />;
}
