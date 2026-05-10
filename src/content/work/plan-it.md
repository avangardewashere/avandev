<p align="center">
  <img src="plan-it/public/plan-it-icon.png" alt="Plan.it app icon — a sky-blue planet with a ring on a deep blue rounded-square background, with the wordmark 'Plan.it' below" width="200" />
</p>

# Plan.it — Time Blocking Calendar

> A weekly time-blocking calendar. Drop blocks onto a 15-minute grid and let your day fall into place.

| | |
|---|---|
| **Status** | v1.0.0 — shipped |
| **Type** | Personal project · solo build |
| **Repo location** | `C:\Users\USER\Documents\BrandNew\plan-it` |
| **Brand mark** | A sky-blue planet wrapped in a swooshing ring on a deep-blue rounded-square — a literal "plan-it" / "planet" pun. Wired into the app via Next 16's `icon.png` / `apple-icon.png` / `opengraph-image.png` file conventions (auto-generated favicon, iOS home-screen icon, and social-share preview). |
| **One-liner** | A focused, mobile-first week view where time is the canvas and blocks are the brush — drag to reschedule, tap to edit, persists locally with no account required. |

---

## 1. Why this project

I'd already built **TallyTappy** (a tap-counter) and **Jar of Emotions** (a feelings journal). Both are small, single-screen apps that taught the MVVM + repository discipline I want to keep using. For the next step I wanted something with a meaningfully bigger UI surface, and a piece of new tech I hadn't worked with before.

Time-blocking has been on my mind because I've been trying it manually in Notion. The interaction begs for direct manipulation: you should be able to grab a block and slide it to a different time. That requirement immediately points at **drag-and-drop**, which is exactly the kind of thing I'd never wired up properly in React before.

So the project's two goals were:

1. Ship something I'd actually use — a clean week-view time blocker.
2. Learn `@dnd-kit` end-to-end — touch, keyboard, accessible drop targets, the works.

---

## 2. The scope I shipped (v1)

A deliberately tight v1 so it could ship instead of stalling.

- **One screen.** Mon–Sun week view, 5 am to 9 pm, 15-minute slots.
- **Create.** Tap an empty slot or the floating "+" button → slide-up sheet pre-fills the day and start time.
- **Edit / delete.** Tap an existing block → same sheet, mode switches to edit, with a destructive Delete in the bottom-left.
- **Drag to reschedule.** Pick up a block, drop it on any other day or time. Snaps to the 15-minute grid. Persists.
- **6 preset categories** with M3 colours: Deep Work, Meeting, Break, Errand, Personal, Other.
- **Local persistence.** Repository pattern wraps `localStorage` so swapping in a backend later is a single-file change.
- **Keyboard navigation.** Tab to a chip, Space to grab, arrow keys to move, Space to drop — courtesy of dnd-kit's KeyboardSensor.
- **Mobile-first.** Touch-drag works, FAB respects iOS safe-area inset, viewport meta uses `cover`.

### Deliberately deferred to v2

- Recurring blocks (RRule-style)
- Drag-to-resize duration (v1 sets duration in the form)
- Day view / Day-Week toggle
- User-defined categories
- Cloud sync, notifications, templates, analytics

---

## 3. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | Same as my prior projects — App Router for clean separation of server / client boundaries. |
| UI runtime | **React 19** + TypeScript strict | Strict TS catches the entire class of "I forgot to update the union" bugs. |
| Styling | **Tailwind CSS 4** with `@theme inline` tokens | Tokens are the seam between design and code. Adding a new colour is one line. |
| State | **Zustand** | Tiny, no provider tree, plays nicely with `isHydrated` SSR guards. |
| Forms | **React Hook Form** + **Zod** + `@hookform/resolvers` | The Zod schema is documentation *and* runtime validation. |
| **Drag & drop** ⭐ | **`@dnd-kit/core`** + `@dnd-kit/utilities` | The new tech for this project. Modular, accessible, touch + keyboard out of the box. |
| Date math | **date-fns** | Tree-shakable; only the helpers I use ship. |
| Persistence | **`localStorage`**, wrapped in a `BlocksRepository` interface | Lets me swap to Supabase or a fetch adapter without touching the store or any view. |
| Fonts | **Plus Jakarta Sans** (self-hosted via `next/font/google`) + Material Symbols Outlined (FILL 1) | One typeface for everything. Filled icons by default to match the design. |
| Tooling | ESLint 9, Turbopack, npm | Standard. |

