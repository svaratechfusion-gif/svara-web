// Helios · entity — the 7-state lifecycle machine.
//   1 Dormant → 2 Assemble → 3 Idle → 4 Interact → 5 Dissolve → 6 Flow → 7 Reassemble
// Each state is ISOLATED (own enter/update, no state reaches into another).
// Pure math easing — no GSAP anywhere near the calculations. States write
// only to particles.rest; the spring sim produces the actual motion.
// Auto-advance per spec arrows: assemble→idle · dissolve→flow · reassemble→idle.
// idle↔interact promotion is pointer-driven (handled by the engine).

import { HeliosConfig } from '../engine/HeliosConfig'
import type { HeliosParticles } from '../physics/HeliosParticles'
import type { HeliosEntity } from './HeliosEntity'
import type { HeliosStore, MorphStateName } from '../store/HeliosStore'

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

interface MorphCtx {
  particles: HeliosParticles
  entity: HeliosEntity
  store: HeliosStore
  from: Float32Array // scratch, allocated once
  elapsed: number
}

interface MorphState {
  readonly name: MorphStateName
  /** state entered automatically when this one completes (progress = 1) */
  readonly next: MorphStateName | null
  enter(ctx: MorphCtx): void
  update(ctx: MorphCtx, dt: number): void
}

function transitionTo(ctx: MorphCtx, target: Float32Array, duration: number, dt: number) {
  const s = ctx.store.state
  s.progress = Math.min(1, s.progress + dt / duration)
  const e = easeOutCubic(s.progress)
  const rest = ctx.particles.rest
  for (let i = 0; i < rest.length; i++) {
    rest[i] = ctx.from[i] + (target[i] - ctx.from[i]) * e
  }
}

// ---- 1 · DORMANT — asleep. Scattered, motionless rest, nothing responds.
const Dormant: MorphState = {
  name: 'dormant',
  next: null,
  enter(ctx) {
    const scatter = ctx.entity.getTarget('scatter')
    ctx.particles.rest.set(scatter)
    ctx.particles.positions.set(scatter)
    ctx.store.state.progress = 1
  },
  update() { /* dormant: springs hold the scatter pose, nothing else */ },
}

// ---- 2 · ASSEMBLE — scatter → entity.
const Assemble: MorphState = {
  name: 'assemble',
  next: 'idle',
  enter(ctx) {
    ctx.from.set(ctx.particles.rest)
    ctx.store.state.progress = 0
  },
  update(ctx, dt) {
    transitionTo(ctx, ctx.entity.getTarget('entity'), HeliosConfig.assembleDuration, dt)
  },
}

// ---- 3 · IDLE — breathing rest (springs + entity breathing carry life).
const Idle: MorphState = {
  name: 'idle',
  next: null,
  enter(ctx) {
    ctx.store.state.progress = 1
    ctx.particles.rest.set(ctx.entity.getTarget('entity'))
  },
  update() {},
}

// ---- 4 · INTERACT — idle pose; the cursor force is live (engine-gated).
const Interact: MorphState = {
  name: 'interact',
  next: null,
  enter(ctx) {
    ctx.store.state.progress = 1
    ctx.particles.rest.set(ctx.entity.getTarget('entity'))
  },
  update() { /* displacement comes from HeliosCursor via the engine */ },
}

// ---- 5 · DISSOLVE — entity → scatter, then hands over to FLOW (spec arrow).
const Dissolve: MorphState = {
  name: 'dissolve',
  next: 'flow',
  enter(ctx) {
    ctx.from.set(ctx.particles.rest)
    ctx.store.state.progress = 0
  },
  update(ctx, dt) {
    transitionTo(ctx, ctx.entity.getTarget('scatter'), HeliosConfig.dissolveDuration, dt)
  },
}

// ---- 6 · FLOW — continuous pseudo-curl drift. Never completes on its own.
const Flow: MorphState = {
  name: 'flow',
  next: null,
  enter(ctx) {
    ctx.from.set(ctx.particles.rest)
    ctx.store.state.progress = 1
  },
  update(ctx, dt) {
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

// ---- 7 · REASSEMBLE — anywhere → entity, settles back to idle.
const Reassemble: MorphState = {
  name: 'reassemble',
  next: 'idle',
  enter(ctx) {
    ctx.from.set(ctx.particles.rest)
    ctx.store.state.progress = 0
  },
  update(ctx, dt) {
    transitionTo(ctx, ctx.entity.getTarget('entity'), HeliosConfig.reassembleDuration, dt)
  },
}

// ---- machine ----

export class HeliosMorph {
  private states: Record<MorphStateName, MorphState> = {
    dormant: Dormant, assemble: Assemble, idle: Idle, interact: Interact,
    dissolve: Dissolve, flow: Flow, reassemble: Reassemble,
  }

  private ctx: MorphCtx
  private current: MorphState

  constructor(particles: HeliosParticles, entity: HeliosEntity, store: HeliosStore) {
    this.ctx = { particles, entity, store, from: new Float32Array(particles.rest.length), elapsed: 0 }
    this.current = this.states.dormant // STATE 1 — life begins asleep
    this.current.enter(this.ctx)
  }

  get name() { return this.current.name }

  set(name: MorphStateName) {
    if (this.current.name === name) return
    this.current = this.states[name]
    this.ctx.store.state.currentState = name
    this.ctx.elapsed = 0
    this.current.enter(this.ctx)
  }

  update(dt: number) {
    this.current.update(this.ctx, dt)
    if (this.ctx.store.state.progress >= 1 && this.current.next) {
      this.set(this.current.next)
    }
  }
}
