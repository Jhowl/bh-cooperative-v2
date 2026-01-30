import { getAdminSessionConfig } from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

type AdminLoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = searchParams ?? {};
  const error = params.error === "1";
  const nextPath = typeof params.next === "string" ? params.next : "/admin";

  const { password, secret } = getAdminSessionConfig();
  const isConfigured = Boolean(password && secret);

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-mist bg-white/70 p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
        Admin
      </p>
      <h1 className="mt-3 font-display text-3xl text-charcoal">
        Manager sign in
      </h1>
      <p className="mt-3 text-sm text-charcoal/70">
        This area is restricted to site managers.
      </p>

      {!isConfigured ? (
        <div className="mt-6 rounded-2xl border border-sun/40 bg-sun/10 px-4 py-3 text-sm text-charcoal">
          Admin authentication is not configured. Set `ADMIN_PASSWORD` and
          `ADMIN_SESSION_SECRET`.
        </div>
      ) : (
        <form
          method="POST"
          action={`/api/admin/login?next=${encodeURIComponent(nextPath)}`}
          className="mt-6 grid gap-4"
        >
          <label className="space-y-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
              autoFocus
            />
          </label>

          <button
            type="submit"
            className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine-dark"
          >
            Sign in
          </button>

          {error && (
            <div className="rounded-2xl border border-sun/40 bg-sun/10 px-4 py-3 text-sm text-charcoal">
              Incorrect password.
            </div>
          )}
        </form>
      )}
    </div>
  );
}
