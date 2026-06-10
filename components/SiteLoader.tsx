"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Brightville", "Hope", "School"];

/**
 * Full-site loader for hard loads. Editorial, with a staged exit:
 * the wordmark drifts up first, then the whole cream curtain lifts away
 * with a curved "horizon" hem sweeping across the page — a sunrise in
 * reverse. A mono counter ticks to 100 while it plays.
 */
export default function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = setTimeout(() => setPhase("done"), 150);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    const iv = setInterval(() => {
      const p = Math.min(100, Math.round(((performance.now() - start) / 1850) * 100));
      setCount(p);
      if (p >= 100) clearInterval(iv);
    }, 40);
    const t1 = setTimeout(() => setPhase("leaving"), 2000);
    const t2 = setTimeout(() => setPhase("done"), 2380);
    return () => {
      clearInterval(iv);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const leaving = phase === "leaving";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="site-loader"
          className="fixed inset-0 z-[100]"
          exit={{ y: "-112%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Loading Brightville Hope School"
        >
          {/* cream curtain with curved horizon hem that sweeps on exit */}
          <div className="absolute inset-0 bg-cream" />
          <svg
            viewBox="0 0 1440 130"
            preserveAspectRatio="none"
            className="absolute left-0 top-full h-[12vh] w-full"
            aria-hidden
          >
            <path d="M0 0C360 125 1080 125 1440 0Z" fill="#faf8f2" />
          </svg>

          {/* center content — drifts up just before the curtain lifts */}
          <motion.div
            className="relative flex h-full flex-col items-center justify-center"
            animate={leaving ? { y: -44, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
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

          {/* corner details */}
          <motion.div
            className="absolute inset-x-0 bottom-7"
            animate={leaving ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-hidden
          >
            <div className="container-x flex items-end justify-between">
              <p className="font-mono text-xs text-soft tabular-nums">
                [ {String(count).padStart(3, "0")} ]
              </p>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-faint">
                Lincoln Park · Chicago
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
