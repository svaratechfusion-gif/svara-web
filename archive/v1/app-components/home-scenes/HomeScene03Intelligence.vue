<script setup lang="ts">
// Scene 3 — Intelligence. The concept that replaces fragmentation: a
// closed loop where every system feeds every other. The loop is the answer.

// Five capabilities, one loop — buyer-facing naming (V1).
const CAPABILITIES = [
  { id: "observe",    label: "Observe",    angle: -90 },
  { id: "understand", label: "Understand", angle: -18 },
  { id: "predict",    label: "Predict",    angle: 54 },
  { id: "coordinate", label: "Coordinate", angle: 126 },
  { id: "improve",    label: "Improve",    angle: 198 },
];

const R = 120;          // ring radius
const CX = 220, CY = 220; // viewBox center

function point(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

// Ordered pairs — the closed loop, each capability → the next.
const LOOP = CAPABILITIES.map((c, i) => ({
  from: c,
  to: CAPABILITIES[(i + 1) % CAPABILITIES.length]!,
}));
</script>

<template>
  <section class="intelligence" aria-labelledby="intelligence-title">
    <div class="intelligence__inner">
      <p class="section__number">03 · Intelligence</p>
      <h2 id="intelligence-title" class="section__title">
        Enterprise Intelligence Infrastructure.
      </h2>
      <p class="section__lead">
        One loop, not a stack. Every system feeds every other. Intelligence
        compounds — because it has somewhere to come back to.
      </p>

      <div class="intelligence__diagram" data-reveal-item>
        <svg
 viewBox="0 0 440 440" class="intelligence__svg" role="img"
           aria-label="The Intelligence Loop: five capabilities connected in a closed ring around a central SVARA hub">
          <!-- The closed loop — solid, continuous, contrast with Scene 2 -->
          <g
class="solution__loop" stroke="var(--color-svara-blue)" stroke-width="2"
            fill="none" stroke-linecap="round">
            <line
              v-for="(edge, i) in LOOP"
              :key="i"
              :x1="point(edge.from.angle, R).x"
              :y1="point(edge.from.angle, R).y"
              :x2="point(edge.to.angle, R).x"
              :y2="point(edge.to.angle, R).y"
            />
          </g>
          <!-- Central hub -->
          <g :transform="`translate(${CX}, ${CY})`">
            <circle r="38" fill="var(--color-primary)" />
            <text
text-anchor="middle" dy="0.36em" font-size="13" font-weight="700"
              fill="var(--color-bg)" letter-spacing="0.05em">SVARA</text>
          </g>

          <!-- Capability nodes -->
          <g>
            <g
              v-for="cap in CAPABILITIES"
              :key="cap.id"
              :transform="`translate(${point(cap.angle, R).x}, ${point(cap.angle, R).y})`"
            >
              <circle
r="32" fill="var(--color-bg)" stroke="var(--color-primary)"
                stroke-width="1.5" />
              <text
text-anchor="middle" dy="0.36em" font-size="11" font-weight="600"
                fill="var(--color-primary)">{{ cap.label }}</text>
            </g>
          </g>
        </svg>
        <p class="solution__caption">
          Observe → Understand → Predict → Coordinate → Improve → back to Observe.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intelligence {
  min-height: 100svh;
  padding: 8rem 1.5rem;
  display: flex;
  align-items: center;
}
.intelligence__inner {
  max-width: 56rem;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}
@media (min-width: 900px) {
  .intelligence__inner {
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
    gap: 4rem;
  }
}
.section__number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
}
.section__title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin-bottom: 1.5rem;
}
.section__lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-muted-strong);
  max-width: 36rem;
}
.intelligence__diagram {
  background: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-card);
  padding: 2.5rem 2rem;
  box-shadow: var(--shadow-sm);
}
.intelligence__svg {
  width: 100%;
  height: auto;
  display: block;
}
.intelligence__caption {
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.9375rem;
  color: var(--color-muted);
  font-style: italic;
}

@media (max-width: 640px) {
  .intelligence { padding: 6rem 1.25rem; }
}
</style>