---
tags: [brand, frontend, design-system, stable]
updated: 2026-07-13
---

# Typography

Tokens declared in `styles/design-tokens.css` `:root`. No hardcoded font sizes/families in
component styles — everything reads a `--type-*` / `--font-*` token.

## Families

```css
--font-sans: "Geist Sans", "Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

One sans family site-wide (Geist, via `@fontsource/geist-sans`, with Inter as fallback —
`@fontsource/inter` and `@fontsource/ibm-plex-sans` are also installed dependencies).
Mono (`@fontsource/jetbrains-mono`) is reserved for **technical labels only** — eyebrows,
section labels, mono-styled captions, telemetry chips — never body copy.

## Scale

```css
--type-display: clamp(96px, 10vw, 180px);   /* hero H1 */
--type-title:   clamp(48px, 6vw, 96px);      /* section titles */
--type-h3:      clamp(28px, 3vw, 40px);
--type-lead:    24px;
--type-body:    20px;
--type-small:   16px;
--type-caption: 14px;
--type-label:   12px;
```

Section titles across the homepage additionally clamp locally, e.g.
`clamp(34px, 4.4vw, 64px)` — check the section component before assuming `--type-title`
applies verbatim; several sections tune their own clamp for their specific layout column width.

## Line-height / tracking / weight

```css
--leading-display: 1.1;
--leading-title: 1.1;
--leading-body: 1.7;
--leading-tight: 1.2;

--tracking-display: -3px;      /* -1.5px on mobile, see responsive shift below */
--tracking-title: -0.02em;
--tracking-body: 0;
--tracking-label: 0.08em;      /* eyebrows/labels — always uppercase + this tracking */

--weight-extrabold: 800;
--weight-bold: 700;
--weight-semibold: 600;
--weight-medium: 500;
--weight-regular: 400;
```

`--paragraph-max: 620px` — every body paragraph gets a max-width for readable line length;
never let body copy run full-container-width.

## Responsive shifts

At `max-width: 768px`, `--tracking-display` tightens to `-1.5px` and `--type-body` drops to
`18px` (defined directly in the media-query block in `design-tokens.css`, not a separate token
set).

## Usage rule

The tag carries meaning (one `<h1>` per page, no skipped heading levels — SEO/a11y baseline);
the class/token carries the look. Never pick a heading level for its visual size. See
[[Colors]] for how title color pairs with typography (`--color-text` for headings,
`--color-text-secondary` for supporting copy).

## Related

[[Colors]] · [[Visual Language]] · [[Brand Strategy]]
