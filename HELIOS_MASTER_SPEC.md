# HELIOS_MASTER_SPEC.md

> **The only document OpenCode reads to ship Monday.**
> Everything else in `docs/` and `_v2/` is reference material.

---

## PART 1 · PROJECT

| Key | Value |
|---|---|
| Project | Helios |
| Product | SVARA Website |
| Version | Launch Candidate v1 |
| Deadline | Monday |
| Mission | Build the world's clearest Enterprise Intelligence website |
| Success | Enterprise visitors understand SVARA within 60 seconds |

---

## PART 2 · WEBSITE GOALS

The homepage must answer these 8 questions, in this order. Nothing else.

| # | Visitor's question | Scene | One statement |
|---|---|---|---|
| 1 | What problem exists? | Scene 2 — Problem | "Enterprise systems are disconnected." |
| 2 | Why is it getting worse? | Scene 2 — Problem (sub-beat) | Data volume is exploding; the gap between data and decisions is widening every year. |
| 3 | What is Enterprise Intelligence Infrastructure? | Scene 3 — Solution | One loop. Observe → Understand → Predict → Coordinate → Improve → back to Observe. |
| 4 | Why is SVARA different? | Scene 4 — Capabilities | Five capabilities, one closed loop. Not a stack of tools — a cycle that feeds itself. |
| 5 | What products exist? | Scene 5 — Products | Nine products across the five capabilities. Each independently deployable, jointly compounding. |
| 6 | Where can it be used? | Scene 6 — Industries | Twelve industries where data outpaces people. |
| 7 | Why should I trust them? | Scene 7 — Trust | DPIIT-recognized. Women-led. Research-backed. Industry-standard technology. |
| 8 | Where do I go next? | Scene 8 — Explore | Platform / Products / Contact. |

Scene 1 (Hero) is the headline — the first statement that frames the entire
journey. It is NOT a question; it is the opening line of the story:

> "Enterprise systems produce more data than people can act on."

The visitor scrolls. Each scene answers one question. By Scene 8, they know
SVARA — not because we told them everything, but because we answered the
8 questions they were already thinking.

---

## PART 3 · FINAL SITEMAP

### 3.1 Launch sitemap (Monday)

These pages ship. The header navigation shows only these.

```
HOME          /
PLATFORM      /platform
PRODUCTS       /products  (+ /products/[slug] detail pages)
TECHNOLOGY    /technology  (+ /technologies/[slug] detail pages)
INDUSTRIES    /industries  (+ /industries/[slug] detail pages)
COMPANY        /company
CONTACT       /contact
```

**Supporting launch routes (live, but NOT in the main nav):**

```
/legal/privacy         /legal/terms
/dpiit                 /leadership
/capabilities/[slug]   (5 capabilities: observe, understand, predict, coordinate, improve — old slugs redirect)
```

### 3.2 Post-launch sitemap (after Monday)

```
KNOWLEDGE      /knowledge  (+ /knowledge/faq, /knowledge/glossary)
INVESTORS       /investors
BLOG            /blog  (+ /blog/[slug])
CAREERS         /careers
MEDIA           /media  (press kit, media inquiries, brand assets)
```

These routes already exist in `app/pages/` (knowledge hub pages, investors
page) but are removed from the header navigation for the launch. They come
back into the nav in the post-launch phase, along with the new blog, careers,
and media pages. No code change is needed at launch — they remain routable
directly via URL even though they're not linked from the header.

**Current header navigation (must match §3.1):**

`Platform · Products · Technology · Industries · Company`

The current `AppHeader.vue` has `Knowledge` as the 6th item. Remove it for
the launch. Knowledge is post-launch (§3.2).

---

## PART 4 · DESIGN LANGUAGE

### 4.1 Background

White. Always white. The page is a museum gallery, not a nightclub.

```
--color-bg: #ffffff
```

### 4.2 Typography

Very large. Minimal. The headline IS the design.

| Token | Size | Weight | Use |
|---|---|---|---|
| text-hero | `clamp(3rem, 9vw, 7.5rem)` | 700 | Hero only (one per page) |
| text-h2 | `clamp(2.5rem, 6vw, 4.5rem)` | 700 | Scene titles |
| text-h3 | `2rem` | 700 | Card titles |
| text-body | `1.25rem` | 400 | Paragraphs |
| text-caption | `1rem` | 500 | Captions, badges |

Exactly 5 sizes. Nothing between them. `clamp()` only pulls the two largest
down for mobile; the desktop plateau is always the exact spec'd value.

Font: **Geist Sans** (self-hosted via `@fontsource/geist-sans`, weights
400/500/700 only). No display font. No serif. No monospace for body.

### 4.3 Colors

Four permitted colors. Nothing else. No third palette additions, no accents
beyond blue, no "just one more warm tone."

| Token | Value | Use |
|---|---|---|
| SVARA Navy | `#07111f` | Primary text, primary buttons |
| SVARA Blue | `#5d8fbe` | Links, capability badges, active states |
| White | `#ffffff` | Background, button text on navy |
| Light Gray | `rgba(7,17,31,0.12)` | Dividers, card borders |

Supporting neutrals (derived, not new colors):

| Token | Value | Use |
|---|---|---|
| `--color-muted` | `rgba(7,17,31,0.58)` | Captions, secondary text |
| `--color-muted-strong` | `rgba(7,17,31,0.72)` | Body copy that needs contrast |
| `--color-card` | `#ffffff` | Card background (same as bg, for layering) |
| `--color-accent-bg` | `rgba(93,143,190,0.08)` | Subtle scene backgrounds (Solution, Trust) |

**Forbidden:** gradients on buttons/text/headers, glow effects, drop shadows
as decoration (shadows are for elevation only — `--shadow-sm`, `--shadow-lg`,
both blue-tinted, never black-heavy).

### 4.4 Icons

Line icons only (`@lucide/vue`). No filled icons, no colored icons, no emoji.
Icon size scales with context (14px inline links, 24px trust cards, 32px max).
Icons are functional — they mark an action or a type, never decorate.

### 4.5 Glass

Subtle. Cards use a thin border + soft blur + blue-tinted shadow. The glass
recedes; the content advances. Never a frosted panel over a busy background
(there are no busy backgrounds — the background is white).

```css
.card-glass {
  border: 1px solid var(--color-card-border);
  background: var(--color-surface);      /* rgba(255,255,255,0.74) */
  backdrop-filter: blur(24px);
  box-shadow: var(--shadow-sm);          /* blue-tinted, never heavy */
}
```

### 4.6 Motion

Purposeful. Every animation answers "why is this moving?" If the answer is
"because it looks cool," it doesn't ship.

| When | What | How |
|---|---|---|
| Section enters viewport | Content rises/fades in | `v-reveal` directive, GSAP ScrollTrigger, `once: true` |
| Card hover | Lifts 3-6px, shadow deepens | CSS transition, `--duration-fast` (0.3s) |
| Link hover | Arrow translates right 4px | CSS transition |
| Button hover | Subtle opacity / translateY | CSS transition |
| Page load | No boot overlay, no splash | Content simply renders |

**Forbidden:** perpetual animations (nothing loops forever), parallax on
everything, scroll-jacking, cursor followers, loading spinners as design,
gradient shifts, glow pulses.

### 4.7 Spatial system

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Fine gaps |
| `--space-2` | 8px | Icon-text gap |
| `--space-3` | 12px | Card internal |
| `--space-4` | 16px | Default gap |
| `--space-5` | 24px | Card padding |
| `--space-6` | 32px | Section subsection |
| `--space-7` | 48px | Card padding (large) |
| `--space-8` | 64px | Footer |
| `--space-9` | 96px | Section break |
| `--space-10` | 128px | Section top |
| `--space-11` | 160px | Hero / closing |

Sections breathe. Every scene is minimum `100svh`. Internal padding is
generous: `6rem 1.5rem` minimum on desktop, `4rem 1.25rem` on mobile.

### 4.8 Radii

| Token | Value | Use |
|---|---|---|
| `--radius-card` | 8px | Cards, glass panels |
| `--radius-input` | 8px | Form inputs |
| `--radius-pill` | 999px | Buttons (CTA only) |

Small, consistent, never rounded-2xl. The architecture is angular; the
radius softens just enough to feel modern, not soft.

---

## PART 5 · EXPERIENCE FLOW

The visitor scrolls through nine beats. Each beat is one cognitive shift.
Nothing between them — no filler, no transitions-as-scenes, no decoration
parading as content. The flow IS the argument.

### 5.1 The nine beats

```
Arrival
   ↓
Reality
   ↓
Problem
   ↓
Category
   ↓
Platform
   ↓
Products
   ↓
Industries
   ↓
Trust
   ↓
Explore
```

### 5.2 Beat-by-beat

| # | Beat | Visitor's state | What we show | Question answered (§2) |
|---|---|---|---|---|
| 1 | **Arrival** | "Where am I?" | White space. One line: "SVARA — Engineering the Intelligence Layer of Tomorrow." No CTA yet. The visitor lands gently. | (frames the journey) |
| 2 | **Reality** | "Is this relevant to me?" | The opening statement: "Enterprise systems produce more data than people can act on." One CTA: "See how it works" → `/platform`. | (the headline) |
| 3 | **Problem** | "Yes — this is my world." | SVG: 7 disconnected silos. "Enterprise systems are disconnected." Data volume is exploding; the gap widens every year. | Q1 + Q2 |
| 4 | **Category** | "So what's the answer?" | SVG: the closed loop. "Enterprise Intelligence Infrastructure." One loop, five capabilities, continuously compounding. | Q3 |
| 5 | **Platform** | "Why SVARA and not someone else?" | 5 capability cards: Observe / Understand / Predict / Coordinate / Improve. Each links to its detail page. This IS the differentiator — the closed loop is the platform. | Q4 |
| 6 | **Products** | "What can I actually buy?" | 9 product tiles from `utils/products.ts`. Each links to `/products/[slug]`. Capability badge on each tile shows where it sits in the loop. | Q5 |
| 7 | **Industries** | "Does this work for MY industry?" | 12 industry cards from `utils/industries.ts`. Each links to `/industries/[slug]`. The visitor scans for their vertical; this is the matching moment. | Q6 |
| 8 | **Trust** | "Can I trust them with my operations?" | 4 pillars: DPIIT-Recognized / Women-Led / Research-Backed / Industry-Standard Technology. DPIIT links to `/dpiit`. Trust is written, not animated. | Q7 |
| 9 | **Explore** | "OK — what now?" | 3 CTAs: Platform / Products / Contact. Plus the closing line: "Engineering / The Intelligence Layer / Of Tomorrow." | Q8 |

