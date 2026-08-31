<script setup lang="ts">
// ProductWorld — one SVARA product as a full-bleed editorial composition (a
// "Product World", not a card): oversized ghosted index, vertical typography,
// technical annotations, a bespoke framed visualization (WorldViz), real
// capabilities + KPIs, and a diagonal structural cut. Asymmetry alternates by
// index. Reveal-on-scroll via v-reveal. Cream/navy/cyan editorial system.
import type { OsProduct } from '~/utils/svara-os'
import WorldViz from '~/components/products/worlds/WorldViz.vue'
import HUDWindow from '~/components/products/worlds/HUDWindow.vue'

const props = defineProps<{ product: OsProduct, index: number }>()

function fmt(v: number): string {
  const n = Math.max(0, v)
  if (n >= 1e9) return (n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k'
  return String(Math.round(n))
}
function kpiText(k: OsProduct['kpis'][number]): string { return (k.prefix ?? '') + fmt(k.value) + (k.suffix ?? '') }
const flip = props.index % 2 === 1
const hudMetrics = props.product.kpis.slice(0, 4).map((k) => ({ label: k.label, value: kpiText(k) }))
</script>

<template>
  <section class="pw" :class="{ 'pw--flip': flip }" :aria-label="product.name">
    <span class="pw__num" aria-hidden="true">{{ product.n }}</span>
    <span class="pw__vert" aria-hidden="true">{{ product.short }}</span>
    <span class="pw__diag" aria-hidden="true" />

    <div class="pw__grid">
      <div v-reveal class="pw__content">
        <span class="pw__cat sys-label">{{ product.category }} <span class="pw__cat-sep">//</span> SYSTEM {{ product.n }}</span>
        <h3 class="pw__name">{{ product.short }}</h3>
        <p class="pw__tag">{{ product.tagline }}</p>
        <ul class="pw__caps">
          <li v-for="c in product.capabilities.slice(0, 3)" :key="c"><span class="pw__caps-mk" aria-hidden="true">+</span>{{ c }}</li>
        </ul>
        <div class="pw__kpis">
          <div v-for="k in product.kpis.slice(0, 3)" :key="k.label" class="pw__kpi">
            <span class="pw__kpi-v">{{ kpiText(k) }}</span>
            <span class="pw__kpi-l sys-label sys-label--sm">{{ k.label }}</span>
          </div>
        </div>
        <NuxtLink :to="product.to" class="pw__btn sys-btn">Explore System<span aria-hidden="true">→</span></NuxtLink>
      </div>

      <div v-reveal="{ delay: 0.12 }" class="pw__stage">
        <HUDWindow
          :title="product.name"
          :system-id="product.n"
          :code="product.code"
          :status="product.status"
          :metrics="hudMetrics"
          :kind="product.id"
        >
          <WorldViz :kind="product.id" />
        </HUDWindow>
        <div class="pw__ann">
          <span v-for="s in product.subsystems.slice(0, 4)" :key="s" class="pw__ann-i">{{ s }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pw {
  --sys-mark: rgba(16, 33, 74, 0.3);
  /* fixed GlobalNavigation occupies ~116px (top 32 + logo 84); no product content,
     left- or right-hand, may start inside that band */
  --pw-nav-safe: 140px;
  position: relative; overflow: hidden;
  padding: max(clamp(88px, 11vh, 150px), var(--pw-nav-safe)) clamp(24px, 6vw, 96px) clamp(88px, 11vh, 150px);
  border-top: 1px solid var(--px-line, rgba(16, 33, 74, 0.1));
  scroll-margin-top: var(--pw-nav-safe);
}

/* oversized ghosted structural index — bleeds off an edge */
.pw__num { position: absolute; top: -0.18em; right: 4vw; z-index: 0; font-family: var(--font-mono, monospace); font-weight: 400; font-size: clamp(160px, 30vw, 420px); line-height: 0.8; color: rgba(16, 33, 74, 0.045); pointer-events: none; letter-spacing: -0.04em; }
.pw--flip .pw__num { right: auto; left: 4vw; }

/* vertical typography rail */
.pw__vert { position: absolute; top: 50%; left: 12px; transform: translateY(-50%); writing-mode: vertical-rl; text-orientation: mixed; font-family: var(--font-mono, monospace); font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase; color: rgba(16, 33, 74, 0.32); pointer-events: none; }
.pw--flip .pw__vert { left: auto; right: 12px; transform: translateY(-50%) rotate(180deg); }

/* diagonal structural cut */
.pw__diag { position: absolute; top: 0; bottom: 0; left: 58%; width: 1px; background: linear-gradient(180deg, transparent, rgba(16, 33, 74, 0.14) 30%, rgba(16, 33, 74, 0.14) 70%, transparent); transform: skewX(-12deg); transform-origin: top; pointer-events: none; }
.pw--flip .pw__diag { left: 42%; transform: skewX(12deg); }
@media (max-width: 900px) { .pw__diag { display: none; } }

.pw__grid {
  position: relative;
  z-index: 1;
  max-width: 1540px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(40px, 5vw, 80px);
  align-items: center;
}
/* MASTER PRODUCT GRID — the dashboard always owns the wide track.
   A flipped section mirrors the TRACK DEFINITION as well as the order; reusing one
   column set and only reordering items drops the stage into the narrow text track,
   which is what shrank every dashboard-left system. Dashboard size is position-
   independent: only the order changes, never the dimensions. */
@media (min-width: 1180px) {
  /* the grid owns the horizontal canvas at desktop so it is never double-constrained */
  .pw { padding-inline: 0; }

  .pw__grid {
    width: min(1480px, calc(100vw - 140px));
    max-width: none;
    /* TEXT | DASHBOARD */
    grid-template-columns: minmax(360px, 0.75fr) minmax(0, 1.55fr);
    gap: clamp(56px, 4.4vw, 72px);
    min-height: clamp(720px, 78vh, 820px);
  }

  /* DASHBOARD | TEXT — identical track sizes, mirrored order */
  .pw--flip .pw__grid {
    grid-template-columns: minmax(0, 1.55fr) minmax(360px, 0.75fr);
  }
  .pw--flip .pw__content { order: 2; }
  .pw--flip .pw__stage { order: 1; }
}

/* content block */
.pw__content { min-width: 0; }
.pw__cat { color: var(--px-blue, #6C87FE); }
.pw__cat-sep { opacity: 0.5; }
.pw__name { margin: 18px 0 0; font-size: clamp(40px, 7vw, 92px); font-weight: 500; letter-spacing: -0.04em; line-height: 0.94; color: var(--px-navy, #10214A); text-transform: uppercase; }
.pw__tag { margin: 16px 0 0; max-width: 40ch; font-size: clamp(14px, 1.4vw, 17px); line-height: 1.55; color: var(--px-ink, #10214A); }
.pw__caps { list-style: none; margin: 26px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.pw__caps li { display: flex; gap: 10px; font-size: 13.5px; line-height: 1.4; color: var(--px-navy, #10214A); }
.pw__caps-mk { color: var(--px-blue, #6C87FE); font-family: var(--font-mono, monospace); }
.pw__kpis { display: flex; flex-wrap: wrap; gap: 28px; margin: 30px 0 0; padding-top: 22px; border-top: 1px solid var(--px-line, rgba(16, 33, 74, 0.1)); }
.pw__kpi { display: flex; flex-direction: column; gap: 6px; }
.pw__kpi-v { font-size: clamp(20px, 2.4vw, 30px); font-weight: 600; letter-spacing: -0.02em; color: var(--px-navy, #10214A); font-variant-numeric: tabular-nums; }
.pw__kpi-l { color: var(--px-muted, rgba(16, 33, 74, 0.55)); }
.pw__btn { margin-top: 30px; color: var(--px-navy, #10214A); }
.pw__btn:hover { background: var(--px-navy, #10214A); color: #fff; }

/* visualization stage */
.pw__stage { position: relative; align-self: center; width: 100%; min-width: 0; }
.pw__frame-tag { position: absolute; top: 12px; left: 14px; z-index: 2; color: var(--px-muted, rgba(16, 33, 74, 0.5)); }
.pw__frame-live { position: absolute; top: 12px; right: 20px; z-index: 2; display: inline-flex; align-items: center; gap: 7px; color: var(--px-muted, rgba(16, 33, 74, 0.5)); }
.pw__ann { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 14px; }
.pw__ann-i { font-family: var(--font-mono, monospace); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(16, 33, 74, 0.4); }
.pw__ann-i::before { content: '// '; opacity: 0.5; }

@media (max-width: 720px) {
  .pw {
    /* mobile nav is shorter: top 20 + logo 60 */
    --pw-nav-safe: 96px;
    padding: max(72px, var(--pw-nav-safe)) 18px 72px;
  }

  .pw__content {
    align-self: end;
  }

  .pw__name {
    font-size: clamp(38px, 15vw, 62px);
  }
}
</style>
