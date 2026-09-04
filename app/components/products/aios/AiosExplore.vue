<script setup lang="ts">
// SVARA ONE AI OS — immersive full-screen AI command environment, opened from the ONE AI OS card's
// "Explore" control. SAME architecture as the other product overlays (Teleport, own scroll container
// with data-lenis-prevent, page scroll-locked, Escape/backdrop close → products page keeps its exact
// position). DISTINCT identity: the COMMAND metaphor — one intelligence layer above the enterprise.
// "Command OS" language with a restrained VIOLET accent (+ electric indigo-blue + cyan), own
// osx/ossec/osinst namespace. Contains a REAL working command console (<AiosConsole>) that remounts
// each open → clean new session. All copy VERBATIM from the source (P07, imported from ./aios-content);
// telemetry / briefing values are placeholder/demonstration data, no invented company metrics.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useAiosExplore } from '~/composables/useAiosExplore'
import AiosConsole from './AiosConsole.vue'
import {
  HERO_LINES, BOOT, HEAD_STATUS, CORE_SYSTEMS, PROBLEM_APPS, OLD_WAY, NEW_WAY, COMMAND_EXAMPLE,
  INTENT_PIPE, CONTEXT_ITEMS, ACCESS_GRANTED, ACCESS_RESTRICTED, AUDIT, CONNECTORS, ECO_CONNECT,
  DATA_SOURCES, ORCH_AGENTS, ORCH_STATUS, AGENT_CHAIN, PRIORITY, ARBITRATION, MONITOR, CMD_PANELS,
  ALERTS, BRIEFING_INDICATORS, MOBILE_TABS, ECO_CARDS, STACK, CLIENTS, COMMERCIAL, SIM_CHAIN,
  FINAL_TEL, FINAL_CHIPS,
} from './aios-content'
import ProductDashboard from '~/components/products/worlds/ProductDashboard.vue'

const { open, closeExplore } = useAiosExplore()

// ── interactions ─────────────────────────────────────────────────────────────
const activeClient = ref(0)
const simState = ref<'idle' | 'running'>('idle')
const simStep = ref(-1)
const voiceState = ref<'idle' | 'running'>('idle')
const voiceStep = ref(-1)
const VOICE_CHAIN = ['LISTENING…', 'COMMAND UNDERSTOOD', 'EXECUTING']
const timers: ReturnType<typeof setTimeout>[] = []
function clearTimers(): void { timers.forEach(clearTimeout); timers.length = 0 }
function runChain(state: typeof simState, step: typeof simStep, len: number, interval: number): void {
  clearTimers()
  state.value = 'running'; step.value = -1
  for (let i = 0; i < len; i++) timers.push(setTimeout(() => { step.value = i }, 300 + i * interval))
  timers.push(setTimeout(() => { state.value = 'idle' }, 300 + len * interval + 900))
}
function runSim(): void { runChain(simState, simStep, SIM_CHAIN.length, 520) }
function runVoice(): void { runChain(voiceState, voiceStep, VOICE_CHAIN.length, 640) }

// ── scroll + progress + page lock ───────────────────────────────────────────
const scroller = ref<HTMLElement | null>(null)
const progress = ref(0)
function onScroll(): void {
  const el = scroller.value
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  progress.value = max > 0 ? el.scrollTop / max : 0
}
function lock(): void {
  if (typeof document === 'undefined') return
  ;(useNuxtApp().$lenis as { stop?: () => void } | undefined)?.stop?.()
  document.documentElement.style.overflow = 'hidden'
}
function unlock(): void {
  if (typeof document === 'undefined') return
  ;(useNuxtApp().$lenis as { start?: () => void } | undefined)?.start?.()
  document.documentElement.style.overflow = ''
}
function close(): void { closeExplore() }
function onKey(e: KeyboardEvent): void { if (e.key === 'Escape') close() }
watch(open, (v) => {
  if (typeof document === 'undefined') return
  if (v) {
    lock(); document.addEventListener('keydown', onKey)
    nextTick(() => {
      if (scroller.value) scroller.value.scrollTop = 0
      progress.value = 0; clearTimers()
      simState.value = 'idle'; simStep.value = -1; voiceState.value = 'idle'; voiceStep.value = -1
      activeClient.value = 0
    })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); clearTimers() })

