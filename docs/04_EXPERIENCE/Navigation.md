# Navigation

**Business:** The nav is the map. It must be reliable.
**User:** Always know how to get where they're going.
**Owner:** OpenCode
**Acceptance:** Navigation behavior is fully specified for every route.

---

## Behavior

| Context | Nav State | Transition |
|---------|-----------|------------|
| Homepage, scroll < 48vh | Hidden | Opacity 0, translateY(-14px), pointer-events none |
| Homepage, scroll ≥ 48vh | Visible | Opacity 1, translateY(0), pointer-events auto |
| All other pages | Visible from page load | Same as above |
| Any page, scrolled > 40px | Chrome: backdrop blur + shadow | 500ms transition |

## Items

Platform · Products · Technology · Industries · Knowledge · Company

## Mobile

Hamburger menu at < 768px. Same items. Slide-out drawer.