### Why dnd-kit specifically

I considered four options before picking dnd-kit:

| Option | Why I passed |
|---|---|
| `react-dnd` | Older API, HTML5 backend has known mobile issues. |
| Native HTML5 drag | No touch support, no keyboard, fragile across browsers. |
| Framer Motion's `drag` prop | Declarative, but no drop-zone semantics — I'd be reinventing collision detection. |
| **`@dnd-kit`** | Modular (only import what I use), accessible (KeyboardSensor + ARIA out of the box), touch-first PointerSensor with activation constraints, and the `closestCenter` collision detector mapped cleanly to my "7 day-column droppables" layout. |

---

## 4. Architecture — MVVM with a swappable repository

```
            ┌─────────────────────────────────────┐
            │        app/page.tsx (thin)          │  ≤ 30 lines
            │   - DndContext + sensors            │
            │   - Wires VM → View + FormSheet     │
            └─────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                                            │
        ▼                                            ▼
┌──────────────────────┐               ┌──────────────────────┐
│   useWeekViewModel   │               │useBlockFormViewModel │
│  - hydrate()         │               │ - derives defaults   │
│  - weekOffset state  │               │ - onSubmit / onDelete│
│  - formState union   │               │   that calls store   │
│  - handleDragEnd     │               └──────────────────────┘
└──────────────────────┘                          │
        │                                          │
        └──────────────────────┬──────────────────┘
                               ▼
                   ┌───────────────────────┐
                   │   useBlocksStore      │  Zustand
                   │  - blocks[]           │
                   │  - isHydrated         │
                   │  - add / update / rm  │
                   └───────────────────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │  BlocksRepository     │  interface
                   │  add / list / update  │
                   │     remove / clear    │
                   └───────────────────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │ localStorage adapter  │  v1 implementation
                   └───────────────────────┘
```

### The discipline (and why it matters)

- **Pages are thin.** `app/page.tsx` is around 30 lines — it just calls the VM and lays out `DndContext` + `WeekView` + `BlockFormSheet`.
- **Views are pure presentation.** `WeekView.tsx` has no `useRouter`, no store imports, no `useEffect` for data. Given props, it renders deterministically. That means I can mount it in a Storybook story with hand-written props without mocking anything.
- **ViewModels own all side effects.** Hydration, navigation, dnd handling, form state — all live in the VMs.
- **The repository is an `interface`.** The store imports `BlocksRepository`, not the localStorage adapter. When v2 adds Supabase, I write one new file (`supabaseBlocksRepository`) that implements the interface, swap the import in the store, and every other file is untouched.

### The dnd-kit barrel

Every `@dnd-kit/*` import in the codebase comes through `src/lib/dnd.ts`:

```ts
'use client';
export { DndContext, DragOverlay, PointerSensor, KeyboardSensor,
         closestCenter, useDraggable, useDroppable, useSensor, useSensors,
         type DragEndEvent } from '@dnd-kit/core';
export { CSS } from '@dnd-kit/utilities';
```

Why? Three reasons:

1. **One seam to swap libraries.** If I ever migrate, I touch one file.
2. **The `'use client'` directive lives in one place.** dnd-kit needs browser pointer APIs; without `'use client'` it explodes during SSR. Putting it on the barrel forces every consumer to inherit the boundary correctly.
3. **Discoverable surface.** No more wondering "wait, does `useDraggable` come from `core` or `sortable`?"

Verified at the end of the project: only **2** `@dnd-kit/*` import statements in the entire `src/` tree, both inside `lib/dnd.ts`.

---

## 5. The data model

A single domain type, tight constraints, derived everything possible from constants.

