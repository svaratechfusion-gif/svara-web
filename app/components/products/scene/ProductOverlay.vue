<script setup lang="ts">
// PRODUCT OVERLAY — the editorial copy that sits AROUND the dashboard.
//
// Deliberately minimal (§16): a system label, the product name, ONE short
// description, two or three capabilities, and a small metric row set as
// typography rather than widgets (§20 — metadata, not dashboard tiles; the real
// dashboard is right there and doesn't need a paper copy of itself).
//
// Three compositions, cycled so no two neighbouring systems read alike. In every
// one it is the COPY that moves; the dashboard keeps its size and the frame
// arranges the text into whatever room is left.
import { computed } from 'vue'
import type { OsProduct } from '~/utils/svara-os'
import RevealText from './RevealText.vue'
import RevealItem from './RevealItem.vue'
import { useVisionExplore } from '~/composables/useVisionExplore'
import { useDroneExplore } from '~/composables/useDroneExplore'
import { useEdgeExplore } from '~/composables/useEdgeExplore'
import { useCognitiveExplore } from '~/composables/useCognitiveExplore'
import { useAgentsExplore } from '~/composables/useAgentsExplore'
import { useTwinExplore } from '~/composables/useTwinExplore'
import { useAiosExplore } from '~/composables/useAiosExplore'
import { useCloudExplore } from '~/composables/useCloudExplore'
import { useEngineeringExplore } from '~/composables/useEngineeringExplore'
import { useGrowthExplore } from '~/composables/useGrowthExplore'

const props = defineProps<{
  product: OsProduct
  window: [number, number]
  composition: 'right' | 'left'
  anchor: 'split' | 'bottom' | 'top'
}>()

// Vision AI + Drone AI + Edge AI open their immersive overlays in place (no route change);
// every other product keeps its normal navigation. Same link element/styling either way.
const { openExplore: openVision } = useVisionExplore()
const { openExplore: openDrone } = useDroneExplore()
const { openExplore: openEdge } = useEdgeExplore()
const { openExplore: openCognitive } = useCognitiveExplore()
const { openExplore: openAgents } = useAgentsExplore()
const { openExplore: openTwin } = useTwinExplore()
const { openExplore: openAios } = useAiosExplore()
const { openExplore: openCloud } = useCloudExplore()
const { openExplore: openEngineering } = useEngineeringExplore()
const { openExplore: openGrowth } = useGrowthExplore()
/** product id → its immersive Explore overlay opener. */
const EXPLORE_OPENERS: Record<string, () => void> = {
  vision: openVision,
  drone: openDrone,
  edge: openEdge,
  cognitive: openCognitive,
  agents: openAgents,
  twin: openTwin,
  aios: openAios,
  cloud: openCloud,
  engineering: openEngineering,
  growth: openGrowth,
}

/**
 * Explore opens the product's overlay IN PLACE — it must not navigate to the
 * /products/<slug> detail page.
 *
 * This runs in the CAPTURE phase, on the wrapper, not as a `@click` on the
 * NuxtLink. `preventDefault()` from a click handler merged onto the link is no
 * longer enough: under vue-router 5 the RouterLink's own handler navigates
 * regardless of `event.defaultPrevented`, so every Explore control fell through
 * to the detail route. Capturing on the ancestor runs before the anchor's
 * handler, and `stopPropagation()` means that handler never fires at all.
 *
 * The `href` is deliberately kept on the link: it stays crawlable, and a
 * modified click (cmd/ctrl/shift/alt or a non-primary button) still opens the
 * detail page in a new tab, which is what a user making that gesture expects.
 */
function onExplore(e: MouseEvent): void {
  if (e.defaultPrevented) return
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  const open = EXPLORE_OPENERS[props.product.id]
  if (!open) return
  e.preventDefault()
  e.stopPropagation()
  open()
}

function fmt(v: number): string {
  const n = Math.max(0, v)
  if (n >= 1e9) return `${(n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`
  return String(Math.round(n))
}

const metrics = computed(() =>
  props.product.kpis.slice(0, 3).map((k) => ({
    value: `${k.prefix ?? ''}${fmt(k.value)}${k.suffix ?? ''}`,
    label: k.label,
  })),
)

