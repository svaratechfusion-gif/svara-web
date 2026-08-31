// Shared open-state for the ONE AI OS immersive overlay — mirrors the other product Explore
// composables. Toggled from the ONE AI OS card's "Explore" control (ProductOverlay) and consumed
// by <AiosExplore> on the products page. SSR-safe (useState). Closing hides the overlay so the
// products page keeps its exact scroll position (no route change).
export function useAiosExplore() {
  const open = useState<boolean>('aios-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