```ts
// constants.ts — single source of truth
export const BLOCK_CATEGORIES = [
  'deep-work', 'meeting', 'break', 'errand', 'personal', 'other',
] as const;

export const WEEK_START_HOUR = 5;     // 5 am
export const WEEK_END_HOUR   = 21;    // 9 pm
export const SLOT_SIZE_MIN   = 15;    // smallest drag-snap unit
export const MAX_BLOCKS      = 500;   // safety prune cap
export const SLOT_HEIGHT_PX  = 14;    // pixel height of one 15-min row

// types.ts — the type is *derived* from the constant
export type BlockCategory = (typeof BLOCK_CATEGORIES)[number];

export type Block = {
  id: string;
  title: string;
  category: BlockCategory;
  notes?: string;
  dayIndex: number;        // 0 = Monday … 6 = Sunday
  startMin: number;        // minutes since 00:00, multiple of SLOT_SIZE_MIN
  durationMin: number;     // multiple of SLOT_SIZE_MIN
  createdAt: string;       // ISO 8601
};

export type BlockInput = Omit<Block, 'id' | 'createdAt'>;
```

### The Zod schema

The schema enforces every invariant the type can't:

- `title` 1–60 chars (trimmed)
- `dayIndex` 0–6
- `startMin` ≥ 5 am, `startMin + durationMin` ≤ 9 pm — caught with `.superRefine` so the error message is "Block runs past 9:00 — shorten or move earlier"
- `startMin` and `durationMin` are positive multiples of 15

The same schema feeds React Hook Form's resolver, so the form gets every check for free.

---

## 6. The interesting bits — three problems and their solutions

### Problem 1: Where do drops "land"?

**The naïve approach** would be one `useDroppable` per 15-min slot. That's 64 slots × 7 days = **448 droppables**. Each one runs collision math on every drag tick. dnd-kit handles it, but it's wasteful.

**The approach I took:** seven droppables — one per day column. Each carries `data: { dayIndex }`. In `handleDragEnd`:

```ts
const newStartPx =
  ((block.startMin - WEEK_START_HOUR * 60) / SLOT_SIZE_MIN) * SLOT_HEIGHT_PX
  + delta.y;
const newStartMin = snapToSlot(
  WEEK_START_HOUR * 60 + (newStartPx / SLOT_HEIGHT_PX) * SLOT_SIZE_MIN,
);
const newDayIndex = over.data.current.dayIndex;
```

`delta.y` is the pure vertical translation of the chip during the drag, regardless of which column it ended up in. Combined with the `over` column's `dayIndex`, it gives a complete rescheduling answer — and snaps to the 15-min grid via `snapToSlot()`.

### Problem 2: Tap-to-create vs. drag

If a `useDraggable` element fires drag on the very first pixel of pointer movement, then a tap meant to "open the editor" ends up registering as a drag of zero pixels.

**Fix:** `PointerSensor` with `activationConstraint: { distance: 6 }`. The chip won't enter drag mode until the pointer has moved 6 px from the press point. Below that threshold, the click handler runs cleanly.

### Problem 3: Form state across opens

The BlockFormSheet is mounted once in `app/page.tsx`. When the user closes it and re-opens it for a different block, RHF's `useForm()` defaults are captured at first mount — it doesn't pick up the new `defaultValues` automatically.

**Fix:** key the inner `<BlockForm>` on the formState identity:

```tsx
const formKey =
  formState.kind === 'edit'   ? `edit-${formState.block.id}` :
  formState.kind === 'create' ? `create-${formState.dayIndex}-${formState.startMin}` :
  'closed';

return <BlockForm key={formKey} defaultValues={vm.defaultValues} ... />;
```

When the key changes, React unmounts and remounts the form — RHF re-initialises with fresh defaults. Cheap, idiomatic, no `useEffect` chains.

---

## 7. Development process — 6 phases, 21 tasks

I planned it the same way I planned TallyTappy and Jar of Emotions: phases stack like blocks, each one only depending on what's already merged to `main`. Every task got its own short-lived branch, squash-merged with a conventional commit message.

