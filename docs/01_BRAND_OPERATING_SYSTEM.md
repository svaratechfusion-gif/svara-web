# SVARA EXPERIENCE SPECIFICATION
## 01 — BRAND OPERATING SYSTEM

**Type:** SES
**Status:** Source of Truth

---

## Identity

SVARA is the intelligence infrastructure for enterprises whose operational data has outpaced human interpretation.

**Tagline:** Engineering The Intelligence Layer Of Tomorrow.
**Voice:** Objective, restrained, precise. No hype. No superlatives without proof.
**Tone:** Calm authority. We state facts. We do not sell.

---

## Visual Identity

| Element | Value |
|---------|-------|
| Background | `#f9fafc` (off-white, cool) |
| Primary | `#0a2540` (deep navy) — all text |
| Muted | `#6b7280` — secondary text |
| Accent / SVARA Blue | `#5d8fbe` — links, CTAs |
| Electric Blue | `#89d3ff` — hover, active states |
| Signal Red | `#ff3d57` — error, warning |
| Divider | `#e5e7eb` — borders, rules |

*CSS custom properties: `--color-bg`, `--color-primary`, `--color-muted`, `--color-accent`, `--color-divider`, `--color-svara-blue`, `--color-electric-blue`, `--color-signal-red`*

---

## Typography

| Role | Font | Weight |
|------|------|--------|
| Hero | Geist Sans | 700 |
| Heading H2 | Geist Sans | 700 |
| Heading H3 | Geist Sans | 700 |
| Body | Geist Sans | 400 |
| Caption | Geist Sans | 500 |

*Self-hosted via `@fontsource/geist-sans`. No Google Fonts dependency.*

---

## Messaging Rules

1. **First-person is reserved for the Invitation act.** All other content is third-person objective.
2. **No "learn more" buttons.** CTAs state the destination: "Explore Platform".
3. **Claims need evidence.** Every assertion has a supporting fact or link.
4. **No superlatives without proof.** "Best" needs a benchmark. "Only" needs a comparison.
5. **No pricing on the website.** Pricing is discussed in conversations.
6. **No team bios on the homepage.** Company page owns team content.
7. **No feature lists on the homepage.** Features are evidence, not content.

---

## Spacing

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |
| `--space-9` | 96px |
| `--space-10` | 128px |
| `--space-11` | 160px |

---

## Component Styles

**Cards (`.card-glass`):** Dark glass. Float, never boxed. Blur + thin border + soft shadow. Hover lifts via `translateY(-6px)` + glow.

**Links (`.link-explore`):** No background. No scale change. Arrow travels right on hover. Replaces button styling entirely.

---

**End of SES-01.**
