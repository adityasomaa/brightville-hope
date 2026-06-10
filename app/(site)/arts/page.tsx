import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import PlaceholderArt from "@/components/PlaceholderArt";
import { artsPrograms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Arts",
  description:
    "Studio arts, theater, music, and film at Brightville Hope School — every student makes things, every year.",
};

const calendar = [
  { month: "October", event: "Fall Mainstage Production" },
  { month: "December", event: "The Big Sing — all-school choral night" },
  { month: "February", event: "Winter Instrumental Concert" },
  { month: "April", event: "Student-Directed One-Act Festival" },
  { month: "May", event: "Spring Showcase & Short Film Night" },
];

export default function ArtsPage() {
  return (
    <>
      <PageHero
        kicker="The arts"
        title="Every student makes things. Every year. No exceptions."
        body="Arts at Brightville aren't an elective garnish — they're a graduation requirement and a daily practice. The new campus puts the studios on the ground floor, windows to the street, because the work deserves an audience."
        art="ribbon"
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading kicker="Programs" title="Four studios, one habit of making" />
          <RevealGroup className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {artsPrograms.map((p, i) => (
              <RevealItem key={p.title} className={i % 2 === 1 ? "md:translate-y-12" : ""}>
                <PlaceholderArt variant={p.art} className="aspect-[16/10] w-full rounded-[2rem]" />
                <h2 className="mt-6 font-display text-2xl tracking-tight text-ink">{p.title}</h2>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-soft">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-pine-ink py-20 text-cream md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream/50">
              The season
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
              Five nights the whole school circles on the calendar
            </h2>
            <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-cream/70">
              Performances are public and free. Half the audience is families;
              the other half is the neighborhood we want the new building to belong to.
            </p>
          </Reveal>
          <RevealGroup className="divide-y divide-cream/10">
            {calendar.map((c) => (
              <RevealItem key={c.month}>
                <div className="grid grid-cols-[7rem_1fr] items-baseline gap-6 py-5">
                  <span className="font-mono text-sm text-cream/50">{c.month}</span>
                  <span className="font-display text-lg tracking-tight text-cream/90">{c.event}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
