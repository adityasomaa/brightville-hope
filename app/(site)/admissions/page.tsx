import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import PlaceholderArt from "@/components/PlaceholderArt";
import { admissionsSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Why families choose Brightville Hope School — and how to start. PreK–12 admissions in Lincoln Park, Chicago.",
};

const pillars = [
  {
    title: "Known, not processed",
    body: "Your file is read by the people who would actually teach your child. Interviews feel like conversations because they are.",
  },
  {
    title: "Honest about fit",
    body: "We'd rather tell you we're not the right school than enroll a child who'd be happier elsewhere. Families notice.",
  },
  {
    title: "Aid that's real",
    body: "Nineteen percent of students receive need-based aid, with awards up to 90% of tuition. The form takes one evening.",
  },
  {
    title: "A front-row seat to the build",
    body: "Families joining now shape the school that moves into the new campus — clubs, traditions, even paint colors. Founding-era energy is a real thing.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        kicker="Admissions"
        title="A school you join, not just attend"
        body="Choosing a school is choosing the adults who will know your child. Start with a visit — the building is temporary, the culture isn't."
        art="sunrise"
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Why Brightville"
            title="Four honest reasons families choose us"
            align="split"
            body="No school is right for everyone. Here's what tends to matter for the families who say yes."
          />
          <RevealGroup className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {pillars.map((p, i) => (
              <RevealItem
                key={p.title}
                className={`border-t border-line pt-7 ${i % 2 === 1 ? "md:translate-y-8" : ""}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-faint">0{i + 1}</span>
                  <h2 className="font-display text-2xl tracking-tight text-ink">{p.title}</h2>
                </div>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-soft">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-pine-ink py-20 text-cream md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="The process"
            title="Four steps, no mystery"
            tone="dark"
          />
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {admissionsSteps.map((s) => (
              <RevealItem key={s.step} className="border-t border-cream/15 pt-6">
                <p className="font-mono text-3xl text-cream/40">{s.step}</p>
                <h3 className="mt-4 font-display text-xl tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-wrap gap-3">
              <Link
                href="/admissions/apply"
                className="rounded-full bg-cream px-7 py-3.5 font-semibold text-pine-ink transition-all hover:bg-white active:translate-y-px"
              >
                Start an inquiry
              </Link>
              <Link
                href="/admissions/tuition"
                className="rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Tuition & aid
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
              From a current parent
            </p>
            <blockquote className="mt-6 max-w-[44ch] font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
              “The Head of School learned my daughter's name before we'd even
              applied. Three years in, that first impression turned out to be
              the whole school in miniature.”
            </blockquote>
            <p className="mt-5 text-sm text-soft">Imogen Castellanos-Park · parent, Grades 2 and 6</p>
          </Reveal>
          <Reveal delay={0.15} className="hidden lg:block">
            <PlaceholderArt variant="field" className="aspect-[4/3] w-full rounded-[2rem]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
