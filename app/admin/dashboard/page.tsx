import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { school } from "@/lib/content";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

type Announcement = {
  id: string | number;
  title: string;
  category: string;
  body: string;
  published_at: string;
};
type Assignment = {
  id: string | number;
  subject: string;
  title: string;
  due_date: string;
  status: "assigned" | "submitted" | "graded";
};
type EventItem = {
  id: string | number;
  title: string;
  location: string;
  starts_at: string;
};

const fallbackAnnouncements: Announcement[] = [
  { id: "a1", title: "Gym shell complete — hard-hat tour signups open", category: "Campus", body: "Grade 9–12 students can sign up at the front office for Friday's supervised walk-through of the new gymnasium shell. Closed-toe shoes required.", published_at: "2026-06-09T14:00:00Z" },
  { id: "a2", title: "Summer reading lists are live", category: "Academics", body: "Division reading lists are posted in your English classroom pages. One required title, two you choose. First seminar of the fall starts with them.", published_at: "2026-06-08T16:00:00Z" },
  { id: "a3", title: "Lost & found closes Friday", category: "Office", body: "Everything unclaimed after Friday 3 PM goes to the clothing drive. There are currently four water bottles, two hoodies, and one trombone.", published_at: "2026-06-05T18:30:00Z" },
];

const fallbackAssignments: Assignment[] = [
  { id: "w1", subject: "English 10", title: "The Warmth of Other Suns — chapters 8–12 response", due_date: "2026-06-12", status: "assigned" },
  { id: "w2", subject: "Chemistry", title: "Lab report: reaction rates & temperature", due_date: "2026-06-13", status: "assigned" },
  { id: "w3", subject: "Algebra II", title: "Problem set 28 — logarithms", due_date: "2026-06-11", status: "submitted" },
  { id: "w4", subject: "US History", title: "Primary source analysis: Pullman Strike", due_date: "2026-06-10", status: "graded" },
  { id: "w5", subject: "Spanish III", title: "Oral presentation draft", due_date: "2026-06-16", status: "assigned" },
];

const fallbackEvents: EventItem[] = [
  { id: "e1", title: "Saturday Campus Tour & Hard-Hat Preview", location: "Welcome Center", starts_at: "2026-06-20T15:00:00Z" },
  { id: "e2", title: "Final assembly & awards", location: "Great Hall", starts_at: "2026-06-17T19:00:00Z" },
  { id: "e3", title: "Summer Bridge Program begins", location: "Welcome Center", starts_at: "2026-07-06T13:30:00Z" },
];

const todaySchedule = [
  { time: "8:30", subject: "English 10 — Seminar", room: "Room 204" },
  { time: "10:10", subject: "Chemistry — Lab", room: "Lab B" },
  { time: "11:50", subject: "Community lunch", room: "Commons" },
  { time: "12:50", subject: "Algebra II", room: "Room 117" },
  { time: "2:30", subject: "Capstone studio (elective prep)", room: "Library" },
  { time: "3:45", subject: "Track & Field practice", room: "Riverside Park" },
];

const grades = [
  { subject: "English 10", grade: "A-", pct: 91.4 },
  { subject: "Chemistry", grade: "B+", pct: 88.2 },
  { subject: "Algebra II", grade: "A", pct: 94.7 },
  { subject: "US History", grade: "A-", pct: 90.3 },
  { subject: "Spanish III", grade: "B+", pct: 87.6 },
];

function fmtDate(iso: string, withTime = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
    timeZone: school.timeZone,
  }).format(new Date(iso));
}

function chicagoGreeting(name: string) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: school.timeZone,
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
  const first = name.split(" ")[0];
  if (hour < 12) return `Good morning, ${first}`;
  if (hour < 17) return `Good afternoon, ${first}`;
  return `Good evening, ${first}`;
}

