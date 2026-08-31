<script setup lang="ts">
// SVARA GENERATIVE & COGNITIVE AI — immersive full-screen enterprise-intelligence experience,
// opened from the Cognitive AI card's "Explore" control. SAME architecture as Vision/Drone/Edge
// Explore (Teleport overlay, own scroll container with data-lenis-prevent, page scroll-locked,
// Escape/backdrop close → products page keeps its exact position). DISTINCT identity: the
// UNDERSTAND + REASON + ACTIVATE metaphor — enterprise knowledge → cognitive layer → reasoning →
// generation → automation → decision. Midnight-blue "knowledge-graph" palette, own cog/csec/cinst
// namespace (NOT the edge cool-compute look). All copy / figures VERBATIM from the source (P04);
// third-party benchmarks are labelled as source examples, not SVARA outcomes. No invented specs.
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useCognitiveExplore } from '~/composables/useCognitiveExplore'

const { open, closeExplore } = useCognitiveExplore()

// ── content (verbatim from source) ──────────────────────────────────────────
const HERO_LINES = ['From managing', 'information', 'to activating', 'intelligence.']
const BOOT = [
  { k: 'KNOWLEDGE LAYER', v: 'ONLINE' },
  { k: 'REASONING ENGINE', v: 'ONLINE' },
  { k: 'WORKFLOW INTELLIGENCE', v: 'ONLINE' },
  { k: 'DECISION INTELLIGENCE', v: 'ONLINE' },
  { k: 'ENTERPRISE AI', v: 'READY' },
]
const HEAD_STATUS = [
  { k: 'KNOWLEDGE', v: 'ACTIVE' },
  { k: 'REASONING', v: 'ACTIVE' },
  { k: 'AUTOMATION', v: 'READY' },
  { k: 'DECISION LAYER', v: 'ONLINE' },
]
const HERO_SOURCES = ['DOCUMENTS', 'EMAILS', 'POLICIES', 'REPORTS', 'CRM', 'ERP', 'HR', 'FINANCE', 'OPERATIONS', 'WORKFLOWS']
const HERO_BRANCHES = ['KNOWLEDGE', 'REASONING', 'GENERATION', 'AUTOMATION', 'DECISION']
const KP_WALL = ['DATA', 'DOCUMENTS', 'COMMUNICATIONS', 'OPERATIONAL KNOWLEDGE']
const KP_TASKS = ['SEARCH', 'SUMMARISE', 'DRAFT', 'REPORT', 'PROCESS']
const SUITE = [
  { n: '01', k: 'PRIVATE AI WORKSPACE', d: 'A secure, organisation-specific AI environment trained on internal knowledge, documents, policies and workflows.' },
  { n: '02', k: 'AI PROCESS AUTOMATION', d: 'Automates complex multi-step business processes by understanding context — not just rules — where traditional RPA breaks.' },
  { n: '03', k: 'DECISION INTELLIGENCE', d: 'Transforms raw business data into actionable intelligence, surfaced to the right person at the right moment.' },
  { n: '04', k: 'CONVERSATIONAL ENTERPRISE AI', d: 'Every SVARA product surface accessible through natural language across CRM, ERP, HR, Finance and Operations.' },
]
const PRIVATE_CAPS = [
  { t: 'PRIVATE LLM DEPLOYMENT', b: 'Organisation’s own AI instance. No data shared with external models.' },
  { t: 'DOCUMENT INTELLIGENCE', b: 'Ingest contracts, reports, SOPs, emails and manuals — then ask questions directly against them.' },
  { t: 'POLICY-AWARE GENERATION', b: 'Outputs follow company style guides and regulatory frameworks.' },
  { t: 'MULTILINGUAL SUPPORT', b: 'English, Hindi and regional Indian languages.' },
  { t: 'ROLE-BASED KNOWLEDGE ACCESS', b: 'Responses governed by user permissions — Finance AI → Finance data.' },
]
const PRIVATE_APPS = [
  { t: 'AUTOMATED REPORT GENERATION', b: 'Business reports · Performance summaries · Meeting briefs · Executive updates' },
  { t: 'CONTRACT ANALYSIS', b: 'Clause extraction · Risk flagging · Template comparison' },
  { t: 'PROPOSAL WRITING', b: 'Draft proposals using past wins, product specifications and pricing frameworks' },
  { t: 'POLICY Q&A', b: 'HR · Legal · Compliance' },
  { t: 'MEETING INTELLIGENCE', b: 'Transcription · Action item extraction · Follow-up email drafting' },
]
const RPA_CHAIN = ['RULES', 'EXCEPTION', 'BREAK', 'HUMAN REPROGRAMMING']
const COG_CHAIN = ['CONTEXT', 'UNDERSTANDING', 'DECISION', 'ACTION']
const AUTO_STATS = [
  { v: '90%+', l: 'STRAIGHT-THROUGH PROCESSING RATE' },
  { v: '80%', l: 'OF UNSTRUCTURED ENTERPRISE DATA UNLOCKED' },
  { v: '70%', l: 'LOWER MAINTENANCE OVERHEAD' },
]
const WORKFLOWS = [
  { k: 'INVOICE', chain: ['INVOICE', 'EXTRACT', 'VALIDATE', 'MATCH', 'APPROVE', 'COMPLETE'] },
  { k: 'CUSTOMER ONBOARDING', chain: ['DOCUMENT COLLECTION', 'KYC VERIFICATION', 'ACCOUNT PROVISIONING'] },
  { k: 'SUPPORT', chain: ['READ', 'CLASSIFY', 'PRIORITISE', 'ROUTE'] },
  { k: 'COMPLIANCE', chain: ['COMMUNICATIONS + TRANSACTIONS', 'POLICY ANALYSIS', 'VIOLATION DETECTION'] },
]
const DECISION_CAPS = [
  { t: 'NATURAL LANGUAGE ANALYTICS', b: '“Show me which sales reps are below quota and why.” No SQL. No dashboard navigation.' },
  { t: 'PREDICTIVE FORECASTING', b: 'Historical patterns → early warning indicators.' },
  { t: 'ANOMALY DETECTION', b: 'Financial · Operational · Customer.' },
  { t: 'STRATEGIC SCENARIO MODELLING', b: '“What happens to margin if raw material costs rise 15%?”' },
  { t: 'COMPETITIVE INTELLIGENCE', b: 'Market signals · Competitor news · Regulatory changes.' },
]
const SCENARIO_CHAIN = ['ASK A BUSINESS QUESTION', 'AI ANALYSES DATA', 'AI MODELS SCENARIOS', 'DECISION SUPPORT']
const SCENARIO_OUT = ['REVENUE', 'MARGIN', 'COST', 'RISK']
const CONV_SOURCES = ['CRM', 'ERP', 'HR', 'FINANCE', 'OPERATIONS']
const CONV_CAPS = [
  { t: 'UNIVERSAL ENTERPRISE CHAT', b: 'One place to query CRM, ERP, HR, Finance and Operations.' },
  { t: 'VOICE AI', b: 'Field workers · Mobile teams · Accessibility requirements.' },
  { t: 'PERSONALISED AI ASSISTANT', b: 'Learns individual preferences, role requirements and past interaction patterns.' },
  { t: 'ESCALATION MANAGEMENT', b: 'AI handles Tier 1 and Tier 2, then escalates complex issues with full context.' },
]
const ARCH = [
  { n: '01', k: 'FOUNDATION MODEL', b: 'GPT-4 · Claude · Gemini — leveraged via API orchestration or on-premises deployment.' },
  { n: '02', k: 'RAG', b: 'Retrieval-Augmented Generation: enterprise documents → retrieval → context → generation. AI grounded in organisation-owned documents.' },
  { n: '03', k: 'VECTOR DATABASE', b: 'Semantic search across millions of documents. Query → semantic search → relevant knowledge → answer.' },
  { n: '04', k: 'FINE-TUNING PIPELINE', b: 'Domain-specific adaptation — industry terminology and client-specific terminology.' },
  { n: '05', k: 'ON-PREMISES DEPLOYMENT', b: 'Full model stack within client infrastructure. Data remains within client infrastructure.' },
  { n: '06', k: 'GUARDRAILS & GOVERNANCE', b: 'Output filtering · Citation requirements · Confidence scoring · Audit logging.' },
]
const GRAPH_NODES = ['DOCUMENT', 'POLICY', 'PERSON', 'PROJECT', 'CONTRACT', 'CUSTOMER', 'PROCESS', 'PRODUCT']
const QUERY_CHAIN = ['SEARCH', 'RETRIEVE', 'UNDERSTAND CONTEXT', 'GENERATE RESPONSE', 'CITE SOURCE']
const GOVERNANCE = ['PRIVATE DEPLOYMENT', 'ROLE-BASED ACCESS', 'OUTPUT FILTERING', 'CITATIONS', 'CONFIDENCE', 'AUDIT LOG', 'DATA BOUNDARIES', 'ON-PREMISES OPTION']
const VERTICALS = [
  { k: 'FINANCIAL SERVICES', use: ['Contract analysis', 'Regulatory reporting', 'Fraud narrative detection', 'Client communication drafting'], roi: ['Compliance cost reduction', 'Analyst productivity gains of 40–60%'] },
  { k: 'HEALTHCARE & PHARMA', use: ['Clinical documentation', 'Regulatory submissions', 'Drug interaction queries', 'Patient communication'], roi: ['Documentation time reduced by 70%', 'Clinician focus on patient care'] },
  { k: 'LEGAL SERVICES', use: ['Contract review', 'Case research', 'Document drafting', 'Precedent search'], roi: ['Junior task automation', 'Senior lawyer leverage multiplied 3–5x'] },
  { k: 'MANUFACTURING & ENGINEERING', use: ['Technical manual Q&A', 'Maintenance procedure generation', 'Quality report automation'], roi: ['Knowledge transfer from retiring engineers', 'SOP compliance improvement'] },
  { k: 'GOVERNMENT & PUBLIC SECTOR', use: ['Citizen query handling', 'Policy document analysis', 'Inter-departmental knowledge sharing'], roi: ['Service delivery speed', 'Officer productivity', 'Public satisfaction'] },
]
const PROOF = [
  { k: 'JPMORGAN', b: 'AI-powered contract review reduced a 360,000-hour annual manual task to seconds.' },
  { k: 'WALMART', b: 'AI-assisted e-commerce personalisation delivered 22% revenue increase.' },
  { k: 'ENTERPRISE BENCHMARK', b: 'Employees using AI assistants complete knowledge tasks 37% faster.' },
  { k: 'DOCUMENT PROCESSING', b: 'Organisations report 70–80% reduction in manual document handling time.' },
  { k: 'SUPPORT AUTOMATION', b: 'AI handling Tier 1 queries reduces cost per ticket by 60–75%.' },
]
const COMMERCIAL = [
  { n: '01', k: 'WORKSPACE STARTER', spec: 'Private AI workspace · Up to 50 users · 5 document libraries · Standard models', v: '₹2L–₹5L', u: '/ MONTH' },
  { n: '02', k: 'ENTERPRISE COGNITIVE PLATFORM', spec: 'Unlimited users · Custom model fine-tuning · Process automation · Decision intelligence', v: '₹8L–₹30L', u: '/ MONTH' },
  { n: '03', k: 'PROCESS AUTOMATION MODULES', spec: 'Per workflow — invoice processing, onboarding, compliance, support routing', v: '₹1.5L–₹8L', u: 'PER WORKFLOW / MONTH' },
  { n: '04', k: 'ON-PREMISES DEPLOYMENT', spec: 'Full stack within client infrastructure · Annual license + implementation', v: '₹50L–₹5Cr', u: 'IMPLEMENTATION + ₹20L–₹1Cr ANNUAL LICENSE' },
]
const STACK = ['ENTERPRISE DATA', 'KNOWLEDGE', 'RAG', 'COGNITIVE AI', 'REASONING', 'GENERATION', 'AUTOMATION', 'DECISION', 'ACTION']
const LAYER_MERGE = ['PRIVATE AI', 'AUTOMATION', 'DECISION INTELLIGENCE', 'CONVERSATIONAL AI']
const BEFORE = ['SEARCH', 'READ', 'COPY', 'PASTE', 'ANALYSE', 'DRAFT', 'REPORT', 'MANUAL WORK']
const AFTER = ['ASK', 'UNDERSTAND', 'GENERATE', 'AUTOMATE', 'DECIDE', 'ACT']
const EMPLOYEE_MSG = ['Every employee becomes a power user.', 'Every document becomes a queryable knowledge asset.', 'Every workflow becomes an opportunity for intelligent automation.']
const FINAL_DASH = [
  { k: 'KNOWLEDGE', v: 'CONNECTED' }, { k: 'REASONING', v: 'ACTIVE' }, { k: 'WORKFLOWS', v: 'AUTOMATED' },
  { k: 'DECISIONS', v: 'AUGMENTED' }, { k: 'CONVERSATIONS', v: 'NATURAL' }, { k: 'GOVERNANCE', v: 'ENFORCED' },
  { k: 'DEPLOYMENT', v: 'PRIVATE / CLOUD / ON-PREMISES' },
]

