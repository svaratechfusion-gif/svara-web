# Decision Log

Every major decision recorded. Three months from now, nobody asks "why did we do this?"

---

## D-001: Homepage starts with the enterprise problem

**Reason:** Enterprise buyers care about their problems before vendors.
**Alternatives:** Start with SVARA branding. Rejected — weakens narrative.
**Date:** Sprint 1

## D-002: Two-document split (Creative Bible + Production Bible)

**Reason:** Vision and execution have different audiences and lifetimes.
**Alternatives:** Single document, three-document. Rejected — two is minimal partition.
**Date:** Sprint 1

## D-003: Content Priority Matrix

**Reason:** Homepage is a cinematic experience, not a brochure.
**Alternatives:** Full-content homepage. Rejected — destroys narrative arc.
**Date:** Sprint 1

## D-004: MotionDirector is single GSAP owner

**Reason:** One owner guarantees determinism.
**Alternatives:** Per-component GSAP. Rejected — coordination hell.
**Date:** Sprint 1

## D-005: Particles are data, not decoration

**Reason:** Semantic particles tell the story of data flow.
**Alternatives:** Decorative only. Rejected — visual noise without value.
**Date:** Sprint 1

## D-006: No fade/slide/bounce for typography

**Reason:** Text must feel connected to the data world.
**Alternatives:** Standard CSS transitions. Rejected — belong to every website.
**Date:** Sprint 1

## D-007: Navigation hidden for Acts 1-4

**Reason:** Nav during setup acts distracts from narrative.
**Alternatives:** Visible from start. Rejected — undercuts SVARA moment.
**Date:** Sprint 1

## D-008: Content sprint after Foundation

**Reason:** Content without a container creates unbounded scope.
**Alternatives:** Content-first. Rejected — leads to redesign.
**Date:** Sprint 1

## D-009: Vendored GSAP + Lenis

**Reason:** Eliminates CI/CD dependency on external registries.
**Alternatives:** npm tokens, CDN. Rejected — complexity and SSR issues.
**Date:** Sprint 1

## D-010: SES is single source of truth

**Reason:** Removes interpretation from implementation.
**Alternatives:** Code as truth. Rejected — drift without spec review.
**Date:** Sprint 1

## D-011: No pricing on website

**Reason:** Enterprise pricing is conversation-driven.
**Alternatives:** Transparent pricing. Rejected — misrepresents value.
**Date:** Sprint 1

## D-012: Single continuous scroll homepage

**Reason:** One scroll narrative > multi-page.
**Alternatives:** Multi-page, auto-video. Rejected — breaks emotional arc.
**Date:** Sprint 1

## D-013: Sprint 2 is Content, not Homepage

**Reason:** Animating placeholder text is wasted work.
**Alternatives:** Homepage with lorem ipsum. Rejected — delivers nothing.
**Date:** Sprint 2

## D-014: Clear role split (SVARA owns strategy, OpenCode owns implementation)

**Reason:** No tool works well under role ambiguity.
**Alternatives:** Shared ownership. Rejected — decision deadlock.
**Date:** Sprint 2
