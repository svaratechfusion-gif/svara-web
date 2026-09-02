// THE SEQUENCE — the single source of truth for the Products cinematic timeline.
//
// The page has no sections. It has ONE fixed scene and a scroll spacer; where you
// are in that spacer (progress `0 → 1`) is the only thing that decides what the
// scene is doing. This file turns an editable list of BEATS (each with a length in
// vh) into normalised `[start, end]` windows, so the choreography is tuned by
// changing durations here — never by hard-coding magic progress numbers in
// components.
//
// Beat order:
//   intro → (title · product) × 10 → ecosystem → finale
//
// Each product is preceded by an enormous editorial title word (the transition of
// §14): the outgoing dashboard exits while the word arrives, and the incoming
// dashboard is already rising out of depth behind it.
import { SVARA_OS, type OsProduct } from '~/utils/svara-os'

/** One editorial word per system — the title-sequence card that announces it. */
const TITLE_WORD: Record<string, string> = {
  vision: 'VISION',
  drone: 'AUTONOMY',
  edge: 'EDGE',
  cognitive: 'COGNITION',
  agents: 'AGENCY',
  twin: 'SIMULATION',
  aios: 'ORCHESTRATION',
  cloud: 'UNIFIED',
  engineering: 'ENGINEERED',
  growth: 'GROWTH',
}

/** A short editorial line under the title word — what the act is about. */
const TITLE_LINE: Record<string, string> = {
  vision: 'Machines that see, understand and act',
  drone: 'Intelligence that moves on its own',
  edge: 'Inference where the data is born',
  cognitive: 'Reasoning over everything you know',
  agents: 'Work that carries itself to completion',
  twin: 'The plant, rehearsed before it is built',
  aios: 'One command layer over every system',
  cloud: 'One data model for the whole business',
  engineering: 'The system that builds the systems',
  growth: 'Attention, measured and compounded',
}

/** Beat lengths in vh. Tune the pacing of the whole film from here. */
const DURATION = {
  intro: 120,
  title: 55,
  product: 125,
  ecosystem: 150,
  finale: 130,
} as const

export interface Beat {
  /** Unique key — also the ScrollFade / reveal act id. */
  id: string
  kind: 'intro' | 'title' | 'product' | 'ecosystem' | 'finale'
  vh: number
  /** Normalised window in page progress. */
  start: number
  end: number
}

export interface ProductBeat {
  product: OsProduct
  /** Index in the catalogue, 0-based. */
  i: number
  word: string
  line: string
  /** The title card that announces this system. */
  title: Beat
  /** The scene the dashboard holds in. */
  scene: Beat
  /**
   * The dashboard stage's own four-point choreography, in page progress:
   * enters from depth during the title card, holds, then drifts away.
   */
  stage: { in: number, hold: number, out: number, end: number }
  /** Which side of the frame the dashboard occupies. */
  composition: 'right' | 'left'
  /** Where the copy sits in the column beside it. */
  anchor: 'split' | 'bottom' | 'top'
}

interface RawBeat { id: string, kind: Beat['kind'], vh: number }

// The finale is NOT a pinned beat: it renders as a normal in-flow section below the
// spacer (above the site footer), so it owns its own document height and the footer
// can never overlap it. It therefore claims no scroll length in the pinned sequence —
// the ecosystem is the last pinned beat. (DURATION.finale is kept only as the
// reference height the flow section uses.)
// The intro is NOT in this list. The hero was lifted out of the sequence into its own
// pin (ProductHeroPin) so the Stride block can sit between it and the film — see
// ProductExperience. Everything below therefore renormalises across the film alone,
// which is exactly what the beat windows want: they are fractions of the wrapper they
// are pinned in, and that wrapper no longer contains the hero.
const RAW: RawBeat[] = [
  ...SVARA_OS.flatMap((p): RawBeat[] => [
    { id: `title:${p.id}`, kind: 'title', vh: DURATION.title },
    { id: `scene:${p.id}`, kind: 'product', vh: DURATION.product },
  ]),
  { id: 'ecosystem', kind: 'ecosystem', vh: DURATION.ecosystem },
]

/**
 * The hero's pin height, and its beat.
 *
 * The hero owns its wrapper outright, so its window is the whole of it: `[0, 1]` in
 * its own local progress. Keeping it typed as a Beat means SceneIntro and
 * ProductHeroVideo take it unchanged.
 */
