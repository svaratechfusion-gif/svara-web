<script setup lang="ts">
// "Built Around Six Specialized Technology Divisions."
// Alternating layout: copy left, visual right. The visual is six frosted-
// glass monoliths — tall slabs (mountain-peak proportions) with a real CSS
// 3D flip (preserve-3d + backface-visibility), each idle-bobbing
// independently; hovering or focusing a monolith rotates it to reveal the
// division name. Full explanation lives on the Divisions page. Copy
// verbatim from the Content Bible.
import { ref } from 'vue'
import { homeSection04 } from '~~/lib/content/home'
import SectionLink from '~/components/ui/SectionLink.vue'
import { useIntelligenceTargets } from '~/composables/useIntelligenceTargets'

const divisions = homeSection04.divisions.map((label, i) => ({ id: String(i), label }))

const root = ref<HTMLElement>()

// section gravity: particles become data streams flowing into each
// division monolith — "particles become data streams"
useIntelligenceTargets(root, () =>
  Array.from(root.value?.querySelectorAll<HTMLElement>('.cube-flip') ?? []))
</script>

<template>
  <section ref="root" class="techstack">
    <div class="techstack__inner">
      <div class="techstack__copy">
        <p v-reveal class="techstack__eyebrow">Technology</p>
        <h2 v-reveal class="techstack__title" data-split>{{ homeSection04.title }}</h2>
        <p v-reveal="{ delay: 0.08 }" class="techstack__sub">{{ homeSection04.teaser }}</p>
        <div v-reveal="{ delay: 0.14 }" class="techstack__more"><SectionLink to="/divisions" label="Explore the divisions" /></div>
      </div>

      <div v-reveal class="techstack__viz">
        <div
          v-for="(t, i) in divisions" :key="t.id"
          class="cube-float"
          :style="{ animationDelay: `${i * -0.7}s` }"
        >
          <div class="cube-scene">
            <div class="cube-flip glass-react" tabindex="0" :aria-label="t.label">
              <div class="cube-face cube-face--front">
                <span class="cube-num mono">{{ String(i + 1).padStart(2, '0') }}</span>
              </div>
              <div class="cube-face cube-face--back">
                <span class="cube-label">{{ t.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.techstack {
  background: var(--color-surface); border-block: 1px solid var(--color-border);
  min-height: 90vh;
  display: flex;
  align-items: center;
}
.techstack__inner {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: var(--gap-section);
  align-items: center;
  box-sizing: border-box;
}
.techstack__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.techstack__title {
  margin: 0 0 var(--space-6);
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}
.techstack__sub {
  margin: 0;
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.techstack__more { margin-top: var(--space-8); }

/* six frosted-glass monoliths — tall slabs, mountain-peak proportions */
.techstack__viz {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6) var(--space-5);
  padding: var(--space-6);
}
.cube-float {
  animation: cube-bob 5.5s ease-in-out infinite;
}
.cube-scene {
  perspective: 900px;
  aspect-ratio: 2 / 3;
}
.cube-flip {
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s var(--ease-smooth);
  cursor: pointer;
  border-radius: var(--radius-lg);
}
.cube-flip:hover,
.cube-flip:focus-visible { transform: rotateY(180deg); }
.cube-flip:focus-visible { outline: none; }
.cube-face {
  position: absolute; inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  /* heavier frosted-glass material — more opaque, more blur than the
     lighter glass elsewhere on the page */
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--shadow-glass);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.cube-face--back {
  transform: rotateY(180deg);
  background: var(--color-text);
  border-color: var(--color-text);
}
.cube-num {
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  color: var(--color-text-faint);
}
.cube-label {
  font-size: 13px; font-weight: var(--weight-semibold); letter-spacing: -0.01em;
  color: var(--color-inverse);
  text-align: center;
  line-height: 1.25;
}

@keyframes cube-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (max-width: 900px) {
  .techstack__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .techstack__viz { grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
}
@media (max-width: 560px) { .techstack__viz { grid-template-columns: repeat(2, 1fr); } }
@media (prefers-reduced-motion: reduce) {
  .cube-float { animation: none; }
  .cube-flip { transition: none; }
}
</style>
