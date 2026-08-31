<script setup lang="ts">
// CONNECTED PLATFORM ARCHITECTURE — a central SVARA Core with all ten
// platforms connected around it. Animated intelligence packets flow both
// ways along every pathway, showing the shared architecture rather than
// isolated products. Hovering a node brightens its pathway and lifts the
// core. Conveys orchestration / AI reasoning / workflow execution.
// Definition copy is verbatim from the Content Bible (platform content
// canonicalDefinition). White ground, navy accents.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { PLATFORMS } from '~/utils/platforms'
import { platformContent } from '~~/lib/content/platform'

const root = ref<HTMLElement>()
const hovered = ref<number | null>(null)
const def = platformContent.canonicalDefinition

// ten nodes on a ring; core at center
const NODES = PLATFORMS.map((p, i) => {
  const a = (i / PLATFORMS.length) * Math.PI * 2 - Math.PI / 2
  return { i, name: p.name, cap: p.capability, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 }
})

const coreWords = ['Observing', 'Understanding', 'Reasoning', 'Automating', 'Optimizing']
const word = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null
function start() { timer = setInterval(() => { word.value = (word.value + 1) % coreWords.length }, 2600) }
function stop() { if (timer) clearInterval(timer); timer = null }

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(([e]) => { if (e?.isIntersecting) start(); else stop() }, { threshold: 0.25 })
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => { stop(); observer?.disconnect() })
</script>

<template>
  <section ref="root" class="pa">
    <div class="pa__head">
      <p class="pa__eyebrow">Connected Architecture</p>
      <h2 class="pa__title">One core. Ten platforms. A single intelligence.</h2>
      <p class="pa__def">{{ def }}</p>
    </div>

    <div class="pa__stage" @mouseleave="hovered = null">
      <svg class="pa__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line
          v-for="n in NODES" :key="`w${n.i}`"
          x1="50" y1="50" :x2.attr="n.x" :y2.attr="n.y"
          class="pa__wire" :class="{ 'is-hot': hovered === n.i }"
        />
        <template v-for="n in NODES" :key="`p${n.i}`">
          <circle
r="0.6" class="pa__packet pa__packet--out"
            :class="{ 'is-hot': hovered === n.i }"
            :style="{ offsetPath: `path('M50 50 L${n.x} ${n.y}')`, animationDelay: `${(-n.i * 0.34).toFixed(2)}s` }"
          />
          <circle
r="0.6" class="pa__packet pa__packet--in"
            :class="{ 'is-hot': hovered === n.i }"
            :style="{ offsetPath: `path('M${n.x} ${n.y} L50 50')`, animationDelay: `${(-n.i * 0.34 - 1.5).toFixed(2)}s` }"
          />
        </template>
      </svg>

      <div class="pa__core" :class="{ 'is-hot': hovered !== null }">
        <span class="pa__core-ring" />
        <span class="pa__core-label">SVARA Core</span>
        <span class="pa__core-wordwin">
          <Transition name="pa-word">
            <span :key="word" class="pa__core-word">{{ coreWords[word] }}</span>
          </Transition>
        </span>
      </div>

      <button
        v-for="n in NODES" :key="`n${n.i}`"
        class="pa__node"
        :class="{ 'is-hot': hovered === n.i, 'is-dim': hovered !== null && hovered !== n.i }"
        :style="{ left: n.x + '%', top: n.y + '%' }"
        @mouseenter="hovered = n.i"
        @focus="hovered = n.i"
      >
        <span class="pa__node-cap">{{ n.cap }}</span>
        <span class="pa__node-name">{{ n.name }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.pa {
  background: #F8FBFF;
  padding: var(--space-32) var(--container-pad);
}
.pa__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.pa__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.pa__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1;
  letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.pa__def {
  margin: var(--space-6) auto 0;
  max-width: 60ch;
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

.pa__stage {
  position: relative;
  width: min(780px, 90vw);
  aspect-ratio: 1.05 / 1;
  margin: var(--space-16) auto 0;
}
.pa__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.pa__wire {
  stroke: var(--color-ink-strong); stroke-width: 1; vector-effect: non-scaling-stroke;
  opacity: 0.18;
  transition: opacity var(--motion-medium) var(--ease-smooth), stroke var(--motion-medium) var(--ease-smooth);
}
.pa__wire.is-hot { stroke: var(--color-accent); opacity: 0.9; }
.pa__packet { fill: var(--color-accent); opacity: 0.45; animation: pa-flow 3.6s linear infinite; transition: opacity var(--motion-medium) var(--ease-smooth); }
.pa__packet--in { animation-direction: reverse; }
.pa__packet.is-hot { opacity: 1; }
@keyframes pa-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.pa__core {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  z-index: 3;
  width: 160px; height: 160px; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  background: var(--color-ink-strong); color: #fff;
  box-shadow: 0 20px 60px rgba(16, 42, 91, 0.24);
  transition: transform var(--motion-medium) var(--ease-out);
}
.pa__core.is-hot { transform: translate(-50%, -50%) scale(1.05); }
.pa__core-ring {
  position: absolute; inset: -10px; border-radius: 50%;
  border: 1px solid var(--color-accent); opacity: 0.4;
  animation: pa-pulse 1.9s ease-in-out infinite;
}
@keyframes pa-pulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.08); opacity: 0.1; } }
.pa__core-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.7; }
.pa__core-wordwin { position: relative; height: 22px; width: 140px; overflow: hidden; }
.pa__core-word { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: var(--weight-semibold); color: #cfe2fb; }
.pa-word-enter-active, .pa-word-leave-active { transition: transform 0.5s var(--ease-out); }
.pa-word-enter-from { transform: translateY(100%); }
.pa-word-leave-to { transform: translateY(-100%); }

.pa__node {
  position: absolute; transform: translate(-50%, -50%);
  z-index: 2;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 9px 14px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  box-shadow: 0 6px 18px rgba(16, 42, 91, 0.08);
  cursor: pointer;
  transition: transform var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-smooth), opacity var(--motion-medium) var(--ease-smooth);
}
.pa__node.is-hot { transform: translate(-50%, -50%) scale(1.08); border-color: var(--color-accent); box-shadow: 0 10px 28px rgba(47, 127, 230, 0.2); }
.pa__node.is-dim { opacity: 0.45; }
.pa__node-cap { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); }
.pa__node-name { font-size: 12.5px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; }
.pa__node:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

@media (max-width: 860px) {
  .pa__stage { width: 100%; aspect-ratio: auto; display: flex; flex-direction: column; gap: var(--space-5); padding-inline: var(--container-pad); box-sizing: border-box; }
  .pa__wires { display: none; }
  .pa__core { position: static; transform: none; margin: 0 auto var(--space-6); }
  .pa__core.is-hot { transform: scale(1.04); }
  .pa__node { position: static; transform: none; flex-direction: row; gap: 8px; }
  .pa__node.is-hot { transform: scale(1.04); }
  .pa__node.is-dim { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .pa__packet, .pa__core-ring { animation: none; }
}
</style>