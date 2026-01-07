import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="px-6 pb-16 pt-20">
      <div className="mx-auto w-full max-w-none rounded-3xl border border-mist bg-white/70 p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl text-charcoal">
          We couldn’t find that page.
        </h1>
        <p className="mt-4 text-lg text-charcoal/80">
          The page may have moved or the link might be outdated.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}