const client = computed(() => CLIENTS[activeClient.value]!)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="osx" role="dialog" aria-modal="true" aria-label="SVARA ONE AI OS"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="osx__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="osx__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="osx__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="osx__header">
            <div class="osx__id">
              <span class="osx__core-i" aria-hidden="true"><i /></span>
              <div>
                <p class="osx__id-title">SVARA ONE AI OS</p>
                <p class="osx__id-sub">UNIFIED INTELLIGENCE LAYER</p>
              </div>
              <span class="osx__status"><i />SYSTEM ONLINE</span>
            </div>
            <div class="osx__head-right">
              <span v-for="s in HEAD_STATUS" :key="s.k" class="osx__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="osx__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="osx__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="osx__inner">
              <!-- HERO -->
              <section class="ossec ossec--hero">
                <p class="oslabel oslabel--cy">04 // Unified Intelligence</p>
                <h1 class="osx__lede">
                  <span v-for="(l, i) in HERO_LINES" :key="l" class="osx__lede-line" :class="{ 'osx__lede-line--accent': i === 1 }" :style="{ '--d': i }">{{ l }}</span>
                </h1>
                <p class="osx__hero-say">One intelligence layer above every system.</p>
                <p class="osx__hero-copy">SVARA ONE AI OS connects every SVARA product and every enterprise application into a single conversational interface — allowing users to command their entire business using natural language.</p>

                <!-- HERO VISUAL: intelligence core -->
                <div class="hub osinst svara-instrument">
                  <span class="osinst__label">ONE AI OS · UNIFIED INTELLIGENCE CORE</span>
                  <div class="hub__ring-wrap">
                    <span class="hub__ring" aria-hidden="true" />
                    <span class="hub__center">ONE<br>AI OS</span>
                    <span v-for="(s, i) in CORE_SYSTEMS" :key="s" class="hub__node" :style="{ '--i': i, '--n': CORE_SYSTEMS.length }">{{ s }}</span>
                  </div>
                  <div class="hub__boot">
                    <span v-for="b in BOOT" :key="b.k" class="hub__boot-cell"><b>{{ b.k }}</b>{{ b.v }}</span>
                  </div>
                  <p class="ossim">◦ SIMULATED INTERFACE STATE</p>
                </div>
              </section>

              <!-- the product's own HUD dashboard, in its own section -->
              <ProductDashboard id="aios" />

              <!-- THE PROBLEM -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">The Big Idea</span><h2 class="ossec__title">Every enterprise has too many systems.</h2></div>
                <div class="prob osinst svara-instrument">
                  <span class="osinst__label">MANY INTERFACES → ONE INTERFACE</span>
                  <div class="caps prob__apps"><span v-for="a in PROBLEM_APPS" :key="a" class="oschip">{{ a }}</span></div>
                  <span class="prob__down" aria-hidden="true">↓</span>
                  <div class="prob__one">ONE AI OS · ONE INTERFACE</div>
                </div>

                <div class="ossec__head ossec__head--mini"><span class="oslabel oslabel--cy">From navigation to command</span></div>
                <div class="nav2cmd">
                  <div class="nav2cmd__col osinst svara-instrument">
                    <span class="osinst__label">OLD WAY</span>
                    <div class="chain-v"><template v-for="(o, i) in OLD_WAY" :key="o"><span class="chain-v__n">{{ o }}</span><span v-if="i < OLD_WAY.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template></div>
                  </div>
                  <div class="nav2cmd__col nav2cmd__col--new osinst svara-instrument">
                    <span class="osinst__label">ONE AI OS</span>
                    <p class="nav2cmd__cmd">“{{ COMMAND_EXAMPLE }}”</p>
                    <div class="chain-v"><template v-for="(n, i) in NEW_WAY" :key="n"><span class="chain-v__n chain-v__n--on">{{ n }}</span><span v-if="i < NEW_WAY.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template></div>
                    <p class="nav2cmd__done">TASK COMPLETE.</p>
                  </div>
                </div>
              </section>

              <!-- COMMAND INTERFACE (working console) -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">Command Interface</span><h2 class="ossec__title">Command your business in one console.</h2></div>
                <AiosConsole />
                <div class="ossec__head ossec__head--mini"><span class="oslabel oslabel--cy">Intent understanding pipeline</span></div>
                <div class="pipe osinst svara-instrument">
                  <span class="osinst__label">INTENT PIPELINE</span>
                  <div class="chain-h"><template v-for="(p, i) in INTENT_PIPE" :key="p"><span class="chain-h__n">{{ p }}</span><span v-if="i < INTENT_PIPE.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
                </div>
              </section>

              <!-- INTELLIGENCE & GOVERNANCE -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">Context &amp; Governance</span><h2 class="ossec__title">It understands who is asking, and what they may do.</h2></div>
                <div class="grid3">
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">CONTEXT ENGINE</span>
                    <div class="chain-v chain-v--tight"><span v-for="c in CONTEXT_ITEMS" :key="c" class="chain-v__n">{{ c }}</span></div>
                    <p class="osmod__ok">CONTEXT ACTIVE</p>
                  </div>
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">ROLE-BASED ACCESS</span>
                    <p class="osmod__role">USER · OPERATIONS MANAGER</p>
                    <div class="acc"><span class="oslabel oslabel--cy">Access</span><span v-for="a in ACCESS_GRANTED" :key="a" class="oschip oschip--on">{{ a }}</span></div>
                    <div class="acc"><span class="oslabel">Restricted</span><span v-for="a in ACCESS_RESTRICTED" :key="a" class="oschip oschip--no">{{ a }}</span></div>
                    <p class="osmod__ok">ACCESS POLICY VERIFIED</p>
                  </div>
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">AUDIT TRAIL</span>
                    <div class="audit"><div v-for="a in AUDIT" :key="a.v" class="audit__row"><span class="audit__k">{{ a.k }}</span><span class="audit__v">{{ a.v }}</span></div></div>
                    <p class="osmod__ok">AUDIT LOGGED</p>
                  </div>
                </div>
              </section>

              <!-- INTEGRATION BUS -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">Universal Integration Bus</span><h2 class="ossec__title">Connect everything.</h2></div>
                <div class="bus osinst svara-instrument">
                  <span class="osinst__label">PRE-BUILT CONNECTORS</span>
                  <div class="caps bus__nodes"><span v-for="c in CONNECTORS" :key="c" class="oschip">{{ c }}</span></div>
                  <span class="bus__down" aria-hidden="true">↓</span>
                  <div class="bus__core">SVARA ONE AI OS</div>
                </div>
                <div class="grid3 bus__extra">
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">SVARA ECOSYSTEM</span>
                    <div class="caps"><span v-for="e in ECO_CONNECT" :key="e" class="oschip oschip--on">{{ e }}</span></div>
                  </div>
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">CUSTOM API</span>
                    <div class="chain-h"><span class="chain-h__n">YOUR SYSTEM</span><span class="chain-h__l" aria-hidden="true">→</span><span class="chain-h__n">API</span><span class="chain-h__l" aria-hidden="true">→</span><span class="chain-h__n chain-h__n--on">ONE AI OS</span></div>
                    <p class="osmod__note">Any system with an API can be connected within days, not months.</p>
                  </div>
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">UNIFIED DATA ACCESS</span>
                    <div class="caps"><span v-for="d in DATA_SOURCES" :key="d" class="oschip">{{ d }}</span></div>
                    <p class="osmod__note">One command interface across every source.</p>
                  </div>
                </div>
              </section>

              <!-- MULTI-AGENT ORCHESTRATION -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">Orchestration</span><h2 class="ossec__title">One command. Many agents.</h2></div>
                <div class="orch osinst svara-instrument">
                  <span class="osinst__label">“Prepare the executive sales briefing for tomorrow.”</span>
                  <div class="orch__agents">
                    <div v-for="(a, i) in ORCH_AGENTS" :key="a" class="orch__agent" :class="'is-' + ORCH_STATUS[i]!.toLowerCase()">
                      <span class="orch__a-n">{{ a }}</span><span class="orch__a-s">{{ ORCH_STATUS[i] }}</span>
                    </div>
                  </div>
                </div>
                <div class="grid2 orch__extra">
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">AGENT CHAIN</span>
                    <div class="chain-v chain-v--tight"><template v-for="(c, i) in AGENT_CHAIN" :key="c.a"><span class="chain-v__n"><b>{{ c.a }}</b> · {{ c.t }}</span><span v-if="i < AGENT_CHAIN.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template></div>
                  </div>
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">PRIORITY ARBITRATION</span>
                    <div class="prio"><span v-for="p in PRIORITY" :key="p.a" class="prio__row"><b>{{ p.a }}</b><i :class="{ 'prio--conflict': p.p === 'RESOURCE CONFLICT' }">{{ p.p }}</i></span></div>
                    <div class="chain-h prio__out"><template v-for="(a, i) in ARBITRATION" :key="a"><span class="chain-h__n chain-h__n--on">{{ a }}</span><span v-if="i < ARBITRATION.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
                  </div>
                </div>
                <div class="grid2 orch__extra">
                  <div class="osmod osinst svara-instrument hitl">
                    <span class="osinst__label">HUMAN-IN-THE-LOOP</span>
                    <p class="hitl__action">HIGH-STAKES ACTION · “Approve payment.”</p>
                    <p class="hitl__req">HUMAN APPROVAL REQUIRED</p>
                    <div class="hitl__btns"><span class="hitl__btn">REVIEW</span><span class="hitl__btn hitl__btn--go">APPROVE</span><span class="hitl__btn hitl__btn--no">REJECT</span></div>
                    <p class="osmod__note">Only after approval → EXECUTING.</p>
                  </div>
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">AGENT COMMAND CENTRE</span>
                    <div class="mon">
                      <div class="mon__head"><span>AGENT</span><span>TASK</span><span>STATUS</span><span>PROGRESS</span></div>
                      <div v-for="m in MONITOR" :key="m.agent" class="mon__row">
                        <span class="mon__a">{{ m.agent }}</span><span>{{ m.task }}</span>
                        <span class="mon__s" :class="'is-' + m.status.toLowerCase()">{{ m.status }}</span>
                        <span class="mon__p"><i :style="{ width: m.progress + '%' }" />{{ m.progress }}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- OPERATIONAL COMMAND CENTER -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">Command Center</span><h2 class="ossec__title">See the business. Command the business.</h2></div>
                <div class="grid3 cc">
                  <div v-for="p in CMD_PANELS" :key="p" class="cc__panel osinst svara-instrument"><span class="cc__dot" />{{ p }}</div>
                </div>
                <div class="grid3 cc__extra">
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">VOICE COMMAND</span>
                    <button type="button" class="osrun osrun--voice" @click="runVoice"><i class="osrun__dot" />{{ voiceState === 'idle' ? 'VOICE COMMAND' : VOICE_CHAIN[voiceStep] || 'LISTENING…' }}</button>
                    <p class="osmod__note">“Show today’s critical alerts.” → command understood → executing.</p>
                  </div>
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">ALERT AGGREGATION</span>
                    <p class="osmod__note osmod__note--top">ANALYSING RELEVANCE</p>
                    <div class="alerts"><div v-for="a in ALERTS" :key="a.k" class="alerts__cell" :class="'is-' + a.k.toLowerCase()"><span class="alerts__v">{{ a.v }}</span><span class="alerts__k">{{ a.k }}</span></div></div>
                  </div>
                  <div class="osmod osinst svara-instrument">
                    <span class="osinst__label">EXECUTIVE INTELLIGENCE · TODAY</span>
                    <div class="caps"><span v-for="b in BRIEFING_INDICATORS" :key="b" class="oschip">{{ b }}</span></div>
                    <p class="osmod__brief">“Three business indicators require attention today.”</p>
                  </div>
                </div>
                <div class="mobile osinst svara-instrument">
                  <span class="osinst__label">MOBILE COMMAND · iOS &amp; ANDROID</span>
                  <div class="caps"><span v-for="t in MOBILE_TABS" :key="t" class="oschip oschip--on">{{ t }}</span></div>
                </div>
              </section>

              <!-- SVARA ECOSYSTEM -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">SVARA Ecosystem</span><h2 class="ossec__title">ONE AI OS gives every SVARA system a voice.</h2></div>
                <div class="grid2">
                  <div v-for="c in ECO_CARDS" :key="c.k" class="eco osinst svara-instrument">
                    <span class="osinst__label">{{ c.k }}</span>
                    <p class="eco__cmd">{{ c.cmd }}</p>
                    <div class="chain-h"><template v-for="(f, i) in c.flow" :key="f"><span class="chain-h__n" :class="{ 'chain-h__n--on': i === c.flow.length - 1 }">{{ f }}</span><span v-if="i < c.flow.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div>
                    <p v-if="c.done" class="eco__done">{{ c.done }}</p>
                  </div>
                </div>

                <div class="ossec__head ossec__head--mini"><span class="oslabel oslabel--cy">ONE AI OS as the SVARA stack</span></div>
                <div class="stack">
                  <template v-for="(l, i) in STACK" :key="l.k">
                    <div class="stack__layer osinst svara-instrument" :class="{ 'stack__layer--core': l.k === 'ONE AI OS' }">
                      <span class="stack__k">{{ l.k }}</span>
                      <div v-if="l.items" class="caps stack__items"><span v-for="it in l.items" :key="it" class="oschip">{{ it }}</span></div>
                    </div>
                    <span v-if="i < STACK.length - 1" class="stack__link" aria-hidden="true">↓</span>
                  </template>
                </div>
              </section>

              <!-- TARGET CLIENTS -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">Target Clients</span><h2 class="ossec__title">Built for those who run on many systems.</h2></div>
                <div class="clients">
                  <div class="clients__tabs">
                    <button v-for="(c, i) in CLIENTS" :key="c.n" type="button" class="clients__tab" :class="{ 'is-active': activeClient === i }" @click="activeClient = i">
                      <span class="clients__tab-n">{{ c.n }}</span>{{ c.k }}
                    </button>
                  </div>
                  <div class="clients__detail osinst svara-instrument">
                    <span class="osinst__label">SEGMENT / {{ client.n }}</span>
                    <p class="clients__k">{{ client.k }}</p>
                    <p class="clients__d">{{ client.d }}</p>
                  </div>
                </div>
              </section>

              <!-- COMMERCIAL -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">Commercial Model</span><h2 class="ossec__title">Deployment &amp; pricing.</h2></div>
                <div class="grid2">
                  <div v-for="c in COMMERCIAL" :key="c.n" class="comm osinst svara-instrument">
                    <span class="osinst__label">{{ c.n }}</span>
                    <p class="comm__k">{{ c.k }}</p>
                    <ul class="comm__spec"><li v-for="s in c.spec" :key="s">{{ s }}</li></ul>
                    <p class="comm__v">{{ c.v }}</p>
                  </div>
                </div>
              </section>

              <!-- COMMAND SIMULATION -->
              <section class="ossec">
                <div class="ossec__head"><span class="oslabel">Command Simulation</span><h2 class="ossec__title">Not answering questions. Orchestrating work.</h2></div>
                <div class="sim osinst svara-instrument">
                  <div class="sim__top">
                    <span class="sim__q">“Prepare tomorrow’s executive briefing.”</span>
                    <button type="button" class="osrun" @click="runSim">{{ simState === 'idle' ? 'RUN COMMAND' : 'ORCHESTRATING…' }} ↗</button>
                  </div>
                  <div class="chain-h">
                    <template v-for="(c, i) in SIM_CHAIN" :key="c">
                      <span class="chain-h__n" :class="{ 'chain-h__n--on': simStep >= i }">{{ c }}</span>
                      <span v-if="i < SIM_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span>
                    </template>
                  </div>
                  <p class="sim__done" :class="{ 'is-on': simStep >= SIM_CHAIN.length - 1 }">EXECUTIVE BRIEFING READY <span>[ VIEW BRIEFING ]</span></p>
                </div>
              </section>

              <!-- FINAL COMMAND + CTA -->
              <section class="ossec ossec--final">
                <div class="finalcmd osinst svara-instrument">
                  <span class="osinst__label">FINAL COMMAND CONSOLE</span>
                  <p class="finalcmd__q">What do you want to command?</p>
                  <p class="finalcmd__ph">Command your business…</p>
                  <div class="finalcmd__tel"><div v-for="t in FINAL_TEL" :key="t.k" class="finalcmd__cell"><span class="finalcmd__v">{{ t.v }}</span><span class="finalcmd__k">{{ t.k }}</span></div></div>
                  <div class="caps finalcmd__chips"><span v-for="c in FINAL_CHIPS" :key="c" class="oschip oschip--on">{{ c }}</span></div>
                </div>
                <p class="osx__final">Stop navigating software.<br><span>Start commanding intelligence.</span></p>
                <p class="osx__final-brand">One interface · All intelligence · Every system · Controlled by conversation.</p>
                <div class="osx__final-cta">
                  <NuxtLink to="/contact" class="osx__cta osx__cta--primary" @click="close">COMMAND SVARA <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/contact" class="osx__cta osx__cta--ghost" @click="close">CONNECT YOUR SYSTEMS</NuxtLink>
                  <NuxtLink to="/contact" class="osx__cta osx__cta--ghost" @click="close">TALK TO SVARA</NuxtLink>
                </div>
              </section>

              <footer class="osx__foot">SVARA · ONE AI OS · UNIFIED INTELLIGENCE LAYER · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.osx {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --os-bg: #06091c; --os-bg2: #0d1330; --os-ink: #eaeeff; --os-muted: rgba(190, 198, 235, 0.6);
  --os-line: rgba(110, 130, 255, 0.26); --os-blue: #5b6cff; --os-cyan: #58d8ff; --os-violet: #9a7dff; --os-green: #46d6a0; --os-amber: #ffb340;
  color: var(--os-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.osx__backdrop { position: absolute; inset: 0; background: rgba(2, 4, 14, 0.7); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.osx__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 14% 5%, rgba(91, 108, 255, 0.14), transparent 30%), radial-gradient(circle at 86% 88%, rgba(154, 125, 255, 0.09), transparent 34%), linear-gradient(160deg, var(--os-bg2), var(--os-bg) 58%, #04061a);
  border-left: 1px solid var(--os-line); border-right: 1px solid var(--os-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.84);
}
.osx__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--os-blue), var(--os-violet)); z-index: 6; }

