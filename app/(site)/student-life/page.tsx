import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import PlaceholderArt from "@/components/PlaceholderArt";
import Marquee from "@/components/Marquee";
import { traditions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Student Life",
  description:
    "Clubs, traditions, advisory, trips, and the daily texture of life at Brightville Hope School in Chicago.",
};

const clubs = [
  "Robotics & Engineering", "Debate Society", "The Beacon (student paper)", "Chess Club",
  "Mock Trial", "Environmental Action", "Coding Collective", "Dungeons & Storytelling",
  "Student Government", "Cooking Lab", "Photography", "Math Circle",
  "Model UN", "Service Corps", "Film Club", "Gardening Crew",
];

const pillars = [
  {
    title: "Advisory: ten kids, one adult, every day",
    body: "From Grade 5 up, every student starts the morning in a group of ten with an advisor who follows them for years — the adult who notices before anything becomes a problem.",
    art: "orbit" as const,
  },
  {
    title: "Trips that aren't field trips",
    body: "Multi-day expeditions with real work attached: river sampling on the Mississippi, a January term in Washington D.C., overnight retreats that open every year.",
    art: "ribbon" as const,
  },
  {
    title: "Service woven in, not bolted on",
    body: "Each division runs a year-long partnership with a Chicago organization — food security, river cleanup, intergenerational storytelling — with time for it inside the school day.",
    art: "field" as const,
  },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        kicker="Student life"
        title="The hours between classes *count double*"
        body="Ask a graduate what made school matter and they rarely name a lesson. They name a stage, a team, a trip, an advisor. We schedule accordingly."
        art="ribbon"
      />

      <Marquee
        items={["38+ clubs", "4 signature traditions", "Advisory every morning", "Service partnerships citywide", "Lantern Walk · September"]}
      />

      {/* pillars */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x flex flex-col gap-16">
          {pillars.map((p, i) => (
            <Reveal key={p.title}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <PlaceholderArt variant={p.art} className="aspect-[16/10] w-full rounded-[2rem]" />
                <div className={i % 2 === 1 ? "lg:pr-10" : "lg:pl-10"}>
                  <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-4 max-w-[58ch] leading-relaxed text-soft">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* clubs */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Clubs & activities"
            title="If six students want it, it exists"
            align="split"
            body="That's the actual rule. Any six students plus a faculty sponsor can charter a club — which is how we ended up with a nationally ranked debate team and a very serious gardening crew."
          />
          <RevealGroup className="mt-12 flex flex-wrap gap-3" stagger={0.03}>
            {clubs.map((c) => (
              <RevealItem key={c}>
                <span className="inline-block rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-medium text-soft transition-colors hover:border-pine hover:text-pine">
                  {c}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* traditions */}
      <section className="bg-pine-ink py-20 text-cream md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Traditions"
            title="Rituals we chose on purpose"
            tone="dark"
          />
          <RevealGroup className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {traditions.map((t) => (
              <RevealItem key={t.title} className="border-t border-cream/15 pt-6">
                <h3 className="font-display text-xl tracking-tight">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{t.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-wrap gap-3">
              <Link
                href="/arts"
                className="rounded-full border border-cream/30 px-6 py-3 font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Explore the Arts
              </Link>
              <Link
                href="/athletics"
                className="rounded-full bg-cream px-6 py-3 font-semibold text-pine-ink transition-all hover:bg-white active:translate-y-px"
              >
                Meet the Beacons
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
