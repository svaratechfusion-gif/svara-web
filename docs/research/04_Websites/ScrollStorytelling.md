# Scroll Storytelling

## Source: Apple Vision Pro

**Observation:** Scroll moves narrative, not page. The experience is continuous. There are no page breaks, no section headers, no "scroll down to continue" prompts. The scroll position directly maps to narrative progress.

**Decision:** Adopt continuous scroll narrative.

**Reason:** Creates continuity. The visitor learns the category as one flowing story, not a series of disconnected sections.

**Implementation:** Master Timeline scrubbed by scroll progress. Single GSAP timeline mapped to 0–1 scroll position. No page breaks.

**References:** https://www.apple.com/apple-vision-pro/

---

## Source: Stripe Sessions

**Observation:** Camera perspective shifts with scroll. The world is 3D but the narrative is linear. Each scroll position reveals a new layer of understanding.

**Decision:** Adopt camera-driven scene transitions.

**Reason:** Camera movement gives the visitor a sense of progress without needing UI indicators. The changing perspective signals "you are moving forward."

**Implementation:** CameraController with 5 shot types (Static, Pull Back, Orbit, Fly Through, Rise). Each scene has a defined camera movement that maps to scroll position.

**References:** https://stripe.com/sessions
