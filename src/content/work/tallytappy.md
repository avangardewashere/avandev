# TallyTappy — A Mobile-First Tally Tracker

> A clean, focused, no-friction counter for everyday things you want to count again and again — water glasses, pushups, pages read, days without sugar.

| | |
|---|---|
| **Status** | v1.0.0 — shipped |
| **Type** | Personal project · solo build |
| **Repo location** | `C:\Users\USER\Documents\BrandNew\TallyTappy` |
| **Remote** | `git@github.com:avangardewashere/TallyTappy.git` |
| **Codename in docs** | "TallyTracker" (the design docs) / "TallyTappy" (the shipped product name) — same thing. |
| **One-liner** | Splash → guest login → list → tap `+` to count → done. Five screens, full CRUD, fully offline, ships under 2 KB of state. |

---

## 1. Why this project

Existing tally apps fail in two opposite directions. **Habit-tracking platforms** (Streaks, Habitify) bury "increment a counter" under streak math, social features, and chart screens. **Single-counter apps** are too primitive — they count one thing and that's it. I wanted the middle: clean, fast, focused on the act of *incrementing*, with enough categorisation to make a list of counters feel like a workspace instead of a junk drawer.

I also needed a baseline project to lock in the **architecture I'd reuse** for everything after this. That meant picking a small enough scope that I couldn't hide behind feature work — every part of the codebase had to defend its existence on structural grounds, not "well, the feature needed it." TallyTappy became the foundation that **Jar of Emotions** (which added GSAP) and **Plan.it** (which added dnd-kit) were built on top of.

---

## 2. The scope I shipped (v1)

A deliberately tight v1 so it could ship instead of sprawling.

- **Five screens, four routes.**
  - `/` — Splash. 1.5 s minimum hold so it never feels like a flicker.
  - `/login` — Guest-only entry. One button. Sets a flag in localStorage and redirects.
  - `/tallies` — The main workspace. Cards for each tally with inline `+` / `−` counters and a kebab menu.
  - `/tallies/new` and `/tallies/[id]/edit` — Same form component for both create and edit modes.
- **Tally cards** with inline counters. Tap `+` and `−` — never a deeper tap path.
- **5 preset categories** with colour-coded badges: Health, Fitness, Habits, Work, Other.
- **Validated form** for create + edit (name, description, category, starting count) — same component, two modes.
- **Delete with confirmation** — both from the list (kebab menu on each card) and from the edit form.
- **Empty state** — friendly copy + CTA when the list is bare.
- **Local persistence** — survives refreshes, works fully offline.

### Deliberately deferred to v2

Real authentication, database, API routes, charts/streaks/analytics, history view, profile, multi-device sync, notifications, export, archive flows. v1 is local-only on purpose — the repository pattern (more on that in §4) makes adding any of these a localised change.

---

## 3. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | App Router for clean separation of server / client boundaries from the start. |
| UI runtime | **React 19** + TypeScript strict | Strict TS catches the "I forgot to update the union" class of bugs at compile time. |
| Styling | **Tailwind CSS 4** with `@theme inline` tokens | Tokens are the seam between design and code. Adding a new colour is one line. |
| State | **Zustand** | No provider tree, no Context overhead, minimal boilerplate. Two slices (`tally-store`, `session-store`). |
| Forms | **React Hook Form** + **Zod** + `@hookform/resolvers` | Zod schema is documentation *and* runtime validation. The same schema also defends the repository against corrupted localStorage on read. |
| Persistence | **`localStorage`**, wrapped in a `TallyRepository` interface | Lets me swap `localStorage` for a fetch adapter without touching the store or any view. |
| Fonts | **Manrope** (headlines) + **Work Sans** (body), self-hosted via `next/font/google` | Two-typeface system: punchy display headlines vs. quiet body copy. Zero CLS. |
| Icons | Material Symbols Outlined, **FILL 0** (outlined) | Outlined icons match the calm, low-noise aesthetic — Plan.it later went the opposite way (FILL 1). |
| Tooling | ESLint 9, Turbopack, npm | Standard. |

