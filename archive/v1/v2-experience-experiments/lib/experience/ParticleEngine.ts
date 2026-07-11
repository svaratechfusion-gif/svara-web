// Bridge between the GSAP orchestration layer and the WebGL particle world
// (IntelligenceWorld.vue's pool). The engine doesn't own particle math — the
// render loop does, for per-frame performance — it owns the CHANNELS the
// timeline writes into: named scalar values (scene blends, activation
// energy, focus) that the render loop reads each frame. This is the seam
// that lets MasterTimeline drive the canvas without GSAP touching 8,000
// particles individually.
import { gsap } from "~~/lib/gsap";

export class ParticleEngine {
  private channels = new Map<string, { value: number }>();

  /** Declare (or fetch) a scalar channel, e.g. "emergence", "activation". */
  channel(name: string, initial = 0) {
    let channel = this.channels.get(name);
    if (!channel) {
      channel = { value: initial };
      this.channels.set(name, channel);
    }
    return channel;
  }

  /** Current value — called from the render loop, allocation-free. */
  read(name: string) {
    return this.channels.get(name)?.value ?? 0;
  }

  /** Immediate write (scrub-style), no tween. */
  set(name: string, value: number) {
    this.channel(name).value = value;
  }

  /** Tweened write for time-based beats (e.g. the birth cascade). */
  to(name: string, value: number, vars: gsap.TweenVars = {}) {
    return gsap.to(this.channel(name), { value, ...vars });
  }

  /**
   * Timeline-pluggable tween — SceneManager scenes call this inside their
   * build() so channel motion lives on the ONE master timeline.
   */
  tween(name: string, from: number, to: number, vars: gsap.TweenVars = {}) {
    const channel = this.channel(name, from);
    // immediateRender must stay off: fromTo renders its `from` state at
    // CREATION time by default, so building a later scene's 1→0 tween would
    // stamp 1 onto the channel before the visitor ever scrolls (this is how
    // the glyph once appeared fully formed during the birth void).
    return gsap.fromTo(channel, { value: from }, { value: to, ease: "none", immediateRender: false, ...vars });
  }

  dispose() {
    for (const channel of this.channels.values()) gsap.killTweensOf(channel);
    this.channels.clear();
  }
}
