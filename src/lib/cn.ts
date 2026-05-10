import clsx, { type ClassValue } from "clsx";

/**
 * Lightweight class-name merge. Wraps `clsx` so the call site stays
 * short and we have a single import path to swap out later if we
 * ever need `tailwind-merge` style conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
