// IN-SITE PRODUCT LINKS OPEN THE PRODUCT EXPERIENCE, NOT THE DOCUMENT PAGE.
//
// Every "Learn more" across the site (technology, ecosystem, home, sections …) points at
// /products/<slug>, which renders the plain KnowledgeProductLayout document. That is the
// correct target for a crawler, a shared link or a cmd-click — but a visitor browsing the
// site should arrive in the immersive product experience instead.
//
// One capture-phase listener handles every such link, current and future, instead of
// wiring a handler into each of the components that render one. Two deliberate choices:
//
//  - CAPTURE phase, with stopPropagation. Under vue-router 5 a RouterLink navigates even
//    when a click handler has called preventDefault(), so cancelling navigation from a
//    merged `@click` does not work (this is what broke the Explore controls). Capturing at
//    the document runs before the anchor's own handler, which then never fires.
//  - The href is left untouched. Crawlers still reach the document page, and a modified
//    click (cmd/ctrl/shift/alt or a non-primary button) still opens it in a new tab.
import { PRODUCT_PATH_TO_ID, usePendingProductExplore } from '~/composables/useProductExplore'

const PRODUCTS_ROUTE = '/products'

export default defineNuxtPlugin(() => {
  const pending = usePendingProductExplore()
  const router = useRouter()

  document.addEventListener('click', (e: MouseEvent) => {
    if (e.defaultPrevented) return
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

    const anchor = (e.target as Element | null)?.closest?.('a')
    if (!anchor) return
    // leave anything explicitly meant to leave the SPA alone
    if (anchor.hasAttribute('download') || anchor.hasAttribute('target')) return

    const href = anchor.getAttribute('href')
    if (!href || !href.startsWith('/')) return

    const id = PRODUCT_PATH_TO_ID[href.split(/[?#]/)[0]!]
    if (!id) return

    e.preventDefault()
    e.stopPropagation()
    pending.value = id
    // already on /products → the page's watcher opens it; otherwise go there first
    if (router.currentRoute.value.path !== PRODUCTS_ROUTE) void router.push(PRODUCTS_ROUTE)
  }, true)
})
