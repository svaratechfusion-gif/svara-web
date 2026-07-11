// Helios Engine — GLSL. One shader pair: the connection lines.
// Lines carry per-vertex color and a per-vertex `stretch` attribute
// (current length / rest length); the fragment fades a line out as it
// stretches, which is what makes cursor displacement feel elastic.
// No bloom, no additive neon — plain alpha blending on white.

export const connectionVertexShader = /* glsl */ `
  attribute float aStretch;
  attribute vec3 aColor;
  varying float vStretch;
  varying vec3 vColor;

  void main() {
    vStretch = aStretch;
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const connectionFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uMaxStretch;
  varying float vStretch;
  varying vec3 vColor;

  void main() {
    // 1.0 at rest → 0.0 at uMaxStretch
    float fade = 1.0 - smoothstep(1.0, uMaxStretch, vStretch);
    float alpha = uOpacity * fade;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`
