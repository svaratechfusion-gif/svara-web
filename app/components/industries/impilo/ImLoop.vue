<script setup lang="ts">
// THE INTELLIGENCE LOOP — the page's scroll showpiece. The section pins and the six
// enterprise outcomes advance as you scroll through it, the line-art ring rotating
// with the same progress and a Clinical Cyan arc drawing around it.
//
// The sequence is SVARA's own (OUTCOMES in utils/industries-page) and the label under
// each stage is the shared workflow stage it sits at — both label-only, no claims.
//
// One ScrollTrigger, scrubbed; nothing runs on a rAF of its own.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { OUTCOMES, WORKFLOW_STAGES } from '~/utils/industries-page'

const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const p = ref(0)

const steps = computed(() =>
  OUTCOMES.map((name, i) => ({
    n: String(i + 1).padStart(2, '0'),
    name,
    stage: WORKFLOW_STAGES[Math.min(i, WORKFLOW_STAGES.length - 1)],
    a: (i / OUTCOMES.length) * Math.PI * 2 - Math.PI / 2,
  })),
)
const active = computed(() => Math.min(steps.value.length - 1, Math.floor(p.value * steps.value.length)))
const ringDash = computed(() => `${Math.max(0.001, p.value) * 534} 534`)

let st: ScrollTrigger | null = null
onMounted(() => {
  if (!root.value || !stage.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    p.value = 1
    return
  }
  st = ScrollTrigger.create({
    trigger: root.value,
    start: 'top top',
    end: 'bottom bottom',
    pin: stage.value,
    pinSpacing: false,
    scrub: true,
    onUpdate: self => (p.value = self.progress),
  })
})
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <section ref="root" class="im-loop" aria-labelledby="im-loop-t">
    <div ref="stage" class="im-loop__stage">
      <div class="im-loop__wrap">
        <div class="im-loop__copy">
          <p class="hx-eyebrow"><span class="hx-index">→</span> The Intelligence Loop</p>
          <h2 id="im-loop-t" class="hx-title">Every environment runs <span class="lite">the same loop.</span></h2>
          <ol class="im-loop__list">
            <li v-for="(s, i) in steps" :key="s.name" :class="{ 'is-on': i === active, 'is-done': i < active }">
              <span class="im-loop__n">{{ s.n }}</span>
              <span class="im-loop__name">{{ s.name }}</span>
              <span class="im-loop__stage-l">{{ s.stage }}</span>
            </li>
          </ol>
        </div>

        <!-- line-art only: no fills, thin stroke, Lilac Mist with the cyan arc -->
        <div class="im-loop__art" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="85" class="im-loop__ring" />
            <circle cx="100" cy="100" r="62" class="im-loop__ring im-loop__ring--in" stroke-dasharray="2 6" />
            <circle
              cx="100" cy="100" r="85" class="im-loop__arc"
              :stroke-dasharray="ringDash" transform="rotate(-90 100 100)"
            />
            <g class="im-loop__nodes">
              <circle
                v-for="(s, i) in steps" :key="s.n"
                :cx="100 + 85 * Math.cos(s.a)" :cy="100 + 85 * Math.sin(s.a)"
                r="4.5" :class="{ 'is-on': i <= active }"
              />
            </g>
            <text x="100" y="97" text-anchor="middle" class="im-loop__art-n">{{ steps[active].n }}</text>
            <text x="100" y="116" text-anchor="middle" class="im-loop__art-l">{{ steps[active].name }}</text>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
