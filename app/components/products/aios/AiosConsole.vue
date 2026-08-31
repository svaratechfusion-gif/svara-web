<script setup lang="ts">
// ONE AI COMMAND — the working conversational command console at the heart of ONE AI OS. NOT a
// generic chatbot: user command → system interpretation (a revealed orchestration pipeline) →
// result, in an intelligence-briefing format. Independent scroll (data-lenis-prevent), input fixed
// at the bottom. Because this component is rendered only while the overlay is open, it remounts on
// every open → each session starts clean (spec §40). Responses are process-oriented, no invented
// metrics; the "Approve payment" command triggers a human-in-the-loop gate.
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { CONSOLE_GREETING, CONSOLE_ROTATING, matchIntent } from './aios-content'

interface Msg { id: number; role: 'user' | 'os'; text?: string; steps: string[]; revealed: number; result: string; gate?: boolean; done: boolean }

const messages = ref<Msg[]>([])
const input = ref('')
const processing = ref(false)
const body = ref<HTMLElement | null>(null)
const rotating = ref(0)
let mid = 0
const timers: ReturnType<typeof setTimeout>[] = []
let rotTimer: ReturnType<typeof setInterval> | null = null

function scrollDown(): void {
  nextTick(() => { const el = body.value; if (el) el.scrollTop = el.scrollHeight })
}
function push(m: Omit<Msg, 'id'>): Msg {
  messages.value.push({ id: ++mid, ...m })
  return messages.value[messages.value.length - 1]!
}
function send(text?: string): void {
  const t = (text ?? input.value).trim()
  if (!t || processing.value) return
  input.value = ''
  push({ role: 'user', text: t, steps: [], revealed: 0, result: '', done: true })
  const resp = matchIntent(t)
  const os = push({ role: 'os', steps: resp.steps, revealed: 0, result: '', gate: resp.gate, done: false })
  processing.value = true
  scrollDown()
  resp.steps.forEach((_, i) => timers.push(setTimeout(() => { os.revealed = i + 1; scrollDown() }, 260 + i * 420)))
  timers.push(setTimeout(() => {
    os.result = resp.result; os.done = true; processing.value = false; scrollDown()
  }, 260 + resp.steps.length * 420 + 500))
}
function decide(approve: boolean): void {
  if (processing.value) return
  const os = push({ role: 'os', steps: [], revealed: 0, result: '', done: false })
  processing.value = true
  timers.push(setTimeout(() => {
    os.result = approve ? 'Approved — executing the action now. Task complete.' : 'Rejected — nothing was executed.'
    os.done = true; processing.value = false; scrollDown()
  }, 500))
  scrollDown()
}

onMounted(() => {
  push({ role: 'os', steps: [], revealed: 0, result: CONSOLE_GREETING, done: true })
  rotTimer = setInterval(() => { rotating.value = (rotating.value + 1) % CONSOLE_ROTATING.length }, 3200)
})
onBeforeUnmount(() => { timers.forEach(clearTimeout); if (rotTimer) clearInterval(rotTimer) })
</script>

<template>
  <div class="cns osinst svara-instrument">
    <div class="cns__head">
      <span class="cns__label"><i />ONE AI COMMAND</span>
      <span class="cns__session">NEW COMMAND SESSION</span>
    </div>

    <div ref="body" class="cns__body" data-lenis-prevent>
      <div v-for="m in messages" :key="m.id" class="cns__msg" :class="`cns__msg--${m.role}`">
        <template v-if="m.role === 'user'">
          <span class="cns__u-mark" aria-hidden="true">❯</span>
          <p class="cns__u-text">{{ m.text }}</p>
        </template>
        <template v-else>
          <div v-if="m.steps.length" class="cns__interp">
            <span class="cns__interp-l">SYSTEM INTERPRETATION</span>
            <div class="cns__steps">
              <template v-for="(s, i) in m.steps" :key="s + i">
                <span class="cns__step" :class="{ 'is-on': m.revealed > i }">{{ s }}</span>
                <span v-if="i < m.steps.length - 1" class="cns__step-l" :class="{ 'is-on': m.revealed > i + 1 }" aria-hidden="true">→</span>
              </template>
            </div>
          </div>
          <p v-if="m.result" class="cns__result">{{ m.result }}</p>
          <div v-if="m.gate && m.done" class="cns__gate">
            <button type="button" class="cns__gate-btn" @click="decide(false)">REVIEW</button>
            <button type="button" class="cns__gate-btn cns__gate-btn--go" @click="decide(true)">APPROVE</button>
            <button type="button" class="cns__gate-btn cns__gate-btn--no" @click="decide(false)">REJECT</button>
          </div>
          <span v-if="!m.result && !m.done" class="cns__thinking" aria-hidden="true"><i /><i /><i /></span>
        </template>
      </div>
    </div>

    <div class="cns__chips">
      <button v-for="c in CONSOLE_ROTATING.slice(0, 3)" :key="c" type="button" class="cns__chip" :disabled="processing" @click="send(c)">{{ c }}</button>
    </div>
    <form class="cns__input" @submit.prevent="send()">
      <span class="cns__prompt" aria-hidden="true">❯</span>
      <input v-model="input" class="cns__field" type="text" :placeholder="CONSOLE_ROTATING[rotating]" :disabled="processing" aria-label="Command input">
      <button type="submit" class="cns__send" :disabled="processing || !input.trim()">{{ processing ? '···' : 'COMMAND ↗' }}</button>
    </form>
  </div>
