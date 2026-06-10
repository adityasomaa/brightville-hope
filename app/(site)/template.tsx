"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Route-to-route transition (distinct from the full SiteLoader):
 * a quick frosted overlay with the sunrise-logo spinner — a dashed orbit
 * ring spinning around the mark with a sun-dot tracing the orbit — then
 * the new page rises in. Remounts on every navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setBusy(false), reduced ? 50 : 620);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {busy && (
          <motion.div
            key="route-loader"
            className="pointer-events-none fixed inset-0 z-[85] grid place-items-center bg-cream/80 backdrop-blur-md"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            aria-label="Loading page"
          >
            <div className="relative grid h-24 w-24 place-items-center">
              {/* spinning dashed orbit with a sun-dot riding it */}
              <motion.svg
                viewBox="0 0 96 96"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                aria-hidden
              >
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="#1a5a45"
                  strokeOpacity="0.22"
                  strokeWidth="2"
                  strokeDasharray="3 9"
                  strokeLinecap="round"
                />
                <circle cx="48" cy="4" r="4" fill="#1a5a45" />
              </motion.svg>

              {/* counter-rotating inner arc for depth */}
              <motion.svg
                viewBox="0 0 96 96"
                className="absolute inset-[10px]"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                aria-hidden
              >
                <path
                  d="M48 6a42 42 0 0 1 36.4 21"
                  fill="none"
                  stroke="#1a5a45"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* logo badge with a soft breath */}
              <motion.svg
                viewBox="0 0 64 64"
                className="h-12 w-12"
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                aria-hidden
              >
                <rect width="64" height="64" rx="14" fill="#0c2b21" />
                <g stroke="#faf8f2" strokeWidth="2.6" strokeLinecap="round">
                  <line x1="32" y1="12" x2="32" y2="19" />
                  <line x1="17.5" y1="18" x2="22.4" y2="22.9" />
                  <line x1="46.5" y1="18" x2="41.6" y2="22.9" />
                </g>
                <path d="M19 44a13 13 0 0 1 26 0Z" fill="#faf8f2" />
                <line x1="12" y1="48.5" x2="52" y2="48.5" stroke="#faf8f2" strokeWidth="2.6" strokeLinecap="round" />
              </motion.svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
