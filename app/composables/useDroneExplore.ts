// Shared open-state for the Drone Intelligence immersive overlay — mirrors
// useVisionExplore. Toggled from the Drone AI card's "Explore" control (ProductOverlay)
// and consumed by <DroneExplore> on the products page. SSR-safe (useState). Closing
// hides the overlay so the products page keeps its exact scroll position (no route change).
export function useDroneExplore() {
  const open = useState<boolean>('drone-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
