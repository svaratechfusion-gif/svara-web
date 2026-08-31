// Shared open-state for the Unified Business Cloud immersive overlay — mirrors the other product
// Explore composables. Toggled from the Business Cloud card's "Explore" control (ProductOverlay)
// and consumed by <CloudExplore> on the products page. SSR-safe (useState). Closing hides the
// overlay so the products page keeps its exact scroll position (no route change).
export function useCloudExplore() {
  const open = useState<boolean>('cloud-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
