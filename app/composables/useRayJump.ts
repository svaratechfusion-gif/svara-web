import { useNuxtApp } from '#app'

/**
 * Scroll to a layer card on the technology page and flash it.
 *
 * The command window and the mock nav both "open" the same targets, so the jump
 * lives in one place. Uses the site's Lenis instance when it is there and falls back
 * to native smooth scrolling, which also covers reduced-motion users because the
 * browser honours their setting for `scrollIntoView`.
 */
export function useRayJump() {
  const nuxtApp = useNuxtApp()

  function jump(id: string): boolean {
    if (typeof document === 'undefined') return false
    const el = document.getElementById(id)
    if (!el) return false

    const lenis = (nuxtApp as unknown as {
      $lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void }
    }).$lenis

    if (lenis?.scrollTo) lenis.scrollTo(el, { offset: -110 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'center' })

    el.classList.add('is-jumped')
    window.setTimeout(() => el.classList.remove('is-jumped'), 1600)
    return true
  }

  return { jump }
}
