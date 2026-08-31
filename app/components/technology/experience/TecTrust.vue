<script setup lang="ts">
// 08 · TRUSTED BY DESIGN — on the shared TechnologySection instrument system.
// Architectural control principles as a governance control panel; capability-
// focused, no certification claims. Content preserved; the control readout is the
// instrument data inside the shared frame.
import TechnologySection from './TechnologySection.vue'

const principles = ['SECURITY', 'OBSERVABILITY', 'HUMAN OVERSIGHT', 'GOVERNANCE', 'DATA CONTROL', 'EXPLAINABILITY']
const controls = [
  { l: 'Model status', s: 'OPERATIONAL', tone: 'ok' },
  { l: 'Agent permissions', s: 'SCOPED', tone: 'sig' },
  { l: 'Data access', s: 'CONTROLLED', tone: 'sig' },
  { l: 'Audit log', s: 'RECORDING', tone: 'ok' },
  { l: 'Human approval', s: 'REQUIRED', tone: 'warn' },
  { l: 'System health', s: 'NOMINAL', tone: 'ok' },
]
</script>

<template>
  <TechnologySection
    n="08"
    eyebrow="Trusted by Design"
    :headline="['Intelligence', 'with control.']"
    body="SVARA is engineered so intelligence stays secure, observable and accountable — with human oversight, governance and data control built into the architecture."
    :techs="principles"
  >
    <ul class="tr2__controls">
      <li v-for="c in controls" :key="c.l" class="tr2__ctrl">
        <span class="tr2__ctrl-l">{{ c.l }}</span>
        <span class="tr2__ctrl-s" :class="`tr2__ctrl-s--${c.tone}`"><i />{{ c.s }}</span>
      </li>
    </ul>
  </TechnologySection>
</template>

<style scoped>
/* control readout — lives inside the shared .tsec__viz instrument surface */
.tr2__controls { list-style: none; margin: 0; padding: 0; }
.tr2__ctrl { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 15px 18px; border-bottom: 1px solid rgba(20,34,63,0.07); }
.tr2__ctrl:first-child { padding-top: 4px; }
.tr2__ctrl:last-child { border-bottom: none; padding-bottom: 4px; }
.tr2__ctrl-l { font-size: 14px; font-weight: 500; color: var(--ink-primary); }
.tr2__ctrl-s { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; }
.tr2__ctrl-s i { width: 6px; height: 6px; border-radius: 50%; }
.tr2__ctrl-s--ok { color: #2f8f5b; } .tr2__ctrl-s--ok i { background: #2f8f5b; box-shadow: 0 0 0 3px rgba(47,143,91,0.12); }
.tr2__ctrl-s--sig { color: var(--sig); } .tr2__ctrl-s--sig i { background: var(--sig); box-shadow: 0 0 0 3px rgba(63,111,176,0.14); }
.tr2__ctrl-s--warn { color: #b57628; } .tr2__ctrl-s--warn i { background: #b57628; box-shadow: 0 0 0 3px rgba(181,118,40,0.12); }
</style>
