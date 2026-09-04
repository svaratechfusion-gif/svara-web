// SITE-WIDE TEXT REVEAL. The homepage's scramble, applied to every page heading
// without touching a single template.
//
// Doing this by hand would mean editing every heading across ~50 routes; doing it
// here means one place to tune and one place to switch off. Headings are found on
// each navigation and revealed as they scroll into view, at the reference's 0.3
// threshold — the same trigger the homepage's own headings use.
//
// WHICH HEADINGS. h1/h2/h3, because this site does not use the levels evenly:
// /ecosystem carries every section title as an h3, /divisions and /products use
// h3 for their display-scale names. Level alone is therefore a bad proxy for
// "is this a display heading", so the real gate is RENDERED SIZE — a heading has
// to be at least DISPLAY_PX tall to qualify, which lets a 48px h3 in and leaves a
// 12px h3 label alone.
//
// WHY THE MONOSPACE TEST. A character that has not started yet renders as a
// space, which reserves the glyph's width only in a monospaced face; in a
// proportional one the line reflows as it types. Rather than hard-coding which
// blocks override the global Space Mono, each candidate is measured: identical
// advance for "iiii" and "MMMM" means monospace. That is self-correcting — it
// cannot be wrong about a stylesheet it has never heard of, and it does not
// exclude a whole page on suspicion (an earlier `.stride` exclusion silently
// killed the reveal across all of /products, whose content is in fact Space Mono).
//
// ALSO LEFT ALONE: `.dx` (the homepage drives its own scramble components),
// `.boot` / `.svara-chatbot` / `.cc` (overlays that animate themselves and
// outlive the page), and `[data-no-scramble]` — the per-element opt-out.
//
// The real text is server-rendered and only replaced after hydration, so crawlers
// and no-JS visitors always read the copy.
import { attachScramble } from '~/utils/scramble'

const SELECTOR = 'h1, h2, h3'
const EXCLUDE = '.dx, .boot, .svara-chatbot, .cc, [data-no-scramble]'
/** Rendered px below which a heading is a label, not a display heading. */
const DISPLAY_PX = 22
/** Past this the typewriter cadence stops reading as an entrance and starts
 *  reading as a delay, so long headings are left alone. */
const MAX_CHARS = 200
const THRESHOLD = 0.3

const monoCache = new Map<string, boolean>()
let measure: CanvasRenderingContext2D | null = null

function fontOf(el: Element): string {
  const cs = getComputedStyle(el)
  return `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
}

/** True when the face renders every glyph at the same advance. */
function isMonospace(el: Element): boolean {
  const font = fontOf(el)
  const cached = monoCache.get(font)
  if (cached !== undefined) return cached

  measure ||= document.createElement('canvas').getContext('2d')
  if (!measure) return false
  measure.font = font
  const mono = Math.abs(measure.measureText('iiiiiiiiii').width - measure.measureText('MMMMMMMMMM').width) < 0.5
  monoCache.set(font, mono)
  return mono
}

/** Headings often carry their size on an inner span, so take the largest. */
function displaySize(el: Element): number {
  let size = Number.parseFloat(getComputedStyle(el).fontSize) || 0
  for (const child of el.children) {
    size = Math.max(size, Number.parseFloat(getComputedStyle(child).fontSize) || 0)
  }
  return size
}

export default defineNuxtPlugin((nuxtApp) => {
  const teardowns = new Map<Element, () => void>()
  let observer: IntersectionObserver | null = null

  function reset() {
    observer?.disconnect()
    observer = null
    teardowns.forEach(stop => stop())
    teardowns.clear()
  }

  function scan() {
    reset()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        observer?.unobserve(el)
        if (el.dataset.scrambled) continue
        el.dataset.scrambled = 'true'
        teardowns.set(el, attachScramble(el))
      }
    }, { threshold: THRESHOLD })

    for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) {
      if (el.dataset.scrambled) continue
      if (el.closest(EXCLUDE)) continue
      const text = el.textContent ?? ''
      if (!text.trim() || text.length > MAX_CHARS) continue
      if (displaySize(el) < DISPLAY_PX) continue
      if (!isMonospace(el)) continue
      observer.observe(el)
    }
  }

  nuxtApp.hook('app:mounted', () => nextTick(scan))
  nuxtApp.hook('page:finish', () => nextTick(scan))
})
