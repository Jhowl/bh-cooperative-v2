export const metadata = {
  title: "Services",
};

const serviceGroups = [
  {
    title: "Cleaning Services",
    items: ["Heavy cleaning", "Regular cleaning", "Post-visit detailing"],
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
];

export default function ServicesPage() {
  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none space-y-10 px-6 sm:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            Services
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            Built around real-life needs, delivered by trusted members.
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">
            We collaborate with every client to tailor scope, schedule, and care
            standards. Services are available as one-time visits or recurring
            engagements.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
            >
              <h2 className="font-display text-xl text-charcoal">{group.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                {group.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-mist bg-pine px-6 py-8 text-white">
          <h3 className="font-display text-2xl">
            Need a custom service plan?
          </h3>
          <p className="mt-3 text-sm text-white/80">
            Our coordinators can build a schedule that fits your household or
            organization.
          </p>
        </div>
      </div>
    </div>
  );
}