.osx__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--os-line); background: linear-gradient(90deg, rgba(8, 10, 28, 0.92), rgba(13, 19, 48, 0.6)); }
.osx__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.osx__core-i { position: relative; width: 30px; height: 30px; border: 1px solid var(--os-blue); display: grid; place-items: center; flex-shrink: 0; clip-path: polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%); }
.osx__core-i i { width: 8px; height: 8px; border-radius: 50%; background: var(--os-violet); box-shadow: 0 0 12px var(--os-violet); animation: osx-pulse 2.2s ease-in-out infinite; }
.osx__id-title { margin: 0; font-size: 12.5px; font-weight: 700; letter-spacing: 0.13em; color: #fff; }
.osx__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.16em; color: var(--os-muted); }
.osx__status { display: inline-flex; align-items: center; gap: 7px; margin-left: 6px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--os-green); }
.osx__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--os-green); box-shadow: 0 0 10px var(--os-green); }
.osx__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.osx__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--os-cyan); line-height: 1.4; }
.osx__hstat b { color: var(--os-muted); font-weight: 500; }
.osx__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--os-line); background: rgba(91, 108, 255, 0.06); color: var(--os-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; clip-path: polygon(0 5px, 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%); }
.osx__close:hover { background: rgba(91, 108, 255, 0.16); border-color: var(--os-blue); }

