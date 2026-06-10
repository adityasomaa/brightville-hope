# Brightville Hope School — Website & Student Portal

Marketing site and student portal for **Brightville Hope School**, an independent
PreK–12 school in Lincoln Park, Chicago. The flagship campus is under
construction (opening Fall 2027), so the site leads with the story of a school
being built — modeled structurally on top-tier independent-school sites.

**Live:** deployed on Vercel · **Data:** Supabase (Postgres + RLS)

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS v4** — design tokens in `app/globals.css`
- **Framer Motion** — reveals, page transitions, mobile menu, loaders
- **Lenis** — smooth scrolling, desktop pointers only (`components/LenisProvider.tsx`)
- **Supabase** — announcements, events, assignments, portal users, inquiries
- **jose + bcryptjs** — signed HTTP-only session cookie for the portal

## Design system

Editorial "warm cream / deep pine" palette, Fraunces display serif +
Outfit sans + JetBrains Mono for numerals. All imagery is original SVG
graphic art (`components/PlaceholderArt.tsx`) — no stock photos.

## Structure

```
app/
├── (site)/            public site: home, about, leadership, academics (+3
│                      divisions), student life, arts, athletics, admissions,
│                      apply, tuition, news, contact, 404
│   └── template.tsx   page-to-page wipe transition
├── admin/             portal sign-in (split-screen) + student dashboard
├── api/               auth login/logout, admissions inquiries
└── icon.svg           site icon (sunrise mark)
components/            header (mega-menu + hamburger), footer (live Chicago
                       clock), loaders, forms (custom date fields), dashboard
lib/                   content.ts (single source of copy), auth.ts, supabase.ts
supabase/              schema.sql, seed.sql, apply.mjs (management-API runner)
```

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## Environment variables

See `.env.example`. Required in production: `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `AUTH_SECRET`,
plus optional `ADMIN_USERNAME`/`ADMIN_PASSWORD` as a database-down fallback
for the portal.

## Database

Tables: `portal_users`, `announcements` (public/students audiences),
`events`, `assignments`, `inquiries`. RLS is enabled everywhere; anonymous
clients can read only public announcements and events. Apply with:

```bash
SUPABASE_ACCESS_TOKEN=sbp_xxx node supabase/apply.mjs
```

## Portal

`/admin` — styled sign-in. Credentials are verified against
`portal_users` (bcrypt) and a 7-day JWT session cookie is set.
`/admin/dashboard` — student dashboard: school updates, schoolwork with
due dates and statuses, today's schedule, grades snapshot, profile, and
upcoming events. Server-side guarded; signed out users are redirected.
