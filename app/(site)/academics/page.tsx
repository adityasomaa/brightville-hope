import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import PlaceholderArt from "@/components/PlaceholderArt";
import { divisions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "PreK–12 academics at Brightville Hope School: Lower, Middle, and Upper School — one continuous arc from phonics to the senior Capstone.",
};

const throughlines = [
  {
    title: "Writing, every year, every subject",
    body: "From kindergarten journals to the Capstone thesis, students write daily — and get real feedback, not just a grade at the end.",
  },
  {
    title: "Languages from the start",
    body: "Spanish begins in PreK. Upper School adds Mandarin and Latin, with exchange partnerships in development for 2028.",
  },
  {
    title: "Math as sense-making",
    body: "A single coherent sequence from number talks to multivariable calculus, taught for understanding before speed.",
  },
  {
    title: "Real audiences",
    body: "Exhibitions, defenses, publications, and performances — work that ends in front of people, not in a folder.",
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        kicker="Learning & discovery"
        title="One arc, from first phonics to final defense"
        body="Three divisions share one faculty culture and one philosophy: children rise to real intellectual work when the adults around them believe they can."
        art="orbit"
      />

      {/* divisions index */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x flex flex-col gap-20">
          {divisions.map((d, i) => (
            <Reveal key={d.slug}>
              <Link
                href={`/academics/${d.slug}`}
                className={`group grid items-center gap-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <PlaceholderArt
                  variant={d.art}
                  className="aspect-[16/10] w-full rounded-[2rem] transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <div className={i % 2 === 1 ? "lg:pr-12" : "lg:pl-12"}>
                  <p className="font-mono text-sm text-pine">{d.grades}</p>
                  <h2 className="mt-3 font-display text-3xl tracking-tight text-ink transition-colors group-hover:text-pine md:text-4xl">
                    {d.name}
                  </h2>
                  <p className="mt-2 font-display text-lg text-soft">{d.tagline}</p>
                  <p className="mt-5 max-w-[58ch] leading-relaxed text-soft">
                    {d.intro}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-pine">
                    Visit the {d.name}
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* throughlines */}
      <section className="bg-pine-ink py-20 text-cream md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="The throughlines"
            title="What never changes, PreK to 12"
            tone="dark"
            align="split"
            body="Divisions differ in method, never in standards. Four commitments run the full thirteen years."
          />
          <RevealGroup className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {throughlines.map((t, i) => (
              <RevealItem key={t.title} className="border-t border-cream/15 pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-cream/40">0{i + 1}</span>
                  <h3 className="font-display text-xl tracking-tight">{t.title}</h3>
                </div>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-cream/70">
                  {t.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
