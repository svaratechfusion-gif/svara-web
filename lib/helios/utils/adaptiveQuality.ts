// Helios · utils — adaptive quality ladder.
// Watches smoothed FPS against the tier target and steps quality down/up:
//   L0 full → L1 pixelRatio 1.5 → L2 hide connections → L3 activeParticles 60%
// Degrades background detail (connections) before entity quality, recovers
// slowly, and never allocates — levels toggle existing resources.

export interface QualityHooks {
  setPixelRatio: (r: number) => void
  setConnectionsVisible: (v: boolean) => void
  setActiveParticleRatio: (r: number) => void
}

export class AdaptiveQuality {
  level = 0
  private ema = 60
  private below = 0
  private above = 0

  constructor(private targetFps: number, private hooks: QualityHooks, private maxPixelRatio: number) {}

  update(dt: number) {
    if (dt <= 0) return
    const fps = 1 / dt
    this.ema += (fps - this.ema) * 0.05

    if (this.ema < this.targetFps * 0.9) { this.below += dt; this.above = 0 }
    else if (this.ema > this.targetFps * 0.98) { this.above += dt; this.below = 0 }
    else { this.below = 0; this.above = 0 }

    if (this.below > 2 && this.level < 3) { this.apply(this.level + 1); this.below = 0 }
    else if (this.above > 6 && this.level > 0) { this.apply(this.level - 1); this.above = 0 }
  }

  private apply(level: number) {
    this.level = level
    this.hooks.setPixelRatio(level >= 1 ? Math.min(1.5, this.maxPixelRatio) : this.maxPixelRatio)
    this.hooks.setConnectionsVisible(level < 2)
    this.hooks.setActiveParticleRatio(level >= 3 ? 0.6 : 1)
  }
}
