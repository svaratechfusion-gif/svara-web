// Helios · entity — the morph state machine, reduced to the page-wide
// ambient cloud's own three states: Dormant (motionless rest, pre-boot),
// Orbit (Hero-only halo), and Flow (the continuous downward current). The
// Hero's assembled-head
// lifecycle (Assemble/Idle/Interact/Dissolve/Reassemble) was removed along
// with the Hero's particle-head visual — see the vault Decision Log. States
// write only to particles.target; the spring sim produces the actual
// motion.

import { HeliosConfig } from '../engine/HeliosConfig'
import type { HeliosParticles } from '../physics/HeliosParticles'
import type { HeliosEntity } from './HeliosEntity'
import type { HeliosStore, MorphStateName } from '../store/HeliosStore'

interface MorphCtx {
  particles: HeliosParticles
  entity: HeliosEntity
  store: HeliosStore
  elapsed: number
}

interface MorphState {
  readonly name: MorphStateName
  enter(ctx: MorphCtx): void
  update(ctx: MorphCtx, dt: number): void
}

// ---- 1 · DORMANT — asleep. Scattered, motionless rest, nothing responds.
const Dormant: MorphState = {
  name: 'dormant',
  enter(ctx) {
    const scatter = ctx.entity.getTarget('scatter')
    ctx.particles.target.set(scatter)
    ctx.particles.positions.set(scatter)
    ctx.store.state.progress = 1
  },
  update() { /* dormant: springs hold the scatter pose, nothing else */ },
}

// ---- 2 · ORBIT — Hero-only: a small halo swirling around the Hero
// image. Only a small fraction of the particle budget (orbitFraction)
// actually orbits, each on its own fixed radius/phase (from noiseOffset,
// same deterministic-texture approach as everywhere else) around
// store.orbitAnchor — a slow halo, not a ring. Every other particle is
// parked off-screen (orbitParkY) on enter and left untouched: opacity is
// one global uniform, so "most particles invisible, a few visible" has to
// be done by moving the invisible ones out of frame, not by alpha. Parked
// particles snap back into the flow automatically the moment Flow.enter()
// starts overwriting `target` from scratch — nothing to reset here.
const Orbit: MorphState = {
  name: 'orbit',
  enter(ctx) {
    ctx.store.state.progress = 1
    const { positions, target, home } = ctx.particles
    const n = home.length / 3
    const orbitCount = Math.floor(n * HeliosConfig.orbitFraction)
    for (let i = orbitCount; i < n; i++) {
      const ix = i * 3
      target[ix] = home[ix]!
      target[ix + 1] = HeliosConfig.orbitParkY
      target[ix + 2] = home[ix + 2]!
      positions[ix] = target[ix]!
      positions[ix + 1] = target[ix + 1]!
      positions[ix + 2] = target[ix + 2]!
    }
  },
  update(ctx, dt) {
    ctx.elapsed += dt
    const { target, noiseOffset, home } = ctx.particles
    const n = home.length / 3
    const orbitCount = Math.floor(n * HeliosConfig.orbitFraction)
    const anchor = ctx.store.state.orbitAnchor
    const baseRadius = ctx.store.state.orbitRadius * HeliosConfig.orbitRadiusMultiplier
    const speed = HeliosConfig.orbitAngularSpeed
    const jitter = HeliosConfig.orbitRadiusJitter
    const vAmp = HeliosConfig.orbitVerticalAmp

    for (let i = 0; i < orbitCount; i++) {
      const phase = noiseOffset[i]!
      const radius = baseRadius * (1 + Math.sin(phase * 2.3) * jitter)
      const theta = ctx.elapsed * speed + phase
      const ix = i * 3
      target[ix] = anchor.x + Math.cos(theta) * radius
      target[ix + 1] = anchor.y + Math.sin(phase * 1.7 + ctx.elapsed * 0.2) * vAmp
      target[ix + 2] = anchor.z + Math.sin(theta) * radius * 0.55
    }
  },
}

