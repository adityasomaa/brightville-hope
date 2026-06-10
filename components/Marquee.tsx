export default function Marquee({ items }: { items: string[] }) {
  const row = items.map((t, i) => (
    <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap">
      <span className="font-display text-lg tracking-tight text-cream/90 md:text-xl">
        {t}
      </span>
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-cream/40" aria-hidden>
        <circle cx="6" cy="6" r="5" fill="currentColor" />
      </svg>
    </span>
  ));

  return (
    <div className="overflow-hidden bg-pine py-4" aria-hidden>
      <div className="flex w-max animate-marquee">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}
