// Helios · entity — morph state machine.
// Five ISOLATED states: Assemble, Idle, Dissolve, Flow, Reconstruct.
// Each state is its own object with enter()/update(); no state reaches into
// another. Pure math easing — no GSAP anywhere near the calculations.
// States write only to particles.rest; the spring sim produces the motion.

import { HeliosConfig } from '../engine/HeliosConfig'
import type { HeliosParticles } from '../physics/HeliosParticles'
import type { HeliosEntity } from './HeliosEntity'
import type { HeliosStore, MorphStateName } from '../store/HeliosStore'

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

interface MorphCtx {
  particles: HeliosParticles
  entity: HeliosEntity
  store: HeliosStore
  /** scratch buffer reused by transitions (allocated once) */
  from: Float32Array
  elapsed: number
}

interface MorphState {
  readonly name: MorphStateName
  enter(ctx: MorphCtx): void
  update(ctx: MorphCtx, dt: number): void
}

/** shared: eased rest-pose interpolation from ctx.from → target */
function transitionTo(ctx: MorphCtx, target: Float32Array, duration: number, dt: number) {
  const s = ctx.store.state
  s.progress = Math.min(1, s.progress + dt / duration)
  const e = easeOutCubic(s.progress)
  const rest = ctx.particles.rest
  for (let i = 0; i < rest.length; i++) {
    rest[i] = ctx.from[i] + (target[i] - ctx.from[i]) * e
  }
}

// ---- the five states ----

const Assemble: MorphState = {
  name: 'assemble',
  enter(ctx) {
    ctx.from.set(ctx.entity.getTarget('scatter'))
    ctx.particles.rest.set(ctx.from)
    ctx.particles.positions.set(ctx.from)
    ctx.store.state.progress = 0
  },
  update(ctx, dt) {
    transitionTo(ctx, ctx.entity.getTarget('entity'), HeliosConfig.assembleDuration, dt)
  },
}

const Idle: MorphState = {
  name: 'idle',
  enter(ctx) {
    ctx.store.state.progress = 1
    ctx.particles.rest.set(ctx.entity.getTarget('entity'))
  },
  update() { /* springs + entity breathing carry idle life */ },
}

const Dissolve: MorphState = {
  name: 'dissolve',
  enter(ctx) {
    ctx.from.set(ctx.particles.rest)
    ctx.store.state.progress = 0
  },
  update(ctx, dt) {
    transitionTo(ctx, ctx.entity.getTarget('scatter'), HeliosConfig.dissolveDuration, dt)
  },
}

const Flow: MorphState = {
  name: 'flow',
  enter(ctx) {
    ctx.from.set(ctx.particles.rest)
    ctx.store.state.progress = 1 // continuous state, no completion
  },
  update(ctx, dt) {
    // rest = base + a slowly drifting pseudo-curl field. No allocation.
    ctx.elapsed += dt
    const t = ctx.elapsed * 0.4
    const f = HeliosConfig.flowFrequency
    const A = HeliosConfig.flowAmplitude
    const base = ctx.from
    const rest = ctx.particles.rest
    for (let i = 0; i < rest.length; i += 3) {
      const x = base[i], y = base[i + 1], z = base[i + 2]
      rest[i] = x + Math.sin(y * f + t) * A
      rest[i + 1] = y + Math.sin(z * f + t * 1.3) * A * 0.6
      rest[i + 2] = z + Math.cos(x * f + t * 0.8) * A
    }
  },
}

const Reconstruct: MorphState = {
  name: 'reconstruct',
  enter(ctx) {
    ctx.from.set(ctx.particles.rest)
    ctx.store.state.progress = 0
  },
  update(ctx, dt) {
    transitionTo(ctx, ctx.entity.getTarget('entity'), HeliosConfig.reconstructDuration, dt)
  },
}

// ---- machine ----

export class HeliosMorph {
  private states: Record<MorphStateName, MorphState> = {
    assemble: Assemble, idle: Idle, dissolve: Dissolve, flow: Flow, reconstruct: Reconstruct,
  }

  private ctx: MorphCtx
  private current: MorphState

  constructor(particles: HeliosParticles, entity: HeliosEntity, store: HeliosStore) {
    this.ctx = { particles, entity, store, from: new Float32Array(particles.rest.length), elapsed: 0 }
    this.current = this.states.idle
    this.current.enter(this.ctx)
  }

  set(name: MorphStateName) {
    this.current = this.states[name]
    this.ctx.store.state.currentState = name
    this.ctx.elapsed = 0
    this.current.enter(this.ctx)
  }

  update(dt: number) {
    this.current.update(this.ctx, dt)
    // auto-settle: finished transitions hand over to idle (scatter states stay)
    const s = this.ctx.store.state
    if (s.progress >= 1 && (s.currentState === 'assemble' || s.currentState === 'reconstruct')) {
      this.set('idle')
    }
  }
}
