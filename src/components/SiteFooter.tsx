import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-pine text-white">
      <div className="mx-auto flex w-full max-w-none flex-col gap-6 px-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo_w.png"
              alt="Brazilian Hands Cooperative"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <p className="font-display text-xl">Brazilian Hands Cooperative</p>
          </div>
          <p className="mt-2 text-sm text-white/70">
            Building trusted connections between local providers and families.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
          <Link href="/services" className="hover:text-white">
            Services
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/register-provider" className="hover:text-white">
            Provider Registration
          </Link>
        </div>
        <p className="text-xs text-white/60">© 2025 Brazilian Hands Cooperative</p>
      </div>
    </footer>
  );
}
