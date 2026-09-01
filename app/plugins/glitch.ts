// `v-glitch` — the hero glitch as a directive, so retrofitting an existing hero costs one
// attribute instead of a script block. Usage:
//
//   <h1 v-glitch>…</h1>                                   heading defaults
//   <p v-glitch="{ intensity: 0.5, delay: 1.35 }">…</p>   softer, later (subheadings)
//   <h1 v-glitch="{ idle: false }">…</h1>                 entrance burst only
//
// UNIVERSAL, NOT `.client.ts`. A client-only registration leaves the directive unresolved
// during SSR, and Vue's ssrGetDirectiveProps then throws
// "Cannot read properties of undefined (reading 'getSSRProps')" — a 500 on every page that
// uses it. So the directive is registered on both sides: `getSSRProps` makes it contribute
// nothing to the server render, and the animation work is client-gated below.
//
// GSAP is pulled in through a dynamic import so the server bundle never loads it, and the
// heading ships in the SSR markup unchanged — fully readable before hydration.
//
// Reduced motion is honoured by doing NOTHING: the hero keeps its own entrance and the
// heading simply never glitches, the correct fallback for a purely decorative effect.
import type { GlitchOptions } from '~/utils/glitch'

const teardowns = new WeakMap<HTMLElement, () => void>()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, GlitchOptions | undefined>('glitch', {
    // server: resolve, render nothing extra
    getSSRProps: () => ({}),

    mounted(el, binding) {
      if (!import.meta.client) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      void import('~/utils/glitch').then(({ attachGlitch }) => {
        // the hero may already be gone if the route changed during the import
        if (!el.isConnected) return
        teardowns.set(el, attachGlitch(el, binding.value ?? {}))
      })
    },

    unmounted(el) {
      teardowns.get(el)?.()
      teardowns.delete(el)
    },
  })
})
