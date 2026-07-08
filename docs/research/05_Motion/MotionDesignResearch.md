# Motion Design Research

## Source: Active Theory

**Observation:** Scroll-driven 3D narratives. The browser is treated as a 3D canvas, not a document. Every scroll position reveals new geometry, new camera angles, new information layers.

**Decision:** Adopt persistent 3D canvas across all scenes.

**Reason:** A single 3D world that transforms with scroll creates continuity. The visitor never feels like they left the experience.

**Implementation:** IntelligenceWorld — single Three.js canvas that never unmounts. SceneManager changes world contents per scene.

**References:** https://activetheory.net/

---

## Source: Resn

**Observation:** Experimental web experiences that break conventions but always serve the message. Motion is used to create surprise, which creates memory.

**Decision:** Each scene should have one surprising motion moment.

**Reason:** Surprise creates memorability. Enterprise buyers see thousands of websites. They remember the one that surprised them.

**Implementation:** Scene-specific motion highlights (Scene 01: particles assembling, Scene 02: fragmentation, Scene 03: chain flow).

**References:** https://resn.co.nz/

---

## Source: Dogstudio

**Observation:** Emotional motion design. Motion creates feeling before understanding. The emotional arc of the experience is as important as the information arc.

**Decision:** Define emotional arc alongside narrative arc.

**Reason:** Enterprise buyers make decisions emotionally and justify rationally. The emotional arc (curiosity -> concern -> understanding -> relief -> confidence -> trust -> inspiration -> action) is intentional.

**Implementation:** 8 emotions mapped to 8 scenes. Lighting, camera, and particle behavior all serve the emotion.

**References:** https://dogstudio.co/
