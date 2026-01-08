import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-none flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-charcoal/50">
        404
      </p>
      <h1 className="font-display text-3xl text-charcoal">
        Pagina nao encontrada
      </h1>
      <p className="text-sm text-charcoal/70">
        A pagina que voce procura nao existe ou foi movida.
      </p>
      <Link
        href="/pt"
        className="rounded-full bg-pine px-5 py-2 text-sm font-semibold text-white"
      >
        Voltar para o inicio
      </Link>
    </div>
  );
}
