import type { Metadata } from "next";
import { Geist, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display, body, and mono fonts. The CSS variables they expose
// (`--font-display`, `--font-body`, `--font-mono`) are referenced
// directly by globals.css — overriding the placeholder family
// declarations in the ported design tokens.
const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avel Panaligan — Frontend Engineer",
  description:
    "Frontend engineer building real-time, production-grade interfaces. React, Next.js, Vue across fintech, real-time gaming, and multi-platform mini programs.",
  metadataBase: new URL("https://avelpanaligan.dev"),
  openGraph: {
    title: "Avel Panaligan — Frontend Engineer",
    description:
      "Real-time, payment-adjacent, multi-platform frontend work. React, Next.js, Vue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
