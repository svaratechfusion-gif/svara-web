<script setup lang="ts">
// HORIZONTAL PRODUCT JOURNEY — one cinematic full-screen experience per
// platform, Apple-style snap scrolling. As each platform snaps into view
// its purpose, mock UI and interaction animate in. A progress rail on the
// left tracks the active platform — the reader is navigating the
// operating system of the future, not browsing a grid. Copy is verbatim
// from the Content Bible via platforms.ts.
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger  } from '~~/lib/gsap'
import { PLATFORMS } from '~/utils/platforms'

const root = ref<HTMLElement>()
const rail = ref<HTMLElement>()
const active = ref(0)

const st: ScrollTrigger[] = []

onMounted(() => {
  const panels = root.value!.querySelectorAll<HTMLElement>('.pj-panel')
  panels.forEach((panel, i) => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const q = gsap.utils.selector(panel)
      gsap.set(q('.pj-rise'), { opacity: 0, y: 36 })
      const t = ScrollTrigger.create({
        trigger: panel,
        start: 'top 55%',
        end: 'bottom center',
        onEnter: () => gsap.to(q('.pj-rise'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }),
        onEnterBack: () => gsap.to(q('.pj-rise'), { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }),
        onLeaveBack: () => gsap.set(q('.pj-rise'), { opacity: 0, y: 36 }),
      })
      st.push(t)
    }
    // active-panel detection
    const io = new IntersectionObserver(([e]) => {
      if (e && e.isIntersecting && e.intersectionRatio > 0.55) active.value = i
    }, { threshold: [0.55, 0.75] })
    io.observe(panel)
    panel.dataset.io = String(i)
  })
})

onBeforeUnmount(() => { st.forEach(t => t.kill()) })

// a deterministic "wireframe UI" per panel — purely representational
const uiRows = (i: number) => {
  const n = 4 + (i % 3)
  return Array.from({ length: n }, (_, k) => 30 + ((i * 7 + k * 13) % 60))
}
</script>