const capabilities = computed(() => props.product.capabilities.slice(0, 3))

/** The description is one line, not a paragraph — the tagline carries the idea. */
const description = computed(() => props.product.tagline)
</script>

<template>
  <div class="po" :data-composition="composition" :data-anchor="anchor">
    <div class="po__lead">
      <RevealItem :window="window" class="po__eyebrow" tag="p">
        <span class="ps-label ps-label--blue">Intelligence</span>
        <span class="ps-label po__eyebrow-sep">/</span>
        <span class="ps-label">System {{ product.n }}</span>
      </RevealItem>

      <RevealText
        :text="product.short"
        :window="window"
        variant="letter"
        tag="h2"
        class="po__name ps-display"
        :delay="90"
      />

      <RevealText
        :text="description"
        :window="window"
        variant="word"
        tag="p"
        class="po__desc ps-copy"
        :delay="380"
      />
    </div>

    <div class="po__meta">
      <ul class="po__caps">
        <RevealItem
          v-for="(c, i) in capabilities"
          :key="c"
          :window="window"
          tag="li"
          :index="i"
          :count="capabilities.length"
          :delay="560"
          class="po__cap"
        >
          <span class="po__cap-mark" aria-hidden="true" />
          <span class="ps-label ps-label--ink">{{ c }}</span>
        </RevealItem>
      </ul>

      <div class="po__metrics">
        <template v-for="(m, i) in metrics" :key="m.label">
          <span v-if="i > 0" class="ps-rule-v po__metric-rule" aria-hidden="true" />
          <RevealItem
            :window="window"
            :index="i"
            :count="metrics.length"
            :delay="760"
            class="po__metric"
          >
            <span class="po__metric-v">{{ m.value }}</span>
            <span class="ps-label po__metric-l">{{ m.label }}</span>
          </RevealItem>
        </template>
      </div>

      <RevealItem :window="window" :delay="900" class="po__link" @click.capture="onExplore">
        <NuxtLink :to="product.to" class="po__link-a">
          <span>Explore {{ product.short }}</span>
          <span aria-hidden="true">&#8594;</span>
        </NuxtLink>
      </RevealItem>
    </div>
  </div>
</template>

<style scoped>
.po {
  position: absolute;
  inset: 0;
  padding: calc(var(--ps-header-h) + clamp(20px, 3vh, 40px)) var(--ps-gutter) clamp(24px, 3.6vh, 46px);
  display: grid;
  pointer-events: none;
}

/* ── copy blocks ─────────────────────────────────────────────────────────── */

.po__lead { max-width: min(420px, 30vw); }
.po__eyebrow { display: flex; align-items: baseline; gap: 8px; }
.po__eyebrow-sep { opacity: 0.4; }

.po__name {
  margin-top: clamp(10px, 1.4vh, 20px);
  font-size: clamp(38px, 4.4vw, 84px);
}

.po__desc { margin-top: clamp(12px, 1.6vh, 22px); max-width: 340px; }

.po__meta { display: flex; flex-direction: column; gap: clamp(14px, 2vh, 24px); }

.po__caps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
.po__cap { display: flex; align-items: baseline; gap: 10px; }
.po__cap-mark {
  flex: none;
  width: 14px;
  height: 1px;
  translate: 0 -3px;
  background: var(--ps-blue);
  opacity: 0.7;
}

/* Metrics as typography + vertical hairlines — metadata, never a widget (§20). */
.po__metrics { display: flex; align-items: stretch; gap: clamp(12px, 1.4vw, 26px); }
/* The copy column is narrow by design — the dashboard owns the width. Three
   metric columns only fit once the viewport is genuinely wide; below that the
   third would break its own value across two lines ("200 / TOPS"), so it and its
   rule step out rather than the type getting smaller. */
@media (max-width: 1439px) {
  .po__metrics > :nth-child(n+4) { display: none; }
}
.po__metric-rule { opacity: 0.9; }
.po__metric { display: flex; flex-direction: column; gap: 5px; }
.po__metric-v {
  font-family: 'SVARA Display', var(--font-sans);
  font-size: clamp(20px, 1.9vw, 30px);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--ps-navy);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.po__metric-l { color: var(--ps-faint); }

