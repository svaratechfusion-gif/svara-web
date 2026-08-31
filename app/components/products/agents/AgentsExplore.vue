<script setup lang="ts">
// SVARA AUTONOMOUS AGENTS & VOICE AI — immersive full-screen agent command environment, opened
// from the AI Agents card's "Explore" control. SAME architecture as the other product overlays
// (Teleport, own scroll container with data-lenis-prevent, page scroll-locked, Escape/backdrop
// close → products page keeps its exact position). DISTINCT identity: the ACT metaphor — an
// autonomous digital workforce operating across enterprise systems. Azure + teal + operational-
// green "live workforce" palette, own agx/asec/ainst namespace. All copy VERBATIM from the source
// (P05, imported from ./agents-content); simulated telemetry is labelled. Loop = PERCEIVE → PLAN →
// ACT → REASON → COMMUNICATE → LEARN.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useAgentsExplore } from '~/composables/useAgentsExplore'
import {
  HERO_LINES, BOOT, HEAD_STATUS, HERO_SYSTEMS, HERO_PATH, TRAD_CHAIN, SVARA_CHAIN, LOOP,
  TASK_AGENTS, CUSTOMER_AGENTS, VOICE_PIPE, INBOUND_CHAIN, OUTBOUND_META, OUTBOUND_CHAIN,
  OUTBOUND_USES, V2A_CHAIN, LANGS, EMOTION_CHAIN, ORCH_AGENTS, SHARED_MEMORY, ESCALATION_CHAIN,
  AUDIT, INTEGRATION_APIS, INTEGRATION_SYSTEMS, WORKFLOW_STEPS, WEBHOOKS, ONEAIOS_CHAIN,
  FUNCTIONS, COMMERCIAL, FINAL_TELEMETRY, FINAL_AGENTS,
} from './agents-content'

const { open, closeExplore } = useAgentsExplore()

// ── interactions ─────────────────────────────────────────────────────────────
const activeLoop = ref(0)
const activeFn = ref(0)
const ibState = ref<'idle' | 'running'>('idle')
const ibStep = ref(-1)
const orState = ref<'idle' | 'running'>('idle')
const orStep = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []
function clearTimers(): void { timers.forEach(clearTimeout); timers.length = 0 }
function runChain(state: typeof ibState, step: typeof ibStep, len: number, interval: number): void {
  clearTimers()
  state.value = 'running'; step.value = -1
  for (let i = 0; i < len; i++) timers.push(setTimeout(() => { step.value = i }, 300 + i * interval))
  timers.push(setTimeout(() => { state.value = 'idle' }, 300 + len * interval + 800))
}
function runInbound(): void { runChain(ibState, ibStep, INBOUND_CHAIN.length, 620) }
function runOrch(): void { runChain(orState, orStep, ORCH_AGENTS.length, 520) }

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
      ibState.value = 'idle'; ibStep.value = -1; orState.value = 'idle'; orStep.value = -1
      activeLoop.value = 0; activeFn.value = 0
    })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); clearTimers() })

