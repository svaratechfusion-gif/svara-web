# Products Experience

**Status:** Draft
**Owner:** SVARA
**Purpose:** Introduce the product ecosystem.
**Business Goal:** Generate confidence in SVARA's capability breadth.
**Primary Persona:** Enterprise CXOs
**Secondary Persona:** Enterprise Architects
**User Question:** What can SVARA actually do?
**Success Metrics:**
- Click-through to Knowledge Hubs
- Time on page
- Scroll depth

---

## Capability Clusters

| Cluster | Products | Page Section |
|---------|----------|-------------|
| Sense | Vision AI, Drone AI | Data acquisition and perception |
| Think | Edge AI, Generative AI, AI Agents | Intelligence and reasoning |
| Simulate | Digital Twin | Modeling and prediction |
| Operate | AI OS, Unified Business Cloud, Command Center | Orchestration and control |
| Grow | Digital Growth | Optimization and outcomes |

---

## Motion

Cards reveal on scroll with GSAP-driven entry. No particle world. No active camera. Minimal motion — products speak for themselves.

## Camera

None. Static page.

## Content

Products overview page introduces capability clusters. Each card links to its Knowledge Hub (`/products/[slug]`). No feature details on this page — those live in Knowledge Hubs. Each product is one sentence on this page.

## SEO

`useSeoMeta` with title "SVARA TechFusion — Products" and description. Schema.org WebPage + BreadcrumbList. Product schema on individual Knowledge Hub pages.

## Accessibility

- Standard heading hierarchy
- All product cards keyboard navigable (tab, enter)
- Link text states destination: "Explore Vision AI"
- Reduced motion: no scroll entry transforms

## Performance

- No Three.js. Static content page.
- SSR rendered
- Product list from `utils/products.ts` (shared with homepage)

## Acceptance Criteria

- ✓ All 10 products displayed in 5 capability clusters
- ✓ Each product card shows: name, one-sentence description, "Explore" link
- ✓ No feature-level detail on this page
- ✓ Each "Explore" link navigates to `/products/[slug]`
- ✓ Knowledge Hub pages exist for all 10 products

---

# Tasks

## PR-001

**Title:** Products — Overview Page
**Files:** `pages/products.vue`, `utils/products.ts`, `components/ui/PageHero.vue`, `components/ui/SectionContent.vue`

**Creative Intent:** The visitor should see SVARA's breadth at a glance.
**Business Intent:** Demonstrate capability range without overwhelming.
**Technical Intent:** Hero with headline + subtitle. 5 cluster sections, each containing product cards in a grid. Product data from shared `utils/products.ts`.

**Dependencies:** `PageHero`, `SectionContent`, `utils/products.ts`

**Acceptance Criteria:**
- ✓ Headline: "Products"
- ✓ Subtitle: "Capabilities, not features. Every product is a layer of intelligence."
- ✓ 5 cluster sections with headings (Sense, Think, Simulate, Operate, Grow)
- ✓ 10 product cards across clusters
- ✓ Each card shows product name + one sentence
- ✓ Each card has "Explore [Name]" link
- ✓ No feature-level detail
- ✓ Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop

**Definition of Done:** All acceptance criteria met.

---

## PR-002

**Title:** Products — Knowledge Hub Template
**Files:** `pages/products/[slug].vue`, `components/ui/PageHero.vue`, `components/ui/SectionContent.vue`

**Creative Intent:** The visitor should understand exactly what this product does.
**Business Intent:** Provide depth without homepage clutter.
**Technical Intent:** Dynamic route `[slug].vue`. Resolves product from slug. 404 if not found. Builds page from template sections: Hero → Overview → How It Works → Use Cases → Architecture → FAQ → Related.

**Dependencies:** `utils/products.ts`, `PageHero`, `SectionContent`

**Acceptance Criteria:**
- ✓ Route resolves `/products/[slug]` for all 10 products
- ✓ 404 redirect on unknown slug
- ✓ Hero shows product name + description from `products.ts`
- ✓ 7 template sections render (even if content is placeholder)
- ✓ Breadcrumb: "All Products" → back to `/products`
- ✓ No homepage particle world on this page

**Definition of Done:** All acceptance criteria met.

---

## PR-003

**Title:** Products — SEO + Structured Data
**Files:** `pages/products.vue`, `pages/products/[slug].vue`

**Creative Intent:** Answer "What products does SVARA offer?" for search and AI.
**Business Intent:** Rank for product-specific queries.
**Technical Intent:** Overview page uses `useSeoMeta`. Each Knowledge Hub uses `useSeoMeta` with product-specific title + description. Schema.org Product node on Knowledge Hub pages.

**Dependencies:** `@nuxtjs/seo`

**Acceptance Criteria:**
- ✓ Products overview: title "SVARA TechFusion — Products", 3-sentence description
- ✓ Each Knowledge Hub: title "SVARA TechFusion — [Product Name]", product-specific description
- ✓ BreadcrumbList structured data: Home > Products > [Product Name]
- ✓ Canonical URLs for all product pages
- ✓ Open Graph tags on all product pages

**Definition of Done:** All acceptance criteria met.
