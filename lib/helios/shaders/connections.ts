// Helios · shaders — the connection lines.
// Per-vertex: color, stretch (current/rest length), and a region weight
// boost (aBoost). Stretch fades an over-extended line (elastic feel);
// boost raises alpha where anatomy calls for visually thicker lines
// (neck/chest) and lowers it on the head. WebGL ignores linewidth, so
// weight-on-white IS the thickness channel. No bloom, no additive neon.

export const connectionVertexShader = /* glsl */ `
  attribute float aStretch;
  attribute float aBoost;
  attribute vec3 aColor;
  varying float vStretch;
  varying float vBoost;
  varying vec3 vColor;

  void main() {
    vStretch = aStretch;
    vBoost = aBoost;
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const connectionFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uMaxStretch;
  varying float vStretch;
  varying float vBoost;
  varying vec3 vColor;

  void main() {
    // 1.0 at rest → 0.0 at uMaxStretch
    float fade = 1.0 - smoothstep(1.0, uMaxStretch, vStretch);
    float alpha = clamp(uOpacity * vBoost, 0.0, 1.0) * fade;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`
