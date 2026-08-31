<script setup lang="ts">
// SVARA AI — root orchestrator. An independent overlay layer (z-index 9999) mounted
// globally from app.vue, above the site. Owns open/close + the conversation
// (useSvaraChat). SESSION MODEL: OPEN → new session (fresh uuid + reset state);
// CLOSE → destroy session (reset everything, drop the id). Nothing is persisted, so
// reopening always starts fresh. The panel is keyed by sessionId to force a clean
// remount (clears input/scroll/typing). Palette + a premium sans font are declared
// here as CSS vars; a scoped rule overrides the site-wide Space Mono.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { AnimatePresence } from 'motion-v'
import ChatTrigger from './ChatTrigger.vue'
import ChatWindow from './ChatWindow.vue'
import { useSvaraChat } from '~/composables/useSvaraChat'

const open = ref(false)
const sessionId = ref<string | null>(null)

const { messages, status, suggestions, send, reset } = useSvaraChat()

function newSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `s-${Date.now()}-${Math.round(Math.random() * 1e6)}`
}

function openChat(): void {
  reset() // guarantee a clean slate
  sessionId.value = newSessionId()
  open.value = true
}

function closeChat(): void {
  // CLOSE == destroy the session. No persistence, no restore on reopen.
  open.value = false
  sessionId.value = null
  reset()
}

function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape' && open.value) closeChat()
}

onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="svara-chatbot">
    <!-- trigger hidden while the panel is open (the panel covers its corner) -->
    <ChatTrigger v-if="!open" @open="openChat" />

    <AnimatePresence>
      <ChatWindow
        v-if="open"
        :key="sessionId || 'session'"
        :messages="messages"
        :status="status"
        :suggestions="suggestions"
        @send="send"
        @close="closeChat"
        @minimize="closeChat"
      />
    </AnimatePresence>
  </div>
</template>

<style scoped>
.svara-chatbot {
  /* SVARA visual language — navy / blue only (no new brand palette) */
  --sv-navy: #0f1b4d;
  --sv-navy-2: #1d2e6d;
  --sv-blue: #5d8fbe;
  --sv-blue-2: #76a8d6;
  --sv-surface: #f7f9fc;
  --sv-white: #ffffff;
  --sv-border: #d9e0ea;
  --sv-border-soft: rgba(15, 27, 77, 0.08);
  --sv-muted: rgba(15, 27, 77, 0.55);
  /* premium sans (Apple / Linear / Raycast feel) + a mono for tiny technical labels */
  --sv-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --sv-mono: "Space Mono", ui-monospace, "SF Mono", Menlo, monospace;

  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none; /* the layer itself never blocks the page */
}

/* Font: the site-wide global-font.css forces Space Mono via element-level !important.
   The chatbot must read as premium sans, so override with a higher-specificity, still
   scoped rule (.svara-chatbot[data-v] * beats bare `p`/`button`/`div` !important).
   Tiny technical labels opt back into mono via .sv-mono (even higher specificity). */
.svara-chatbot :deep(*) { font-family: var(--sv-font) !important; }
.svara-chatbot :deep(.sv-mono) { font-family: var(--sv-mono) !important; }

/* only the interactive children capture pointer events */
.svara-chatbot :deep(.ct),
.svara-chatbot :deep(.cw) { pointer-events: auto; }
</style>
