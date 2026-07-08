# SVARA EXPERIENCE SPECIFICATION
## 10 — ACCEPTANCE CRITERIA

**Type:** SES
**Status:** Source of Truth

---

## Per-Sprint Gates

| Criteria | Sprint 1 | Sprint 2+ |
|----------|----------|-----------|
| All routes resolve | ✓ | ✓ |
| No TypeScript errors | ✓ | ✓ |
| No lint errors | ✓ | ✓ |
| Build succeeds | ✓ | ✓ |
| Lenis + GSAP ticker in sync | ✓ | ✓ |
| AppHeader navigation works for all routes | ✓ | ✓ |
| AppFooter renders on all pages | ✓ | ✓ |
| PageLoader shows on cold load | ✓ | ✓ |
| SEO metadata on every page | ✓ | ✓ |
| Structured data on every page | ✓ | ✓ |
| All scenes render | — | ✓ |
| Scene transitions animate | — | ✓ |
| Particle field at 60fps | — | ✓ |
| Reduced motion respected | — | ✓ |

---

## Experience Scorecard

Each scene scored /10 across six categories. Minimum pass: **7/10 in every category**.

| Category | Weight | Minimum |
|----------|--------|---------|
| Emotional Impact | 20% | 7/10 |
| Visual Storytelling | 20% | 7/10 |
| Clarity of Message | 20% | 7/10 |
| Brand Alignment | 15% | 7/10 |
| Performance | 15% | 7/10 |
| Accessibility | 10% | 7/10 |

*A single category below 7 is a blocking issue.*

---

## Review Process

1. **Self-review:** Implementer verifies against acceptance criteria
2. **Peer review:** Another engineer reviews the code
3. **Stakeholder walkthrough:** Business stakeholders review the experience
4. **Scorecard:** Experience scored across all six categories
5. **Sign-off:** All blocking issues resolved

---

## Go/No-Go Gates

| Gate | Pass Criteria |
|------|--------------|
| Experience Scorecard | Every category ≥ 7/10 |
| Lighthouse | ≥ 90 all metrics |
| Build | Clean build, zero errors |
| Content Review | All copy approved |
| Stakeholder Walkthrough | No blocking issues |

---

**End of SES-10.**
