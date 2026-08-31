import { useIntroReveal } from '~/composables/useIntroReveal'
import { useReducedMotion } from '~/composables/useReducedMotion'

/**
 * The two flags every entrance needs: whether the page has been uncovered yet,
 * and whether to skip the motion and simply be there.
 */
export function useEntrance() {
  const { revealed } = useIntroReveal()
  const prefersReducedMotion = useReducedMotion()

  return { enabled: revealed, instant: prefersReducedMotion }
}