### 5.3 Cognitive contract

Each beat changes one thing — what the visitor *understands*. Not what they
*see*. If a beat doesn't shift understanding, it doesn't belong in the flow.

| Beat | Before | After |
|---|---|---|
| Arrival | Unknown | "I'm on a focused, serious site." |
| Reality | Curious | "This is about my problem." |
| Problem | Interested | "Yes, this is exactly my pain." |
| Category | Concerned | "Oh — there's a name for the answer." |
| Platform | Hopeful | "SVARA's loop is the differentiator." |
| Products | Concrete | "I can buy nine specific things." |
| Industries | Personal | "This works in my world." |
| Trust | Deciding | "I can hand them my operations." |
| Explore | Acting | "I know where to go next." |

### 5.4 What flows between beats

- **Silence.** No animated transitions between scenes. The visitor scrolls;
  the next beat simply appears (revealed by `v-reveal` on enter).
- **Whitespace.** Each scene is minimum `100svh`. The gap IS the breath.
- **One scroll depth per beat.** No scene scrolls internally to reveal more
  of itself — a beat is one screen, one claim, one proof. The visitor scrolls
  ONCE per beat and arrives at the next.
- **The nav appears late.** On the homepage, the header is hidden until the
  visitor passes `0.48 * viewportHeight` — after Reality, into Problem. The
  nav is a tool for people who've already decided to explore, not a distraction
  for first arrivals.

### 5.5 Forbidden in the flow

- No mid-scene interactions that gate the next beat (the visitor must never
  have to click to continue).
- No looping animations that keep a scene "alive" while the visitor is on it
  (a beat is a statement, not a performance).
- No multi-screen scenes (one beat = one screen).
- No "scroll for more" indicators inside a beat. The scroll IS the flow.

---

## PART 6 · COMPONENT INVENTORY

The entire launch site is built from these 10 components. No others.

### 6.1 Launch components (homepage)

| # | Component | Purpose | Beats served (§5) |
|---|---|---|---|
| 1 | **Navigation** | Header with 5 launch links. Hidden on hero, appears after `0.48vh`. Mobile: toggle panel. | All |
| 2 | **Hero** | The opening statement + one CTA. One line, one button, white space below. | Arrival + Reality |
| 3 | **Problem Visualization** | SVG of 7 disconnected enterprise systems with broken link lines. No interaction. | Problem |
| 4 | **Category Section** | SVG of the closed Intelligence Loop (5 nodes around SVARA hub). The answer has a name. | Category |
| 5 | **Platform Diagram** | 5 capability cards (Observe / Understand / Predict / Coordinate / Improve). Each links to `/capabilities/[slug]`. | Platform |
| 6 | **Capability Cards** | (folded into Platform Diagram above — the cards ARE the diagram) | Platform |
| 7 | **Product Explorer** | 9 product tiles from `utils/products.ts`. Capability badge per tile. Each links to `/products/[slug]`. | Products |
| 8 | **Industry Explorer** | 12 industry cards from `utils/industries.ts`. Each links to `/industries/[slug]`. | Industries |
| 9 | **Trust Strip** | 4 pillars: DPIIT / Women-Led / Research / Technology. Text-first. DPIIT links to `/dpiit`. | Trust |
| 10 | **Footer** | Brand line + Trust nav (Company / DPIIT / Leadership / Contact) + legal links. | Explore + All |

### 6.2 Shared components (non-homepage pages)

| Component | Purpose | Used by |
|---|---|---|
| `KnowledgeProductLayout.vue` | Renders the 10-section Knowledge Product template | Platform, Products, Industries, Technology, Company, DPIIT, Leadership, Capabilities, Knowledge, Legal |
| `ContactForm.vue` | Accessible form (labels, honeypot, states) | Contact |
| `AppHeader.vue` | Navigation (same component, persists across pages) | All pages (via default layout) |
| `AppFooter.vue` | Footer (same component, persists across pages) | All pages (via default layout) |

### 6.3 NOT in the launch inventory

Anything not listed above does not exist for the launch:

- No WebGL world (`_v2/`)
- No particle engine (`_v2/`)
- No boot loader (`_v2/`)
- No scene director (`_v2/`)
- No lab routes (`_v2/`)
- No cursor controller (`_v2/`)
- No atmosphere layer (`_v2/`)

If a future need surfaces, a new component is either added to §6.1 (with a
matching beat in §5 and a question in §2) or it doesn't ship. No orphan
components.

---

## PART 7 · HERO SPECIFICATION

This is where we stop making mistakes. The hero is not a feature list, a
slideshow, a tagline rotation, or a button. It is one architectural
statement — and one subtle interaction that proves SVARA builds what it
claims.

### 7.1 Fixed elements

| Element | Value |
|---|---|
| Height | `100vh` (or `100svh` — use svh where supported; vh fallback) |
| Background | White (`--color-bg: #ffffff`) — no gradient, no image, no video |
| Padding | Generous; content sits visually centered, slightly above middle |
| Header | Hidden on hero (per §5.4 — appears after `0.48vh`) |
| Footer | None on hero |

### 7.2 Content (the only copy on screen)

**Main statement** (typography: `text-hero`, navy, three lines):

```
Engineering
The Intelligence Layer
Of Tomorrow
```

**Subheading** (typography: `text-body` / `clamp(1.125rem, 1.6vw, 1.5rem)`,
muted-strong, max-width `36rem`):

```
Connecting enterprise systems, AI, operations, and decisions
into one intelligence platform.
```

No tagline. No rotating headline. No second paragraph. No customer logos.
No testimonials. No "Trusted by." No "Award-winning." **This is the museum
entrance — one statement, one breath.**

### 7.3 Below the content — interactive visualization

A live, in-page interactive visualization. NOT an image. NOT a video.
NOT a feature card. NOT a CTA button. **No CTA button anywhere on the hero.**

The visualization must:

- Live below the headline + subheading, occupying the lower portion of the
  viewport (roughly the bottom third on desktop).
- Be built in **SVG + CSS + a single subtle GSAP interaction** — no WebGL,
  no `<canvas>`, no third-party charting library, no autoplay.
- Be **interactive**: respond to ONE subtle input (cursor movement or
  scroll-progress-into-hero). Multi-axis animations, looping demos, and
  anything that reads as "autoplay ad" are forbidden (§4.6).
- Use ONLY the design language colors (§4.3): navy nodes, blue edges, light
  gray dividers. No glow, no gradient fills, no particles, no shadows-as-fx.
- **Move with intent**: the motion IS the proof that "we build intelligence
  infrastructure." A static image says nothing; this says "watch the loop
  respond to you."

**Recommended visualization:** a ring of 5 capability nodes (Observe /
Understand / Predict / Coordinate / Improve) connected by a continuous blue
edge, centered on a navy SVARA hub. On cursor move, the entire ring tilts
gently (parallax via a single GSAP quickSetter on `rotateX/rotateY` of the
SVG `<g>` — transform-style: preserve-3d, perspective on parent). Reduced
motion: ring is static, no tilt. Lines stay solid; nodes stay still. The
visitor's gesture traces the loop — that IS the interaction.

The visualization must not cover the subheading or main statement. It is
below them, in service of them, never competing with them.

### 7.4 Scroll cue ("Explore")

Below the visualization, fixed at the bottom of the hero (copied as a
subtle scroll affordance):

- Text: `Explore` — `text-caption` weight 500, muted color.
- Below or beside it: a `↓` arrow, `aria-hidden="true"`, navy.
- Motion: the arrow drifts gently `translateY(0 → 6px → 0)` on a 2.4s loop.
  This is the ONE sanctioned perpetual motion on the homepage — it lasts
  only while the hero is in viewport (paused via `IntersectionObserver` once
  scrolled past). Reduced motion: arrow is static.
- Clicking `Explore` is optional — it can scroll-to-next-section via
  `lenisRef.scrollTo(element)`. The cue is presence-first, action-second.
  It is **not** a button. It is text + arrow.

### 7.5 Forbidden on the hero

- Any CTA button (`See how it works`, `Get started`, `Request demo`,
  `Book a call`, etc.). The hero's interaction IS the visualization.
- Animated text (scramble, typewriter, word-rotation).
- Hero copy above the main statement ("Hey, you found us," intro micro-copy,
  "Welcome to...").
- Customer logo strip / "as seen in" / partner badges.
- Pricing teaser, signup form, newsletter capture.
- Background video, hero image, cover photo, mesh gradient.
- Anything that requires JS to render the headline (the headline is static
  HTML, fully SSR'd, fully crawlable — the visualization is progressive
  enhancement on top, not the message).

### 7.6 File contract

| Concern | Home |
|---|---|
| File | `app/components/home/HomeScene01Hero.vue` |
| Lines | < 300 (split into `HeroVisualization.vue` if the SVG + interaction pushes over) |
| Imports gsap? | NO. The visualization uses `app/plugins/reveal.ts` for any scroll-anchored motion; the cursor parallax is owned by a small `useHeroParallax` composable that lives in `app/composables/` and is the ONLY gsap-importing composable on the hero. |
| SSR-safe? | Yes — headline + subheading + the Explore cue render fully on the server. The SVG renders on the server. The parallax attaches on mount, client-only. |
| Reduced motion? | Static ring, no tilt, no arrow loop, no scroll-trigger. Content fully visible. |

---

## PART 8 · PROBLEM SECTION

The visitor just landed on the hero and saw the opening statement. Now they
scroll into the wound. This is where the buyer recognizes their own world.

### 8.1 Headline (the precise claim)

Two lines. `text-h2`, navy. The second line is the twist.

```
Enterprise software isn't broken.
Enterprise intelligence is.
```

Not "systems are disconnected." Not "data is fragmented." Those are true but
generic. The precise claim: the *software* works fine (ERP does its job, CRM
does its job). The *intelligence* — the connective tissue that should turn
all of it into action — is what's broken. That is SVARA's category to invent.

### 8.2 Subheading (one line, under the headline)

```
Six systems. Siloed by design. Connected by none of them.
```

`text-body`, muted-strong. No second paragraph. The headline IS the argument;
the subheading names the count.

### 8.3 Visualization — disconnected systems

Six enterprise system nodes, drawn in SVG, arranged in a loose ring on a
white background. Everything is static, calm, almost architectural — the
visual register of a diagram, not an infographic.

**The six systems (the only six — do not add MES, SCADA, or others):**

