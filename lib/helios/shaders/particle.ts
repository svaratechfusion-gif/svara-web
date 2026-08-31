// Helios · shaders — the particles themselves.
// Frosted-glass look: base color (from instanceColor) softened toward
// white, brightened at grazing angles (fresnel rim) so each sphere reads
// like a small glass bead rather than a flat dot. No bloom, no neon —
// same restrained palette the rest of the site uses for glass surfaces.

export const particleVertexShader = /* glsl */ `
  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    #ifdef USE_INSTANCING
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);
    #else
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    #endif
    vViewDir = normalize(-mvPosition.xyz);
    #ifdef USE_INSTANCING_COLOR
    vColor = instanceColor;
    #else
    vColor = vec3(1.0);
    #endif
    gl_Position = projectionMatrix * mvPosition;
  }
`

export const particleFragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.2);
    vec3 base = mix(vColor, vec3(1.0), 0.4);
    vec3 color = mix(base, vec3(1.0), fresnel * 0.85);
    float alpha = uOpacity * (0.55 + fresnel * 0.45);
    gl_FragColor = vec4(color, alpha);
  }
`
