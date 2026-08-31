// Shared open-state for the Digital Twin Platform immersive overlay — mirrors the other product
// Explore composables. Toggled from the Digital Twin card's "Explore" control (ProductOverlay)
// and consumed by <TwinExplore> on the products page. SSR-safe (useState). Closing hides the
// overlay so the products page keeps its exact scroll position (no route change).
export function useTwinExplore() {
  const open = useState<boolean>('twin-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
