import Link from "next/link";
import PlaceholderArt from "@/components/PlaceholderArt";

export default function NotFound() {
  return (
    <section className="flex min-h-[100dvh] items-center bg-cream pt-[4.5rem]">
      <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-sm text-pine">404</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink md:text-6xl">
            This hallway doesn't exist yet.
          </h1>
          <p className="mt-5 max-w-[48ch] leading-relaxed text-soft">
            To be fair, half our campus is still under construction too. The
            page you're after may have moved — or never been built.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-pine px-7 py-3.5 font-semibold text-cream transition-all hover:bg-pine-deep active:translate-y-px"
            >
              Back to the homepage
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-ink/20 px-7 py-3.5 font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
            >
              Tell us what broke
            </Link>
          </div>
        </div>
        <PlaceholderArt variant="orbit" className="aspect-[4/3] w-full rounded-[2rem]" />
      </div>
    </section>
  );
}
