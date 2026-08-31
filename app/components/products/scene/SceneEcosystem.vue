<script setup lang="ts">
// SCENE — THE ECOSYSTEM (§28). Everything the film just walked through, brought
// together. Not a card grid: a typographic constellation. The ten system names
// arrive one after another as spatial type, held by a single statement.
//
// Names come from the products catalogue, so the list can never drift from the
// systems the scenes actually showed.
import { computed, ref } from 'vue'
import { SVARA_OS } from '~/utils/svara-os'
import { useSceneProgress, ramp, smoother } from '~/composables/useSceneProgress'
import type { Beat } from './scene-sequence'
import RevealText from './RevealText.vue'
import RevealItem from './RevealItem.vue'

const props = defineProps<{ beat: Beat }>()
const len = props.beat.end - props.beat.start

const headWin = computed<[number, number]>(() => [props.beat.start, props.beat.end - len * 0.1])
const listWin = computed<[number, number]>(() => [props.beat.start + len * 0.22, props.beat.end - len * 0.08])

const field = ref<HTMLElement | null>(null)

// The constellation drifts forward through the beat — the camera closing in on
// the assembled stack rather than the list simply appearing.
useSceneProgress((p) => {
  const t = smoother(ramp(p, props.beat.start, props.beat.end))
  if (field.value) {
    field.value.style.transform = `translate3d(0, ${((0.5 - t) * 70).toFixed(1)}px, 0) scale(${(0.965 + t * 0.06).toFixed(4)})`
  }
})

const names = SVARA_OS.map((p) => ({ id: p.id, n: p.n, short: p.short, category: p.category }))
</script>

<template>
  <div class="se">
    <div class="se__head">
      <RevealItem :window="headWin" class="ps-label ps-label--blue" tag="p">The Stack</RevealItem>
      <RevealText text="One system." :window="headWin" variant="letter" tag="h2" class="se__h ps-display" :delay="120" />
      <RevealText
        text="Multiple intelligence layers."
        :window="headWin"
        variant="letter"
        tag="p"
        class="se__h se__h--lite ps-display"
        :delay="300"
      />
    </div>

    <div ref="field" class="se__field">
      <RevealItem
        v-for="(n, i) in names"
        :key="n.id"
        :window="listWin"
        :index="i"
        :count="names.length"
        :step="52"
        class="se__item"
        tag="span"
      >
        <span class="ps-label se__item-n">{{ n.n }}</span>
        <span class="se__item-name">{{ n.short }}</span>
        <span class="ps-label se__item-cat">{{ n.category }}</span>
      </RevealItem>
    </div>
  </div>
</template>

<style scoped>
.se {
  position: absolute;
  inset: 0;
  padding: calc(var(--ps-header-h) + clamp(18px, 3vh, 40px)) clamp(22px, 4vw, 72px) clamp(22px, 3.4vh, 44px);
  display: grid;
  grid-template-rows: auto 1fr;
  gap: clamp(16px, 3vh, 44px);
}

.se__head { max-width: min(560px, 46vw); }
.se__h { font-size: clamp(30px, 4.2vw, 74px); font-weight: 200; }
.se__h--lite { color: var(--ps-faint); }

/* The constellation: a loose, uneven field rather than a grid of equal cards. */
.se__field {
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  /* The row gap has to clear TWICE the vertical offset below, or a lifted item
     on one row lands on a dropped item from the next. */
  gap: clamp(38px, 5vh, 62px) clamp(20px, 3.4vw, 66px);
  will-change: transform;
}

.se__item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 14px;
  border-left: 1px solid var(--ps-line);
}
/* Alternate the vertical offset so the field reads as spatial, not tabular. */
.se__item:nth-child(even) { translate: 0 clamp(14px, 2.2vh, 30px); }
.se__item:nth-child(3n) { translate: 0 clamp(-16px, -2.4vh, -8px); }

.se__item-n { color: var(--ps-blue); }
.se__item-name {
  font-family: 'SVARA Display', var(--font-sans);
  font-size: clamp(19px, 2.2vw, 38px);
  font-weight: 200;
  letter-spacing: -0.035em;
  line-height: 1;
  color: var(--ps-navy);
  white-space: nowrap;
}
.se__item-cat { color: var(--ps-faint); }

@media (max-width: 900px) {
  .se__field { justify-content: flex-start; gap: 14px 22px; }
  .se__item:nth-child(even), .se__item:nth-child(3n) { translate: none; }
  .se__item-name { font-size: 18px; }
  .se__item-cat { display: none; }
}
</style>
