/**
 * GLSL sources for the halftone dot-field shader.
 *
 * Ported verbatim from the Stackside reference build. The effect IS this
 * shader — every tuning knob is a uniform, so the field is retuned from
 * `styles/divisions-halftone.css` and `HalftoneField.vue` rather than here.
 */

export const VERTEX_SHADER = /* glsl */ `#version 300 es

in vec2 a_position;
out vec2 v_uv;

void main() {
  // Clip space (-1..1) -> uv (0..1). v_uv.y is 1 at the top of the screen,
  // which matches the flipped-Y texture upload (see renderer.ts).
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

export const FRAGMENT_SHADER = /* glsl */ `#version 300 es

precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_source;

uniform vec2 u_resolution;   // canvas size, device px
uniform vec2 u_sourceSize;   // intrinsic source size, px
uniform float u_cell;        // dot cell size, device px
uniform float u_gain;        // exposure applied to the sampled luminance
uniform float u_gamma;       // <1 lifts midtones into larger dots
uniform float u_dotScale;    // dot diameter at full brightness, in cells
uniform float u_softness;    // extra edge blur beyond antialiasing, in cells
uniform float u_mirror;      // 1 = flip the sampled image horizontally
uniform vec2 u_tilt;         // perspective lean, per axis; 0 = flat on
uniform float u_inkSpread;   // how tightly the ink ramp packs around the centre
uniform float u_reveal;      // 0..1 — the developing wave's travel, bottom to top
uniform float u_revealBand;  // wave thickness, in screen heights
uniform vec3 u_inkLight;     // ramp start
uniform vec3 u_inkMid;       // ramp middle
uniform vec3 u_inkDeep;      // ramp end
uniform vec3 u_bg;

/** Maps uv so the texture covers the canvas — the CSS \`object-fit: cover\` rule. */
vec2 coverUv(vec2 uv, vec2 canvas, vec2 tex) {
  float canvasAspect = canvas.x / canvas.y;
  float texAspect = tex.x / tex.y;
  vec2 scale = canvasAspect > texAspect
    ? vec2(1.0, texAspect / canvasAspect)
    : vec2(canvasAspect / texAspect, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

float luma(vec3 color) {
  return dot(color, vec3(0.2126, 0.7152, 0.0722));
}

/**
 * Reads the picture off a plane leaning away from the viewer.
 * A projective divide, not a skew: the far side compresses and the near side
 * spreads, which is what sells it as depth rather than a squash. Only the
 * *sample* position moves — the dot grid stays screen-aligned.
 */
vec2 leanUv(vec2 uv, vec2 tilt) {
  vec2 centred = uv - 0.5;
  float w = max(1.0 + dot(centred, tilt), 0.2);
  return centred / w + 0.5;
}

void main() {
  vec2 cells = max(u_resolution / u_cell, vec2(1.0));
  vec2 cellCenter = (floor(v_uv * cells) + 0.5) / cells;
  vec2 inCell = fract(v_uv * cells);

  // One sample per cell, at its centre — each dot reads as a single mark.
  // Lean first (screen space), then mirror (image space).
  vec2 leaned = leanUv(cellCenter, u_tilt);
  vec2 sampleAt = vec2(u_mirror > 0.5 ? 1.0 - leaned.x : leaned.x, leaned.y);
  vec2 uv = coverUv(sampleAt, u_resolution, u_sourceSize);
  vec3 src = texture(u_source, clamp(uv, 0.0, 1.0)).rgb;
  float lum = pow(clamp(luma(src) * u_gain, 0.0, 1.0), u_gamma);

  // The developing wave climbs from the bottom (0) past the top (1 + band).
  float front = u_reveal * (1.0 + u_revealBand);
  // A gentle S across the width, so the wave reads as a tide.
  float wobble = sin(cellCenter.x * 6.2831853) * 0.02;
  float local = clamp(
    (front - (cellCenter.y + wobble)) / max(u_revealBand, 1e-4),
    0.0,
    1.0
  );
  // Each cell grows into its own brightness as the front passes.
  lum *= local;

  // Half a device pixel, in cell units: the least feather that resolves the edge.
  float feather = max(u_softness, 0.5 / max(u_cell, 1.0));
  // Cap the radius so the feather still fits inside the cell — otherwise the
  // cell bounds clip the dot and it reads as a square, reintroducing the hard
  // corners this effect exists to avoid.
  float maxRadius = max(0.5 - feather, 0.0);
  // Radius varies continuously with brightness — no ramp steps, so a dot grows
  // smoothly instead of popping between sizes as the clip scrubs.
  float radius = mix(-feather, maxRadius * clamp(u_dotScale, 0.0, 1.0), lum);
  float mask = 1.0 - smoothstep(
    -feather,
    feather,
    length(inCell - 0.5) - radius
  );

  // The ramp is keyed to *where the cell sits*, not how bright it is.
  // Brightness already sets the dot's size, so a luminance-keyed ramp would hand
  // its light end to exactly the cells too small to show it.
  float diagonal = (cellCenter.x + (1.0 - cellCenter.y)) * 0.5;
  float t = clamp(0.5 + (diagonal - 0.5) * u_inkSpread, 0.0, 1.0);
  vec3 ink = mix(
    mix(u_inkLight, u_inkMid, clamp(t * 2.0, 0.0, 1.0)),
    u_inkDeep,
    clamp(t * 2.0 - 1.0, 0.0, 1.0)
  );

  fragColor = vec4(mix(u_bg, ink, mask), 1.0);
}
`
