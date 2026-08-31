<script setup lang="ts">
// ONE ENGINEERING PHILOSOPHY — the shared engineering backbone that unifies
// the six studios: Shared Architecture → Shared Security → Shared Data
// Layer → Shared Intelligence → Shared Experience — all converging into
// the SVARA Core. Framing copy is verbatim from the Content Bible
// (homeSection04.paragraphs[1]). Motion represents synchronization and
// convergence onto the shared core, not decoration.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { SHARED_BACKBONE } from '~/utils/divisions'
import { homeSection04 } from '~~/lib/content/home'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = SHARED_BACKBONE.length - 1; return }
  st = ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 65%',
    end: 'bottom 60%',
    scrub: true,
    onUpdate: (self) => { active.value = Math.floor(self.progress * SHARED_BACKBONE.length) },
  })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="op">
    <div class="op__head">
      <p class="op__eyebrow">One Engineering Philosophy</p>
      <h2 class="op__title">A shared backbone beneath every studio.</h2>
      <p class="op__frame">{{ homeSection04.paragraphs[1] }}</p>
    </div>

    <div class="op__viz">
      <svg class="op__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line
          v-for="(l, i) in SHARED_BACKBONE" :key="i"
          :x1.attr="50" :y1.attr="0" :x2.attr="50" :y2.attr="100"
          class="op__wire" :class="{ 'is-hot': active >= i }"
        />
      </svg>

      <div class="op__layers">
        <div
          v-for="(l, i) in SHARED_BACKBONE" :key="l"
          class="op__layer"
          :class="{ 'is-hot': active >= i }"
        >
          <span class="op__layer-dot" />
          <span class="op__layer-name">{{ l }}</span>
          <span class="op__layer-line" />
        </div>
      </div>

      <div class="op__core" :class="{ 'is-hot': active >= SHARED_BACKBONE.length }">
        <span class="op__core-ring" />
        <span class="op__core-label">SVARA Core</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.op { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.op__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.op__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.op__title {
  margin: 0 0 var(--space-6);
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.op__frame { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); max-width: 64ch; margin-inline: auto; }

.op__viz { position: relative; width: min(720px, 92vw); margin: var(--space-16) auto 0; aspect-ratio: 1 / 1.05; }
.op__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0; }
.op__wire { stroke: var(--color-ink-strong); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.16; transition: opacity var(--motion-medium) var(--ease-smooth), stroke var(--motion-medium) var(--ease-smooth); }
.op__wire.is-hot { stroke: var(--color-accent); opacity: 0.7; }

.op__layers { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 6% var(--container-pad); box-sizing: border-box; }
.op__layer {
  display: flex; align-items: center; gap: var(--space-4);
  padding: 12px 16px; border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(8px);
  border: 1px solid var(--color-border); align-self: center; max-width: 320px;
  opacity: 0.55; transition: opacity var(--motion-medium) var(--ease-smooth), border-color var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out);
}
.op__layer.is-hot { opacity: 1; border-color: var(--color-accent); transform: translateX(8px); }
.op__layer-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--color-text-faint); transition: background var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out); }
.op__layer.is-hot .op__layer-dot { background: var(--color-accent); box-shadow: 0 0 0 4px rgba(47, 127, 230, 0.16); }
.op__layer-name { font-size: 15px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.op__layer-line { flex: 1; height: 1px; background: var(--color-border); }

.op__core {
  position: absolute; left: 50%; bottom: -4%; transform: translateX(-50%);
  z-index: 3;
  padding: 14px 26px; border-radius: var(--radius-pill);
  background: var(--color-ink-strong); color: #fff;
  box-shadow: 0 20px 56px rgba(16, 42, 91, 0.22);
  transition: transform var(--motion-medium) var(--ease-out);
}
.op__core.is-hot { transform: translateX(-50%) scale(1.06); }
.op__core-ring { position: absolute; inset: -7px; border-radius: var(--radius-pill); border: 1px solid var(--color-accent); opacity: 0; transition: opacity var(--motion-medium) var(--ease-smooth); }
.op__core.is-hot .op__core-ring { opacity: 0.5; animation: op-pulse 2s ease-in-out infinite; }
@keyframes op-pulse { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.05); opacity: 0.1; } }
.op__core-label { position: relative; z-index: 1; font-size: 15px; font-weight: var(--weight-semibold); letter-spacing: -0.01em; }

@media (max-width: 768px) {
  .op__viz { aspect-ratio: auto; height: auto; }
  .op__wires { display: none; }
  .op__layers { position: static; inset: auto; gap: var(--space-4); padding: 0; }
  .op__layer { align-self: stretch; max-width: none; }
  .op__layer.is-hot { transform: none; }
  .op__core { position: static; transform: none; margin-top: var(--space-6); }
  .op__core.is-hot { transform: scale(1.04); }
}
</style>