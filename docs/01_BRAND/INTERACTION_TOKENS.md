# INTERACTION TOKENS

Defined behaviors. Measurable properties. No guessing.

---

## Hover Tokens

| Token | Card Glass | Link Explore | Brand Mark | Button |
|-------|------------|-------------|------------|--------|
| **Type** | Magnetic | Translate | Glow | Magnetic |
| **Response Time** | 120ms | 80ms | 150ms | 100ms |
| **Scale** | 1.0 | 1.0 | 1.02 | 1.04 |
| **Translate Y** | -6px | 0 | 0 | -2px |
| **Translate X** | 0 | +4px (arrow) | 0 | 0 |
| **Blur** | 0 | 0 | 0 | 0 |
| **Glow** | 8% | 0 | 4% | 4% |
| **Border Color** | Electric blue | — | — | — |
| **Sound** | Optional | Optional | Optional | Optional |
| **Exit** | 180ms | 120ms | 200ms | 150ms |

---

## Click Tokens

| Token | Card Glass | Link Explore | CTA Button |
|-------|------------|-------------|------------|
| **Type** | Scale + Fade | Instant nav | Scale |
| **Response Time** | 60ms | — | 50ms |
| **Scale** | 0.98 | — | 0.96 |
| **Duration** | 100ms | — | 80ms |
| **Ripple** | No | No | Optional |

---

## Scroll Tokens

| Token | Value |
|-------|-------|
| **Type** | Smooth (Lenis) |
| **Lerp** | 0.1 |
| **Reduced Motion Lerp** | 1.0 |
| **Inertia** | Physical (Lenis default) |
| **Wheel Multiplier** | 1.0 |
| **Touch Multiplier** | 1.0 |
| **Orientation** | Vertical only |

---

## Navigation Tokens

| Token | Desktop | Mobile |
|-------|---------|--------|
| **Type** | Top bar | Hamburger drawer |
| **Transition** | Opacity + TranslateY | Slide from right |
| **Duration** | 500ms | 300ms |
| **Blur When Scrolled** | 22px | 22px |
| **Background Scrolled** | rgba(255,255,255,0.82) | Same |
| **Item Gap** | 24px (scrolled: 16px) | Stacked |
| **Item Opacity (idle)** | 0.7 | 0.7 |
| **Item Opacity (hover)** | 1.0 | 1.0 |
| **Logo Size** | text-lg (scrolled: text-base) | Same |

---

## Particle Interaction Tokens

| Token | Value |
|-------|-------|
| **Mouse Influence Radius** | 200px |
| **Mouse Influence Strength** | 0.3 |
| **Mouse Influence Falloff** | Ease-out quadratic |
| **Touch Influence Radius** | 150px |
| **Touch Influence Strength** | 0.2 |
| **Response Time** | 50ms |
| **Return Time** | 300ms |

---

## Page Transition Tokens

| Token | Value |
|-------|-------|
| **Cold Load** | PageLoader → scale 0.97→1 |
| **Cold Load Duration** | 700ms |
| **Client Nav** | No loader, instant |
| **Route Change** | Immediate (Nuxt) |
| **Font Swap** | `document.fonts.ready` → `ScrollTrigger.refresh()` |

---

**End of Interaction Tokens. Defined behaviors. Measurable properties. No guessing.**
