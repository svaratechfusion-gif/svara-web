# Brand Operating System

**Business:** Ensure every visual and verbal expression is consistent.
**User:** Perceive a unified identity across every touchpoint.
**Owner:** SVARA
**Acceptance:** No two brand documents disagree. The CSS custom properties match this file exactly.

---

## Visual Identity

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#f9fafc` | Page background |
| `--color-primary` | `#07111f` | All text |
| `--color-muted` | `rgba(7, 17, 31, 0.58)` | Secondary text |
| `--color-svara-blue` | `#5d8fbe` | Links, CTAs |
| `--color-electric-blue` | `#89d3ff` | Hover, active, glow |
| `--color-signal-red` | `#ff3d57` | Error, warning |
| `--color-surface` | `rgba(255, 255, 255, 0.74)` | Card backgrounds |
| `--color-divider` | `rgba(7, 17, 31, 0.12)` | Borders |

## Typography

| Class | Size | Weight |
|-------|------|--------|
| `.text-hero` | `clamp(3rem, 9vw, 7.5rem)` | 700 |
| `.text-h2` | `clamp(2.5rem, 6vw, 4.5rem)` | 700 |
| `.text-h3` | `2rem` | 700 |
| `.text-body` | `1.25rem` | 400 |
| `.text-caption` | `1rem` | 500 |

Font: Geist Sans (self-hosted via Fontsource)

## Spacing

`--space-1` through `--space-11` ranging from 4px to 160px.

## Component Styles

**Card Glass:** `border-radius: 8px`, backdrop blur, `box-shadow: var(--shadow-sm)`, padding 48px. Hover: translateY(-6px), electric blue border.

**Link Explore:** Inline flex, SVARA blue, arrow travels right on hover. No background. No scale.