const loop = computed(() => LOOP[activeLoop.value]!)
const fn = computed(() => FUNCTIONS[activeFn.value]!)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="agx" role="dialog" aria-modal="true" aria-label="SVARA Autonomous Agents & Voice AI"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="agx__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="agx__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="agx__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="agx__header">
            <div class="agx__id">
              <span class="agx__core" aria-hidden="true"><i /></span>
              <div>
                <p class="agx__id-title">SVARA AUTONOMOUS AGENTS</p>
                <p class="agx__id-sub">AGENTIC INTELLIGENCE SYSTEM</p>
              </div>
              <span class="agx__status"><i />SYSTEM ONLINE</span>
            </div>
            <div class="agx__head-right">
              <span v-for="s in HEAD_STATUS" :key="s.k" class="agx__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="agx__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="agx__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="agx__inner">
              <!-- HERO -->
              <section class="asec asec--hero">
                <p class="alabel alabel--blue">02 // Autonomous Intelligence</p>
                <h1 class="agx__lede">
                  <span v-for="(l, i) in HERO_LINES" :key="l" class="agx__lede-line" :class="{ 'agx__lede-line--accent': i === 1 }" :style="{ '--d': i }">{{ l }}</span>
                </h1>
                <p class="agx__hero-say">Autonomous AI for enterprise execution.</p>
                <p class="agx__hero-copy">SVARA Autonomous Agents are intelligent software entities that independently plan, execute and manage complex business tasks — integrating with enterprise systems, communicating in natural language and operating continuously without requiring human initiation at every step.</p>

                <!-- HERO VISUAL: agent core + enterprise systems + live execution path -->
                <div class="core ainst svara-instrument">
                  <span class="ainst__label">SVARA AGENT CORE / LIVE EXECUTION</span>
                  <div class="core__stage">
                    <div class="core__systems">
                      <span v-for="s in HERO_SYSTEMS" :key="s" class="core__sys">{{ s }}</span>
                    </div>
                    <div class="core__hub"><span class="core__hub-node">SVARA<br>AGENT CORE</span></div>
                  </div>
                  <div class="core__path">
                    <template v-for="(p, i) in HERO_PATH" :key="p">
                      <span class="core__pnode" :class="{ 'core__pnode--out': i === HERO_PATH.length - 1 }">{{ p }}</span>
                      <span v-if="i < HERO_PATH.length - 1" class="core__plink" aria-hidden="true">→</span>
                    </template>
                  </div>
                  <p class="acopy core__note">The agent uses the tools on behalf of the human.</p>
                  <div class="core__boot">
                    <span v-for="b in BOOT" :key="b.k" class="core__boot-cell"><b>{{ b.k }}</b>{{ b.v }}</span>
                  </div>
                  <p class="asim">◦ SIMULATED INTERFACE STATE</p>
                </div>
              </section>

              <!-- HUMAN VS AGENT -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Execution Model</span><h2 class="asec__title">Stop running human-dependent loops.</h2></div>
                <div class="vs">
                  <div class="vs__lane ainst svara-instrument">
                    <span class="ainst__label">TRADITIONAL</span>
                    <div class="vs__chain">
                      <template v-for="(c, i) in TRAD_CHAIN" :key="c + i"><span class="vs__node">{{ c }}</span><span v-if="i < TRAD_CHAIN.length - 1" class="vs__link" aria-hidden="true">↓</span></template>
                    </div>
                  </div>
                  <div class="vs__lane vs__lane--svara ainst svara-instrument">
                    <span class="ainst__label">SVARA</span>
                    <div class="vs__chain">
                      <template v-for="(c, i) in SVARA_CHAIN" :key="c + i"><span class="vs__node vs__node--svara">{{ c }}</span><span v-if="i < SVARA_CHAIN.length - 1" class="vs__link vs__link--svara" aria-hidden="true">↓</span></template>
                    </div>
                  </div>
                </div>
                <p class="agx__banner">HUMANS SUPERVISE. <span>AGENTS OPERATE.</span></p>
              </section>

              <!-- AGENT LOOP -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Agentic Architecture</span><h2 class="asec__title">The agent loop.</h2></div>
                <div class="loop">
                  <div class="loop__ring" aria-hidden="true" />
                  <span class="loop__center">AGENT<br>LOOP</span>
                  <button
                    v-for="(n, i) in LOOP" :key="n.k" type="button" class="loop__node" :class="{ 'is-active': activeLoop === i }"
                    :style="{ '--i': i, '--n': LOOP.length }" @click="activeLoop = i"
                  ><b>{{ n.n }}</b>{{ n.k }}</button>
                </div>
                <div class="loop__detail ainst svara-instrument">
                  <span class="ainst__label">{{ loop.n }} / {{ loop.k }}</span>
                  <p class="loop__t">{{ loop.t }}</p>
                  <p v-if="loop.obj" class="loop__obj">{{ loop.obj }}</p>
                  <div v-if="loop.normal" class="loop__row"><span class="alabel alabel--blue">Normal path</span><div class="chain-h"><template v-for="(c, i) in loop.normal" :key="c"><span class="chain-h__n">{{ c }}</span><span v-if="i < loop.normal.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div></div>
                  <div v-if="loop.flow" class="loop__row"><div class="chain-h"><template v-for="(c, i) in loop.flow" :key="c"><span class="chain-h__n chain-h__n--on">{{ c }}</span><span v-if="i < loop.flow.length - 1" class="chain-h__l" aria-hidden="true">→</span></template></div></div>
                  <div v-if="loop.list" class="caps loop__caps"><span v-for="c in loop.list" :key="c" class="achip">{{ c }}</span></div>
                  <div v-if="loop.options" class="loop__row"><span class="alabel alabel--blue">Options</span><div class="caps"><span v-for="o in loop.options" :key="o" class="achip achip--on">{{ o }}</span></div></div>
                  <p v-if="loop.note" class="loop__note">{{ loop.note }}</p>
                </div>
              </section>

              <!-- TASK AGENTS -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Task Agents</span><h2 class="asec__title">Specialists for the work that never stops.</h2></div>
                <div class="grid3">
                  <div v-for="a in TASK_AGENTS" :key="a.n" class="amod ainst svara-instrument">
                    <span class="ainst__label">AGENT / {{ a.n }}</span>
                    <p class="amod__t">{{ a.k }}</p>
                    <div class="chain-v">
                      <template v-for="(c, i) in a.chain" :key="c"><span class="chain-v__n">{{ c }}</span><span v-if="i < a.chain.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template>
                    </div>
                  </div>
                </div>
              </section>

              <!-- CUSTOMER AGENTS -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Customer-Facing Agents</span><h2 class="asec__title">The front office that never closes.</h2></div>
                <div class="grid3">
                  <div v-for="a in CUSTOMER_AGENTS" :key="a.n" class="amod ainst svara-instrument">
                    <span class="ainst__label">AGENT / {{ a.n }}</span>
                    <p class="amod__t amod__t--blue">{{ a.k }} <em v-if="a.tag">{{ a.tag }}</em></p>
                    <ul class="amod__list"><li v-for="it in a.items" :key="it">{{ it }}</li></ul>
                  </div>
                </div>
              </section>

              <!-- VOICE AI -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Voice AI</span><h2 class="asec__title">No typing required.<br><span>Spoken intelligence.</span></h2></div>
                <div class="vpipe">
                  <template v-for="(v, i) in VOICE_PIPE" :key="v"><span class="vpipe__n">{{ v }}</span><span v-if="i < VOICE_PIPE.length - 1" class="vpipe__l" aria-hidden="true">→</span></template>
                </div>

                <div class="voice">
                  <!-- INBOUND (simulated call) -->
                  <div class="voice__col ainst svara-instrument">
                    <div class="voice__top">
                      <span class="ainst__label">INBOUND VOICE AGENT</span>
                      <button type="button" class="arun" @click="runInbound">{{ ibState === 'idle' ? 'SIMULATE CALL' : 'ON CALL…' }} ↗</button>
                    </div>
                    <div class="chain-v">
                      <template v-for="(c, i) in INBOUND_CHAIN" :key="c">
                        <span class="chain-v__n" :class="{ 'is-on': ibStep >= i }">{{ c }}</span>
                        <span v-if="i < INBOUND_CHAIN.length - 1" class="chain-v__l" :class="{ 'is-on': ibStep > i }" aria-hidden="true">↓</span>
                      </template>
                    </div>
                    <p class="asim">◦ NO IVR MENU · SIMULATED CALL FLOW</p>
                  </div>
                  <!-- OUTBOUND -->
                  <div class="voice__col ainst svara-instrument">
                    <span class="ainst__label">OUTBOUND CAMPAIGN</span>
                    <div class="voice__meta"><span v-for="m in OUTBOUND_META" :key="m.k" class="voice__meta-cell"><b>{{ m.k }}</b>{{ m.v }}</span></div>
                    <div class="chain-v">
                      <template v-for="(c, i) in OUTBOUND_CHAIN" :key="c"><span class="chain-v__n">{{ c }}</span><span v-if="i < OUTBOUND_CHAIN.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template>
                    </div>
                    <div class="caps voice__uses"><span v-for="u in OUTBOUND_USES" :key="u" class="achip">{{ u }}</span></div>
                  </div>
                </div>

                <!-- VOICE-TO-ACTION -->
                <div class="v2a ainst svara-instrument">
                  <span class="ainst__label">VOICE-TO-ACTION · FIELD</span>
                  <p class="v2a__q">“Create an inspection report for Unit 12 and schedule maintenance.”</p>
                  <div class="chain-h">
                    <template v-for="(c, i) in V2A_CHAIN" :key="c"><span class="chain-h__n">{{ c }}</span><span v-if="i < V2A_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span></template>
                  </div>
                  <p class="v2a__done">ACTION COMPLETE.</p>
                </div>

                <!-- MULTILINGUAL + EMOTION -->
                <div class="grid2">
                  <div class="amod ainst svara-instrument">
                    <span class="ainst__label">MULTILINGUAL VOICE</span>
                    <div class="caps"><span v-for="l in LANGS" :key="l" class="achip achip--on">{{ l }}</span></div>
                  </div>
                  <div class="amod ainst svara-instrument">
                    <span class="ainst__label">EMOTION DETECTION</span>
                    <div class="chain-v chain-v--tight">
                      <template v-for="(c, i) in EMOTION_CHAIN" :key="c"><span class="chain-v__n" :class="{ 'chain-v__n--alert': i >= 2 }">{{ c }}</span><span v-if="i < EMOTION_CHAIN.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template>
                    </div>
                  </div>
                </div>
              </section>

              <!-- MULTI-AGENT ORCHESTRATION -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Orchestration</span><h2 class="asec__title">One objective. A digital workforce.</h2></div>
                <div class="orch">
                  <div class="orch__ring" aria-hidden="true" />
                  <span class="orch__center">AGENT<br>COORDINATOR</span>
                  <span
                    v-for="(a, i) in ORCH_AGENTS" :key="a.k" class="orch__node" :class="{ 'is-on': orStep >= i }"
                    :style="{ '--i': i, '--n': ORCH_AGENTS.length }"
                  >{{ a.k }}</span>
                </div>
                <div class="orch__run-row">
                  <p class="acopy">Objective — <b>“Onboard this enterprise customer.”</b> The coordinator distributes sub-tasks in parallel.</p>
                  <button type="button" class="arun" @click="runOrch">{{ orState === 'idle' ? 'DISTRIBUTE TASKS' : 'ASSIGNING…' }} ↗</button>
                </div>
                <div class="grid3 orch__tasks">
                  <div v-for="(a, i) in ORCH_AGENTS" :key="a.k" class="orch__task ainst svara-instrument" :class="{ 'is-on': orStep >= i }">
                    <span class="orch__task-k">{{ a.k }}</span><span class="orch__task-arrow" aria-hidden="true">→</span><span class="orch__task-v">{{ a.task }}</span>
                  </div>
                </div>
                <p class="agx__banner agx__banner--sm" :class="{ 'is-on': orStep >= ORCH_AGENTS.length - 1 }">ALL TASKS COMPLETE — <span>CUSTOMER ONBOARDED.</span></p>
              </section>

              <!-- SHARED MEMORY -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Shared Memory</span><h2 class="asec__title">No context lost in the handoff.</h2></div>
                <div class="mem ainst svara-instrument">
                  <span class="ainst__label">SHARED MEMORY · ACTIVE</span>
                  <div class="chain-h chain-h--wrap">
                    <template v-for="(m, i) in SHARED_MEMORY" :key="m"><span class="chain-h__n" :class="{ 'chain-h__n--ctx': m === 'CUSTOMER CONTEXT' }">{{ m }}</span><span v-if="i < SHARED_MEMORY.length - 1" class="chain-h__l" aria-hidden="true">→</span></template>
                  </div>
                </div>
              </section>

              <!-- HUMAN ESCALATION -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Human Control</span><h2 class="asec__title">Autonomy with human control.</h2></div>
                <div class="esc ainst svara-instrument">
                  <span class="ainst__label">HUMAN ESCALATION GATEWAY</span>
                  <div class="chain-v">
                    <template v-for="(c, i) in ESCALATION_CHAIN" :key="c"><span class="chain-v__n" :class="{ 'chain-v__n--human': i === 2 || i === 4 }">{{ c }}</span><span v-if="i < ESCALATION_CHAIN.length - 1" class="chain-v__l" aria-hidden="true">↓</span></template>
                  </div>
                  <p class="acopy">The agent determines when human judgment is required and provides the human with the relevant context.</p>
                </div>
              </section>

              <!-- AUDIT TRAIL -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Explainability</span><h2 class="asec__title">Every action, logged with reasoning.</h2></div>
                <div class="audit ainst svara-instrument">
                  <span class="ainst__label">EXECUTION LOG</span>
                  <div class="audit__head"><span>TIMESTAMP</span><span>AGENT</span><span>ACTION</span><span>REASON</span><span>RESULT</span></div>
                  <div v-for="r in AUDIT" :key="r.ts" class="audit__row">
                    <span class="audit__ts">{{ r.ts }}</span><span>{{ r.agent }}</span><span>{{ r.action }}</span><span class="audit__reason">{{ r.reason }}</span>
                    <span class="audit__result" :class="'is-' + r.result.toLowerCase()">{{ r.result }}</span>
                  </div>
                </div>
              </section>

              <!-- INTEGRATION -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Integration</span><h2 class="asec__title">Agents work where your systems work.</h2></div>
                <div class="integ ainst svara-instrument">
                  <span class="ainst__label">UNIVERSAL API CONNECTIVITY</span>
                  <div class="caps"><span v-for="a in INTEGRATION_APIS" :key="a" class="achip achip--on">{{ a }}</span></div>
                  <div class="caps integ__sys"><span v-for="s in INTEGRATION_SYSTEMS" :key="s" class="achip">{{ s }}</span></div>
                  <span class="integ__down" aria-hidden="true">↓</span>
                  <div class="integ__layer">SVARA AGENT LAYER</div>
                </div>
              </section>

              <!-- NO-CODE WORKFLOW + WEBHOOKS -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">No-Code Builder</span><h2 class="asec__title">Define agent workflows without engineering.</h2></div>
                <div class="wfb ainst svara-instrument">
                  <span class="ainst__label">WORKFLOW BUILDER</span>
                  <div class="wfb__flow">
                    <template v-for="(s, i) in WORKFLOW_STEPS" :key="s.k + i">
                      <span class="wfb__step"><b>{{ s.k }}</b>{{ s.v }}</span>
                      <span v-if="i < WORKFLOW_STEPS.length - 1" class="wfb__link" aria-hidden="true">↓</span>
                    </template>
                  </div>
                </div>
                <div class="hook ainst svara-instrument">
                  <span class="ainst__label">WEBHOOK TRIGGERS</span>
                  <div class="caps"><span v-for="w in WEBHOOKS" :key="w" class="achip">{{ w }}</span></div>
                  <div class="chain-h hook__out"><span class="chain-h__n chain-h__n--on">AGENT ACTIVATED</span><span class="chain-h__l" aria-hidden="true">→</span><span class="chain-h__n">PLAN</span><span class="chain-h__l" aria-hidden="true">→</span><span class="chain-h__n">ACT</span></div>
                  <p class="acopy">Agents don’t wait for a human to initiate every task.</p>
                </div>
              </section>

              <!-- SVARA ONE AI OS -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">SVARA ONE AI OS</span><h2 class="asec__title">Control your digital workforce through natural language.</h2></div>
                <div class="oneos ainst svara-instrument">
                  <span class="ainst__label">NATURAL-LANGUAGE COMMAND</span>
                  <p class="oneos__q">“Review all high-priority support tickets and assign the unresolved cases.”</p>
                  <div class="chain-h chain-h--wrap">
                    <template v-for="(c, i) in ONEAIOS_CHAIN" :key="c"><span class="chain-h__n" :class="{ 'chain-h__n--on': i === 0 }">{{ c }}</span><span v-if="i < ONEAIOS_CHAIN.length - 1" class="chain-h__l" aria-hidden="true">→</span></template>
                  </div>
                </div>
              </section>

              <!-- FUNCTIONAL COMMAND CENTER -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Functional Applications</span><h2 class="asec__title">One autonomous workforce core. Five departments.</h2></div>
                <div class="fn">
                  <div class="fn__tabs">
                    <button v-for="(f, i) in FUNCTIONS" :key="f.k" type="button" class="fn__tab" :class="{ 'is-active': activeFn === i }" @click="activeFn = i">{{ f.k }}</button>
                  </div>
                  <div class="fn__detail ainst svara-instrument">
                    <span class="ainst__label">DEPARTMENT / {{ fn.k }}</span>
                    <div class="fn__tel">
                      <span class="fn__tel-cell"><b>{{ fn.tel.a }}</b>AGENTS ACTIVE</span>
                      <span class="fn__tel-cell"><b>{{ fn.tel.t }}</b>TASKS RUNNING</span>
                      <span class="fn__tel-cell"><b>{{ fn.tel.au }}</b>AUTOMATIONS</span>
                      <span class="fn__tel-cell"><b>{{ fn.tel.e }}</b>HUMAN ESCALATIONS</span>
                    </div>
                    <p class="asim">◦ SIMULATED WORKFORCE TELEMETRY</p>
                    <div class="caps fn__caps"><span v-for="c in fn.caps" :key="c" class="achip">{{ c }}</span></div>
                    <div class="fn__out"><span class="alabel alabel--blue">Outcome</span><span v-for="o in fn.outcome" :key="o" class="achip achip--on">{{ o }}</span></div>
                  </div>
                </div>
                <p class="asim">◦ SOURCE-PROVIDED MEASURABLE OUTCOMES</p>
              </section>

              <!-- COMMERCIAL -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Commercial Model</span><h2 class="asec__title">Deployment &amp; pricing.</h2></div>
                <div class="grid2">
                  <div v-for="c in COMMERCIAL" :key="c.n" class="comm ainst svara-instrument">
                    <span class="ainst__label">{{ c.n }}</span>
                    <p class="comm__k">{{ c.k }}</p>
                    <ul class="comm__spec"><li v-for="s in c.spec" :key="s">{{ s }}</li></ul>
                    <p class="comm__v">{{ c.v }}</p>
                  </div>
                </div>
              </section>

              <!-- AUTONOMOUS WORKFORCE (final OS) -->
              <section class="asec">
                <div class="asec__head"><span class="alabel">Live System</span><h2 class="asec__title">SVARA Autonomous Workforce.</h2></div>
                <div class="ws ainst svara-instrument">
                  <span class="ainst__label">AUTONOMOUS WORKFORCE · LIVE</span>
                  <div class="ws__tel">
                    <div v-for="t in FINAL_TELEMETRY" :key="t.k" class="ws__tel-cell"><span class="ws__tel-v">{{ t.v }}</span><span class="ws__tel-l">{{ t.k }}</span></div>
                  </div>
                  <div class="caps ws__agents"><span v-for="a in FINAL_AGENTS" :key="a" class="achip achip--on"><i class="ws__dot" />{{ a }}</span></div>
                  <p class="asim">◦ SIMULATED LIVE TELEMETRY</p>
                </div>
              </section>

              <!-- FINAL CTA -->
              <section class="asec asec--final">
                <p class="agx__final">Agents do the work.<br><span>Humans make the decisions.</span></p>
                <p class="agx__final-brand">SVARA POWERS THE DIFFERENCE.</p>
                <div class="agx__final-cta">
                  <NuxtLink to="/contact" class="agx__cta agx__cta--primary" @click="close">BUILD YOUR DIGITAL WORKFORCE <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/contact" class="agx__cta agx__cta--ghost" @click="close">TALK TO SVARA</NuxtLink>
                  <NuxtLink to="/ecosystem" class="agx__cta agx__cta--ghost" @click="close">EXPLORE SVARA ONE AI OS</NuxtLink>
                </div>
              </section>

              <footer class="agx__foot">SVARA · AUTONOMOUS AGENTS &amp; VOICE AI · DIGITAL WORKFORCE · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.agx {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --ag-bg: #040a12; --ag-bg2: #07182b; --ag-ink: #e8f4ff; --ag-muted: rgba(180, 208, 226, 0.6);
  --ag-line: rgba(47, 168, 255, 0.26); --ag-blue: #2fa8ff; --ag-cyan: #54e6d6; --ag-green: #3ad17f; --ag-amber: #ffb020;
  color: var(--ag-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.agx__backdrop { position: absolute; inset: 0; background: rgba(2, 6, 12, 0.68); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.agx__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 14% 5%, rgba(47, 168, 255, 0.13), transparent 30%), radial-gradient(circle at 86% 88%, rgba(84, 230, 214, 0.08), transparent 34%), linear-gradient(160deg, var(--ag-bg2), var(--ag-bg) 58%, #02060d);
  border-left: 1px solid var(--ag-line); border-right: 1px solid var(--ag-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.84);
}
.agx__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--ag-blue), var(--ag-cyan)); z-index: 6; }

