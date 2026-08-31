// Shared open-state for the Generative & Cognitive AI immersive overlay — mirrors
// useVisionExplore / useDroneExplore / useEdgeExplore. Toggled from the Cognitive AI card's
// "Explore" control (ProductOverlay) and consumed by <CognitiveExplore> on the products page.
// SSR-safe (useState). Closing hides the overlay so the products page keeps its exact scroll
// position (no route change).
export function useCognitiveExplore() {
  const open = useState<boolean>('cognitive-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
