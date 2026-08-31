import { onMounted, onBeforeUnmount, nextTick, type Ref } from 'vue'

// FAIL-SAFE staggered fade-up reveal (NovaAI reference: IntersectionObserver,
// threshold 0.15, hidden = translate-y-8 opacity-0, visible = translate-y-0
// opacity-100, transition all 700ms ease-out, per-element delay).
//
// Content is visible by default (CSS). We only ARM the hidden pre-state on the
// client when we can also reveal it, then add `.is-in` on intersect. A timeout
// backstop guarantees nothing is ever stranded invisible — the lesson learned
// from the homepage's GSAP-reveal invisibility bug.
//
// Markup contract: any element with `data-reveal` animates; `data-reveal-delay`
// (ms) sets its stagger. Scanned from `rootEl` after mount.
export function useExperienceReveal(rootEl: Ref<HTMLElement | null>, backstopMs = 2600) {
  let io: IntersectionObserver | null = null
  let backstop: ReturnType<typeof setTimeout> | undefined

  onMounted(async () => {
    if (typeof window === 'undefined') return
    const root = rootEl.value
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    await nextTick() // ensure child sections have rendered their [data-reveal] nodes
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!nodes.length) return

    root.classList.add('sx-armed')
    for (const el of nodes) {
      const delay = el.dataset.revealDelay
      if (delay) el.style.transitionDelay = `${delay}ms`
    }

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io?.unobserve(e.target) }
        }
      }, { threshold: 0.15 })
      nodes.forEach((n) => io!.observe(n))
    } else {
      nodes.forEach((n) => n.classList.add('is-in'))
    }

    backstop = setTimeout(() => nodes.forEach((n) => n.classList.add('is-in')), backstopMs)
  })

  onBeforeUnmount(() => {
    io?.disconnect()
    if (backstop) clearTimeout(backstop)
  })
}