There is **no "featured new tech"** in TallyTappy. That was deliberate: I wanted to learn the *pattern*, not a library. The new-tech experiments came in the follow-up projects.

---

## 4. Architecture — MVVM with a swappable repository

```
Page (Server Component)
  ↓
View (Client Component, pure presentation)
  ↓
ViewModel (use[Screen]ViewModel custom hook)
  ↓
Zustand Store
  ↓
Repository (TypeScript interface)
  ↓
localStorage adapter (v1)   ← swap for fetch() in v2
```

### The discipline (and why it matters)

These are the four rules that the entire codebase obeys, with no exceptions:

1. **Pages are thin.** Each route file under `src/app/` is little more than `const vm = useFooViewModel(); return <FooView {...vm} />;`. The Server-Component → Client-Component boundary lives at the `<FooView />` boundary.
2. **Views are pure presentation.** No `useRouter`, no store imports, no `useEffect` for data. Given props, they render deterministically. That means I can mount `TallyListView` in a story or a test with hand-written props without mocking `next/navigation` or `zustand`.
3. **ViewModels own all side effects.** `useTallyListViewModel`, `useTallyFormViewModel`, `useLoginViewModel`, `useSplashViewModel` — every router call, every `hydrate()`, every dialog state machine lives here.
4. **The repository is a TypeScript `interface`.** The store imports `TallyRepository`, not the concrete adapter. When v2 swaps in Supabase, I write **one new file** that implements the interface, change one import in the store, and every other file is untouched.

### Two stores, not one

Most of the app reads from `useTallyStore` (the `Tally[]` list, plus actions like `create`, `update`, `increment`, `decrement`, `remove`). Splash and login read from `useSessionStore` (just `isAuthenticated` and `loginAsGuest`). Splitting them keeps each slice tiny and re-renders narrow — when a tally is incremented, the splash and login layer don't see a state change.

### Defensive parsing on read

The repository doesn't trust localStorage. On every `list()` call, every entry is run through `tallySchema.safeParse()` and any item that fails is silently dropped:

```ts
function parseTallies(): Tally[] {
  return readRawItems()
    .map((item) => tallySchema.safeParse(item))
    .filter((r) => r.success)
    .map((r) => r.data);
}
```

This is a small detail with a big payoff: if a future schema change leaves stale shapes in old browsers, the app still loads with the valid items and ignores the broken ones — no white screen, no console error.

---

## 5. The data model

```ts
// constants.ts — single source of truth
export const TALLY_CATEGORIES = [
  "health", "fitness", "habits", "work", "other",
] as const;

export const MAX_NAME_LEN        = 48;
export const MAX_DESCRIPTION_LEN = 120;
export const MIN_COUNT           = 0;
export const MAX_COUNT           = 9999;
export const MIN_SPLASH_MS       = 1500;

export const STORAGE_KEYS = {
  TALLIES: "tallytracker:tallies",
  SESSION: "tallytracker:session",
} as const;

// types.ts — derived from the constant
export type TallyCategory = (typeof TALLY_CATEGORIES)[number];

export type Tally = {
  id: string;
  name: string;
  description?: string;
  category: TallyCategory;
  count: number;
  createdAt: string;   // ISO 8601
  updatedAt: string;   // ISO 8601
};

export type TallyInput = Omit<Tally, "id" | "createdAt" | "updatedAt">;
```

The Zod schema enforces the same constraints at runtime:

- `name` 1–48 chars (trimmed)
- `description` ≤ 120 chars, optional
- `category` is one of the five preset kinds
- `count` integer in `[0, 9999]`

The schema feeds React Hook Form's resolver *and* the repository's defensive parse — same rules in both places.

---

## 6. The interesting bits — three problems and their solutions

### Problem 1: How do you keep "tap +" from feeling laggy?

`+` and `−` are the **primary action** of the entire app. If they take more than one tick to feel responsive, the app is broken in spirit even if it works on paper.