.po__link { pointer-events: auto; }
.po__link-a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--ps-navy);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--ps-line);
  transition: color 0.3s ease, border-color 0.3s ease, gap 0.3s ease;
}
.po__link-a:hover { color: var(--ps-blue); border-color: var(--ps-blue); gap: 15px; }

/* ── compositions ────────────────────────────────────────────────────────── */

/* The dashboard's column is reserved at its real width so the copy can never be
   laid out underneath it; only the ORDER mirrors. */
.po[data-composition='right'] {
  grid-template-columns: minmax(0, 1fr) var(--ps-stage-w);
  grid-template-areas: 'a stage' 'b stage' 'c stage';
}
.po[data-composition='left'] {
  grid-template-columns: var(--ps-stage-w) minmax(0, 1fr);
  grid-template-areas: 'stage a' 'stage b' 'stage c';
  justify-items: end;
  text-align: right;
}
.po[data-composition='right'],
.po[data-composition='left'] {
  grid-template-rows: auto 1fr auto;
  column-gap: clamp(24px, 3vw, 56px);
}

/* Right-hand copy reads right-to-left: the marker follows the line. */
.po[data-composition='left'] .po__meta { align-items: flex-end; }
.po[data-composition='left'] .po__eyebrow,
.po[data-composition='left'] .po__cap { flex-direction: row-reverse; }
.po[data-composition='left'] .po__metric { align-items: flex-end; }
.po[data-composition='left'] .po__metrics { justify-content: flex-end; }

/* ── anchors — where the copy sits in that column ────────────────────────── */

/* Split: the name at the top edge, the metadata at the bottom. The most open. */
.po[data-anchor='split'] .po__lead { grid-area: a; }
.po[data-anchor='split'] .po__meta { grid-area: c; }

/* Bottom: name and metadata gathered at the foot of the column. */
.po[data-anchor='bottom'] .po__lead { grid-area: b; align-self: end; padding-bottom: clamp(14px, 2.2vh, 28px); }
.po[data-anchor='bottom'] .po__meta { grid-area: c; }

/* Top: both at the head of the column. */
.po[data-anchor='top'] .po__lead { grid-area: a; }
.po[data-anchor='top'] .po__meta { grid-area: b; align-self: start; padding-top: clamp(14px, 2.2vh, 28px); }

/* The capability lines are the first thing to go: they need vertical room the
   copy column stops having once the dashboard owns most of the frame. The
   composition itself survives — there is still ~250px beside a 64vw dashboard at
   1024px wide, which is enough for the name and the metrics. */
@media (max-width: 1180px) {
  .po__caps { display: none; }
  .po__desc { max-width: 260px; }
}

/* Only below 900px does the frame genuinely run out of horizontal room. Then —
   and only then — the copy stacks: name above the dashboard, metadata below it,
   with the dashboard keeping its size in the band between (§32). Above this
   width the copy must never sit ON the dashboard: it is a dark HUD, and light
   editorial type over it is unreadable. */
@media (max-width: 900px) {
  .po[data-composition='right'],
  .po[data-composition='left'] {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'a' 'b' 'c';
    justify-items: stretch;
    text-align: left;
  }
  .po[data-anchor='bottom'] .po__lead,
  .po[data-anchor='top'] .po__lead { grid-area: a; align-self: start; padding-bottom: 0; }
  .po[data-anchor='top'] .po__meta,
  .po[data-anchor='bottom'] .po__meta { grid-area: c; align-self: end; padding-top: 0; }
  .po[data-composition='left'] .po__meta { align-items: flex-start; }
  .po[data-composition='left'] .po__eyebrow { flex-direction: row; }
  .po[data-composition='left'] .po__metric { align-items: flex-start; }
  .po[data-composition='left'] .po__metrics { justify-content: flex-start; }

  .po { padding: calc(var(--ps-header-h) + 14px) 18px 18px; --ps-gutter: 18px; }
  .po__lead { max-width: none; }
  .po__name { font-size: clamp(32px, 10vw, 52px); }
  .po__desc { display: none; }
  .po__metrics { gap: 14px; }
  .po__metric-v { font-size: 18px; }
}
</style>