.agx__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--ag-line); background: linear-gradient(90deg, rgba(6, 14, 24, 0.92), rgba(10, 26, 44, 0.6)); }
.agx__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.agx__core { position: relative; width: 30px; height: 30px; border: 1px solid var(--ag-blue); display: grid; place-items: center; flex-shrink: 0; clip-path: polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%); }
.agx__core i { width: 8px; height: 8px; border-radius: 50%; background: var(--ag-green); box-shadow: 0 0 12px var(--ag-green); animation: agx-pulse 2s ease-in-out infinite; }
.agx__id-title { margin: 0; font-size: 12.5px; font-weight: 700; letter-spacing: 0.13em; color: #fff; }
.agx__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.16em; color: var(--ag-muted); }
.agx__status { display: inline-flex; align-items: center; gap: 7px; margin-left: 6px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--ag-green); }
.agx__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--ag-green); box-shadow: 0 0 10px var(--ag-green); }
.agx__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.agx__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--ag-cyan); line-height: 1.4; }
.agx__hstat b { color: var(--ag-muted); font-weight: 500; }
.agx__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--ag-line); background: rgba(47, 168, 255, 0.06); color: var(--ag-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; clip-path: polygon(0 5px, 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%); }
.agx__close:hover { background: rgba(47, 168, 255, 0.16); border-color: var(--ag-blue); }

