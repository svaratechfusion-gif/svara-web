// The homepage thinks in SCENES, not sections. SceneManager owns the ordered
// scene list (Birth → Emergence → Core → Typography → Data → Reconnect →
// Products → Industries → Scale → Ending), builds them into the one
// MasterTimeline, and emits enter/leave transitions as the scrubbed progress
// crosses scene boundaries — components never diff progress themselves.
import { MasterTimeline, type SceneSegment } from "./MasterTimeline";

export interface SceneHooks {
  onEnter?: (id: string, direction: 1 | -1) => void;
  onLeave?: (id: string, direction: 1 | -1) => void;
}

export interface SceneDefinition extends SceneSegment, SceneHooks {}

export class SceneManager {
  readonly master: MasterTimeline;
  private scenes: SceneDefinition[] = [];
  private activeId: string | null = null;
  private lastProgress = 0;

  constructor(master = new MasterTimeline()) {
    this.master = master;
  }

  register(scene: SceneDefinition) {
    this.scenes.push(scene);
    this.master.add(scene);
    return this;
  }

  build() {
    this.master.build();
    return this;
  }

  get active() {
    return this.activeId;
  }

  /** Single progress entry point — called by ScrollController every frame. */
  update(progress: number) {
    const direction: 1 | -1 = progress >= this.lastProgress ? 1 : -1;
    this.lastProgress = progress;
    this.master.setProgress(progress);

    const current = this.sceneAt(progress);
    if (current !== this.activeId) {
      const previous = this.scenes.find((s) => s.id === this.activeId);
      previous?.onLeave?.(previous.id, direction);
      const next = this.scenes.find((s) => s.id === current);
      next?.onEnter?.(next.id, direction);
      this.activeId = current;
    }
  }

  sceneAt(progress: number): string | null {
    for (const scene of this.scenes) {
      const range = this.master.range(scene.id);
      if (range && progress >= range.start && progress < range.end) return scene.id;
    }
    return this.scenes.length ? this.scenes[this.scenes.length - 1]!.id : null;
  }

  /** Local 0..1 progress within one scene — the per-scene animation driver. */
  sceneProgress(id: string, globalProgress: number) {
    const range = this.master.range(id);
    if (!range || range.end <= range.start) return 0;
    return Math.min(1, Math.max(0, (globalProgress - range.start) / (range.end - range.start)));
  }

  dispose() {
    this.master.dispose();
    this.scenes = [];
    this.activeId = null;
  }
}
