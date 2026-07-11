// Atmosphere = the depth cues BETWEEN the background and the particle world:
// gradient washes, fog opacity, vignette. Each registered element gets an
// independent parallax depth, moved via quickSetter (no re-renders, no
// per-frame style recalc beyond the transforms themselves).
import { gsap } from "~~/lib/gsap";

interface AtmosphereElement {
  setY: (value: number) => void;
  setOpacity: (value: number) => void;
  depth: number;
  baseOpacity: number;
}

export class AtmosphereLayer {
  private elements = new Set<AtmosphereElement>();
  private density = { value: 1 };

  /**
   * Register a DOM veil (gradient/fog div). depth = px of vertical drift
   * across the full scroll; the element's opacity also scales with the
   * layer's global density.
   */
  add(element: Element, options: { depth?: number; opacity?: number } = {}) {
    const entry: AtmosphereElement = {
      setY: gsap.quickSetter(element, "y", "px") as (value: number) => void,
      setOpacity: gsap.quickSetter(element, "opacity") as (value: number) => void,
      depth: options.depth ?? 40,
      baseOpacity: options.opacity ?? 1,
    };
    this.elements.add(entry);
    return () => this.elements.delete(entry);
  }

  /** Scroll-driven update — one call per frame from the progress fan-out. */
  update(progress: number) {
    for (const el of this.elements) {
      el.setY(-progress * el.depth);
      el.setOpacity(el.baseOpacity * this.density.value);
    }
  }

  /** Fade the whole atmosphere (e.g. thin out for Scene 04's silence). */
  setDensity(value: number, vars: gsap.TweenVars = {}) {
    return gsap.to(this.density, { value, ...vars });
  }

  dispose() {
    gsap.killTweensOf(this.density);
    this.elements.clear();
  }
}