.osx__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--os-blue) transparent; }
.osx__scroll::-webkit-scrollbar { width: 8px; }
.osx__scroll::-webkit-scrollbar-thumb { background: rgba(91, 108, 255, 0.4); border-radius: 8px; }
.osx__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared primitives */
.osinst { position: relative; padding: 40px 18px 18px; background: rgba(9, 13, 40, 0.5); }
.osinst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.14em; color: var(--os-cyan); pointer-events: none; }
.oslabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--os-muted); }
.oslabel--cy { color: var(--os-cyan); }
.oschip { display: inline-flex; align-items: center; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--os-ink); border: 1px solid var(--os-line); background: rgba(91, 108, 255, 0.05); }
.oschip--on { color: var(--os-cyan); border-color: var(--os-blue); background: rgba(91, 108, 255, 0.1); }
.oschip--no { color: var(--os-amber); border-color: rgba(255, 179, 64, 0.4); }
.ossim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--os-muted); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }
.ossec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(91, 108, 255, 0.12); }
.ossec--hero { border-top: 0; padding-top: 6px; }
.ossec__head { margin-bottom: 24px; }
.ossec__head--mini { margin: 34px 0 16px; }
.ossec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; line-height: 1.12; }
.ossec__title span { color: var(--os-cyan); }

