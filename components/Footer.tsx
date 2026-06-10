import Link from "next/link";
import { school } from "@/lib/content";

const columns = [
  {
    heading: "School",
    links: [
      { label: "Mission & Values", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "News & Events", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Learning",
    links: [
      { label: "Lower School", href: "/academics/lower-school" },
      { label: "Middle School", href: "/academics/middle-school" },
      { label: "Upper School", href: "/academics/upper-school" },
      { label: "Arts", href: "/arts" },
      { label: "Athletics", href: "/athletics" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Why Brightville", href: "/admissions" },
      { label: "Apply & Visit", href: "/admissions/apply" },
      { label: "Tuition & Aid", href: "/admissions/tuition" },
      { label: "Student Portal", href: "/admin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-pine-ink text-cream">
      <div className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
            Bright minds.
            <br />
            <em className="font-light italic text-cream/60">Boundless hope.</em>
          </p>
          <address className="mt-6 text-sm not-italic leading-relaxed text-cream/70">
            {school.address}
            <br />
            {school.phone}
            <br />
            <a href={`mailto:${school.email}`} className="underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream">
              {school.email}
            </a>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/40">
                {col.heading}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/75 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-cream/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
          <p>New flagship campus opening Fall 2027 — {school.neighborhood}.</p>
        </div>
      </div>
    </footer>
  );
}
