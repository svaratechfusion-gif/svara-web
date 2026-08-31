<script setup lang="ts">
// THE PINNED PRODUCT SHOWCASE — one pinned viewport, one master GSAP timeline,
// one continuous video (behind, in ProScrollVideo). Scrolling scrubs the single
// timeline: the editorial panel crossfades product→product and the central
// dashboard (the LOCKED per-product React console) morphs in place — never ten
// separate scrolling sections. Smooth scroll is the site's existing Lenis
// (wired to gsap.ticker + ScrollTrigger.update in app/plugins/lenis.client.ts),
// so we add exactly ONE ScrollTrigger with pin + scrub — no competing triggers.
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import ProductConsoleMount from '~/components/products/ProductConsoleMount.vue'
import { PLATFORMS, PLATFORM_COUNT } from '~/utils/platforms'

// PLATFORMS order === the console `kind` order (both are the 10 systems in the
// same canonical sequence), so index i maps 1:1.
type Kind = 'vision' | 'drone' | 'edge' | 'cognitive' | 'agents' | 'digital-twin' | 'business-cloud' | 'ai-os' | 'digital-engineering' | 'growth'
const KINDS: Kind[] = ['vision', 'drone', 'edge', 'cognitive', 'agents', 'digital-twin', 'business-cloud', 'ai-os', 'digital-engineering', 'growth']
const products = PLATFORMS.map((p, i) => ({ ...p, kind: KINDS[i]! }))
const COUNT = PLATFORM_COUNT

const stageEl = ref<HTMLElement | null>(null)
const panelsWrap = ref<HTMLElement | null>(null)
const consoleWrap = ref<HTMLElement | null>(null)

const displayIndex = ref(0)                 // which console/panel is live (morph target)
const counter = ref(0)                      // scrubbed counter for the HUD
const isDesktop = ref(false)                // gate the heavy live console to desktop
const stageActive = ref(false)              // activate the console only when in view
const mobileCurrent = ref(0)                // mobile: only the in-view panel's console mounts
const activeKind = computed<Kind>(() => products[displayIndex.value]?.kind ?? 'vision')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let gsap: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mm: any = null
let io: IntersectionObserver | null = null
let panelIO: IntersectionObserver | null = null

onMounted(async () => {
  if (typeof window === 'undefined') return
  isDesktop.value = window.matchMedia('(min-width: 1024px)').matches

  // activate the live console shortly before the stage reaches the viewport
  if ('IntersectionObserver' in window && stageEl.value) {
    io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { stageActive.value = true; io?.disconnect() }
    }, { rootMargin: '60% 0px 60% 0px' })
    io.observe(stageEl.value)
  } else {
    stageActive.value = true
  }

  // mobile: track the centred panel so only ONE live console is mounted at a time
  if ('IntersectionObserver' in window && panelsWrap.value) {
    panelIO = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.index)
          if (Number.isFinite(idx)) mobileCurrent.value = idx
        }
      }
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 })
    panelsWrap.value.querySelectorAll<HTMLElement>('.st__panel').forEach((p) => panelIO!.observe(p))
  }

  const mod = await import('~~/lib/gsap')
  gsap = mod.gsap
  await nextTick()

  const panels = Array.from(panelsWrap.value?.querySelectorAll<HTMLElement>('.st__panel') ?? [])
  if (!panels.length || !stageEl.value) return

  mm = gsap.matchMedia()

  // ---- DESKTOP: one pinned container, one scrubbed master timeline ----
  mm.add('(min-width: 1024px)', () => {
    isDesktop.value = true
    const perProductScroll = () => window.innerHeight * 0.92

    const cw = consoleWrap.value
    gsap.set(panels[0], { autoAlpha: 1, y: 0 })
    panels.slice(1).forEach((p: HTMLElement) => gsap.set(p, { autoAlpha: 0, y: 26 }))

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stageEl.value,
        start: 'top top',
        end: () => `+=${COUNT * perProductScroll()}`,
        pin: true,
        scrub: 1,                         // the ONE scrubbed master timeline
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self: { progress: number }) => {
          const p = self.progress * COUNT
          counter.value = Math.min(COUNT - 1, Math.floor(p))
          // swap the console at each boundary's dimmed midpoint (direction-safe)
          const idx = Math.min(COUNT - 1, Math.max(0, Math.floor(p + 0.15)))
          if (idx !== displayIndex.value) displayIndex.value = idx
        },
      },
    })

    // timeline lives on a 0..COUNT "product-unit" clock; product i owns [i, i+1)
    for (let i = 0; i < COUNT; i++) {
      if (i > 0) tl.fromTo(panels[i], { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i - 0.3)
      if (i < COUNT - 1) {
        tl.to(panels[i], { autoAlpha: 0, y: -26, duration: 0.3, ease: 'power2.in' }, i + 0.7)
        // central dashboard morph: dip (blur+fade+scale) → swap at the bottom → rise
        if (cw) {
          tl.to(cw, { autoAlpha: 0.1, filter: 'blur(10px)', scale: 0.985, duration: 0.13, ease: 'power2.in' }, i + 0.72)
            .to(cw, { autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 0.15, ease: 'power2.out' }, i + 0.85)
        }
      }
    }
    return () => { /* mm.revert() tears the pin + trigger down */ }
  })

  // ---- MOBILE (<1024): no pin; panels flow normally (fallback, see <style>) ----
  mm.add('(max-width: 1023px)', () => {
    isDesktop.value = false
    panels.forEach((p: HTMLElement) => gsap.set(p, { clearProps: 'all' }))
    return () => {}
  })
})

