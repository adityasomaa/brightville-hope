"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helper?: string;
};

const popIn = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
};

function useOutsideClose(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return ref;
}

/** Invisible input layered under a custom control so native form
 *  validation (required) still works and FormData picks up the value. */
function GhostInput({
  name,
  value,
  required,
}: {
  name: string;
  value: string;
  required?: boolean;
}) {
  return (
    <input
      tabIndex={-1}
      aria-hidden
      name={name}
      value={value}
      required={required}
      onChange={() => {}}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
    />
  );
}

export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
  helper,
}: BaseProps & { type?: string; placeholder?: string }) {
  const id = useId();
  return (
    <div className="field-shell">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-pine"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="field-input"
        aria-invalid={!!error}
      />
      {helper && !error && <p className="text-xs text-faint">{helper}</p>}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  placeholder,
  required,
  rows = 4,
  error,
}: BaseProps & { placeholder?: string; rows?: number }) {
  const id = useId();
  return (
    <div className="field-shell">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-pine"> *</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="field-input resize-y"
        aria-invalid={!!error}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

/**
 * Fully styled select — the native <option> popup can't be themed, so this
 * renders its own animated listbox. A ghost input keeps required-validation
 * and FormData behavior intact.
 */
export function SelectField({
  label,
  name,
  options,
  required,
  error,
}: BaseProps & { options: string[] }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useOutsideClose(open, () => setOpen(false));

  return (
    <div className="field-shell">
      <span className="field-label" id={`${id}-label`}>
        {label}
        {required && <span className="text-pine"> *</span>}
      </span>
      <div ref={ref} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label`}
          onClick={() => setOpen((v) => !v)}
          className={`field-input flex w-full items-center justify-between gap-3 text-left ${
            value ? "text-ink" : "text-faint"
          } ${open ? "border-pine shadow-[0_0_0_4px_rgba(26,90,69,0.12)]" : ""}`}
        >
          <span>{value || "Select…"}</span>
          <motion.svg
            viewBox="0 0 12 8"
            className="h-2 w-3 shrink-0 text-soft"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </motion.svg>
        </button>
        <GhostInput name={name} value={value} required={required} />

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              aria-labelledby={`${id}-label`}
              data-lenis-prevent
              {...popIn}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 max-h-64 overflow-y-auto rounded-2xl border border-line bg-paper p-1.5 shadow-[0_28px_56px_-16px_rgba(12,43,33,0.3)]"
            >
              {options.map((o) => {
                const selected = o === value;
                return (
                  <li key={o}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setValue(o);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                        selected
                          ? "bg-tint font-semibold text-pine"
                          : "text-ink hover:bg-cream"
                      }`}
                    >
                      {o}
                      {selected && (
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden>
                          <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

/* ---------- custom calendar date picker ---------- */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/**
 * Fully styled date field — the native calendar popup can't be themed, so
 * this renders its own calendar popover. The whole field opens it; month
 * and year are steppable for quick date-of-birth navigation.
 */
export function DateField({
  label,
  name,
  required,
  error,
  helper,
  min,
  max,
}: BaseProps & { min?: string; max?: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(""); // ISO yyyy-mm-dd
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const ref = useOutsideClose(open, () => setOpen(false));

  const openPicker = () => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      setView({ y, m: m - 1 });
    }
    setOpen((v) => !v);
  };

  const shift = (months: number) => {
    setView((v) => {
      const next = new Date(v.y, v.m + months, 1);
      return { y: next.getFullYear(), m: next.getMonth() };
    });
  };

  const firstDow = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const todayISO = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  const display = value
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(`${value}T12:00:00`)
      )
    : "Select a date";

  return (
    <div className="field-shell">
      <span className="field-label" id={`${id}-label`}>
        {label}
        {required && <span className="text-pine"> *</span>}
      </span>
      <div ref={ref} className="relative">
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-labelledby={`${id}-label`}
          onClick={openPicker}
          className={`field-input flex w-full items-center justify-between gap-3 text-left ${
            value ? "text-ink" : "text-faint"
          } ${open ? "border-pine shadow-[0_0_0_4px_rgba(26,90,69,0.12)]" : ""}`}
        >
          <span>{display}</span>
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5 shrink-0 text-pine"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <rect x="2.5" y="4" width="15" height="13.5" rx="2.5" />
            <path d="M2.5 8.5h15M6.5 2.5v3M13.5 2.5v3" strokeLinecap="round" />
            <circle cx="7" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="11" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
          </svg>
        </button>
        <GhostInput name={name} value={value} required={required} />

        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-label={`Choose ${label.toLowerCase()}`}
              {...popIn}
              className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-[19.5rem] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-line bg-paper p-4 shadow-[0_28px_56px_-16px_rgba(12,43,33,0.3)]"
            >
              {/* month / year navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <button type="button" onClick={() => shift(-12)} aria-label="Previous year" className="grid h-8 w-8 place-items-center rounded-lg text-soft transition-colors hover:bg-tint hover:text-pine">
                    «
                  </button>
                  <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="grid h-8 w-8 place-items-center rounded-lg text-soft transition-colors hover:bg-tint hover:text-pine">
                    ‹
                  </button>
                </div>
                <p className="font-display text-base tracking-tight text-ink">
                  {MONTHS[view.m]} <span className="font-mono text-sm text-pine">{view.y}</span>
                </p>
                <div className="flex gap-1">
                  <button type="button" onClick={() => shift(1)} aria-label="Next month" className="grid h-8 w-8 place-items-center rounded-lg text-soft transition-colors hover:bg-tint hover:text-pine">
                    ›
                  </button>
                  <button type="button" onClick={() => shift(12)} aria-label="Next year" className="grid h-8 w-8 place-items-center rounded-lg text-soft transition-colors hover:bg-tint hover:text-pine">
                    »
                  </button>
                </div>
              </div>

              {/* weekday header */}
              <div className="mt-3 grid grid-cols-7 text-center">
                {DOW.map((d) => (
                  <span key={d} className="py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-faint">
                    {d}
                  </span>
                ))}
              </div>

              {/* day grid */}
              <div className="grid grid-cols-7 gap-y-0.5 text-center">
                {Array.from({ length: firstDow }).map((_, i) => (
                  <span key={`pad-${i}`} aria-hidden />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const iso = toISO(view.y, view.m, day);
                  const disabled = (min && iso < min) || (max && iso > max);
                  const selected = iso === value;
                  const isToday = iso === todayISO;
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={!!disabled}
                      onClick={() => {
                        setValue(iso);
                        setOpen(false);
                      }}
                      aria-label={`${MONTHS[view.m]} ${day}, ${view.y}`}
                      aria-pressed={selected}
                      className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-sm transition-all ${
                        selected
                          ? "bg-pine font-semibold text-cream"
                          : disabled
                            ? "cursor-not-allowed text-line"
                            : isToday
                              ? "border border-pine/40 text-pine hover:bg-tint"
                              : "text-ink hover:bg-tint hover:text-pine"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* footer actions */}
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <button
                  type="button"
                  onClick={() => setValue("")}
                  className="text-xs font-semibold text-faint transition-colors hover:text-pine"
                >
                  Clear
                </button>
                {(!min || todayISO >= min) && (!max || todayISO <= max) && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue(todayISO);
                      setOpen(false);
                    }}
                    className="text-xs font-semibold text-pine transition-colors hover:text-pine-deep"
                  >
                    Today
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {helper && !error && <p className="text-xs text-faint">{helper}</p>}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
