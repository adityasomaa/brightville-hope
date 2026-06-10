"use client";

import { useEffect, useState } from "react";

/**
 * Live clock pinned to the school's timezone (America/Chicago — UTC-6/-5).
 * Renders a placeholder until mounted to avoid hydration mismatch.
 * variant "light" sits on cream/white surfaces (header), "dark" on pine.
 */
export default function ChicagoClock({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const tone =
    variant === "dark"
      ? { time: "text-cream", label: "text-cream/50" }
      : { time: "text-ink", label: "text-faint" };

  if (!now) {
    return (
      <div
        className={`h-5 w-32 animate-pulse rounded ${variant === "dark" ? "bg-cream/10" : "bg-ink/10"}`}
        aria-hidden
      />
    );
  }

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return (
    <div
      className="flex items-center gap-2.5"
      aria-label={`Current time in Chicago: ${time}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-pine animate-pulse-dot" aria-hidden />
      <span className={`font-mono text-sm tabular-nums ${tone.time}`}>{time}</span>
      <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.25em] ${tone.label}`}>
        Chicago
      </span>
    </div>
  );
}
