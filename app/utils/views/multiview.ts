// SCISSORED MULTI-VIEW — one renderer, one canvas, many DOM-tracked viewports.
//
// Adapted from @react-three/drei's <View> (src/web/View.tsx) and the pmndrs
// view-tracking demo: every registered element's getBoundingClientRect()
// becomes a viewport + scissor rectangle inside a single fixed, full-viewport
// canvas. Ten product visuals then cost ONE WebGL context and ONE draw loop
// instead of ten of each — which is the only reason ten of them are affordable
// on a marketing page that already runs the particle hero.
//
// Two deliberate departures from the reference:
//
//   · THE SCISSOR IS INTERSECTED WITH A CLIP ELEMENT. drei sets the scissor
//     equal to the viewport, which is right for views in normal flow and wrong
//     inside a scroll container: a card scrolled past the strip's left edge is
//     clipped by the DOM but NOT by GL, so its scene bleeds across the page.
//     The viewport stays the full card rect — the projection must not change —
//     and only the scissor shrinks to the visible slice.
//
//   · THE CANVAS IS CLEARED ONCE PER FRAME, scissor test off, rather than per
//     container. Cheaper, and safe because the canvas is transparent and owned
//     by nothing else.

import * as THREE from 'three'
import { disposeScene, type ViewScene } from './three-kit'

interface Registered {
  el: HTMLElement
  clip: HTMLElement | null
  view: ViewScene
}

export interface MultiView {
  /** Track `el`; paint `view` into it. `clip` bounds the scissor (scroll containers). */
  add: (el: HTMLElement, view: ViewScene, clip?: HTMLElement | null) => void
  render: (t: number, dt: number) => void
  resize: () => void
  dispose: () => void
}

/**
 * Returns null when WebGL is unavailable. Callers must treat that as "leave the
 * CSS fallback alone" — every card keeps its still image if this returns null.
 */
export function createMultiView(canvas: HTMLCanvasElement, maxDpr = 1.5): MultiView | null {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  }
  catch {
    return null
  }
  if (!renderer.getContext()) return null

  renderer.autoClear = false
  renderer.setClearColor(0x000000, 0)

  const views: Registered[] = []
  let width = 0
  let height = 0

  function resize(): void {
    width = window.innerWidth
    height = window.innerHeight
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
    // updateStyle false: the canvas is sized by CSS (fixed, inset 0).
    renderer.setSize(width, height, false)
  }

  function add(el: HTMLElement, view: ViewScene, clip: HTMLElement | null = null): void {
    views.push({ el, clip, view })
  }

  function render(t: number, dt: number): void {
    if (!width || !height) resize()

    renderer.setScissorTest(false)
    renderer.clear(true, true, true)

    for (const { el, clip, view } of views) {
      const rect = el.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) continue
      // Offscreen: never touched by GL, and never stepped either — a card that
      // is not on the strip costs nothing at all.
      if (rect.bottom < 0 || rect.top > height || rect.right < 0 || rect.left > width) continue

      const bounds = clip ? clip.getBoundingClientRect() : null
      const left = bounds ? Math.max(rect.left, bounds.left) : rect.left
      const right = bounds ? Math.min(rect.right, bounds.right) : rect.right
      const top = bounds ? Math.max(rect.top, bounds.top) : rect.top
      const bottom = bounds ? Math.min(rect.bottom, bounds.bottom) : rect.bottom
      const clippedWidth = right - left
      const clippedHeight = bottom - top
      if (clippedWidth < 1 || clippedHeight < 1) continue

      const { camera, scene } = view
      const aspect = rect.width / rect.height
      if (camera.aspect !== aspect) {
        camera.aspect = aspect
        camera.updateProjectionMatrix()
      }

      view.update?.(t, dt)

      // GL's origin is bottom-left; the DOM's is top-left.
      renderer.setViewport(rect.left, height - rect.bottom, rect.width, rect.height)
      renderer.setScissor(left, height - bottom, clippedWidth, clippedHeight)
      renderer.setScissorTest(true)
      renderer.render(scene, camera)
    }

    renderer.setScissorTest(false)
  }

  function dispose(): void {
    for (const { view } of views) {
      view.dispose?.()
      disposeScene(view.scene)
    }
    views.length = 0
    renderer.dispose()
    renderer.forceContextLoss()
  }

  resize()
  return { add, render, resize, dispose }
}
