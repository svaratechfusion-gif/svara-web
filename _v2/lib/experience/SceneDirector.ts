// The SceneDirector — the film director above SceneManager.
//
// SceneManager knows Scene A → Scene B. The SceneDirector knows WHY:
// camera language, pacing, pauses, anticipation, reveals, silence, and the
// emotional beat each scene must land (Silence → Curiosity → Discovery →
// Wonder → Understanding → Respect → Belief → Action, with the collapse's
// Shock as the sanctioned bridge). Its script builds the entire homepage
// into the ONE
// MasterTimeline via SceneManager — including explicit HOLD segments (the
// silence between scenes, a directing decision, not dead scroll) — and
// conducts the camera every frame from the particle channels the timeline
// writes. If a scene doesn't change the visitor's emotional state, it
// doesn't belong in this script.
import { gsap } from "~~/lib/gsap";
import type { SceneManager } from "./SceneManager";
import type { ParticleEngine } from "./ParticleEngine";
import type { CameraController } from "./CameraController";
import { weightSvh, holdSvh } from "./pacing";

// The canonical emotional timeline (doctrine, 2026-07-08):
// 0s Silence → 3s Curiosity → 10s Discovery → 20s Wonder → 35s Understanding
// → 55s Respect → 80s Belief → 100s Action. If a scene doesn't move the
// visitor to the NEXT emotion, it doesn't belong.
export type Emotion =
  | "silence"
  | "curiosity"
  | "discovery"
  | "wonder"
  | "shock"
  | "understanding"
  | "respect"
  | "belief"
  | "action";

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** World-space anchor points the camera language speaks about. */
export interface StageMarks {
  core: Vec3;
  products: Vec3[];
  industries: Vec3[];
}

interface SceneDirectorDeps {
  scenes: SceneManager;
  particles: ParticleEngine;
  getCamera: () => CameraController | null;
}

// Scene weights and holds come from the director's timing sheet (pacing.ts)
// — the SAME table the DOM caption sections read, so timeline beats and
// captions land on identical scroll boundaries. Nothing is hardcoded here.

export class SceneDirector {
  private deps: SceneDirectorDeps;
  private marks: StageMarks = { core: { x: 0, y: 0, z: 0 }, products: [], industries: [] };
  private emotionByScene = new Map<string, Emotion>();
  private currentEmotion: Emotion = "curiosity";
  private built = false;
  private conducting = false;
  private reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  constructor(deps: SceneDirectorDeps) {
    this.deps = deps;
  }

  /** Stage geometry from the WebGL world (cluster centers, core position). */
  setMarks(marks: StageMarks) {
    this.marks = marks;
    return this;
  }

  get emotion() {
    return this.currentEmotion;
  }

