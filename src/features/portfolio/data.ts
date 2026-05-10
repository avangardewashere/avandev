/**
 * Static content for the portfolio. Single source of truth — both the
 * one-page site (`/`) and the print route (`/print`) read from here.
 */

export const HERO = {
  eyebrow: "Frontend engineer · Metro Manila · Open to remote",
  // Each word becomes a span; accent words get the dawn-blue highlight.
  titleWords: [
    { text: "Software,", accent: false },
    { text: "built", accent: false },
    { text: "for", accent: false },
    { text: "the", accent: false },
    { text: "long", accent: true },
    { text: "arc.", accent: true },
  ],
  sub: (
    "I'm Avel Panaligan — three years shipping React, Next.js and Vue across " +
    "fintech, real-time gaming, and multi-platform mini programs. Quiet engineering " +
    "on products that have to work in production from day one."
  ),
  meta: [
    "3+ years frontend",
    "5 platforms shipped",
    "WebSocket · Next.js · React · Vue",
    "Currently at Technicare",
  ],
  clientStrip: "TECHNICARE · SNSOFT · SOFTIFY · WBRIDGES · EXPRESSPAY",
};

export const ABOUT = {
  lede: (
    "I build software the way furniture is built — slowly, with the joints visible. " +
    "Most of my work is web interfaces. Some of it is taking three tries to get there."
  ),
  body: [
    "For the last three years I've shipped real-time, money-touching products inside teams small enough that every line ends up in production. WebSocket lottery games, Telegram payment bots, GCash mini programs, a Vue-to-React migration I led end-to-end — the common thread is interfaces that have to hold up the first time, not the third.",
    "Outside of client work I keep a small bench of personal projects to lock in the patterns I want to keep using — MVVM with swappable repositories, strict TypeScript, and one new piece of tech per build. The two below are part of that bench.",
  ],
  current:
    "Frontend engineer at Technicare Software Inc. — open to select remote work.",
};

export type Stat = {
  count: number;
  suffix?: string;
  label: string;
  accent?: boolean;
};

export const STATS: Stat[] = [
  { count: 3, suffix: "+", label: "Years shipping\nfrontend in production" },
  { count: 5, label: "Platforms shipped to\nWeb · GCash · Maya · Lazada · Telegram", accent: true },
  { count: 8, suffix: "+", label: "Versioned releases\nled or contributed to" },
  { count: 100, suffix: "+", label: "Production bugs\ntriaged & resolved" },
];

export type SkillRow = {
  title: string;
  small: string;
  pills: { label: string; accent?: boolean }[];
};

export const SKILLS: SkillRow[] = [
  {
    title: "Building interfaces",
    small: "UI · framework",
    pills: [
      { label: "React", accent: true },
      { label: "Next.js", accent: true },
      { label: "Vue 2 / 3" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "React Hook Form" },
      { label: "Zustand" },
      { label: "Zod" },
    ],
  },
  {
    title: "Real-time & integrations",
    small: "the specialty",
    pills: [
      { label: "WebSocket", accent: true },
      { label: "tRPC" },
      { label: "REST APIs" },
      { label: "Telegram Bot API" },
      { label: "TencentChatCloud" },
      { label: "GCash mini-program SDK" },
      { label: "@dnd-kit" },
    ],
  },
  {
    title: "Platform & deployment",
    small: "shipping it",
    pills: [
      { label: "AWS S3" },
      { label: "Docker" },
      { label: "Git" },
      { label: "Vercel" },
      { label: "Cyberduck" },
      { label: "Turbopack" },
    ],
  },
  {
    title: "Design & cross-functional",
    small: "handoff fluency",
    pills: [
      { label: "Figma" },
      { label: "Photoshop" },
      { label: "Canva" },
      { label: "Material 3 tokens" },
      { label: "Motion / GSAP" },
    ],
  },
  {
    title: "Domains shipped in",
    small: "not just tools — context",
    pills: [
      { label: "Fintech", accent: true },
      { label: "Real-time gaming", accent: true },
      { label: "E-commerce" },
      { label: "Mini programs" },
      { label: "Internal tools" },
    ],
  },
];

export type TimelineStop = {
  year: string;
  company: string;
  role: string;
  isNow?: boolean;
};

export const TIMELINE: TimelineStop[] = [
  { year: "2019", company: "Gleen", role: "Junior frontend — first React stack, first taste of production." },
  { year: "2021", company: "ExpressPay", role: "Frontend dev — payments dashboards and internal tooling." },
  { year: "2022", company: "WBridges", role: "Frontend on cross-platform dashboards. Vue → React groundwork." },
  { year: "2024", company: "Softify", role: "GCash mini-program gaming platform — first multi-platform ship." },
  { year: "2025", company: "SNSoft", role: "Telegram payment bot + admin console. Bots-as-product." },
  { year: "Now", company: "Technicare", role: "Chat monitoring platform built from scratch. Used by ops daily.", isNow: true },
];

export const CONTACT = {
  email: "avel.panaligan@gmail.com",
  github: "https://github.com/avangardewashere",
  githubLabel: "github.com/avangardewashere",
  linkedin: "#",
  linkedinLabel: "linkedin.com/in/avel-panaligan",
  headline:
    "Got a real-time product, payment integration, or migration that needs a frontend specialist?",
};
