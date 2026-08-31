import { onMounted, onBeforeUnmount, type Ref } from "vue"
import { useIntelligenceEngine } from "./useIntelligenceEngine"

// Lets a section register itself with the one global Intelligence Engine:
// while `root` is in view, the center points of whatever `getTargets()`
// returns become section-gravity targets (particles nearby attract toward
// them); once it scrolls out of view, the pull clears. Screen position is
// recomputed on scroll/resize (not a continuous per-frame loop) since
// targets only move when the layout does.
export function useIntelligenceTargets(root: Ref<HTMLElement | undefined>, getTargets: () => HTMLElement[]) {
  const engine = useIntelligenceEngine()
  let observer: IntersectionObserver | null = null
  let rafId: number | null = null
  let active = false

  function computeAndSend() {
    const points = getTargets().map((el) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      return {
        x: (cx / window.innerWidth) * 2 - 1,
        y: -(cy / window.innerHeight) * 2 + 1,
      }
    })
    engine.value?.setSectionTargets(points)
  }

  function schedule() {
    if (!active || rafId !== null) return
    rafId = requestAnimationFrame(() => {
      rafId = null
      computeAndSend()
    })
  }

  onMounted(() => {
    if (!root.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        active = !!entry?.isIntersecting
        if (active) computeAndSend()
        else engine.value?.setSectionTargets([])
      },
      { threshold: 0.15 },
    )
    observer.observe(root.value)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", schedule)
    if (rafId !== null) cancelAnimationFrame(rafId)
    engine.value?.setSectionTargets([])
  })
}
