import Image from "next/image";
import Link from "next/link";
import HeroRequestForm from "../HeroRequestForm";
import { getTranslations, localizePath, type Locale } from "../../lib/i18n";

type HomePageContentProps = {
  locale: Locale;
};

export default function HomePageContent({ locale }: HomePageContentProps) {
  const t = getTranslations(locale);

  const services = t.home.servicesCards.map((service, index) => ({
    ...service,
    image: [
      "/assets/services/deep.jpg",
      "/assets/services/residential.jpg",
      "/assets/services/window.jpg",
      "/assets/services/commercial.jpg",
    ][index],
  }));

  const testimonials = t.home.testimonials.map((testimonial, index) => ({
    ...testimonial,
    image: ["/assets/testimonials/ada.jpg", "/assets/testimonials/samir.jpg"][index],
  }));

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-pine" />
        <div
          className="absolute right-0 top-0 h-full w-1/2 bg-pine-dark"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)" }}
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-mint px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-pine-dark">
              {t.home.heroBadge}
            </span>
            <h1 className="font-display text-4xl leading-tight text-charcoal md:text-5xl">
              {t.home.heroTitle}
            </h1>
            <p className="text-lg text-charcoal/70">{t.home.heroIntro}</p>
            <div className="grid gap-3 rounded-2xl border border-mist bg-snow p-4 text-sm text-charcoal/70 lg:max-w-[520px]">
              {t.home.heroServices.map((service) => (
                <p key={service}>- {service}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={localizePath(locale, "/services")}
                className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white"
              >
                {t.home.heroPrimaryCta}
              </Link>
              <Link
                href={localizePath(locale, "/contact")}
                className="rounded-full border border-pine px-6 py-3 text-sm font-semibold text-pine"
              >
                {t.home.heroSecondaryCta}
              </Link>
            </div>
          </div>
          <div className="grid items-end gap-6 md:grid-cols-[1fr_1fr]">
            <div className="pointer-events-none flex items-end justify-center md:justify-start md:translate-x-[-30px] lg:translate-x-[-50px]">
              <Image
                src="/assets/bhc-hero.png"
                alt="Professional cleaner ready to help"
                width={520}
                height={520}
                className="h-auto w-full max-w-90 translate-y-6 object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.2)] md:max-w-105 md:translate-y-21"
                priority
              />
            </div>
            <div className="relative z-20 w-full rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
                {t.home.requestTitle}
              </p>
              <HeroRequestForm locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-snow">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-mint p-6 shadow-sm">
            <Image
              src="/assets/working.jpg"
              alt="Gloved hand cleaning a surface"
              width={520}
              height={360}
              className="h-52 w-full rounded-2xl object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pine">
              {t.home.aboutBadge}
            </p>
            <h2 className="font-display text-3xl text-charcoal">
              {t.home.aboutTitle}
            </h2>
            <p className="text-sm text-charcoal/90">{t.home.aboutCopy}</p>
            <Link
              href={localizePath(locale, "/services")}
              className="inline-flex rounded-full bg-pine px-5 py-2 text-sm font-semibold text-white"
            >
              {t.home.aboutCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-mint/60">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pine">
              {t.home.whyBadge}
            </p>
            <h2 className="font-display text-3xl text-charcoal">
              {t.home.whyTitle}
            </h2>
            <p className="text-sm text-charcoal/70">{t.home.whyCopy}</p>
            <div className="grid gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="font-semibold text-charcoal">
                  {t.home.reasonOneTitle}
                </p>
                <p className="text-sm text-charcoal/70">
                  {t.home.reasonOneCopy}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="font-semibold text-charcoal">
                  {t.home.reasonTwoTitle}
                </p>
                <p className="text-sm text-charcoal/70">
                  {t.home.reasonTwoCopy}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Image
              src="/assets/choose-img.jpg"
              alt="Professional cleaning team"
              width={480}
              height={360}
              className="h-56 w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-pine py-14">
        <div className="mx-auto w-full max-w-7xl px-6 text-white sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                {t.home.servicesBadge}
              </p>
              <h2 className="mt-3 font-display text-3xl">
                {t.home.servicesTitle}
              </h2>
            </div>
            <Link
              href={localizePath(locale, "/register-provider")}
              className="rounded-full bg-sun px-5 py-2 text-sm font-semibold text-charcoal"
            >
              {t.home.servicesCta}
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="rounded-3xl bg-white/10 p-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={420}
                  height={240}
                  className="h-36 w-full rounded-2xl object-cover"
                />
                <h3 className="mt-4 font-display text-xl">{service.title}</h3>
                <p className="mt-2 text-sm text-white/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pine">
          {t.home.testimonialsBadge}
        </p>
        <h2 className="mt-3 font-display text-3xl text-charcoal">
          {t.home.testimonialsTitle}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-3xl border border-mist bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pine">
                  {testimonial.name}
                </p>
              </div>
              <p className="mt-4 text-sm text-charcoal/80">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pine">
              {t.home.offerBadge}
            </p>
            <h2 className="mt-3 font-display text-3xl text-charcoal">
              {t.home.offerTitle}
            </h2>
            <p className="mt-2 text-sm text-charcoal/70">
              {t.home.offerCopy}
            </p>
          </div>
          <Link
            href={localizePath(locale, "/contact")}
            className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white"
          >
            {t.home.offerCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