**The fix:** the `increment(id)` and `decrement(id)` actions live on `useTallyStore` and update the in-memory state synchronously *before* the localStorage write. Zustand emits, the View re-renders with the new count, and the localStorage write happens after — invisibly. No optimistic-UI library needed; just a careful ordering of the two writes.

### Problem 2: Splash screens that flicker are worse than no splash at all

The splash route's job is to bridge "the user just opened the app" to "the user is on the tallies list" without it ever feeling like a flicker. Two failure modes:

- **Too short:** the user sees a flash of the brand mark and then a route change. Janky.
- **Too long:** the user is stuck on a non-functional screen.

**The fix:** `MIN_SPLASH_MS = 1500` enforces a floor. The splash ViewModel:

1. Triggers `useSessionStore.hydrate()` immediately on mount.
2. Records the mount timestamp.
3. When hydration finishes, computes `elapsed = now - mountedAt` and waits `Math.max(0, 1500 - elapsed)` before redirecting.

Net effect: if hydration is instant (it usually is), the user gets the full 1.5 s; if it ever took longer (it never does), the splash holds until the data is ready and *then* redirects. The user perceives a smooth, deliberate handoff.

### Problem 3: One form, two modes, no duplication

`/tallies/new` and `/tallies/[id]/edit` are visually almost identical — same fields, same layout, same validation. The temptation is to copy-paste the form into both routes and make small tweaks. **That's a maintenance trap.**

**The fix:** one component (`TallyFormView`) and one ViewModel (`useTallyFormViewModel(id?: string)`) for both. The ViewModel takes an optional `id`:

- If `id` is `undefined` → create mode. `defaultValues` is empty, submit calls `store.create()`.
- If `id` is a string → edit mode. The VM loads that tally, calls `form.reset()` once with the loaded values, and submit calls `store.update(id, patch)`.
- If `id` is a string but the tally doesn't exist (deleted in another tab) → redirect to `/tallies` rather than render an empty form.

The two route files (`tallies/new/page.tsx` and `tallies/[id]/edit/page.tsx`) are each ~5 lines. They differ only in whether they pass an `id` to the VM.

---

## 7. Development process — 9 phases, 30+ tasks

Phases stack like blocks; each one only depends on what's already merged to `main`. Every task got its own short-lived branch, squash-merged to main with a conventional commit message.

| Phase | Theme | Output |
|---|---|---|
| **A** — Foundation | Scaffold, deps, design tokens, fonts, lib utilities, folder skeleton | 6 chore commits |
| **B** — Domain | Tally + Session types, Zod schemas, repositories, Zustand stores | 6 feat commits |
| **C** — UI primitives | 11 generic components: Button, IconButton, Card, Badge, Input/TextArea, SegmentedControl, Counter, FAB, TopAppBar, BottomNav, Dialog | 1 squashed feat commit |
| **D** — Splash | `app/page.tsx`, `SplashView`, `useSplashViewModel` with min-hold logic | 1 feat commit |
| **E** — Login | `app/login/page.tsx`, `LoginView`, `useLoginViewModel`, session wiring | 1 feat commit |
| **F** — Tally List | `TallyListView`, `useTallyListViewModel`, `TallyCard`, `EmptyState`, `TallyHeader`, FAB → `/tallies/new` | bundled in v1.0 commit |
| **G** — Tally Form | One form, two modes (create + edit), RHF + Zod, sticky actions, loading gate | bundled |
| **H** — Delete Flow | `DeleteConfirmDialog`, kebab on `TallyCard`, delete also exposed in edit form | bundled |
| **I** — Polish + Release | Lint clean, Lighthouse pass, README, manual mobile QA, `git tag v1.0.0` | 1 release commit |

The commit log on `main` reads like a guided tour of how the app was assembled — about 20 squash-merged commits, conventional prefixes (`chore:`, `feat(tallies):`, `feat(splash):`, `feat(login):`, `docs:`).

---

## 8. Folder structure

