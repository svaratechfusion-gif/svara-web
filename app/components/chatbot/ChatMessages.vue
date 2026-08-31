<script setup lang="ts">
// SVARA AI — message viewport (the only scroller). Welcome state on a fresh session,
// then user/AI messages with a tiny animated "◉ SVARA AI" identity, a subtle
// "Thinking" state, and contextual suggestion chips under the latest reply. Chips
// either send a prompt or navigate (e.g. to /contact).
import { ref, watch, onMounted } from 'vue'
import { motion } from 'motion-v'
import { ArrowRight, ArrowDown } from '@lucide/vue'
import IntelligenceCore from './IntelligenceCore.vue'
import { WELCOME_LINES, WELCOME_SUGGESTIONS, type ChatMessage, type Suggestion } from '~~/lib/chatbot'

const props = defineProps<{
  messages: ChatMessage[]
  status: 'idle' | 'processing'
  suggestions: Suggestion[]
}>()
const emit = defineEmits<{ send: [prompt: string], close: [] }>()

const scroller = ref<HTMLElement | null>(null) // the ONLY scrolling viewport
const endRef = ref<HTMLElement | null>(null)
const isNearBottom = ref(true)
const showNewMsg = ref(false)

const NEAR_BOTTOM_PX = 100

function onScroll(): void {
  const el = scroller.value
  if (!el) return
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
  isNearBottom.value = distanceFromBottom < NEAR_BOTTOM_PX
  if (isNearBottom.value) showNewMsg.value = false
}

function scrollToBottom(smooth = true): void {
  requestAnimationFrame(() => {
    endRef.value?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end' })
    showNewMsg.value = false
    isNearBottom.value = true
  })
}

// Auto-scroll ONLY when a new message is actually added — and only if the user is
// already near the bottom (or the new message is their own). Otherwise surface the
// "New message" pill instead of yanking them away from older messages they're reading.
watch(() => props.messages.length, () => {
  const last = props.messages[props.messages.length - 1]
  if (!last) return
  if (last.role === 'user' || isNearBottom.value) scrollToBottom()
  else showNewMsg.value = true
}, { flush: 'post' })

// Keep the "Thinking…" indicator and freshly-added chips in view when at the bottom.
watch(() => props.status, (s) => { if (s === 'processing' && isNearBottom.value) scrollToBottom() }, { flush: 'post' })
watch(() => props.suggestions.length, (n) => { if (n && isNearBottom.value) scrollToBottom() }, { flush: 'post' })

// Fresh session (this component remounts per session) → start at the top.
onMounted(() => requestAnimationFrame(() => { if (scroller.value) scroller.value.scrollTop = 0 }))

function pick(sg: Suggestion): void {
  if (sg.to) { navigateTo(sg.to); emit('close') }
  else if (sg.prompt) { emit('send', sg.prompt) }
}
</script>

