"use client";

/**
 * GSAP barrel — the only place in the project that imports from `gsap`
 * or its plugins. Keeping the import sites tight means tree-shaking
 * stays predictable and the `'use client'` directive carries through
 * to every consumer (GSAP needs the browser).
 *
 * ScrollTrigger and ScrollToPlugin are registered once on module load.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger, ScrollToPlugin };
