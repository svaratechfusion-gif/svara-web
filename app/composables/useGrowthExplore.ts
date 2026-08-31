// Shared open-state for the Digital Growth immersive overlay — mirrors the other product Explore
// composables. Toggled from the Growth card's "Explore" control (ProductOverlay) and consumed by
// <GrowthExplore> on the products page. SSR-safe (useState). Closing hides the overlay so the
// products page keeps its exact scroll position (no route change).
export function useGrowthExplore() {
  const open = useState<boolean>('growth-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
