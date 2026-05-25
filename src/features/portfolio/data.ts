/**
 * Static content for the portfolio. Single source of truth — both the
 * one-page site (`/`) and the print route (`/print`) read from here.
 */

export const HERO = {
  eyebrow: "Frontend developer · Metro Manila · Open to remote",
  // Each word becomes a span; accent words get the dawn-blue highlight.
  titleWords: [
    { text: "Building", accent: false },
    { text: "with", accent: false },
    { text: "the", accent: false },
    { text: "sharpest", accent: true },
    { text: "tools", accent: true },
    { text: "today.", accent: false },
  ],
  sub: (
    "I'm Avel Panaligan — a frontend developer who stays on the current stack, not the " +
    "familiar one. React 19, Next.js, motion, strict TypeScript — chosen for what ships " +
    "in production now, and refreshed as the ecosystem moves."
  ),
  meta: [
    "Latest stack · Next.js · React · GSAP",
    "3+ years shipping production UI",
    "Real-time · fintech · mini programs",
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

export type EmploymentProject = {
  index: string;
  name: string;
  kicker: string;
  year?: string;
  hook: string;
  bullets: string[];
  chips: string[];
  accent?: "emerald" | "blue" | "stone";
};

export const EMPLOYMENT: EmploymentProject[] = [
  {
    index: "01 / 08",
    name: "OKFUN",
    kicker: "Casino Web · Real-time",
    year: "Technicare · 2024–2025",
    hook:
      "Web-based casino platform hosting slot machines, baccarat and similar games. Stable real-time gameplay and a polished, authentic casino UX across devices.",
    bullets: [
      "Designed and built the site from scratch with responsive, user-friendly UI.",
      "Integrated multiple third-party game APIs with dynamic, real-time data.",
      "Optimized for speed, responsiveness and accurate data presentation.",
      "Maintained promotional banners, game content and event-driven features.",
    ],
    chips: ["React", "Mini Program IDE", "WebSocket", "REST APIs"],
    accent: "emerald",
  },
  {
    index: "02 / 08",
    name: "Casino Plus",
    kicker: "Telegram Bot + Web",
    year: "SNSoft · 2025",
    hook:
      "Telegram bot integrated with a web app for onboarding, engagement, in-chat payments and a real-time admin dashboard.",
    bullets: [
      "Auto-login via Telegram Login Widget with secure token verification.",
      "Integrated Telegram's native payment API for in-app purchases.",
      "Built an admin dashboard for users, promotions, content and analytics.",
      "Ensured secure auth and seamless bot-to-web communication.",
    ],
    chips: ["Node.js", "Express", "Telegram Bot API", "MongoDB", "Webhooks"],
    accent: "blue",
  },
  {
    index: "03 / 08",
    name: "GCash Mini",
    kicker: "Mobile Gaming · GCash SDK",
    year: "Softify · 2024",
    hook:
      "Mobile-friendly gaming platform embedded in the GCash app. Coordinated directly with GCash partners to accelerate dev and resolve compliance issues.",
    bullets: [
      "Optimized state management and data integrity across components.",
      "Integrated the gaming experience inside GCash via WebView.",
      "Coordinated with GCash partners on integration and incident resolution.",
      "Maintained security credentials and compliance updates.",
    ],
    chips: ["React", "Mini Program IDE", "WebView", "GCash SDK"],
    accent: "stone",
  },
  {
    index: "04 / 08",
    name: "Casino Gaming Web",
    kicker: "Marketing · Landing pages",
    year: "Softify · 2023–2024",
    hook:
      "Casino gaming site with dynamic landing pages and platform-specific app download pages to support acquisition campaigns.",
    bullets: [
      "Implemented dynamic landing pages for marketing and acquisition.",
      "Built Android and iOS download pages with tailored UX.",
      "Managed deployment via PAGODA and AWS for stable releases.",
      "Set up analytics and user-behavior tracking to lift conversion.",
    ],
    chips: ["React", "AWS", "PAGODA", "Analytics SDKs"],
    accent: "emerald",
  },
  {
    index: "05 / 08",
    name: "Multi-Platform Mini Programs",
    kicker: "Lazada · Maya · GCash · Viber",
    year: "Softify · 2024",
    hook:
      "Built and maintained mini programs across Lazada, Maya and GCash using each platform's IDE — plus Viber apps for evolving services.",
    bullets: [
      "Built mini programs on Lazada, Maya and GCash with platform-specific tooling.",
      "Used WebView for unified hosted-content integration across mini apps.",
      "Maintained and updated Viber apps to support new services.",
    ],
    chips: ["Mini Program IDEs", "WebView", "JavaScript"],
    accent: "blue",
  },
  {
    index: "06 / 08",
    name: "Vue → React Migration",
    kicker: "Platform migration · SEO",
    year: "WBridges · 2022–2023",
    hook:
      "Migrated a full product codebase from Vue 2 and vanilla HTML to React for better performance and scalability. Built an SEO-optimized static site with Puppeteer.js.",
    bullets: [
      "Led migration of an entire frontend codebase from Vue 2 to React.",
      "Generated SEO-optimized static pages using Puppeteer.js.",
      "Performed manual frontend deploys to AWS S3 via Cyberduck across UAT.",
    ],
    chips: ["Vue 2", "React", "Puppeteer.js", "AWS S3", "Cyberduck"],
    accent: "emerald",
  },
  {
    index: "07 / 08",
    name: "Malmö Maids",
    kicker: "Reservation · WordPress",
    year: "Freelance · 2023",
    hook:
      "Responsive WordPress site for a Swedish cleaning services brand. Online booking, scheduling and multilingual support with brand-consistent theming.",
    bullets: [
      "Built a custom online booking system with service selection and scheduling.",
      "Customized themes and plugins to match brand identity and UX.",
      "Added Swedish + English multilingual support.",
      "Configured SEO tools for strong local search visibility.",
    ],
    chips: ["WordPress", "Elementor", "GoHighLevel", "WooCommerce"],
    accent: "stone",
  },
  {
    index: "08 / 08",
    name: "ExpressPay",
    kicker: "Enterprise · Payments",
    year: "ExpressPay · 2021–2022",
    hook:
      "Maintained and extended the legacy system used across all ExpressPay branches. Monthly archiving, security updates and digital payment integrations.",
    bullets: [
      "Maintained core services powering branch-level transactions nationwide.",
      "Integrated PayMaya and GCash to extend digital payment coverage.",
      "Performed monthly data archiving for system efficiency and compliance.",
      "Implemented routine maintenance and security updates.",
    ],
    chips: ["PHP", "SQL", "PayMaya API", "GCash API"],
    accent: "blue",
  },
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