// ── interactions ─────────────────────────────────────────────────────────────
const activeSuite = ref(0)
const activeVertical = ref(0)
const activeWorkflow = ref(0)
const wfState = ref<'idle' | 'running'>('idle')
const wfStep = ref(-1)
const scState = ref<'idle' | 'running'>('idle')
const scStep = ref(-1)
const qState = ref<'idle' | 'running'>('idle')
const qStep = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []
function clearTimers(): void { timers.forEach(clearTimeout); timers.length = 0 }
function runChain(state: typeof wfState, step: typeof wfStep, len: number, interval = 500): void {
  clearTimers()
  state.value = 'running'; step.value = -1
  for (let i = 0; i < len; i++) timers.push(setTimeout(() => { step.value = i }, 300 + i * interval))
  timers.push(setTimeout(() => { state.value = 'idle' }, 300 + len * interval + 700))
}
function setWorkflow(i: number): void { clearTimers(); activeWorkflow.value = i; wfState.value = 'idle'; wfStep.value = -1 }
function runWorkflow(): void { runChain(wfState, wfStep, WORKFLOWS[activeWorkflow.value]!.chain.length, 460) }
function runScenario(): void { runChain(scState, scStep, SCENARIO_CHAIN.length, 620) }
function runQuery(): void { runChain(qState, qStep, QUERY_CHAIN.length, 560) }

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
      wfState.value = 'idle'; wfStep.value = -1; scState.value = 'idle'; scStep.value = -1; qState.value = 'idle'; qStep.value = -1
      activeSuite.value = 0; activeVertical.value = 0; activeWorkflow.value = 0
    })
  } else {
    unlock(); document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => { unlock(); document.removeEventListener('keydown', onKey); clearTimers() })

