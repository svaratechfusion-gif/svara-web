// Lighting is a LAYER with named cues, not scattered material writes. Any
// light-like target (THREE light intensity, emissive scalar, a particle
// glow channel) registers as a named handle; scenes trigger cues ("core
// activation", "calm ending") through tweens on those handles — the only
// place lighting values ever animate.
import { gsap } from "~~/lib/gsap";

interface LightHandle {
  get: () => number;
  set: (value: number) => void;
  proxy: { value: number };
}

export class LightingLayer {
  private lights = new Map<string, LightHandle>();

  /** Register anything with a readable/writable scalar intensity. */
  register(name: string, get: () => number, set: (value: number) => void) {
    const handle: LightHandle = { get, set, proxy: { value: get() } };
    this.lights.set(name, handle);
    return () => this.lights.delete(name);
  }

  /** Tween a named light's intensity — the single lighting mutation path. */
  cue(name: string, intensity: number, vars: gsap.TweenVars = {}) {
    const handle = this.lights.get(name);
    if (!handle) return null;
    handle.proxy.value = handle.get();
    return gsap.to(handle.proxy, {
      value: intensity,
      onUpdate: () => handle.set(handle.proxy.value),
      ...vars,
    });
  }

  /** Instant write for scrub-driven lighting (no tween allocation). */
  set(name: string, intensity: number) {
    this.lights.get(name)?.set(intensity);
  }

  dispose() {
    for (const handle of this.lights.values()) gsap.killTweensOf(handle.proxy);
    this.lights.clear();
  }
}
