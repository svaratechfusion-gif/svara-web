// Shared state for the single persistent particle world (see
// docs/creative-direction.md) — one globalProgress value (0-1 across the
// whole page) that every scene reads its own local progress from, instead of
// each section computing its own getBoundingClientRect-based progress.
//
// Backed by useState (not a plain module-scope ref) for the same reason
// usePageReveal is: plain module state can leak between requests during SSR,
// useState is request-scoped on the server and a genuine shared singleton on
// the client.
export interface SceneRange {
  id: string;
  start: number;
  end: number;
}

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

export function useIntelligenceWorld() {
  const globalProgress = useState("intelligence-world-progress", () => 0);
  const scenes = useState<SceneRange[]>("intelligence-world-scenes", () => []);
  const activeProduct = useState<string | null>("intelligence-world-active-product", () => null);
  const selectedProduct = useState<string | null>("intelligence-world-selected-product", () => null);
  const activeIndustry = useState<string | null>("intelligence-world-active-industry", () => null);
  // Scene 05 "Typography is Created" handoff: the render loop mirrors the
  // typoSolid channel here (0 = particle text, 1 = real DOM text), and
  // publishes the DOM font size (in svh) that makes the real headline
  // occupy exactly the world-space rect the particles assembled in.
  const typographySolid = useState("intelligence-world-typo-solid", () => 0);
  const typographyFontSvh = useState("intelligence-world-typo-font-svh", () => 10);
  // Scene 06 "Camera Enters": 0→1 as the camera flies through the core.
  // The DOM headline reads this to scale up and fade into depth — it
  // passes AROUND the visitor, not away from them.
  const cameraEnter = useState("intelligence-world-camera-enter", () => 0);

  // Idempotent by id — a scene re-registering (e.g. HMR, or a resize-driven
  // recompute of its fraction) updates in place rather than duplicating.
  function registerScene(id: string, start: number, end: number) {
    const existing = scenes.value.find((scene) => scene.id === id);
    if (existing) {
      existing.start = start;
      existing.end = end;
    } else {
      scenes.value.push({ id, start, end });
    }
  }

  function sceneProgress(id: string) {
    const scene = scenes.value.find((s) => s.id === id);
    if (!scene) return 0;
    return smoothstep(scene.start, scene.end, globalProgress.value);
  }

  return {
    globalProgress,
    scenes,
    activeProduct,
    selectedProduct,
    activeIndustry,
    typographySolid,
    typographyFontSvh,
    cameraEnter,
    registerScene,
    sceneProgress,
  };
}

/**
 * Standard scene-section wiring: returns a section ref (whose scroll height
 * the component binds from `sectionSvh(id)`) plus the registration of its
 * scroll RANGE (re-registered on resize) with the shared world. Height and
 * timeline weight both read the one pacing table, so the DOM caption
 * partition stays identical to the SceneDirector timeline partition.
 *
 * The range's END is the sticky-unpin point (section bottom minus one
 * viewport), not the section's true bottom: a `position: sticky; top: 0`
 * caption stops tracking a full viewport-height before the section ends, so
 * measuring to the true bottom made every scene's final beats play after its
 * caption had already scrolled away (confirmed in headless screenshots —
 * Scene 05's wordmark reveal started at the exact scroll position where it
 * unpinned). With this mapping, progress hits 1 on the last pinned frame.
 */
export function useSceneRange(id: string) {
  const { registerScene } = useIntelligenceWorld();
  const sectionRef = ref<HTMLElement | null>(null);

  function updateRange() {
    if (!sectionRef.value) return;
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    const top = sectionRef.value.offsetTop;
    const pinnedHeight = Math.max(1, sectionRef.value.offsetHeight - window.innerHeight);
    registerScene(id, top / totalScrollable, (top + pinnedHeight) / totalScrollable);
  }

  onMounted(() => {
    updateRange();
    window.addEventListener("resize", updateRange);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateRange);
  });

  return sectionRef;
}
