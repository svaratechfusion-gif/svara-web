<script setup lang="ts">
/**
 * InstDonut — the composition breakdown on each instrument: a segmented ring
 * with a total in the well and a keyed legend beside it.
 *
 * Segments are drawn as stroke dashes on one shared circle (see `donutArcs`) —
 * no arc-flag trigonometry, and the gap between wedges is a single constant.
 * Segment tint steps down through the accent so the ring reads as one family
 * rather than a pie chart of unrelated colours.
 *
 * INTERACTIVE. Hovering or focusing a legend row (or the wedge itself) lifts that
 * segment and swaps the well to that segment's own share, so the ring answers
 * "how much is X?" directly instead of leaving it to be eyeballed. Legend rows
 * are buttons, so this works from the keyboard too.
 */
import { computed, ref } from 'vue'
import { donutArcs } from '~~/lib/instrument/series'

const props = defineProps<{
  label: string
  segments: { k: string, v: number }[]
  /** What sits in the middle of the ring (already formatted). */
  total: string
  totalLabel: string
}>()

/* The circles below use r=15.915 — chosen so the circumference is 2πr ≈ 100, which
   makes every segment's share map straight onto its stroke-dash length. */
const arcs = computed(() => donutArcs(props.segments))
/** Opacity ladder: first segment full accent, each next one step fainter. */
const tint = (i: number) => 1 - i * 0.22

/** Which segment is being interrogated. Null = the ring's own total. */
const hot = ref<number | null>(null)
const hotArc = computed(() => (hot.value === null ? null : arcs.value[hot.value] ?? null))
</script>

<template>
  <div class="idn">
    <span class="idn__label hx-mono-label">{{ label }}</span>

    <div class="idn__body">
      <div class="idn__ring">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <g transform="translate(20 20) rotate(-90)">
            <circle class="idn__track" r="15.915" />
            <circle
              v-for="(a, i) in arcs"
              :key="a.key"
              class="idn__arc"
              :class="{ 'is-hot': hot === i, 'is-dim': hot !== null && hot !== i }"
              r="15.915"
              :stroke-dasharray="a.dash"
              :stroke-dashoffset.attr="a.offset"
              :style="{ opacity: tint(i) }"
              @pointerenter="hot = i"
              @pointerleave="hot = null"
            />
          </g>
        </svg>
        <!-- the well answers whichever question is being asked: the whole, or the
             one segment under the cursor -->
        <div class="idn__well">
          <b>{{ hotArc ? `${Math.round(hotArc.share)}%` : total }}</b>
          <span>{{ hotArc ? hotArc.key : totalLabel }}</span>
        </div>
      </div>

      <ul class="idn__legend">
        <li v-for="(a, i) in arcs" :key="a.key">
          <button
            type="button"
            class="idn__row"
            :class="{ 'is-hot': hot === i }"
            @pointerenter="hot = i"
            @pointerleave="hot = null"
            @focus="hot = i"
            @blur="hot = null"
          >
            <span class="idn__key" :style="{ opacity: tint(i) }" />
            <span class="idn__k">{{ a.key }}</span>
            <span class="idn__v">{{ Math.round(a.share) }}%</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.idn { display: flex; flex-direction: column; gap: 12px; }
.idn__label { color: var(--ink-muted); }
.idn__body { display: flex; align-items: center; gap: clamp(12px, 1.6vw, 22px); }

.idn__ring { position: relative; flex-shrink: 0; width: clamp(84px, 9vw, 104px); }
.idn__ring svg { display: block; width: 100%; height: auto; }
.idn__track { fill: none; stroke: currentColor; stroke-opacity: 0.12; stroke-width: 3.4; }
.idn__arc { fill: none; stroke: var(--sig); stroke-width: 3.4; stroke-linecap: butt; cursor: pointer; transition: stroke-width 160ms var(--ease-out, ease-out), opacity 160ms var(--ease-out, ease-out); }
.idn__arc.is-hot { stroke-width: 4.6; }
.idn__arc.is-dim { opacity: 0.28 !important; }

.idn__well {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-align: center;
}
.idn__well b { transition: none; font-size: clamp(15px, 1.7vw, 20px); font-weight: 600; letter-spacing: -0.03em; color: var(--ink-primary); }
.idn__well span { font-family: var(--font-mono); font-size: 7.5px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; letter-spacing: 0.12em; color: var(--ink-muted); }

.idn__legend { list-style: none; margin: 0; padding: 0; flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 7px; }
.idn__legend li { display: block; }
.idn__row { width: 100%; display: grid; grid-template-columns: 8px minmax(0, 1fr) auto; align-items: center; gap: 8px; padding: 2px 4px; margin-inline: -4px; border: 0; background: none; font: inherit; text-align: left; cursor: pointer; border-radius: 2px; transition: background 160ms var(--ease-out, ease-out); }
.idn__row.is-hot { background: color-mix(in srgb, var(--sig) 14%, transparent); }
.idn__row:focus-visible { outline: 1px solid var(--sig); outline-offset: 1px; }
.idn__key { width: 8px; height: 8px; border-radius: 1px; background: var(--sig); }
.idn__k { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.1em; color: var(--ink-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.idn__v { font-family: var(--font-mono); font-size: 9.5px; color: var(--ink-primary); font-variant-numeric: tabular-nums; }
</style>
