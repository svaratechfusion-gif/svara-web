# DESIGN TOKENS

Everything measurable. No guessing.

---

## Spacing Scale

| Token | Pixels | rem |
|-------|--------|-----|
| `--space-1` | 4px | 0.25 |
| `--space-2` | 8px | 0.5 |
| `--space-3` | 12px | 0.75 |
| `--space-4` | 16px | 1 |
| `--space-5` | 24px | 1.5 |
| `--space-6` | 32px | 2 |
| `--space-7` | 48px | 3 |
| `--space-8` | 64px | 4 |
| `--space-9` | 96px | 6 |
| `--space-10` | 128px | 8 |
| `--space-11` | 160px | 10 |

---

## Typography Scale

| Token | Desktop | Mobile | Weight | Line Height |
|-------|---------|--------|--------|-------------|
| `--text-hero` | 120px | clamp(3rem, 9vw, 7.5rem) | 700 | 1.02 |
| `--text-h2` | 72px | clamp(2.5rem, 6vw, 4.5rem) | 700 | 1.05 |
| `--text-h3` | 32px | 32px | 700 | 1.15 |
| `--text-body` | 20px | 20px | 400 | 1.6 |
| `--text-caption` | 16px | 16px | 500 | 1.4 |

---

## Animation Scale

| Token | Duration | Ease |
|-------|----------|------|
| `--duration-fast` | 0.3s | ease-out |
| `--duration-medium` | 0.6s | ease-out |
| `--duration-hero` | 1.2s | ease-out |
| `--duration-page` | 2s | ease-out |
| `--duration-scene` | 3s | ease-in-out |
| `--duration-transition` | 0.5s | ease |

---

## Camera Scale

| Token | Value | Scene |
|-------|-------|-------|
| `--cam-fov-default` | 45° | All |
| `--cam-fov-wide` | 60° | Scale, Collapse |
| `--cam-orbit-speed` | 0.3 rad/s | Intelligence |
| `--cam-push-speed` | 0.5 units/s | Emergence |
| `--cam-pull-speed` | 0.8 units/s | Collapse, Scale |
| `--cam-rise-speed` | 0.4 units/s | Industries |
| `--cam-fly-speed` | 1.2 units/s | Products |
| `--cam-transition` | 2s | Between scenes |

---

## Motion Scale

| Token | Value |
|-------|-------|
| `--motion-lenis-lerp` | 0.1 |
| `--motion-lenis-lerp-reduced` | 1.0 |
| `--motion-scrub-duration` | 1s |
| `--motion-reveal-scale` | 0.75 |
| `--motion-reveal-rotate` | -6deg |
| `--motion-reveal-y` | 40px |

---

## Particle Scale

| Token | Desktop | Mobile |
|-------|---------|--------|
| `--particle-count-max` | 50,000 | 10,000 |
| `--particle-size-min` | 0.5px | 0.5px |
| `--particle-size-max` | 3px | 2px |
| `--particle-opacity-min` | 0.2 | 0.3 |
| `--particle-opacity-max` | 0.9 | 0.9 |
| `--particle-speed` | 0.5 units/s | 0.3 units/s |
| `--particle-connection-distance` | 150px | 100px |

---

## Glow Scale

| Token | Value |
|-------|-------|
| `--glow-none` | 0% |
| `--glow-subtle` | 4% |
| `--glow-medium` | 8% |
| `--glow-strong` | 15% |
| `--glow-max` | 25% |

---

## Glass Scale

| Token | Value |
|-------|-------|
| `--glass-blur-min` | 8px |
| `--glass-blur-default` | 24px |
| `--glass-blur-max` | 40px |
| `--glass-opacity-default` | 0.74 |
| `--glass-opacity-solid` | 0.95 |
| `--glass-border-opacity` | 0.12 |
| `--glass-radius` | 8px |
| `--glass-padding` | 48px |

---

## Depth Scale

| Token | Value | Used By |
|-------|-------|---------|
| `--z-base` | 0 | Content |
| `--z-sticky` | 10 | Sticky scenes |
| `--z-header` | 30 | AppHeader |
| `--z-loader` | 40 | PageLoader |
| `--z-canvas` | 1 | Three.js world |
| `--z-overlay` | 50 | Modals, overlays |
| `--z-tooltip` | 60 | Tooltips |

---

## Shadow Scale

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 14px 44px rgba(7, 17, 31, 0.08)` |
| `--shadow-lg` | `0 26px 90px rgba(93, 143, 190, 0.18)` |

---

**End of Design Tokens. Everything measurable. No guessing.**
