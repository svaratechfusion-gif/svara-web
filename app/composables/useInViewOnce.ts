import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

/**
 * Fires once, the first time `el` crosses `threshold` of the viewport, then
 * disconnects. Every entrance on the home page is a one-shot: the design
 * reveals a card as you arrive at it and never takes it away again.
 *
 * Under `prefers-reduced-motion` it resolves true immediately, so a component
 * that gates its finished state on this renders finished rather than blank.
 */
export function useInViewOnce(el: Ref<HTMLElement | null>, threshold = 0.3) {
  const inView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      inView.value = true
      return
    }
    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      inView.value = true
      observer?.disconnect()
    }, { threshold })
    observer.observe(el.value)
  })

  onBeforeUnmount(() => observer?.disconnect())
  return { inView }
}
