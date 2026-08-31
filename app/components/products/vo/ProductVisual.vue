<script setup lang="ts">
// ProductVisual — a reusable, dependency-free "dashboard screenshot" for a SVARA
// product: an app-chrome frame + live-metric rows (bar fills from the product's
// representational metrics) + a mock sparkline. Navy ink / blue accent on white,
// matching the editorial system. Used across the marquee, carousel and showcase.
import type { PxProduct } from '~/utils/px-products'

const props = defineProps<{ product: PxProduct }>()

// deterministic sparkline path from the product name (no Math.random — SSR-safe)
function spark(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const pts: number[] = []
  for (let i = 0; i < 12; i++) { h = (h * 1103515245 + 12345) >>> 0; pts.push(8 + (h % 100) / 100 * 30) }
  return pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i / 11 * 100).toFixed(1)} ${(46 - y).toFixed(1)}`).join(' ')
}
</script>

<template>
  <div class="pv">
    <div class="pv__chrome">
      <span class="pv__dots"><i /><i /><i /></span>
      <span class="pv__chrome-name px-mono">{{ product.name }} · Console</span>
      <span class="pv__live px-mono"><span class="pv__live-dot" />LIVE</span>
    </div>
    <div class="pv__body">
      <div class="pv__head">
        <span class="pv__cap px-mono">{{ product.capability }}</span>
        <span class="pv__title">{{ product.name }}</span>
      </div>
      <ul class="pv__metrics">
        <li v-for="m in product.metrics" :key="m.label" class="pv__metric">
          <span class="pv__m-label">{{ m.label }}</span>
          <span class="pv__m-value">{{ m.value }}</span>
          <span class="pv__m-bar"><i :style="{ width: m.fill + '%' }" /></span>
        </li>
      </ul>
      <svg class="pv__spark" viewBox="0 0 100 46" preserveAspectRatio="none" aria-hidden="true">
        <path :d="spark(product.name)" fill="none" stroke="var(--px-blue)" stroke-width="1.4" vector-effect="non-scaling-stroke" />
        <path :d="`${spark(product.name)} L100 46 L0 46 Z`" fill="url(#pv-grad)" opacity="0.14" />
        <defs><linearGradient id="pv-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--px-blue)" /><stop offset="1" stop-color="var(--px-blue)" stop-opacity="0" /></linearGradient></defs>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.pv {
  display: flex; flex-direction: column; width: 100%; height: 100%;
  background: var(--px-card, #fff); border-radius: 16px; overflow: hidden;
  box-shadow: 0 0 0 0.5px rgba(16, 33, 74, 0.08), 0 4px 20px rgba(16, 33, 74, 0.06);
}
.pv__chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--px-line); background: rgba(16, 33, 74, 0.02); }
.pv__dots { display: inline-flex; gap: 5px; }
.pv__dots i { width: 8px; height: 8px; border-radius: 50%; background: rgba(16, 33, 74, 0.14); }
.pv__chrome-name { flex: 1; font-size: 9.5px; letter-spacing: 0.08em; color: var(--px-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pv__live { display: inline-flex; align-items: center; gap: 5px; font-size: 9px; letter-spacing: 0.12em; color: var(--px-navy); }
.pv__live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--px-blue); box-shadow: 0 0 0 3px rgba(93, 168, 255, 0.2); }

.pv__body { flex: 1; display: flex; flex-direction: column; padding: 16px 18px 18px; gap: 14px; }
.pv__head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.pv__cap { font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--px-blue); }
.pv__title { font-size: clamp(15px, 1.4vw, 19px); font-weight: 600; letter-spacing: -0.01em; color: var(--px-navy); }

.pv__metrics { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 11px; }
.pv__metric { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 4px 10px; }
.pv__m-label { font-size: 11px; color: var(--px-muted); }
.pv__m-value { font-size: 12.5px; font-weight: 600; color: var(--px-navy); font-variant-numeric: tabular-nums; }
.pv__m-bar { grid-column: 1 / -1; height: 4px; border-radius: 2px; background: rgba(16, 33, 74, 0.08); overflow: hidden; }
.pv__m-bar i { display: block; height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--px-navy), var(--px-blue)); }

.pv__spark { margin-top: auto; width: 100%; height: 46px; }
</style>
