# Decision Ledger

Every major decision recorded. Six months from now, nobody asks "why?"

---

## D-001: Homepage begins with the enterprise problem

**Decision:** Homepage starts with the enterprise problem, not the brand.

**Reason:** Enterprise buyers search for solutions to operational problems, not company introductions.

**Alternative Considered:** Start with SVARA branding.

**Rejected Because:** Weakens narrative tension. The story needs setup before reveal.

**Date:** Sprint 1

---

## D-002: Two-document split (Creative Bible + Production Bible)

**Decision:** Split experience specifications into Creative (vision, story, emotion) and Production (executable specs).

**Reason:** Vision and execution have different audiences and lifetimes. The creative brief lives forever. The production spec ships with the sprint.

**Alternative Considered:** Single document, three-document split.

**Rejected Because:** Two is the minimal partition that separates why from how.

**Date:** Sprint 1

---

## D-003: Homepage is a cinematic experience, not a brochure

**Decision:** Homepage is cinematic. Minimal DOM copy. Nine-scene (now eight-scene) scroll narrative.

**Reason:** Brochure homepages are forgettable. A cinematic narrative is emotionally effective.

**Alternative Considered:** Full-content homepage with features, testimonials, case studies.

**Rejected Because:** Destroys the narrative arc. Information without emotion is noise.

**Date:** Sprint 1

---

## D-004: MotionDirector is single GSAP owner

**Decision:** One central MotionDirector owns all GSAP tweens. No component creates its own GSAP timeline.

**Reason:** One owner guarantees deterministic animation state. Multiple timelines create race conditions.

**Alternative Considered:** Per-component GSAP instances.

**Rejected Because:** Coordination hell. Timeline conflicts. Drift.

**Date:** Sprint 1

---

## D-005: Particles are data, not decoration

**Decision:** Particles represent data flow, not visual flair. Every particle behavior maps to an enterprise concept (birth, connect, disconnect, reconnect).

**Reason:** Decorative particles are visual noise. Semantic particles tell the story of data.

**Alternative Considered:** Decorative-only particle effects.

**Rejected Because:** Users can tell the difference between purpose and decoration.

**Date:** Sprint 1

---

## D-006: Text generates from particles, never fades/slides/bounces

**Decision:** Typography emerges from the particle field. No fade, slide, or bounce transitions on text.

**Reason:** Text must feel connected to the data world, not overlaid on it. Standard transitions belong to every website — SVARA must feel different.

**Alternative Considered:** Standard CSS fade/slide transitions.

**Rejected Because:** Every website does this. SVARA needs to feel like intelligence, not marketing.

**Date:** Sprint 1

---

## D-007: Navigation hidden during Act 1

**Decision:** Homepage navigation stays hidden until the framework reveal (Scene 03 — 50% scroll).

**Reason:** Navigation distracts during the setup acts. The story earns the nav.

**Alternative Considered:** Navigation visible from page load.

**Rejected Because:** Undercuts the SVARA reveal. Trust must be earned before navigation is offered.

**Date:** Sprint 1

---

## D-008: Content sprint after Foundation

**Decision:** Content creation happens after the technical foundation is built.

**Reason:** Content without a container creates unbounded scope.

**Alternative Considered:** Content-first development.

**Rejected Because:** Leads to redesign when content and container don't align.

**Date:** Sprint 1

---

## D-009: Vendored GSAP + Lenis

**Decision:** GSAP Club plugins and Lenis are vendored in `lib/gsap` and `lib/lenis`.

**Reason:** Eliminates CI/CD dependency on npm registries, authentication tokens, and network availability.

**Alternative Considered:** npm tokens, CDN delivery.

**Rejected Because:** Build breaks on network issues. SSR compatibility concerns.

**Date:** Sprint 1

---

## D-010: SES is single source of truth

**Decision:** SVARA Experience Bible is the single source of truth. Code follows docs, not the reverse.

**Reason:** Prevents drift between specification and implementation. Allows review before build.

**Alternative Considered:** Code as truth.

**Rejected Because:** Without spec review, scope creeps and decisions go unrecorded.

**Date:** Sprint 1

---

## D-011: No pricing on website

**Decision:** No pricing page or pricing information on the website.

**Reason:** Enterprise pricing is conversation-driven. Transparent pricing for enterprise infrastructure misrepresents value and encourages wrong-fit inquiries.

**Alternative Considered:** Transparent pricing.

**Rejected Because:** Enterprise buyers expect context-based pricing. Fixed pricing signals a product, not infrastructure.

**Date:** Sprint 1

---

## D-012: Single continuous scroll homepage

**Decision:** One continuous scroll narrative. No page breaks, no section dividers.

**Reason:** One scroll narrative maintains emotional continuity. Multi-page breaks the arc.

**Alternative Considered:** Multi-page, auto-advancing video.

**Rejected Because:** Breaks the emotional arc. User loses control.