const suite = computed(() => SUITE[activeSuite.value]!)
const wf = computed(() => WORKFLOWS[activeWorkflow.value]!)
const vert = computed(() => VERTICALS[activeVertical.value]!)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open" class="cog" role="dialog" aria-modal="true" aria-label="SVARA Generative & Cognitive AI"
        :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="cog__backdrop" aria-hidden="true" @click="close" />
        <motion.section
          class="cog__panel"
          :initial="{ opacity: 0, scale: 0.96, y: 18 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: 12 }" :transition="{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="cog__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

          <!-- HEADER (fixed) -->
          <header class="cog__header">
            <div class="cog__id">
              <span class="cog__core" aria-hidden="true"><i /></span>
              <div>
                <p class="cog__id-title">SVARA GENERATIVE &amp; COGNITIVE AI</p>
                <p class="cog__id-sub">ENTERPRISE INTELLIGENCE SYSTEM</p>
              </div>
              <span class="cog__status"><i />SYSTEM ONLINE</span>
            </div>
            <div class="cog__head-right">
              <span v-for="s in HEAD_STATUS" :key="s.k" class="cog__hstat"><b>{{ s.k }}</b>{{ s.v }}</span>
              <button type="button" class="cog__close" @click="close">CLOSE <span aria-hidden="true">×</span></button>
            </div>
          </header>

          <div ref="scroller" class="cog__scroll" data-lenis-prevent @scroll="onScroll">
            <div class="cog__inner">
              <!-- HERO -->
              <section class="csec csec--hero">
                <p class="clabel clabel--blue">04 // Cognitive Intelligence</p>
                <h1 class="cog__lede">
                  <span v-for="(l, i) in HERO_LINES" :key="l" class="cog__lede-line" :class="{ 'cog__lede-line--accent': i >= 2 }" :style="{ '--d': i }">{{ l }}</span>
                </h1>
                <p class="cog__hero-say">Enterprise AI. Knowledge Automation. Decision Intelligence.</p>
                <p class="cog__hero-copy">SVARA Generative &amp; Cognitive AI transforms enterprise software from passive systems of record into active systems of intelligence — understanding context, generating outputs, automating reasoning, and enabling employees to focus on decisions rather than tasks.</p>

                <!-- HERO VISUAL: enterprise intelligence core -->
                <div class="core cinst svara-instrument">
                  <span class="cinst__label">ENTERPRISE INTELLIGENCE CORE</span>
                  <div class="core__flow">
                    <div class="core__sources">
                      <span class="core__cap">SOURCES</span>
                      <span v-for="s in HERO_SOURCES" :key="s" class="core__src">{{ s }}</span>
                    </div>
                    <div class="core__hub">
                      <span class="core__hub-node">SVARA<br>COGNITIVE CORE</span>
                    </div>
                    <div class="core__branches">
                      <span class="core__cap">ACTIVATE</span>
                      <span v-for="b in HERO_BRANCHES" :key="b" class="core__branch">{{ b }}</span>
                    </div>
                  </div>
                  <div class="core__boot">
                    <span v-for="b in BOOT" :key="b.k" class="core__boot-cell"><b>{{ b.k }}</b>{{ b.v }}</span>
                  </div>
                  <p class="csim">◦ SIMULATED INTERFACE STATE</p>
                </div>
              </section>

              <!-- KNOWLEDGE PROBLEM -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">The Problem</span><h2 class="csec__title">Your organisation already has the knowledge.<br><span>The problem is activating it.</span></h2></div>
                <p class="cbody">Modern organisations generate enormous volumes of data, documents, communications and operational knowledge. Yet traditional enterprise software largely treats this as content to store rather than intelligence to leverage.</p>
                <div class="kp">
                  <div class="kp__wall">
                    <span v-for="w in KP_WALL" :key="w" class="kp__brick">{{ w }}</span>
                  </div>
                  <div class="kp__tasks">
                    <span v-for="t in KP_TASKS" :key="t" class="cchip">{{ t }}</span>
                  </div>
                  <div class="kp__stat cinst svara-instrument">
                    <span class="cinst__label">SOURCE CONTEXT</span>
                    <span class="kp__stat-v">30–40%</span>
                    <span class="kp__stat-l">of working hours are spent on tasks that AI can perform — as stated in the source document.</span>
                  </div>
                </div>
              </section>

              <!-- CORE PRODUCT SUITE -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Product Suite</span><h2 class="csec__title">One cognitive layer. Four intelligence systems.</h2></div>
                <div class="suite">
                  <button
                    v-for="(s, i) in SUITE" :key="s.n" type="button" class="suite__mod cinst svara-instrument"
                    :class="{ 'is-active': activeSuite === i }" @click="activeSuite = i"
                  >
                    <span class="cinst__label">SYSTEM / {{ s.n }}</span>
                    <span class="suite__k">{{ s.k }}</span>
                    <span class="suite__d" :class="{ 'is-open': activeSuite === i }">{{ s.d }}</span>
                  </button>
                </div>
              </section>

              <!-- PRIVATE AI WORKSPACE -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">01 · Private AI Workspace</span><h2 class="csec__title">SVARA Private AI Workspace</h2><p class="csec__sub">Enterprise Knowledge Intelligence</p></div>
                <p class="cbody">A secure, organisation-specific AI environment trained on internal knowledge, documents, policies and workflows.</p>
                <div class="grid3">
                  <div v-for="(c, i) in PRIVATE_CAPS" :key="c.t" class="cmod cinst svara-instrument">
                    <span class="cinst__label">0{{ i + 1 }}</span>
                    <p class="cmod__t">{{ c.t }}</p><p class="cmod__b">{{ c.b }}</p>
                  </div>
                </div>
                <div class="csec__head csec__head--mini"><span class="clabel clabel--blue">Applications</span></div>
                <div class="grid3">
                  <div v-for="a in PRIVATE_APPS" :key="a.t" class="cmod cinst svara-instrument">
                    <span class="cinst__label">MODULE</span>
                    <p class="cmod__t cmod__t--blue">{{ a.t }}</p><p class="cmod__b">{{ a.b }}</p>
                  </div>
                </div>
              </section>

              <!-- AI PROCESS AUTOMATION -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">02 · Process Automation</span><h2 class="csec__title">Automation that understands context.</h2></div>
                <p class="cbody">SVARA automates complex multi-step business processes that traditional RPA tools cannot handle — because SVARA understands context, not just rules.</p>
                <div class="vs">
                  <div class="vs__lane cinst svara-instrument">
                    <span class="cinst__label">TRADITIONAL RPA</span>
                    <div class="vs__chain">
                      <template v-for="(c, i) in RPA_CHAIN" :key="c"><span class="vs__node vs__node--rpa">{{ c }}</span><span v-if="i < RPA_CHAIN.length - 1" class="vs__link" aria-hidden="true">↓</span></template>
                    </div>
                  </div>
                  <div class="vs__lane vs__lane--cog cinst svara-instrument">
                    <span class="cinst__label">SVARA COGNITIVE AUTOMATION</span>
                    <div class="vs__chain">
                      <template v-for="(c, i) in COG_CHAIN" :key="c"><span class="vs__node vs__node--cog">{{ c }}</span><span v-if="i < COG_CHAIN.length - 1" class="vs__link vs__link--cog" aria-hidden="true">↓</span></template>
                    </div>
                  </div>
                </div>
                <div class="stats">
                  <div v-for="s in AUTO_STATS" :key="s.l" class="stats__cell cinst svara-instrument"><span class="stats__v">{{ s.v }}</span><span class="stats__l">{{ s.l }}</span></div>
                </div>
                <p class="csim">◦ SOURCE-PROVIDED PRODUCT COMPARISON CLAIMS</p>

                <!-- WORKFLOW ENGINE -->
                <div class="csec__head csec__head--mini"><span class="clabel clabel--blue">Workflow engine</span></div>
                <div class="wf">
                  <div class="wf__tabs">
                    <button v-for="(w, i) in WORKFLOWS" :key="w.k" type="button" class="wf__tab" :class="{ 'is-active': activeWorkflow === i }" @click="setWorkflow(i)">{{ w.k }}</button>
                  </div>
                  <div class="wf__stage cinst svara-instrument">
                    <div class="wf__top">
                      <span class="cinst__label">WORKFLOW / {{ wf.k }}</span>
                      <button type="button" class="wf__run" @click="runWorkflow">{{ wfState === 'idle' ? 'RUN WORKFLOW' : 'RUNNING…' }} ↗</button>
                    </div>
                    <div class="wf__chain">
                      <template v-for="(c, i) in wf.chain" :key="c">
                        <span class="wf__node" :class="{ 'is-on': wfStep >= i }">{{ c }}</span>
                        <span v-if="i < wf.chain.length - 1" class="wf__link" :class="{ 'is-on': wfStep > i }" aria-hidden="true">→</span>
                      </template>
                    </div>
                  </div>
                </div>
              </section>

              <!-- DECISION INTELLIGENCE -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">03 · Decision Intelligence</span><h2 class="csec__title">From data to decision.</h2></div>
                <p class="cbody">SVARA transforms raw business data into actionable intelligence that surfaces the right insight to the right person at the right moment.</p>
                <div class="grid3">
                  <div v-for="(c, i) in DECISION_CAPS" :key="c.t" class="cmod cinst svara-instrument">
                    <span class="cinst__label">0{{ i + 1 }}</span>
                    <p class="cmod__t">{{ c.t }}</p><p class="cmod__b">{{ c.b }}</p>
                  </div>
                </div>

                <!-- DECISION SIMULATION -->
                <div class="csec__head csec__head--mini"><span class="clabel clabel--blue">Scenario engine</span></div>
                <div class="sim cinst svara-instrument">
                  <div class="sim__top">
                    <span class="sim__q">RAW MATERIAL COST <b>+15%</b></span>
                    <button type="button" class="wf__run" @click="runScenario">{{ scState === 'idle' ? 'RUN SCENARIO' : 'MODELLING…' }} ↗</button>
                  </div>
                  <div class="sim__chain">
                    <template v-for="(c, i) in SCENARIO_CHAIN" :key="c">
                      <span class="sim__node" :class="{ 'is-on': scStep >= i }">{{ c }}</span>
                      <span v-if="i < SCENARIO_CHAIN.length - 1" class="sim__link" :class="{ 'is-on': scStep > i }" aria-hidden="true">↓</span>
                    </template>
                  </div>
                  <div class="sim__out">
                    <span v-for="o in SCENARIO_OUT" :key="o" class="sim__out-cell" :class="{ 'is-on': scStep >= SCENARIO_CHAIN.length - 1 }">{{ o }}</span>
                  </div>
                  <p class="csim">◦ SIMULATED DECISION-SUPPORT INTERFACE</p>
                </div>
              </section>

              <!-- CONVERSATIONAL AI -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">04 · Conversational Enterprise AI</span><h2 class="csec__title">Stop navigating software.<br><span>Start conversing with intelligence.</span></h2></div>
                <p class="cbody">Every SVARA product surface is accessible through natural language.</p>
                <div class="conv cinst svara-instrument">
                  <span class="cinst__label">UNIVERSAL ENTERPRISE AI</span>
                  <div class="conv__sources"><span v-for="s in CONV_SOURCES" :key="s" class="conv__src">{{ s }}</span></div>
                  <span class="conv__down" aria-hidden="true">↓</span>
                  <div class="conv__hub">UNIVERSAL ENTERPRISE AI</div>
                </div>
                <div class="grid4">
                  <div v-for="c in CONV_CAPS" :key="c.t" class="cmod cinst svara-instrument">
                    <span class="cinst__label">CHANNEL</span>
                    <p class="cmod__t cmod__t--blue">{{ c.t }}</p><p class="cmod__b">{{ c.b }}</p>
                  </div>
                </div>
              </section>

              <!-- TECHNICAL ARCHITECTURE -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Architecture</span><h2 class="csec__title">Under the intelligence.</h2></div>
                <div class="arch">
                  <template v-for="(l, i) in ARCH" :key="l.n">
                    <div class="arch__layer cinst svara-instrument">
                      <span class="cinst__label">LAYER / {{ l.n }}</span>
                      <p class="arch__k">{{ l.k }}</p><p class="arch__b">{{ l.b }}</p>
                    </div>
                    <span v-if="i < ARCH.length - 1" class="arch__link" aria-hidden="true">↓</span>
                  </template>
                </div>
                <p class="csim">◦ FOUNDATION MODELS (GPT-4 / CLAUDE / GEMINI) ARE LEVERAGED THROUGH THE ARCHITECTURE — NOT OWNED BY SVARA</p>
              </section>

              <!-- KNOWLEDGE GRAPH / RAG -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Grounded Intelligence</span><h2 class="csec__title">Retrieval-augmented knowledge graph.</h2></div>
                <div class="kg cinst svara-instrument">
                  <div class="kg__top">
                    <span class="kg__q">“What is the status of Project X?”</span>
                    <button type="button" class="wf__run" @click="runQuery">{{ qState === 'idle' ? 'RUN QUERY' : 'RETRIEVING…' }} ↗</button>
                  </div>
                  <div class="kg__graph">
                    <span class="kg__center">PROJECT X</span>
                    <span v-for="(n, i) in GRAPH_NODES" :key="n" class="kg__node" :class="{ 'is-on': qStep >= 1 }" :style="{ '--i': i, '--n': GRAPH_NODES.length }">{{ n }}</span>
                  </div>
                  <div class="kg__chain">
                    <template v-for="(c, i) in QUERY_CHAIN" :key="c">
                      <span class="kg__step" :class="{ 'is-on': qStep >= i }">{{ c }}</span>
                      <span v-if="i < QUERY_CHAIN.length - 1" class="kg__slink" :class="{ 'is-on': qStep > i }" aria-hidden="true">→</span>
                    </template>
                  </div>
                  <p class="csim">◦ SIMULATED KNOWLEDGE-GRAPH RETRIEVAL</p>
                </div>
              </section>

              <!-- GOVERNANCE -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Security &amp; Governance</span><h2 class="csec__title">Enterprise intelligence needs enterprise control.</h2></div>
                <div class="gov">
                  <div v-for="g in GOVERNANCE" :key="g" class="gov__cell cinst svara-instrument"><span class="gov__dot" />{{ g }}</div>
                </div>
              </section>

              <!-- VERTICALS -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Target Verticals</span><h2 class="csec__title">Five industry intelligence environments.</h2></div>
                <div class="vert">
                  <div class="vert__ring" aria-hidden="true" />
                  <span class="vert__center">{{ vert.k }}</span>
                  <button
                    v-for="(v, i) in VERTICALS" :key="v.k" type="button" class="vert__node" :class="{ 'is-active': activeVertical === i }"
                    :style="{ '--i': i, '--n': VERTICALS.length }" @click="activeVertical = i"
                  >{{ v.k }}</button>
                </div>
                <div class="vert__detail">
                  <div class="vert__flow cinst svara-instrument">
                    <span class="cinst__label">{{ vert.k }}</span>
                    <div class="vert__chain">
                      <span class="vert__fn">DOCUMENTS</span><span class="vert__flink" aria-hidden="true">→</span>
                      <span class="vert__fn vert__fn--core">COGNITIVE AI</span>
                      <template v-for="u in vert.use.slice(0, 2)" :key="u"><span class="vert__flink" aria-hidden="true">→</span><span class="vert__fn">{{ u }}</span></template>
                      <span class="vert__flink" aria-hidden="true">→</span><span class="vert__fn vert__fn--out">DECISION</span>
                    </div>
                    <div class="vert__cols">
                      <div class="vert__col">
                        <span class="clabel clabel--blue">Use cases</span>
                        <span v-for="u in vert.use" :key="u" class="cchip">{{ u }}</span>
                      </div>
                      <div class="vert__col">
                        <span class="clabel clabel--blue">ROI drivers</span>
                        <span v-for="r in vert.roi" :key="r" class="cchip cchip--on">{{ r }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- PROOF OF VALUE -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Proof of Value</span><h2 class="csec__title">What cognitive AI can change.</h2></div>
                <div class="grid3">
                  <div v-for="p in PROOF" :key="p.k" class="cmod cinst svara-instrument">
                    <span class="cinst__label">EXAMPLE</span>
                    <p class="cmod__t cmod__t--blue">{{ p.k }}</p><p class="cmod__b">{{ p.b }}</p>
                  </div>
                </div>
                <p class="csim">◦ EXAMPLES / BENCHMARKS FROM THE SOURCE DOCUMENT — NOT OUTCOMES DELIVERED BY SVARA</p>
              </section>

              <!-- COMMERCIAL -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Commercial Model</span><h2 class="csec__title">Enterprise pricing architecture.</h2></div>
                <div class="grid2">
                  <div v-for="c in COMMERCIAL" :key="c.n" class="comm cinst svara-instrument">
                    <span class="cinst__label">{{ c.n }}</span>
                    <p class="comm__k">{{ c.k }}</p>
                    <p class="comm__spec">{{ c.spec }}</p>
                    <p class="comm__price"><span class="comm__v">{{ c.v }}</span><span class="comm__u">{{ c.u }}</span></p>
                  </div>
                </div>
              </section>

              <!-- INTELLIGENCE STACK -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Intelligence Stack</span><h2 class="csec__title">Enterprise data becomes action.</h2></div>
                <div class="stack">
                  <template v-for="(s, i) in STACK" :key="s">
                    <span class="stack__node" :class="{ 'stack__node--core': s === 'COGNITIVE AI' }">{{ s }}</span>
                    <span v-if="i < STACK.length - 1" class="stack__link" aria-hidden="true">↓</span>
                  </template>
                </div>
                <div class="merge">
                  <div class="merge__ins"><span v-for="m in LAYER_MERGE" :key="m" class="merge__in">{{ m }}</span></div>
                  <span class="merge__link" aria-hidden="true">→</span>
                  <div class="merge__out cinst svara-instrument"><span class="cinst__label">UNIFIED</span>SVARA INTELLIGENCE LAYER</div>
                </div>
              </section>

              <!-- EMPLOYEE EXPERIENCE -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">Employee Experience</span><h2 class="csec__title">From manual work to intelligent work.</h2></div>
                <div class="ee">
                  <div class="ee__col cinst svara-instrument">
                    <span class="cinst__label">BEFORE</span>
                    <span v-for="b in BEFORE" :key="b" class="ee__item ee__item--before">{{ b }}</span>
                  </div>
                  <span class="ee__arrow" aria-hidden="true">→</span>
                  <div class="ee__col ee__col--after cinst svara-instrument">
                    <span class="cinst__label">AFTER</span>
                    <span v-for="a in AFTER" :key="a" class="ee__item ee__item--after">{{ a }}</span>
                  </div>
                </div>
                <ul class="ee__msg">
                  <li v-for="m in EMPLOYEE_MSG" :key="m">{{ m }}</li>
                </ul>
              </section>

              <!-- FINAL SYSTEM DASHBOARD -->
              <section class="csec">
                <div class="csec__head"><span class="clabel">System Status</span><h2 class="csec__title">Enterprise intelligence, operating.</h2></div>
                <div class="fdash">
                  <div v-for="d in FINAL_DASH" :key="d.k" class="fdash__cell cinst svara-instrument">
                    <span class="fdash__k">{{ d.k }}</span><span class="fdash__v">{{ d.v }}</span>
                  </div>
                </div>
              </section>

              <!-- FINAL CTA -->
              <section class="csec csec--final">
                <p class="cog__final">Your organisation already has the knowledge.<br><span>SVARA Cognitive AI activates it.</span></p>
                <p class="cog__final-brand">SVARA GENERATIVE &amp; COGNITIVE AI</p>
                <p class="cog__final-copy">Transform enterprise knowledge into intelligence, automation and decisions.</p>
                <div class="cog__final-cta">
                  <NuxtLink to="/contact" class="cog__cta cog__cta--primary" @click="close">CONNECT WITH SVARA <span aria-hidden="true">↗</span></NuxtLink>
                  <NuxtLink to="/ecosystem" class="cog__cta cog__cta--ghost" @click="close">EXPLORE THE SVARA INTELLIGENCE STACK</NuxtLink>
                </div>
              </section>

              <footer class="cog__foot">SVARA · GENERATIVE &amp; COGNITIVE AI · ENTERPRISE INTELLIGENCE · v1.0</footer>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
.cog {
  position: fixed; inset: 0; z-index: 100000; display: flex; justify-content: center;
  --cg-bg: #060b1c; --cg-bg2: #0c1633; --cg-ink: #eaf0ff; --cg-muted: rgba(188, 202, 240, 0.62);
  --cg-line: rgba(90, 130, 255, 0.26); --cg-blue: #5a82ff; --cg-cyan: #63d8ea; --cg-green: #3fd39a; --cg-amber: #f0a83c;
  color: var(--cg-ink); font-family: var(--font-mono, ui-monospace, monospace);
}
.cog__backdrop { position: absolute; inset: 0; background: rgba(3, 6, 18, 0.68); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.cog__panel {
  position: relative; z-index: 1; width: min(1340px, 100%); height: 100%; display: flex; flex-direction: column; overflow: hidden;
  background: radial-gradient(circle at 14% 5%, rgba(90, 130, 255, 0.14), transparent 30%), radial-gradient(circle at 86% 88%, rgba(99, 216, 234, 0.09), transparent 34%), linear-gradient(160deg, var(--cg-bg2), var(--cg-bg) 58%, #04061a);
  border-left: 1px solid var(--cg-line); border-right: 1px solid var(--cg-line); box-shadow: 0 0 120px -20px rgba(0, 0, 0, 0.84);
}
.cog__progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--cg-blue), var(--cg-cyan)); z-index: 6; }

