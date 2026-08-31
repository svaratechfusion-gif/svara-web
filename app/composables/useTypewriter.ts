// useTypewriter — a tiny, dependency-free typewriter for a single supporting
// status line. Vue port of the reference hero's useTypewriter(text, speed,
// startDelay): a setTimeout start delay, then a setInterval that appends one
// character per tick, both cleaned up on unmount. Respects
// prefers-reduced-motion (shows the full string immediately, done=true).
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const displayed = ref('')
  const done = ref(false)
  let startTimer: ReturnType<typeof setTimeout> | null = null
  let interval: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      displayed.value = text
      done.value = true
      return
    }
    startTimer = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i += 1
        displayed.value = text.slice(0, i)
        if (i >= text.length) {
          if (interval) clearInterval(interval)
          interval = null
          done.value = true
        }
      }, speed)
    }, startDelay)
  })

  onBeforeUnmount(() => {
    if (startTimer) clearTimeout(startTimer)
    if (interval) clearInterval(interval)
  })

  return { displayed, done }
}
