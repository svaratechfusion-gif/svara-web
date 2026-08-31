import type Lenis from "lenis"

// Access the single site-wide Lenis instance for programmatic scroll —
// anchor links, "back to top", scroll-locking, etc. Returns `null` on the
// server and under prefers-reduced-motion (where Lenis is never created and
// native scrolling is used instead), so callers must null-check.
//
//   const lenis = useLenis()
//   lenis?.scrollTo('#section', { offset: -80 })
//
// Never `new Lenis()` in a component — there is exactly one instance, created
// in app/plugins/lenis.client.ts.
export function useLenis(): Lenis | null {
  return (useNuxtApp().$lenis as Lenis | undefined) ?? null
}
