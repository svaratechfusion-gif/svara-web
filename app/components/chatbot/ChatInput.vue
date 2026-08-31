<script setup lang="ts">
// SVARA AI — input, permanently pinned at the bottom. Auto-expanding textarea (up to
// ~4 lines, then scrolls internally) + integrated navy send. Enter sends,
// Shift+Enter = newline. Autofocuses when the panel opens; disabled while processing.
import { ref, nextTick, onMounted } from 'vue'
import { motion } from 'motion-v'
import { ArrowUp } from '@lucide/vue'

const props = defineProps<{ disabled?: boolean }>()
const emit = defineEmits<{ send: [text: string] }>()

const text = ref('')
const field = ref<HTMLTextAreaElement | null>(null)
const MAX_H = 92 // ≈ 4 lines, then the textarea scrolls internally

function grow(): void {
  const el = field.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, MAX_H)}px`
}

function submit(): void {
  const value = text.value.trim()
  if (!value || props.disabled) return
  emit('send', value)
  text.value = ''
  nextTick(grow)
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    submit()
  }
}

onMounted(() => nextTick(() => field.value?.focus()))
</script>

<template>
  <div class="ci">
    <form class="ci__field" @submit.prevent="submit">
      <textarea
        ref="field"
        v-model="text"
        class="ci__input"
        rows="1"
        placeholder="Ask SVARA anything..."
        aria-label="Message SVARA AI"
        :disabled="disabled"
        @input="grow"
        @keydown="onKeydown"
      />
      <motion.button
        type="submit"
        class="ci__send"
        aria-label="Send message"
        :disabled="disabled || !text.trim()"
        :while-hover="{ scale: 1.05 }"
        :while-tap="{ scale: 0.94 }"
      >
        <ArrowUp :size="17" :stroke-width="2.1" />
      </motion.button>
    </form>
    <div class="ci__footer sv-mono">
      <span>ENTER / SEND · SHIFT + ENTER</span>
      <span>SVARA INTELLIGENCE · v1.0</span>
    </div>
  </div>
</template>

<style scoped>
.ci {
  flex: 0 0 auto;
  padding: 12px 14px 14px;
  border-top: 1px solid var(--sv-border-soft, rgba(15, 27, 77, 0.08));
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.5));
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.ci__field {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  min-height: 56px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(93, 143, 190, 0.35);
  border-radius: 16px;
  padding: 9px 9px 9px 15px;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.ci__field:focus-within {
  border-color: color-mix(in srgb, var(--sv-blue, #5d8fbe) 85%, transparent);
  box-shadow: 0 0 0 3px rgba(93, 143, 190, 0.16);
}

.ci__input {
  flex: 1 1 auto;
  min-width: 0;
  border: 0;
  outline: 0;
  resize: none;
  background: transparent;
  color: var(--sv-navy, #0f1b4d);
  font-size: 13.5px;
  line-height: 1.5;
  max-height: 92px;
  padding: 6px 0;
}
.ci__input::placeholder { color: color-mix(in srgb, var(--sv-navy, #0f1b4d) 38%, transparent); }
.ci__input:disabled { opacity: 0.6; }

.ci__send {
  flex-shrink: 0;
  display: inline-grid;
  place-items: center;
  width: 38px; height: 38px;
  border: 0;
  border-radius: 12px;
  background: var(--sv-navy, #0f1b4d);
  color: #fff;
  cursor: pointer;
  transition: background 160ms ease, opacity 160ms ease;
}
.ci__send:hover:not(:disabled) { background: var(--sv-navy-2, #1d2e6d); }
.ci__send:disabled { opacity: 0.32; cursor: default; }
.ci__send:focus-visible { outline: 2px solid var(--sv-blue, #5d8fbe); outline-offset: 2px; }

.ci__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 9px 4px 0;
  font-size: 8.5px;
  letter-spacing: 0.12em;
  color: var(--sv-muted, rgba(15, 27, 77, 0.38));
}
.ci__footer span:last-child { color: color-mix(in srgb, var(--sv-blue, #5d8fbe) 55%, var(--sv-muted) 45%); }
@media (max-width: 380px) { .ci__footer span:last-child { display: none; } }
</style>