.cog__header { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; padding: 14px clamp(16px, 3vw, 34px); border-bottom: 1px solid var(--cg-line); background: linear-gradient(90deg, rgba(8, 12, 30, 0.92), rgba(12, 22, 52, 0.6)); }
.cog__id { display: flex; align-items: center; gap: 13px; min-width: 0; }
.cog__core { position: relative; width: 30px; height: 30px; border: 1px solid var(--cg-blue); display: grid; place-items: center; flex-shrink: 0; clip-path: polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%); }
.cog__core i { width: 8px; height: 8px; border-radius: 50%; background: var(--cg-cyan); box-shadow: 0 0 12px var(--cg-cyan); animation: cog-pulse 2.4s ease-in-out infinite; }
.cog__id-title { margin: 0; font-size: 12.5px; font-weight: 700; letter-spacing: 0.12em; color: #fff; }
.cog__id-sub { margin: 2px 0 0; font-size: 9px; letter-spacing: 0.16em; color: var(--cg-muted); }
.cog__status { display: inline-flex; align-items: center; gap: 7px; margin-left: 6px; font-size: 9.5px; letter-spacing: 0.13em; color: var(--cg-green); }
.cog__status i { width: 6px; height: 6px; border-radius: 50%; background: var(--cg-green); box-shadow: 0 0 10px var(--cg-green); }
.cog__head-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.cog__hstat { display: inline-flex; flex-direction: column; font-size: 8px; letter-spacing: 0.1em; color: var(--cg-cyan); line-height: 1.4; }
.cog__hstat b { color: var(--cg-muted); font-weight: 500; }
.cog__close { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid var(--cg-line); background: rgba(90, 130, 255, 0.06); color: var(--cg-ink); font: inherit; font-size: 10px; letter-spacing: 0.13em; cursor: pointer; transition: background 180ms, border-color 180ms; clip-path: polygon(0 5px, 5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%); }
.cog__close:hover { background: rgba(90, 130, 255, 0.16); border-color: var(--cg-blue); }

.cog__scroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--cg-blue) transparent; }
.cog__scroll::-webkit-scrollbar { width: 8px; }
.cog__scroll::-webkit-scrollbar-thumb { background: rgba(90, 130, 255, 0.4); border-radius: 8px; }
.cog__inner { max-width: 1140px; margin-inline: auto; padding: clamp(28px, 5vw, 68px) clamp(16px, 3vw, 40px) 60px; }

