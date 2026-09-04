// `v-scramble` — the homepage's text reveal as a directive, so any heading on the
// site can opt in with one attribute:
//
//   <h2 v-scramble>…</h2>                        reveal when it scrolls into view
//   <h1 v-scramble="{ simultaneous: true }">…</h1>   hero mode, on mount
//   <h2 v-scramble="{ whenVisible: false }">…</h2>   start immediately
//
// UNIVERSAL, NOT `.client.ts`. A client-only registration leaves the directive
// unresolved during SSR and Vue's ssrGetDirectiveProps then throws "Cannot read
// properties of undefined (reading 'getSSRProps')" — a 500 on every page that
// uses it. Same lesson as plugins/glitch.ts. So it is registered on both sides:
// getSSRProps contributes nothing to the server render, which also means the real
// text ships in the HTML and crawlers never see glyphs.
import { attachScramble } from '~/utils/scramble'

export interface ScrambleBinding {
  simultaneous?: boolean
  /** Wait for the element to enter the viewport (default true). */
  whenVisible?: boolean
  /** Visibility fraction that triggers it (default 0.3, the reference's). */
  threshold?: number
}

interface Cleanup { stop: () => void }
const cleanups = new WeakMap<HTMLElement, Cleanup>()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, ScrambleBinding | undefined>('scramble', {
    getSSRProps: () => ({}),

    mounted(el, binding) {
      if (!import.meta.client) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const opts = binding.value ?? {}
      let detach: (() => void) | null = null
      let observer: IntersectionObserver | null = null

      const start = () => { detach = attachScramble(el, { simultaneous: opts.simultaneous }) }

      if (opts.whenVisible === false) {
        start()
      } else {
        observer = new IntersectionObserver(([entry]) => {
          if (!entry?.isIntersecting) return
          observer?.disconnect()
          observer = null
          start()
        }, { threshold: opts.threshold ?? 0.3 })
        observer.observe(el)
      }

      cleanups.set(el, { stop: () => { observer?.disconnect(); detach?.() } })
    },

    unmounted(el) {
      cleanups.get(el)?.stop()
      cleanups.delete(el)
    },
  })
})
