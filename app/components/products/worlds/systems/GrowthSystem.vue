<script setup lang="ts">
// GROWTH — live growth-intelligence engine. A conversion funnel with live traffic,
// a channel-attribution list, and a lit attribution path. Select a channel to
// re-weight the funnel and light its path. Deterministic SIMULATED telemetry.
import { reactive, ref, computed } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

const STAGES = ['AWARENESS', 'VISIT', 'ENGAGE', 'QUALIFY', 'CONVERT', 'RETAIN']
const funnel = reactive(STAGES.map((label, i) => ({ label, v: 100 - i * 16, base: 100 - i * 16 })))
interface Ch { key: string; share: number; path: string[] }
const channels = reactive<Ch[]>([
  { key: 'SEO', share: 24, path: ['SEARCH', 'CONTENT', 'PRODUCT', 'DEMO', 'SALES'] },
  { key: 'AEO', share: 11, path: ['ASSISTANT', 'ANSWER', 'PRODUCT', 'DEMO'] },
  { key: 'GEO', share: 9, path: ['LLM', 'CITATION', 'PRODUCT', 'SALES'] },
  { key: 'CONTENT', share: 18, path: ['ARTICLE', 'NEWSLETTER', 'DEMO', 'SALES'] },
  { key: 'PAID', share: 16, path: ['AD', 'LANDING', 'DEMO', 'SALES'] },
  { key: 'SOCIAL', share: 10, path: ['POST', 'PROFILE', 'PRODUCT'] },
  { key: 'EMAIL', share: 7, path: ['CAMPAIGN', 'REPLY', 'DEMO'] },
  { key: 'CRM', share: 5, path: ['LEAD', 'NURTURE', 'SALES'] },
])
const selected = ref<number | null>(null)
const traffic = ref(12480)
const conv = ref(4.2)
const cac = ref(1840)

const selPath = computed(() => selected.value !== null ? channels[selected.value]!.path : ['SEARCH', 'CONTENT', 'PRODUCT PAGE', 'DEMO', 'SALES', 'CONVERSION'])

// EVERY value on this panel is a reported figure — six funnel counts, eight
// channel shares, traffic, conversion and CAC — and the bars are drawn from
// those same numbers. Nothing here is continuous motion, so re-rolling all
// seventeen eight times a second only made the panel churn. One beat instead.
let lastMetric = -99

useTicker((t) => {
  if (t - lastMetric <= 1.2) return
  lastMetric = t

  for (let i = 0; i < funnel.length; i++) {
    const bias = selected.value !== null ? (1 + (channels[selected.value]!.share - 12) / 60) : 1
    funnel[i]!.v = Math.round(funnel[i]!.base * bias * wave(t, i * 1.3, 0.86, 1.06))
  }
  for (let i = 0; i < channels.length; i++) channels[i]!.share = Math.round(wave(t, i * 2.1 + 4, 4, 26))
  traffic.value = Math.round(wave(t, 2, 9200, 15800))
  conv.value = +wave(t, 6, 3.1, 5.6).toFixed(1)
  cac.value = Math.round(wave(t, 8, 1520, 2180))
}, { fps: 8, rootRef: root })
</script>

