# DECISION LOG

Every major decision is recorded. Three months from now, nobody asks "why did we do this?"

---

## D-001

**Decision:** Homepage starts with the enterprise problem, not SVARA branding.
**Reason:** Enterprise buyers care about their problems before vendors.
**Alternatives Considered:** Start with SVARA branding, start with product showcase.
**Rejected because:** Leading with branding weakens narrative tension. The problem anchors the emotional arc.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-002

**Decision:** Two-document split — Creative Bible (vision/story) and Production Bible (executable specs).
**Reason:** Vision and execution have different audiences, lifetimes, and levels of precision. Mixing them creates ambiguity.
**Alternatives Considered:** Single document, three-document split (vision/spec/technical).
**Rejected because:** Three documents create sync overhead. Two documents is the minimal partition that keeps vision from contaminating specs.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-003

**Decision:** Content Priority Matrix — homepage owns category/problem/platform overview only. No product details, architecture, case studies, or team bios on homepage.
**Reason:** The homepage is a cinematic experience, not a brochure. Turning it into a product catalog destroys the narrative arc.
**Alternatives Considered:** Full-content homepage (everything on one page), separate experience-only page with content on subpages.
**Rejected because:** A separate experience page would never be visited. The homepage IS the experience. Content pages ARE the content.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-004

**Decision:** MotionDirector is the single GSAP owner. No component imports GSAP.
**Reason:** Six systems fighting over the same DOM properties creates unpredictable animation. One owner guarantees determinism.
**Alternatives Considered:** Per-component GSAP with coordination layer, composable-based GSAP access.
**Rejected because:** Coordination layers become coordination hell. Composables don't prevent `gsap.to()` calls.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-005

**Decision:** Particles are data, not decoration. Every particle behavior has semantic meaning.
**Reason:** Decorative particles look pretty but communicate nothing. Semantic particles tell the story of data flow.
**Alternatives Considered:** Decorative particles only, no particles at all.
**Rejected because:** Decorative particles add visual noise without narrative value. Semantic particles are the primary storytelling mechanism.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-006

**Decision:** No fade, no slide, no bounce for typography. Text generates from particles or dissolves back into them.
**Reason:** Fade/slide/bounce is the default animation language of every website. SVARA's typography must feel like it belongs to the intelligence world, not a presentation deck.
**Alternatives Considered:** Standard CSS transitions, GSAP text plugins, SplitText.
**Rejected because:** Standard transitions don't feel connected to the data world. The TypographyDirector exists to bridge the gap.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-007

**Decision:** Navigation is hidden for Acts 1-4 of the homepage. First nav appearance at the SVARA reveal (48% scroll).
**Reason:** Navigation during the setup acts (Reality, Fragmentation, Intelligence, Platform) distracts from the narrative. The nav appearing at the SVARA reveal reinforces "SVARA is the answer."
**Alternatives Considered:** Nav visible from start, nav appears after Act 1.
**Rejected because:** Visible nav from start turns the homepage into a standard website. Early nav reveal undercuts the SVARA moment.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-008

**Decision:** Content is created in sprints after Foundation, not before.
**Reason:** Content without a container creates unbounded scope. Foundation first gives every content item a defined place.
**Alternatives Considered:** Content-first development, parallel content and foundation.
**Rejected because:** Content-first leads to redesign when the container doesn't fit. Parallel creates dependency confusion.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-009

**Decision:** `lib/experience/` engine is vendored (not npm packages). GSAP Club plugins and Lenis are local files.
**Reason:** GSAP Club plugins require license key validation and are not available via npm without authentication. Lenis requires specific version pinning for the Vue integration. Vendoring eliminates CI/CD dependency on external package registry access.
**Alternatives Considered:** npm with access tokens, CDN loading, build-time license injection.
**Rejected because:** npm access tokens add CI complexity. CDN loading prevents SSR. License injection is fragile.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-010

**Decision:** SES is the single source of truth. If code disagrees with SES, fix the code, not the spec.
**Reason:** Without a binding spec, every engineer interprets "correct" differently. The SES removes interpretation from implementation.
**Alternatives Considered:** Code as source of truth, design files as source of truth, verbal agreements.
**Rejected because:** Code changes without spec review creates drift. Design files don't capture motion/interaction. Verbal agreements are invisible to future team members.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-011

**Decision:** No pricing on the website. Ever.
**Reason:** Enterprise infrastructure pricing is conversation-driven, not list-driven. Publishing prices invites comparison-shopping against point tools that solve 10% of the problem.
**Alternatives Considered:** Transparent pricing page, "contact for pricing", range-based pricing.
**Rejected because:** Transparent pricing misrepresents the value. "Contact for pricing" feels opaque. Range-based pricing confuses.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-012

**Decision:** Homepage is a single `sectionSvh`-driven scroll experience, not a multi-page parallax site.
**Reason:** One continuous scroll narrative creates higher completion rates than page-to-page navigation. The 9-scene structure maps to a single emotional arc that breaks if interrupted by page loads.
**Alternatives Considered:** Multi-page story, auto-playing video, interactive click-through.
**Rejected because:** Multi-page breaks the emotional arc. Video removes user agency. Click-through has higher friction than scroll.
**Date:** Sprint 1
**Owner:** SVARA

---

## D-013

**Decision:** Sprint 2 is Content. Not Homepage. Content is created and approved before any animation is applied.
**Reason:** Animating placeholder text is wasted work. Content-first ensures every animation has real words to work with.
**Alternatives Considered:** Homepage in Sprint 2 with placeholder text, Homepage in Sprint 2 with lorem ipsum.
**Rejected because:** Placeholder animation delivers nothing. Real content changes animation timing and phrasing.
**Date:** Sprint 2
**Owner:** SVARA

---

## D-014

**Decision:** Roles split — SVARA owns product strategy, creative direction, brand, story, UX, content, experience, acceptance criteria. OpenCode owns architecture implementation, Vue, Three.js, GSAP, Lenis, performance, testing, refactoring.
**Reason:** No tool works well under role ambiguity. Clear ownership eliminates "whose decision is this?" paralysis.
**Alternatives Considered:** Shared ownership of all roles, OpenCode as sole implementer with SVARA as reviewer only.
**Rejected because:** Shared ownership creates decision deadlock. Pure review-based workflow ignores that SVARA has creative intent that must drive implementation.
**Date:** Sprint 2
**Owner:** SVARA + OpenCode
