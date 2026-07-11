// Component access to the particle world's named channels — the seam
// between GSAP orchestration and the WebGL render loop. Scenes write
// channels (scrubbed or tweened); the render loop reads them per frame.
import { useMotionDirector } from "~~/lib/experience/MotionDirector";

export function useParticles() {
  const director = useMotionDirector();
  const engine = director.particles;

  return {
    engine,
    /** Declare/fetch a channel (returns the live { value } handle). */
    channel: (name: string, initial = 0) => engine.channel(name, initial),
    /** Read the current value — safe to call every frame. */
    read: (name: string) => engine.read(name),
    /** Scrub-style immediate write. */
    set: (name: string, value: number) => engine.set(name, value),
    /** Tweened write for time-based beats. */
    to: (name: string, value: number, vars?: gsap.TweenVars) => engine.to(name, value, vars),
  };
}