| # | Node | Label | What it represents |
|---|---|---|---|
| 1 | ERP | `ERP` | Finance, HR, inventory, supplier records |
| 2 | CRM | `CRM` | Customer relationships, sales pipeline |
| 3 | IoT | `Sensors` | Operational telemetry from physical assets |
| 4 | Vision | `Cameras` | Visual data — CCTV, inspection, site monitoring |
| 5 | Documents | `Documents` | Contracts, reports, manuals — the unstructured 80% |
| 6 | Cloud | `Cloud` | The "we migrated to the cloud" bet that didn't fix any of this |

### 8.4 Pre-animation state — disconnection

On load and on initial scroll-into-view: every pair of nodes has a thin,
faded, **dashed** line between them. The lines look broken — they are visual
*evidence* of disconnection, not assertions of it. The visitor sees the
skeleton of what *should* connect and reads the absence themselves.

- Lines: `--color-divider` (`rgba(7,17,31,0.12)`), 1.5px, `stroke-dasharray: 6 8`.
- Nodes: 44px radius circles, `--color-bg` fill, 1.5px `--color-divider` stroke.
  Inner label: 14px weight 600, `--color-muted-strong`.
- No motion at rest. No pulse. No idle drift. The diagram is silent.

### 8.5 The animation — connections appear

Triggered by ScrollTrigger when the section's top reaches `60%` of viewport
(`start: "top 60%"`, `once: true`). The animation has three beats, sequenced
by GSAP on a single short timeline (total ~1.6s) — never a perpetual loop:

| Beat | Time | What happens | Why |
|---|---|---|---|
| 1 | 0 → 0.4s | All dashed lines snap to **solid** in `--color-svara-blue`, opacity 0 → 1, staggered 60ms per line. | The latent structure is named — the visitor sees what *could* connect. |
| 2 | 0.4 → 0.8s | Each node's stroke transitions from divider gray to `--color-primary` (navy). 24px node labels step from `muted-strong` to `primary`. Staggered 60ms per node. | The systems come alive — they're not passive data, they're players. |
| 3 | 0.8 → 1.6s | A single blue ring (no fill, 1px stroke, `--color-svara-blue`) fades in at opacity 0 → 0.4 traversing the perimeter — the visual intuition of a loop without yet naming it. | The visitor senses the shape of the answer before Scene 3 (Category) names it. |

Reduced motion: all three beats collapse into a single instant set —
solid lines, navy nodes, faint ring — at full state, no transitions.

No text appears. No statistics appear yet. No "85% of enterprise data goes
untouched." Numbers arrive in Scene 3 (Category) where they support the
answer, not here where they'd compete with the wound.

### 8.6 Forbidden in the Problem section

- Any statistic, percentage, ROI figure, or "research shows" line. Numbers
  are deferred to later scenes; here they dilute the recognition moment.
- A "so what" paragraph below the visualization. The visitor supplies their
  own "so what" — they live with these six silos every day.
- Animated icons (spinning ERP gear, pulsing CRM heart). Nodes are still.
- A CTA, "Learn how SVARA fixes this," or any button. The beat is
  diagnostic, not commercial. The remedy is Scene 3.
- A comparison table ("SVARA vs traditional platforms"). Comparisons live
  on dedicated content pages (§3.1 routes), not on the homepage flow.
- More than six systems. The list is closed. Adding MES, SCADA, or a seventh
  node re-opens a debate the scene is meant to close.

### 8.7 File contract

| Concern | Home |
|---|---|
| File | `app/components/home/HomeScene02Problem.vue` |
| Lines | < 300 (split into `ProblemVisualization.vue` if the SVG + sequence pushes over) |
| Imports gsap? | NO. The connect-animation runs through `app/plugins/reveal.ts` extended with a `v-reveal-sequence` directive OR a small `useProblemReveal` composable. Components declare intent; the plugin owns GSAP. |
| SSR-safe? | Yes — the SVG with dashed lines + nodes renders fully on the server. The connect-animation attaches on mount, client-only. The static pre-state is fully crawlable. |
| Reduced motion? | Static post-state (solid lines, navy nodes, faint ring) renders instantly. No transitions. |

---

## PART 9 · CATEGORY

The visitor has just felt the wound — six systems, disconnected, the
intelligence broken. Now we name the answer. One line. One paragraph. One
diagram. Nothing else competes.

### 9.1 Headline

```
Enterprise Intelligence Infrastructure
```

`text-h2`, navy, single line (or wrap naturally on mobile). No subheading
above it. No eyebrow number ("03 · The solution") — the absence of a number
here is deliberate: this is the category-defining claim, not a beat in a list.
The previous scenes were numbered; this one is named.

### 9.2 Explanation — one paragraph

`text-body` (`1.25rem`, line-height 1.6), muted-strong, max-width `42rem`.
One paragraph. No list, no second paragraph, no "in other words."

```
Enterprise Intelligence Infrastructure is the connected system of observing,
understanding, predicting, coordinating, and improving that turns fragmented
enterprise data into continuously improving operational intelligence — one
loop across every system, every team, every decision.
```

The paragraph names the five capabilities in order, names the loop, names the
outcome. It is the entire category thesis in one sentence. After this, the
diagram carries the rest.

### 9.3 Architecture diagram — the loop, named

A refined version of the SVG from the hero visualization (§7.3), now
**labeled and stationary** — no cursor parallax here (that was the hero's
one interaction; this is the category definition). The diagram is the proof
that the paragraph is real, not a tagline.

**Structure:**

- A closed ring of 5 nodes arranged in a circle around a central SVARA hub.
- Each node is labeled with its capability name: `Observe`, `Understand`,
  `Predict`, `Coordinate`, `Improve`.
- Each edge of the ring is a solid blue line (`--color-svara-blue`, 2px) with
  an arrowhead indicating direction — the loop is * directional*, not a
  static ring. SVARA's intelligence flows one way and comes back.
- The central hub reads `SVARA` in navy on a navy-filled circle, white text
  — the orchestrator that holds the loop closed.
- Under each node label, a one-word role tag in `--color-muted` (12px, weight
  500): `capture`, `interpret`, `forecast`, `orchestrate`, `compound`.

**Visual register:**

- Background: `--color-accent-bg` (the faint blue tint, matching the Trust
  scene's register — scenes that hold the "answer" share a register).
- Node fill: `--color-bg` (white), stroke `--color-primary` (navy), 1.5px.
- Inner label: 13px, weight 600, navy.
- Role tag: 12px, weight 500, muted.
- Edges: 2px solid `--color-svara-blue`, arrowheads 8px solid blue.
- Hub: 40px radius, navy fill, white text 13px weight 700, letter-spacing
  0.05em.

**Caption beneath the diagram** (`text-caption`, muted, italic, centered):

```
Observe → Understand → Predict → Coordinate → Improve → back to Observe.
```

The caption restates the loop in plain text. The visitor who skimmed the
diagram reads the caption and gets the same claim twice — once visual, once
literal. Redundancy is the point.

### 9.4 Reveal motion — single, slow, no interaction

One `v-reveal` on the section. The diagram fades in as a unit (`reveal-fade`
variant). No staggered nodes. No sequential edge draws. No cursor parallax.
No loop animation. The category arrives whole, not in pieces — it is a
definition, not a performance.

Reduced motion: instant render, no fade.

### 9.5 Forbidden in the Category section

- Statistics / ROI figures ("85% of data goes untouched," "300% ROI in 18
  months"). Numbers arrive in the Platform beat (§5) where they support the
  differentiator, not here where they'd dilute the category claim.
- A "Why SVARA" or "How it works" pitch. The category is named; the *case*
  for SVARA's version of it is Scene 5 (Platform — the capabilities cards).
- Customer logos, quotes, case studies. Trust artifacts live in Scene 8
  (Trust Strip).
- Any CTA or button. The visitor scrolls to Scene 5 next — by their own
  choice, not because we pushed them.
- A second paragraph, a "Key features" list, or a glossary sidebar. One
  paragraph. One diagram. Done.
- Calling it "the platform" or "our solution" — it is a *category*, named
  for the first time. The word "Platform" belongs to Scene 5.

### 9.6 File contract

| Concern | Category |
|---|---|
| File | `app/components/home/HomeScene03Solution.vue` (kept the existing name — the route key is the beat, not the section title) |
| Lines | < 300 |
| Imports gsap? | NO. `v-reveal` directive handles the fade. No composition is imported gsap. |
| SSR-safe? | Yes — the SVG diagram, headline, paragraph, and caption all render fully on the server. The fade attaches on mount only. |
| Reduced motion? | Instant render of the full diagram. No fade. |

---

## PART 10 · PLATFORM

This beat owns Question 4 (§2): "Why is SVARA different?" The Category beat
named the answer; this beat makes the case for SVARA's version of it — five
capabilities, one ecosystem, and the products that prove each one is real.

### 10.1 Headline

```
One ecosystem.
Five capabilities.
```

`text-h2`, navy, two lines. No eyebrow number (matching §9.1 — the answer
beats share a register, the numbered diagnostic beats ended at Problem).

### 10.2 Subheading — one line

```
Not a stack of tools. A cycle that feeds itself.
```

`text-body`, muted-strong, max-width `36rem`.

### 10.3 The five capability cards

Five cards in a horizontal row (5-up on desktop, 2×2+1 on tablet, stacked on
mobile). Each card is one capability — one name, one line, one link. No
imagery, no icons on the cards (icons are line-only per §4.4, and a card with
both an icon and a capability tag competes with itself).

| # | Capability | One-line role | Source data | Link |
|---|---|---|---|---|
| 1 | Observe | Capture operational reality from any signal source. | `utils/products.ts` capability "Observe" | `/capabilities/observe` |
| 2 | Understand | Interpret what the signals mean in context. | `utils/products.ts` capability "Understand" | `/capabilities/understand` |
| 3 | Predict | Forecast the next state early enough to act. | `utils/products.ts` capability "Predict" | `/capabilities/predict` |
| 4 | Coordinate | Orchestrate action across systems and people. | `utils/products.ts` capability "Coordinate" | `/capabilities/coordinate` |
| 5 | Improve | Feed every outcome back into the loop. | `utils/products.ts` capability "Improve" | `/capabilities/improve` |

**Card structure:**

```
01                   ← index, muted, 12px weight 600, letter-spacing 0.08em
Observe              ← name, navy, 1.5rem weight 700
Capture operational  ← role, muted-strong, 14px line-height 1.55
reality from any
signal source.
Explore Observe →    ← link, accent blue, 14px weight 600
```

The index `01..05` is the only ordinal signal — no icons, no progress bar,
no "Step 1 of 5." The numbers ARE the order; the cards do not animate a
sequence (the only motion is `v-reveal` stagger).

### 10.4 Products appear underneath

Below the 5 capability cards, the 9 products from `utils/products.ts` are
shown **grouped by capability**. This is the structural proof that the
capabilities are not abstract — each one is already built and shipped.

**Layout:**

A 5-row grid (one row per capability). Each row:

```
[capability label]   [product tiles...]
Observe              [Vision AI]  [Drone AI]
Understand           [Edge AI]  [AI Agents]
Predict              [Digital Twin]
Coordinate           [Business Cloud]  [AI OS]  [Command Center]
Improve              [Growth Intelligence]
```

- Row label: capability name, 14px weight 600, navy, uppercase letter-spacing
  0.06em, left-aligned, sticky to the row on horizontal scroll if needed
  (mobile rows stack instead).
- Product tiles: white card, 1px `--color-card-border`, 8px radius, padding
  `1.25rem`. Inside: product name (16px weight 700, navy) + one-line copy
  (14px, muted-strong, line-height 1.5) + arrow link to `/products/[slug]`.
- Each tile links to its `products/[slug]` detail page. No "Explore the
  product" button — the tile IS the link.

**Source of truth:** `utils/products.ts` is the single source. The render
groups `PRODUCTS` by `capability` and prints each group in capability order.
The homepage never duplicates the product list — it reads the same array the
`/products` index page reads. Adding a product in `utils/products.ts` adds it
  to the homepage, the products index, and the [slug] map automatically.

### 10.5 Reveal motion

- The 5 capability cards stagger in via `v-reveal="{ stagger: 0.06 }"` — 60ms
  between cards, `reveal-rise` variant.
- The product grid reveals as one block (`v-reveal="'fade'"`) AFTER the cards
  finish — the visitor reads the capabilities first, then sees them made
  concrete. A 0.2s delay on the grid block's ScrollTrigger `start` (`top 75%`
  vs `top 80%` for the cards) creates the natural pause.
- No sequential product-tile stagger. The grid arrives whole; the visitor
  scans it themselves.

Reduced motion: cards and grid render in place, no transitions.

### 10.6 Forbidden in the Platform section

- A "request a demo" or "talk to sales" CTA. CTAs live in Scene 8 (Explore).
- Pricing. Pricing is post-launch; nothing on the launch site quotes money.
- Comparison tables ("SVARA vs Palantir vs C3.ai"). Comparisons live on the
  per-capability or per-product detail pages, never on the homepage flow.
- Customer logos or testimonials. Trust artifacts live in Scene 8 (Trust Strip).
- "Enterprise-grade" / "AI-powered" / "next-generation" / "cutting-edge" copy.
  The capabilities are stated as functions, not as adjectives.
- Animating the loop again. The loop was drawn in Scene 9 (Category) — here
  it is materialized as capabilities + products, not redrawn.

### 10.7 File contract

| Concern | Platform |
|---|---|
| File | `app/components/home/HomeScene04Platform.vue` (collapses current `HomeScene04Capabilities.vue` + `HomeScene05Products.vue` into one beat per §5 — products "appear underneath," they are not a separate beat on the homepage) |
| Lines | < 300 (likely split into `PlatformCapabilities.vue` + `PlatformProducts.vue` subcomponents if the grid pushes over) |
| Imports gsap? | NO. `v-reveal` only. |
| Source data | `app/utils/products.ts` (single source of truth for both capabilities + products) |
| SSR-safe? | Yes — cards and product grid render fully on the server. |
| Reduced motion? | Cards and grid render in place. |

---

## PART 11 · PRODUCTS

The Platform beat showed the five capabilities with products grouped
underneath — the structural proof that capabilities are real. This beat is
where the visitor **touches** the products. Not reads about them. Touches
them.

### 11.1 What this is NOT

- No cards. The card grid was the Platform beat's job (§10.4). Here, products
  are not tiles in a grid — they are interactive entries the visitor opens.
- No static listing. The `/products` index page already does that. This is
  the homepage's interactive moment — one per page, per §4.6 (motion is
  purposeful, not decorative).
