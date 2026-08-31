<script setup lang="ts">
// WHY SPECIALIZED DIVISIONS MATTER — replace long text blocks with a visual
// transformation story: Enterprise Transformation → AI → Engineering →
// Cloud → Simulation → Growth → One Connected Organization. The two
// Content Bible paragraphs render verbatim as framing copy; the pipeline
// animates left-to-right as the reader scrolls — a transformation, not a
// card grid. Motion represents enterprise transformation & collaboration.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { homeSection04 } from '~~/lib/content/home'
import { TRANSFORM_PIPELINE } from '~/utils/divisions'

const root = ref<HTMLElement>()
const progress = ref(0)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { progress.value = 1; return }
  st = ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 75%',
    end: 'bottom 70%',
    scrub: true,
    onUpdate: (self) => { progress.value = self.progress },
  })
})
onBeforeUnmount(() => { st?.kill() })

const reached = (i: number) => progress.value * TRANSFORM_PIPELINE.length > i
</script>

<template>
  <section ref="root" class="ts">
    <div class="ts__head">
      <p class="ts__eyebrow">Why Specialized Divisions Matter</p>
      <h2 class="ts__title">From one organization to a connected engine.</h2>
      <div class="ts__copy">
        <p v-for="(p, i) in homeSection04.paragraphs" :key="i">{{ p }}</p>
      </div>
    </div>

    <div class="ts__pipe">
      <div class="ts__rail" :style="{ '--p': progress }" />
      <div
        v-for="(s, i) in TRANSFORM_PIPELINE" :key="s.stage"
        class="ts__node"
        :class="{ 'is-on': reached(i), 'is-final': i === TRANSFORM_PIPELINE.length - 1 }"
      >
        <span class="ts__dot" />
        <span class="ts__stage">{{ s.stage }}</span>
        <span class="ts__tag">{{ s.tag }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ts {
  background: #F8FBFF;
  padding: var(--space-32) var(--container-pad);
}
.ts__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.ts__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.ts__title {
  margin: 0 0 var(--space-8);
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1;
  letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.ts__copy { display: flex; flex-direction: column; gap: var(--space-4); max-width: 62ch; margin-inline: auto; text-align: left; }
.ts__copy p { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.ts__pipe {
  position: relative;
  max-width: 1180px; margin: var(--space-20) auto 0;
  display: flex; align-items: flex-start; justify-content: space-between;
  padding-top: 22px;
}
.ts__rail {
  position: absolute; left: 0; right: 0; top: 22px; height: 2px;
  background: rgba(16, 42, 91, 0.1);
}
.ts__rail::after {
  content: ""; position: absolute; left: 0; top: 0; height: 100%;
  width: calc(var(--p, 0) * 100%);
  background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong));
  transition: width 0.1s linear;
}
.ts__node {
  position: relative; flex: 1; display: flex; flex-direction: column; align-items: center;
  gap: 8px; text-align: center; opacity: 0.35;
  transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out);
}
.ts__node.is-on { opacity: 1; }
.ts__node.is-final { transform: scale(1.05); }
.ts__dot {
  position: absolute; top: -22px; width: 14px; height: 14px; border-radius: 50%;
  background: #fff; border: 2px solid var(--color-border-strong);
  transition: background var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out);
}
.ts__node.is-on .ts__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.ts__node.is-final .ts__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.ts__stage {
  font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-ink-strong);
  letter-spacing: -0.01em; max-width: 12ch;
}
.ts__node.is-final .ts__stage { color: var(--color-accent); font-weight: var(--weight-bold); }
.ts__tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); }

@media (max-width: 768px) {
  .ts__pipe { flex-direction: column; gap: var(--space-6); align-items: flex-start; padding-top: 0; }
  .ts__rail { display: none; }
  .ts__node { flex-direction: row; align-items: center; gap: 10px; }
  .ts__dot { position: static; }
}
</style>