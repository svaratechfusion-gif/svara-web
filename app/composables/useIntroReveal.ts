import { useState } from '#app'

/**
 * The page's entrance signal.
 *
 * Every piece of the hero holds its spring at the resting state until this
 * flips, then runs on the staggered timeline in `halftone/reveal.ts`. The page
 * publishes it one frame after mount — the pieces need one frame at their "out"
 * state first, or there is nothing to animate from.
 *
 * (It was previously published by `<IntroPreloader>` when its curtains began to
 * lift; that loading screen has been removed. The component file is kept but is
 * no longer mounted.)
 *
 * Shared through `useState` rather than provide/inject: the publisher and the
 * subscribers are siblings under the page, so a provider would have to wrap the
 * whole tree to join two ends that never render together.
 *
 * Deliberately NOT reset on route change — the intro plays once per session, so
 * coming back to /divisions from elsewhere in the SPA shows the page directly
 * instead of replaying a 2.2s wait the visitor has already sat through.
 */
export function useIntroReveal() {
  const revealed = useState('divisions-intro-revealed', () => false)

  const markRevealed = () => {
    revealed.value = true
  }

  return { revealed, markRevealed }
}
