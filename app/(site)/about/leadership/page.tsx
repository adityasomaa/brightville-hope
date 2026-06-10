import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { leadership } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The administrators and division heads leading Brightville Hope School in Chicago.",
};

/* deterministic duotone monogram portraits — graphic placeholders, no photos */
function Portrait({ name, seed }: { name: string; seed: string }) {
  const hash = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const initials = name
    .split(" ")
    .filter((w) => w[0] === w[0]?.toUpperCase() && w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const rotate = (hash % 5) * 18;
  const dark = hash % 2 === 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full rounded-[1.5rem]" aria-hidden>
      <rect width="200" height="200" fill={dark ? "#0c2b21" : "#eaf1ec"} />
      <g transform={`rotate(${rotate} 100 100)`}>
        <circle cx="100" cy="76" r="46" fill={dark ? "#1a5a45" : "#1a5a45"} opacity="0.9" />
        <path d="M30 200a70 70 0 0 1 140 0Z" fill={dark ? "#eaf1ec" : "#11402f"} opacity="0.85" />
      </g>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="44"
        fill={dark ? "#faf8f2" : "#faf8f2"}
      >
        {initials}
      </text>
    </svg>
  );
}

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        kicker="Who we are"
        title="The people steering Brightville Hope"
        body="Educators first, administrators second. Every member of this team still teaches, advises, or coaches something — it keeps the decisions honest."
        art="field"
      />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <RevealGroup className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person, i) => (
              <RevealItem
                key={person.name}
                className={i % 3 === 1 ? "lg:translate-y-10" : ""}
              >
                <Portrait name={person.name} seed={person.seed} />
                <h2 className="mt-5 font-display text-xl tracking-tight text-ink">
                  {person.name}
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-pine">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-soft">{person.bio}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
