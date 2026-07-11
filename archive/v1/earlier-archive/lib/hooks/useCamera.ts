// Component access to the cinematic camera verbs. The canvas world calls
// useCamera().attach(threeCamera) once on mount; every other component gets
// the same CameraController and speaks in verbs (orbit/focus/pullBack),
// never in raw tweens. Returns null-safe accessors because the camera only
// exists after the WebGL world mounts.
import { useMotionDirector } from "~~/lib/experience/MotionDirector";
import type { CameraLike } from "~~/lib/experience/CameraController";

export function useCamera() {
  const director = useMotionDirector();

  return {
    /** Bind the real THREE camera (canvas world, once, on mount). */
    attach: (camera: CameraLike) => director.attachCamera(camera),
    /** The controller — null until the canvas world has attached. */
    get controller() {
      return director.camera;
    },
    zoom: (factor: number, vars?: gsap.TweenVars) => director.camera?.zoom(factor, vars) ?? null,
    flyThrough: (waypoints: Array<{ x: number; y: number; z: number }>, vars?: gsap.TweenVars) =>
      director.camera?.flyThrough(waypoints, vars) ?? null,
    orbit: (angle: number, radius: number, vars?: gsap.TweenVars) => director.camera?.orbit(angle, radius, vars) ?? null,
    focus: (target: { x: number; y: number; z: number }, vars?: gsap.TweenVars) =>
      director.camera?.focus(target, vars) ?? null,
    pullBack: (distance: number, vars?: gsap.TweenVars) => director.camera?.pullBack(distance, vars) ?? null,
    tilt: (deltaY: number, vars?: gsap.TweenVars) => director.camera?.tilt(deltaY, vars) ?? null,
    reset: (vars?: gsap.TweenVars) => director.camera?.reset(vars) ?? null,
  };
}
