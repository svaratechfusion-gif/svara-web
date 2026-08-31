---
tags: [brand, frontend, design-system, stable]
updated: 2026-07-13
---

# Colors

All color declared in `styles/design-tokens.css` `:root`. **Never** hardcode a hex value or
raw color in a component's `<style>` block — if a value is missing, add the token here first.

## Material System (Phase 01B · [[Decision Log|ADR-0010]])

As of the 2026 rebuild the palette is a **physical material system**, not flat white+blue.
Full token layer in `styles/design-tokens.css`. Lavender & vanilla are **atmospheric accents** —
never a dominant purple field or fluorescent yellow-green. Deep navy anchors type + brand.

```css
/* CANVAS — environment surfaces (never pure #FFFFFF) */
--canvas-primary:       #F7F5F1;   /* ceramic off-white — warm, physical */
--canvas-warm:          #F2EFE4;   /* warm vanilla, desaturated from #F1FEC8 */
--canvas-cool:          #F1F3F6;   /* cool ceramic */
--canvas-lavender-mist: #ECEAF3;   /* atmospheric lavender from #D2C3F6 */
/* INK */
--ink-primary: #14223F;  --ink-secondary: #55607A;  --ink-muted: #8A93A6;  --ink-inverse: #F7F5F1;
/* BRAND */
--brand-navy: #102A5B;   --brand-blue: #2F7FE6;   /* blue = interactive states ONLY */
/* MATERIAL */  ceramic / frost / crystal / titanium / aluminium / graphite
/* LIGHT */     --light-warm #FBF4DD · --light-cool #E7EEF6 · --light-lavender #E7E1F3
/* EDGE */      --edge-soft · --edge-glass · --edge-metal   (prefer over hard borders)
/* SHADOW */    --shadow-contact · --shadow-elevated · --shadow-atmospheric
```

**Compatibility layer.** The legacy `--color-*` names are re-pointed at the material tokens
(`--color-bg → --canvas-primary`, `--color-text → --ink-primary`, `--color-ink-strong → --brand-navy`,
`--color-accent → --brand-blue`, …), so every existing page inherited the refined ceramic canvas +
deep-navy ink with **no redesign**. New code should read the **material tokens** directly; treat
`--color-*` as the legacy alias surface.

## Glass system

```css
--glass-bg: rgba(255, 255, 255, 0.18);
--glass-blur: 24px;
--glass-border: 1px solid rgba(255, 255, 255, 0.35);
--glass-reflection: linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0) 38%);
--glass-radius: var(--radius-glass);   /* 28px */
--glass-shadow: var(--shadow-glass);
```

One glass material recipe reused everywhere (`app/components/glass/`) — panels, product
capsules, the CTA core. Heavier variants (e.g. Technology division monoliths) bump
`--glass-blur` locally rather than inventing a second recipe.

## Shadows — ambient-first

```css
--shadow-soft:  0 1px 6px rgba(17, 17, 17, 0.04);
--shadow-med:   0 2px 8px rgba(17, 17, 17, 0.04), 0 16px 48px rgba(16, 42, 91, 0.05);
--shadow-large: 0 2px 10px rgba(17, 17, 17, 0.045), 0 28px 80px rgba(16, 42, 91, 0.06);
--shadow-glass: 0 1px 6px rgba(16, 42, 91, 0.04), 0 18px 56px rgba(16, 42, 91, 0.05);
```

Always a tight contact shadow paired with a wide, low-alpha ambient shadow — never a single
heavy drop shadow.

## Opacity / blur scale

```css
--opacity-faint: 0.04;      /* background structure (grid lines, blueprint layer) */
--opacity-subtle: 0.08;
--opacity-muted: 0.4;
--opacity-secondary: 0.64;

--blur-glass: 24px;
--blur-overlay: 16px;
--blur-nav: 12px;
```

## Legacy aliases

`design-tokens.css` re-points old `terminal.css` variable names (`--bg`, `--fg`,
`--fg-muted`, `--accent`, `--header-height`, …) at the V2 tokens above, so older/V1 content
pages (`KnowledgeProductLayout.vue` and its consumers) inherit the current palette without
being touched. Don't add new code against the legacy names — use the `--color-*` tokens
directly.

## Related

[[Typography]] · [[Visual Language]] · [[Brand Strategy]]
