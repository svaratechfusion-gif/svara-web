// ONE master timeline for the whole homepage — scenes plug into it as
// weighted, labeled segments; nothing else on the page owns a scroll-scrubbed
// timeline. ScrollController scrubs this timeline's progress; SceneManager
// decides what goes into it and in what order.
import { gsap } from "~~/lib/gsap";

export interface SceneSegment {
  id: string;
  /** Relative share of the master timeline (scroll real estate). */
  weight: number;
  /** Populates this scene's sub-timeline. Runs once, at build time. */
  build: (tl: gsap.core.Timeline) => void;
}

export class MasterTimeline {
  /** Paused always — progress comes exclusively from the scrubber. */
  readonly timeline: gsap.core.Timeline;
  private segments: SceneSegment[] = [];
  private built = false;

  constructor() {
    this.timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  }

  add(segment: SceneSegment) {
    if (this.built) {
      throw new Error(`MasterTimeline is already built — register "${segment.id}" before build()`);
    }
    this.segments.push(segment);
    return this;
  }

  /** Lays every registered scene into one continuous, labeled timeline. */
  build() {
    if (this.built) return this;
    this.built = true;
    for (const segment of this.segments) {
      const sub = gsap.timeline();
      segment.build(sub);
      // Normalize each scene's sub-timeline to its weight so scroll
      // distance shares are decided by SceneManager, not by however long
      // a scene's internal tweens happen to be.
      const duration = Math.max(sub.duration(), 0.001);
      this.timeline.addLabel(segment.id);
      this.timeline.add(sub.timeScale(duration / segment.weight));
    }
    return this;
  }

  /** Scrub hook — driven by ScrollController, 0..1 across the whole page. */
  setProgress(progress: number) {
    this.timeline.progress(gsap.utils.clamp(0, 1, progress));
  }

  /** Start/end progress of a scene's segment within the master (0..1). */
  range(id: string): { start: number; end: number } | null {
    const label = this.timeline.labels[id];
    if (label === undefined) return null;
    const next = this.segments[this.segments.findIndex((s) => s.id === id) + 1];
    const endTime = next ? this.timeline.labels[next.id]! : this.timeline.duration();
    const total = Math.max(this.timeline.duration(), 0.001);
    return { start: label / total, end: endTime / total };
  }

  dispose() {
    this.timeline.kill();
    this.segments = [];
    this.built = false;
  }
}
