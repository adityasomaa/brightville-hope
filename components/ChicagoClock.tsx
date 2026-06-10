"use client";

import { useEffect, useState } from "react";

/**
 * Live clock pinned to the school's timezone (America/Chicago — UTC-6/-5).
 * Renders nothing until mounted to avoid hydration mismatch.
 */
export default function ChicagoClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="h-[4.2rem] w-44 animate-pulse rounded-xl bg-cream/5" aria-hidden />
    );
  }

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(now);

  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    timeZoneName: "shortOffset",
  })
    .formatToParts(now)
    .find((p) => p.type === "timeZoneName")?.value;

  return (
    <div aria-label={`Current time in Chicago: ${time}`}>
      <p className="font-mono text-[1.7rem] leading-none text-cream tabular-nums">
        {time}
        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-tint animate-pulse-dot align-middle" aria-hidden />
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/50">
        {date} · Chicago ({offset ?? "UTC-5"})
      </p>
    </div>
  );
}
