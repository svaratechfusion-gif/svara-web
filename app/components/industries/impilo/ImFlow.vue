<script setup lang="ts">
// THE CROSS-INDUSTRY FLOW — the reference's icon-prefixed row treatment stretched
// into a horizontal timeline, with a Clinical Cyan signal travelling the rail as the
// section scrolls. Six stages, label-only, verbatim from WORKFLOW_STAGES.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { WORKFLOW_STAGES } from '~/utils/industries-page'
import ImIcon from './ImIcon.vue'

const ICONS = ['grid', 'sensor', 'cpu', 'eye', 'bolt', 'target']
const root = ref<HTMLElement | null>(null)
const p = ref(0)

let st: ScrollTrigger | null = null
onMounted(() => {
  if (!root.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    p.value = 1
    return
  }
  st = ScrollTrigger.create({
    trigger: root.value,
    start: 'top 78%',
    end: 'bottom 55%',
    scrub: true,
    onUpdate: self => (p.value = self.progress),
  })
})
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <section ref="root" class="im-flow" aria-labelledby="im-flow-t">
    <div class="hx-container">
      <header class="im-flow__head">
        <p class="hx-eyebrow"><span class="hx-index">→</span> One pathway</p>
        <h2 id="im-flow-t" class="hx-title">From the floor <span class="lite">to the decision.</span></h2>
      </header>

      <ol class="im-flow__rail">
        <span class="im-flow__line" aria-hidden="true" />
        <span class="im-flow__fill" :style="{ transform: `scaleX(${p})` }" aria-hidden="true" />
        <li
          v-for="(s, i) in WORKFLOW_STAGES" :key="s"
          class="im-flow__step"
          :class="{ 'is-on': p >= i / WORKFLOW_STAGES.length }"
        >
          <span class="im-flow__node" aria-hidden="true" />
          <ImIcon :name="ICONS[i]" boxed />
          <span class="im-flow__n">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="im-flow__name">{{ s }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>
