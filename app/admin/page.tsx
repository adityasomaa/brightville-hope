import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import PlaceholderArt from "@/components/PlaceholderArt";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function AdminLoginPage() {
  const jar = await cookies();
  const session = await verifySession(jar.get(SESSION_COOKIE)?.value);
  if (session) redirect("/admin/dashboard");

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1.1fr]">
      {/* brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-pine-ink p-12 text-cream lg:flex">
        <PlaceholderArt
          variant="sunrise"
          tone="dark"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        />
        <Link href="/" className="relative flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
            <rect width="64" height="64" rx="14" fill="#faf8f2" />
            <g stroke="#0c2b21" strokeWidth="2.6" strokeLinecap="round">
              <line x1="32" y1="12" x2="32" y2="19" />
              <line x1="17.5" y1="18" x2="22.4" y2="22.9" />
              <line x1="46.5" y1="18" x2="41.6" y2="22.9" />
            </g>
            <path d="M19 44a13 13 0 0 1 26 0Z" fill="#0c2b21" />
            <line x1="12" y1="48.5" x2="52" y2="48.5" stroke="#0c2b21" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <span className="font-display text-lg tracking-tight">Brightville Hope School</span>
        </Link>
        <div className="relative">
          <p className="max-w-[20ch] font-display text-4xl leading-tight tracking-tight">
            Your school day, in one place.
          </p>
          <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-cream/70">
            Announcements, schoolwork, schedules, and grades — the portal is
            updated by your teachers throughout the day.
          </p>
        </div>
        <p className="relative text-xs uppercase tracking-[0.3em] text-cream/40">
          Student & family portal
        </p>
      </div>

      {/* form panel */}
      <div className="flex items-center justify-center bg-cream px-5 py-16">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden>
              <rect width="64" height="64" rx="14" fill="#0c2b21" />
              <path d="M19 44a13 13 0 0 1 26 0Z" fill="#faf8f2" />
              <line x1="12" y1="48.5" x2="52" y2="48.5" stroke="#faf8f2" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
            <span className="font-display text-lg tracking-tight text-ink">
              Brightville Hope School
            </span>
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pine">
            Student portal
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
            Welcome back.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-soft">
            Sign in with the credentials your advisor gave you.
          </p>
          <div className="mt-9">
            <LoginForm />
          </div>
          <p className="mt-10 text-center text-xs text-faint">
            <Link href="/" className="underline decoration-line underline-offset-4 transition-colors hover:text-pine">
              ← Back to the public site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
