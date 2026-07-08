// Shared between IntelligenceWorld (which sets this once the WebGL scene
// is initialized and the first frame is ready to render) and PageLoader
// (which watches it to decide when to reveal the page).
export function useWorldReady() {
  return useState("world-ready", () => false);
}
