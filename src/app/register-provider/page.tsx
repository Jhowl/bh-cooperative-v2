import ProviderRegistrationForm from "./provider-registration-form";

export const metadata = {
  title: "Provider Registration",
};

export default function RegisterProviderPage() {
  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none space-y-8 px-6 sm:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            Provider Registration
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            Join the cooperative and grow with us.
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">
            Share your details and availability. Our coordinators will review
            your submission and follow up with onboarding steps.
          </p>
        </div>
        <ProviderRegistrationForm />
      </div>
    </div>
  );
}
