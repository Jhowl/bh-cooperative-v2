export const metadata = {
  title: "About",
};

const values = [
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
];

export default function AboutPage() {
  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none space-y-10 px-6 sm:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            About the Cooperative
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            A member-led cooperative grounded in trust and transparency.
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">
            Brazilian Hands Cooperative was founded to create a trusted,
            community-led network of service professionals. We match families,
            homes, and workplaces with providers who are vetted, supported, and
            fairly compensated.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
            >
              <h2 className="font-display text-xl text-charcoal">{value.title}</h2>
              <p className="mt-3 text-sm text-charcoal/70">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-mist bg-white/60 p-6">
          <h3 className="font-display text-2xl text-charcoal">Our team</h3>
          <p className="mt-3 text-sm text-charcoal/70">
            The cooperative is guided by a council of providers, community
            advocates, and client liaisons. Together we set standards, handle
            feedback, and ensure every engagement respects the cooperative’s
            values.
          </p>
        </div>
      </div>
    </div>
  );
}
