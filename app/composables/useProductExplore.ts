// PRODUCT EXPERIENCE ROUTING — one map from a /products/<slug> detail route to the
// immersive overlay that covers that product, plus the hand-off state used when the
// click happens on another page (technology, ecosystem, home …) and the overlay only
// exists on /products.
//
// Why this exists: every in-site "Learn more" pointed at /products/<slug>, which is the
// plain KnowledgeProductLayout document. That is the right destination for a crawler or
// a shared link, but not for someone browsing the site — they should land in the product
// experience. The href stays intact (see plugins/product-explore.client.ts); only the
// in-app click is redirected.
import { SVARA_OS } from '~/utils/svara-os'
import { useVisionExplore } from './useVisionExplore'
import { useDroneExplore } from './useDroneExplore'
import { useEdgeExplore } from './useEdgeExplore'
import { useCognitiveExplore } from './useCognitiveExplore'
import { useAgentsExplore } from './useAgentsExplore'
import { useTwinExplore } from './useTwinExplore'
import { useAiosExplore } from './useAiosExplore'
import { useCloudExplore } from './useCloudExplore'
import { useEngineeringExplore } from './useEngineeringExplore'
import { useGrowthExplore } from './useGrowthExplore'

/** `/products/<slug>` → the product id whose overlay covers it. */
export const PRODUCT_PATH_TO_ID: Readonly<Record<string, string>> = Object.freeze({
  // derived from SVARA_OS so a card's route and this map cannot drift apart
  ...Object.fromEntries(
    SVARA_OS.filter((p) => p.to.startsWith('/products/')).map((p) => [p.to, p.id]),
  ),
  // detail routes that exist in lib/content but are not any card's `to`
  '/products/command-center': 'aios',
  '/products/growth-intelligence': 'growth',
})

/** Product id to open once /products has mounted; consumed by pages/products/index.vue. */
export function usePendingProductExplore() {
  return useState<string | null>('pending-product-explore', () => null)
}

/** Every immersive overlay's opener, keyed by product id. */
export function useExploreOpeners(): Record<string, () => void> {
  return {
    vision: useVisionExplore().openExplore,
    drone: useDroneExplore().openExplore,
    edge: useEdgeExplore().openExplore,
    cognitive: useCognitiveExplore().openExplore,
    agents: useAgentsExplore().openExplore,
    twin: useTwinExplore().openExplore,
    aios: useAiosExplore().openExplore,
    cloud: useCloudExplore().openExplore,
    engineering: useEngineeringExplore().openExplore,
    growth: useGrowthExplore().openExplore,
  }
}