export const HERO_VH = DURATION.intro
export const HERO_BEAT: Beat = { id: 'intro', kind: 'intro', vh: DURATION.intro, start: 0, end: 1 }

/**
 * The finale's beat, local to its own entry.
 *
 * SceneFinale derives its reveal window as `[start + len*0.05, 1]`, and
 * `useSceneWindow` is a boolean switch, not a ramp. Handed the old ecosystem beat it
 * only flipped on at 0.927 — with entry progress that is the section's top edge 76px
 * from the viewport top, so the whole approach to it was blank. `[0, 1]` makes the
 * window `[0.05, 1]`: on as soon as the section enters, still on at the end.
 */
export const FINALE_BEAT: Beat = { id: 'finale', kind: 'finale', vh: DURATION.finale, start: 0, end: 1 }

/** Total scroll length of the sequence, in vh — the spacer's height. */
export const SEQUENCE_VH = RAW.reduce((sum, b) => sum + b.vh, 0)

/** Every beat, with its normalised `[start, end]` window. */
export const BEATS: Beat[] = (() => {
  let cursor = 0
  return RAW.map((b) => {
    const start = cursor / SEQUENCE_VH
    cursor += b.vh
    return { ...b, start, end: cursor / SEQUENCE_VH }
  })
})()

const byId = new Map(BEATS.map((b) => [b.id, b]))

export function beat(id: string): Beat {
  const b = byId.get(id)
  if (!b) throw new Error(`[scene-sequence] unknown beat "${id}"`)
  return b
}

/** Fade window for a beat's overlay: ramps in over the head, out over the tail. */
export function fadeIn(b: Beat, frac = 0.2): [number, number] {
  return [b.start, b.start + (b.end - b.start) * frac]
}
export function fadeOut(b: Beat, frac = 0.2): [number, number] {
  return [b.end - (b.end - b.start) * frac, b.end]
}

/**
 * Four compositions from two dashboard positions and two copy anchors, cycled so
 * no two neighbouring systems read alike.
 *
 * There is deliberately no "dashboard centred" variant. Centring an object that
 * is ~64vw wide leaves ~180px of margin on each side — not enough for a 56px
 * display name without either wrapping it to shreds or narrowing the dashboard,
 * and the dashboard's size is not negotiable. Moving the COPY instead gets the
 * same variety for free.
 */
const COMPOSITIONS: { composition: ProductBeat['composition'], anchor: ProductBeat['anchor'] }[] = [
  { composition: 'right', anchor: 'split' },
  { composition: 'left', anchor: 'bottom' },
  { composition: 'right', anchor: 'bottom' },
  { composition: 'left', anchor: 'top' },
]

export const PRODUCT_BEATS: ProductBeat[] = SVARA_OS.map((product, i) => {
  const title = beat(`title:${product.id}`)
  const scene = beat(`scene:${product.id}`)
  const len = scene.end - scene.start
  const titleLen = title.end - title.start
  return {
    product,
    i,
    word: TITLE_WORD[product.id] ?? product.short.toUpperCase(),
    line: TITLE_LINE[product.id] ?? product.tagline,
    title,
    scene,
    stage: {
      // Rises out of depth while the title word is still on screen.
      in: title.start + titleLen * 0.42,
      hold: scene.start + len * 0.16,
      // The exit starts early and finishes early ON PURPOSE. The next system's
      // title word peaks in the first half of its card, and a word this light
      // reading over a still-opaque dark HUD is a word you can't read — so the
      // outgoing window is essentially gone by the time the word is sharp.
      out: scene.end - len * 0.16,
      end: scene.end + titleLen * 0.28,
    },
    ...COMPOSITIONS[i % COMPOSITIONS.length]!,
  }
})

/**
 * How close to its stage window a dashboard must be before it is MOUNTED. The
 * product systems each run their own throttled telemetry ticker; inside a
 * `position: fixed` scene an IntersectionObserver reports every one of them as
 * permanently in view, so mounting all ten would leave ten simulations running
 * forever. Gating the mount keeps at most two alive at a time and costs nothing
 * visually — the margin is far wider than the enter/exit ramps.
 */
export const MOUNT_MARGIN = 0.035