  /**
   * The script. Each scene declares its emotional beat and how its channels
   * move — anticipation (slow build), attack (the reveal), settle. Channel
   * values land in ParticleEngine; the WebGL render loop reads them.
   *
   * @param tailWeight svh of scroll BELOW the last scene (footer etc.) —
   * the master timeline spans the whole document, so any unweighted scroll
   * at the end would stretch every scene later than its DOM section.
   * Measure it at mount and pass it in; it becomes a final silent hold.
   */
  buildScript(tailWeight = 0) {
    if (this.built) return this;
    this.built = true;
    const { scenes, particles } = this.deps;
    let holdIndex = 0;

    const hold = (weight: number) => {
      if (weight <= 0) return;
      scenes.register({
        id: `hold-${holdIndex++}`,
        weight,
        // A spacer tween — scroll passes, nothing changes. Silence.
        build: (tl) => tl.to({}, { duration: 1 }),
      });
    };

    const beat = (id: string, emotion: Emotion, weight: number, build: (tl: gsap.core.Timeline) => void) => {
      this.emotionByScene.set(id, emotion);
      scenes.register({
        id,
        weight,
        build,
        onEnter: (sceneId) => {
          this.currentEmotion = this.emotionByScene.get(sceneId) ?? this.currentEmotion;
        },
      });
    };

    // 00:00 Birth — time-based (the boot cascade), not scroll-based. Its
    // scroll footprint is pure hold: the visitor waits, curiosity does the
    // work. That IS the first directing decision.
    this.currentEmotion = "curiosity";
    hold(weightSvh("birth"));

    // 00:05 Emergence. Like gravity: almost all anticipation, the organizing
    // only truly commits in the final third. No labels.
    beat("emergence", "curiosity", weightSvh("emergence"), (tl) => {
      tl.add(particles.tween("emergence", 0, 1, { duration: 1, ease: "power2.in" }));
    });
    hold(holdSvh("emergence"));

    // 00:10 Intelligence (Creation). The core stabilizes FIRST (lighting
    // rises), and only then is typography generated from the same particles
    // — never faded, never slid. Two sub-beats within one scene.
    beat("creation", "discovery", weightSvh("creation"), (tl) => {
      // Spacer pins this sub-timeline's duration to exactly 1, so the
      // positions below read as FRACTIONS of the beat (MasterTimeline
      // normalizes each scene by its total duration — without this, adding
      // or trimming any tween silently re-times every other one).
      tl.to({}, { duration: 1 }, 0);
      // Condensing, like gravity: power2.in accumulates inward — the core
      // must never read as popping or scaling up.
      tl.add(particles.tween("coreLight", 0, 1, { duration: 0.28, ease: "power2.in" }), 0);
      // Linear scrub — the per-letter assembly windows in the render loop
      // do the choreography; an eased channel would clump letters together.
      tl.add(particles.tween("glyph", 0, 1, { duration: 0.4, ease: "none" }), 0.26);
      // The handoff: particles disappear, only typography remains. MUST
      // complete before ~0.8 of this beat — the sticky caption unpins 30svh
      // before the beat ends (hold 70svh < one viewport), and the swap has
      // to happen while the DOM heading is still pinned to viewport center.
      // After it, the real text scrolls away naturally, as real text does.
      tl.add(particles.tween("typoSolid", 0, 1, { duration: 0.08, ease: "power2.out" }), 0.68);
      tl.add(particles.tween("cameraPush", 0, 1, { duration: 0.68, ease: "power1.inOut" }), 0.04);
    });
    hold(holdSvh("creation"));

    // 00:18 Data Collapse. Alive, torrential — then the UNEASED cut: a
    // zero-duration set the scrubber snaps across in both directions. The
    // statistic is experienced before it is read.
    beat("dataCollapse", "shock", weightSvh("dataCollapse"), (tl) => {
      // Spacer: pins duration to 1 so positions below are beat fractions.
      tl.to({}, { duration: 1 }, 0);
      // Scene 06 "Camera Enters": the camera flies THROUGH the AI Core —
      // not scrolling, flying. power2.in = acceleration into the shell;
      // the headline scales up and fades into depth as we pass it (DOM
      // side reads cameraEnter). The torrent then materializes AROUND the
      // camera: we are inside the data world when the collapse hits.
      tl.add(particles.tween("enter", 0, 1, { duration: 0.3, ease: "power2.in" }), 0);
      // Typography releases — language dissolves back into data.
      tl.add(particles.tween("typoSolid", 1, 0, { duration: 0.18, ease: "power1.in" }), 0);
      tl.add(particles.tween("glyph", 1, 0, { duration: 0.25, ease: "power1.in" }), 0.05);
      tl.add(particles.tween("stream", 0, 1, { duration: 0.35, ease: "power1.in" }), 0.25);
      tl.set(particles.channel("disconnect"), { value: 1 }, 0.6);
      // The remainder of the spacer is held emptiness — the silence IS the beat.
    });
    hold(holdSvh("dataCollapse"));

    // 00:28 SVARA Restores Intelligence (Reconnection). The answer to Data
    // Collapse, paced as relief: quick attack, long warm settle. Streams of
    // light return — the biggest re-proportion in this pass (12s beat).
    beat("reconnection", "understanding", weightSvh("reconnection"), (tl) => {
      tl.to({}, { duration: 1 }, 0);
      // The camera pulls back OUT of the data world as SVARA reconnects —
      // the visitor retreats to a respectful distance and watches the core
      // rebuild itself.
      tl.add(particles.tween("enter", 1, 0, { duration: 0.35, ease: "power2.out" }), 0);
      // Scene 08 "SVARA": a PULSE — one spherical wavefront races out from
      // the core through the dead survivors — and only then do the
      // particles come home. The wake is initiated, not faded in.
      tl.add(particles.tween("pulse", 0, 1, { duration: 0.22, ease: "power2.out" }), 0);
      tl.add(particles.tween("reconnect", 0, 1, { duration: 0.9, ease: "power3.out" }), 0.08);
    });
    hold(holdSvh("reconnection"));

    // 00:40 Journey Through Products. Layout resolves fast (first ~12%),
    // then the orbit sweep owns the scene — each product its own moment.
    beat("productGalaxy", "respect", weightSvh("productGalaxy"), (tl) => {
      tl.add(particles.tween("productsLayout", 0, 1, { duration: 0.12, ease: "power2.out" }), 0);
      tl.add(particles.tween("productsSweep", 0, 1, { duration: 0.88, ease: "none" }), 0.12);
    });
    hold(holdSvh("productGalaxy"));

    // 01:00 Industries — equal weight to Products now (both 20s). Intelligence
    // BECOMES industries.
    beat("industryExpansion", "respect", weightSvh("industryExpansion"), (tl) => {
      tl.add(particles.tween("industriesLayout", 0, 1, { duration: 0.12, ease: "power2.out" }), 0);
      tl.add(particles.tween("industriesSweep", 0, 1, { duration: 0.88, ease: "none" }), 0.12);
    });
    hold(holdSvh("industryExpansion"));

    // 01:20 Enterprise Scale. One unbroken retreat; awe comes from
    // continuity, so the ease is nearly linear — no swoop, just distance.
    beat("scale", "belief", weightSvh("scale"), (tl) => {
      tl.add(particles.tween("scale", 0, 1, { duration: 1, ease: "power1.inOut" }));
    });
    hold(holdSvh("scale"));

    // 01:35 Final Reveal (Ending). Everything exhales. Belief, then stillness.
    beat("ending", "action", weightSvh("ending"), (tl) => {
      tl.add(particles.tween("ending", 0, 1, { duration: 1, ease: "power2.out" }));
    });
    // The ending's hold MUST be on the timeline too — the DOM section is
    // sized weight+hold, and any svh present in one partition but not the
    // other shifts every scene boundary after it.
    hold(holdSvh("ending"));

    // Whatever scrolls after the last scene (footer) is silence too.
    hold(tailWeight);

    scenes.build();
    return this;
  }

