import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import { admissionsSteps, school } from "@/lib/content";

export const metadata: Metadata = {
  title: "Apply & Visit",
  description:
    "Start your Brightville Hope School inquiry: tour dates, the application timeline, and the inquiry form.",
};

const dates = [
  { date: "Jun 20, 2026", label: "Saturday Tour & Hard-Hat Preview" },
  { date: "Jun 25, 2026", label: "Virtual Information Evening" },
  { date: "Sep 12, 2026", label: "Fall Open House" },
  { date: "Dec 1, 2026", label: "Application deadline (Fall 2027 entry)" },
  { date: "Mar 5, 2027", label: "Decisions released" },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        kicker="Admissions"
        title="Start the conversation"
        body="The form below takes about four minutes. A member of the admissions team — a person, with a name — replies within two school days."
        art="orbit"
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                Dates that matter
              </h2>
              <ul className="mt-8 divide-y divide-line">
                {dates.map((d) => (
                  <li key={d.label} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-4">
                    <span className="font-mono text-xs text-pine">{d.date}</span>
                    <span className="text-sm text-soft">{d.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 rounded-2xl bg-tint p-7">
                <h3 className="font-display text-lg tracking-tight text-ink">
                  The steps, again
                </h3>
                <ol className="mt-4 space-y-3">
                  {admissionsSteps.map((s) => (
                    <li key={s.step} className="flex gap-3 text-sm text-soft">
                      <span className="font-mono text-pine">{s.step}</span>
                      {s.title}
                    </li>
                  ))}
                </ol>
                <p className="mt-5 border-t border-pine/15 pt-5 text-sm leading-relaxed text-soft">
                  Questions first? Write to{" "}
                  <a href={`mailto:${school.admissionsEmail}`} className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">
                    {school.admissionsEmail}
                  </a>{" "}
                  or call {school.phone}.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-[2rem] border border-line bg-cream p-7 md:p-10">
              <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                Inquiry form
              </h2>
              <p className="mt-2 text-sm text-soft">
                Required fields are marked with an asterisk.
              </p>
              <div className="mt-8">
                <InquiryForm variant="inquiry" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
