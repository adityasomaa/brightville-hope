"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Sign-in failed — try again.");
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed — try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="field-shell">
        <label htmlFor="login-username" className="field-label">
          Username
        </label>
        <input
          id="login-username"
          name="username"
          type="text"
          autoComplete="username"
          required
          autoFocus
          placeholder="your.username"
          className="field-input"
        />
      </div>

      <div className="field-shell">
        <label htmlFor="login-password" className="field-label">
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="••••••••••••"
            className="field-input pr-14"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2.5 text-faint transition-colors hover:text-pine"
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M3 3l18 18M10.6 10.7a2.5 2.5 0 0 0 3.5 3.5M7.4 7.5C5.1 8.8 3.5 10.8 2.5 12c1.8 2.4 5.2 6 9.5 6 1.6 0 3.1-.5 4.4-1.2M11 6.1c.3 0 .7-.1 1-.1 4.3 0 7.7 3.6 9.5 6-.5.7-1.2 1.5-2 2.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M2.5 12C4.3 9.6 7.7 6 12 6s7.7 3.6 9.5 6c-1.8 2.4-5.2 6-9.5 6s-7.7-3.6-9.5-6Z" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-xl border border-[#e0b8aa] bg-[#faf0ec] px-4 py-3 text-sm text-[#a8442e]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-pine px-8 py-4 font-semibold text-cream transition-all hover:bg-pine-deep active:translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" aria-hidden />
            Signing in…
          </>
        ) : (
          "Sign in to the portal"
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-faint">
        Trouble signing in? Ask your advisor or write to{" "}
        <a href="mailto:portal@brightvillehope.org" className="font-semibold text-pine">
          portal@brightvillehope.org
        </a>
      </p>
    </form>
  );
}
