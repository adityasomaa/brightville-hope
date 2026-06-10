import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { tuitionRows } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tuition & Aid",
  description:
    "Tuition for the 2026–27 school year at Brightville Hope School, and how need-based financial aid works.",
};

const aidFacts = [
  { value: "19%", label: "of students receive need-based aid" },
  { value: "$1.7M", label: "awarded for 2026–27" },
  { value: "90%", label: "maximum award, as a share of tuition" },
  { value: "1 form", label: "one evening — that's the application" },
];

export default function TuitionPage() {
  return (
    <>
      <PageHero
        kicker="Admissions"
        title="Tuition, stated plainly"
        body="One number per division, everything included: lunch, trips, technology, athletics, and every performance ticket. The only extras are optional private music lessons."
        art="arch"
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading kicker="2026–27 school year" title="What it costs" />
          <Reveal delay={0.1}>
            <div className="mt-12 divide-y divide-line border-y border-line">
              {tuitionRows.map((r) => (
                <div
                  key={r.division}
                  className="grid items-baseline gap-2 py-7 md:grid-cols-[1.5fr_1fr_auto]"
                >
                  <h3 className="font-display text-2xl tracking-tight text-ink">{r.division}</h3>
                  <p className="text-sm text-soft">{r.grades}</p>
                  <p className="font-mono text-2xl text-pine md:text-3xl">{r.tuition}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-faint">
              Payment plans: annual, semi-annual, or ten monthly installments at
              no extra charge. Tuition insurance available through a third
              party. A non-refundable deposit of $1,500 holds a seat.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-pine-ink py-20 text-cream md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Financial aid"
            title="If the fit is right, we'll work on the math"
            tone="dark"
            align="split"
            body="Aid is need-based, confidential, and decided separately from admission. Applying for aid never affects an admission decision."
          />
          <RevealGroup className="mt-14 grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {aidFacts.map((f) => (
              <RevealItem key={f.label} className="border-l border-cream/15 pl-6">
                <p className="font-mono text-3xl tracking-tight md:text-4xl">{f.value}</p>
                <p className="mt-3 text-sm text-cream/60">{f.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.15}>
            <Link
              href="/admissions/apply"
              className="mt-14 inline-block rounded-full bg-cream px-7 py-3.5 font-semibold text-pine-ink transition-all hover:bg-white active:translate-y-px"
            >
              Ask about aid in your inquiry
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