  /** Begin per-frame camera conduction (idempotent). */
  startConducting() {
    if (this.conducting) return this;
    this.conducting = true;
    gsap.ticker.add(this.conduct);
    return this;
  }

  /**
   * Camera language, evaluated every frame from the channels the timeline
   * wrote — the continuous baseline the discrete verbs override.
   */
  private conduct = (time: number) => {
    const camera = this.deps.getCamera();
    if (!camera) return;
    const read = (name: string) => this.deps.particles.read(name);

    const scale = read("scale");
    const ending = read("ending");
    const industriesSweep = read("industriesSweep");
    const industriesLayout = read("industriesLayout");
    const productsSweep = read("productsSweep");
    const productsLayout = read("productsLayout");

    if (scale > 0 || ending > 0) {
      // The one long dolly-out — further, further, further — deep enough
      // that the whole journey shrinks to one node inside the lattice;
      // the ending settles back home.
      camera.scrub(
        {
          x: 0,
          y: 1.6 * scale * (1 - ending),
          z: 8 + scale * 21 - ending * 18.5,
          targetX: this.marks.core.x,
          targetY: this.marks.core.y,
          targetZ: this.marks.core.z,
          fov: 42,
        },
        0.05
      );
    } else if (industriesLayout > 0 && this.marks.industries.length) {
      const index = Math.min(this.marks.industries.length - 1, Math.floor(industriesSweep * this.marks.industries.length));
      const mark = this.marks.industries[index]!;
      // The camera keeps zooming OUTWARD as it drifts — each world is seen
      // a little wider than the last, until the dioramas read as a shelf of
      // living miniatures rather than a sequence of close-ups.
      camera.scrub(
        {
          x: mark.x,
          y: mark.y + 1.0 + industriesSweep * 0.5,
          z: mark.z + 4.3 + industriesSweep * 2.4,
          targetX: mark.x,
          targetY: mark.y,
          targetZ: mark.z,
          fov: 42,
        },
        0.06
      );
    } else if (productsLayout > 0 && this.marks.products.length) {
      const index = Math.min(this.marks.products.length - 1, Math.floor(productsSweep * this.marks.products.length));
      const mark = this.marks.products[index]!;
      if (index === 3 && !this.reducedMotion) {
        // AI Agents: the camera ROTATES — a continuous slow orbit around
        // the workflow graph, so the node topology reads in parallax.
        camera.scrub(
          {
            x: mark.x + Math.cos(time * 0.3) * 2.7,
            y: mark.y * 0.5 + 0.5,
            z: mark.z + Math.sin(time * 0.3) * 2.7,
            targetX: mark.x,
            targetY: mark.y,
            targetZ: mark.z,
            fov: 42,
          },
          0.06
        );
        return;
      }
      // Drone AI (index 1): the camera SWINGS — a slow lateral arc around
      // the survey flight, slightly elevated, instead of a fixed pose.
      const swing = index === 1 && !this.reducedMotion ? Math.sin(time * 0.45) * 0.85 : 0;
      const swingLift = index === 1 && !this.reducedMotion ? 0.15 + Math.sin(time * 0.28) * 0.15 : 0;
      camera.scrub(
        {
          x: mark.x * 0.72 + swing,
          y: mark.y * 0.5 + 0.3 + swingLift,
          z: mark.z * 0.72 + 3.4,
          targetX: mark.x,
          targetY: mark.y,
          targetZ: mark.z,
          fov: 42,
        },
        0.06
      );
    } else {
      // Creation's slow push-in (1.1 units) is the approach; Scene 06's
      // "enter" is the flight — 5.7 more units carries the camera INTO the
      // core shell (z ≈ 1.2), particles streaming past the frame edges,
      // fov widening for velocity. Not scrolling. Flying.
      const enter = read("enter");
      camera.scrub(
        {
          x: 0,
          y: 0,
          z: 8 - read("cameraPush") * 1.1 - enter * 5.7,
          targetX: 0,
          targetY: 0,
          targetZ: 0,
          fov: 42 + enter * 14,
        },
        0.08
      );
    }
  };

  /** Foregrounded product index (-1 when the galaxy isn't active). */
  get productIndex() {
    if (this.deps.particles.read("productsLayout") <= 0) return -1;
    const count = this.marks.products.length;
    return count ? Math.min(count - 1, Math.floor(this.deps.particles.read("productsSweep") * count)) : -1;
  }

  /** Foregrounded industry index (-1 when the expansion isn't active). */
  get industryIndex() {
    if (this.deps.particles.read("industriesLayout") <= 0) return -1;
    const count = this.marks.industries.length;
    return count ? Math.min(count - 1, Math.floor(this.deps.particles.read("industriesSweep") * count)) : -1;
  }

  dispose() {
    gsap.ticker.remove(this.conduct);
    this.conducting = false;
    this.built = false;
    this.emotionByScene.clear();
  }
}
