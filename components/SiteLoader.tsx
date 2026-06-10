"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Brightville", "Hope", "School"];

/**
 * Full-site loader for hard loads — editorial and light, in the spirit of
 * berkeleycarroll.org: serif wordmark rising word by word (with an italic
 * accent), a thin rule drawing across, then a soft lift away.
 * Route-to-route navigation uses the quicker transition in template.tsx.
 */
export default function SiteLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduced ? 150 : 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="site-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
          exit={{ y: "-6%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Loading Brightville Hope School"
        >
          {/* sun mark */}
          <motion.svg
            viewBox="0 0 64 40"
            className="w-14"
            fill="none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            <motion.path
              d="M16 34a16 16 0 0 1 32 0"
              stroke="#1a5a45"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.g
              stroke="#1a5a45"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <line x1="32" y1="4" x2="32" y2="10" />
              <line x1="12" y1="12" x2="16.5" y2="16.5" />
              <line x1="52" y1="12" x2="47.5" y2="16.5" />
            </motion.g>
          </motion.svg>

          {/* wordmark — word by word, italic accent on "Hope" */}
          <div className="mt-7 flex flex-wrap items-baseline justify-center gap-x-[0.45em] px-6" aria-hidden>
            {WORDS.map((word, i) => (
              <span key={word} className="overflow-hidden pb-1">
                <motion.span
                  className={`block font-display text-4xl tracking-tight text-ink md:text-5xl ${
                    word === "Hope" ? "font-light italic text-pine" : ""
                  }`}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.45 + i * 0.14,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* thin rule + kicker */}
          <motion.div
            className="mt-7 h-px w-44 bg-ink/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          />
          <motion.p
            className="mt-5 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            An independent PreK–12 school · Chicago
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
