import PlaceholderArt from "@/components/PlaceholderArt";
import Reveal from "@/components/Reveal";

type Art = "sunrise" | "arch" | "field" | "orbit" | "ribbon";

/** Asymmetric inner-page hero: copy left, brand graphic right. */
export default function PageHero({
  kicker,
  title,
  body,
  art = "arch",
}: {
  kicker: string;
  title: string;
  body: string;
  art?: Art;
}) {
  return (
    <section className="border-b border-line bg-cream pt-[4.5rem]">
      <div className="container-x grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
            {kicker}
          </p>
          <h1 className="mt-5 max-w-[16ch] font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-soft md:text-lg">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.15} className="hidden lg:block">
          <PlaceholderArt
            variant={art}
            className="aspect-[4/3] w-full rounded-[2rem]"
          />
        </Reveal>
      </div>
    </section>
  );
}
