/**
 * Per-device budget for the head-particle scene.
 *
 * The Noema reference resolved this from a shared `lib/scene/device` module it
 * used across several scenes; this repo has no such module, so the tier is
 * worked out here from the same three signals — pointer coarseness, viewport
 * width and reported core count — and everything the scene is allowed to spend
 * hangs off it.
 *
 * What the mobile tier gives up, in order of what it buys back:
 *
 * - the **second, jittered point pass** — halves 50 000 heavy vertex-shader
 *   invocations per frame; the head reads sparser, so its sprites are drawn a
 *   touch larger to compensate;
 * - the **chromatic-dispersion composite** — an offscreen render target plus a
 *   fullscreen 3-tap texture read every frame, for a colour split nobody sees on
 *   a 6" screen. At `dispersion: 0` the scene draws straight to the default
 *   framebuffer and the FBO/texture/program are never created;
 * - **MSAA**, which on tiled mobile GPUs is paid per pixel;
 * - most of the **rising embers**.
 *
 * It also turns **pointer interactivity off**: a coarse pointer has no hover, so
 * "cursor" parallax could only ever fire mid-drag — motion nobody asked for,
 * paid for with a listener on every touch move.
 *
 * Resolved ONCE per mount, like the DPR it carries: WebGL's `antialias` is fixed
 * at context creation, so re-tiering live would mean rebuilding the renderer.
 */

export type DeviceTier = 'mobile' | 'tablet' | 'desktop'

export interface SceneQuality {
  tier: DeviceTier
  /** Device-pixel ratio for the drawing buffer (clamped per tier). */
  dpr: number
  /** Play the intro, then stop drawing entirely (reduced motion / weak device). */
  freeze: boolean
  /** Request MSAA on the WebGL context. */
  antialias: boolean
  /** Draw the point cloud a second time, jittered, for a denser head. */
  doubleDraw: boolean
  /** Base sprite diameter in CSS pixels, before perspective attenuation. */
  pointSizePx: number
  /** Number of rising embers streaming up into the head. */
  risingCount: number
  /** Chromatic dispersion (UV units). `0` skips the composite pass entirely. */
  dispersion: number
  /** Let the pointer drive head parallax + the cursor light burst. */
  pointer: boolean
  /**
   * Re-size the drawing buffer when the canvas box changes.
   *
   * Off on touch: mobile Safari changes the viewport every time the URL bar
   * collapses, and re-allocating the framebuffer mid-scroll reads as a
   * whole-scene flash. The canvas is sized against the large viewport, so on a
   * phone that first size is already the right one.
   */
  resize: boolean
}

const byTier = <T>(tier: DeviceTier, map: Record<DeviceTier, T>): T => map[tier]

const deviceTier = (): DeviceTier => {
  if (typeof window === 'undefined') return 'desktop'
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const width = window.innerWidth
  const cores = navigator.hardwareConcurrency ?? 8
  if (coarse && width < 900) return 'mobile'
  if (coarse || width < 1100 || cores <= 4) return 'tablet'
  return 'desktop'
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const resolveSceneQuality = (): SceneQuality => {
  const tier = deviceTier()
  return {
    tier,
    dpr: Math.min(window.devicePixelRatio || 1, byTier(tier, { mobile: 1.5, tablet: 1.75, desktop: 2 })),
    // A reduced-motion visitor gets the head, then stillness — never a loop.
    freeze: prefersReducedMotion() || tier === 'mobile',
    antialias: byTier(tier, { mobile: false, tablet: false, desktop: true }),
    doubleDraw: byTier(tier, { mobile: false, tablet: true, desktop: true }),
    pointSizePx: byTier(tier, { mobile: 2.8, tablet: 2.4, desktop: 2.2 }),
    risingCount: byTier(tier, { mobile: 320, tablet: 600, desktop: 900 }),
    dispersion: byTier(tier, { mobile: 0, tablet: 0.006, desktop: 0.006 }),
    pointer: byTier(tier, { mobile: false, tablet: false, desktop: true }),
    resize: byTier(tier, { mobile: false, tablet: false, desktop: true }),
  }
}