```
TallyTappy/
├── documentation/                 # Planning + design docs (committed)
│   ├── design-reference/
│   ├── guidelines/
│   ├── plan/
│   │   ├── 01-overview.md
│   │   ├── 02-scope-v1.md
│   │   ├── 03-architecture.md
│   │   ├── 04-component-model.md
│   │   ├── 05-implementation-plan.md
│   │   └── execution/             # phase-a.md … phase-i.md
│   └── trackers/
│       ├── feature-tracker.md     # the green-check progress board
│       └── decision-log.md
├── src/
│   ├── app/                       # Next.js routes
│   │   ├── layout.tsx             # Manrope + Work Sans + Material Symbols
│   │   ├── page.tsx               # /        Splash
│   │   ├── login/page.tsx         # /login
│   │   └── tallies/
│   │       ├── layout.tsx         # BottomNav once for /tallies/*
│   │       ├── page.tsx           # /tallies
│   │       ├── new/page.tsx       # /tallies/new
│   │       └── [id]/edit/page.tsx # /tallies/:id/edit
│   ├── components/                # 11 generic UI primitives
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── SegmentedControl.tsx
│   │   ├── Counter.tsx
│   │   ├── FAB.tsx
│   │   ├── BottomNav.tsx
│   │   └── Dialog.tsx
│   ├── features/
│   │   ├── tallies/               # The main domain
│   │   │   ├── components/        # CategoryBadge, DeleteConfirmDialog,
│   │   │   │                      #   EmptyState, TallyCard,
│   │   │   │                      #   TallyFormFields, TallyHeader
│   │   │   ├── views/             # TallyListView, TallyFormView
│   │   │   ├── viewmodels/        # useTallyListViewModel, useTallyFormViewModel
│   │   │   ├── repository.ts      # TallyRepository interface + adapter
│   │   │   ├── schema.ts          # tallySchema (Zod)
│   │   │   └── types.ts
│   │   └── session/
│   │       ├── views/             # SplashView, LoginView
│   │       ├── viewmodels/        # useSplashViewModel, useLoginViewModel
│   │       ├── repository.ts
│   │       ├── schema.ts
│   │       └── types.ts
│   ├── store/
│   │   ├── tally-store.ts         # Zustand: tallies + actions
│   │   └── session-store.ts       # Zustand: auth flag + login/logout
│   └── lib/
│       ├── cn.ts                  # clsx wrapper
│       ├── id.ts                  # crypto.randomUUID() with fallback
│       └── constants.ts           # all magic numbers in one place
├── README.md
├── AGENTS.md
├── CLAUDE.md
├── next.config.ts                 # turbopack.root pinned
└── package.json
```

---

## 9. Design language

- **Quiet, organic palette.** Emerald (`#1d6b4a`) as the primary, deep forest (`#005235`) for actions, sage (`#88baa0`) as the supporting accent, ivory (`#faf8f3`) and sand (`#f0ebe0`) for surfaces. Reads "calm productivity," not "high-contrast SaaS." Each category has its own accent token (primary-fixed for health, secondary for fitness, tertiary for habits, etc.).
- **Two-typeface system.** Manrope (weights 400–800) for headlines, Work Sans (400–600) for body. Both self-hosted via `next/font/google` for zero CLS. The `--font-headline` and `--font-body` CSS variables drive a custom `.font-headline` utility — body text inherits from `<html class="font-sans">`.
- **Outlined icons.** Material Symbols Outlined with `FILL 0`, weight 500. Calm, line-art feel. Plan.it later picked the opposite (`FILL 1`) for its bolder identity.
- **Mobile-first.** Designed for one-thumb use on a phone. The increment / decrement targets are oversized; the FAB sits in the natural thumb arc; the BottomNav exists but only shows the active tab in v1 because there's only one workspace. Desktop is a bonus, not the design target.
- **No friction on the primary action.** A tally count update is one tap. Editing is two (kebab → Edit). Deleting is three (kebab → Delete → Confirm) — confirmed because deletion is irreversible.

---

## 10. What I learned

### About the architecture

