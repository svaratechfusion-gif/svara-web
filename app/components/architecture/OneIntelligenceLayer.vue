<script setup lang="ts">
// ONE INTELLIGENCE LAYER — central SVARA Core connected to every platform.
// Intelligence packets flow bidirectionally along every pathway,
// reinforcing the shared-architecture concept. The core cycles the
// Intelligence Loop states. Copy is verbatim from the Content Bible
// (platform canonicalDefinition).
import { ref, onMounted } from 'vue'
import { PLATFORM_NODES } from '~/utils/architecture'
import { platformContent } from '~~/lib/content/platform'

const root = ref<HTMLElement>()
const hovered = ref<number | null>(null)

// ring-positioned platform nodes
const NODES = PLATFORM_NODES.map((n, i) => {
  const a = (i / PLATFORM_NODES.length) * Math.PI * 2 - Math.PI / 2
  return { ...n, i, x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 38 }
})

const coreWords = ['Observe', 'Understand', 'Predict', 'Coordinate', 'Improve']
const word = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
function start() {
  if (timer) return
  timer = setInterval(() => { word.value = (word.value + 1) % coreWords.length }, 2400)
}
function stop() { if (timer) { clearInterval(timer); timer = null } }

let observer: IntersectionObserver | null = null
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(([e]) => { if (e?.isIntersecting) start(); else stop() }, { threshold: 0.25 })
  if (root.value) observer.observe(root.value)
})
</script>

<template>
  <section ref="root" class="ol">
    <div class="ol__head">
      <p class="ol__eyebrow">One Intelligence Layer</p>
      <h2 class="ol__title">One shared architecture, not isolated products.</h2>
      <p class="ol__def">{{ platformContent.canonicalDefinition }}</p>
    </div>

    <div class="ol__stage" @mouseleave="hovered = null">
      <svg class="ol__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line v-for="n in NODES" :key="`w${n.i}`" x1="50" y1="50" :x2.attr="n.x" :y2.attr="n.y" class="ol__wire" :class="{ 'is-hot': hovered === n.i }" />
        <template v-for="n in NODES" :key="`p${n.i}`">
          <circle r="0.6" class="ol__packet ol__packet--out" :class="{ 'is-hot': hovered === n.i }" :style="{ offsetPath: `path('M50 50 L${n.x} ${n.y}')`, animationDelay: `${(-n.i * 0.34).toFixed(2)}s` }" />
          <circle r="0.6" class="ol__packet ol__packet--in" :class="{ 'is-hot': hovered === n.i }" :style="{ offsetPath: `path('M${n.x} ${n.y} L50 50')`, animationDelay: `${(-n.i * 0.34 - 1.5).toFixed(2)}s` }" />
        </template>
      </svg>

      <div class="ol__core" :class="{ 'is-hot': hovered !== null }">
        <span class="ol__core-ring" />
        <span class="ol__core-label">SVARA Core</span>
        <span class="ol__core-statewin">
          <Transition name="ol-word">
            <span :key="word" class="ol__core-state">{{ coreWords[word] }}</span>
          </Transition>
        </span>
      </div>

      <button
        v-for="n in NODES" :key="`n${n.i}`"
        class="ol__node"
        :class="{ 'is-hot': hovered === n.i, 'is-dim': hovered !== null && hovered !== n.i }"
        :style="{ left: n.x + '%', top: n.y + '%' }"
        @mouseenter="hovered = n.i"
        @focus="hovered = n.i"
      >{{ n.name }}</button>
    </div>
  </section>
</template>

<style scoped>
.ol { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.ol__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.ol__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ol__title { margin: 0 0 var(--space-6); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ol__def { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); max-width: 62ch; margin-inline: auto; }

.ol__stage { position: relative; width: min(760px, 90vw); aspect-ratio: 1.05/1; margin: var(--space-16) auto 0; }
.ol__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.ol__wire { stroke: var(--color-ink-strong); stroke-width: 0.5; vector-effect: non-scaling-stroke; opacity: 0.18; transition: opacity var(--motion-medium) var(--ease-smooth), stroke var(--motion-medium) var(--ease-smooth); }
.ol__wire.is-hot { stroke: var(--color-accent); opacity: 0.9; }
.ol__packet { fill: var(--color-accent); opacity: 0.45; animation: ol-flow 3.6s linear infinite; transition: opacity var(--motion-medium) var(--ease-smooth); }
.ol__packet--in { animation-direction: reverse; }
.ol__packet.is-hot { opacity: 1; }
@keyframes ol-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.ol__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: 160px; height: 160px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; background: var(--color-ink-strong); color: #fff; box-shadow: 0 24px 70px rgba(16, 42, 91, 0.28); transition: transform var(--motion-medium) var(--ease-out); }
.ol__core.is-hot { transform: translate(-50%, -50%) scale(1.05); }
.ol__core-ring { position: absolute; inset: -12px; border-radius: 50%; border: 1px solid var(--color-accent); opacity: 0.4; animation: ol-pulse 2.4s ease-in-out infinite; }
@keyframes ol-pulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.08); opacity: 0.08; } }
.ol__core-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.65; }
.ol__core-statewin { position: relative; height: 22px; width: 130px; overflow: hidden; }
.ol__core-state { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: var(--weight-semibold); color: #cfe2fb; }
.ol-word-enter-active, .ol-word-leave-active { transition: transform 0.5s var(--ease-out); }
.ol-word-enter-from { transform: translateY(100%); }
.ol-word-leave-to { transform: translateY(-100%); }

.ol__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; padding: 8px 14px; border-radius: var(--radius-pill); background: rgba(255,255,255,0.85); backdrop-filter: blur(10px); border: 1px solid var(--color-border); box-shadow: 0 6px 18px rgba(16, 42, 91, 0.08); font-size: 12px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; cursor: pointer; transition: transform var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-smooth), opacity var(--motion-medium) var(--ease-smooth); }
.ol__node.is-hot { transform: translate(-50%, -50%) scale(1.08); border-color: var(--color-accent); box-shadow: 0 10px 28px rgba(47, 127, 230, 0.2); }
.ol__node.is-dim { opacity: 0.45; }
.ol__node:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

@media (max-width: 860px) {
  .ol__stage { width: 100%; aspect-ratio: auto; display: flex; flex-direction: column; gap: var(--space-4); padding-inline: var(--container-pad); box-sizing: border-box; }
  .ol__wires { display: none; }
  .ol__core { position: static; transform: none; margin: 0 auto var(--space-6); }
  .ol__core.is-hot { transform: scale(1.04); }
  .ol__node { position: static; transform: none; text-align: center; }
  .ol__node.is-hot { transform: scale(1.04); }
  .ol__node.is-dim { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) { .ol__wire, .ol__packet, .ol__core-ring { animation: none; } }
</style>