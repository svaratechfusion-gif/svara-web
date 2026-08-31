<script setup lang="ts">
// 06 · EDGE TO CLOUD — now on the shared TechnologySection instrument system
// (timeline · numbered eyebrow · editorial heading · INSTRUMENT panel). Content is
// preserved verbatim; the edge→enterprise→cloud architecture is the instrument
// visual (default slot); the spec metrics ride in the copy column. Interface
// metrics are illustrative demo data.
import TechnologySection from './TechnologySection.vue'

const tiers = [
  { name: 'EDGE', subs: ['Local inference', 'Low latency', 'Offline operation'] },
  { name: 'ENTERPRISE', subs: ['Private infrastructure', 'Data systems', 'Business applications'] },
  { name: 'CLOUD', subs: ['Model training', 'Orchestration', 'Global intelligence'] },
]
const metrics = [
  { l: 'EDGE LATENCY', v: '< 20ms' }, { l: 'SYNC STATUS', v: 'ACTIVE' }, { l: 'SYSTEM HEALTH', v: '99.99%' },
]
</script>

<template>
  <TechnologySection
    n="06"
    eyebrow="Edge to Cloud"
    :headline="['Intelligence where', 'it needs to happen.']"
    body="SVARA distributes intelligence across edge devices, enterprise infrastructure and cloud environments — balancing speed, privacy, resilience and computational scale."
    :reversed="true"
  >
    <template #copy-extra>
      <div class="ec2__metrics">
        <div v-for="m in metrics" :key="m.l" class="ec2__metric">
          <span class="ec2__metric-l hx-mono-label">{{ m.l }}</span><span class="ec2__metric-v">{{ m.v }}</span>
        </div>
      </div>
      <p class="ec2__note hx-mono-label">* Interface values shown are illustrative demo data</p>
    </template>

    <div class="ec2__arch" aria-hidden="true">
      <div class="ec2__phys">PHYSICAL WORLD</div>
      <span class="ec2__down"><span class="ec2__flow" /></span>
      <div v-for="(t, i) in tiers" :key="t.name" class="ec2__tier">
        <div class="ec2__tier-band">
          <span class="ec2__tier-name">{{ t.name }}</span>
          <span class="ec2__tier-subs"><i v-for="s in t.subs" :key="s">{{ s }}</i></span>
        </div>
        <span v-if="i < tiers.length - 1" class="ec2__sync"><b>⇅</b> SYNC</span>
      </div>
    </div>
  </TechnologySection>
</template>

<style scoped>
/* spec metrics in the copy column */
.ec2__metrics { display: flex; flex-wrap: wrap; gap: 26px; margin: 30px 0 0; }
.ec2__metric { display: flex; flex-direction: column; gap: 5px; }
.ec2__metric-l { color: var(--ink-muted); }
.ec2__metric-v { font-family: var(--font-mono); font-size: clamp(20px, 2vw, 28px); font-weight: 500; letter-spacing: -0.01em; color: var(--sig); }
.ec2__note { margin: 16px 0 0; color: var(--ink-muted); opacity: 0.7; text-transform: none; letter-spacing: 0.04em; }

/* architecture visual — lives inside the shared .tsec__viz instrument surface */
.ec2__arch { display: flex; flex-direction: column; align-items: stretch; gap: 0; }
.ec2__phys { text-align: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; color: var(--ink-secondary); padding: 12px; border: 1px dashed rgba(20,34,63,0.18); border-radius: 8px; }
.ec2__down { position: relative; height: 22px; margin: 0 auto; width: 1px; background: rgba(20,34,63,0.18); }
.ec2__flow { position: absolute; left: 50%; top: 0; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: var(--sig); animation: ec2-down 2.4s ease-in-out infinite; }
@keyframes ec2-down { 0% { top: 0; opacity: 0; } 20% { opacity: 1; } 100% { top: 16px; opacity: 0; } }
.ec2__tier { display: flex; flex-direction: column; }
.ec2__tier-band {
  display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 16px 20px;
  background: linear-gradient(158deg, rgba(255,255,255,0.6), rgba(255,255,255,0.36));
  border: 1px solid rgba(20,34,63,0.14);
  box-shadow: 0 22px 46px -32px rgba(16,42,91,0.3), inset 0 1px 0 rgba(255,255,255,0.7);
  clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
}
.ec2__tier:nth-child(3) .ec2__tier-band { border-color: rgba(63,111,176,0.28); }
.ec2__tier-name { font-family: var(--font-mono); font-size: 14px; font-weight: 600; letter-spacing: 0.1em; color: var(--ink-primary); }
.ec2__tier-subs { display: flex; flex-wrap: wrap; gap: 6px; }
.ec2__tier-subs i { font-family: var(--font-mono); font-size: 9px; font-style: normal; letter-spacing: 0.04em; color: var(--ink-secondary); padding: 4px 8px; border: 1px solid rgba(20,34,63,0.1); border-radius: 5px; }
.ec2__sync { align-self: center; margin: 8px 0; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; color: var(--sig); display: inline-flex; align-items: center; gap: 6px; }
.ec2__sync b { font-size: 14px; }

@media (prefers-reduced-motion: reduce) { .ec2__flow { animation: none; opacity: 0; } }
</style>
