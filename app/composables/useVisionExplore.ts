// Shared open-state for the Vision Intelligence immersive overlay. Toggled from the
// Vision AI product card's "Explore" control (ProductOverlay) and consumed by the
// <VisionExplore> overlay mounted on the products page. SSR-safe (useState) — no
// module-scope ref leak. Closing simply hides the overlay, so the products page keeps
// its exact scroll position (no route change).
export function useVisionExplore() {
  const open = useState<boolean>('vision-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
