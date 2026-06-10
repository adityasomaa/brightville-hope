import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PlaceholderArt from "@/components/PlaceholderArt";
import Em from "@/components/Em";
import { supabaseAnon } from "@/lib/supabase";
import { fallbackNews, school } from "@/lib/content";

export const revalidate = 300;

type NewsItem = {
  id: string | number;
  title: string;
  category: string;
  body: string;
  published_at: string;
};

const artByCategory: Record<string, "sunrise" | "arch" | "field" | "orbit" | "ribbon"> = {
  Campus: "arch",
  Academics: "orbit",
  Arts: "ribbon",
  Athletics: "field",
};

async function getItem(id: string): Promise<NewsItem | null> {
  const db = supabaseAnon();
  if (db) {
    // fallback items use slug ids that aren't valid uuids — treat errors as a miss
    const { data } = await db
      .from("announcements")
      .select("id,title,category,body,published_at")
      .eq("audience", "public")
      .eq("id", id)
      .maybeSingle();
    if (data) return data;
  }
  return fallbackNews.find((n) => n.id === id) ?? null;
}

async function getMore(excludeId: string): Promise<NewsItem[]> {
  const db = supabaseAnon();
  if (db) {
    const { data } = await db
      .from("announcements")
      .select("id,title,category,body,published_at")
      .eq("audience", "public")
      .order("published_at", { ascending: false })
      .limit(4);
    if (data?.length) return data.filter((n) => String(n.id) !== excludeId).slice(0, 3);
  }
  return fallbackNews.filter((n) => n.id !== excludeId).slice(0, 3);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) return { title: "Story not found" };
  return {
    title: item.title,
    description: item.body.slice(0, 150),
  };
}

function fmt(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: school.timeZone,
  }).format(new Date(iso));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();

  const more = await getMore(String(item.id));
  const art = artByCategory[item.category] ?? "sunrise";
  const paragraphs = item.body.split(/\n\n+/);

  return (
    <>
      <article className="border-b border-line bg-cream pt-[4.5rem]">
        <div className="container-x py-14 md:py-20">
          <Reveal>
            <Link
              href="/news"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-pine"
            >
              <span aria-hidden>←</span> All news & events
            </Link>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-pine">
                {item.category}
              </span>
              <time className="font-mono text-xs text-faint">{fmt(item.published_at)}</time>
            </div>
            <h1 className="mt-6 max-w-[24ch] font-display text-4xl leading-[1.04] tracking-tight text-ink md:text-6xl">
              <Em>{item.title}</Em>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <PlaceholderArt
              variant={art}
              label={`Illustration for: ${item.title}`}
              className="mt-12 aspect-[21/9] w-full rounded-[2rem]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-3xl">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-soft ${i === 0 ? "font-display text-xl text-ink md:text-2xl" : "mt-6 text-base md:text-lg"}`}
                >
                  {p}
                </p>
              ))}
              <div className="mt-12 border-t border-line pt-8">
                <p className="text-sm text-faint">
                  Questions about this story? Write to{" "}
                  <a
                    href={`mailto:${school.email}`}
                    className="link-underline font-semibold text-pine"
                  >
                    {school.email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-paper py-16 md:py-24">
          <div className="container-x">
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
                More from Brightville
              </h2>
              <div className="mt-6 divide-y divide-line">
                {more.map((n) => (
                  <Link
                    key={n.id}
                    href={`/news/${n.id}`}
                    className="group grid gap-2 py-6 md:grid-cols-[9rem_1fr_auto] md:items-baseline md:gap-8"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
                      {n.category}
                    </span>
                    <span className="font-display text-xl tracking-tight text-ink transition-colors group-hover:text-pine">
                      {n.title}
                    </span>
                    <span className="font-mono text-xs text-faint">{fmt(n.published_at)}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
