"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { divisions } from "@/lib/content";
import PlaceholderArt from "@/components/PlaceholderArt";

export default function DivisionTabs() {
  const [active, setActive] = useState(0);
  const division = divisions[active];

  return (
    <div>
      <div role="tablist" aria-label="School divisions" className="flex flex-wrap gap-2">
        {divisions.map((d, i) => (
          <button
            key={d.slug}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              i === active ? "text-cream" : "text-soft hover:text-ink"
            }`}
          >
            {i === active && (
              <motion.span
                layoutId="division-pill"
                className="absolute inset-0 rounded-full bg-pine"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative">{d.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={division.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]"
          >
            <PlaceholderArt
              variant={division.art}
              className="aspect-[4/3] w-full rounded-[2rem]"
            />
            <div>
              <p className="font-mono text-sm text-pine">{division.grades}</p>
              <h3 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
                {division.tagline}
              </h3>
              <p className="mt-5 max-w-[60ch] leading-relaxed text-soft">
                {division.intro}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {division.signature.slice(0, 3).map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-paper px-4 py-1.5 text-xs font-medium text-soft"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href={`/academics/${division.slug}`}
                className="group mt-8 inline-flex items-center gap-2 font-semibold text-pine"
              >
                Explore the {division.name}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
