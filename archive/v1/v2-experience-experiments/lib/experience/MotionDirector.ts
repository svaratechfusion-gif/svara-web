// The Motion Director — single façade over the whole experience stack.
// Components speak in cinematic intent (director.camera.orbit(...),
// director.typography.emerge(...), director.scenes.register(...)), never in
// raw gsap.to() calls. One director per page lifetime; dispose() tears down
// every controller, tween, trigger, and listener it created — no leaks, no
// orphaned ScrollTriggers.
import { gsap } from "~~/lib/gsap";
import { MasterTimeline } from "./MasterTimeline";
import { SceneManager } from "./SceneManager";
import { SceneDirector } from "./SceneDirector";
import { ScrollController } from "./ScrollController";
import { CameraController, type CameraLike } from "./CameraController";
import { CursorController } from "./CursorController";
import { ParticleEngine } from "./ParticleEngine";
import { AtmosphereLayer } from "./AtmosphereLayer";
import { LightingLayer } from "./LightingLayer";
import { TypographyDirector } from "./TypographyDirector";
import { ProductDirector } from "./ProductDirector";
import { PerformanceMonitor } from "./PerformanceMonitor";

export class MotionDirector {
  readonly master: MasterTimeline;
  readonly scenes: SceneManager;
  readonly sceneDirector: SceneDirector;
  readonly scroll: ScrollController;
  readonly cursor: CursorController;
  readonly particles: ParticleEngine;
  readonly atmosphere: AtmosphereLayer;
  readonly lighting: LightingLayer;
  readonly typography: TypographyDirector;
  readonly performance: PerformanceMonitor;

  /** Created lazily — the camera exists only once the WebGL world mounts. */
  camera: CameraController | null = null;
  products: ProductDirector | null = null;

  private unsubscribeScroll: (() => void) | null = null;

  /**
   * Per-frame writer for the scroll-velocity channels — a ticker callback so
   * `scrollEnergy` decays to 0 on the resting frame even after the scroll
   * listener stops firing (getVelocity() returns toward 0 when idle).
   */
  private writeScrollEnergy = () => {
    const speed = Math.abs(this.scroll.velocity);
    // Normalize against ~6 viewport-heights/sec (a hard flick); tune to taste.
    const energy = Math.min(1, speed / (window.innerHeight * 6));
    this.particles.set("scrollEnergy", energy);
    this.particles.set("scrollDirection", this.scroll.direction);
  };

  constructor() {
    this.master = new MasterTimeline();
    this.scenes = new SceneManager(this.master);
    this.scroll = new ScrollController();
    this.cursor = new CursorController();
    this.particles = new ParticleEngine();
    this.atmosphere = new AtmosphereLayer();
    this.lighting = new LightingLayer();
    this.typography = new TypographyDirector();
    this.performance = new PerformanceMonitor();
    this.sceneDirector = new SceneDirector({
      scenes: this.scenes,
      particles: this.particles,
      getCamera: () => this.camera,
    });
  }

  /** Bind the WebGL camera once the canvas world has mounted. */
  attachCamera(camera: CameraLike) {
    this.camera?.dispose();
    this.camera = new CameraController(camera);
    this.products?.dispose();
    this.products = new ProductDirector(this.camera, this.typography);
    return this.camera;
  }

  /**
   * Build the scene graph into the master timeline and start the one scroll
   * scrubber + camera conduction + input/perf systems. Call exactly once,
   * client-side, after all scenes are registered.
   */
  start() {
    this.scenes.build();
    this.scroll.start();
    this.unsubscribeScroll = this.scroll.onProgress((progress) => {
      this.scenes.update(progress);
      this.atmosphere.update(progress);
    });
    this.sceneDirector.startConducting();
    gsap.ticker.add(this.writeScrollEnergy);
    this.cursor.start();
    this.performance.start();
    return this;
  }

  dispose() {
    this.unsubscribeScroll?.();
    this.unsubscribeScroll = null;
    gsap.ticker.remove(this.writeScrollEnergy);
    this.performance.dispose();
    this.sceneDirector.dispose();
    this.products?.dispose();
    this.camera?.dispose();
    this.typography.dispose();
    this.lighting.dispose();
    this.atmosphere.dispose();
    this.particles.dispose();
    this.cursor.dispose();
    this.scroll.dispose();
    this.scenes.dispose();
  }
}

/**
 * Page-singleton accessor. Client-only by nature (window/ScrollTrigger);
 * callers in SSR paths must guard with import.meta.client.
 */
let director: MotionDirector | null = null;

export function useMotionDirector() {
  if (!director) director = new MotionDirector();
  return director;
}

export function disposeMotionDirector() {
  director?.dispose();
  director = null;
}
