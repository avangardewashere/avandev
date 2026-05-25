# avandev — Avel Panaligan's portfolio

Personal portfolio site. One page, scroll-driven, hand-written CSS, GSAP for choreography.

![Status](https://img.shields.io/badge/status-v0.1.0-brightgreen)
![Stack](https://img.shields.io/badge/stack-Next.js%2016%20•%20React%2019%20•%20GSAP-blue)

## What's here (v0.1)

A single landing page composed of seven scroll-driven sections:

1. **Hero** — pinned, with a sun that rises through the viewport and docks behind the navbar
2. **About** — narrative + animated stat counters
3. **Skills** — grouped pill rows with staggered reveals
4. **Projects** — horizontal pin-track gallery showcasing TallyTappy and Plan.it
5. **Client work** — second horizontal pin-track wall of eight employment engagements (OKFUN, Casino Plus, GCash, Casino Web, Mini Programs, Vue→React, Malmö Maids, ExpressPay)
6. **Path** — six-stop timeline of companies, with a progress bar that fills as you scroll past
7. **Contact** — email + GitHub + LinkedIn, dawn gradient background

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + TypeScript strict |
| Styling | Tailwind 4 (`@theme inline` tokens) + hand-written section CSS |
| Animation | **GSAP 3** + ScrollTrigger + ScrollToPlugin (the new tech for this project) |
| Fonts | Geist + Instrument Sans + JetBrains Mono (`next/font/google`) |
| Class merge | `clsx` |

## Architecture

MVVM, same discipline as the other personal projects in this lineage (TallyTappy → Plan.it → this one).

```
Page → View → ViewModel → DOM/GSAP
```

- `app/page.tsx` is three lines — calls `<PortfolioView />`
- `features/portfolio/views/PortfolioView.tsx` composes the eight section components and runs the ViewModel hook
- `features/portfolio/viewmodels/usePortfolioViewModel.ts` owns every GSAP timeline. Sections themselves are pure presentation
- All `gsap*` imports go through `lib/gsap.ts`, the `'use client'` barrel that registers ScrollTrigger and ScrollToPlugin once for the whole project

Static content (stats, skill pills, timeline stops, contact info) lives in `features/portfolio/data.ts` so the same source can feed an eventual print route or résumé export.

## Running

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # production build
npm run lint
```

## What's not in v0.1 (v0.2 backlog)

- `/print` route mirroring the print HTML in the design source
- Long-form case studies at `/work/[slug]` for TallyTappy + Plan.it (the markdowns already exist alongside this repo)
- Mobile nav (links collapse to hamburger under 720 px)
- Real LinkedIn URL + a real domain
- OG image at `app/opengraph-image.png`
