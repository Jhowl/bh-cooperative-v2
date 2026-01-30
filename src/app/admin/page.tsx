import { getSupabaseServerClient } from "../../lib/supabase";
import { getAdminSessionConfig } from "../../lib/admin-session";

export const dynamic = "force-dynamic";

type ProviderRow = {
  id?: string | number;
  created_at?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  services?: string[];
  availability?: string;
  file_url?: string | null;
};

type ServiceRequestRow = {
  id?: string | number;
  created_at?: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  other_service?: string;
  zipcode?: string;
  referral_source?: string;
};

type AdminFilters = {
  name?: string;
  service?: string;
};

type QueryResult = {
  data: unknown;
  error: { message: string } | null;
};

type SupabaseQuery = PromiseLike<QueryResult> & {
  or: (filters: string) => SupabaseQuery;
  contains: (
    column: string,
    value: string | readonly unknown[] | Record<string, unknown>,
  ) => SupabaseQuery;
  ilike: (column: string, pattern: string) => SupabaseQuery;
  order: (column: string, options: { ascending: boolean }) => SupabaseQuery;
  limit: (count: number) => SupabaseQuery;
};

function getSearchParam(
  value: string | string[] | undefined,
  options?: { maxLength?: number },
) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string") return "";
  const trimmed = raw.trim();
  const maxLength = options?.maxLength ?? 120;
  if (trimmed.length > maxLength) return trimmed.slice(0, maxLength);
  return trimmed;
}

function sanitizeForOrFilter(value: string) {
  return value.replace(/[(),]/g, " ").trim();
}

async function runQueryVariants<T>(variants: Array<() => PromiseLike<QueryResult>>) {
  let lastError: string | null = null;

  for (const variant of variants) {
    const result = await variant();
    if (!result.error) {
      return { rows: (result.data ?? []) as T[], error: null as string | null };
    }
    lastError = result.error.message;
  }

  return { rows: [] as T[], error: lastError ?? "Unable to load data." };
}

function applyProviderFilters(options: {
  query: SupabaseQuery;
  filters: AdminFilters;
  serviceMode: "contains" | "ilike" | "none";
}) {
  const name = sanitizeForOrFilter(options.filters.name ?? "");
  const service = options.filters.service?.trim() ?? "";

  let query = options.query;

  if (name) {
    query = query.or(`name.ilike.%${name}%,email.ilike.%${name}%`);
  }

  if (service) {
    if (options.serviceMode === "contains") {
      query = query.contains("services", [service]);
    } else if (options.serviceMode === "ilike") {
      query = query.ilike("services", `%${service}%`);
    }
  }

  return query;
}

async function fetchProviders(filters: AdminFilters) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { rows: [] as ProviderRow[], error: "Supabase is not configured." };
  }

  const client = supabase;
  const service = (filters.service ?? "").trim();

  const variants: Array<() => SupabaseQuery> = [];

  function baseQuery(): SupabaseQuery {
    return client
      .from("service_providers")
      .select(
        "id,created_at,name,email,phone,city,services,availability,file_url",
      )
      .limit(200) as unknown as SupabaseQuery;
  }

  const orderings: Array<"created_at" | "id"> = ["created_at", "id"];
  for (const ordering of orderings) {
    if (service) {
      variants.push(() =>
        applyProviderFilters({
          query: baseQuery().order(ordering, { ascending: false }),
          filters,
          serviceMode: "contains",
        }),
      );
      variants.push(() =>
        applyProviderFilters({
          query: baseQuery().order(ordering, { ascending: false }),
          filters,
          serviceMode: "ilike",
        }),
      );
      variants.push(() =>
        applyProviderFilters({
          query: baseQuery().order(ordering, { ascending: false }),
          filters,
          serviceMode: "none",
        }),
      );
    } else {
      variants.push(() =>
        applyProviderFilters({
          query: baseQuery().order(ordering, { ascending: false }),
          filters,
          serviceMode: "none",
        }),
      );
    }
  }

  return runQueryVariants<ProviderRow>(variants);
}

function applyServiceRequestFilters(options: {
  query: SupabaseQuery;
  filters: AdminFilters;
}) {
  const name = sanitizeForOrFilter(options.filters.name ?? "");
  const service = sanitizeForOrFilter(options.filters.service ?? "");

  let query = options.query;

  if (name) {
    query = query.or(`name.ilike.%${name}%,email.ilike.%${name}%`);
  }

  if (service) {
    query = query.or(
      `service.ilike.%${service}%,other_service.ilike.%${service}%`,
    );
  }

  return query;
}

