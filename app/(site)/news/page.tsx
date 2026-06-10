import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { supabaseAnon } from "@/lib/supabase";
import { fallbackNews, fallbackEvents, school } from "@/lib/content";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "The latest from Brightville Hope School: campus construction milestones, academic news, and upcoming events.",
};

export const revalidate = 300;

type NewsItem = {
  id: string | number;
  title: string;
  category: string;
  body: string;
  published_at: string;
};

type EventItem = {
  id: string | number;
  title: string;
  location: string;
  starts_at: string;
};

async function getData(): Promise<{ news: NewsItem[]; events: EventItem[] }> {
  const db = supabaseAnon();
  if (!db) return { news: fallbackNews, events: fallbackEvents };

  const [newsRes, eventsRes] = await Promise.all([
    db
      .from("announcements")
      .select("id,title,category,body,published_at")
      .eq("audience", "public")
      .order("published_at", { ascending: false })
      .limit(12),
    db
      .from("events")
      .select("id,title,location,starts_at")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(6),
  ]);

  return {
    news: newsRes.data?.length ? newsRes.data : fallbackNews,
    events: eventsRes.data?.length ? eventsRes.data : fallbackEvents,
  };
}

function fmt(iso: string, withTime = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
    timeZone: school.timeZone,
  }).format(new Date(iso));
}

export default async function NewsPage() {
  const { news, events } = await getData();

  return (
    <>
      <PageHero
        kicker="News & events"
        title="Dispatches from a school under construction"
        body="Crane lifts and capstone defenses, side by side. This page is updated by the school office — students see additional internal updates in the portal."
        art="field"
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          {/* news list */}
          <div>
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
                Latest news
              </h2>
            </Reveal>
            <RevealGroup className="mt-6 divide-y divide-line">
              {news.map((n) => (
                <RevealItem key={n.id}>
                  <Link href={`/news/${n.id}`} className="group block">
                    <article className="py-8">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
                          {n.category}
                        </span>
                        <time className="font-mono text-xs text-faint">
                          {fmt(n.published_at)}
                        </time>
                      </div>
                      <h3 className="mt-3 font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-pine">
                        {n.title}
                      </h3>
                      <p className="mt-3 max-w-[68ch] leading-relaxed text-soft">
                        {n.body.length > 180 ? `${n.body.slice(0, 180)}…` : n.body}
                      </p>
                      <span className="link-underline mt-4 inline-block text-sm font-semibold text-pine">
                        Read the full story
                      </span>
                    </article>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* events rail */}
          <aside>
            <Reveal delay={0.1}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
                Upcoming events
              </h2>
              <div className="mt-6 flex flex-col gap-4">
                {events.map((e) => {
                  const d = new Date(e.starts_at);
                  const day = new Intl.DateTimeFormat("en-US", { day: "2-digit", timeZone: school.timeZone }).format(d);
                  const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: school.timeZone }).format(d);
                  return (
                    <div
                      key={e.id}
                      className="group flex gap-5 rounded-2xl border border-line bg-cream p-5 transition-colors hover:border-pine"
                    >
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-pine-ink text-cream">
                        <span className="font-mono text-xl leading-none">{day}</span>
                        <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-cream/60">
                          {month}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display text-base leading-snug tracking-tight text-ink">
                          {e.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-faint">
                          {fmt(e.starts_at, true)} · {e.location}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 rounded-2xl bg-tint p-6">
                <h3 className="font-display text-lg tracking-tight text-ink">
                  Want these by email?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">
                  Write to{" "}
                  <a href={`mailto:${school.email}`} className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">
                    {school.email}
                  </a>{" "}
                  and we'll add you to the monthly dispatch.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
