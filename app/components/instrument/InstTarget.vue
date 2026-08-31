<script setup lang="ts">
/**
 * InstTarget — the goal bar that closes each instrument: where the division is
 * against where it is meant to be, with the gap called out in the open.
 */
import { computed } from 'vue'

const props = defineProps<{ label: string, now: number, goal: number, unit?: string }>()

const pct = computed(() => Math.max(0, Math.min(100, (props.now / props.goal) * 100)))
</script>

<template>
  <div class="itg">
    <div class="itg__head">
      <span class="itg__k hx-mono-label">{{ label }}</span>
      <span class="itg__g">target · {{ goal }}{{ unit }}</span>
    </div>
    <div class="itg__row">
      <span class="itg__v">{{ now }}<em>{{ unit }}</em></span>
      <span class="itg__track">
        <i :style="{ width: `${pct}%` }" />
        <b :style="{ left: `${pct}%` }" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.itg { display: flex; flex-direction: column; gap: 10px; }
.itg__head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.itg__k { color: var(--ink-muted); }
.itg__g { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-muted); }
.itg__row { display: flex; align-items: center; gap: 14px; }
.itg__v { font-size: clamp(18px, 2vw, 24px); font-weight: 600; letter-spacing: -0.03em; color: var(--ink-primary); font-variant-numeric: tabular-nums; }
.itg__v em { font-style: normal; font-size: 0.6em; color: var(--ink-muted); margin-left: 1px; }
.itg__track { position: relative; flex: 1; height: 3px; border-radius: 2px; color: var(--ink-muted); background: color-mix(in srgb, currentColor 24%, transparent); }
.itg__track i { position: absolute; inset: 0 auto 0 0; border-radius: 2px; background: var(--sig); }
.itg__track b { position: absolute; top: 50%; width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%; background: var(--sig); transform: translateY(-50%); box-shadow: 0 0 0 3px color-mix(in srgb, var(--sig) 26%, transparent); }
</style>
