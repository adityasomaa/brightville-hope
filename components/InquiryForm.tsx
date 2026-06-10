"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TextField,
  SelectField,
  TextAreaField,
  DateField,
} from "@/components/forms/Fields";

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryForm({
  variant = "inquiry",
}: {
  variant?: "inquiry" | "contact";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind: variant }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="rounded-[2rem] border border-line bg-tint p-10 text-center"
      >
        <svg viewBox="0 0 48 48" className="mx-auto h-14 w-14" fill="none" aria-hidden>
          <circle cx="24" cy="24" r="22" stroke="#1a5a45" strokeWidth="2.5" />
          <motion.path
            d="M15 24.5l6.5 6.5L33 18"
            stroke="#1a5a45"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          />
        </svg>
        <h3 className="mt-6 font-display text-2xl tracking-tight text-ink">
          {variant === "inquiry" ? "We have your inquiry." : "Message received."}
        </h3>
        <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-soft">
          A real person from our team reads every submission — expect a reply
          within two school days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-full border border-ink/20 px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <TextField label="Parent / guardian name" name="parent_name" required placeholder="Rosalind Achebe" />
        <TextField label="Email" name="email" type="email" required placeholder="you@example.com" />
      </div>

      {variant === "inquiry" ? (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="Student name" name="student_name" required placeholder="First and last name" />
            <SelectField
              label="Applying for"
              name="grade_applying"
              required
              options={[
                "PreK", "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4",
                "Grade 5", "Grade 6", "Grade 7", "Grade 8",
                "Grade 9", "Grade 10", "Grade 11", "Grade 12",
              ]}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <DateField
              label="Student date of birth"
              name="dob"
              required
              max="2024-12-31"
              helper="Click anywhere on the field to open the calendar"
            />
            <DateField
              label="Preferred tour date"
              name="tour_date"
              min={new Date().toISOString().slice(0, 10)}
              helper="Saturday tours run monthly — we'll confirm by email"
            />
          </div>
          <SelectField
            label="Intended start"
            name="start_term"
            required
            options={["Fall 2026", "Spring 2027", "Fall 2027 (new campus)"]}
          />
        </>
      ) : (
        <TextField label="Subject" name="subject" required placeholder="What's this about?" />
      )}

      <TextAreaField
        label={variant === "inquiry" ? "Tell us about your child" : "Your message"}
        name="message"
        required
        rows={5}
        placeholder={
          variant === "inquiry"
            ? "What makes them light up? What are you hoping to find in a school?"
            : "Write as much or as little as you like."
        }
      />

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-[#e0b8aa] bg-[#faf0ec] px-4 py-3 text-sm text-[#a8442e]"
            role="alert"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-pine px-8 py-4 font-semibold text-cream transition-all hover:bg-pine-deep active:translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" aria-hidden />
            Sending…
          </>
        ) : variant === "inquiry" ? (
          "Submit inquiry"
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
