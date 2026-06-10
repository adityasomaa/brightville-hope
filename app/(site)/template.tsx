"use client";

import { motion } from "framer-motion";

/**
 * Route-to-route transition (distinct from the full SiteLoader):
 * a hairline progress bar sweeps across the top while the page
 * content rises in softly. Remounts on every navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2.5px] origin-left bg-pine"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 0.9, times: [0, 0.65, 1], ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