/* generic chains */
.chain-h { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.chain-h__n { padding: 9px 12px; border: 1px solid var(--os-line); background: rgba(9, 13, 40, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--os-muted); transition: color 260ms, border-color 260ms, background 260ms; }
.chain-h__n--on { color: var(--os-cyan); border-color: var(--os-blue); background: rgba(91, 108, 255, 0.12); }
.chain-h__l { color: var(--os-blue); }
.chain-v { display: flex; flex-direction: column; gap: 5px; }
.chain-v--tight { gap: 4px; }
.chain-v__n { text-align: center; padding: 9px; border: 1px solid var(--os-line); background: rgba(9, 13, 40, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--os-ink); }
.chain-v__n--on { color: var(--os-cyan); border-color: var(--os-blue); background: rgba(91, 108, 255, 0.08); }
.chain-v__n b { color: var(--os-cyan); }
.chain-v__l { text-align: center; color: var(--os-blue); }

/* HERO */
.osx__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(32px, 5.4vw, 66px); font-weight: 600; line-height: 1.03; letter-spacing: -0.02em; color: #fff; }
.osx__lede-line { display: block; opacity: 0; transform: translateY(14px); filter: blur(6px); animation: osx-line-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--d) * 160ms + 200ms); }
.osx__lede-line--accent { color: var(--os-cyan); }
.osx__hero-say { margin: 20px 0 0; font-size: 13px; letter-spacing: 0.04em; color: var(--os-cyan); }
.osx__hero-copy { margin: 14px 0 30px; max-width: 66ch; font-size: 13.5px; line-height: 1.7; color: var(--os-muted); }

