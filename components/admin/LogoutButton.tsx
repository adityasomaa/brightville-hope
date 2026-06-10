"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-soft transition-colors hover:border-pine hover:text-pine disabled:opacity-60"
    >
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M12.5 6.5v-2a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2M8 10h9.5M15 7.5 17.5 10 15 12.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
