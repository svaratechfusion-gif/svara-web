// The cursor layer: one pointermove listener for the whole experience,
// publishing a smoothed normalized position (-1..1) that particle fields,
// parallax layers, and the camera all read — plus quickSetter-driven DOM
// followers (each with its own depth) so cursor-reactive elements never
// trigger Vue re-renders or per-element listeners.
import { gsap } from "~~/lib/gsap";

interface Follower {
  setX: (value: number) => void;
  setY: (value: number) => void;
  depth: number;
}

export class CursorController {
  /** Raw normalized pointer, -1..1 from viewport center. */
  readonly target = { x: 0, y: 0 };
  /** Smoothed pointer — what consumers should read. */
  readonly smoothed = { x: 0, y: 0 };

  private followers = new Set<Follower>();
  private smoothing: number;
  private started = false;

  constructor(options: { smoothing?: number } = {}) {
    this.smoothing = options.smoothing ?? 0.08;
  }

  start() {
    if (this.started) return this;
    this.started = true;
    window.addEventListener("pointermove", this.handleMove, { passive: true });
    gsap.ticker.add(this.tick);
    return this;
  }

  private handleMove = (event: PointerEvent) => {
    this.target.x = (event.clientX / window.innerWidth - 0.5) * 2;
    this.target.y = -(event.clientY / window.innerHeight - 0.5) * 2;
  };

  private tick = () => {
    this.smoothed.x += (this.target.x - this.smoothed.x) * this.smoothing;
    this.smoothed.y += (this.target.y - this.smoothed.y) * this.smoothing;
    for (const follower of this.followers) {
      follower.setX(this.smoothed.x * follower.depth);
      follower.setY(-this.smoothed.y * follower.depth);
    }
  };

  /**
   * Attach a DOM element that drifts with the cursor at the given depth
   * (px of travel at full pointer deflection). Returns a detach function.
   */
  follow(element: Element, depth: number) {
    const follower: Follower = {
      setX: gsap.quickSetter(element, "x", "px") as (value: number) => void,
      setY: gsap.quickSetter(element, "y", "px") as (value: number) => void,
      depth,
    };
    this.followers.add(follower);
    return () => this.followers.delete(follower);
  }

  dispose() {
    window.removeEventListener("pointermove", this.handleMove);
    gsap.ticker.remove(this.tick);
    this.followers.clear();
    this.started = false;
  }
}
