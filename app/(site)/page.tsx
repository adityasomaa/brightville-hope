import Link from "next/link";
import {
  school,
  values,
  stats,
  traditions,
  fallbackNews,
} from "@/lib/content";
import PlaceholderArt from "@/components/PlaceholderArt";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Marquee from "@/components/Marquee";
import DivisionTabs from "@/components/DivisionTabs";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: school.timeZone,
  }).format(new Date(iso));
}

export default function HomePage() {
  return (
    <>
      {/* hero — asymmetric split */}
      <section className="relative min-h-[100dvh] overflow-hidden bg-cream pt-[4.5rem]">
        <div className="container-x grid min-h-[calc(100dvh-4.5rem)] items-center gap-12 py-12 lg:grid-cols-[1.15fr_1fr]">
          <Reveal y={36}>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-xs font-semibold text-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-pine animate-pulse-dot" aria-hidden />
              New flagship campus opening Fall 2027
            </p>
            <h1 className="mt-7 font-display text-5xl leading-[0.98] tracking-tight text-ink md:text-7xl">
              Bright minds.
              <br />
              <span className="text-pine">Boundless</span> hope.
            </h1>
            <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-soft md:text-lg">
              {school.name} is an independent {school.grades} school in{" "}
              {school.neighborhood} — small by design, serious about joy, and
              built on the belief that every child arrives curious.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/admissions"
                className="rounded-full bg-pine px-7 py-3.5 font-semibold text-cream transition-all hover:bg-pine-deep active:translate-y-px"
              >
                Begin admissions
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-ink/20 px-7 py-3.5 font-semibold text-ink transition-all hover:border-pine hover:text-pine active:translate-y-px"
              >
                Who we are
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2} y={44} className="relative">
            <PlaceholderArt
              variant="sunrise"
              label="Sunrise over the Brightville campus, illustrated"
              className="aspect-[4/3] w-full rounded-[2.5rem]"
            />
            <div className="absolute -bottom-6 -left-4 animate-float rounded-2xl border border-line bg-paper px-5 py-4 shadow-[0_24px_48px_-20px_rgba(12,43,33,0.3)] md:-left-10">
              <p className="font-mono text-2xl text-pine">11:1</p>
              <p className="text-xs text-soft">student-teacher ratio</p>
            </div>
            <div className="absolute -top-4 right-4 rounded-2xl bg-pine-ink px-5 py-4 text-cream shadow-[0_24px_48px_-20px_rgba(12,43,33,0.45)]">
              <p className="font-mono text-2xl">PreK–12</p>
              <p className="text-xs text-cream/60">one continuous journey</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={[
          "Curiosity",
          "Courage",
          "Community",
          "Character",
          "PreK – Grade 12",
          "Lincoln Park · Chicago",
        ]}
      />

      {/* values — zig-zag, no card row */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="What we believe"
            title="Four words we run the school by"
            body="Not wall art. These show up in hiring, in schedules, in how a hallway disagreement gets handled."
            align="split"
          />
          <RevealGroup className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {values.map((v, i) => (
              <RevealItem
                key={v.title}
                className={`border-t border-line pt-8 ${i % 2 === 1 ? "md:translate-y-10" : ""}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-faint">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                    {v.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-soft">
                  {v.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* divisions */}
      <section className="border-y border-line bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Learning & discovery"
            title="One school, three chapters"
            body="The same values from PreK to the senior Capstone — taught the way each age actually learns."
          />
          <div className="mt-12">
            <DivisionTabs />
          </div>
        </div>
      </section>

      {/* stats band */}
      <section className="bg-pine-ink py-20 text-cream md:py-24">
        <div className="container-x">
          <RevealGroup className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {stats.map((s) => (
              <RevealItem key={s.label} className="border-l border-cream/15 pl-6">
                <p className="font-mono text-4xl tracking-tight md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-3 text-sm text-cream/60">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.2}>
            <p className="mt-16 max-w-[46ch] font-display text-2xl leading-snug tracking-tight text-cream/90 md:text-3xl">
              “We are building a school the way you’d build a lighthouse —
              <span className="text-cream/50"> brick by brick, for the long dark, and for everyone at sea.”</span>
            </p>
            <p className="mt-5 text-sm text-cream/50">
              Dr. Amara Whitfield, Head of School
            </p>
          </Reveal>
        </div>
      </section>

      {/* traditions */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Student life"
            title="Traditions worth keeping"
            body="A young school gets to choose its rituals deliberately. These are the four we protect."
            align="split"
          />
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:grid-rows-2">
            {traditions.map((t, i) => (
              <RevealItem
                key={t.title}
                className={i === 0 ? "lg:row-span-2" : ""}
              >
                <div className="flex h-full flex-col">
                  <PlaceholderArt
                    variant={(["ribbon", "field", "orbit", "arch"] as const)[i]}
                    className={`w-full rounded-[1.75rem] ${i === 0 ? "aspect-[4/5] lg:h-full" : "aspect-[16/10]"}`}
                  />
                  <h3 className="mt-5 font-display text-xl tracking-tight text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">
                    {t.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <Link
              href="/student-life"
              className="group mt-12 inline-flex items-center gap-2 font-semibold text-pine"
            >
              More of life at Brightville
              <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* news preview */}
      <section className="border-t border-line bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="News & events"
            title="What happened this month"
            align="split"
            body="Milestones from the construction site, the seminar table, and the stage."
          />
          <RevealGroup className="mt-12 divide-y divide-line">
            {fallbackNews.map((n) => (
              <RevealItem key={n.id}>
                <Link
                  href="/news"
                  className="group grid gap-2 py-7 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
                    {n.category}
                  </span>
                  <span>
                    <span className="font-display text-xl tracking-tight text-ink transition-colors group-hover:text-pine md:text-2xl">
                      {n.title}
                    </span>
                    <span className="mt-1 block max-w-[70ch] text-sm text-soft">
                      {n.body.slice(0, 110)}…
                    </span>
                  </span>
                  <span className="font-mono text-xs text-faint">
                    {formatDate(n.published_at)}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-pine px-8 py-16 md:px-16 md:py-20">
              <PlaceholderArt
                variant="ribbon"
                tone="dark"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
              />
              <div className="relative max-w-2xl">
                <h2 className="font-display text-3xl leading-tight tracking-tight text-cream md:text-5xl">
                  Come see a school being built — literally.
                </h2>
                <p className="mt-5 leading-relaxed text-cream/75">
                  {school.campusNote} Saturday tours include a hard-hat preview
                  of the new building.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href="/admissions/apply"
                    className="rounded-full bg-cream px-7 py-3.5 font-semibold text-pine-ink transition-all hover:bg-white active:translate-y-px"
                  >
                    Book a visit
                  </Link>
                  <Link
                    href="/admissions/tuition"
                    className="rounded-full border border-cream/40 px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-cream/10 active:translate-y-px"
                  >
                    Tuition & aid
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
