import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import PlaceholderArt from "@/components/PlaceholderArt";
import { school } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit, call, or write to Brightville Hope School — Welcome Center in Lincoln Park, Chicago.",
};

const contacts = [
  { label: "General", value: school.email, href: `mailto:${school.email}` },
  { label: "Admissions", value: school.admissionsEmail, href: `mailto:${school.admissionsEmail}` },
  { label: "Phone", value: school.phone, href: `tel:${school.phone.replace(/[^+\d]/g, "")}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Doors open at 7:45. So are we."
        body="The fastest way to understand Brightville is to stand in the lobby at drop-off. Failing that — the form below reaches a person the same day."
        art="sunrise"
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                Find us
              </h2>
              <address className="mt-5 text-base not-italic leading-relaxed text-soft">
                <strong className="font-semibold text-ink">Welcome Center (current)</strong>
                <br />
                {school.address}
                <br />
                {school.neighborhood}
              </address>
              <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-faint">
                {school.campusNote}
              </p>
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {contacts.map((c) => (
                  <div key={c.label} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-faint">
                      {c.label}
                    </dt>
                    <dd>
                      <a href={c.href} className="font-medium text-pine underline decoration-pine/30 underline-offset-4 transition-colors hover:decoration-pine">
                        {c.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.12}>
              <PlaceholderArt
                variant="arch"
                label="Illustration of the Brightville Hope Welcome Center"
                className="mt-10 aspect-[16/10] w-full rounded-[2rem]"
              />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-[2rem] border border-line bg-cream p-7 md:p-10">
              <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                Write to us
              </h2>
              <p className="mt-2 text-sm text-soft">
                Admissions questions, press, partnerships, or just a good idea.
              </p>
              <div className="mt-8">
                <InquiryForm variant="contact" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
