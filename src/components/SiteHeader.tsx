import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-mist bg-white">
      <div className="bg-pine text-white">
        <div className="mx-auto flex w-full max-w-none items-center justify-between px-8 py-2 text-xs">
          <span>Trusted cooperative services for homes and offices.</span>
          <span>(617) 555-0144</span>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-none items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
          <Image
            src="/assets/logo_g.png"
            alt="Brazilian Hands Cooperative"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="font-display text-2xl tracking-tight text-charcoal">
            Brazilian Hands
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-charcoal/70 transition hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/register-provider"
          className="rounded-full bg-sun px-4 py-2 text-sm font-semibold text-charcoal transition hover:translate-y-[-1px] hover:bg-sun/90"
        >
          Become a Provider
        </Link>
      </div>
    </header>
  );
}
