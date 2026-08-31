/**
 * A single scalar spring, integrated at a fixed step — the react-spring model
 * the Stackside reference animates on, reimplemented so the page carries no
 * animation library and no CSS keyframes.
 *
 * Mass is 1 and the step is 1/60s regardless of the display's refresh rate, so
 * a 120Hz monitor and a 60Hz one produce the same curve; a long frame is
 * sub-stepped rather than integrated in one jump (which would overshoot).
 *
 * ## Why one scalar is enough for a multi-channel entrance
 *
 * The spring ODE is linear, so for a fixed config and zero initial velocity the
 * solution of every channel is the SAME normalised curve scaled between its own
 * endpoints: `x(t) = to + (from - to) * g(t)`. Driving one scalar `0 → 1` and
 * lerping opacity / translate / blur / scale off it is therefore identical to
 * running a spring per channel — for far less work per frame. Entrances take
 * that path (see `SpringIn.vue`); only inputs with a *moving* target — the
 * pointer — need a spring of their own, which is what `setTarget` is for.
 */

export interface SpringConfig {
  tension: number
  friction: number
  /**
   * Stop dead the first time the value crosses its target instead of easing
   * onto it. Matters for the preloader curtains: one that overshoots -100%
   * would swing back and flash its bottom edge across the page it just cleared.
   */
  clamp?: boolean
}

/** Integration step, seconds. Fixed so the curve is refresh-rate independent. */
const STEP = 1 / 60

/** Longest frame we integrate. Past this (a backgrounded tab) we simply skip. */
const MAX_FRAME = 0.064

const EPSILON_VALUE = 1e-4
const EPSILON_VELOCITY = 1e-3

export class Spring {
  value: number
  velocity = 0
  target: number

  private readonly tension: number
  private readonly friction: number
  private readonly clamp: boolean
  /** Seconds still to wait before this spring starts moving. */
  private remainingDelay: number

  constructor(from: number, config: SpringConfig, delayMs = 0) {
    this.value = from
    this.target = from
    this.tension = config.tension
    this.friction = config.friction
    this.clamp = config.clamp ?? false
    this.remainingDelay = delayMs / 1000
  }

  /** Point the spring at a new resting value; it keeps its current velocity. */
  setTarget(target: number): void {
    this.target = target
  }

  /** Jump straight to a value, at rest. Used by the reduced-motion path. */
  set(value: number): void {
    this.value = value
    this.target = value
    this.velocity = 0
    this.remainingDelay = 0
  }

  get isSettled(): boolean {
    return this.remainingDelay <= 0 && this.value === this.target && this.velocity === 0
  }

  /** Advance by `dt` seconds and return the new value. */
  advance(dt: number): number {
    if (this.remainingDelay > 0) {
      if (dt <= this.remainingDelay) {
        this.remainingDelay -= dt
        return this.value
      }
      dt -= this.remainingDelay
      this.remainingDelay = 0
    }

    let remaining = Math.min(dt, MAX_FRAME)
    while (remaining > 0) {
      const step = Math.min(remaining, STEP)
      const before = this.value

      const spring = -this.tension * (this.value - this.target)
      const damper = -this.friction * this.velocity
      this.velocity += (spring + damper) * step
      this.value += this.velocity * step

      // Crossed the target — a clamped spring stops there rather than easing back.
      if (this.clamp && (before - this.target) * (this.value - this.target) < 0) {
        this.value = this.target
        this.velocity = 0
        return this.value
      }

      remaining -= step
    }

    if (
      Math.abs(this.value - this.target) < EPSILON_VALUE
      && Math.abs(this.velocity) < EPSILON_VELOCITY
    ) {
      this.value = this.target
      this.velocity = 0
    }

    return this.value
  }
}

/** The house entrance curve — overdamped (ζ ≈ 1.45): glides, never bounces. */
export const REVEAL_SPRING: SpringConfig = { tension: 80, friction: 26 }

/** Hovers answer a pointer, so they are quicker — still critically damped. */
export const HOVER_SPRING: SpringConfig = { tension: 240, friction: 30 }

/** Trails the pointer: loose enough to glide, tight enough to feel connected. */
export const POINTER_SPRING: SpringConfig = { tension: 120, friction: 26 }

/**
 * Heavily overdamped (ζ ≈ 2.1) — the develop-in wave takes ~2.5s to climb. The
 * field is the largest thing on screen, and the largest thing should be the
 * slowest, or it arrives before the eye has anywhere to go.
 */
export const FIELD_REVEAL_SPRING: SpringConfig = { tension: 40, friction: 26 }

/** The preloader curtains. Clamped — see `SpringConfig.clamp`. */
export const LIFT_SPRING: SpringConfig = { tension: 110, friction: 24, clamp: true }
