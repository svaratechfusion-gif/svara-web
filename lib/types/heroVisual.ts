// The shape HeroVisual.vue exposes via defineExpose — a read-only view
// for a future particle engine to sample pixels from the Hero image. No
// morphing/dissolve logic is implemented against this yet; this type is
// the contract a future consumer builds against, not a live integration.

import type { Ref } from 'vue'

export interface HeroImageBounds {
  /** viewport-relative, px — same convention as getBoundingClientRect() */
  x: number
  y: number
  width: number
  height: number
}

export interface HeroImageMask {
  /** mask sampling resolution — independent of the image's rendered or
   *  natural size, downsampled (longest side capped) for cheap lookups */
  width: number
  height: number
  /** one byte per pixel, row-major, top-left origin: 0 = fully
   *  transparent, 255 = fully opaque */
  data: Uint8ClampedArray
}

export interface HeroVisualSource {
  /** the rendered <img> element itself */
  imageRef: Readonly<Ref<HTMLImageElement | undefined>>
  /** the image's current on-screen bounding box, viewport-relative,
   *  reactive — recomputed on resize and once the image has loaded */
  bounds: Readonly<Ref<HeroImageBounds>>
  /** the extracted alpha mask; null until the image has finished loading */
  mask: Readonly<Ref<HeroImageMask | null>>
  /** sample the alpha mask at a normalized (u, v) coordinate — (0,0) is
   *  the image's own top-left, (1,1) its bottom-right (the image's
   *  content box, not the glass panel it sits in). Nearest-neighbor, not
   *  interpolated. Returns 0 if the mask isn't ready yet or (u,v) is
   *  outside 0..1. */
  getAlphaAt(u: number, v: number): number
}
