// Shared between PageLoader (which sets this once its boot sequence
// finishes) and app.vue (which uses it to trigger the page content's own
// subtle scale-in — the "camera pushes into hero" feel — without PageLoader
// needing to know anything about the page content's DOM/animation directly.
export function usePageReveal() {
  return useState("page-revealed", () => false);
}