async function fetchServiceRequests(filters: AdminFilters) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return {
      rows: [] as ServiceRequestRow[],
      error: "Supabase is not configured.",
    };
  }

  const client = supabase;

  function baseQuery(): SupabaseQuery {
    return client
      .from("service_requests")
      .select(
        "id,created_at,name,email,phone,service,other_service,zipcode,referral_source",
      )
      .limit(200) as unknown as SupabaseQuery;
  }

  const variants: Array<() => SupabaseQuery> = [
    () =>
      applyServiceRequestFilters({
        query: baseQuery().order("created_at", { ascending: false }),
        filters,
      }),
    () =>
      applyServiceRequestFilters({
        query: baseQuery().order("id", { ascending: false }),
        filters,
      }),
  ];

  return runQueryVariants<ServiceRequestRow>(variants);
}

type AdminDashboardSearchParams = Record<string, string | string[] | undefined>;

type AdminDashboardPageProps = {
  searchParams?: AdminDashboardSearchParams | Promise<AdminDashboardSearchParams>;
};

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const params = await Promise.resolve(searchParams ?? {});

  const filters: AdminFilters = {
    name: getSearchParam(params.name, { maxLength: 120 }),
    service: getSearchParam(params.service, { maxLength: 120 }),
  };

  const hasFilters = Boolean(filters.name || filters.service);

  const { password, secret } = getAdminSessionConfig();
  const isConfigured = Boolean(password && secret);

  const providers = await fetchProviders(filters);
  const requests = await fetchServiceRequests(filters);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            Admin
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">Dashboard</h1>
          <p className="mt-3 text-sm text-charcoal/70">
            View provider registrations and website requests.
          </p>
        </div>
        <form method="POST" action="/api/admin/logout">
          <button
            type="submit"
            className="rounded-full bg-charcoal px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-charcoal/90"
          >
            Sign out
          </button>
        </form>
      </div>

      <form
        method="GET"
        action="/admin"
        className="grid gap-4 rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              Name / Email
            </span>
            <input
              name="name"
              defaultValue={filters.name}
              className="w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
              placeholder="Search by name or email"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              Service
            </span>
            <input
              name="service"
              defaultValue={filters.service}
              className="w-full rounded-2xl border border-mist bg-white px-4 py-2 text-sm text-charcoal"
              placeholder="e.g. House Cleaning"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-pine px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-pine-dark"
            >
              Filter
            </button>
            {hasFilters && (
              <a
                href="/admin"
                className="rounded-full border border-mist bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal hover:bg-snow"
              >
                Clear
              </a>
            )}
          </div>

          {hasFilters && (
            <p className="text-xs text-charcoal/60">
              Showing results filtered by{filters.name ? " name" : ""}
              {filters.name && filters.service ? " and" : ""}
              {filters.service ? " service" : ""}.
            </p>
          )}
        </div>
      </form>

      {!isConfigured && (
        <div className="rounded-3xl border border-sun/40 bg-sun/10 p-6 text-sm text-charcoal">
          Admin authentication is not configured. Set `ADMIN_PASSWORD` and
          `ADMIN_SESSION_SECRET`.
        </div>
      )}

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-charcoal">
            Provider registrations
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Showing {providers.rows.length}
          </p>
        </div>

        {providers.error && (
          <div className="rounded-2xl border border-sun/40 bg-sun/10 px-4 py-3 text-sm text-charcoal">
            {providers.error}
          </div>
        )}

        <div className="overflow-x-auto rounded-3xl border border-mist bg-white/70 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white">
              <tr className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Services</th>
                <th className="px-4 py-3">File</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist">
              {providers.rows.map((provider) => (
                <tr
                  key={String(
                    provider.id ??
                      provider.email ??
                      provider.created_at ??
                      provider.name ??
                      "provider",
                  )}
                >
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {provider.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {provider.email ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {provider.phone ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {provider.city ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {Array.isArray(provider.services)
                      ? provider.services.join(", ")
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {provider.file_url ? (
                      <a
                        href={provider.file_url}
                        className="text-pine underline-offset-2 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-charcoal/60">
                    {provider.created_at
                      ? new Date(provider.created_at).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
              {providers.rows.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-charcoal/60"
                  >
                    No provider registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-charcoal">Service requests</h2>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Showing {requests.rows.length}
          </p>
        </div>

        {requests.error && (
          <div className="rounded-2xl border border-sun/40 bg-sun/10 px-4 py-3 text-sm text-charcoal">
            {requests.error}
          </div>
        )}

        <div className="overflow-x-auto rounded-3xl border border-mist bg-white/70 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white">
              <tr className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Zip</th>
                <th className="px-4 py-3">Referral</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist">
              {requests.rows.map((request) => (
                <tr
                  key={String(
                    request.id ??
                      request.email ??
                      request.created_at ??
                      request.name ??
                      "request",
                  )}
                >
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {request.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {request.email ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {request.phone ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {request.service
                      ? request.service === "Other" && request.other_service
                        ? `${request.service}: ${request.other_service}`
                        : request.service
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {request.zipcode ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {request.referral_source ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-xs text-charcoal/60">
                    {request.created_at
                      ? new Date(request.created_at).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
              {requests.rows.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-charcoal/60"
                  >
                    No service requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
