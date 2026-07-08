// Owns THE one document-spanning ScrollTrigger — the only scroll↔progress
// bridge in the experience, and the owner of scroll SEMANTICS (progress,
// velocity, direction). Everything downstream (SceneManager, the particle
// world, caption reveals) consumes what it publishes; nothing else may
// create a scrubbing ScrollTrigger.
//
// The raw Lenis raf pump lives in app.vue (Lenis's lifecycle), NOT here:
// this controller is created/disposed with the MotionDirector (world
// lifecycle), and a world-scoped raf pump would freeze scrolling on HMR.
// Velocity/direction are read from the trigger's own getVelocity()/direction
// — which reflect the Lenis-smoothed scroll position, since Lenis writes the
// real scrollTop this trigger reads — so no Lenis coupling is needed here.
import { ScrollTrigger, Observer } from "~~/lib/gsap";
import type { gsap } from "~~/lib/gsap";

const MASTER_ID = "svara-master-scroll";

export class ScrollController {
  private trigger: ScrollTrigger | null = null;
  private listeners = new Set<(progress: number) => void>();
  private _direction: 1 | -1 = 1;

  /**
   * Idempotent: killing any previous instance first guarantees no duplicate
   * ScrollTriggers survive HMR or route re-entry.
   */
  start() {
    ScrollTrigger.getById(MASTER_ID)?.kill();
    this.trigger = ScrollTrigger.create({
      id: MASTER_ID,
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        this._direction = self.direction as 1 | -1;
        for (const listener of this.listeners) listener(self.progress);
      },
    });
    return this;
  }

  onProgress(listener: (progress: number) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  get progress() {
    return this.trigger?.progress ?? 0;
  }

  /**
   * Scroll velocity in px/s (signed). Reflects the Lenis-smoothed position,
   * and decays back to 0 shortly after scrolling stops — so consumers get a
   * physically-plausible settle for free (Lenis's inertia). Read per frame.
   */
  get velocity() {
    return this.trigger?.getVelocity() ?? 0;
  }

  /** 1 while scrolling down/forward, -1 up/back — last observed direction. */
  get direction() {
    return this._direction;
  }

  /** Re-measure after layout-affecting changes (font swap, async content). */
  refresh() {
    ScrollTrigger.refresh();
  }

  /**
   * Batched viewport reveals for any straggler DOM outside the canvas
   * world — one IntersectionObserver-style pass instead of N triggers.
   */
  batch(targets: gsap.DOMTarget, config: ScrollTrigger.BatchVars) {
    return ScrollTrigger.batch(targets, config);
  }

  /**
   * Raw input observation (wheel/touch/pointer velocity) for beats that
   * react to input energy rather than scroll position.
   */
  observe(vars: Observer.ObserverVars) {
    return Observer.create(vars);
  }

  dispose() {
    this.trigger?.kill();
    this.trigger = null;
    this.listeners.clear();
  }
}
