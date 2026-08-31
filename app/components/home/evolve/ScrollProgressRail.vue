<script setup lang="ts">
// SYSTEM PROGRESS RAIL — a subtle right-edge index of the 11 experience states
// (01 … 11). It reads as SYSTEM PROGRESS, not a scrollbar: hairline ticks, mono
// numerals, the active state marked. Reveals with the experience (`shown`).
import { computed } from 'vue'

const props = defineProps<{ scenes: string[], active: number, shown: boolean }>()
const num = (i: number) => String(i + 1).padStart(2, '0')
const activeLabel = computed(() => props.scenes[props.active] ?? '')
</script>

<template>
  <aside class="rail" :class="{ 'is-in': shown }" aria-hidden="true">
    <span class="rail__cap">01</span>
    <div class="rail__track">
      <span
        v-for="(s, i) in scenes" :key="i"
        class="rail__tick" :class="{ 'is-active': i === active, 'is-done': i < active }"
      />
    </div>
    <span class="rail__cap">{{ num(scenes.length - 1) }}</span>
    <span class="rail__now">{{ num(active) }} · {{ activeLabel }}</span>
  </aside>
</template>

<style scoped>
.rail {
  position: fixed; top: 50%; right: 22px; z-index: 60;
  transform: translateY(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-family: var(--font-mono);
  opacity: 0; transition: opacity 800ms var(--ease) 300ms;
  pointer-events: none; mix-blend-mode: difference;
}
.rail.is-in { opacity: 1; }
.rail__cap { font-size: 9px; letter-spacing: 0.14em; color: rgba(255, 255, 255, 0.5); }
.rail__track { display: flex; flex-direction: column; align-items: center; gap: 7px; }
.rail__tick { width: 1px; height: 14px; background: rgba(255, 255, 255, 0.28); transition: background 400ms var(--ease), transform 400ms var(--ease); }
.rail__tick.is-done { background: rgba(255, 255, 255, 0.5); }
.rail__tick.is-active { background: #fff; transform: scaleY(1.5); }
.rail__now {
  position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
  white-space: nowrap; writing-mode: vertical-rl;
  font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
@media (max-width: 900px) { .rail { display: none; } }
@media (prefers-reduced-motion: reduce) { .rail { transition: none; } .rail__tick { transition: none; } }
</style>