/* shared primitives */
.cinst { position: relative; padding: 40px 18px 18px; background: rgba(9, 16, 38, 0.5); }
.cinst__label { position: absolute; top: 9px; left: clamp(14px, 2vw, 22px); z-index: 3; font-size: 9px; letter-spacing: 0.16em; color: var(--cg-cyan); pointer-events: none; }
.clabel { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cg-muted); }
.clabel--blue { color: var(--cg-cyan); }
.cchip { display: inline-flex; align-items: center; padding: 7px 12px; font-size: 10px; letter-spacing: 0.05em; color: var(--cg-ink); border: 1px solid var(--cg-line); background: rgba(90, 130, 255, 0.05); }
.cchip--on { color: var(--cg-cyan); border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.1); }
.csim { margin: 14px 0 0; font-size: 8.5px; letter-spacing: 0.14em; color: var(--cg-muted); }
.cbody { margin: 16px 0 0; max-width: 66ch; font-size: 12.5px; line-height: 1.7; color: var(--cg-muted); }
.csec { padding: clamp(34px, 5vw, 60px) 0; border-top: 1px solid rgba(90, 130, 255, 0.12); }
.csec--hero { border-top: 0; padding-top: 6px; }
.csec__head { margin-bottom: 24px; }
.csec__head--mini { margin: 34px 0 16px; }
.csec__title { margin: 8px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(21px, 3vw, 34px); font-weight: 650; letter-spacing: -0.01em; color: #fff; line-height: 1.12; }
.csec__title span { color: var(--cg-cyan); }
.csec__sub { margin: 8px 0 0; font-size: 12px; letter-spacing: 0.06em; color: var(--cg-cyan); }
.caps { display: flex; flex-wrap: wrap; gap: 8px; }

/* HERO */
.cog__lede { margin: 12px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(30px, 5.4vw, 66px); font-weight: 600; line-height: 1.02; letter-spacing: -0.02em; color: #fff; }
.cog__lede-line { display: block; opacity: 0; transform: translateY(14px); animation: cog-line-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--d) * 130ms + 200ms); }
.cog__lede-line--accent { color: var(--cg-cyan); }
.cog__hero-say { margin: 20px 0 0; font-size: 13px; letter-spacing: 0.04em; color: var(--cg-cyan); }
.cog__hero-copy { margin: 14px 0 30px; max-width: 66ch; font-size: 13.5px; line-height: 1.7; color: var(--cg-muted); }

