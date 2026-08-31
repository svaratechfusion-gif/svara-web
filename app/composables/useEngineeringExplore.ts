// Shared open-state for the Digital Engineering immersive overlay — mirrors the other product
// Explore composables. Toggled from the Engineering card's "Explore" control (ProductOverlay) and
// consumed by <EngineeringExplore> on the products page. SSR-safe (useState). Closing hides the
// overlay so the products page keeps its exact scroll position (no route change).
export function useEngineeringExplore() {
  const open = useState<boolean>('engineering-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
