import Reveal from "@/components/Reveal";
import Em from "@/components/Em";

export default function SectionHeading({
  kicker,
  title,
  body,
  tone = "light",
  align = "left",
}: {
  kicker: string;
  title: string;
  body?: string;
  tone?: "light" | "dark";
  align?: "left" | "split";
}) {
  return (
    <Reveal>
      <div
        className={
          align === "split"
            ? "grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end"
            : ""
        }
      >
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] ${
              tone === "dark" ? "text-cream/50" : "text-pine"
            }`}
          >
            {kicker}
          </p>
          <h2
            className={`mt-4 font-display text-3xl leading-[1.05] tracking-tight md:text-5xl ${
              tone === "dark" ? "text-cream" : "text-ink"
            }`}
          >
            <Em>{title}</Em>
          </h2>
        </div>
        {body && (
          <p
            className={`max-w-[58ch] text-base leading-relaxed ${
              tone === "dark" ? "text-cream/70" : "text-soft"
            } ${align === "split" ? "" : "mt-5"}`}
          >
            {body}
          </p>
        )}
      </div>
    </Reveal>
  );
}
