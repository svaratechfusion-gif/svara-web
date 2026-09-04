import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import { useTicker } from '~/composables/useTicker'

/**
 * The cards used to sit dead still between reveals. This gives every glass
 * panel a light that follows the cursor: one delegated `pointermove` on the
 * page root resolves the card under the pointer, marks it `is-hot`, and writes
 * its local cursor position as `--mx` / `--my` for the CSS to render.
 *
 * One listener for the whole page rather than one per card, and the write is
 * deferred to the site's shared ticker so a fast pointer cannot schedule more
 * style work than there are frames. Only two custom properties change, so the
 * effect stays on the compositor.
 *
 * Skipped entirely for coarse pointers and reduced motion — there is no cursor
 * to follow on a touch screen, and the effect is decoration.
 */
export function useCardSpotlight(root: Ref<HTMLElement | null>, selector = '.dx-glass') {
  let hot: HTMLElement | null = null
  let pending: PointerEvent | null = null
  let enabled = false

  function onMove(event: PointerEvent) { pending = event }

  function clear() {
    hot?.classList.remove('is-hot')
    hot?.style.removeProperty('--mx')
    hot?.style.removeProperty('--my')
    hot = null
  }

  onMounted(() => {
    if (!root.value) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    enabled = true
    root.value.addEventListener('pointermove', onMove, { passive: true })
    root.value.addEventListener('pointerleave', clear, { passive: true })
  })

  onBeforeUnmount(() => {
    root.value?.removeEventListener('pointermove', onMove)
    root.value?.removeEventListener('pointerleave', clear)
    clear()
  })

  useTicker(() => {
    if (!enabled || !pending) return
    const event = pending
    pending = null

    const target = event.target as Element | null
    const card = target?.closest?.(selector) as HTMLElement | null
    if (card !== hot) {
      clear()
      hot = card
      hot?.classList.add('is-hot')
    }
    if (!card) return

    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  })
}