<template>
  <div class="cm-wrap">
    <div ref="scroller" class="cm" @scroll="onScroll">
    <!-- WELCOME (fresh session only) -->
    <div v-if="messages.length === 0" class="cm__welcome">
      <IntelligenceCore :size="44" :rings="2" />
      <h2 class="cm__title">SVARA AI</h2>
      <p class="cm__lead">{{ WELCOME_LINES[1] }}</p>
      <p class="cm__sub">{{ WELCOME_LINES[2] }}</p>
      <div class="cm__cards">
        <motion.button
          v-for="(qa, i) in WELCOME_SUGGESTIONS"
          :key="qa.label"
          type="button"
          class="cm__card"
          :initial="{ opacity: 0, y: 6 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3, delay: 0.06 + i * 0.05, ease: [0.16, 1, 0.3, 1] }"
          @click="pick(qa)"
        >
          <span>{{ qa.label }}</span>
          <ArrowRight class="cm__card-arrow" :size="14" :stroke-width="1.75" />
        </motion.button>
      </div>
    </div>

    <!-- CONVERSATION -->
    <ul v-else class="cm__list">
      <motion.li
        v-for="m in messages"
        :key="m.id"
        class="cm__row"
        :class="m.role === 'user' ? 'is-user' : 'is-ai'"
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }"
      >
        <span v-if="m.role === 'assistant'" class="cm__ident">
          <span class="cm__ident-dot" />SVARA AI
        </span>
        <div class="cm__bubble">{{ m.text }}</div>
      </motion.li>
    </ul>

    <!-- THINKING -->
    <div v-if="status === 'processing'" class="cm__thinking">
      <span class="cm__ident"><span class="cm__ident-dot" />SVARA AI</span>
      <div class="cm__thinking-row">
        <span class="cm__thinking-text">Thinking</span>
        <span class="cm__dots">
          <motion.span
            v-for="d in 3"
            :key="d"
            class="cm__dot"
            :animate="{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }"
            :transition="{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: (d - 1) * 0.16 }"
          />
        </span>
      </div>
    </div>

    <!-- CONTEXTUAL SUGGESTIONS (under the latest reply) -->
    <div v-if="status === 'idle' && suggestions.length && messages.length" class="cm__chips">
      <motion.button
        v-for="(sg, i) in suggestions"
        :key="sg.label"
        type="button"
        class="cm__chip"
        :class="{ 'is-nav': !!sg.to }"
        :initial="{ opacity: 0, y: 4 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.26, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }"
        @click="pick(sg)"
      >{{ sg.label }}</motion.button>
    </div>

      <div ref="endRef" class="cm__end" />
    </div>

    <!-- "New message" pill — appears only when scrolled up and a new reply arrives -->
    <Transition name="cm-newmsg">
      <button v-if="showNewMsg" type="button" class="cm-newmsg" @click="scrollToBottom()">
        <ArrowDown :size="13" :stroke-width="2" />New message
      </button>
    </Transition>
  </div>
</template>

<style scoped>
/* non-scrolling wrapper — the flex:1/min-height:0 child of the window, so the inner
   .cm can shrink and scroll; also the positioning context for the "New message" pill */