.core__flow { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; margin-bottom: 20px; }
.core__cap { display: block; font-size: 8px; letter-spacing: 0.2em; color: var(--cg-muted); margin-bottom: 8px; }
.core__sources { display: flex; flex-wrap: wrap; gap: 7px; }
.core__src { padding: 7px 10px; border: 1px solid var(--cg-line); background: rgba(90, 130, 255, 0.05); font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; color: var(--cg-ink); }
.core__hub-node { display: grid; place-items: center; width: 150px; height: 150px; border-radius: 50%; border: 1px solid var(--cg-blue); background: rgba(90, 130, 255, 0.1); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--cg-cyan); text-align: center; line-height: 1.4; box-shadow: 0 0 50px -12px rgba(90, 130, 255, 0.7), inset 0 0 30px -12px rgba(99, 216, 234, 0.5); }
.core__branches { display: flex; flex-direction: column; gap: 7px; align-items: flex-end; }
.core__branch { padding: 8px 12px; border: 1px solid var(--cg-blue); background: rgba(90, 130, 255, 0.1); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-cyan); }
.core__boot { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
.core__boot-cell { display: inline-flex; flex-direction: column; gap: 3px; padding: 10px; border: 1px solid var(--cg-line); background: rgba(90, 130, 255, 0.04); font-size: 8.5px; letter-spacing: 0.08em; color: var(--cg-green); text-align: center; }
.core__boot-cell b { color: var(--cg-muted); font-weight: 500; font-size: 8px; letter-spacing: 0.1em; }

/* KNOWLEDGE PROBLEM */
.kp { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: start; margin-top: 20px; }
.kp__wall { display: flex; flex-wrap: wrap; gap: 8px; }
.kp__brick { padding: 12px 14px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.5); font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-ink); }
.kp__tasks { display: flex; flex-wrap: wrap; gap: 8px; align-content: start; }
.kp__stat { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 6px; }
.kp__stat-v { font-size: clamp(30px, 5vw, 52px); font-weight: 700; color: var(--cg-cyan); }
.kp__stat-l { font-size: 11px; line-height: 1.6; color: var(--cg-muted); max-width: 60ch; }

