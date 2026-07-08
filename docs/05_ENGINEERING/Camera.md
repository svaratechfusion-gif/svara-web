# Camera Language

**Business:** Every camera movement communicates meaning.
**User:** Subconsciously read each shot as narrative punctuation.
**Owner:** `CameraController` (lib/experience/)
**Acceptance:** No code outside `CameraController` reads or writes camera state.

---

## Shots

| Shot | Description | Use |
|------|-------------|-----|
| Static | Fixed position, no movement | Arrival, scene open, settle |
| Slow Push | Gentle forward tracking | Core formation, Reconnect |
| Orbit | Circular motion around subject | Intelligence, Product clusters |
| Fly Through | Directed movement through space | Scene transitions, Products |
| Pull Back | Reverse tracking, wider view | Collapse, Scale reveal |
| Rise | Ascending vertical movement | Industries landscapes |
| Cut | Instantaneous, zero interpolation | Collapse midpoint only |

## Per Scene

| Scene | Shot | Start | End |
|-------|------|-------|-----|
| 01 — Birth | Static | — | — |
| 02 — Emergence | Slow Push | 12% | 24% |
| 03 — Intelligence | Orbit | 24% | 36% |
| 04 — Collapse | Pull Back | 36% | 48% |
| 05 — Reconnect | Static | 48% | 60% |
| 06 — Products | Fly Through | 60% | 72% |
| 07 — Industries | Rise | 72% | 84% |
| 08 — Scale | Pull Back | 84% | 92% |
| 09 — Invitation | Static (settle) | 92% | 100% |
