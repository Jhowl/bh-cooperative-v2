export type Locale = "en" | "pt";

type NavItem = { href: string; label: string };
type OptionItem = { value: string; label: string };

type Translations = {
  header: {
    topBar: string;
    phone: string;
    brand: string;
    nav: NavItem[];
    cta: string;
  };
  footer: {
    brand: string;
    tagline: string;
    links: NavItem[];
    copyright: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroIntro: string;
    heroServices: string[];
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    requestTitle: string;
    aboutBadge: string;
    aboutTitle: string;
    aboutCopy: string;
    aboutCta: string;
    whyBadge: string;
    whyTitle: string;
    whyCopy: string;
    reasonOneTitle: string;
    reasonOneCopy: string;
    reasonTwoTitle: string;
    reasonTwoCopy: string;
    servicesBadge: string;
    servicesTitle: string;
    servicesCta: string;
    servicesCards: Array<{ title: string; description: string }>;
    testimonialsBadge: string;
    testimonialsTitle: string;
    testimonials: Array<{ name: string; quote: string }>;
    offerBadge: string;
    offerTitle: string;
    offerCopy: string;
    offerCta: string;
  };
  about: {
    badge: string;
    title: string;
    intro: string;
    values: Array<{ title: string; description: string }>;
    teamTitle: string;
    teamCopy: string;
  };
  services: {
    badge: string;
    title: string;
    intro: string;
    groups: Array<{ title: string; items: string[] }>;
    ctaTitle: string;
    ctaCopy: string;
  };
  blog: {
    badge: string;
    title: string;
    intro: string;
    readMore: string;
    draft: string;
  };
  registerProvider: {
    badge: string;
    title: string;
    intro: string;
  };
  contact: {
    badge: string;
    title: string;
    intro: string;
    infoPhone: string;
    infoEmail: string;
    infoHours: string;
  };
  forms: {
    request: {
      name: string;
      phone: string;
      email: string;
      servicePlaceholder: string;
      services: OptionItem[];
      otherPlaceholder: string;
      zipcode: string;
      referralPlaceholder: string;
      referralOptions: OptionItem[];
      terms: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
    provider: {
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      city: string;
      cityPlaceholder: string;
      servicesTitle: string;
      services: OptionItem[];
      availability: string;
      availabilityDefault: string;
      upload: string;
      chooseFile: string;
      noFile: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
    contact: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
  };
};

const translations: Record<Locale, Translations> = {
  en: {
    header: {
      topBar: "Trusted cooperative services for homes and offices.",
      phone: "(617) 555-0144",
      brand: "Brazilian Hands",
      nav: [
        { href: "/about", label: "About" },
        { href: "/services", label: "Services" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
      ],
      cta: "Become a Provider",
    },
    footer: {
      brand: "Brazilian Hands Cooperative",
      tagline: "Building trusted connections between local providers and families.",
      links: [
        { href: "/services", label: "Services" },
        { href: "/contact", label: "Contact" },
        { href: "/register-provider", label: "Provider Registration" },
      ],
      copyright: "Brazilian Hands Cooperative",
    },
    home: {
      heroBadge: "Cleaning services",
      heroTitle: "Brazilian Hands Expert Cleaning Services Await",
      heroIntro:
        "Professional, reliable teams supporting homes, offices, and community spaces across Ireland, including women's beauty services.",
      heroServices: [
        "Heavy Cleaning",
        "Regular Cleaning",
        "Gardening",
        "Painting",
        "Women's beauty",
        "Handyman (minor repairs)",
      ],
      heroPrimaryCta: "Explore Services",
      heroSecondaryCta: "Contact Us",
      requestTitle: "Request a service",
      aboutBadge: "About services",
      aboutTitle: "Experience expert cleaning services.",
      aboutCopy:
        "At BH Cooperative, we believe in providing exceptional service with a personal touch. Founded by a group of hardworking Brazilians in Ireland, our mission is simple: to make your life easier by offering high-quality services in areas like cleaning, gardening, women's beauty, and more. Whether its a one-time job or regular support, were committed to delivering excellence in everything we do.",
      aboutCta: "Learn More",
      whyBadge: "Why choose us",
      whyTitle: "Reasons to choose Brazilian Hands.",
      whyCopy:
        "Your safety comes first - we thoroughly vet our professionals so you can trust whos in your home. Our experienced team delivers top-quality services at affordable prices.",
      reasonOneTitle: "Professional expertise",
      reasonOneCopy: "Trained providers with quality reviews and ongoing support.",
      reasonTwoTitle: "Customized solutions",
      reasonTwoCopy: "Every service plan is tailored for your home or workplace.",
      servicesBadge: "Comprehensive cleaning",
      servicesTitle: "Services for your needs.",
      servicesCta: "Become a Provider",
      servicesCards: [
        {
          title: "Heavy Cleaning",
          description:
            "Deep, detailed cleaning for high-traffic or overdue spaces.",
        },
        {
          title: "Regular Cleaning",
          description: "Reliable recurring care to keep your home or office fresh.",
        },
        {
          title: "Gardening",
          description: "Seasonal upkeep, planting, and outdoor care support.",
        },
        {
          title: "Painting",
          description: "Interior touch-ups and refreshes with careful prep work.",
        },
      ],
      testimonialsBadge: "Testimonials",
      testimonialsTitle: "Stories from our customers.",
      testimonials: [
        {
          name: "Sofia M.",
          quote:
            "Dependable, thoughtful, and detailed. The cooperative makes scheduling easy.",
        },
        {
          name: "Marcelo R.",
          quote:
            "Our office looks incredible after every visit. Communication is top tier.",
        },
      ],
      offerBadge: "Limited-time offer",
      offerTitle: "Exclusive packages for new clients.",
      offerCopy: "Book a recurring service plan and receive a bonus deep clean.",
      offerCta: "Book Now",
    },
    about: {
      badge: "About the Cooperative",
      title: "A member-led cooperative grounded in trust and transparency.",
      intro:
        "Brazilian Hands Cooperative was founded to create a trusted, community-led network of service professionals. We match families, homes, and workplaces with providers who are vetted, supported, and fairly compensated.",
      values: [
        {
          title: "Collective Care",
          description:
            "We build sustainable opportunities by sharing resources and knowledge.",
        },
        {
          title: "Professional Excellence",
          description:
            "Members follow clear standards, ongoing training, and service quality reviews.",
        },
        {
          title: "Cultural Connection",
          description:
            "Our roots shape how we communicate, support, and advocate for clients.",
        },
      ],
      teamTitle: "Our team",
      teamCopy:
        "The cooperative is guided by a council of providers, community advocates, and client liaisons. Together we set standards, handle feedback, and ensure every engagement respects the cooperatives values.",
    },
    services: {
      badge: "Services",
      title: "Built around real-life needs, delivered by trusted members.",
      intro:
        "We collaborate with every client in Ireland to tailor scope, schedule, and care standards. Services are available as one-time visits or recurring engagements.",
      groups: [
        {
          title: "Cleaning Services",
          items: ["Heavy cleaning", "Regular cleaning", "Post-visit detailing"],
        },
        {
          title: "Beauty Services",
          items: ["Women's beauty", "Event-ready styling", "Personal care"],
        },
        {
          title: "Outdoor Care",
          items: ["Gardening upkeep", "Seasonal planting", "Outdoor cleanup"],
        },
        {
          title: "Painting",
          items: ["Interior touch-ups", "Room refreshes", "Prep and protection"],
        },
        {
          title: "Handyman",
          items: ["Minor repairs", "Fixture replacements", "Small assembly tasks"],
        },
      ],
      ctaTitle: "Need a custom service plan?",
      ctaCopy:
        "Our coordinators can build a schedule that fits your household or organization.",
    },
    blog: {
      badge: "Blog",
      title: "News, updates, and cooperative stories.",
      intro: "Insights from providers, coordinators, and community partners.",
      readMore: "Read more ->",
      draft: "Draft",
    },
    registerProvider: {
      badge: "Provider Registration",
      title: "Join the cooperative and grow with us.",
      intro:
        "Share your details and availability. Our coordinators will review your submission and follow up with onboarding steps.",
    },
    contact: {
      badge: "Contact",
      title: "Lets match you with the right provider.",
      intro:
        "Reach out to discuss services, availability, or partnership opportunities. Our coordinators respond within one business day.",
      infoPhone: "Phone: (617) 555-0144",
      infoEmail: "Email: hello@bhcooperative.com",
      infoHours: "Hours: Monday - Friday, 8:30am - 6pm",
    },
    forms: {
      request: {
        name: "Your name",
        phone: "Your phone number",
        email: "Your email",
        servicePlaceholder: "Choose a service",
        services: [
          { value: "Heavy Cleaning", label: "Heavy Cleaning" },
          { value: "Regular Cleaning", label: "Regular Cleaning" },
          { value: "Gardening", label: "Gardening" },
          { value: "Painting", label: "Painting" },
          { value: "Womens Beauty", label: "Women's beauty" },
          { value: "Handyman (minor repairs)", label: "Handyman (minor repairs)" },
          { value: "Other", label: "Other" },
        ],
        otherPlaceholder: "Tell us about the service you need",
        zipcode: "Zipcode",
        referralPlaceholder: "How did you find our company",
        referralOptions: [
          { value: "Referral", label: "Referral" },
          { value: "Google search", label: "Google search" },
          { value: "Social media", label: "Social media" },
        ],
        terms: "I agree to the terms and conditions",
        submit: "Request Services",
        submitting: "Sending...",
        success: "Thanks! We will contact you shortly to confirm details.",
        error: "Something went wrong. Please try again.",
      },
      provider: {
        fullName: "Full name",
        fullNamePlaceholder: "Maria Oliveira",
        email: "Email",
        emailPlaceholder: "maria@email.com",
        phone: "Phone",
        phonePlaceholder: "(353) 83 347 1038",
        city: "City",
        cityPlaceholder: "Cork, Ireland",
        servicesTitle: "Services offered",
        services: [
          { value: "Heavy Cleaning", label: "Heavy Cleaning" },
          { value: "Regular Cleaning", label: "Regular Cleaning" },
          { value: "Gardening", label: "Gardening" },
          { value: "Painting", label: "Painting" },
          { value: "Womens Beauty", label: "Women's beauty" },
          { value: "Handyman (minor repairs)", label: "Handyman (minor repairs)" },
        ],
        availability: "Availability",
        availabilityDefault: "Weekdays 8am-5pm, weekends flexible",
        upload: "Upload resume or certifications",
        chooseFile: "Choose file",
        noFile: "No file selected",
        submit: "Submit registration",
        submitting: "Submitting...",
        success: "Thank you for registering! We will be in touch soon.",
        error: "Something went wrong. Please try again.",
      },
      contact: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        message: "How can we help?",
        messagePlaceholder: "Tell us about your needs",
        submit: "Send message",
        submitting: "Sending...",
        success: "Thanks! We will reply within one business day.",
        error: "Something went wrong. Please try again.",
      },
    },
  },
  pt: {
    header: {
      topBar: "Servicos cooperativos confiaveis para casas e escritorios.",
      phone: "(353) 83 347 1038",
      brand: "Brazilian Hands",
      nav: [
        { href: "/about", label: "Sobre" },
        { href: "/services", label: "Servicos" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contato" },
      ],
      cta: "Seja um Prestador",
    },
    footer: {
      brand: "Brazilian Hands Cooperative",
      tagline: "Conectando familias e prestadores locais com confianca.",
      links: [
        { href: "/services", label: "Servicos" },
        { href: "/contact", label: "Contato" },
        { href: "/register-provider", label: "Cadastro de Prestador" },
      ],
      copyright: "Brazilian Hands Cooperative",
    },
    home: {
      heroBadge: "Servicos de limpeza",
      heroTitle: "Servicos de limpeza da Brazilian Hands",
      heroIntro:
        "Equipes profissionais e confiaveis para casas, escritorios e espacos comunitarios na Irlanda, incluindo beleza feminina.",
      heroServices: [
        "Limpeza pesada",
        "Limpeza regular",
        "Jardinagem",
        "Pintura",
        "Beleza feminina",
        "Marido de aluguel (pequenos reparos)",
      ],
      heroPrimaryCta: "Ver servicos",
      heroSecondaryCta: "Fale conosco",
      requestTitle: "Solicite um servico",
      aboutBadge: "Sobre os servicos",
      aboutTitle: "Experiencia com limpeza especializada.",
      aboutCopy:
        "Na BH Cooperative, acreditamos em um atendimento excelente e pessoal. Fundada por brasileiros na Irlanda, nossa missao e facilitar sua vida com servicos de qualidade em limpeza, jardinagem, beleza feminina e muito mais. Seja um trabalho unico ou suporte recorrente, entregamos excelencia.",
      aboutCta: "Saiba mais",
      whyBadge: "Por que escolher",
      whyTitle: "Razoes para escolher a Brazilian Hands.",
      whyCopy:
        "Sua seguranca vem primeiro - avaliamos nossos profissionais para que voce confie em quem entra na sua casa. Nossa equipe experiente entrega qualidade com preco justo.",
      reasonOneTitle: "Experiencia profissional",
      reasonOneCopy: "Prestadores treinados com suporte e avaliacao constante.",
      reasonTwoTitle: "Solucoes personalizadas",
      reasonTwoCopy: "Cada plano e adaptado para sua casa ou empresa.",
      servicesBadge: "Limpeza completa",
      servicesTitle: "Servicos para suas necessidades.",
      servicesCta: "Seja um Prestador",
      servicesCards: [
        {
          title: "Limpeza pesada",
          description: "Limpeza profunda para espacos com muita demanda.",
        },
        {
          title: "Limpeza regular",
          description: "Cuidado recorrente para manter tudo em ordem.",
        },
        {
          title: "Jardinagem",
          description: "Manutencao sazonal e apoio em areas externas.",
        },
        {
          title: "Pintura",
          description: "Acabamento interno com preparacao cuidadosa.",
        },
      ],
      testimonialsBadge: "Depoimentos",
      testimonialsTitle: "O que nossos clientes dizem.",
      testimonials: [
        {
          name: "Sofia M.",
          quote:
            "Confiavel, atencioso e detalhista. A cooperativa facilita tudo.",
        },
        {
          name: "Marcelo R.",
          quote:
            "Nosso escritorio fica impecavel. Comunicacao excelente.",
        },
      ],
      offerBadge: "Oferta especial",
      offerTitle: "Pacotes exclusivos para novos clientes.",
      offerCopy: "Agende um plano recorrente e ganhe uma limpeza extra.",
      offerCta: "Agendar agora",
    },
    about: {
      badge: "Sobre a cooperativa",
      title: "Uma cooperativa liderada por membros com transparencia.",
      intro:
        "A Brazilian Hands Cooperative nasceu para criar uma rede confiavel de profissionais. Conectamos familias, casas e empresas com prestadores avaliados, apoiados e valorizados.",
      values: [
        {
          title: "Cuidado coletivo",
          description:
            "Criamos oportunidades sustentaveis compartilhando recursos e conhecimento.",
        },
        {
          title: "Excelencia profissional",
          description:
            "Membros seguem padroes claros, treinamento continuo e revisoes.",
        },
        {
          title: "Conexao cultural",
          description:
            "Nossas raizes influenciam como comunicamos e cuidamos dos clientes.",
        },
      ],
      teamTitle: "Nosso time",
      teamCopy:
        "A cooperativa e guiada por prestadores, representantes da comunidade e clientes. Juntos definimos padroes, tratamos feedbacks e garantimos que cada servico siga nossos valores.",
    },
    services: {
      badge: "Servicos",
      title: "Criados para necessidades reais, com membros confiaveis.",
      intro:
        "Trabalhamos com cada cliente na Irlanda para ajustar escopo, horario e padroes. Atendemos visitas unicas ou contratos recorrentes.",
      groups: [
        {
          title: "Limpeza",
          items: ["Limpeza pesada", "Limpeza regular", "Detalhamento apos visita"],
        },
        {
          title: "Servicos de beleza",
          items: ["Beleza feminina", "Preparacao para eventos", "Cuidados pessoais"],
        },
        {
          title: "Area externa",
          items: ["Jardinagem", "Plantio sazonal", "Limpeza externa"],
        },
        {
          title: "Pintura",
          items: ["Retoques internos", "Renovacao de ambientes", "Protecao"],
        },
        {
          title: "Marido de aluguel",
          items: ["Pequenos reparos", "Troca de pecas", "Montagens simples"],
        },
      ],
      ctaTitle: "Precisa de um plano sob medida?",
      ctaCopy:
        "Nossos coordenadores podem criar um cronograma para sua casa ou empresa.",
    },
    blog: {
      badge: "Blog",
      title: "Novidades e historias da cooperativa.",
      intro: "Insights de prestadores, coordenadores e parceiros.",
      readMore: "Ler mais ->",
      draft: "Rascunho",
    },
    registerProvider: {
      badge: "Cadastro de Prestador",
      title: "Junte-se a cooperativa e cresca com a gente.",
      intro:
        "Compartilhe seus dados e disponibilidade. Nossa equipe vai revisar e entrar em contato.",
    },
    contact: {
      badge: "Contato",
      title: "Vamos encontrar o prestador certo para voce.",
      intro:
        "Fale conosco sobre servicos, disponibilidade ou parcerias. Respondemos em ate um dia util.",
      infoPhone: "Telefone: (353) 83 347 1038",
      infoEmail: "Email: hello@bhcooperative.com",
      infoHours: "Horario: Segunda a sexta, 8:30 - 18:00",
    },
    forms: {
      request: {
        name: "Seu nome",
        phone: "Seu telefone",
        email: "Seu email",
        servicePlaceholder: "Escolha um servico",
        services: [
          { value: "Heavy Cleaning", label: "Limpeza pesada" },
          { value: "Regular Cleaning", label: "Limpeza regular" },
          { value: "Gardening", label: "Jardinagem" },
          { value: "Painting", label: "Pintura" },
          { value: "Womens Beauty", label: "Beleza feminina" },
          {
            value: "Handyman (minor repairs)",
            label: "Marido de aluguel (pequenos reparos)",
          },
          { value: "Other", label: "Outro" },
        ],
        otherPlaceholder: "Descreva o servico que voce precisa",
        zipcode: "Codigo postal",
        referralPlaceholder: "Como encontrou nossa empresa",
        referralOptions: [
          { value: "Referral", label: "Indicacao" },
          { value: "Google search", label: "Pesquisa no Google" },
          { value: "Social media", label: "Redes sociais" },
        ],
        terms: "Concordo com os termos e condicoes",
        submit: "Solicitar servico",
        submitting: "Enviando...",
        success: "Obrigado! Vamos entrar em contato em breve.",
        error: "Algo deu errado. Tente novamente.",
      },
      provider: {
        fullName: "Nome completo",
        fullNamePlaceholder: "Maria Oliveira",
        email: "Email",
        emailPlaceholder: "maria@email.com",
        phone: "Telefone",
        phonePlaceholder: "+353 83 347 1038",
        city: "Cidade",
        cityPlaceholder: "Cork, Irlanda",
        servicesTitle: "Servicos oferecidos",
        services: [
          { value: "Heavy Cleaning", label: "Limpeza pesada" },
          { value: "Regular Cleaning", label: "Limpeza regular" },
          { value: "Gardening", label: "Jardinagem" },
          { value: "Painting", label: "Pintura" },
          { value: "Womens Beauty", label: "Beleza feminina" },
          {
            value: "Handyman (minor repairs)",
            label: "Marido de aluguel (pequenos reparos)",
          },
        ],
        availability: "Disponibilidade",
        availabilityDefault: "Dias da semana 8h-17h, fim de semana flexivel",
        upload: "Envie curriculo ou certificacoes",
        chooseFile: "Escolher arquivo",
        noFile: "Nenhum arquivo selecionado",
        submit: "Enviar cadastro",
        submitting: "Enviando...",
        success: "Obrigado! Vamos entrar em contato em breve.",
        error: "Algo deu errado. Tente novamente.",
      },
      contact: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "Email",
        emailPlaceholder: "voce@email.com",
        message: "Como podemos ajudar?",
        messagePlaceholder: "Conte sobre sua necessidade",
        submit: "Enviar mensagem",
        submitting: "Enviando...",
        success: "Obrigado! Respondemos em ate um dia util.",
        error: "Algo deu errado. Tente novamente.",
      },
    },
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.en;
}

export function localizePath(locale: Locale, path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  if (locale === "pt") {
    if (path === "/") {
      return "/pt";
    }
    if (path.startsWith("/pt")) {
      return path;
    }
    return `/pt${path}`;
  }

  return path;
}
