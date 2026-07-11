// 60fps is a design feature (Design Commandment #9). Samples frame timing on
// gsap's own ticker (no extra rAF loop) over a rolling window and drives a
// TIERED quality ladder: when the average FPS stays low, it escalates a tier
// and the world sheds cost at that tier (lines → resolution+count → canvas);
// when FPS recovers it de-escalates. The monitor decides WHEN; each system
// decides WHAT to shed at each tier.
//
// Performance budgets:
// - Desktop: 60 FPS
// - Laptop: 45+ FPS
// - Mobile: 30+ FPS
// - Prefer instanced geometry and `InstancedMesh` to limit GPU memory usage.
// - Avoid thousands of unique meshes; reuse shared geometry whenever possible.
import { gsap } from "~~/lib/gsap";

export interface PerformanceThresholds {
  /** Below this average FPS → escalate one tier. */
  degradeBelow: number;
  /** Above this average FPS → de-escalate one tier. */
  recoverAbove: number;
  /** Rolling window length in frames. */
  window: number;
  /** Highest tier the ladder climbs to. */
  maxTier: number;
}

export class PerformanceMonitor {
  private thresholds: PerformanceThresholds;
  private samples: number[] = [];
  private lastTime = 0;
  private tier = 0;
  private framesSinceChange = 0;
  private running = false;

  /** Fired on every tier change with the new tier (0 = full quality). */
  onTier: ((tier: number) => void) | null = null;

  constructor(thresholds: Partial<PerformanceThresholds> = {}) {
    // 45 FPS is the doctrine's hard floor ("60 FPS desktop, 45 minimum") —
    // degrade the moment the rolling average dips below it.
    this.thresholds = { degradeBelow: 45, recoverAbove: 57, window: 90, maxTier: 3, ...thresholds };
  }

  start() {
    if (this.running) return this;
    this.running = true;
    this.lastTime = 0;
    gsap.ticker.add(this.tick);
    return this;
  }

  private tick = (time: number) => {
    if (this.lastTime > 0) {
      const delta = time - this.lastTime;
      if (delta > 0) {
        this.samples.push(1 / delta);
        if (this.samples.length > this.thresholds.window) this.samples.shift();
      }
    }
    this.lastTime = time;
    this.framesSinceChange++;

    // Judge only on a full window, AND give any tier change a full window to
    // actually take effect before re-judging (dwell) — otherwise the ladder
    // oscillates while the last change is still settling.
    if (this.samples.length < this.thresholds.window) return;
    if (this.framesSinceChange < this.thresholds.window) return;

    const fps = this.average;
    if (fps < this.thresholds.degradeBelow && this.tier < this.thresholds.maxTier) {
      this.setTier(this.tier + 1);
    } else if (fps > this.thresholds.recoverAbove && this.tier > 0) {
      this.setTier(this.tier - 1);
    }
  };

  private setTier(tier: number) {
    this.tier = tier;
    this.framesSinceChange = 0;
    this.samples = []; // fresh judgment after the change lands
    this.onTier?.(tier);
  }

  get average() {
    if (!this.samples.length) return 60;
    return this.samples.reduce((sum, fps) => sum + fps, 0) / this.samples.length;
  }

  get currentTier() {
    return this.tier;
  }

  dispose() {
    gsap.ticker.remove(this.tick);
    this.samples = [];
    this.running = false;
  }
}
