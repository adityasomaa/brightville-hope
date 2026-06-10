import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { divisions } from "@/lib/content";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";

export function generateStaticParams() {
  return divisions.map((d) => ({ division: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string }>;
}): Promise<Metadata> {
  const { division } = await params;
  const d = divisions.find((x) => x.slug === division);
  if (!d) return {};
  return {
    title: `${d.name} (${d.grades})`,
    description: `${d.name} at Brightville Hope School — ${d.tagline} ${d.intro.slice(0, 120)}`,
  };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ division: string }>;
}) {
  const { division } = await params;
  const d = divisions.find((x) => x.slug === division);
  if (!d) notFound();

  const others = divisions.filter((x) => x.slug !== d.slug);

  return (
    <>
      <PageHero kicker={`${d.name} · ${d.grades}`} title={d.tagline} body={d.intro} art={d.art} />

      {/* pillars */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="How it works"
            title={`What makes the ${d.name} different`}
          />
          <RevealGroup className="mt-14 grid gap-x-14 gap-y-12 lg:grid-cols-[1fr_1fr]">
            {d.pillars.map((p, i) => (
              <RevealItem
                key={p.title}
                className={`border-t border-line pt-7 ${i === 2 ? "lg:col-span-2 lg:max-w-3xl" : ""}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-faint">0{i + 1}</span>
                  <h3 className="font-display text-2xl tracking-tight text-ink">{p.title}</h3>
                </div>
                <p className="mt-4 max-w-[58ch] leading-relaxed text-soft">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* a day in the life */}
      <section className="bg-pine-ink py-20 text-cream md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream/50">
              A day in the life
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
              {d.grades}, hour by hour
            </h2>
            <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-cream/70">
              Schedules are a school’s real values document. Notice what gets
              protected time here — and what doesn’t.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {d.signature.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-cream/20 px-4 py-1.5 text-xs text-cream/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <RevealGroup className="divide-y divide-cream/10">
            {d.day.map((row) => (
              <RevealItem key={row.time}>
                <div className="grid grid-cols-[5rem_1fr] items-baseline gap-6 py-4">
                  <span className="font-mono text-sm text-cream/50 tabular-nums">{row.time}</span>
                  <span className="text-cream/90">{row.activity}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* cross links */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
              Keep exploring
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/academics/${o.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-line bg-paper px-7 py-6 transition-all hover:border-pine"
                >
                  <span>
                    <span className="block font-display text-xl tracking-tight text-ink group-hover:text-pine">
                      {o.name}
                    </span>
                    <span className="text-sm text-faint">{o.grades}</span>
                  </span>
                  <span className="text-pine transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
