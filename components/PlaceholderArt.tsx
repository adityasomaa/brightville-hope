type Variant = "sunrise" | "arch" | "field" | "orbit" | "ribbon";

const palettes: Record<string, { bg: string; a: string; b: string; c: string }> = {
  light: { bg: "#eaf1ec", a: "#1a5a45", b: "#11402f", c: "#faf8f2" },
  dark: { bg: "#0c2b21", a: "#eaf1ec", b: "#1a5a45", c: "#faf8f2" },
};

/**
 * Graphic stand-ins used wherever photography would normally go.
 * Pure SVG duotone compositions in the brand palette — no external images.
 */
export default function PlaceholderArt({
  variant = "sunrise",
  tone = "light",
  className = "",
  label,
}: {
  variant?: Variant;
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}) {
  const p = palettes[tone];

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill={p.bg} />
      {variant === "sunrise" && (
        <g>
          <circle cx="200" cy="210" r="86" fill={p.a} />
          <rect x="0" y="210" width="400" height="90" fill={p.bg} />
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={86 + i * 57}
              y1={92 - (i === 2 ? 18 : 0)}
              x2={86 + i * 57}
              y2={118}
              stroke={p.b}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
          <path d="M0 222h400" stroke={p.b} strokeWidth="5" />
          <path d="M40 252h320" stroke={p.b} strokeWidth="3" opacity="0.5" />
        </g>
      )}
      {variant === "arch" && (
        <g>
          <path d="M84 300V160a56 56 0 0 1 112 0v140Z" fill={p.a} />
          <path d="M228 300V190a44 44 0 0 1 88 0v110Z" fill={p.b} />
          <circle cx="312" cy="84" r="26" fill={p.a} />
          <line x1="40" y1="64" x2="40" y2="138" stroke={p.b} strokeWidth="5" strokeLinecap="round" />
          <line x1="62" y1="92" x2="62" y2="138" stroke={p.b} strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {variant === "field" && (
        <g>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={34 + c * 48}
                cy={36 + r * 48}
                r={(r + c) % 3 === 0 ? 11 : 5}
                fill={(r + c) % 2 === 0 ? p.a : p.b}
                opacity={(r + c) % 3 === 0 ? 1 : 0.55}
              />
            ))
          )}
        </g>
      )}
      {variant === "orbit" && (
        <g fill="none">
          <circle cx="200" cy="150" r="104" stroke={p.a} strokeWidth="4" />
          <circle cx="200" cy="150" r="64" stroke={p.b} strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
          <circle cx="200" cy="150" r="22" fill={p.a} />
          <circle cx="304" cy="150" r="12" fill={p.b} />
          <circle cx="138" cy="64" r="8" fill={p.b} />
        </g>
      )}
      {variant === "ribbon" && (
        <g fill="none">
          <path d="M-20 220C80 120 140 270 220 170S380 90 430 130" stroke={p.a} strokeWidth="26" strokeLinecap="round" />
          <path d="M-20 250C90 160 150 290 230 200S390 130 430 170" stroke={p.b} strokeWidth="10" strokeLinecap="round" opacity="0.6" />
          <circle cx="330" cy="70" r="20" fill={p.a} />
        </g>
      )}
    </svg>
  );
}
