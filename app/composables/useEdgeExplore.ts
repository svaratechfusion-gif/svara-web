// Shared open-state for the Edge AI Deployment Platform immersive overlay — mirrors
// useVisionExplore / useDroneExplore. Toggled from the Edge AI card's "Explore" control
// (ProductOverlay) and consumed by <EdgeExplore> on the products page. SSR-safe (useState).
// Closing hides the overlay so the products page keeps its exact scroll position (no route change).
export function useEdgeExplore() {
  const open = useState<boolean>('edge-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
