# SVARA EXPERIENCE SPECIFICATION
## 04 — DESIGN SYSTEM

**Type:** SES
**Status:** Source of Truth

---

## Visual Identity

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#f9fafc` | Page background |
| `--color-primary` | `#07111f` | All text |
| `--color-muted` | `rgba(7, 17, 31, 0.58)` | Secondary text |
| `--color-svara-blue` | `#5d8fbe` | Links, CTAs, accent |
| `--color-electric-blue` | `#89d3ff` | Hover, active, glow |
| `--color-signal-red` | `#ff3d57` | Error, warning |
| `--color-surface` | `rgba(255, 255, 255, 0.74)` | Card backgrounds |
| `--color-divider` | `rgba(7, 17, 31, 0.12)` | Borders, rules |

---

## Typography

| Class | Size | Weight | Line Height |
|-------|------|--------|-------------|
| `.text-hero` | `clamp(3rem, 9vw, 7.5rem)` | 700 | 1.02 |
| `.text-h2` | `clamp(2.5rem, 6vw, 4.5rem)` | 700 | 1.05 |
| `.text-h3` | `2rem` | 700 | 1.15 |
| `.text-body` | `1.25rem` | 400 | 1.6 |
| `.text-caption` | `1rem` | 500 | 1.4 |

Font: Geist Sans (self-hosted via Fontsource)

---

## Component Styles

### Card Glass (`.card-glass`)
```css
border-radius: 8px;
border: 1px solid var(--color-divider);
background: var(--color-surface);
backdrop-filter: blur(24px);
box-shadow: var(--shadow-sm);
padding: 48px;
transition: box-shadow 0.3s, border-color 0.3s;
```
Hover: `translateY(-6px)`, shadow → `var(--shadow-lg)`, border → electric blue.

### Link Explore (`.link-explore`)
```css
display: inline-flex;
align-items: center;
gap: 8px;
color: var(--color-svara-blue);
font-weight: 600;
```
Hover: arrow icon `translateX(4px)`. No background, no scale.

### Scroll Reveal (`.reveal-pending`)
```css
transform: scale(0.75) rotate(-6deg) translateY(40px);
```
Applied as GSAP `.from()` initial state. Removed on reveal. Reduced motion: transform: none.

---

## Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 14px 44px rgba(7, 17, 31, 0.08)` |
| `--shadow-lg` | `0 26px 90px rgba(93, 143, 190, 0.18)` |

---

## Duration Tokens

| Token | Value |
|-------|-------|
| `--duration-fast` | 0.3s |
| `--duration-medium` | 0.6s |
| `--duration-hero` | 1.2s |
| `--duration-page` | 2s |

---

## Scene Minimum Height

Every section is one scene: `--scene-min-height: 1400px`.

---

## Responsive Breakpoints

| Breakpoint | Min Width |
|------------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

**End of SES-04.**
