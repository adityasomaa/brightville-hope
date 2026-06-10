import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { athleticsTeams } from "@/lib/content";

export const metadata: Metadata = {
  title: "Athletics",
  description:
    "The Brightville Beacons — no-cut athletics across three seasons, with a new gymnasium opening in 2027.",
};

const principles = [
  {
    title: "No-cut through Grade 10",
    body: "Everyone who commits to practice plays. Varsity selectivity starts only where league rules require it.",
  },
  {
    title: "Multi-sport by design",
    body: "Coaches share athletes gladly. Specialization before high school is discouraged — the sports science is on our side.",
  },
  {
    title: "Character is the scoreboard",
    body: "Officials' reports on sportsmanship are read aloud at assembly, wins and losses alike.",
  },
];

export default function AthleticsPage() {
  return (
    <>
      <PageHero
        kicker="Athletics · The Beacons"
        title="Everybody plays. *That's the program.*"
        body="The Brightville Beacons field teams across three seasons with a simple philosophy: athletics exist to teach things a classroom can't — how to lose well, lead quietly, and show up for practice in February."
        art="field"
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading kicker="How we play" title="Three principles, league-tested" />
          <RevealGroup className="mt-14 grid gap-x-14 gap-y-10 lg:grid-cols-3">
            {principles.map((p, i) => (
              <RevealItem key={p.title} className={`border-t border-line pt-6 ${i === 1 ? "lg:translate-y-8" : ""}`}>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-faint">0{i + 1}</span>
                  <h2 className="font-display text-xl tracking-tight text-ink">{p.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-soft">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Teams"
            title="The season grid"
            align="split"
            body="Middle School (MS), junior varsity (JV), and varsity programs. The new gymnasium and rooftop field open with the campus in 2027."
          />
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-x-auto" data-lenis-prevent>
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-ink/15 text-xs font-semibold uppercase tracking-[0.2em] text-soft">
                    <th className="py-4 pr-6">Sport</th>
                    <th className="py-4 pr-6">Season</th>
                    <th className="py-4">Levels</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {athleticsTeams.map((t) => (
                    <tr key={t.sport} className="group transition-colors hover:bg-tint">
                      <td className="py-4 pr-6 font-display text-lg tracking-tight text-ink">
                        {t.sport}
                      </td>
                      <td className="py-4 pr-6 text-sm text-soft">{t.seasons}</td>
                      <td className="py-4 font-mono text-sm text-pine">{t.levels}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-pine-ink py-16 text-cream md:py-20">
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-2xl tracking-tight md:text-3xl">
              The 2027 gymnasium seats 600 — and the steel is already up.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="/news"
              className="rounded-full bg-cream px-7 py-3.5 font-semibold text-pine-ink transition-all hover:bg-white active:translate-y-px"
            >
              Follow the build
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
