This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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