.cm-wrap {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.cm {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 16px 10px;
}

/* "New message" pill — pinned to the bottom of the history viewport (not scrolling) */
.cm-newmsg {
  position: absolute;
  bottom: 12px;
  right: 14px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 13px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--sv-blue, #5d8fbe) 42%, transparent);
  background: var(--sv-navy, #0f1b4d);
  color: #fff;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 8px 22px -10px rgba(15, 27, 77, 0.6), 0 0 16px -8px rgba(93, 143, 190, 0.6);
}
.cm-newmsg:hover { background: var(--sv-navy-2, #1d2e6d); }
.cm-newmsg:focus-visible { outline: 2px solid var(--sv-blue, #5d8fbe); outline-offset: 2px; }
.cm-newmsg-enter-active, .cm-newmsg-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.cm-newmsg-enter-from, .cm-newmsg-leave-to { opacity: 0; transform: translateY(8px); }
.cm::-webkit-scrollbar { width: 7px; }
.cm::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--sv-navy, #0f1b4d) 14%, transparent); border-radius: 8px; }
.cm::-webkit-scrollbar-track { background: transparent; }

/* ── welcome ── */
.cm__welcome { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; padding: 28px 8px 8px; }
.cm__title { margin: 6px 0 0; font-size: 19px; font-weight: 600; letter-spacing: -0.01em; color: var(--sv-navy, #0f1b4d); }
.cm__lead { margin: 0; font-size: 13.5px; color: var(--sv-muted, rgba(15, 27, 77, 0.62)); }
.cm__sub { margin: 2px 0 0; font-size: 12.5px; line-height: 1.55; max-width: 32ch; color: var(--sv-muted, rgba(15, 27, 77, 0.5)); }

.cm__cards { width: 100%; display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
.cm__card {
  display: flex; align-items: center; justify-content: space-between;
  height: 46px; padding: 0 15px;
  border-radius: 13px;
  border: 1px solid var(--sv-border, #d9e0ea);
  background: rgba(255, 255, 255, 0.9);
  color: var(--sv-navy, #0f1b4d);
  font-size: 13px; font-weight: 500; text-align: left;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
}
.cm__card:hover { background: #fff; border-color: color-mix(in srgb, var(--sv-blue, #5d8fbe) 50%, transparent); transform: translateY(-1px); }
.cm__card-arrow { color: var(--sv-blue, #5d8fbe); transition: transform 160ms ease; }
.cm__card:hover .cm__card-arrow { transform: translateX(3px); }
.cm__card:focus-visible { outline: 2px solid var(--sv-blue, #5d8fbe); outline-offset: 2px; }

/* ── conversation ── */
.cm__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.cm__row { display: flex; flex-direction: column; gap: 5px; }
.cm__row.is-user { align-items: flex-end; }
.cm__row.is-ai { align-items: flex-start; }

.cm__ident { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; color: var(--sv-muted, rgba(15, 27, 77, 0.55)); padding-left: 2px; }
.cm__ident-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, var(--sv-blue-2, #76a8d6), var(--sv-navy, #0f1b4d));
  box-shadow: 0 0 5px color-mix(in srgb, var(--sv-blue, #5d8fbe) 60%, transparent);
  animation: cm-dot 2.4s ease-in-out infinite;
}
@keyframes cm-dot { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }

.cm__bubble { font-size: 13.5px; line-height: 1.58; padding: 12px 15px; white-space: pre-wrap; word-break: break-word; }
.is-user .cm__bubble {
  max-width: 80%;
  background: var(--sv-navy, #0f1b4d);
  color: #fff;
  border-radius: 16px 16px 4px 16px;
  box-shadow: 0 4px 14px -8px rgba(15, 27, 77, 0.5);
}
.is-ai .cm__bubble {
  max-width: 88%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--sv-navy, #0f1b4d);
  border: 1px solid rgba(93, 143, 190, 0.18);
  border-radius: 16px 16px 16px 4px;
  box-shadow: 0 4px 16px -10px rgba(15, 27, 77, 0.28);
}

/* ── thinking ── */
.cm__thinking { display: flex; flex-direction: column; gap: 5px; align-items: flex-start; }
.cm__thinking-row { display: inline-flex; align-items: center; gap: 9px; padding: 11px 15px; border-radius: 16px 16px 16px 4px; background: rgba(255, 255, 255, 0.92); border: 1px solid rgba(93, 143, 190, 0.18); }
.cm__thinking-text { font-size: 13px; color: var(--sv-muted, rgba(15, 27, 77, 0.62)); }
.cm__dots { display: inline-flex; align-items: center; gap: 4px; }
.cm__dot { width: 4px; height: 4px; border-radius: 50%; background: var(--sv-blue, #5d8fbe); }

/* ── contextual chips ── */
.cm__chips { display: flex; flex-wrap: wrap; gap: 7px; padding: 2px 2px 4px; }
.cm__chip {
  display: inline-flex; align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid var(--sv-border, #d9e0ea);
  background: rgba(255, 255, 255, 0.85);
  color: var(--sv-navy, #0f1b4d);
  font-size: 12px; font-weight: 500;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease, transform 150ms ease;
}
.cm__chip:hover { background: var(--sv-surface, #f4f7fa); border-color: color-mix(in srgb, var(--sv-blue, #5d8fbe) 55%, transparent); transform: translateY(-1px); }
.cm__chip.is-nav { background: color-mix(in srgb, var(--sv-blue, #5d8fbe) 12%, #fff); border-color: color-mix(in srgb, var(--sv-blue, #5d8fbe) 40%, transparent); }
.cm__chip:focus-visible { outline: 2px solid var(--sv-blue, #5d8fbe); outline-offset: 2px; }

.cm__end { height: 1px; flex: 0 0 auto; }
</style>
