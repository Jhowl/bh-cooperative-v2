## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Admin Dashboard

The manager-only admin dashboard lives at:

- `http://localhost:3000/admin` (dev)
- `http://localhost:3005/admin` (Docker)

It shows:

- Provider registrations (`service_providers`)
- Service requests (`service_requests`)

Filters:

- `name`: filters by name/email
- `service`: filters by requested service

Example: `http://localhost:3000/admin?name=maria&service=cleaning`

## Environment Variables

Copy `.env.example` to `.env` and fill in values.

Required (server-side):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Admin (site manager only):

- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- Optional: `ADMIN_SESSION_MAX_AGE_SECONDS` (defaults to 30 days)

## Docker

This project listens on port `3005` in Docker.

```bash
docker compose up --build
```

Make sure your `.env` exists before starting Docker.

## Supabase SQL Configuration

Run the following SQL in your Supabase project to set up the required tables, indexes, and policies:

```sql
create table if not exists public.service_providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  city text not null,
  services text[] not null,
  availability text,
  file_url text,
  created_at timestamptz not null default now()
);

create index if not exists service_providers_created_at_idx
  on public.service_providers (created_at desc);

alter table public.service_providers enable row level security;

create policy "service_role_inserts_only"
  on public.service_providers
  for insert
  to service_role
  with check (true);

create unique index if not exists service_providers_email_unique
  on public.service_providers (email);

insert into storage.buckets (id, name, public)
values ('provider-files', 'provider-files', true)
on conflict (id) do nothing;

create policy "service_role_uploads_only"
on storage.objects
for insert
to service_role
with check (bucket_id = 'provider-files');

create policy "public_read_provider_files"
on storage.objects
for select
to public
using (bucket_id = 'provider-files');

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  other_service text,
  zipcode text not null,
  referral_source text not null,
  created_at timestamptz not null default now()
);

create index if not exists service_requests_created_at_idx
  on public.service_requests (created_at desc);

alter table public.service_requests enable row level security;

create policy "service_role_inserts_service_requests"
  on public.service_requests
  for insert
  to service_role
  with check (true);

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