.agx__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--ag-blue) transparent; }
.agx__scroll::-webkit-scrollbar { width: 8px; }
.agx__scroll::-webkit-scrollbar-thumb { background: rgba(47, 168, 255, 0.4); border-radius: 8px; }
.agx__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared primitives */
.ainst { position: relative; padding: 40px 18px 18px; background: rgba(7, 18, 34, 0.5); }
.ainst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.16em; color: var(--ag-cyan); pointer-events: none; }
.alabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ag-muted); }
.alabel--blue { color: var(--ag-cyan); }
.achip { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--ag-ink); border: 1px solid var(--ag-line); background: rgba(47, 168, 255, 0.05); }
.achip--on { color: var(--ag-cyan); border-color: var(--ag-blue); background: rgba(47, 168, 255, 0.1); }
.asim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--ag-muted); }
.acopy { margin: 16px 0 0; max-width: 66ch; font-size: 12px; line-height: 1.7; color: var(--ag-muted); }
.acopy b { color: var(--ag-cyan); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }
.asec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(47, 168, 255, 0.12); }
.asec--hero { border-top: 0; padding-top: 6px; }
.asec__head { margin-bottom: 24px; }
.asec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; line-height: 1.12; }
.asec__title span { color: var(--ag-cyan); }

/* generic chains */
.chain-h { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.chain-h--wrap { justify-content: flex-start; }
.chain-h__n { padding: 9px 12px; border: 1px solid var(--ag-line); background: rgba(7, 18, 34, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--ag-ink); }
.chain-h__n--on { color: var(--ag-cyan); border-color: var(--ag-blue); background: rgba(47, 168, 255, 0.1); }
.chain-h__n--ctx { color: var(--ag-green); border-color: var(--ag-green); }
.chain-h__l { color: var(--ag-blue); }
.chain-v { display: flex; flex-direction: column; align-items: stretch; gap: 5px; }
.chain-v--tight { gap: 4px; }
.chain-v__n { text-align: center; padding: 9px; border: 1px solid var(--ag-line); background: rgba(7, 18, 34, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--ag-muted); transition: color 240ms, border-color 240ms, background 240ms; }
.chain-v__n.is-on { color: #fff; border-color: var(--ag-blue); background: rgba(47, 168, 255, 0.12); }
.chain-v__n--alert { color: var(--ag-amber); border-color: rgba(255, 176, 32, 0.45); }
.chain-v__n--human { color: var(--ag-cyan); border-color: var(--ag-blue); }
.chain-v__l { text-align: center; color: rgba(120, 170, 220, 0.4); transition: color 240ms; }
.chain-v__l.is-on { color: var(--ag-blue); }

/* HERO */
.agx__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(32px, 5.6vw, 68px); font-weight: 600; line-height: 1.02; letter-spacing: -0.02em; color: #fff; }
.agx__lede-line { display: block; opacity: 0; transform: translateY(14px); filter: blur(6px); animation: agx-line-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--d) * 160ms + 200ms); }
.agx__lede-line--accent { color: var(--ag-cyan); }
.agx__hero-say { margin: 20px 0 0; font-size: 13px; letter-spacing: 0.04em; color: var(--ag-cyan); }
.agx__hero-copy { margin: 14px 0 30px; max-width: 66ch; font-size: 13.5px; line-height: 1.7; color: var(--ag-muted); }

