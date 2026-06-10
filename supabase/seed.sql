-- Seed data for Brightville Hope School portal.
-- The bcrypt hash below corresponds to the portal password issued to the school.

insert into public.portal_users (username, password_hash, full_name, role, grade)
values (
  'brightville',
  '$2b$12$E3hHDNNur4jZ/GlNXUUWQOyXufARjPym0u15cd0oy2Q8LaDrq2OWa',
  'Maya Okonkwo-Reyes',
  'student',
  'Grade 10'
)
on conflict (username) do update
  set password_hash = excluded.password_hash,
      full_name = excluded.full_name,
      role = excluded.role,
      grade = excluded.grade;

insert into public.announcements (title, category, body, audience, published_at) values
  ('Clybourn campus reaches topping-out milestone', 'Campus', 'The final steel beam — signed by every student — was set on the new flagship building this week. The construction team remains on schedule for a Fall 2027 opening, with the gymnasium shell next.', 'public', '2026-05-28T15:00:00Z'),
  ('Middle School debate team takes second at state', 'Academics', 'Eight students argued their way through six rounds in Springfield, finishing second of forty-two schools. Judges singled out the Grade 7 duo for the tournament''s best cross-examination.', 'public', '2026-05-19T15:00:00Z'),
  ('Spring Showcase fills the Welcome Center', 'Arts', 'Over 300 families came through the student exhibition: ceramics, a documentary on the Clybourn build, and the premiere of the chamber choir''s commissioned piece.', 'public', '2026-05-08T15:00:00Z'),
  ('Gym shell complete — hard-hat tour signups open', 'Campus', 'Grade 9–12 students can sign up at the front office for Friday''s supervised walk-through of the new gymnasium shell. Closed-toe shoes required.', 'students', '2026-06-09T14:00:00Z'),
  ('Summer reading lists are live', 'Academics', 'Division reading lists are posted in your English classroom pages. One required title, two you choose. First seminar of the fall starts with them.', 'students', '2026-06-08T16:00:00Z'),
  ('Lost & found closes Friday', 'Office', 'Everything unclaimed after Friday 3 PM goes to the clothing drive. There are currently four water bottles, two hoodies, and one trombone.', 'students', '2026-06-05T18:30:00Z')
on conflict do nothing;

insert into public.events (title, location, starts_at) values
  ('Saturday Campus Tour & Hard-Hat Preview', 'Welcome Center', '2026-06-20T15:00:00Z'),
  ('Admissions Information Evening', 'Virtual', '2026-06-25T23:30:00Z'),
  ('Final assembly & awards', 'Great Hall', '2026-06-17T19:00:00Z'),
  ('Summer Bridge Program begins', 'Welcome Center', '2026-07-06T13:30:00Z'),
  ('Fall Open House', 'Welcome Center', '2026-09-12T15:00:00Z')
on conflict do nothing;

insert into public.assignments (subject, title, due_date, status) values
  ('English 10', 'The Warmth of Other Suns — chapters 8–12 response', '2026-06-12', 'assigned'),
  ('Chemistry', 'Lab report: reaction rates & temperature', '2026-06-13', 'assigned'),
  ('Algebra II', 'Problem set 28 — logarithms', '2026-06-11', 'submitted'),
  ('US History', 'Primary source analysis: Pullman Strike', '2026-06-10', 'graded'),
  ('Spanish III', 'Oral presentation draft', '2026-06-16', 'assigned')
on conflict do nothing;
