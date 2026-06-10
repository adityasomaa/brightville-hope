"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling on desktop only. Touch devices, small viewports, and
 * reduced-motion users keep native scrolling untouched.
 *
 * Uses Lenis's built-in rAF loop and the recommended `lenis` root classes
 * (styles in globals.css) — skipping those classes is the classic cause of
 * wheel input stalling over some sections while the scrollbar still works.
 * Nested scrollable areas opt out via `data-lenis-prevent`.
 */
export default function LenisProvider() {
  useEffect(() => {
    const isDesktop = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isDesktop || reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
