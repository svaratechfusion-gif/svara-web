<script setup lang="ts">
// BUILDING COMPLETE ENTERPRISE SOLUTIONS — animate one enterprise use case
// showing multiple divisions working together from problem to business
// outcome. As the reader scrolls, the flow lights up stage by stage; each
// stage names the division driving it (its engineering surface). Framing
// copy is verbatim from the Content Bible (homeSection04.paragraphs[1]).
// Motion represents cross-division collaboration and deployment.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { SOLUTION_FLOW } from '~/utils/divisions'
import { homeSection04 } from '~~/lib/content/home'

const root = ref<HTMLElement>()
const progress = ref(0)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { progress.value = 1; return }
  st = ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 72%',
    end: 'bottom 75%',
    scrub: true,
    onUpdate: (self) => { progress.value = self.progress },
  })
})
onBeforeUnmount(() => { st?.kill() })

const reached = (i: number) => progress.value * SOLUTION_FLOW.length > i
</script>

<template>
  <section ref="root" class="sf">
    <div class="sf__head">
      <p class="sf__eyebrow">Building Complete Enterprise Solutions</p>
      <h2 class="sf__title">One problem. Every division. One outcome.</h2>
      <p class="sf__frame">{{ homeSection04.paragraphs[1] }}</p>
    </div>

    <div class="sf__flow">
      <div class="sf__rail" :style="{ '--p': progress }" />
      <div
        v-for="(s, i) in SOLUTION_FLOW" :key="i"
        class="sf__step"
        :class="{ 'is-on': reached(i), 'is-end': i === SOLUTION_FLOW.length - 1, 'is-start': i === 0 }"
      >
        <span class="sf__dot" />
        <div class="sf__card">
          <span class="sf__stage">{{ s.stage }}</span>
          <span class="sf__division">{{ s.division }}</span>
        </div>
      </div>
    </div>

    <div class="sf__legend">
      <span><i class="sf__legend-dot sf__legend-dot--problem" /> Problem</span>
      <span><i class="sf__legend-dot sf__legend-dot--division" /> Division</span>
      <span><i class="sf__legend-dot sf__legend-dot--outcome" /> Business outcome</span>
    </div>
  </section>
</template>

<style scoped>
.sf { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.sf__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.sf__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.sf__title {
  margin: 0 0 var(--space-6);
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.sf__frame { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); max-width: 64ch; margin-inline: auto; }

.sf__flow {
  position: relative;
  max-width: 1180px; margin: var(--space-20) auto 0;
  display: grid; gap: var(--space-5);
  padding-left: 28px;
}
.sf__rail { position: absolute; left: 8px; top: 8px; bottom: 8px; width: 2px; background: rgba(16, 42, 91, 0.12); }
.sf__rail::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: calc(var(--p, 0) * 100%); background: linear-gradient(var(--color-ink-strong), var(--color-accent)); transition: height 0.1s linear; transform-origin: bottom; }

.sf__step { position: relative; display: flex; align-items: center; gap: var(--space-5); }
.sf__dot { position: absolute; left: -28px; width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: background var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out); }
.sf__step.is-on .sf__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.sf__step.is-start.is-on .sf__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.sf__step.is-end.is-on .sf__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }

.sf__card {
  display: flex; flex-direction: column; gap: 4px;
  padding: 14px 18px; border-radius: var(--radius-md);
  background: #fff; border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(16, 42, 91, 0.04);
  width: 100%; max-width: 560px;
  opacity: 0.5; transform: translateX(-6px);
  transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-smooth);
}
.sf__step.is-on .sf__card { opacity: 1; transform: translateX(0); border-color: rgba(47, 127, 230, 0.4); box-shadow: 0 8px 24px rgba(16, 42, 91, 0.1); }
.sf__stage { font-size: 11px; font-family: var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); }
.sf__division { font-size: clamp(17px, 1.8vw, 22px); font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.sf__step.is-end .sf__division { color: var(--color-accent); }

.sf__legend { display: flex; gap: var(--space-8); justify-content: center; margin-top: var(--space-12); flex-wrap: wrap; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-faint); }
.sf__legend span { display: inline-flex; align-items: center; gap: 7px; }
.sf__legend-dot { width: 9px; height: 9px; border-radius: 50%; }
.sf__legend-dot--problem { background: var(--color-ink-strong); }
.sf__legend-dot--division { background: var(--color-accent); }
.sf__legend-dot--outcome { background: var(--color-accent); box-shadow: 0 0 0 3px rgba(47, 127, 230, 0.18); }

@media (max-width: 768px) { .sf__flow { padding-left: 22px; } .sf__dot { left: -22px; } }
</style>