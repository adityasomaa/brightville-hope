"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { nav, school } from "@/lib/content";

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Brightville Hope School — home">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden>
        <rect width="64" height="64" rx="14" fill={inverted ? "#faf8f2" : "#0c2b21"} />
        <g stroke={inverted ? "#0c2b21" : "#faf8f2"} strokeWidth="2.6" strokeLinecap="round">
          <line x1="32" y1="12" x2="32" y2="19" />
          <line x1="17.5" y1="18" x2="22.4" y2="22.9" />
          <line x1="46.5" y1="18" x2="41.6" y2="22.9" />
        </g>
        <path d="M19 44a13 13 0 0 1 26 0Z" fill={inverted ? "#0c2b21" : "#faf8f2"} />
        <line x1="12" y1="48.5" x2="52" y2="48.5" stroke={inverted ? "#0c2b21" : "#faf8f2"} strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span className={`font-display leading-tight ${inverted ? "text-cream" : "text-ink"}`}>
        <span className="block text-[1.05rem] tracking-tight">Brightville Hope</span>
        <span className={`block text-[0.6rem] uppercase tracking-[0.3em] ${inverted ? "text-cream/60" : "text-soft"}`}>
          School · Chicago
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24));

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid && !open
            ? "border-b border-line bg-cream/90 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Logo inverted={open} />

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-[0.86rem] font-medium transition-colors ${
                    pathname.startsWith(item.href)
                      ? "text-pine"
                      : "text-ink hover:text-pine"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="w-64 rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_48px_-20px_rgba(12,43,33,0.25)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-tint"
                        >
                          <span className="block text-sm font-medium text-ink">
                            {child.label}
                          </span>
                          {child.note && (
                            <span className="block text-xs text-faint">{child.note}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/admissions/apply"
              className="rounded-full border border-ink/20 px-5 py-2.5 text-[0.84rem] font-semibold text-ink transition-all hover:border-pine hover:text-pine active:translate-y-px"
            >
              Inquire
            </Link>
            <Link
              href="/admin"
              className="rounded-full bg-pine px-5 py-2.5 text-[0.84rem] font-semibold text-cream transition-all hover:bg-pine-deep active:translate-y-px"
            >
              Student Portal
            </Link>
          </div>

          {/* hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full rounded transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45 bg-cream" : "bg-ink"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] rounded transition-all duration-300 ${
                  open
                    ? "bottom-1/2 w-full translate-y-1/2 -rotate-45 bg-cream"
                    : "w-4/6 bg-ink"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-pine-ink lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.2rem)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex-1 overflow-y-auto pb-10 pt-24">
              <motion.nav
                aria-label="Mobile"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
                className="flex flex-col divide-y divide-cream/10"
              >
                {nav.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="py-2"
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-3 text-left"
                          onClick={() =>
                            setExpanded(expanded === item.label ? null : item.label)
                          }
                          aria-expanded={expanded === item.label}
                        >
                          <span className="font-display text-2xl text-cream">{item.label}</span>
                          <motion.svg
                            viewBox="0 0 16 16"
                            className="h-4 w-4 text-cream/60"
                            animate={{ rotate: expanded === item.label ? 45 : 0 }}
                            aria-hidden
                          >
                            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </motion.svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pb-4 pl-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="py-2 text-base text-cream/70 transition-colors hover:text-cream"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={item.href} className="block py-3 font-display text-2xl text-cream">
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex flex-col gap-3"
              >
                <Link
                  href="/admissions/apply"
                  className="rounded-full border border-cream/30 px-6 py-3.5 text-center font-semibold text-cream transition-colors hover:bg-cream/10"
                >
                  Inquire about admission
                </Link>
                <Link
                  href="/admin"
                  className="rounded-full bg-cream px-6 py-3.5 text-center font-semibold text-pine-ink transition-all active:translate-y-px"
                >
                  Student Portal
                </Link>
                <p className="mt-4 text-center text-xs uppercase tracking-[0.25em] text-cream/40">
                  {school.neighborhood}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
