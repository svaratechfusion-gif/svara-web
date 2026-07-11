// Cinematic camera verbs — components say camera.orbit()/focus()/pullBack(),
// never gsap.to(camera.position, ...). Framework-agnostic: drives any
// THREE.PerspectiveCamera-shaped object through one gsap-tweened rig proxy,
// so consecutive verbs overwrite cleanly (overwrite:"auto" on one target)
// instead of stacking competing tweens on the camera itself.
import { gsap, EASES } from "~~/lib/gsap";

export interface CameraLike {
  position: { x: number; y: number; z: number };
  fov: number;
  lookAt: (x: number, y: number, z: number) => void;
  updateProjectionMatrix: () => void;
}

interface Rig {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  fov: number;
  orbitAngle: number;
  orbitRadius: number;
  orbiting: number; // 0 = positional mode, 1 = orbit mode
}

export class CameraController {
  private camera: CameraLike;
  private rig: Rig;
  private home: Pick<Rig, "x" | "y" | "z" | "fov">;

  constructor(camera: CameraLike) {
    this.camera = camera;
    this.home = { x: camera.position.x, y: camera.position.y, z: camera.position.z, fov: camera.fov };
    this.rig = {
      ...this.home,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      orbitAngle: 0,
      orbitRadius: 5,
      orbiting: 0,
    };
    gsap.ticker.add(this.apply);
  }

  /** Runs on gsap's ticker — one writer to the real camera per frame. */
  private apply = () => {
    const r = this.rig;
    if (r.orbiting > 0.001) {
      const ox = Math.cos(r.orbitAngle) * r.orbitRadius;
      const oz = Math.sin(r.orbitAngle) * r.orbitRadius;
      this.camera.position.x = r.x + (r.targetX + ox - r.x) * r.orbiting;
      this.camera.position.z = r.z + (r.targetZ + oz - r.z) * r.orbiting;
      this.camera.position.y = r.y;
    } else {
      this.camera.position.x = r.x;
      this.camera.position.y = r.y;
      this.camera.position.z = r.z;
    }
    if (this.camera.fov !== r.fov) {
      this.camera.fov = r.fov;
      this.camera.updateProjectionMatrix();
    }
    this.camera.lookAt(r.targetX, r.targetY, r.targetZ);
  };

  private to(vars: gsap.TweenVars & Partial<Rig>) {
    return gsap.to(this.rig, { ease: EASES.cinematic, duration: 1.4, ...vars });
  }

  /**
   * Continuous conduction — the SceneDirector's per-frame camera language.
   * Glides the rig toward a pose by `lerp` per call (no tween allocation;
   * safe to call every ticker frame). Distinct from the verb API: verbs are
   * discrete cinematic moves, scrub is the scroll-following baseline the
   * verbs momentarily override. Kills any in-flight verb tween on the rig
   * the moment scrubbing resumes, so the two writers never fight.
   */
  scrub(pose: Partial<Pick<Rig, "x" | "y" | "z" | "targetX" | "targetY" | "targetZ" | "fov">>, lerp = 1) {
    if (gsap.isTweening(this.rig)) gsap.killTweensOf(this.rig);
    const r = this.rig;
    const factor = Math.min(1, Math.max(0, lerp));
    if (pose.x !== undefined) r.x += (pose.x - r.x) * factor;
    if (pose.y !== undefined) r.y += (pose.y - r.y) * factor;
    if (pose.z !== undefined) r.z += (pose.z - r.z) * factor;
    if (pose.targetX !== undefined) r.targetX += (pose.targetX - r.targetX) * factor;
    if (pose.targetY !== undefined) r.targetY += (pose.targetY - r.targetY) * factor;
    if (pose.targetZ !== undefined) r.targetZ += (pose.targetZ - r.targetZ) * factor;
    if (pose.fov !== undefined) r.fov += (pose.fov - r.fov) * factor;
    r.orbiting = 0;
  }

  /** Dolly toward the current look target (fov stays honest — no fake zoom). */
  zoom(distanceFactor: number, vars: gsap.TweenVars = {}) {
    const r = this.rig;
    return this.to({
      x: r.targetX + (r.x - r.targetX) * distanceFactor,
      y: r.targetY + (r.y - r.targetY) * distanceFactor,
      z: r.targetZ + (r.z - r.targetZ) * distanceFactor,
      ...vars,
    });
  }

  /** Travel a sequence of waypoints as one continuous flight. */
  flyThrough(waypoints: Array<{ x: number; y: number; z: number }>, vars: gsap.TweenVars = {}) {
    const tl = gsap.timeline(vars);
    for (const point of waypoints) tl.to(this.rig, { ...point, ease: "none", duration: 1 });
    return tl;
  }

  /** Circle the current look target; angle in radians (2π = full orbit). */
  orbit(angle: number, radius: number, vars: gsap.TweenVars = {}) {
    return this.to({ orbiting: 1, orbitRadius: radius, orbitAngle: `+=${angle}` as unknown as number, ...vars });
  }

  /** Re-aim (and glide) to frame a specific point of interest. */
  focus(target: { x: number; y: number; z: number }, vars: gsap.TweenVars = {}) {
    return this.to({ targetX: target.x, targetY: target.y, targetZ: target.z, orbiting: 0, ...vars });
  }

  /** The Scale-scene move: one long unbroken retreat. */
  pullBack(distance: number, vars: gsap.TweenVars = {}) {
    return this.to({ z: this.rig.z + distance, orbiting: 0, duration: 2.4, ...vars });
  }

  /** Vertical pitch via look-target height — subtle, never a dutch roll. */
  tilt(deltaY: number, vars: gsap.TweenVars = {}) {
    return this.to({ targetY: this.rig.targetY + deltaY, ...vars });
  }

  reset(vars: gsap.TweenVars = {}) {
    return this.to({ ...this.home, targetX: 0, targetY: 0, targetZ: 0, orbiting: 0, ...vars });
  }

  dispose() {
    gsap.ticker.remove(this.apply);
    gsap.killTweensOf(this.rig);
  }
}