/* SUITE */
.suite { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.suite__mod { display: flex; flex-direction: column; text-align: left; font: inherit; color: var(--cg-ink); cursor: pointer; border: 0; background: rgba(9, 16, 38, 0.5); transition: background 180ms; }
.suite__mod.is-active { background: rgba(90, 130, 255, 0.09); }
.suite__k { font-size: 14px; font-weight: 700; letter-spacing: 0.05em; color: #fff; }
.suite__d { margin-top: 0; max-height: 0; overflow: hidden; opacity: 0; font-size: 11px; line-height: 1.6; color: var(--cg-muted); transition: max-height 320ms ease, opacity 260ms ease, margin-top 260ms ease; }
.suite__d.is-open { max-height: 120px; opacity: 1; margin-top: 12px; }

/* generic grids + modules */
.grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.cmod__t { margin: 0 0 8px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; color: #fff; }
.cmod__t--blue { color: var(--cg-cyan); }
.cmod__b { margin: 0; font-size: 10.5px; line-height: 1.6; color: var(--cg-muted); }

/* RPA vs COGNITIVE */
.vs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 4px; }
.vs__lane--cog { border: 1px solid var(--cg-blue); }
.vs__chain { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.vs__node { width: 100%; text-align: center; padding: 11px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.5); font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-muted); }
.vs__node--cog { color: var(--cg-cyan); border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.08); }
.vs__link { color: rgba(120, 150, 220, 0.4); }
.vs__link--cog { color: var(--cg-blue); }
.stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
.stats__cell { display: flex; flex-direction: column; gap: 8px; align-items: center; text-align: center; }
.stats__v { font-size: clamp(20px, 3vw, 32px); font-weight: 700; color: var(--cg-green); }
.stats__l { font-size: 9px; letter-spacing: 0.08em; color: var(--cg-muted); }

/* WORKFLOW ENGINE */
.wf { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 14px; }
.wf__tabs { display: flex; flex-direction: column; gap: 8px; }
.wf__tab { padding: 13px 15px; background: rgba(9, 16, 38, 0.5); border: 1px solid transparent; color: var(--cg-muted); font: inherit; font-size: 11px; letter-spacing: 0.05em; text-align: left; cursor: pointer; transition: color 180ms, background 180ms, border-color 180ms; }
.wf__tab.is-active { color: #fff; background: rgba(90, 130, 255, 0.08); border-color: var(--cg-line); }
.wf__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.wf__run { flex: none; padding: 9px 14px; border: 1px solid var(--cg-blue); background: rgba(90, 130, 255, 0.1); color: var(--cg-cyan); font: inherit; font-size: 10px; letter-spacing: 0.09em; cursor: pointer; transition: background 180ms; }
.wf__run:hover { background: rgba(90, 130, 255, 0.2); }
.wf__chain { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.wf__node { padding: 9px 12px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--cg-muted); transition: color 240ms, border-color 240ms, background 240ms; }
.wf__node.is-on { color: #fff; border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.12); }
.wf__link { color: rgba(120, 150, 220, 0.35); transition: color 240ms; }
.wf__link.is-on { color: var(--cg-blue); }

/* DECISION SIMULATION */
.sim__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
.sim__q { font-size: 13px; letter-spacing: 0.04em; color: var(--cg-ink); }
.sim__q b { color: var(--cg-amber); }
.sim__chain { display: flex; flex-direction: column; align-items: center; gap: 7px; margin-bottom: 16px; }
.sim__node { width: 100%; max-width: 460px; text-align: center; padding: 12px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.5); font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-muted); transition: color 260ms, border-color 260ms, background 260ms; }
.sim__node.is-on { color: #fff; border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.1); }
.sim__link { color: rgba(120, 150, 220, 0.35); transition: color 260ms; }
.sim__link.is-on { color: var(--cg-blue); }
.sim__out { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.sim__out-cell { padding: 14px 10px; text-align: center; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.4); font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--cg-muted); opacity: 0.5; transition: opacity 400ms, color 400ms, border-color 400ms; }
.sim__out-cell.is-on { opacity: 1; color: var(--cg-cyan); border-color: var(--cg-blue); }

/* CONVERSATIONAL */
.conv { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.conv__sources { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.conv__src { padding: 9px 13px; border: 1px solid var(--cg-line); background: rgba(90, 130, 255, 0.05); font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-ink); }
.conv__down { color: var(--cg-blue); }
.conv__hub { padding: 14px 26px; border: 1px solid var(--cg-blue); background: rgba(90, 130, 255, 0.1); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--cg-cyan); }

/* ARCHITECTURE */
.arch { display: flex; flex-direction: column; align-items: stretch; gap: 6px; }
.arch__k { margin: 0 0 6px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.arch__b { margin: 0; font-size: 11px; line-height: 1.6; color: var(--cg-muted); max-width: 90ch; }
.arch__link { align-self: center; color: var(--cg-blue); font-size: 15px; }

/* KNOWLEDGE GRAPH */
.kg__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.kg__q { font-size: 13px; font-style: italic; color: var(--cg-ink); }
.kg__graph { position: relative; height: 300px; display: grid; place-items: center; margin-bottom: 8px; }
.kg__center { position: relative; z-index: 2; display: grid; place-items: center; width: 118px; height: 118px; border-radius: 50%; border: 1px solid var(--cg-blue); background: rgba(90, 130, 255, 0.12); font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--cg-cyan); text-align: center; box-shadow: 0 0 44px -10px rgba(90, 130, 255, 0.7); }
.kg__node { position: absolute; padding: 7px 11px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.9); font-size: 9px; font-weight: 700; letter-spacing: 0.04em; color: var(--cg-muted); transition: color 320ms, border-color 320ms; transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-128px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.kg__node.is-on { color: var(--cg-cyan); border-color: var(--cg-blue); }
.kg__chain { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 7px; }
.kg__step { padding: 9px 13px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-muted); transition: color 240ms, border-color 240ms, background 240ms; }
.kg__step.is-on { color: #fff; border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.12); }
.kg__slink { color: rgba(120, 150, 220, 0.35); transition: color 240ms; }
.kg__slink.is-on { color: var(--cg-blue); }

/* GOVERNANCE */
.gov { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.gov__cell { display: flex; align-items: center; gap: 10px; padding-top: 34px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-ink); }
.gov__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--cg-green); box-shadow: 0 0 8px var(--cg-green); flex: none; }

