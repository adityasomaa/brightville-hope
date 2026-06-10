"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-site loader shown on hard loads: a sunrise mark draws itself,
 * the wordmark letters rise in, then the curtain lifts.
 * (Route-to-route navigation uses the separate, quicker wipe in template.tsx.)
 */
export default function SiteLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduced ? 150 : 1900);
    return () => clearTimeout(t);
  }, []);

  const word = "BRIGHTVILLE HOPE";

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="site-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pine-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Loading Brightville Hope School"
        >
          <svg viewBox="0 0 120 80" className="w-24" fill="none" aria-hidden>
            <circle
              cx="60"
              cy="52"
              r="20"
              stroke="#faf8f2"
              strokeWidth="2.5"
              strokeDasharray="320"
              style={{ animation: "ring-draw 1.2s cubic-bezier(0.16,1,0.3,1) forwards" }}
            />
            <motion.g
              stroke="#faf8f2"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <line x1="60" y1="14" x2="60" y2="22" />
              <line x1="32" y1="26" x2="38" y2="32" />
              <line x1="88" y1="26" x2="82" y2="32" />
            </motion.g>
          </svg>
          <div className="mt-6 flex overflow-hidden" aria-hidden>
            {word.split("").map((ch, i) => (
              <motion.span
                key={i}
                className="font-display text-cream text-lg tracking-[0.3em]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.35 + i * 0.035,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="mt-3 text-xs uppercase tracking-[0.35em] text-cream/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            Chicago, Illinois
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