onBeforeUnmount(() => {
  io?.disconnect()
  panelIO?.disconnect()
  mm?.revert()
})
</script>

<template>
  <section ref="stageEl" class="st" aria-label="SVARA intelligence systems">
    <div class="st__inner">
      <header class="st__head">
        <p class="sx-mono st__eyebrow">Flagship Systems</p>
        <p class="sx-mono st__counter">
          <span class="st__counter-now">{{ String(counter + 1).padStart(2, '0') }}</span>
          <span class="st__counter-sep">/</span>{{ String(COUNT).padStart(2, '0') }}
        </p>
      </header>

      <div class="st__body">
        <!-- editorial panels: one per product, crossfaded by the timeline (desktop)
             or flowed normally (mobile) -->
        <div ref="panelsWrap" class="st__panels">
          <article v-for="(p, i) in products" :key="p.name" class="st__panel" :data-index="i">
            <p class="sx-mono st__plabel">
              <span class="st__pdot" />{{ p.cluster }} · System {{ String(i + 1).padStart(2, '0') }}
            </p>
            <h2 class="st__pname sx-lift-lg">{{ p.name }}</h2>
            <p class="st__pcopy sx-lift">{{ p.description }}</p>
            <ul class="st__kpis">
              <li v-for="m in p.metrics" :key="m.label" class="st__kpi">
                <span class="st__kpi-v">{{ m.value }}</span>
                <span class="sx-mono st__kpi-l">{{ m.label }}</span>
              </li>
            </ul>
            <NuxtLink :to="p.to" class="sx-btn sx-btn--primary st__cta">Explore {{ p.name }}</NuxtLink>

            <!-- mobile-only: the product's live console flows under its panel; only
                 the centred panel mounts one (v-if) so mobile never runs 10 at once -->
            <div v-if="!isDesktop" class="st__mconsole">
              <ClientOnly>
                <ProductConsoleMount v-if="mobileCurrent === i" :kind="p.kind" :active="stageActive" />
              </ClientOnly>
            </div>
          </article>
        </div>

        <!-- desktop centrepiece: ONE console that morphs kind → kind in place -->
        <div v-if="isDesktop" ref="consoleWrap" class="st__console">
          <ClientOnly>
            <ProductConsoleMount :kind="activeKind" :active="stageActive" />
          </ClientOnly>
        </div>
      </div>

      <div class="st__rail" aria-hidden="true">
        <span
          v-for="n in COUNT"
          :key="n"
          class="st__seg"
          :class="{ 'is-on': n - 1 === counter, 'is-past': n - 1 < counter }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.st { position: relative; }
.st__inner {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* 48–64px breathing room from the viewport edge on desktop */
  padding: 92px clamp(48px, 4vw, 64px) 36px;
}
@supports (height: 100svh) { .st__inner { min-height: 100svh; } }

