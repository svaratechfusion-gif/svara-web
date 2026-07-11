// Product choreography for Scene 06: which product is foregrounded, how the
// camera frames it, and how its caption enters — one coordinated action per
// product beat instead of components separately poking camera/caption/state.
import type { CameraController } from "./CameraController";
import type { TypographyDirector } from "./TypographyDirector";

export interface ProductStop {
  name: string;
  /** World-space cluster center the camera should frame. */
  center: { x: number; y: number; z: number };
}

export class ProductDirector {
  private camera: CameraController;
  private typography: TypographyDirector;
  private stops: ProductStop[] = [];
  private activeIndex = -1;
  private listeners = new Set<(name: string | null) => void>();

  constructor(camera: CameraController, typography: TypographyDirector) {
    this.camera = camera;
    this.typography = typography;
  }

  setStops(stops: ProductStop[]) {
    this.stops = stops;
    return this;
  }

  /** Fired whenever the foregrounded product changes (or clears). */
  onChange(listener: (name: string | null) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Sweep position 0..1 across all products → foreground the right one. */
  update(sweep: number) {
    if (!this.stops.length) return;
    const index = Math.min(this.stops.length - 1, Math.floor(sweep * this.stops.length));
    if (index === this.activeIndex) return;
    this.activeIndex = index;
    const stop = this.stops[index]!;
    this.camera.focus(stop.center, { duration: 1.2 });
    for (const listener of this.listeners) listener(stop.name);
  }

  /** Caption entrance for the product currently in front of the camera. */
  announce(captionTarget: gsap.DOMTarget) {
    return this.typography.emerge(captionTarget, { stagger: 0.015, duration: 0.5 });
  }

  clear() {
    this.activeIndex = -1;
    for (const listener of this.listeners) listener(null);
  }

  dispose() {
    this.listeners.clear();
    this.stops = [];
    this.activeIndex = -1;
  }
}
