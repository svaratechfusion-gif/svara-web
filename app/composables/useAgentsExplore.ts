// Shared open-state for the Autonomous Agents & Voice AI immersive overlay — mirrors the other
// product Explore composables. Toggled from the AI Agents card's "Explore" control (ProductOverlay)
// and consumed by <AgentsExplore> on the products page. SSR-safe (useState). Closing hides the
// overlay so the products page keeps its exact scroll position (no route change).
export function useAgentsExplore() {
  const open = useState<boolean>('agents-explore-open', () => false)
  return {
    open,
    openExplore: () => { open.value = true },
    closeExplore: () => { open.value = false },
  }
}
