import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'

/**
 * One scrubbed ScrollTrigger for a section, returning its 0→1 progress.
 *
 * The site runs a single gsap.ticker and one Lenis; this adds no rAF of its own —
 * ScrollTrigger already drives from that ticker. Under `prefers-reduced-motion` the
 * progress resolves to 1 immediately, so a component that maps progress to "how far
 * through the sequence am I" renders its finished state rather than nothing.
 */
export function useScrollScrub(
  el: Ref<HTMLElement | null>,
  opts: { start?: string, end?: string, pin?: Ref<HTMLElement | null> } = {},
) {
  const progress = ref(0)
  let st: ScrollTrigger | null = null

  onMounted(() => {
    if (!el.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress.value = 1
      return
    }
    st = ScrollTrigger.create({
      trigger: el.value,
      start: opts.start ?? 'top 80%',
      end: opts.end ?? 'bottom 60%',
      scrub: true,
      pin: opts.pin?.value ?? false,
      pinSpacing: opts.pin ? false : undefined,
      onUpdate: self => (progress.value = self.progress),
    })
  })

  onBeforeUnmount(() => st?.kill())

  return { progress }
}
