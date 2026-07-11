// v-reveal — the site's ONE scroll-reveal primitive (V4 animation rules:
// 0.6s, power3.out, ScrollTrigger only where necessary, animate only what
// improves hierarchy). Usage:
//   v-reveal            → fade+rise on enter
//   v-reveal="{ delay: 0.1 }"
// Universal plugin: SSR renders elements as-is (getSSRProps no-op) so
// markup is complete for crawlers; the browser then animates on scroll.
// Respects prefers-reduced-motion (elements simply stay visible).

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}), // SSR: render untouched

    async mounted(el: HTMLElement, binding: { value?: { delay?: number, y?: number } }) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const [{ gsap, ScrollTrigger }, { duration, ease }] = await Promise.all([
        import('~~/lib/gsap'),
        import('~~/lib/animation/motion'),
      ])
      const { delay = 0, y = 24 } = binding.value ?? {}
      gsap.set(el, { opacity: 0, y })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: duration.slow, ease: ease.out, delay })
        },
      })
    },
  })
})