- No image gallery, no carousel, no lightbox. "Mini preview" means a
  self-contained inline expand, not a modal overlay.

### 11.2 Headline

```
Nine products. One loop.
```

`text-h2`, navy. The headline states the count and the relationship — each
product traces to one capability, together they cover the loop.

### 11.3 Layout — the interactive product explorer

A single vertical column of 9 product rows. Each row is one product. On
desktop the rows are full-width with generous internal padding; on mobile
they stack tighter. The visual register is a **list you can open**, not a
grid you scan.

**Collapsed state (default):**

```
─────────────────────────────────────────────
  Vision AI                          Observe  →  open
  Real-time visual intelligence across cameras and sensors.
─────────────────────────────────────────────
  Drone AI                           Observe  →  open
  Autonomous aerial inspection and mapping.
─────────────────────────────────────────────
  ...
```

Each collapsed row shows:
- **Product name** — 1.25rem, weight 700, navy.
- **Capability tag** — 11px, weight 600, uppercase, letter-spacing 0.08em,
  `--color-accent` (SVARA Blue). Right-aligned on desktop, inline above the
  name on mobile.
- **One-line copy** — 14px, muted-strong, line-height 1.5. From
  `utils/products.ts` `ProductInfo.copy`.
- **`→ open`** affordance — 14px, weight 600, accent blue. The arrow rotates
  90° (→ ↓) when the row is expanded. `aria-expanded="true/false"` on the
  button.

The entire row is one `<button>` (not a link — clicking expands, it doesn't
navigate). The row has `cursor: pointer` and a subtle hover lift
(`translateY(-1px)`, `box-shadow: var(--shadow-sm)`). The row background
shifts from `--color-bg` to `--color-card` on hover — the faintest signal
that this is touchable.

### 11.4 Expanded state — the mini preview

When a row opens (click or keyboard Enter/Space), it expands inline to
reveal a mini preview. No modal. No overlay. No navigation. The row grows
in place; rows below shift down (CSS `transition: max-height 300ms ease-out`).

**The mini preview contains:**