/* VERTICALS */
.vert { position: relative; height: 340px; display: grid; place-items: center; margin-bottom: 14px; }
.vert__ring { position: absolute; width: 240px; height: 240px; border-radius: 50%; border: 1px dashed var(--cg-line); }
.vert__center { position: relative; z-index: 2; display: grid; place-items: center; width: 150px; height: 150px; border-radius: 50%; border: 1px solid var(--cg-blue); background: rgba(90, 130, 255, 0.1); font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-cyan); text-align: center; padding: 10px; box-shadow: 0 0 50px -12px rgba(90, 130, 255, 0.7); }
.vert__node { position: absolute; padding: 8px 11px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.92); font: inherit; font-size: 9px; font-weight: 700; letter-spacing: 0.04em; color: var(--cg-ink); cursor: pointer; transition: color 180ms, border-color 180ms, background 180ms; transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-152px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
.vert__node.is-active { color: var(--cg-cyan); border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.14); }
.vert__chain { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; margin-bottom: 18px; }
.vert__fn { padding: 8px 12px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.5); font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: var(--cg-ink); }
.vert__fn--core { color: var(--cg-cyan); border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.1); }
.vert__fn--out { color: var(--cg-green); border-color: var(--cg-green); }
.vert__flink { color: var(--cg-blue); }
.vert__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.vert__col { display: flex; flex-wrap: wrap; gap: 8px; align-content: start; }
.vert__col .clabel { flex: 1 0 100%; margin-bottom: 2px; }

/* COMMERCIAL */
.comm { display: flex; flex-direction: column; }
.comm__k { margin: 0 0 10px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-cyan); }
.comm__spec { margin: 0; font-size: 11.5px; line-height: 1.6; color: var(--cg-muted); }
.comm__price { display: flex; flex-direction: column; gap: 4px; margin: 16px 0 0; }
.comm__v { font-size: clamp(18px, 2.4vw, 26px); font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }
.comm__u { font-size: 9px; letter-spacing: 0.1em; color: var(--cg-muted); }

/* INTELLIGENCE STACK */
.stack { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.stack__node { width: 100%; max-width: 420px; text-align: center; padding: 11px; border: 1px solid var(--cg-line); background: rgba(9, 16, 38, 0.5); font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; color: var(--cg-ink); }
.stack__node--core { color: var(--cg-cyan); border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.12); }
.stack__link { color: var(--cg-blue); }
.merge { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 14px; margin-top: 24px; }
.merge__ins { display: flex; flex-direction: column; gap: 8px; }
.merge__in { padding: 10px 15px; border: 1px solid var(--cg-line); background: rgba(90, 130, 255, 0.05); font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-ink); text-align: center; }
.merge__link { color: var(--cg-blue); font-size: 18px; }
.merge__out { text-align: center; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: var(--cg-cyan); padding: 34px 26px 22px; }

/* EMPLOYEE EXPERIENCE */
.ee { display: grid; grid-template-columns: 1fr auto 1fr; align-items: start; gap: 14px; }
.ee__col { display: flex; flex-wrap: wrap; gap: 8px; align-content: start; }
.ee__col--after { border: 1px solid var(--cg-blue); }
.ee__item { padding: 9px 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; border: 1px solid var(--cg-line); }
.ee__item--before { color: var(--cg-muted); background: rgba(9, 16, 38, 0.5); }
.ee__item--after { color: var(--cg-cyan); border-color: var(--cg-blue); background: rgba(90, 130, 255, 0.08); }
.ee__arrow { align-self: center; color: var(--cg-blue); font-size: 20px; }
.ee__msg { margin: 20px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
.ee__msg li { position: relative; padding-left: 18px; font-size: 12px; line-height: 1.6; color: var(--cg-ink); }
.ee__msg li::before { content: '›'; position: absolute; left: 0; color: var(--cg-cyan); }

/* FINAL DASHBOARD */
.fdash { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.fdash__cell { display: flex; flex-direction: column; gap: 8px; padding-top: 30px; }
.fdash__k { font-size: 9px; letter-spacing: 0.12em; color: var(--cg-muted); }
.fdash__v { font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: var(--cg-cyan); }

/* FINAL */
.csec--final { text-align: center; border-top: 1px solid var(--cg-line); }
.cog__final { margin: 0; font-family: var(--font-sans, system-ui, sans-serif); font-size: clamp(24px, 4.2vw, 50px); font-weight: 600; line-height: 1.1; color: #fff; }
.cog__final span { color: var(--cg-cyan); }
.cog__final-brand { margin: 22px 0 0; font-size: 12px; letter-spacing: 0.2em; color: var(--cg-muted); }
.cog__final-copy { margin: 12px auto 0; max-width: 56ch; font-size: 12.5px; line-height: 1.7; color: var(--cg-muted); }
.cog__final-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 26px; }
.cog__cta { display: inline-flex; align-items: center; gap: 10px; padding: 15px 28px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
.cog__cta--primary { background: var(--cg-blue); color: #05091c; }
.cog__cta--ghost { background: transparent; color: var(--cg-ink); border: 1px solid var(--cg-line); }
.cog__foot { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(90, 130, 255, 0.12); text-align: center; font-size: 9px; letter-spacing: 0.2em; color: var(--cg-muted); }

@keyframes cog-pulse { 50% { opacity: 0.45; } }
@keyframes cog-line-in { to { opacity: 1; transform: translateY(0); } }

/* ── responsive ── */
@media (max-width: 900px) {
  .grid4, .grid3, .gov, .fdash { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid2, .suite, .core__boot { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .core__flow, .kp, .vs, .stats, .wf, .sim__out, .ee, .vert__cols { grid-template-columns: 1fr; }
  .core__branches { align-items: flex-start; }
  .wf__tabs { flex-direction: row; flex-wrap: wrap; }
  .ee__arrow { transform: rotate(90deg); justify-self: center; }
  .cog__hstat { display: none; }
}
@media (max-width: 560px) {
  .grid4, .grid3, .grid2, .gov, .fdash, .suite, .core__boot, .stats { grid-template-columns: 1fr; }
  .cog__id-sub { display: none; }
  .merge { flex-direction: column; }
  .merge__link { transform: rotate(90deg); }
  .vert { height: 300px; }
  .kg__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-108px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
  .vert__node { transform: rotate(calc(var(--i) * (360deg / var(--n)))) translateY(-122px) rotate(calc(var(--i) * (-360deg / var(--n)))); }
}
@media (prefers-reduced-motion: reduce) {
  .cog__core i { animation: none; }
  .cog__lede-line { animation: none; opacity: 1; transform: none; }
  .wf__node, .wf__link, .sim__node, .sim__link, .sim__out-cell, .kg__node, .kg__step, .kg__slink { transition: none; }
}
</style>
