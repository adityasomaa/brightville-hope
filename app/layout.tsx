import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Brightville Hope School — PreK–12 Independent School in Chicago",
    template: "%s — Brightville Hope School",
  },
  description:
    "Brightville Hope School is an independent PreK–12 school in Lincoln Park, Chicago. Bright minds, boundless hope — new flagship campus opening Fall 2027.",
};

export const viewport: Viewport = {
  themeColor: "#0c2b21",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