- **Putting the repository behind a TypeScript `interface` is the single highest-leverage decision in the codebase.** Every consumer imports the type, never the concrete adapter. Swapping localStorage for a real backend in v2 is a one-file change with zero ripples.
- **Pure-presentation Views aren't ceremony.** They're the difference between *"I can mount this with hand-written props"* and *"I have to mock zustand and next/router to render anything."* Stories, screenshots, future tests — all easier.
- **One form for create + edit beats two near-identical forms** every time. The `id?` parameter is the only branch — everything else (validation, layout, submission) is shared.
- **Defensive parsing on read** (`schema.safeParse()` over every localStorage entry) is cheap insurance against schema drift across versions.

### About React 19 + Next 16

- The Server Component → Client Component boundary is best drawn at the View level — pages stay server-side, views become `'use client'`. ViewModels can then use `useState`, `useEffect`, `useRouter` freely without polluting the page file.
- `next/font` with two custom fonts is just two imports and two CSS variables on `<html>` — far less ceremony than the `<link>`-based approach, and it eliminates CLS.
- Material Symbols isn't in `next/font/google`'s catalogue, so it stays on a `<link>` with a targeted `eslint-disable` for `@next/next/no-page-custom-font` (a Pages-Router rule that misfires for App-Router `<head>` icon fonts).

### About scope

- **Saying no to v2 features in v1** is what made v1 feel solid. No streaks, no charts, no history, no archive — every one of those was tempting and every one would have stretched the timeline by weeks. The repository pattern makes them additive, not blocking.
- **Documentation as scaffolding, not as an afterthought.** I wrote `01-overview.md` through `05-implementation-plan.md` *before* any code — they served as my own design brief and as the source for per-phase execution plans (`phase-a.md` through `phase-i.md`). When I picked up the project across days, the docs told me where I was.

---

## 11. Verification (at v1.0.0)

| Check | Result |
|---|---|
| `npm run lint` | ✓ clean |
| `npm run build` | ✓ clean |
| `npm run dev` | ✓ Ready in ~1 s |
| Lighthouse (mobile, prod build) | Performance 90+, Accessibility 90+, Best Practices 90+ |
| Manual iOS Safari QA | ✓ |
| Manual Chrome Android QA | ✓ |
| End-to-end CRUD | ✓ Splash → Login → List → Create → Increment → Edit → Delete |
| `git tag v1.0.0` | ✓ Annotated, with changelog |

---

## 12. v2 backlog (in priority order)

1. **Real authentication** (email/password or OAuth via Auth.js) and a real backend. The repository pattern is what makes this a localised swap rather than a rewrite — write `apiTallyRepository`, change one import.
2. **History / per-day breakdown** — show how a tally's count changed over time.
3. **Streaks and analytics** — opt-in, surfaced behind a tab.
4. **Multi-device sync** — once there's a real backend, sync is mostly free.
5. **Archive flow** — soft-delete instead of hard-delete; a "show archived" toggle.
6. **Notifications / reminders** — "you haven't logged today's water in a while".
7. **Export** (CSV, JSON) — for users who want to take their data elsewhere.
8. **Profile / settings screen** — customise category colours, units, reset cadence.

---

## 13. Quick facts (for the portfolio sidebar)

- **20 commits** on `main`, all squash-merged from short-lived branches.
- **9 phases** (A through I), **30+ tasks**, every one tracked in `documentation/trackers/feature-tracker.md`.
- **43 TS / TSX files**, **~1,880 lines** of source.
- **5 routes**, **2 Zustand stores**, **11 generic UI primitives**, **6 feature-scoped components**.
- **0** ESLint warnings, **0** type errors at v1.0.0.
- **1** repository interface ready for the v2 backend.
- **The pattern** that became the spine of two follow-up projects (Jar of Emotions and Plan.it).

---

## 14. Running it locally

```bash
git clone git@github.com:avangardewashere/TallyTappy.git
cd TallyTappy
npm install
npm run dev          # → http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

---

> *TallyTappy is small on purpose. It's a counter app — the only thing it does is help you count. The interesting work isn't visible in the product surface; it's in the structure underneath. The Splash → Login → List → Form pattern, the MVVM discipline, the swappable repository, the two-store split, the one-form-two-modes trick — those are the reusable parts. Everything I built after this leans on what got proved here.*