</template>

<style scoped>
.cns { display: flex; flex-direction: column; padding: 40px 16px 16px; height: min(520px, 74vh); background: rgba(9, 14, 38, 0.55); }
.cns__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-bottom: 12px; margin-bottom: 10px; border-bottom: 1px solid var(--os-line); }
.cns__label { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--os-cyan); }
.cns__label i { width: 7px; height: 7px; border-radius: 50%; background: var(--os-green); box-shadow: 0 0 8px var(--os-green); }
.cns__session { font-size: 8.5px; letter-spacing: 0.14em; color: var(--os-muted); }

.cns__body { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; display: flex; flex-direction: column; gap: 14px; padding: 4px 4px 8px; scrollbar-width: thin; scrollbar-color: var(--os-blue) transparent; }
.cns__body::-webkit-scrollbar { width: 6px; }
.cns__body::-webkit-scrollbar-thumb { background: rgba(110, 130, 255, 0.4); border-radius: 6px; }

.cns__msg--user { display: flex; align-items: baseline; gap: 8px; align-self: flex-end; max-width: 88%; padding: 10px 13px; border: 1px solid var(--os-violet); background: rgba(154, 125, 255, 0.08); }
.cns__u-mark { color: var(--os-violet); font-weight: 700; flex: none; }
.cns__u-text { margin: 0; font-size: 12px; line-height: 1.5; color: #fff; }
.cns__msg--os { align-self: flex-start; max-width: 94%; display: flex; flex-direction: column; gap: 10px; }
.cns__interp { padding: 12px; border: 1px solid var(--os-line); background: rgba(8, 12, 34, 0.6); }
.cns__interp-l { display: block; font-size: 8px; letter-spacing: 0.16em; color: var(--os-cyan); margin-bottom: 10px; }
.cns__steps { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.cns__step { padding: 6px 10px; border: 1px solid var(--os-line); background: rgba(8, 12, 34, 0.5); font-size: 9px; font-weight: 700; letter-spacing: 0.04em; color: var(--os-muted); opacity: 0.4; transition: opacity 260ms, color 260ms, border-color 260ms; }
.cns__step.is-on { opacity: 1; color: var(--os-cyan); border-color: var(--os-blue); }
.cns__step-l { color: rgba(120, 140, 230, 0.35); transition: color 260ms; }
.cns__step-l.is-on { color: var(--os-blue); }
.cns__result { margin: 0; padding: 12px 14px; border-left: 2px solid var(--os-blue); background: rgba(91, 108, 255, 0.06); font-size: 12px; line-height: 1.6; color: var(--os-ink); }
.cns__gate { display: flex; flex-wrap: wrap; gap: 8px; }
.cns__gate-btn { padding: 9px 14px; border: 1px solid var(--os-line); background: rgba(8, 12, 34, 0.5); color: var(--os-ink); font: inherit; font-size: 9.5px; letter-spacing: 0.08em; cursor: pointer; transition: background 160ms, border-color 160ms; }
.cns__gate-btn--go { color: var(--os-green); border-color: var(--os-green); }
.cns__gate-btn--no { color: var(--os-amber); border-color: rgba(255, 179, 64, 0.5); }
.cns__gate-btn:hover { background: rgba(91, 108, 255, 0.12); }
.cns__thinking { display: inline-flex; gap: 5px; padding: 4px 2px; }
.cns__thinking i { width: 6px; height: 6px; border-radius: 50%; background: var(--os-cyan); animation: cns-blink 1.2s infinite; }
.cns__thinking i:nth-child(2) { animation-delay: 0.2s; }
.cns__thinking i:nth-child(3) { animation-delay: 0.4s; }

.cns__chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0 8px; }
.cns__chip { padding: 7px 10px; border: 1px solid var(--os-line); background: rgba(91, 108, 255, 0.05); color: var(--os-muted); font: inherit; font-size: 9px; letter-spacing: 0.03em; cursor: pointer; transition: color 160ms, border-color 160ms; }
.cns__chip:hover:not(:disabled) { color: var(--os-cyan); border-color: var(--os-blue); }
.cns__chip:disabled { opacity: 0.4; cursor: default; }

.cns__input { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid var(--os-blue); background: rgba(8, 12, 34, 0.6); }
.cns__prompt { color: var(--os-violet); font-weight: 700; }
.cns__field { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: #fff; font: inherit; font-size: 12.5px; letter-spacing: 0.01em; }
.cns__field::placeholder { color: var(--os-muted); }
.cns__field:disabled { opacity: 0.6; }
.cns__send { flex: none; padding: 9px 14px; border: 1px solid var(--os-blue); background: rgba(91, 108, 255, 0.12); color: var(--os-cyan); font: inherit; font-size: 10px; letter-spacing: 0.08em; cursor: pointer; transition: background 160ms; }
.cns__send:hover:not(:disabled) { background: rgba(91, 108, 255, 0.24); }
.cns__send:disabled { opacity: 0.5; cursor: default; }

@keyframes cns-blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .cns__step, .cns__step-l { transition: none; }
  .cns__thinking i { animation: none; }
}
</style>
