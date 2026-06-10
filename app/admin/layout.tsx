import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Student Portal — Brightville Hope School",
    template: "%s — Brightville Portal",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-dvh bg-[#f4f4f0]">{children}</div>;
}
