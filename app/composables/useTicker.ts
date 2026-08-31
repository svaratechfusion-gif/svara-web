import { onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'

/**
 * Run `fn(dtSeconds)` on the site's single shared rAF.
 *
 * gsap.ticker rather than a per-component `requestAnimationFrame`: the site
 * already drives Lenis and every scroll effect off this one tick, and a second
 * loop would schedule its own frame callbacks against the same vsync.
 */
export function useTicker(fn: (dt: number) => void): void {
  const handler = (_time: number, deltaMs: number) => fn(deltaMs / 1000)

  onMounted(() => gsap.ticker.add(handler))
  onBeforeUnmount(() => gsap.ticker.remove(handler))
}