| Phase | Theme | Tasks |
|---|---|---|
| **A** — Foundation | Scaffold, dependencies, design tokens, fonts, lib utilities | 5 |
| **B** — Domain | Types, Zod schema, repository, Zustand store | 3 |
| **C** — UI primitives | Button, Modal, TimeGrid, BlockChip | 4 |
| **D** — Week view + dnd | WeekGrid composite, WeekView, ViewModel + page wire | 3 |
| **E** — Form flow | BlockForm, form ViewModel, BlockFormSheet | 3 |
| **F** — Polish + release | Lint clean, mobile safe-area, README, `git tag v1.0.0` | 3 |

The commit log on `main` is a clean read of how the project was assembled — 21 squash-merged commits, no merge bubbles, conventional prefixes (`chore:`, `feat(domain):`, `feat(ui):`, `feat(blocks):`, `docs:`).

---

## 8. Folder structure

```
plan-it/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Plus Jakarta Sans, Material Symbols, viewport
│   │   ├── page.tsx                # ~30-line wiring
│   │   └── globals.css             # @theme inline tokens
│   ├── components/                 # Generic UI primitives
│   │   ├── Button.tsx              # 3 variants × 3 sizes, pill, type='button' default
│   │   ├── Modal.tsx               # Native <dialog> slide-up sheet
│   │   └── TimeGrid.tsx            # 7-col × 16-hr grid skeleton
│   ├── features/blocks/
│   │   ├── components/
│   │   │   ├── BlockChip.tsx       # useDraggable, category-coloured tile
│   │   │   ├── WeekGrid.tsx        # 7 useDroppable cols + chip layer
│   │   │   ├── BlockForm.tsx       # RHF + Zod
│   │   │   └── BlockFormSheet.tsx  # Modal wrapper
│   │   ├── views/
│   │   │   └── WeekView.tsx        # Pure presentation
│   │   ├── viewmodels/
│   │   │   ├── useWeekViewModel.ts
│   │   │   └── useBlockFormViewModel.ts
│   │   ├── types.ts
│   │   ├── schema.ts
│   │   └── repository.ts
│   ├── store/blocks-store.ts       # Zustand with isHydrated
│   └── lib/
│       ├── cn.ts                   # clsx wrapper
│       ├── id.ts                   # crypto.randomUUID() with fallback
│       ├── constants.ts            # all magic numbers in one place
│       ├── time.ts                 # date-fns helpers, snapToSlot
│       └── dnd.ts                  # 'use client' @dnd-kit barrel
├── README.md
├── next.config.ts                  # turbopack.root pinned
└── package.json
```

---

## 9. Design language

- **Brand mark.** A sky-blue planet wrapped in a swooshing ring, set on a deep-blue rounded-square iOS-style icon. Lives at `public/plan-it-icon.png` and is wired into the browser tab, iOS home screen, and Open Graph share-preview via Next 16's `app/icon.png`, `app/apple-icon.png`, and `app/opengraph-image.png` file conventions — no extra metadata config needed; Next reads the files and emits the right `<link>` and `<meta>` tags automatically.
- **Material 3 token palette.** Primary sky blue (`#176394`), secondary warm amber, tertiary gentle violet, error coral. Each maps semantically to a category — Deep Work uses primary, Meeting uses secondary, etc. The brand mark's planet sits squarely on the primary token, so the in-app `<h1>Plan.it</h1>` (with the dot rendered in `text-primary`) reads as a flatter, monochrome version of the same identity.
- **Single typeface.** Plus Jakarta Sans, weights 400 / 500 / 600 / 700 / 800. Self-hosted via `next/font/google` for zero CLS.
- **Filled icons.** Material Symbols Outlined with `FILL 1` set globally in `globals.css` — every icon in the app is filled by default, no per-element overrides.
- **Pill-shaped interactive elements.** Buttons, day chips, category chips — all radius-`full`. Reads playful, not corporate.
- **Glassmorphism only where it earns its place.** The week-nav header has `backdrop-blur-md` on a translucent surface so chips scrolling underneath stay readable. Everywhere else it's solid surfaces — clarity beats novelty.

---

