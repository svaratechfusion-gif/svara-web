<script setup lang="ts">
// SVARA AI — chat panel. Strict 3-row flex: header (fixed) / message viewport (the
// only scroller) / input (fixed). A translucent light surface with an extremely subtle
// internal grid — engineered, not a HUD. Expands from the trigger corner. State is
// owned by the parent (useSvaraChat); this component stays presentational.
import { motion } from 'motion-v'
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'
import type { ChatMessage, Suggestion } from '~~/lib/chatbot'

defineProps<{ messages: ChatMessage[], status: 'idle' | 'processing', suggestions: Suggestion[] }>()
defineEmits<{ send: [text: string], minimize: [], close: [] }>()
</script>

<template>
  <motion.section
    class="cw"
    role="dialog"
    aria-modal="false"
    aria-label="SVARA AI assistant"
    :initial="{ opacity: 0, scale: 0.94, y: 16 }"
    :animate="{ opacity: 1, scale: 1, y: 0 }"
    :exit="{ opacity: 0, scale: 0.94, y: 16 }"
    :transition="{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }"
  >
    <!-- extremely subtle internal grid (opacity well below 0.04) -->
    <div class="cw__grid" aria-hidden="true" />

    <ChatHeader @minimize="$emit('minimize')" @close="$emit('close')" />
    <ChatMessages
      :messages="messages"
      :status="status"
      :suggestions="suggestions"
      @send="$emit('send', $event)"
      @close="$emit('close')"
    />
    <ChatInput :disabled="status === 'processing'" @send="$emit('send', $event)" />
  </motion.section>
</template>

<style scoped>
.cw {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1; /* within the 9999 chatbot layer */
  width: 460px;
  height: min(720px, calc(100vh - 32px));
  max-height: calc(100dvh - 32px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right; /* expands from the trigger corner */
  border-radius: 22px;
  border: 1px solid var(--sv-border, #d9e0ea);
  background: var(--sv-surface, #f7f9fc);
  box-shadow:
    0 28px 80px -30px rgba(15, 27, 77, 0.34),
    0 2px 10px rgba(15, 27, 77, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

/* subtle internal grid — reads as engineered texture, never a HUD */
.cw__grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(15, 27, 77, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 27, 77, 0.035) 1px, transparent 1px);
  background-size: 30px 30px;
  -webkit-mask-image: radial-gradient(130% 100% at 50% 0%, #000 30%, transparent 90%);
  mask-image: radial-gradient(130% 100% at 50% 0%, #000 30%, transparent 90%);
}

/* header / messages / input sit above the grid */
.cw > :not(.cw__grid) { position: relative; z-index: 1; }

/* ── Mobile: panel nearly fills the viewport, 10px margins ── */
@media (max-width: 560px) {
  .cw {
    right: 10px;
    bottom: 10px;
    left: 10px;
    top: 10px;
    width: auto;
    height: auto;
    max-height: calc(100dvh - 20px);
  }
}
</style>