<template>
  <section ref="root" class="pj">
    <!-- progress rail -->
    <div ref="rail" class="pj-rail" aria-hidden="true">
      <div
        v-for="(p, i) in PLATFORMS" :key="i"
        class="pj-rail__item" :class="{ 'is-on': active === i }"
      >
        <span class="pj-rail__dot" />
        <span class="pj-rail__num">{{ String(i + 1).padStart(2, '0') }}</span>
      </div>
    </div>

    <div class="pj-track">
      <article
        v-for="(p, i) in PLATFORMS" :key="p.name"
        class="pj-panel"
        :style="{ '--i': i }"
      >
        <div class="pj-panel__inner">
          <div class="pj-copy">
            <div class="pj-rise pj-meta">
              <span class="pj-cap">{{ p.capability }} Platform</span>
              <span class="pj-num">{{ String(i + 1).padStart(2, '0') }} / {{ String(PLATFORMS.length).padStart(2, '0') }}</span>
            </div>
            <h2 class="pj-rise pj-name">{{ p.name }}</h2>
            <p class="pj-rise pj-desc">{{ p.description }}</p>
            <NuxtLink class="pj-rise pj-cta" :to="p.to">
              <span>Launch {{ p.name }}</span>
              <span class="pj-cta__arrow" aria-hidden="true">→</span>
            </NuxtLink>
          </div>

          <div class="pj-ui pj-rise" aria-hidden="true">
            <div class="pj-ui__bar">
              <span class="pj-ui__dots"><i /><i /><i /></span>
              <span class="pj-ui__title">{{ p.name }}</span>
              <span class="pj-ui__tag">RUNTIME</span>
            </div>
            <div class="pj-ui__body">
              <div class="pj-ui__metric">
                <span class="pj-ui__ml">Throughput</span>
                <div class="pj-ui__spark">
                  <span v-for="(h, k) in uiRows(i)" :key="k" :style="{ height: h + '%' }" />
                </div>
              </div>
              <div class="pj-ui__grid">
                <div v-for="m in p.metrics" :key="m.label" class="pj-ui__cell">
                  <span class="pj-ui__cl">{{ m.label }}</span>
                  <span class="pj-ui__cv">{{ m.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.pj {
  position: relative;
  background: #F8FBFF;
  scroll-snap-type: y mandatory;
}
.pj-track { scroll-snap-type: y mandatory; }
.pj-panel {
  height: 100vh;
  min-height: 620px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  padding: var(--space-20) var(--container-pad);
  box-sizing: border-box;
  border-bottom: 1px solid rgba(16, 42, 91, 0.06);
}
.pj-panel:nth-child(even) { background: #F1F6FE; }
.pj-panel__inner {
  width: 100%;
  max-width: 1180px;
  margin-inline: auto;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

/* ---- rail ---- */
.pj-rail {
  position: fixed;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pj-rail__item { display: flex; align-items: center; gap: 9px; opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth); }
.pj-rail__item.is-on { opacity: 1; }
.pj-rail__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-ink-strong); transition: transform var(--motion-medium) var(--ease-out); }
.pj-rail__item.is-on .pj-rail__dot { transform: scale(1.5); background: var(--color-accent); }
.pj-rail__num { font-family: var(--font-mono); font-size: 10px; color: var(--color-ink-strong); letter-spacing: 0.08em; }

/* ---- copy ---- */
.pj-copy { max-width: 30ch; }
.pj-meta { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6); }
.pj-cap { font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.pj-num { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-faint); }
.pj-name {
  margin: 0;
  font-size: clamp(44px, 6vw, 88px);
  font-weight: var(--weight-extrabold);
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: var(--color-ink-strong);
}
.pj-desc {
  margin: var(--space-6) 0 0;
  font-size: clamp(18px, 1.5vw, 22px);
  line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.pj-cta {
  display: inline-flex; align-items: center; gap: 10px;
  margin-top: var(--space-8);
  font-size: 15px; font-weight: var(--weight-semibold);
  color: var(--color-accent); text-decoration: none;
}
.pj-cta__arrow { transition: transform var(--motion-medium) var(--ease-smooth); }
.pj-cta:hover .pj-cta__arrow { transform: translateX(5px); }

/* ---- mock UI ---- */
.pj-ui {
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 40px 90px rgba(16, 42, 91, 0.1);
  overflow: hidden;
}
.pj-ui__bar { display: flex; align-items: center; gap: var(--space-3); padding: 12px 16px; background: #F4F7FC; border-bottom: 1px solid var(--color-border); }
.pj-ui__dots { display: inline-flex; gap: 6px; }
.pj-ui__dots i { width: 10px; height: 10px; border-radius: 50%; background: rgba(16, 42, 91, 0.16); }
.pj-ui__title { flex: 1; font-size: 12px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.pj-ui__tag { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.12em; color: var(--color-accent); }
.pj-ui__body { padding: var(--space-8); }
.pj-ui__metric { display: flex; flex-direction: column; gap: 10px; margin-bottom: var(--space-6); }
.pj-ui__ml { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); }
.pj-ui__spark { display: flex; align-items: flex-end; gap: 5px; height: 70px; }
.pj-ui__spark span { flex: 1; background: linear-gradient(var(--color-accent), var(--color-ink-strong)); border-radius: 3px 3px 0 0; animation: pj-spark var(--tick, 2.6s) ease-in-out infinite alternate; }
.pj-ui__spark span:nth-child(even) { animation-delay: -1.3s; }
@keyframes pj-spark { 0% { transform: scaleY(0.7); } 100% { transform: scaleY(1); } }
.pj-ui__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); border-top: 1px dashed var(--color-border); padding-top: var(--space-5); }
.pj-ui__cell { display: flex; flex-direction: column; gap: 4px; }
.pj-ui__cl { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-faint); }
.pj-ui__cv { font-size: 18px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }

@media (max-width: 1024px) {
  .pj-panel { height: auto; min-height: 0; padding: var(--space-20) var(--container-pad); scroll-snap-align: none; }
  .pj-track { scroll-snap-type: none; }
  .pj { scroll-snap-type: none; }
  .pj-panel__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .pj-rail { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .pj-ui__spark span { animation: none; }
}
</style>