## 10. What I learned

### About dnd-kit specifically

- `useDraggable` returns `attributes` and `listeners` — these go on the element you want to be the drag handle. Forgetting them silently makes the element undraggable, with no warning.
- `delta` in `DragEndEvent` is the cumulative vertical translation, not the final pointer position. That's the right primitive for "how much did this thing move", which is exactly what scheduling math needs.
- `PointerSensor` with `activationConstraint: { distance: N }` is essential for pages where elements are also clickable. Without it, every tap becomes an accidental zero-distance drag.
- The `KeyboardSensor` is genuinely free accessibility — Tab, Space, arrow keys, Space all just work. Zero extra code.

### About React 19 + the Compiler

- React Hook Form's `watch()` triggers a "compilation skipped" warning because the compiler can't memoize functions returned by external libs. Switching to `useWatch({ control, name })` fixes it — and is a better practice anyway because it scopes re-renders.
- `'use client'` boundaries are most ergonomic when placed on **barrel modules** (like `lib/dnd.ts`), not scattered across consumers. One source of truth, one boundary.

### About the architecture

- Putting all magic numbers in `lib/constants.ts` paid off massively when I needed to change `SLOT_HEIGHT_PX` from 16 to 14 — exactly one file changed, and every dependent calculation updated automatically.
- Deriving the type union from the constant array (`type X = (typeof CATS)[number]`) means adding a new category to the array auto-updates the type, the schema enum, the colour map, the icon map, the form picker — five places, one edit.
- Pure-presentation Views aren't ceremony. They're the difference between "I can mount this with hand-written props" and "I have to mock zustand and next/router to render anything."

---

## 11. Verification

The v1.0.0 tag was cut after every check below passed:

| Check | Result |
|---|---|
| `npm run lint` | ✓ zero warnings, zero errors |
| `npm run build` | ✓ clean, 4 static pages |
| `npm run dev` | ✓ Ready in 1.1 s |
| `@dnd-kit/*` import boundary | ✓ only inside `src/lib/dnd.ts` |
| `'use client'` on dnd barrel | ✓ |
| `console.log` / `: any` | ✓ none |
| Mobile safe-area on FAB | ✓ |
| `themeColor` + `viewportFit: 'cover'` | ✓ |

End-to-end smoke test:

1. Visit `/` → spinner → empty week grid.
2. Tap empty slot → form opens with day + time pre-filled.
3. Save block → renders at the right pixel offset, persists.
4. Tap chip → form re-opens in edit mode with values loaded.
5. Drag chip up/down/sideways → snaps to 15 min, persists across refresh.
6. Delete in form → block removed.
7. Prev / Next / Today week nav cycles labels.

---

## 12. v2 backlog (in priority order)

1. **Recurring blocks** — RRule-based weekly / daily repetition.
2. **Drag-to-resize** — bottom-edge drag to extend duration without opening the form.
3. **Day view + animated swap** — swipe between Day and Week.
4. **Custom categories** — name + colour picker for user-defined kinds.
5. **Multi-week stats** — "12 hrs Deep Work this week" dashboard.
6. **Cloud sync** — Supabase backend; swap repository adapter only.
7. **Notifications** — browser notification 5 min before a block starts.
8. **Templates** — save / apply common day shapes.

---

## 13. Quick facts (for the portfolio sidebar)

- **20 commits** on `main`, all squash-merged from short-lived branches.
- **21 tasks** across 6 phases, all green.
- **~1,800 lines** of TypeScript / TSX (excluding lockfile).
- **0** ESLint warnings, **0** type errors, **0** runtime warnings in dev console.
- **1** new technology learned to fluency: `@dnd-kit`.
- **1** swappable repository seam ready for the v2 backend.

---

## 14. Running it locally

```bash
git clone <repo>
cd plan-it
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

> *Plan.it is small on purpose. Every feature in v1 had to justify its weight against the goal of "a calendar that ships". The bigger lesson — for me and for any project I build next — is that the **discipline of saying no** to recurring blocks, day view, custom categories, and templates is exactly what made the things in v1 feel solid.*