<template>
  <div ref="root" class="gr">
    <div class="gr__bar">
      <span class="gr__chip">TRAFFIC <em>{{ traffic.toLocaleString() }}</em></span>
      <span class="gr__chip">CONVERSION <em>{{ conv }}%</em></span>
      <span class="gr__chip">CAC <em>₹{{ cac.toLocaleString() }}</em></span>
      <span class="gr__chip gr__chip--grow">PIPELINE <em>₹{{ (traffic * conv / 100 * 4.2 / 1000).toFixed(1) }}L</em></span>
    </div>

    <div class="gr__body">
      <div class="gr__funnel">
        <span class="gr__col-h">CONVERSION FUNNEL</span>
        <div v-for="(s, i) in funnel" :key="s.label" class="gr__stage">
          <span class="gr__stage-l">{{ s.label }}</span>
          <span class="gr__stage-track"><i class="gr__stage-fill" :style="{ width: Math.min(100, s.v) + '%' }" /></span>
          <span class="gr__stage-v">{{ s.v }}</span>
        </div>
        <div class="gr__path">
          <span class="gr__path-h">ATTRIBUTION PATH{{ selected !== null ? ' · ' + channels[selected].key : '' }}</span>
          <div class="gr__path-row">
            <template v-for="(p, i) in selPath" :key="i"><span class="gr__node">{{ p }}</span><span v-if="i < selPath.length - 1" class="gr__arrow">→</span></template>
          </div>
        </div>
      </div>

      <div class="gr__channels">
        <span class="gr__col-h">CHANNELS</span>
        <button v-for="(c, i) in channels" :key="c.key" type="button" class="gr__ch" :class="{ 'is-sel': selected === i }"
          @click="selected = selected === i ? null : i">
          <span class="gr__ch-k">{{ c.key }}</span>
          <span class="gr__ch-track"><i :style="{ width: (c.share / 26 * 100) + '%' }" /></span>
          <span class="gr__ch-v">{{ c.share }}%</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gr { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.gr__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.gr__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.gr__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.gr__chip--grow { margin-left: auto; }
.gr__col-h { font-size: 6.5px; letter-spacing: 0.12em; color: rgba(103, 232, 249, 0.7); }

.gr__body { flex: 1; display: flex; min-height: 0; gap: 0; }
.gr__funnel { flex: 1.5; min-width: 0; padding: 8px 10px; display: flex; flex-direction: column; gap: 6px; }
.gr__stage { display: grid; grid-template-columns: 52px 1fr 28px; align-items: center; gap: 7px; }
.gr__stage-l { font-size: 7px; color: rgba(207, 224, 245, 0.7); letter-spacing: 0.04em; }
.gr__stage-track { height: 8px; background: rgba(103, 232, 249, 0.08); border-radius: 2px; overflow: hidden; }
.gr__stage-fill { display: block; height: 100%; background: linear-gradient(90deg, #6c87fe, #67e8f9); border-radius: 2px; transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.gr__stage-v { font-size: 8px; text-align: right; color: #eaf6ff; font-variant-numeric: tabular-nums; }
.gr__path { margin-top: auto; padding-top: 8px; }
.gr__path-h { font-size: 6.5px; letter-spacing: 0.1em; color: rgba(103, 232, 249, 0.7); }
.gr__path-row { display: flex; flex-wrap: wrap; align-items: center; gap: 3px; margin-top: 5px; }
.gr__node { font-size: 7px; padding: 2px 5px; background: rgba(103, 232, 249, 0.1); border: 1px solid rgba(103, 232, 249, 0.3); color: #9be7f5; }
.gr__arrow { color: rgba(103, 232, 249, 0.5); font-size: 7px; }

.gr__channels { flex: 1; min-width: 0; border-left: 1px solid rgba(103, 232, 249, 0.14); padding: 8px; display: flex; flex-direction: column; gap: 4px; }
.gr__ch { display: grid; grid-template-columns: 44px 1fr 26px; align-items: center; gap: 6px; padding: 3px 4px; background: none; border: 0; cursor: pointer; text-align: left; }
.gr__ch.is-sel { background: rgba(103, 232, 249, 0.1); }
.gr__ch-k { font-size: 7px; color: rgba(207, 224, 245, 0.8); }
.gr__ch.is-sel .gr__ch-k { color: #67e8f9; }
.gr__ch-track { height: 5px; background: rgba(103, 232, 249, 0.08); border-radius: 2px; overflow: hidden; }
.gr__ch-track i { display: block; height: 100%; background: #6c87fe; transition: width 0.5s; }
.gr__ch.is-sel .gr__ch-track i { background: #67e8f9; }
.gr__ch-v { font-size: 7px; text-align: right; color: #eaf6ff; }

@media (max-width: 560px) { .gr__channels { display: none; } }
</style>