// ---- 3 · FLOW — the ambient cloud's continuous downward current:
// coherent, directional, not random — "like water flowing through
// transparent pipes," an engineered field, not smoke or bubbles. Runs on
// its own free-running clock from the moment it's entered, independent of
// scroll, so it stays alive for the whole page. Uses particles.life as the
// per-particle fall-cycle position (1 = just spawned at the top, decays
// toward 0, wraps back to the top), each particle's own fixed depthSpeed
// scaling how fast it falls (background slow, mid normal, front slightly
// faster — depth without ever changing particle size). Horizontal spread
// comes from each particle's own scattered position; two sine components
// at different frequencies (flowSwayAmp/flowSwayFreq2 — see HeliosConfig)
// approximate organic curl-noise texture on top of the steady, near-
// constant-velocity fall, kept small so it reads as "engineered," not
// drifting or wobbling.
const FLOW_CYCLE_DURATION = 14 // seconds for a depthSpeed=1 (mid-layer) top-to-bottom pass
const FLOW_TOP_Y = 3.0 // above the visible frame — wrap happens off-screen
const FLOW_BAND_HEIGHT = 5.0 // bottom lands well below the visible frame

const Flow: MorphState = {
  name: 'flow',
  enter(ctx) {
    ctx.store.state.progress = 1
    // stagger each particle across the fall cycle so they don't all
    // spawn at the top in lockstep — deterministic, reuses noiseOffset
    const life = ctx.particles.life
    const noise = ctx.particles.noiseOffset
    for (let i = 0; i < life.length; i++) life[i] = noise[i]! / (Math.PI * 2)
  },
  update(ctx, dt) {
    ctx.elapsed += dt
    const life = ctx.particles.life
    const noise = ctx.particles.noiseOffset
    const depthSpeed = ctx.particles.depthSpeed
    const scatter = ctx.entity.getTarget('scatter')
    const target = ctx.particles.target
    const pull = ctx.particles.sectionPull
    const amp1 = HeliosConfig.flowSwayAmp
    const amp2 = amp1 * HeliosConfig.flowSwayAmp2
    const freq2 = HeliosConfig.flowSwayFreq2

    for (let i = 0; i < life.length; i++) {
      const dLife = (dt / FLOW_CYCLE_DURATION) * depthSpeed[i]!
      let l = life[i]! - dLife
      if (l <= 0) l += 1 // wrap — fractional remainder keeps motion smooth
      life[i] = l

      const fallProgress = 1 - l // 0 at the top, 1 at the bottom
      const ix = i * 3
      const phase = noise[i]!
      const p1 = fallProgress * Math.PI * 2 + phase
      const p2 = fallProgress * Math.PI * 2 * freq2 + phase * 1.7
      const swayX = Math.sin(p1) * amp1 + Math.sin(p2) * amp2
      const swayZ = Math.cos(p1) * amp1 * 0.6 + Math.cos(p2) * amp2 * 0.6
      // sectionPull (HeliosParticles.applySectionTargets) is added on top
      // of the base current — it's the only thing that survives this
      // state's from-scratch recompute every frame, so it's how "everything
      // else interacts with" the one particle system while it's flowing
      target[ix] = scatter[ix]! + swayX + pull[ix]!
      target[ix + 1] = FLOW_TOP_Y - fallProgress * FLOW_BAND_HEIGHT + pull[ix + 1]!
      target[ix + 2] = scatter[ix + 2]! + swayZ + pull[ix + 2]!
    }
  },
}

// ---- machine ----

export class HeliosMorph {
  private states: Record<MorphStateName, MorphState> = { dormant: Dormant, orbit: Orbit, flow: Flow }

  private ctx: MorphCtx
  private current: MorphState

  constructor(particles: HeliosParticles, entity: HeliosEntity, store: HeliosStore) {
    this.ctx = { particles, entity, store, elapsed: 0 }
    this.current = this.states.dormant // life begins asleep
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
  }
}