const statusStyles: Record<Assignment["status"], string> = {
  assigned: "bg-[#fdf3e3] text-[#8a6116] border-[#ecd9b0]",
  submitted: "bg-tint text-pine border-[#c9ddd2]",
  graded: "bg-[#eef0fa] text-[#3d4a8f] border-[#cdd3ee]",
};

async function getData() {
  const db = supabaseAdmin();
  if (!db)
    return {
      announcements: fallbackAnnouncements,
      assignments: fallbackAssignments,
      events: fallbackEvents,
    };

  const [a, w, e] = await Promise.all([
    db.from("announcements").select("id,title,category,body,published_at").order("published_at", { ascending: false }).limit(6),
    db.from("assignments").select("id,subject,title,due_date,status").order("due_date", { ascending: true }).limit(8),
    db.from("events").select("id,title,location,starts_at").gte("starts_at", new Date().toISOString()).order("starts_at", { ascending: true }).limit(4),
  ]);

  return {
    announcements: (a.data?.length ? a.data : fallbackAnnouncements) as Announcement[],
    assignments: (w.data?.length ? w.data : fallbackAssignments) as Assignment[],
    events: (e.data?.length ? e.data : fallbackEvents) as EventItem[],
  };
}

export default async function DashboardPage() {
  const jar = await cookies();
  const session = await verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!session) redirect("/admin");

  const { announcements, assignments, events } = await getData();
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: school.timeZone,
  }).format(new Date());

  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 md:px-10">
      {/* top bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 py-6">
        <Link href="/" className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden>
            <rect width="64" height="64" rx="14" fill="#0c2b21" />
            <path d="M19 44a13 13 0 0 1 26 0Z" fill="#faf8f2" />
            <line x1="12" y1="48.5" x2="52" y2="48.5" stroke="#faf8f2" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <span className="hidden text-sm font-semibold text-ink sm:block">
            Brightville Portal
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-paper px-4 py-2 text-xs font-medium text-soft md:block">
            {today} · Chicago
          </span>
          <LogoutButton />
        </div>
      </header>

      {/* greeting */}
      <section className="rounded-3xl bg-pine-ink px-7 py-9 text-cream md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream/50">
          Student dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          {chicagoGreeting(session.name)}.
        </h1>
        <p className="mt-2 text-sm text-cream/70">
          {assignments.filter((a) => a.status === "assigned").length} assignments open ·{" "}
          {events.length} events coming up · advisory at 8:10 tomorrow
        </p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* main column */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* announcements */}
          <section className="rounded-3xl border border-ink/8 bg-paper p-7" aria-labelledby="dash-announcements">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="dash-announcements" className="text-sm font-semibold uppercase tracking-[0.2em] text-soft">
                School updates
              </h2>
              <span className="h-2 w-2 rounded-full bg-pine animate-pulse-dot" aria-hidden />
            </div>
            <div className="mt-4 divide-y divide-line">
              {announcements.map((a) => (
                <article key={a.id} className="py-5 first:pt-2 last:pb-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="rounded-full bg-tint px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-pine">
                      {a.category}
                    </span>
                    <time className="font-mono text-xs text-faint">{fmtDate(a.published_at)}</time>
                  </div>
                  <h3 className="mt-2 font-semibold text-ink">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-soft">{a.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* schoolwork */}
          <section className="rounded-3xl border border-ink/8 bg-paper p-7" aria-labelledby="dash-work">
            <h2 id="dash-work" className="text-sm font-semibold uppercase tracking-[0.2em] text-soft">
              Schoolwork
            </h2>
            {assignments.length === 0 ? (
              <p className="mt-6 rounded-2xl bg-tint px-5 py-8 text-center text-sm text-soft">
                Nothing due — enjoy it while it lasts.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {assignments.map((w) => (
                  <li key={w.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-pine">
                        {w.subject}
                      </p>
                      <p className="mt-0.5 truncate font-medium text-ink">{w.title}</p>
                    </div>
                    <span className="font-mono text-xs text-faint">due {fmtDate(w.due_date)}</span>
                    <span className={`rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${statusStyles[w.status] ?? statusStyles.assigned}`}>
                      {w.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* grades */}
          <section className="rounded-3xl border border-ink/8 bg-paper p-7" aria-labelledby="dash-grades">
            <h2 id="dash-grades" className="text-sm font-semibold uppercase tracking-[0.2em] text-soft">
              Grades snapshot · spring term
            </h2>
            <ul className="mt-6 flex flex-col gap-5">
              {grades.map((g) => (
                <li key={g.subject}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium text-ink">{g.subject}</span>
                    <span className="font-mono text-sm text-pine">
                      {g.grade} · {g.pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-pine transition-[width] duration-700"
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* side column */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* profile */}
          <section className="rounded-3xl border border-ink/8 bg-paper p-7" aria-labelledby="dash-profile">
            <h2 id="dash-profile" className="sr-only">
              Profile
            </h2>
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 80 80" className="h-16 w-16 rounded-2xl" aria-hidden>
                <rect width="80" height="80" fill="#eaf1ec" />
                <circle cx="40" cy="30" r="17" fill="#1a5a45" />
                <path d="M12 80a28 28 0 0 1 56 0Z" fill="#11402f" />
              </svg>
              <div>
                <p className="font-semibold text-ink">{session.name}</p>
                <p className="text-xs text-faint">
                  {session.grade ?? "Student"} · @{session.username}
                </p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
              <div>
                <dt className="text-xs text-faint">Advisor</dt>
                <dd className="mt-0.5 font-medium text-ink">Mr. J. Ababio</dd>
              </div>
              <div>
                <dt className="text-xs text-faint">Advisory room</dt>
                <dd className="mt-0.5 font-medium text-ink">Room 210</dd>
              </div>
              <div>
                <dt className="text-xs text-faint">Attendance</dt>
                <dd className="mt-0.5 font-mono font-medium text-pine">97.2%</dd>
              </div>
              <div>
                <dt className="text-xs text-faint">Service hours</dt>
                <dd className="mt-0.5 font-mono font-medium text-pine">23.5</dd>
              </div>
            </dl>
          </section>

          {/* today schedule */}
          <section className="rounded-3xl border border-ink/8 bg-paper p-7" aria-labelledby="dash-schedule">
            <h2 id="dash-schedule" className="text-sm font-semibold uppercase tracking-[0.2em] text-soft">
              Today's schedule
            </h2>
            <ol className="mt-5 flex flex-col">
              {todaySchedule.map((p, i) => (
                <li key={p.time} className="relative flex gap-4 pb-5 last:pb-0">
                  {i < todaySchedule.length - 1 && (
                    <span className="absolute left-[1.05rem] top-7 h-full w-px bg-line" aria-hidden />
                  )}
                  <span className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tint font-mono text-[0.6rem] text-pine">
                    {p.time}
                  </span>
                  <div className="pt-1.5">
                    <p className="text-sm font-medium leading-tight text-ink">{p.subject}</p>
                    <p className="mt-0.5 text-xs text-faint">{p.room}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* events */}
          <section className="rounded-3xl border border-ink/8 bg-paper p-7" aria-labelledby="dash-events">
            <h2 id="dash-events" className="text-sm font-semibold uppercase tracking-[0.2em] text-soft">
              Coming up
            </h2>
            <ul className="mt-4 divide-y divide-line">
              {events.map((e) => (
                <li key={e.id} className="py-4 first:pt-2 last:pb-0">
                  <p className="font-mono text-xs text-pine">{fmtDate(e.starts_at, true)}</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-ink">{e.title}</p>
                  <p className="mt-0.5 text-xs text-faint">{e.location}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/news"
              className="mt-5 inline-block text-xs font-semibold text-pine underline decoration-pine/30 underline-offset-4"
            >
              All public news & events →
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
