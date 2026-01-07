import Image from "next/image";
import Link from "next/link";
import HeroRequestForm from "../components/HeroRequestForm";

const services = [
  {
    title: "Heavy Cleaning",
    description: "Deep, detailed cleaning for high-traffic or overdue spaces.",
    image: "/assets/services/deep.jpg",
  },
  {
    title: "Regular Cleaning",
    description: "Reliable recurring care to keep your home or office fresh.",
    image: "/assets/services/residential.jpg",
  },
  {
    title: "Gardening",
    description: "Seasonal upkeep, planting, and outdoor care support.",
    image: "/assets/services/window.jpg",
  },
  {
    title: "Painting",
    description: "Interior touch-ups and refreshes with careful prep work.",
    image: "/assets/services/commercial.jpg",
  },
];

const testimonials = [
  {
    name: "Sofia M.",
    quote:
      "Dependable, thoughtful, and detailed. The cooperative makes scheduling easy.",
    image: "/assets/testimonials/ada.jpg",
  },
  {
    name: "Marcelo R.",
    quote:
      "Our office looks incredible after every visit. Communication is top tier.",
    image: "/assets/testimonials/samir.jpg",
  },
];

export default function HomePage() {
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
              Cleaning services
            </span>
            <h1 className="font-display text-4xl leading-tight text-charcoal md:text-5xl">
              Brazilian Hands Expert Cleaning Services Await
            </h1>
            <p className="text-lg text-charcoal/70">
              Professional, reliable cleaning teams supporting homes, offices,
              and community spaces across the region.
            </p>
            <div className="grid gap-3 rounded-2xl border border-mist bg-snow p-4 text-sm text-charcoal/70 lg:max-w-[520px]">
              <p>• Heavy Cleaning</p>
              <p>• Regular Cleaning</p>
              <p>• Gardening</p>
              <p>• Painting</p>
              <p>• Handyman (minor repairs)</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-pine px-6 py-3 text-sm font-semibold text-pine"
              >
                Contact Us
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
                Request a service
              </p>
              <HeroRequestForm />
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
              About services
            </p>
            <h2 className="font-display text-3xl text-charcoal">
              Experience expert cleaning services.
            </h2>
            <p className="text-sm text-charcoal/90">
              At
              <span className="font-semibold"> BH Cooperative</span>, 
              we believe in providing exceptional service with a personal touch. Founded by a group of hardworking Brazilians in Ireland, 
              our mission is simple: to make your life easier by offering high-quality services in areas like cleaning, gardening, painting, and much more. Whether it’s a one-time job or regular support, we’re committed to delivering excellence in everything we do.
            </p>    
            <Link
              href="/services"
              className="inline-flex rounded-full bg-pine px-5 py-2 text-sm font-semibold text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-mint/60">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pine">
              Why choose us
            </p>
            <h2 className="font-display text-3xl text-charcoal">
              Reasons to choose Brazilian Hands.
            </h2>
            <p className="text-sm text-charcoal/70">
              Your safety comes first—we thoroughly vet our professionals so
              you can trust who’s in your home. Our experienced team delivers
              top-quality services at affordable prices.
            </p>
            <div className="grid gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="font-semibold text-charcoal">Professional expertise</p>
                <p className="text-sm text-charcoal/70">
                  Trained providers with quality reviews and ongoing support.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="font-semibold text-charcoal">Customized solutions</p>
                <p className="text-sm text-charcoal/70">
                  Every service plan is tailored for your home or workplace.
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
                Comprehensive cleaning
              </p>
              <h2 className="mt-3 font-display text-3xl">
                Services for your needs.
              </h2>
            </div>
            <Link
              href="/register-provider"
              className="rounded-full bg-sun px-5 py-2 text-sm font-semibold text-charcoal"
            >
              Become a Provider
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
          Testimonials
        </p>
        <h2 className="mt-3 font-display text-3xl text-charcoal">
          Stories from our customers.
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
              <p className="mt-4 text-sm text-charcoal/80">“{testimonial.quote}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pine">
              Limited-time offer
            </p>
            <h2 className="mt-3 font-display text-3xl text-charcoal">
              Exclusive packages for new clients.
            </h2>
            <p className="mt-2 text-sm text-charcoal/70">
              Book a recurring service plan and receive a bonus deep clean.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
