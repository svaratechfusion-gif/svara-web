import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks `prefers-reduced-motion`. Starts `false` so SSR and the first client
 * paint agree; the real value lands on mount.
 */
export function useReducedMotion() {
  const prefersReducedMotion = ref(false)
  let query: MediaQueryList | null = null

  const sync = () => {
    prefersReducedMotion.value = query?.matches ?? false
  }

  onMounted(() => {
    query = window.matchMedia('(prefers-reduced-motion: reduce)')
    sync()
    query.addEventListener('change', sync)
  })

  onBeforeUnmount(() => query?.removeEventListener('change', sync))

  return prefersReducedMotion
}
