"use client";

import { useId, useRef, useState } from "react";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helper?: string;
};

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

export function SelectField({
  label,
  name,
  options,
  required,
  error,
}: BaseProps & { options: string[] }) {
  const id = useId();
  return (
    <div className="field-shell">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-pine"> *</span>}
      </label>
      <select id={id} name={name} required={required} className="field-input" defaultValue="" aria-invalid={!!error}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
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
 * Date field where the ENTIRE field opens the picker — not just the
 * calendar icon. The native indicator is stretched invisibly across the
 * whole input (CSS), with showPicker() as a programmatic backstop.
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
  const ref = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);

  const openPicker = () => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    try {
      el.showPicker();
    } catch {
      // older browsers fall back to native focus behavior
    }
  };

  return (
    <div className="field-shell">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-pine"> *</span>}
      </label>
      <div className="relative cursor-pointer" onClick={openPicker}>
        <input
          ref={ref}
          id={id}
          name={name}
          type="date"
          required={required}
          min={min}
          max={max}
          onChange={(e) => setHasValue(!!e.target.value)}
          className={`field-input pr-12 ${hasValue ? "" : "is-empty"}`}
          aria-invalid={!!error}
        />
        <svg
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pine"
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
      </div>
      {helper && !error && <p className="text-xs text-faint">{helper}</p>}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
