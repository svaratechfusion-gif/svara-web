<script setup lang="ts">
// SHARED TECHNOLOGY SECTION — a byte-exact clone of the TecLayers master row
// (`.tlay`). Same margin-based spacing, same marker at top:8px, same 0.86/1.14
// two-column grid, same INSTRUMENT frame + white .tsec__viz surface, same reveal.
// It renders NO timeline rail and NO container — those are supplied by the page
// wrapper (.tflow in technology.vue), exactly as TecLayers supplies them via
// .tly / .tly__chapters / .tly__pathway — so 06+ share ONE continuous timeline
// and are structurally identical to 01–03. TecLayers itself is never touched.
import { onBeforeUnmount, onMounted, ref } from 'vue'

withDefaults(defineProps<{
  n: string
  eyebrow: string
  headline: string[]
  body?: string
  techs?: string[]
  reversed?: boolean
  label?: string
  anchor?: string
}>(), { reversed: false })

const root = ref<HTMLElement | null>(null)
const revealed = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!root.value) return
  observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      revealed.value = true
      observer?.disconnect()
    }
  }, { rootMargin: '0px 0px -35% 0px', threshold: 0.06 })
  observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <article ref="root" :id="anchor" class="tsec" :class="{ 'is-revealed': revealed, 'tsec--rev': reversed }">
    <div class="tsec__marker" aria-hidden="true"><span class="tsec__node" /></div>
    <div class="tsec__grid">
      <div class="tsec__copy">
        <p class="tsec__eyebrow hx-mono-label"><span class="tsec__n">{{ n }}</span> // {{ eyebrow }}</p>
        <h3 class="tsec__name">
          <span v-for="(line, k) in headline" :key="k" :class="{ lite: k > 0 }">{{ line }}<br v-if="k < headline.length - 1"></span>
        </h3>
        <p v-if="body" class="tsec__body">{{ body }}</p>
        <ul v-if="techs && techs.length" class="tsec__techs"><li v-for="t in techs" :key="t">{{ t }}</li></ul>
        <slot name="copy-extra" />
      </div>

      <div class="tsec__frame">
        <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
        <div class="tsec__frame-bar">
          <span class="hx-mono"><span class="hx-dot" /> SVARA · {{ (label || eyebrow).toUpperCase() }} / L{{ n }}</span>
          <span class="hx-mono-label">INSTRUMENT</span>
        </div>
        <div class="tsec__viz"><slot /></div>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ↓ values copied verbatim from TecLayers .tlay* (the 01–03 master) */
.tsec { position: relative; padding-left: 34px; margin-bottom: clamp(80px, 10vw, 150px); scroll-margin-top: 100px; }
.tsec:last-child { margin-bottom: 0; }
.tsec__marker { position: absolute; left: 0; top: 8px; }
.tsec__node { display: block; width: 12px; height: 12px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); transition: all var(--motion-medium) var(--ease-out); }
.tsec.is-revealed .tsec__node { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.16); }

.tsec__grid { display: grid; grid-template-columns: 0.86fr 1.14fr; gap: clamp(32px, 4vw, 72px); align-items: center; opacity: 0; transform: translateY(26px); transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out); }
.tsec.is-revealed .tsec__grid { opacity: 1; transform: none; }
.tsec--rev .tsec__copy { order: 2; }

.tsec__eyebrow { display: flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.tsec__n { color: var(--sig); }
.tsec__name { margin: 14px 0 0; font-size: clamp(32px, 4.2vw, 62px); font-weight: 600; letter-spacing: -0.03em; line-height: 0.98; color: var(--ink-primary); }
.tsec__name .lite { color: var(--ink-secondary); }
.tsec__body { margin: 20px 0 0; max-width: 44ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.tsec__techs { list-style: none; margin: 24px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 7px 8px; }
.tsec__techs li { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; color: var(--ink-secondary); padding: 4px 10px; border: 1px solid rgba(20,34,63,0.14); border-radius: var(--radius-pill); background: rgba(255,255,255,0.44); }

.tsec__frame { position: relative; padding: 12px; background: linear-gradient(158deg, rgba(255,255,255,0.44), rgba(255,255,255,0.22)); border: 1px solid rgba(20,34,63,0.14); box-shadow: 0 40px 90px -50px rgba(16,42,91,0.34), inset 0 1px 0 rgba(255,255,255,0.6); clip-path: polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
.tsec__frame-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 3px 8px 12px; }
.tsec__frame-bar .hx-mono { display: inline-flex; align-items: center; gap: 8px; font-size: 9.5px; letter-spacing: 0.1em; color: var(--ink-primary); }
.tsec__frame-bar .hx-mono-label { color: var(--ink-muted); }
.tsec__viz { position: relative; border-radius: 12px; overflow: hidden; background: #fff; border: 1px solid rgba(20,34,63,0.08); min-height: 320px; padding: 20px; }
.tsec:not(.is-revealed) .tsec__viz *, .tsec:not(.is-revealed) .tsec__viz { animation-play-state: paused !important; }

@media (max-width: 1024px) {
  .tsec__grid { grid-template-columns: 1fr; gap: 28px; }
  .tsec--rev .tsec__copy { order: 0; }
}
@media (max-width: 760px) { .tsec { padding-left: 24px; } }
@media (prefers-reduced-motion: reduce) { .tsec__grid { transition: none; } .tsec__viz *, .tsec__viz { animation: none !important; } }
</style>