.hub__ring-wrap { position: relative; height: 330px; display: grid; place-items: center; margin-bottom: 18px; }
.hub__ring { position: absolute; width: 246px; height: 246px; border-radius: 50%; border: 1px dashed var(--os-line); }
.hub__center { position: relative; z-index: 2; display: grid; place-items: center; width: 118px; height: 118px; border-radius: 50%; border: 1px solid var(--os-violet); background: rgba(91, 108, 255, 0.12); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: #fff; text-align: center; line-height: 1.3; box-shadow: 0 0 54px -10px rgba(154, 125, 255, 0.8), inset 0 0 30px -12px rgba(88, 216, 255, 0.5); }
.hub__node { position: absolute; padding: 7px 10px; border: 1px solid var(--os-line); background: rgba(9, 13, 40, 0.92); font-size: 8.5px; font-weight: 700; letter-spacing: 0.03em; color: var(--os-ink); transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-150px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.hub__boot { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.hub__boot-cell { display: inline-flex; flex-direction: column; gap: 3px; padding: 10px; border: 1px solid var(--os-line); background: rgba(91, 108, 255, 0.04); font-size: 8.5px; letter-spacing: 0.08em; color: var(--os-green); text-align: center; }
.hub__boot-cell b { color: var(--os-muted); font-weight: 500; font-size: 8px; letter-spacing: 0.1em; }

/* PROBLEM */
.prob { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.prob__apps { justify-content: center; }
.prob__down { color: var(--os-blue); }
.prob__one { padding: 14px 26px; border: 1px solid var(--os-violet); background: rgba(154, 125, 255, 0.08); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--os-cyan); }
.nav2cmd { display: grid; grid-template-columns: 1fr 1.1fr; gap: 12px; }
.nav2cmd__col--new { border: 1px solid var(--os-blue); }
.nav2cmd__cmd { margin: 0 0 14px; font-size: 12px; font-style: italic; color: var(--os-cyan); }
.nav2cmd__done { margin: 14px 0 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--os-green); text-align: center; }

/* pipe */
.pipe .chain-h { justify-content: flex-start; }

/* grids + modules */
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.osmod__ok { margin: 14px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--os-green); }
.osmod__note { margin: 12px 0 0; font-size: 10.5px; line-height: 1.6; color: var(--os-muted); }
.osmod__note--top { margin: 0 0 10px; color: var(--os-cyan); letter-spacing: 0.08em; }
.osmod__role { margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #fff; }
.acc { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 10px; }
.acc > .oslabel { flex: 0 0 68px; }
.audit { display: flex; flex-direction: column; gap: 6px; }
.audit__row { display: flex; gap: 10px; font-size: 9.5px; }
.audit__k { flex: 0 0 92px; color: var(--os-cyan); letter-spacing: 0.06em; }
.audit__v { color: var(--os-ink); }

/* INTEGRATION BUS */
.bus { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.bus__nodes { justify-content: center; }
.bus__down { color: var(--os-blue); }
.bus__core { padding: 14px 28px; border: 1px solid var(--os-violet); background: rgba(154, 125, 255, 0.08); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--os-cyan); }
.bus__extra, .cc__extra, .orch__extra { margin-top: 12px; }

/* ORCHESTRATION */
.orch__agents { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
.orch__agent { display: flex; flex-direction: column; gap: 6px; padding: 12px; border: 1px solid var(--os-line); background: rgba(9, 13, 40, 0.5); text-align: center; }
.orch__agent.is-active { border-color: var(--os-blue); }
.orch__agent.is-complete { border-color: var(--os-green); }
.orch__a-n { font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; color: var(--os-ink); }
.orch__a-s { font-size: 8.5px; letter-spacing: 0.08em; color: var(--os-muted); }
.orch__agent.is-active .orch__a-s { color: var(--os-cyan); }
.orch__agent.is-complete .orch__a-s { color: var(--os-green); }
.prio { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.prio__row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 12px; border: 1px solid var(--os-line); font-size: 10px; }
.prio__row b { color: #fff; }
.prio__row i { font-style: normal; color: var(--os-cyan); }
.prio__row i.prio--conflict { color: var(--os-amber); }
.hitl__action { margin: 0 0 8px; font-size: 11px; color: #fff; }
.hitl__req { margin: 0 0 10px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: var(--os-amber); }
.hitl__btns { display: flex; flex-wrap: wrap; gap: 8px; }
.hitl__btn { padding: 8px 13px; border: 1px solid var(--os-line); font-size: 9.5px; letter-spacing: 0.06em; color: var(--os-ink); }
.hitl__btn--go { color: var(--os-green); border-color: var(--os-green); }
.hitl__btn--no { color: var(--os-amber); border-color: rgba(255, 179, 64, 0.5); }
.mon { display: flex; flex-direction: column; gap: 4px; }
.mon__head, .mon__row { display: grid; grid-template-columns: 1fr 1fr 0.9fr 0.9fr; gap: 8px; align-items: center; }
.mon__head { font-size: 8px; letter-spacing: 0.12em; color: var(--os-muted); padding-bottom: 6px; border-bottom: 1px solid var(--os-line); }
.mon__row { padding: 9px 0; border-bottom: 1px solid rgba(91, 108, 255, 0.1); font-size: 9.5px; font-weight: 700; color: var(--os-ink); }
.mon__a { color: var(--os-cyan); }
.mon__s.is-running { color: var(--os-blue); }
.mon__s.is-complete { color: var(--os-green); }
.mon__s.is-queued { color: var(--os-muted); }
.mon__p { position: relative; display: flex; align-items: center; gap: 6px; }
.mon__p i { display: block; height: 3px; background: var(--os-cyan); max-width: 60%; }

/* COMMAND CENTER */
.cc__panel { display: flex; align-items: center; gap: 10px; padding-top: 34px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--os-ink); }
.cc__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--os-green); box-shadow: 0 0 8px var(--os-green); flex: none; }
.alerts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.alerts__cell { display: flex; flex-direction: column; gap: 4px; align-items: center; padding: 12px 6px; border: 1px solid var(--os-line); }
.alerts__cell.is-critical { border-color: rgba(255, 179, 64, 0.5); }
.alerts__v { font-size: 20px; font-weight: 700; color: var(--os-cyan); }
.alerts__cell.is-critical .alerts__v { color: var(--os-amber); }
.alerts__k { font-size: 8px; letter-spacing: 0.08em; color: var(--os-muted); }
.osmod__brief { margin: 12px 0 0; font-size: 11px; font-style: italic; line-height: 1.6; color: var(--os-ink); }
.mobile { margin-top: 12px; }

/* ECOSYSTEM */
.eco__cmd { margin: 0 0 12px; font-size: 12px; font-style: italic; color: var(--os-cyan); }
.eco__done { margin: 12px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: var(--os-green); }
.stack { display: flex; flex-direction: column; align-items: stretch; gap: 5px; }
.stack__layer { padding-top: 18px; text-align: center; }
.stack__layer--core { border: 1px solid var(--os-violet); }
.stack__k { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.stack__layer--core .stack__k { color: var(--os-cyan); }
.stack__items { justify-content: center; margin-top: 10px; }
.stack__link { align-self: center; color: var(--os-blue); font-size: 15px; }

/* CLIENTS */
.clients { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 14px; }
.clients__tabs { display: flex; flex-direction: column; gap: 8px; }
.clients__tab { display: flex; align-items: center; gap: 12px; padding: 14px 15px; background: rgba(9, 13, 40, 0.5); border: 1px solid transparent; color: var(--os-muted); font: inherit; font-size: 11px; letter-spacing: 0.04em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.clients__tab.is-active { color: #fff; background: rgba(91, 108, 255, 0.08); border-color: var(--os-line); }
.clients__tab-n { color: var(--os-cyan); font-size: 11px; }
.clients__k { margin: 0 0 8px; font-family: var(--font-sans, system-ui, sans-serif); font-size: 20px; font-weight: 650; color: #fff; }
.clients__d { margin: 0; font-size: 12px; line-height: 1.6; color: var(--os-muted); }

/* COMMERCIAL */
.comm { display: flex; flex-direction: column; }
.comm__k { margin: 0 0 12px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--os-cyan); }
.comm__spec { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.comm__spec li { position: relative; padding-left: 14px; font-size: 11px; line-height: 1.5; color: var(--os-muted); }
.comm__spec li::before { content: '›'; position: absolute; left: 0; color: var(--os-cyan); }
.comm__v { margin: 16px 0 0; font-size: clamp(15px, 2vw, 22px); font-weight: 700; color: #fff; }

/* SIM */
.sim__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.sim__q { font-size: 13px; font-style: italic; color: var(--os-ink); }
.sim__done { margin: 16px 0 0; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--os-muted); opacity: 0.5; transition: opacity 400ms; }
.sim__done.is-on { opacity: 1; color: var(--os-green); }
.sim__done span { color: var(--os-cyan); }

/* osrun buttons */
.osrun { flex: none; padding: 9px 14px; border: 1px solid var(--os-blue); background: rgba(91, 108, 255, 0.1); color: var(--os-cyan); font: inherit; font-size: 10px; letter-spacing: 0.09em; cursor: pointer; transition: background 180ms; }
.osrun:hover { background: rgba(91, 108, 255, 0.2); }
.osrun--voice { display: inline-flex; align-items: center; gap: 8px; }
.osrun__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--os-violet); box-shadow: 0 0 8px var(--os-violet); }

/* FINAL */
.ossec--final { text-align: center; border-top: 1px solid var(--os-line); }
.finalcmd { text-align: center; margin-bottom: 30px; }
.finalcmd__q { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(18px, 3vw, 28px); font-weight: 600; color: #fff; }
.finalcmd__ph { margin: 10px 0 20px; font-size: 12px; color: var(--os-muted); }
.finalcmd__tel { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 16px; }
.finalcmd__cell { display: flex; flex-direction: column; gap: 5px; padding: 12px 8px; border: 1px solid var(--os-line); background: rgba(91, 108, 255, 0.04); }
.finalcmd__v { font-size: 12.5px; font-weight: 700; color: var(--os-cyan); }
.finalcmd__k { font-size: 8px; letter-spacing: 0.08em; color: var(--os-muted); }
.finalcmd__chips { justify-content: center; }
.osx__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(24px, 4.2vw, 50px); font-weight: 600; line-height: 1.1; color: #fff; }
.osx__final span { color: var(--os-cyan); }
.osx__final-brand { margin: 22px 0 0; font-size: 11px; letter-spacing: 0.14em; color: var(--os-muted); }
.osx__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.osx__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.osx__cta--primary { background: var(--os-blue); color: #05071c; }
.osx__cta--ghost { background: transparent; color: var(--os-ink); border: 1px solid var(--os-line); }
.osx__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(91, 108, 255, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--os-muted); }

@keyframes osx-pulse { 50% { opacity: 0.4; } }
@keyframes osx-line-in { to { opacity: 1; transform: translateY(0); filter: blur(0); } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid3, .hub__boot, .finalcmd__tel { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid2, .nav2cmd, .clients { grid-template-columns: 1fr; }
  .orch__agents { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .clients__tabs { flex-direction: row; flex-wrap: wrap; }
  .mon__head { display: none; }
  .mon__row { grid-template-columns: 1fr 1fr; gap: 4px 10px; }
  .osx__hstat { display: none; }
}
@media (max-width: 560px) {
  .grid3, .hub__boot, .finalcmd__tel, .orch__agents, .alerts { grid-template-columns: 1fr; }
  .osx__id-sub { display: none; }
  .hub__ring-wrap { height: 290px; }
  .hub__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-118px) rotate(calc(var(--i) * (-360deg / var(--n)))); font-size: 7.5px; padding: 5px 7px; }
}
@media (prefers-reduced-motion: reduce) {
  .osx__core-i i { animation: none; }
  .osx__lede-line { animation: none; opacity: 1; transform: none; filter: none; }
  .chain-h__n, .sim__done { transition: none; }
}
</style>
