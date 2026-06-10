-- Brightville Hope School — portal schema
-- Run via Supabase SQL editor or the management API.

create extension if not exists pgcrypto;

-- portal users (service-role access only; no anon policies)
create table if not exists public.portal_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  full_name text not null,
  role text not null default 'student',
  grade text,
  created_at timestamptz not null default now()
);
alter table public.portal_users enable row level security;

-- announcements: public ones readable by anyone, student-only via service role
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'General',
  body text not null,
  audience text not null default 'public' check (audience in ('public','students')),
  published_at timestamptz not null default now()
);
alter table public.announcements enable row level security;
drop policy if exists "anon can read public announcements" on public.announcements;
create policy "anon can read public announcements"
  on public.announcements for select
  using (audience = 'public');

-- events: readable by anyone
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null default 'Welcome Center',
  starts_at timestamptz not null
);
alter table public.events enable row level security;
drop policy if exists "anon can read events" on public.events;
create policy "anon can read events"
  on public.events for select
  using (true);

-- assignments: service role only
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  title text not null,
  due_date date not null,
  status text not null default 'assigned' check (status in ('assigned','submitted','graded'))
);
alter table public.assignments enable row level security;

-- admissions/contact inquiries: service role only (written by the API route)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'inquiry',
  parent_name text not null,
  email text not null,
  student_name text,
  grade_applying text,
  dob date,
  tour_date date,
  start_term text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
