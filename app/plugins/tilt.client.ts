// SVARA 3D — cursor tilt + lighting engine (client-only).
// ONE delegated pointermove listener for the whole site (shared event handling, per the
// perf brief). While the cursor is over a 3D card/panel it sets an inline transform
// (subtle ±2° perspective tilt + a 6px lift) and the light position vars; on leave it
// clears them. Because the transform is applied INLINE ONLY WHILE HOVERING, there is no
// always-on transform — text stays crisp at rest and nothing creates stray stacking/
// overflow. rAF-throttled. Disabled for reduced-motion and coarse (touch) pointers, where
// the CSS bevel/shadow/press still provide the physical feel.
export default defineNuxtPlugin(() => {
  // Same card/panel/frame/cell/module token patterns the 3D stylesheet targets.
  const SELECTOR = [
    '[class$="__card"]', '[class*="__card "]', '[class$="-card"]', '[class*="-card "]',
    '[class$="__frame"]', '[class*="__frame "]', '[class$="-frame"]', '[class*="-frame "]',
    '[class$="__panel"]', '[class*="__panel "]', '[class$="-panel"]', '[class*="-panel "]',
    '[class$="__cell"]', '[class*="__cell "]', '[class$="-cell"]', '[class*="-cell "]',
    '[class$="__mod"]', '[class*="__mod "]',
    '[class$="__tile"]', '[class*="__tile "]',
    '[class$="__surface"]', '[class*="__surface "]',
    '[class$="__chassis"]', '[class*="__chassis "]',
    '[class$="__console"]', '[class*="__console "]',
    '.sv-card', '.sv-frame', '.hx-panel', '.svara-3d-card', '.svara-3d-panel',
  ].join(',')
  const MAX = 2 // degrees
  const LIFT = -6 // px

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const coarse = window.matchMedia('(pointer: coarse)')

  let current: HTMLElement | null = null
  let px = 0
  let py = 0
  let raf = 0

  function clamp(v: number, m: number): number {
    return Math.max(-m, Math.min(m, v))
  }

  function paint(): void {
    raf = 0
    const el = current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height) return
    const dx = (px - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (py - (r.top + r.height / 2)) / (r.height / 2)
    const ry = clamp(dx * MAX, MAX)
    const rx = clamp(-dy * MAX, MAX)
    // 'important' so it beats the stylesheet's !important hover lift → the tilt shows.
    el.style.setProperty(
      'transform',
      `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(${LIFT}px)`,
      'important',
    )
    el.style.setProperty('--sv3d-mx', `${(((px - r.left) / r.width) * 100).toFixed(1)}%`)
    el.style.setProperty('--sv3d-my', `${(((py - r.top) / r.height) * 100).toFixed(1)}%`)
  }

  function release(el: HTMLElement | null): void {
    if (!el) return
    el.style.removeProperty('transform')
    el.style.removeProperty('--sv3d-mx')
    el.style.removeProperty('--sv3d-my')
  }

  function onMove(e: PointerEvent): void {
    if (reduce.matches || coarse.matches) return
    const next = (e.target as Element | null)?.closest?.(SELECTOR) as HTMLElement | null
    if (next !== current) {
      release(current)
      current = next
    }
    if (!current) return
    px = e.clientX
    py = e.clientY
    if (!raf) raf = requestAnimationFrame(paint)
  }

  function onLeaveWindow(): void {
    release(current)
    current = null
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeaveWindow, { passive: true })
})