.st__head { display: flex; align-items: center; justify-content: space-between; }
.st__eyebrow { font-size: 11px; color: var(--sx-navy-3); }
.st__counter { font-size: 13px; color: var(--sx-navy-3); letter-spacing: 0.14em; }
.st__counter-now { color: var(--sx-navy); font-weight: 600; }
.st__counter-sep { margin: 0 6px; opacity: 0.5; }

/* ---- desktop: panel column + console centrepiece ---- */
.st__body {
  flex: 1;
  min-height: 0;
  margin-top: clamp(12px, 2vh, 28px);
  display: grid;
  /* ~40% content · ~60% dashboard */
  grid-template-columns: minmax(0, 40fr) minmax(0, 60fr);
  gap: clamp(24px, 3.4vw, 56px);
  align-items: center;                 /* dashboard vertically centred to content */
}
.st__panels { position: relative; align-self: stretch; }
.st__panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;             /* single left axis for all panel items */
  max-width: 34rem;
}
/* pre-JS desktop state: only the first panel shows (GSAP autoAlpha then owns it),
   so the ten absolute panels never flash stacked before the timeline builds */
@media (min-width: 1024px) {
  .st__panel { opacity: 0; }
  .st__panel:first-child { opacity: 1; }
}
.st__plabel { display: inline-flex; align-items: center; gap: 8px; font-size: 10.5px; color: var(--sx-navy-3); }
.st__pdot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--sx-blue);
  box-shadow: 0 0 0 3px rgba(47, 127, 230, 0.16); animation: st-blink 2s var(--sx-ease) infinite;
}
.st__pname {
  margin: 12px 0 0;
  font-size: clamp(38px, 4.1vw, 62px); font-weight: 600;
  letter-spacing: -0.03em; line-height: 0.98; color: var(--sx-navy); text-wrap: balance;
}
.st__pcopy { margin: 14px 0 0; font-size: clamp(15px, 1.1vw, 18px); line-height: 1.55; color: rgba(19, 41, 91, 0.82); }
.st__kpis { list-style: none; margin: 18px 0 0; padding: 0; display: flex; gap: 20px; flex-wrap: wrap; }
.st__kpi { display: flex; flex-direction: column; gap: 3px; }
.st__kpi-v { font-size: 22px; font-weight: 700; color: var(--sx-navy); font-variant-numeric: tabular-nums; }
.st__kpi-l { font-size: 9px; color: var(--sx-navy-3); }
.st__cta { margin-top: 22px; align-self: flex-start; padding: 11px 22px; font-size: 13px; font-weight: 500; }

/* console centrepiece — the ProductConsoleMount renders a fixed 16:9 landscape
   canvas that scales to fit this 60% column (its own .cx supplies the frame), so
   the whole dashboard is visible, aspect-locked, never cropped. This is just a
   vertically-centred positioning wrapper that the GSAP morph tweens target. */
.st__console {
  position: relative;
  align-self: center;
  justify-self: stretch;
  width: 100%;
  min-width: 0;
  will-change: opacity, filter, transform;
}

/* progress rail */
.st__rail { display: flex; gap: 6px; margin-top: 24px; }
.st__seg { flex: 1; height: 3px; border-radius: 3px; background: rgba(19, 41, 91, 0.12); transition: background 0.4s var(--sx-ease); }
.st__seg.is-past { background: rgba(47, 127, 230, 0.4); }
.st__seg.is-on { background: var(--sx-blue); }

.st__mconsole { margin-top: 28px; }

@keyframes st-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

/* ---- mobile fallback (<1024): normal vertical flow, panel + its console ---- */
@media (max-width: 1023px) {
  .st__inner { min-height: 0; padding: 88px 20px 40px; }
  .st__body { display: block; margin-top: 24px; }
  .st__panels { position: static; }
  .st__panel {
    position: static;
    inset: auto;
    max-width: 100%;
    min-height: auto;
    padding: 40px 0;
    border-top: 1px solid var(--sx-border);
  }
  .st__panel:first-child { border-top: none; }
  .st__rail { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .st__pdot { animation: none; }
}
</style>