**Date:** Sprint 1

---

## D-013: Sprint 2 is Content, not Homepage

**Decision:** Content sprint comes after foundation, not before.

**Reason:** Animating placeholder text is wasted work. Content written for a container that doesn't exist yet will be rewritten.

**Alternative Considered:** Homepage with lorem ipsum.

**Rejected Because:** Delivers nothing. Wasted animation work.

**Date:** Sprint 2

---

## D-014: Clear role split

**Decision:** SVARA owns strategy, creative direction, brand, story, UX, content, experience, acceptance criteria. OpenCode owns architecture, implementation, testing, refactoring.

**Reason:** No tool works well under role ambiguity.

**Alternative Considered:** Shared ownership of all decisions.

**Rejected Because:** Leads to deadlock. Every decision requires two approvals.

**Date:** Sprint 2

---

## D-015: Category-first homepage, not product-first

**Decision:** Homepage arc is Category → Problem → Framework → Platform → Capabilities → Proof → Future → Invitation. Products are evidence of the category, not the story.

**Reason:** Category leaders (NVIDIA: Accelerated Computing, Apple: Personal Computing Experience, Tesla: Sustainable Energy) own a category, not a feature set. SVARA must own "Enterprise Intelligence Infrastructure."

**Alternative Considered:** Product-first homepage (Hero → Products → Industries → CTA).

**Rejected Because:** Positions SVARA as a tool vendor, not a category creator.

**Date:** Sprint 0 (retroactive)

---

## D-016: 8-scene arc replaces 9-scene arc

**Decision:** Reduced from 9 scenes to 8. Removed "Data Emerges" and "Enterprise Scale" as standalone scenes. Absorbed their purpose into other scenes.

**Reason:** The category-first arc is tighter. Every scene answers a unique question. No scene exists without a question. The old arc had redundant scenes.

**Alternative Considered:** Keep 9 scenes.

**Rejected Because:** Two scenes asked questions too similar to others. Conflated category introduction with product showcase.

**Date:** Sprint 0 (post-Storyboard)

---

## D-017: SVARA OS replaces documentation

**Decision:** All SVARA documentation is codified as SVARA OS — an operating system for the company, not for software. Three pillars: Brand OS, Knowledge OS, Experience OS. Every future asset traces through this tree.

**Reason:** Documentation is passive. An operating system is active. Every asset — website, pitch deck, sales deck, product docs, knowledge base, case studies, blogs, social media, investor deck, recruitment, videos, demo — must trace lineage through SVARA OS.

**Alternative Considered:** Keep traditional docs.

**Rejected Because:** Documents collect dust. An operating system enforces discipline.

**Date:** Sprint 0

---

## D-018: Company framework — 5 levels

**Decision:** SVARA organizes around 5 levels: Category (Enterprise Intelligence Infrastructure) → Platform (SVARA Platform) → Capabilities (Sense, Think, Predict, Act, Learn) → Products (9 products) → Industries (12 industries).

**Reason:** Eleven equal products are memorization. A hierarchy teaches relationships. Users see the structure, not the list.

**Alternative Considered:** Flat product list. Capabilities as sub-brands.

**Rejected Because:** Flat lists don't teach. Sub-brands create fragmentation. The hierarchy is the mental model.

**Date:** Sprint 0

---

## D-019: North Star Statement

**Decision:** Every engineer, designer, and marketer must memorize: "SVARA engineers the intelligence layer that connects fragmented enterprise systems into one continuously learning operational ecosystem."

**Reason:** Without a North Star, different team members optimize for different outcomes. One sentence aligns everyone.

**Alternative Considered:** Mission statement, vision statement, tagline.

**Rejected Because:** Three statements dilute. One sentence forces clarity.

**Date:** Sprint 0

---

## D-020: Design answers four questions or it's deleted

**Decision:** Nothing exists because it looks good. Everything must answer: Why is this here? → What does it teach? → What does it reinforce? → What business goal does it support?

**Reason:** Design without purpose is decoration. Decoration undermines credibility. Enterprise buyers trust purpose, not polish.

**Alternative Considered:** Design by taste. Design by trends. Design by client preference.

**Rejected Because:** All three are subjective. The four questions are objective.

**Date:** Sprint 0

---

## D-021: Decision Ledger replaces Decision Log

**Decision:** Reformatted the decision log into a decision ledger with explicit sections: Decision, Reason, Alternative Considered, Rejected Because, Date.

**Reason:** The old format was too brief. "Why" was implied, not stated. Six months later, "why" must be explicit, not inferred.

**Alternative Considered:** Keep the old paragraph format.

**Rejected Because:** Short paragraphs skip alternatives. Without alternatives, the decision looks obvious in retrospect. It never was.

**Date:** Sprint 0

---

**End of Decision Ledger. Every major decision recorded. Six months from now, nobody asks "why?"**