| Element | Content | Source |
|---|---|---|
| Capability badge | The product's capability (e.g. "Observe") with role tag | `utils/products.ts` |
| Longer description | 2-3 sentences (not the one-liner — the fuller copy from the product's `lib/content/<slug>.ts` `architecture.overview`) | `lib/content/<slug>.ts` |
| Three use cases | The first 3 `useCases` from the product content file | `lib/content/<slug>.ts` |
| Link | `Explore {Product Name} →` linking to `/products/[slug]` | `utils/products.ts` slug |

**Visual:**

```
─────────────────────────────────────────────
  Vision AI                          Observe  ↓  close
  Real-time visual intelligence across cameras and sensors.
  ┌─────────────────────────────────────────┐
  │ Observe — Capture operational reality   │
  │                                          │
  │ Vision AI deploys computer vision models│
  │ at the edge across camera fleets —       │
  │ inspection, safety, monitoring, security.│
  │                                          │
  • Automated Quality Inspection            │
  • Perimeter Security Monitoring           │
  • Real-Time Safety Compliance             │
  │                                          │
  Explore Vision AI →                       │
  └─────────────────────────────────────────┘
─────────────────────────────────────────────
  Drone AI                           Observe  →  open
  ...
```

The preview panel: `--color-card` background, 1px `--color-card-border`,
8px radius, padding `1.5rem`, max-height animates from 0 to auto (via
`max-height` transition or `grid-template-rows: 0fr → 1fr` technique for
smooth auto-height animation without measuring).

### 11.5 Interaction contract

| Action | Result |
|---|---|
| Click collapsed row | Row expands; `→` rotates to `↓`; `aria-expanded="true"` |
| Click expanded row | Row collapses; `↓` rotates back to `→`; `aria-expanded="false"` |
| Keyboard: Enter / Space on focused row | Toggles expand/collapse |
| Keyboard: Tab | Moves to the "Explore →" link inside an expanded row; then to next row |
| Only one row open at a time? | **No.** Multiple rows CAN be open — the visitor is comparing. Do not auto-close. |
| Navigating away | Expanded state resets on route change (component unmounts) |

### 11.6 Source of truth

The product list comes from `app/utils/products.ts` (single source — same
array the Platform beat and the `/products` index page read). The mini
preview's longer copy + use cases come from each product's content file
(`lib/content/<slug>.ts`). The homepage imports these lazily — only the
content file for the product being expanded is fetched, not all 9 at
page load.

Pattern: `defineAsyncComponent` or a lazy `useFetch(`/lib/content/${slug}`)`
on first expand. Subsequent expands of the same product read from a cached
Map. This keeps initial bundle small and respects "no magic numbers, but
also no magic bundle bloat."

### 11.7 Reveal motion

- The list of 9 rows reveals as one block via `v-reveal="'rise'"` — no
  stagger. The list is a list, not a performance.
- Row expansion: CSS transition only (`max-height` or `grid-rows`
  technique, 300ms ease-out). No GSAP on the expand/collapse — it is a
  DOM state change, not an animation that needs a timeline.
- Hover lift: CSS transition, `--duration-fast` (0.3s).
- `→` rotation: CSS transition, 200ms ease.

Reduced motion: row expand/collapse is instant (no `max-height` transition);
the `→`/`↓` swap is instant.

### 11.8 Forbidden in the Products section

- A card grid. The Platform beat already did that grouping (§10.4). This
  section's interaction model is list-and-open, not scan-and-click.
- A modal, lightbox, or overlay. The mini preview expands **inline**.
- Auto-cycling through products ("watch us showcase each one"). The visitor
  opens what they're curious about; we never move for them.
- A "Compare products" or "Add to cart" action. There is nothing to buy heron
  the homepage. Comparison lives on the products index page.
- Pricing. Deferred.
- Showing all 9 mini previews expanded on load. The default state is
  collapsed. The visitor does the opening.
- A "Continue" or "Next" button. The visitor scrolls to the next beat
  (Industries) by their own choice — the product explorer doesn't gate it.
  "Continue" in the user's spec means the visitor's scroll is the continue,
  not a button we draw.

### 11.9 File contract

| Concern | Products |
|---|---|
| File | `app/components/home/HomeScene05Products.vue` |
| Lines | < 300 (split the row into `ProductRow.vue` + the mini preview into `ProductMiniPreview.vue` if the row component + expansion logic pushes over) |
| Imports gsap? | NO. Expand/collapse is CSS transition + Vue reactive state. `v-reveal` handles the list entrance. |
| Source data | `app/utils/products.ts` for the list; `lib/content/<slug>.ts` (lazy-loaded) for the mini preview |
| SSR-safe? | Yes — all 9 rows render collapsed on the server. The expansion is client-only progressive enhancement. A no-JS visitor sees the collapsed list + the "Explore →" links (which navigate to the product pages directly). |
| Reduced motion? | Expand/collapse is instant. Hover lift disabled or instant. |

---

## PART 12 · INDUSTRIES

Same interaction model as Products (§11) — list of rows, click to expand a
real use case inline. No card grid. No "filter by" sidebar. No world map.
The visitor scans for their vertical, opens it, reads one real use case.

### 12.1 Headline

```
Built for industries where data outpaces people.
```

`text-h2`, navy, one line. The count emerges from the list itself; the
headline states the condition those industries share.

### 12.2 Subheading — one line

```
Eight industries today. Each one a real deployment, not a press release.
```

`text-body`, muted-strong, max-width `36rem`.

### 12.3 The eight industries

**These eight only.** Not 12. Not 9. Eight. If your codebase has more (the
current `utils/industries.ts` shipped 12 in Sprint Alpha — `Construction`,
`Defense`, `Logistics`, `Mining` are dropped from the launch homepage), they
still exist on `/industries` and `/industries/[slug]` as routable pages —
they simply don't appear on the homepage list.

| # | Industry | Slug | Primary capability | Opens to |
|---|---|---|---|---|
| 1 | Manufacturing | `manufacturing` | Predict | `/industries/manufacturing` |
| 2 | Healthcare | `healthcare` | Understand | `/industries/healthcare` |
| 3 | Agriculture | `agriculture` | Observe | `/industries/agriculture` |
| 4 | Energy | `energy` | Predict | `/industries/energy` |
| 5 | Retail | `retail` | Coordinate | `/industries/retail` |
| 6 | Government | `government` | Understand | `/industries/government` |
| 7 | Cities | `smart-cities` | Observe | `/industries/smart-cities` |
| 8 | Ports | `ports` | Coordinate | `/industries/ports` |

Note the **display name change** for `Cities` (was "Smart Cities"). The
spec drops the "Smart" prefix — it's marketing speak. The route stays
`/industries/smart-cities` (slug unchanged) to preserve all inbound links.
The Institutions index and `[slug].vue` keep using the existing slug; only
the homepage row's visible label is "Cities."

Update `utils/industries.ts` so the `name` field for the `smart-cities`
entry reads `"Cities"` (display) while the `slug` stays `"smart-cities"`.
The other 4 dropped industries (`Construction`, `Defense`, `Logistics`,
`Mining`) stay in the util as full entries so `/industries/[slug]` continues
to render them — they're just not surfaced by the homepage list below.

### 12.4 What renders on the homepage

Add a derived selector to `app/utils/industries.ts`:

```ts
export const HOMEPAGE_INDUSTRIES = [
  "manufacturing", "healthcare", "agriculture", "energy",
  "retail", "government", "smart-cities", "ports",
] as const;

export const HOMEPAGE_INDUSTRY_ENTRIES = HOMEPAGE_INDUSTRIES
  .map(slug => INDUSTRIES.find(i => i.slug === slug))
  .filter((i): i is IndustryInfo => i !== undefined);
```

The homepage scene imports `HOMEPAGE_INDUSTRY_ENTRIES` not `INDUSTRIES`.
The `/industries` index page keeps using `INDUSTRIES` (all 12). This is the
single-source rule (§16.1) honored: one array, one derived slice.

### 12.5 Collapsed state (default)

Identical visual register to Products (§11.3) — a vertical list of rows. Each
row shows the industry name, a capability tag, a one-line summary, and an
`→ open` affordance:

```
─────────────────────────────────────────────
  Manufacturing                      Predict  →  open
  Production intelligence, quality optimization, predictive maintenance.
─────────────────────────────────────────────
  Healthcare                       Understand  →  open
  Patient care optimization, operational intelligence.
─────────────────────────────────────────────
  ...
```

- Industry name: 1.25rem, weight 700, navy.
- Capability tag: 11px weight 600 uppercase letter-spacing 0.08em, accent blue.
- Summary line (`utils/industries.ts` `IndustryInfo.summary`)
- `→ open` rotates to `↓` when expanded, `aria-expanded`.

### 12.6 Expanded state — the real use case

Click a row → expansion reveals **one real use case from that industry's
content file** (`lib/content/<slug>.ts`). Not the full KnowledgeProduct content
— one `useCases[i]` (the first one), the one most likely to land with that
buyer.

**What the mini preview shows:**

| Element | Content | Source |
|---|---|---|
| Industry name | The display name (e.g. "Cities") | `utils/industries.ts` |
| The use case title | `useCases[0].title` | `lib/content/<slug>.ts` |
| The use case description | `useCases[0].description` | `lib/content/<slug>.ts` |
| One outcome from the ROI section | `roi.metrics[0].label` — `roi.metrics[0].value` | `lib/content/<slug>.ts` |
| Link | `Explore {Industry} →` to `/industries/[slug]` | slug |

Example for Manufacturing:

```
─────────────────────────────────────────────
  Manufacturing                      Predict  ↓  close
  Production intelligence, quality optimization, predictive maintenance.
  ┌─────────────────────────────────────────┐
  │ Use case                                 │
  │ Automated Quality Inspection             │
  │                                          │
  │ Replace manual quality inspection with   │
  │ AI-powered computer vision that detects  │
  │ defects at line speed with 99%+ accuracy.│
  │                                          │
  │ Outcome                                  │
  │ Quality Yield Improvement · 20–40%       │
  │                                          │
  Explore Manufacturing →                    │
  └─────────────────────────────────────────┘
─────────────────────────────────────────────
```

The use case IS the proof. No "trusted by these manufacturers." No customer
logo. One real, specific, numbered claim from the content file that already
exists. If `roi.metrics` is empty for that industry, the outcome line is
suppressed — never invent a number.

### 12.7 Interaction contract

Same as Products (§11.5): click or keyboard Enter/Space to toggle, multiple
rows can be open at once, the entire row is one `<button>`. Tabbing inside
an expanded row reaches the `Explore →` link, then proceeds to the next
row. Expanded state resets on route change.

### 12.8 Source of truth

- The list = `HOMEPAGE_INDUSTRY_ENTRIES` derived from `INDUSTRIES` in
  `app/utils/industries.ts` (single source).
- The mini preview reads from `lib/content/<slug>.ts`'s `useCases[0]` and
  `roi.metrics[0]`. Lazy-loaded on first expand (don't bundle 8 content
  files in the homepage chunk — fetch on open, cache the result in a `Map`).
- Adding an industry to `utils/industries.ts` + adding its slug to
  `HOMEPAGE_INDUSTRIES` makes it appear on the homepage. Adding it to
  `utils/industries.ts` only makes it appear on `/industries` and its own
  detail page. Both paths are valid; the homepage slice is opt-in per slug.

### 12.9 Reveal motion

- The 8-row list reveals as one block via `v-reveal="'rise'"` — no stagger.
- Row expansion animates via CSS (`max-height` 300ms ease-out OR
  `grid-template-rows: 0fr → 1fr` for clean auto-height).
- Hover lift: CSS, `--duration-fast`.
- `→` rotation: CSS transition, 200ms ease.

Reduced motion: expand/collapse is instant; rotation is instant; no
repeated motion. The list itself renders fully placed on the server.

### 12.10 Forbidden in the Industries section

- A card grid. This beat is list-and-open per §11.1's interaction model;
  grids belong to the Platform beat (§10).
- A "filter by industry" or "search industries" UI. Eight rows don't need
  a filter.
- A world map with pulsing dots. Forbidden (§4.6 — no looping motion).
- Customer logos per industry. Trust artifacts live in Scene 8 (Trust Strip).
- A generic "every industry can benefit" closing line. If it's true of
  every industry, it's true of none — the list is the argument.
- Auto-cycling through the rows. The visitor opens what they want.
- Showing the use case description text on the collapsed row. The
  collapsed row shows the **summary** (one short line); the expanded row
  shows the actual **use case** (the longer, specific claim). Don't conflate.
- The 4 dropped industries (Construction, Defense, Logistics, Mining) on
  the homepage. They exist as routable detail pages; they don't surface here.
  If a buyer for those verticals lands on the homepage, they can still reach
  the content via `/industries` or via search engines indexing the detail
  pages directly — the home page is not the only door.

### 12.11 File contract

| Concern | Industries |
|---|---|
| File | `app/components/home/HomeScene06Industries.vue` |
| Lines | < 300 (split the row into `IndustryRow.vue` + the mini preview into `IndustryUseCase.vue` if needed) |
| Imports gsap? | NO. Same rationale as Products (§11.9) — DOM state + CSS transitions. |
| Source data | `app/utils/industries.ts` (`HOMEPAGE_INDUSTRY_ENTRIES`) for the list; `lib/content/<slug>.ts` lazy-loaded for the mini preview |
| SSR-safe? | Yes — all 8 rows render collapsed on the server. Expansion is progressive enhancement. No-JS visitor sees the collapsed list + `Explore →` links. |
| Reduced motion? | Expand/collapse instant. Hover lift disabled or instant. |

---

## PART 13 · TRUST

The visitor has seen the problem, the category, the platform, the products,
the industries. They're interested. Now they ask the question every enterprise
buyer asks before they pick up the phone: **can I trust these people with my
operations?** This beat answers it. Not with logos. Not with testimonials.
With facts.

### 13.1 Headline

```
Built to be trusted with enterprise operations.
```

`text-h2`, navy. One line. The sentence is the claim; the pillars are the
evidence.

### 13.2 Subheading — one line

```
Trust is written, not animated.
```

`text-body`, muted-strong, max-width `36rem`. This sentence is also a design
instruction to ourselves: the Trust beat has the least motion of any scene
on the homepage. Facts sit still.

### 13.3 The six pillars

Six pillars, not four. The Sprint Alpha build shipped four (DPIIT,
Women-Led, Research-Backed, Industry-Standard Technology). The spec adds
two more that an enterprise buyer needs to see: **Architecture** (proof the
system is engineered, not assembled) and **Roadmap** (proof the company
knows where it's going).

| # | Pillar | Display title | What it says | Link |
|---|---|---|---|---|
| 1 | DPIIT | `DPIIT-Recognized` | Registered with the Department for Promotion of Industry and Internal Trade under the Government of India's Startup India initiative. Eligible vendor for government and public-sector procurement. | `/dpiit` |
| 2 | Women-Led | `Women-Led Operation` | SVARA is women-led — a deliberately underrepresented profile in deep-tech enterprise infrastructure. | — |
| 3 | Research-First | `Research-First Design` | Every capability maps to a peer-reviewed technique or industry standard — sensor fusion, computer vision, predictive maintenance, multi-agent systems. No vapor, no proprietary magic. | — |
| 4 | Technology | `Industry-Standard Technology` | Built on OPC-UA, MQTT, REST, gRPC, and the modern AI/ML stack. Integrates with existing SCADA, MES, ERP, and identity systems — not a rip-and-replace. | — |
| 5 | Architecture | `Engineered Architecture` | The Intelligence Loop is a closed system — five capabilities, one cycle, continuously compounding. Not a collection of tools glued together. Architecture diagram lives on `/platform`. | `/platform` |
| 6 | Roadmap | `Public Roadmap` | The direction is published, not secret. Each capability has a stated next milestone. The visitor can check what's coming before they bet on it. | — (link to `/blog` or `/platform#roadmap` post-launch; for launch, no link if the roadmap page doesn't exist yet) |

### 13.4 No fake numbers

**This is the most important rule in this section.**

The Trust beat does NOT contain:
- "Trusted by 50+ enterprises" (we don't have 50 yet)
- "99.9% uptime" (we haven't measured it at scale)
- "Processing 10B+ data points daily" (we're not)
- "300% ROI in 18 months" as a homepage claim (that's a content-page metric,
  not a trust signal)
- "Award-winning" (we haven't won an award)
- Customer logos (we don't have signed logo-use rights yet)
- Star ratings, review badges, "rated 4.9/5 by G2" (we're not on G2)
- "SOC 2 Type II certified" (we're not — if/when we are, it goes here)

**What we DO show:**

Each pillar is a text statement. One title, 2-3 sentences of body, and an
optional link. The body copy comes from `lib/content/` files that are
authored and reviewed — not from a marketing deck. If a claim can't be
sourced to a real artifact (DPIIT certificate, published research, standard
spec), it doesn't appear here.

The DPIIT pillar links to `/dpiit` (the recognition page with the actual
framework description). The Architecture pillar links to `/platform` (the
engineering detail). Other pillars are text-only — no link until there's a
real destination.

If a buyer wants proof beyond the text, the Contact form (Scene 8) is one
scroll away. The Trust beat doesn't manufacture proof — it points to where
proof lives.

### 13.5 Layout

Six pillars in a 3×2 grid on desktop, 2×3 on tablet, stacked on mobile.
Each pillar is a card — BUT visual register is quieter than the Platform
or Products cards:

- Background: `--color-card` (white), NOT `--color-accent-bg`. The Trust
  beat sits on the same white as the rest of the page — it does NOT get the
  blue tint the Category and Solution beats used. Trust is sober, not soft.
- Border: 1px `--color-card-border`, same as other cards.
- Padding: `2rem 1.5rem` — tighter than Platform cards (which were
  `2rem 1.5rem` too, but with more internal breathing room via gap). Trust
  cards are denser — the text is the point, not the whitespace.
- No icons. (The Sprint Alpha build used `@lucide/vue` icons on each pillar.
  The spec drops them — icons on a Trust card read as decoration, not
  evidence. The title IS the icon.)
- No hover lift. Trust cards don't perform on hover — they sit. The only
  interactive element is a link, which gets the standard `link-explore`
  arrow-translate-right hover (§4.6).

**Card structure:**

```
DPIIT-Recognized
Registered with the Department for Promotion
of Industry and Internal Trade under the
Government of India's Startup India initiative.
Eligible vendor for government and public-sector
procurement.

View recognition →
```

- Title: 1.1875rem, weight 700, navy.
- Body: 0.9375rem, line-height 1.55, muted-strong.
- Link (if present): 0.8125rem, weight 600, accent blue, arrow translates
  right on hover.

### 13.6 Reveal motion

The 6 cards stagger in via `v-reveal="{ stagger: 0.08 }"` — 80ms between
cards, `reveal-rise` variant. Slower stagger than Platform (60ms) because
Trust is the slowest beat — the visitor should read, not scan.

Reduced motion: instant render, no stagger, no transitions.

### 13.7 The Roadmap pillar — special case

The Roadmap pillar is the one that can't fake content. If there is no
public roadmap document yet, the pillar body says:

```
Our direction is published, not secret. The roadmap
detail page is in preparation — contact us for the
current priorities.
```

And the link points to `/contact` (not a nonexistent `/roadmap` page). This
is honest: the pillar EXISTS (because the *commitment* to transparency is
real), but the destination is the conversation, not a page we haven't built.

Post-launch, when a `/roadmap` or `/platform#roadmap` page exists, the link
destination updates. The pillar stays.

### 13.8 Forbidden in the Trust section

- Any fabricated number (§13.4 — the rule, restated: no fake numbers).
- Customer logos. Logos require written permission and we don't have it yet.
- Testimonials or quotes. Same reason — and a homepage is not a review site.
- "Award-winning" or "industry-leading" or "best-in-class." Adjectives are
  not trust; facts are.
- Icons on the cards. The title is the signal.
- Animated counters ("0 → 50+ enterprises"). Forbidden twice: fake number
  AND perpetual animation (§4.6).
- A "Book a demo" CTA. CTAs live in Scene 8 (Explore). Trust is the
  evidence; the action is one scroll away.
- Security badges (SOC 2, ISO 27001) until we actually hold them.
- A different background color or gradient. Trust is white-on-white, sober.

### 13.9 File contract

| Concern | Trust |
|---|---|
| File | `app/components/home/HomeScene07Trust.vue` |
| Lines | < 300 (the 6-card grid is compact; no split needed) |
| Imports gsap? | NO. `v-reveal` with stagger only. |
| Source data | The 6 pillars are defined inline in the component (they are homepage-specific — not the same as the `/dpiit` or `/company` content files, which are fuller). The DPIIT and Architecture pillars link OUT to those pages. |
| SSR-safe? | Yes — all 6 cards render fully on the server. |
| Reduced motion? | Cards render in place, no stagger, no transitions. |

---

## PART 14 · CONTACT

The visitor has read everything. They understand the problem, the category,
the platform, the products, the industries, the trust pillars. Now they
decide whether to reach out. This beat makes that easy — and nothing else.

### 14.1 What this is NOT

- Not a sales page. No "Book a demo," no "Schedule a call," no "Request a
  quote," no pricing teaser, no "Limited time offer."
- Not a form with 12 fields. No "What's your budget?" No "How many
  employees?" No "What's your buying timeline?" No "Which products are you
  interested in?" (checkbox grid). None of it.
- Not a calendar embed. No "Pick a 30-minute slot" Calendly widget. The
  buyer isn't ready to book a meeting — they're ready to send one line.
- Not a chatbot. No.Intercom, no Drift, no bottom-right bubble. The contact
  beat is a page section, not an invasive overlay.
- Not a phone number in 48pt font. No "CALL NOW." This is enterprise, not
  retail.

### 14.2 Headline

```
Let's talk.
```

`text-h2`, navy. Two words. No exclamation mark. No "Get in touch" (cliché).
No "We'd love to hear from you" (salesy). The visitor knows what this is;
the headline simply opens the door.

### 14.3 Subheading — one line

```
Tell us about your operations. We respond within 24 business hours.
```

`text-body`, muted-strong, max-width `36rem`. This sentence makes exactly
two promises: (1) we want to hear about *your* situation, not a generic
inquiry, and (2) we'll respond fast. Both are true. Both are the entire
value proposition of the contact beat.

### 14.4 Contact channels — before the form

Above the form, three lines. Not four. Not six. Three:

```
Email      hello@svaratechfusion.com
Phone      +91 80 0000 0000
Based in   Bengaluru, India
```

- Label: 12px, weight 600, uppercase, letter-spacing 0.08em, muted.
- Value: 1rem, weight 500, navy. Email and phone are `<a>` tags (`mailto:`
  and `tel:`). "Based in" is plain text.
- Layout: horizontal on desktop (3 columns), stacked on mobile.
- Separated by thin top + bottom borders (`1px solid --color-divider`), padding
  `1.5rem 0` above and below. This is a directory strip, not a hero section.

These values come from `lib/content/contact.ts` `CONTACT_CHANNELS`. They're
placeholders today (per §16.2 pending item #4); updating that one file
updates the homepage contact beat AND the `/contact` page simultaneously.

### 14.5 The form — five fields, nothing else

| # | Field | Type | Required | Validation |
|---|---|---|---|---|
| 1 | Name | text | yes | max 120 chars, `autocomplete="name"` |
| 2 | Email | email | yes | max 200 chars, RFC-ish regex, `autocomplete="email"` |
| 3 | Inquiry type | select | no | default "Sales inquiry", options: Sales / Partnership / Investor relations / Media / Other |
| 4 | Message | textarea | yes | max 5000 chars, rows 5, `resize: vertical` |
| 5 | (honeypot) Company URL | text | must stay EMPTY | hidden, `aria-hidden`, `tabindex="-1"` |

That's five fields — but the visitor sees four. The honeypot is invisible.

**No company name field.** The message will reveal it naturally. Asking for
it upfront signals "we want to qualify you," not "we want to hear from you."

**No role/title field.** Same reason.

**No "How did you hear about us?"** Marketing survey data doesn't belong in
the contact path.

**No CAPTCHA.** The honeypot + server-side rate limit (5 requests per 10
minutes per IP, already implemented in `server/api/contact.post.ts`) handle
spam. CAPTCHA punishes the legitimate visitor to stop the bots — the honeypot
does the inverse.

### 14.6 Form interaction — quiet, not performant

| State | What the visitor sees |
|---|---|
| Idle | Form, fields, submit button labeled "Send message" |
| Focused field | 2px `--color-svara-blue` outline (replaces the default ring). No background change, no scale. |
| Submitting | Button label changes to "Sending..."", button is `disabled`. Form fields stay editable (don't lock them — the visitor might want to fix something while waiting). |
| Success | Form is replaced by a single line: "Thank you — your message has been received. We respond within 24 business hours." Role `status`. No confetti, no checkmark animation, no auto-redirect. |
| Error | A line appears below the form (role `alert`): the error message from the server. Form stays visible so the visitor can retry. No field-level red borders — keep it simple. |

The submit button: `--color-primary` background, `--color-bg` text, pill
radius (`--radius-pill`), `0.95rem 1.75rem` padding, weight 600. On hover,
opacity drops to 0.92 (subtle). On disabled, opacity 0.5, cursor not-allowed.
No gradient. No glow. No arrow icon — the button makes a promise ("Send"),
not a pitch ("Get started →").

### 14.7 Progressive enhancement

The form posts to `/api/contact` via `fetch` (already implemented:
`server/api/contact.post.ts` with validation, honeypot, rate limit, and
logging). If JavaScript is disabled, the form still submits — it performs a
native POST to `/api/contact`, which returns JSON. The no-JS visitor gets
JSON in the browser (not pretty, but functional). The JS layer simply
surfaces a friendlier status and prevents the page reload.

This is the minimum viable progressive enhancement: the form works without JS,
the JS makes it pleasant. Neither layer is a lie.

### 14.8 What happens after submission — server-side

Already implemented (§16.1, Sprint Alpha): the server validates, rate-limits,
honeypot-checks, and logs the submission to the server console. The
mandatory follow-up (§16.2 pending item #6) is wiring SMTP so submissions
forward to a real inbox. Until that's wired, submissions are captured in the
server log drain — nothing is lost, but nothing is emailed either. The form
is honest about this: it says "your message has been received," not "we've
emailed our team." The acknowledgment is literally true.

### 14.9 Below the form — nothing

No "Follow us on" social icons. No "Subscribe to our newsletter." No "Check
out our blog." No secondary CTAs. The contact beat ends with the form (or
the success message). The next thing the visitor sees is the footer, which
has its own job (§6.1 row 10).

### 14.10 Forbidden in the Contact section

- Field count > 4 visible. The honeypot doesn't count.
- A "How can we help?" dropdown with 8 options that routes to different forms.
  One form. One destination. One inbox.
- Required fields beyond Name, Email, Message. Inquiry type is optional.
- A "Preferred contact time" or "Best time to reach you" field. Enterprise
  buyers don't fill out meeting-preference forms on first contact.
- Attachments / file upload. The first message doesn't need a deck; if it
  does, we'll ask in the reply.
- Auto-redirect to a "Thank you" landing page with tracking pixels. The
  success state is inline; the visitor stays on the homepage.
- Social media links. Those live in the footer (and only if the accounts
  exist with real content — currently they don't, so the footer doesn't
  show them either).
- Sales pressure of any kind. No "Don't miss out." No "Spots are limited."
  No "Act now." Enterprise buyers recognize urgency tactics instantly and
  trust the company less for using them.

### 14.11 File contract

| Concern | Contact |
|---|---|
| File | `app/components/home/HomeScene08Contact.vue` (new — Sprint Alpha's contact content lives on the `/contact` page; the homepage needs its own inline contact beat) |
| Lines | < 300 (the form is already split into `app/components/ui/ContactForm.vue` from Sprint Alpha — reuse it, don't re-implement) |
| Imports gsap? | NO. No motion on the contact beat. The form is fully static. The only transition is the form→success-message swap, which is a Vue `<Transition>` (opacity, 200ms), not GSAP. |
| Reuses | `app/components/ui/ContactForm.vue` (already built in Sprint Alpha — accessible, honeypot, rate limit, server route). The homepage beat renders the form component + the contact channels strip above it. |
| Source data | `lib/content/contact.ts` `CONTACT_CHANNELS` for the email/phone/location strip. |
| SSR-safe? | Yes — the form HTML renders fully on the server. The fetch handler attaches on mount only. |
| Reduced motion? | Form→success transition is instant. No other motion. |

---

## PART 15 · ARCHITECTURE DOCTRINE

The rules below are non-negotiable. Any change that violates them is rejected
at review, regardless of whether it works.

### 14.1 Ownership boundaries

Each library owns ONE concern. No library reaches into another's domain.

| Library | Owns | Does NOT own |
|---|---|---|
| Lenis | scroll, velocity, momentum | animation, timeline, state |
| GSAP | timeline, sequencing, transitions | scroll semantics, world, UI |
| Three.js | world, camera, particles, shaders, lighting | DOM, scroll, sequencing |
| UI framework | content, routing, CMS, navigation, accessibility | animation timing |

**React / UI responsibility:** content, routing, CMS, navigation, accessibility. React never owns animation timing.

**Swap test:** replacing GSAP with Motion One should only touch one adapter
file. Architecture is the contract, not the implementation.

### 14.2 The SceneConfig pattern

Every scene is a data object. Code reads it; code never *is* it.

```ts
export const Scene01 = {
  id: "birth",
  title: "Enterprise Reality",
  entry: 0,      // derived from pacing — never authored
  exit: 0.12,    // derived from pacing — never authored
  camera: "static",
  motion: "particles",
  lighting: "ambient",
  content: "hero",
  transition: "organize",
}
```

V1 launch homepage uses DOM scenes, not this config — but the pattern is the
contract for V2. When the WebGL engine returns (from `_v2/`), scenes plug in
as data, not as imperative `beat()` calls.

### 14.3 The contract header

Every file begins with a structured header. No exceptions.

```
/**
 * Module         <name>
 * Purpose        <one line>
 * Owner          <system>
 * Dependencies   <libs>
 * Performance Budget  <budget>
 * Inputs         <inputs>
 * Outputs        <outputs>
 * Acceptance     <criteria>
 */
```

### 14.4 Code standards

- No file longer than **300 lines**. Split by responsibility.
- No component owns animation. Components declare intent (`v-reveal`); the
  motion plugin owns GSAP.
- No page owns business logic. Pages compose; logic lives in `lib/`.
- No duplicated state. One source of truth per concept.
- No magic numbers. Constants at the top, named, documented.
- Every animation documented (what it does, why, when).

### 14.5 The 5-gate review

Before merge, every change must answer YES to all five:

1. Does it improve **understanding**?
2. Does it improve **trust**?
3. Does it improve **performance**?
4. Does it **simplify** architecture?
5. Does it match **Company OS**?

Any NO kills the change.

---

## PART 15 · TECH STACK

| Layer | Tech | Notes |
|---|---|---|
| Framework | Nuxt 4.4.8 | SSG via `nuxt generate` |
| UI | Vue 3.5 + Tailwind v4 | `pathPrefix: false`, flat component names |
| Motion | GSAP 3.15 (vendored at `lib/gsap/`) | Only `app/plugins/reveal.ts` imports it |
| Smooth scroll | Lenis 1.3 (vendored at `lib/lenis/`) | `app.vue` owns the raf pump |
| 3D (V2) | Three.js 0.185 | Archived in `_v2/`, not in the launch bundle |
| Icons | `@lucide/vue` | |
| Fonts | `@fontsource/geist-sans` (self-hosted) | Weights 400/500/700 |
| SEO | `@nuxtjs/seo` | sitemap, robots, schema.org, OG image |

### 15.1 Commands

```bash
npm run dev        # dev server at :3000
npm run build      # SSR build → .output/server
npm run generate   # SSG build → .output/public  (the launch target)
npx vue-tsc --noEmit   # typecheck
npx eslint app/ lib/ server/   # lint
```

### 15.2 Production identity (single source of truth)

`lib/seo/site.ts` is the ONE place the domain, org name, OG image, and logo
URLs live. `lib/seo/meta.ts`, `lib/seo/jsonld.ts`, `nuxt.config.ts`, and the
hub pages all import from it. Update one line to repoint the world.

---

## PART 16 · CURRENT STATE (as of this spec)

### 16.1 What ships (DONE)

**Epic 1 · Experience — Homepage: 8 scenes, DOM + SVG, clarity-first.**
- `app/pages/index.vue` — 8-scene shell
- `app/components/home/HomeScene01Hero.vue` — one statement, one CTA
- `app/components/home/HomeScene02Problem.vue` — SVG of 7 disconnected systems
- `app/components/home/HomeScene03Solution.vue` — SVG of the closed Intelligence Loop
- `app/components/home/HomeScene04Capabilities.vue` — 5 capability cards
- `app/components/home/HomeScene05Products.vue` — 9 product tiles from `utils/products.ts`
- `app/components/home/HomeScene06Industries.vue` — 12 industry cards from `utils/industries.ts`
- `app/components/home/HomeScene07Trust.vue` — DPIIT, Women-led, Research, Technology
- `app/components/home/HomeScene08Explore.vue` — Platform/Products/Contact + closing
- `app/plugins/reveal.ts` — the V1 motion director (one GSAP boundary, SSR-safe)
- `app/app.vue` — Lenis smooth scroll + gsap raf pump, no boot overlay
- `app/layouts/default.vue` — skip-to-content link
- `app/components/layout/AppHeader.vue` — mobile nav (toggle + panel + aria)
- `app/components/layout/AppFooter.vue` — fixed legal links + Trust nav

**Epic 2 · Information — Platform, Products, Industries, Technology. ALL READY.**
- `/platform` — `lib/content/platform.ts`
- `/products` + `/products/[slug]` — 9 product detail pages, all content files present
- `/industries` + `/industries/[slug]` — 12 industry detail pages, all content files present
- `/technology` + `/technologies/[slug]` — 5 technology detail pages, all present
- Industries index + slug map driven by `app/utils/industries.ts` (single source of truth)
- Products driven by `app/utils/products.ts` (single source of truth)
- Capabilities renamed: Observe/Understand/Predict/Coordinate/Improve
  - Old slugs (`/capabilities/sense|think|act|learn`) permanently redirect via `routeRules`

**Epic 3 · Trust — Company, DPIIT, Leadership, Contact. ALL READY.**
- `/company` — `lib/content/company.ts` (cross-links DPIIT + Leadership)
- `/dpiit` — `lib/content/dpiit.ts` (DPIIT-recognized startup under Startup India)
- `/leadership` — `lib/content/leadership.ts` (placeholder slots: `[Full Name — replace before launch]`)
- `/contact` — real form + `server/api/contact.post.ts` (validation, honeypot, rate limit)

**Epic 4 · Performance — build, SEO, a11y, responsive. DONE (with follow-ups).**
- `nuxt generate` exits clean: **101 routes prerendered, 0 link errors, 0 warnings**
- AppFooter links fixed (`/legal/privacy`, `/legal/terms`) — SSG unblocked
- CSS tokens added: `--color-card`, `--color-accent`, `--color-accent-bg`, `--color-muted-strong`, `--color-card-border`
- Domain consolidated to `lib/seo/site.ts` (one source, 5 former copies removed)
- `public/og-image.png` + `public/logo.png` created (solid placeholders)
- Mobile nav functional (toggle + Teleport'd panel + `aria-expanded`/`aria-controls`)
- Skip-to-content link in default layout
- `prefers-reduced-motion` handled across reveals + Lenis

**V2 engine archived at `_v2/`** (history preserved via git mv):
- `lib/experience/` (14 modules: MotionDirector, SceneDirector, SceneManager, MasterTimeline, ScrollController, CameraController, ParticleEngine, LightingLayer, AtmosphereLayer, TypographyDirector, ProductDirector, CursorController, PerformanceMonitor, pacing)
- `lib/types/experience.ts`, `lib/experience/sceneRegistry.ts`
- `app/components/scenes/` (9 components), `app/components/three/` (IntelligenceWorld, WorldAtmosphere, BirthSequence)
- `PageLoader.vue`, `useIntelligenceWorld.ts`, `useWorldReady.ts`, `usePageReveal.ts`, `useHeroTelemetry.ts`, `sampleTextParticles.ts`
- `lab/intelligence-world.vue`, `lab/intelligence-engine.vue`
- `_v2/**` ignored by eslint

### 16.2 What's pending (MANDATORY before public go-live)

| # | Task | Where | Why |
|---|---|---|---|
| 1 | Set real production domain | `lib/seo/site.ts:35` `SITE_URL` | All canonicals/sitemap/schema point at placeholder |
| 2 | Replace `public/og-image.png` | `public/og-image.png` | Currently a solid-color placeholder |
| 3 | Replace `public/logo.png` | `public/logo.png` | Currently a solid-color placeholder |
| 4 | Set real contact email + phone | `lib/content/contact.ts` `CONTACT_CHANNELS` | Currently placeholder |
| 5 | Set real leadership names + bios | `lib/content/leadership.ts` | Currently `[Full Name — replace before launch]` tokens |
| 6 | Wire SMTP into `/api/contact` | `server/api/contact.post.ts` | Currently logs only; needs `nodemailer`/SMTP env vars |
| 7 | Remove `Knowledge` from `AppHeader.vue` nav list (post-launch per §3.2) | `app/components/layout/AppHeader.vue` | Knowledge is post-launch sitemap (§3.2) |

### 16.3 Deferred (post-launch, NON-blocking)

- Split `KnowledgeProductLayout.vue` (397 lines — over the 300-line limit)
- Contrast audit on `--color-muted` body copy (likely ~3.8:1, below AA 4.5:1)
- Review awkward compound names in industry content (e.g. "Field Observe" vs original "Field Sense")
- Pre-existing lint errors in `ContentSlot.vue` + `SectionContent.vue` (parse errors, deprecated `is` attr)
- `/knowledge` route resolves via SPA fallback but is not in the static sitemap (same as pre-refactor)
- Wire SceneDirector to read from `sceneRegistry` (V2 work, archived)

---

## PART 17 · THE HOMEPAGE SPECIFICATION (V1 launch)

### 17.1 Thesis

> Make enterprise buyers think: "These people understand the future of
> enterprise systems." Not: "Wow, cool animations."

Clarity beats spectacle. Every scene does ONE thing.

### 17.2 The 8 scenes

| # | Scene | One statement | One proof |
|---|---|---|---|
| 1 | Hero | "Enterprise systems produce more data than people can act on." | One CTA |
| 2 | Problem | "Enterprise systems are disconnected." | SVG: 7 silos with broken lines |
| 3 | Solution | "Enterprise Intelligence Infrastructure." | SVG: closed 5-node loop around SVARA hub |
| 4 | Capabilities | "Five capabilities. One loop." | 5 cards (Observe/Understand/Predict/Coordinate/Improve) |
| 5 | Products | "Nine products. One platform." | 9 tiles from `utils/products.ts` |
| 6 | Industries | "Built for industries where data outpaces people." | 12 cards from `utils/industries.ts` |
| 7 | Trust | "Built to be trusted with enterprise operations." | DPIIT / Women-led / Research / Technology |
| 8 | Explore | "Three places to start." | Platform / Products / Contact + closing line |

### 17.3 Capabilities (V1 naming — replaces internal Sense/Think/Act/Learn)

| Slug | Display | Maps to old |
|---|---|---|
| `/capabilities/observe` | Observe | Sense |
| `/capabilities/understand` | Understand | Think |
| `/capabilities/predict` | Predict | Predict (unchanged) |
| `/capabilities/coordinate` | Coordinate | Act |
| `/capabilities/improve` | Improve | Learn |

Old slugs permanently redirect via `nuxt.config.ts` `routeRules`.

### 17.4 Visual register

- **DOM + SVG only.** No canvas, no WebGL, no Three.js in the launch bundle.
- SVG diagrams are static-on-load with subtle hover/scroll-reveal motion.
- Reduced-motion users get instant reveals (no transitions).
- The motion director (`app/plugins/reveal.ts`) is the ONE GSAP boundary.
  Components declare intent via `v-reveal` and `data-reveal-item`. No
  component imports `gsap` directly.

---

## PART 18 · CONTENT ARCHITECTURE

### 18.1 Single sources of truth

| Concept | File | Consumers |
|---|---|---|
| Products (9) | `app/utils/products.ts` | homepage Scene 5, `/products` index, `products/[slug]` |
| Industries (12) | `app/utils/industries.ts` | homepage Scene 6, `/industries` index, `industries/[slug]` |
| Site identity | `lib/seo/site.ts` | `nuxt.config.ts`, `lib/seo/meta.ts`, `lib/seo/jsonld.ts`, hub pages |
| SEO meta | `lib/seo/meta.ts` | `useKnowledgeProduct.ts`, `usePageSeo.ts` |
| JSON-LD | `lib/seo/jsonld.ts` | `useKnowledgeProduct.ts`, `useStructuredData.ts` |
| Content type | `lib/types/content.ts` | all `lib/content/*.ts`, `KnowledgeProductLayout.vue` |

### 18.2 Knowledge Product pattern

Every informational page (Platform, Products, Industries, Technology, Company,
DPIIT, Leadership, Capabilities, Knowledge hub, Legal) follows the same shape:

```
lib/content/<slug>.ts     → exports a typed content object
app/pages/<route>.vue     → imports the content, calls useKnowledgeProduct(), renders <KnowledgeProductLayout>
```

The content object satisfies `KnowledgeProductContent` (or its subtypes
`ProductContent`, `IndustryContent`, `TechnologyContent`, `PlatformContent`,
`BusinessContent`). The renderer (`KnowledgeProductLayout.vue`) does not know
which subtype it receives — it renders the shared sections.

### 18.3 Content type hierarchy

```
KnowledgeProductContent          (base — 10 sections + metadata)
├── PlatformContent              (+ capabilities[])
├── ProductContent               (+ capability, outcomes[])
├── IndustryContent              (+ applicableProducts[])
├── TechnologyContent            (+ usedBy[])
└── BusinessContent              (= base, type alias for trust pages)
```

---

## PART 19 · SPRINT ALPHA STATUS

| Epic | Deliverable | Status |
|---|---|---|
| 1 · Experience | Homepage (8 scenes, DOM+SVG) | ✅ DONE |
| 2 · Information | Platform | ✅ DONE |
| 2 · Information | Products (9) | ✅ DONE |
| 2 · Information | Industries (12) | ✅ DONE |
| 2 · Information | Technology (5) | ✅ DONE |
| 3 · Trust | Company | ✅ DONE |
| 3 · Trust | DPIIT | ✅ DONE (content authored) |
| 3 · Trust | Leadership | ✅ DONE (placeholders for real bios) |
| 3 · Trust | Contact | ✅ DONE (form + server route) |
| 4 · Performance | Lighthouse / build | ✅ DONE (generate clean, 101 routes) |
| 4 · Performance | SEO (sitemap, schema, OG) | ✅ DONE (domain placeholder) |
| 4 · Performance | Accessibility | ✅ DONE (skip-link, mobile nav, reduced-motion) |
| 4 · Performance | Responsive | ✅ DONE (svh units, clamp, breakpoints) |

### 19.1 Final verification (last run)

```
npx vue-tsc --noEmit       → exit 0
npx eslint app/ lib/ server/  → 6 pre-existing errors (untouched files)
npx nuxt build             → ✅ 8.45 MB total
npx nuxt generate          → ✅ 101 routes, 0 link errors, 0 warnings
```

---

## PART 20 · HOW TO EXECUTE (for OpenCode)

### 20.1 Reading order

1. Read this document. **This is the only spec.**
2. Skim `docs/Volume 1 — COMPANY OS/PROJECT_RULES.md` if you need rule context.
3. Everything in `_v2/` is dead weight for V1 — ignore it.

### 20.2 Before you write code

- Check the 5-gate review (§14.5). All five must pass.
- Check the ownership boundaries (§14.1). No cross-boundary work.
- Check the code standards (§14.4). No file > 300 lines, no component GSAP.
- Add the contract header (§14.3) to every new file.

### 20.3 Before you declare done

```bash
npx vue-tsc --noEmit
npx eslint app/ lib/ server/
npx nuxt generate
```

All three must pass. `nuxt generate` must report `Failing Pages: 0` and
`Total errors: 0`. If it exits non-zero, the change does not ship.

### 20.4 When in doubt

- Clarity > spectacle. Always.
- Data > code. A scene is a config object, not a function.
- One source of truth. Never duplicate a constant.
- The contract is the architecture. The library is the implementation.

---

## PART 21 · POST-LAUNCH ROADMAP (V2)

When the launch is live and stable, the V2 engine returns from `_v2/`:

1. **Restore `lib/experience/`** — the 14-module engine is intact and typed.
2. **Wire `sceneRegistry.ts` into `SceneDirector.buildScript`** — replace the
   imperative `beat()` calls with reads from the declarative `SceneConfig[]`.
   This is the work that was started but deferred for the launch.
3. **Restore the WebGL world** — `IntelligenceWorld.vue` (1,461 lines, needs
   splitting into a Render Director + per-scene particle layouts + shader
   module before it returns — it violates the 300-line limit 5× over).
4. **Re-introduce the master timeline** — one GSAP timeline, scenes plug in
   as data, ScrollController scrubs it. The config pattern (§14.2) becomes
   the live contract, not just the V2 design.
5. **Swap test:** replace GSAP with Motion One. Only the MotionDirector
   adapter changes. If anything else breaks, the architecture is wrong.

V2 is not a rewrite. It's re-enabling what's archived, with the registry layer
that was missing.

---

_END OF SPEC. Everything else is reference._