.core__stage { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 20px; margin-bottom: 20px; }
.core__systems { display: flex; flex-wrap: wrap; gap: 7px; }
.core__sys { padding: 8px 11px; border: 1px solid var(--ag-line); background: rgba(47, 168, 255, 0.05); font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; color: var(--ag-ink); }
.core__hub-node { display: grid; place-items: center; width: 152px; height: 152px; border-radius: 50%; border: 1px solid var(--ag-blue); background: rgba(47, 168, 255, 0.1); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--ag-cyan); text-align: center; line-height: 1.4; box-shadow: 0 0 50px -12px rgba(47, 168, 255, 0.7), inset 0 0 30px -12px rgba(84, 230, 214, 0.5); }
.core__path { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.core__pnode { padding: 8px 12px; border: 1px solid var(--ag-line); background: rgba(7, 18, 34, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--ag-ink); }
.core__pnode--out { color: var(--ag-green); border-color: var(--ag-green); }
.core__plink { color: var(--ag-blue); }
.core__note { margin-top: 16px; }
.core__boot { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-top: 18px; }
.core__boot-cell { display: inline-flex; flex-direction: column; gap: 3px; padding: 10px; border: 1px solid var(--ag-line); background: rgba(47, 168, 255, 0.04); font-size: 8.5px; letter-spacing: 0.08em; color: var(--ag-green); text-align: center; }
.core__boot-cell b { color: var(--ag-muted); font-weight: 500; font-size: 8px; letter-spacing: 0.1em; }

/* HUMAN VS AGENT */
.vs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.vs__lane--svara { border: 1px solid var(--ag-blue); }
.vs__chain { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.vs__node { width: 100%; text-align: center; padding: 10px; border: 1px solid var(--ag-line); background: rgba(7, 18, 34, 0.5); font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--ag-muted); }
.vs__node--svara { color: var(--ag-cyan); border-color: var(--ag-blue); background: rgba(47, 168, 255, 0.08); }
.vs__link { color: rgba(120, 170, 220, 0.4); }
.vs__link--svara { color: var(--ag-blue); }
.agx__banner { margin: 24px 0 0; text-align: center; font-size: clamp(15px, 2.2vw, 22px); font-weight: 700; letter-spacing: 0.06em; color: var(--ag-muted); }
.agx__banner span { color: var(--ag-cyan); }
.agx__banner--sm { margin-top: 16px; font-size: 13px; opacity: 0.5; transition: opacity 400ms; }
.agx__banner--sm.is-on { opacity: 1; }
.agx__banner--sm span { color: var(--ag-green); }

/* AGENT LOOP */
.loop { position: relative; height: 360px; display: grid; place-items: center; margin-bottom: 14px; }
.loop__ring { position: absolute; width: 250px; height: 250px; border-radius: 50%; border: 1px dashed var(--ag-line); }
.loop__center { position: relative; z-index: 2; display: grid; place-items: center; width: 128px; height: 128px; border-radius: 50%; border: 1px solid var(--ag-blue); background: rgba(47, 168, 255, 0.1); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--ag-cyan); text-align: center; box-shadow: 0 0 50px -12px rgba(47, 168, 255, 0.7); }
.loop__node { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 9px 12px; border: 1px solid var(--ag-line); background: rgba(7, 18, 34, 0.92); font: inherit; font-size: 9px; font-weight: 700; letter-spacing: 0.04em; color: var(--ag-ink); cursor: pointer; transition: color 180ms, border-color 180ms, background 180ms; transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-158px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.loop__node b { color: var(--ag-cyan); font-size: 8px; }
.loop__node.is-active { color: #fff; border-color: var(--ag-blue); background: rgba(47, 168, 255, 0.16); }
.loop__detail { min-height: 150px; }
.loop__t { margin: 0 0 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; color: #fff; }
.loop__obj { margin: 0 0 14px; font-size: 12px; font-style: italic; color: var(--ag-cyan); }
.loop__row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 12px; }
.loop__row > .alabel { flex: 0 0 100px; }
.loop__caps { margin-bottom: 12px; }
.loop__note { margin: 4px 0 0; font-size: 11px; letter-spacing: 0.04em; color: var(--ag-green); }

/* grids + modules */
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.amod__t { margin: 0 0 12px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; color: #fff; }
.amod__t--blue { color: var(--ag-cyan); }
.amod__t em { font-style: normal; font-size: 8.5px; letter-spacing: 0.08em; color: var(--ag-green); margin-left: 6px; }
.amod__list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.amod__list li { position: relative; padding-left: 14px; font-size: 10.5px; line-height: 1.5; color: var(--ag-muted); }
.amod__list li::before { content: '›'; position: absolute; left: 0; color: var(--ag-cyan); }

/* VOICE */
.vpipe { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; margin-bottom: 20px; }
.vpipe__n { padding: 10px 14px; border: 1px solid var(--ag-blue); background: rgba(47, 168, 255, 0.06); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--ag-cyan); }
.vpipe__l { color: var(--ag-blue); }
.voice { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.voice__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.arun { flex: none; padding: 9px 14px; border: 1px solid var(--ag-blue); background: rgba(47, 168, 255, 0.1); color: var(--ag-cyan); font: inherit; font-size: 10px; letter-spacing: 0.09em; cursor: pointer; transition: background 180ms; }
.arun:hover { background: rgba(47, 168, 255, 0.2); }
.voice__meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.voice__meta-cell { display: inline-flex; flex-direction: column; gap: 3px; padding: 9px 12px; border: 1px solid var(--ag-line); background: rgba(47, 168, 255, 0.04); font-size: 10px; font-weight: 700; color: var(--ag-cyan); }
.voice__meta-cell b { color: var(--ag-muted); font-weight: 500; font-size: 8px; letter-spacing: 0.1em; }
.voice__uses { margin-top: 14px; }
.v2a { margin-bottom: 12px; }
.v2a__q { margin: 0 0 16px; font-size: 13px; font-style: italic; color: var(--ag-ink); }
.v2a__done { margin: 16px 0 0; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; color: var(--ag-green); }

/* ORCHESTRATION */
.orch { position: relative; height: 340px; display: grid; place-items: center; margin-bottom: 14px; }
.orch__ring { position: absolute; width: 240px; height: 240px; border-radius: 50%; border: 1px dashed var(--ag-line); }
.orch__center { position: relative; z-index: 2; display: grid; place-items: center; width: 130px; height: 130px; border-radius: 50%; border: 1px solid var(--ag-blue); background: rgba(47, 168, 255, 0.1); font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--ag-cyan); text-align: center; box-shadow: 0 0 50px -12px rgba(47, 168, 255, 0.7); }
.orch__node { position: absolute; padding: 8px 11px; border: 1px solid var(--ag-line); background: rgba(7, 18, 34, 0.92); font-size: 9px; font-weight: 700; letter-spacing: 0.04em; color: var(--ag-muted); transition: color 300ms, border-color 300ms, background 300ms; transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-150px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.orch__node.is-on { color: var(--ag-green); border-color: var(--ag-green); background: rgba(58, 209, 127, 0.1); }
.orch__run-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 16px; }
.orch__run-row .acopy { margin: 0; }
.orch__tasks { margin-bottom: 4px; }
.orch__task { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding-top: 34px; opacity: 0.55; transition: opacity 300ms; }
.orch__task.is-on { opacity: 1; }
.orch__task-k { font-size: 10.5px; font-weight: 700; color: var(--ag-cyan); }
.orch__task-arrow { color: var(--ag-blue); }
.orch__task-v { font-size: 10px; color: var(--ag-ink); }

/* SHARED MEMORY / ESCALATION */
.mem .chain-h { margin-top: 4px; }
.esc .acopy { margin-top: 16px; }

/* AUDIT */
.audit__head, .audit__row { display: grid; grid-template-columns: 0.7fr 1.1fr 1.1fr 1.3fr 0.7fr; gap: 10px; align-items: center; }
.audit__head { padding: 0 0 10px; border-bottom: 1px solid var(--ag-line); font-size: 8px; letter-spacing: 0.14em; color: var(--ag-muted); }
.audit__row { padding: 12px 0; border-bottom: 1px solid rgba(47, 168, 255, 0.1); font-size: 10px; font-weight: 700; letter-spacing: 0.03em; color: var(--ag-ink); }
.audit__ts { color: var(--ag-cyan); font-variant-numeric: tabular-nums; }
.audit__reason { color: var(--ag-muted); font-weight: 500; }
.audit__result.is-success { color: var(--ag-green); }
.audit__result.is-pending { color: var(--ag-amber); }

/* INTEGRATION */
.integ { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.integ__sys { justify-content: center; }
.integ__down { color: var(--ag-blue); }
.integ__layer { padding: 14px 26px; border: 1px solid var(--ag-blue); background: rgba(47, 168, 255, 0.1); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--ag-cyan); }

/* WORKFLOW BUILDER / WEBHOOK */
.wfb { margin-bottom: 12px; }
.wfb__flow { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.wfb__step { width: 100%; max-width: 420px; display: inline-flex; flex-direction: column; gap: 3px; text-align: center; padding: 11px; border: 1px solid var(--ag-line); background: rgba(7, 18, 34, 0.5); font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: var(--ag-ink); }
.wfb__step b { color: var(--ag-cyan); font-weight: 500; font-size: 8px; letter-spacing: 0.12em; }
.wfb__link { color: var(--ag-blue); }
.hook__out { justify-content: flex-start; margin-top: 14px; }

/* ONE AI OS */
.oneos__q { margin: 0 0 16px; font-size: 13px; font-style: italic; color: var(--ag-ink); }

/* FUNCTIONAL COMMAND CENTER */
.fn { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 14px; }
.fn__tabs { display: flex; flex-direction: column; gap: 8px; }
.fn__tab { padding: 14px 15px; background: rgba(7, 18, 34, 0.5); border: 1px solid transparent; color: var(--ag-muted); font: inherit; font-size: 11px; letter-spacing: 0.05em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.fn__tab.is-active { color: #fff; background: rgba(47, 168, 255, 0.08); border-color: var(--ag-line); }
.fn__tel { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.fn__tel-cell { display: flex; flex-direction: column; gap: 4px; padding: 12px; border: 1px solid var(--ag-line); background: rgba(47, 168, 255, 0.04); text-align: center; }
.fn__tel-cell b { font-size: clamp(18px, 2.4vw, 26px); color: var(--ag-green); }
.fn__tel-cell { font-size: 8px; letter-spacing: 0.08em; color: var(--ag-muted); }
.fn__caps { margin-top: 16px; }
.fn__out { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 14px; }
.fn__out > .alabel { flex: 0 0 100%; }

/* COMMERCIAL */
.comm { display: flex; flex-direction: column; }
.comm__k { margin: 0 0 12px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--ag-cyan); }
.comm__spec { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.comm__spec li { position: relative; padding-left: 14px; font-size: 11px; line-height: 1.5; color: var(--ag-muted); }
.comm__spec li::before { content: '›'; position: absolute; left: 0; color: var(--ag-cyan); }
.comm__v { margin: 16px 0 0; font-size: clamp(16px, 2.2vw, 24px); font-weight: 700; color: #fff; }

/* AUTONOMOUS WORKFORCE */
.ws__tel { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin-bottom: 16px; }
.ws__tel-cell { display: flex; flex-direction: column; gap: 6px; align-items: center; text-align: center; padding: 12px; border: 1px solid var(--ag-line); background: rgba(47, 168, 255, 0.04); }
.ws__tel-v { font-size: clamp(20px, 3vw, 32px); font-weight: 700; color: var(--ag-cyan); font-variant-numeric: tabular-nums; }
.ws__tel-l { font-size: 8px; letter-spacing: 0.08em; color: var(--ag-muted); }
.ws__agents { justify-content: center; }
.ws__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ag-green); box-shadow: 0 0 8px var(--ag-green); }

/* FINAL */
.asec--final { text-align: center; border-top: 1px solid var(--ag-line); }
.agx__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(26px, 4.4vw, 52px); font-weight: 600; line-height: 1.1; color: #fff; }
.agx__final span { color: var(--ag-cyan); }
.agx__final-brand { margin: 22px 0 0; font-size: 13px; letter-spacing: 0.18em; color: var(--ag-green); }
.agx__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.agx__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.agx__cta--primary { background: var(--ag-blue); color: #04101c; }
.agx__cta--ghost { background: transparent; color: var(--ag-ink); border: 1px solid var(--ag-line); }
.agx__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(47, 168, 255, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--ag-muted); }

@keyframes agx-pulse { 50% { opacity: 0.4; } }
@keyframes agx-line-in { to { opacity: 1; transform: translateY(0); filter: blur(0); } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid3, .fn__tel, .core__boot { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid2, .vs, .voice, .fn { grid-template-columns: 1fr; }
  .core__stage { grid-template-columns: 1fr; }
  .core__hub { justify-self: center; }
  .ws__tel { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .fn__tabs { flex-direction: row; flex-wrap: wrap; }
  .orch__run-row { flex-direction: column; align-items: flex-start; }
  .audit__head { display: none; }
  .audit__row { grid-template-columns: 1fr 1fr; gap: 4px 10px; }
  .agx__hstat { display: none; }
}
@media (max-width: 560px) {
  .grid3, .grid2, .fn__tel, .core__boot, .ws__tel { grid-template-columns: 1fr; }
  .agx__id-sub { display: none; }
  .loop { height: 320px; }
  .loop__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-130px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
  .orch__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-120px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
  .audit__row { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .agx__core i { animation: none; }
  .agx__lede-line { animation: none; opacity: 1; transform: none; filter: none; }
  .chain-v__n, .chain-v__l, .orch__node, .orch__task, .agx__banner--sm { transition: none; }
}
</style>
