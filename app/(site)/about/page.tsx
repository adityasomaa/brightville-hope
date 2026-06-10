import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import PlaceholderArt from "@/components/PlaceholderArt";
import { values, school } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mission & Values",
  description:
    "What Brightville Hope School believes, and how a young school in Chicago is built deliberately around curiosity, courage, community, and character.",
};

const timeline = [
  { year: "2024", event: "Brightville Hope School founded by a coalition of Chicago educators and families. First cohort of 96 students opens at the Welcome Center." },
  { year: "2025", event: "Middle School launches. The city-as-classroom program begins with river ecology fieldwork on the Chicago River." },
  { year: "2026", event: "Ground broken on the Clybourn Avenue flagship campus. Upper School welcomes its first Grade 9 class." },
  { year: "2027", event: "The new campus opens its doors in fall — daylight studios, a gymnasium, and a library at the heart of the building." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Who we are"
        title="A school built *on purpose,* in every sense"
        body="Most schools inherit their habits. Brightville Hope gets to choose ours — which is why every schedule block, hiring decision, and floor plan starts with the same question: what does a child need to flourish?"
        art="arch"
      />

      {/* mission */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <PlaceholderArt
              variant="orbit"
              className="aspect-square w-full max-w-md rounded-[2rem]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
              Our mission
            </p>
            <p className="mt-6 font-display text-2xl leading-snug tracking-tight text-ink md:text-4xl">
              To give every child a place where bright minds are taken
              seriously, hope is a discipline, and becoming yourself is the
              whole curriculum.
            </p>
            <p className="mt-6 max-w-[60ch] leading-relaxed text-soft">
              We are deliberately small: {school.grades}, capped class sizes,
              one campus. Scale is the enemy of being known, and being known is
              where real teaching starts.
            </p>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Our values"
            title="Curiosity. Courage. Community. Character."
            body="Chosen before our first day of classes, stress-tested every day since."
            align="split"
          />
          <RevealGroup className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {values.map((v, i) => (
              <RevealItem key={v.title} className="border-t border-line pt-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-faint">0{i + 1}</span>
                  <h3 className="font-display text-2xl tracking-tight text-ink">
                    {v.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-soft">{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-pine-ink py-20 text-cream md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Our story so far"
            title="Young, and proud of it"
            tone="dark"
            body="Four years from a founding idea to a flagship campus on Clybourn Avenue."
            align="split"
          />
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t) => (
              <RevealItem key={t.year} className="border-t border-cream/15 pt-6">
                <p className="font-mono text-3xl text-cream">{t.year}</p>
                <p className="mt-4 text-sm leading-relaxed text-cream/70">{t.event}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* leadership teaser */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
              The people
            </p>
            <h2 className="mt-4 max-w-[20ch] font-display text-3xl tracking-tight text-ink md:text-4xl">
              Meet the team guiding the build — of the school and the building
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/about/leadership"
              className="rounded-full bg-pine px-7 py-3.5 font-semibold text-cream transition-all hover:bg-pine-deep active:translate-y-px"
            >
              Meet our leadership
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
