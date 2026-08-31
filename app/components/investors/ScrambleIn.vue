<script setup lang="ts">
// ScrambleIn — entrance reveal: once `triggered` (after `delay` ms), reveals the
// text left-to-right at 0.5 chars/frame on a 25ms interval; not-yet-revealed
// characters show random glyphs up to 3 ahead of the reveal cursor, beyond that
// empty. Spaces stay spaces. Vue port of the SynapseX reference component.
//
// `display` initialises to the REAL text so the headline is present in SSR /
// no-JS output (SEO + fail-safe). The parent fades the headline in, masking this
// initial state, and the scramble plays on trigger. Text-interpolated output only
// (no v-html) — scramble glyphs render safely as text.
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{ text: string, delay?: number, triggered?: boolean }>()

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'
const display = ref(props.text)

let startTimer: ReturnType<typeof setTimeout> | null = null
let interval: ReturnType<typeof setInterval> | null = null

function randChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)] ?? ''
}

function run(): void {
  let pos = 0
  interval = setInterval(() => {
    pos += 0.5
    const revealed = Math.floor(pos)
    let out = ''
    for (let i = 0; i < props.text.length; i++) {
      const ch = props.text[i]!
      if (ch === ' ') { out += ' '; continue }
      if (i < revealed) out += ch
      else if (i < revealed + 3) out += randChar()
    }
    display.value = out || ' '
    if (revealed >= props.text.length) {
      display.value = props.text
      if (interval) { clearInterval(interval); interval = null }
    }
  }, 25)
}

watch(
  () => props.triggered,
  (t) => {
    if (!t) return
    // reset to a blank line, then scramble in (client-only, after the fade masks it)
    display.value = ' '
    startTimer = setTimeout(run, props.delay ?? 0)
  },
)

onBeforeUnmount(() => {
  if (startTimer) clearTimeout(startTimer)
  if (interval) clearInterval(interval)
})
</script>

<template>
  <span>{{ display }}</span>
</template>
