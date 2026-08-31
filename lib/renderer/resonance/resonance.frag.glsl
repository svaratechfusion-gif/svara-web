// SVARA Resonance — grain fragment shader (Prototype B1).
// Each point sprite is a tiny lit hemisphere (fake sphere normal) so grains
// read as physical matter: highlight side, shadow side, crisp glint. Material
// character (graphite / titanium / warm-silver / ceramic) rides in on vTint +
// vSpec. Lavender is an OPTICAL CONSEQUENCE of resonance — it tints only the
// specular glint, only on energetic grains (vLav), never the body colour. The
// viewer should half-question whether the lavender is physically there.

precision highp float;

uniform vec3  uLightDir;   // eye-space key direction (upper-right, toward viewer)
uniform vec3  uWarm;       // warm specular glint colour
uniform vec3  uAmbient;    // ambient fill
uniform vec3  uLavender;   // restrained lavender-mist glint
uniform float uExposure;

varying float vSpec;
varying vec3  vTint;
varying float vFade;
varying float vLav;

void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(uv, uv);
  if (r2 > 1.0) discard;               // round grain

  float z = sqrt(1.0 - r2);
  vec3 N = normalize(vec3(uv.x, -uv.y, z));
  vec3 L = normalize(uLightDir);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);

  float diff = clamp(dot(N, L), 0.0, 1.0);
  diff = diff * diff * (3.0 - 2.0 * diff);            // sharpen the micro-shadow
  float spec = pow(clamp(dot(N, H), 0.0, 1.0), 48.0) * vSpec;
  float rim  = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6) * 0.14;

  // warm glint, with a faint lavender rider that only appears under resonance
  vec3 glint = mix(uWarm, uLavender, clamp(vLav * 0.55, 0.0, 0.5));
  vec3 col = vTint * (0.08 + 0.64 * diff)
           + uAmbient * 0.20
           + glint * (spec + rim * (0.4 + 0.6 * vSpec));
  col *= uExposure;

  float alpha = smoothstep(1.0, 0.62, r2) * vFade;
  gl_FragColor = vec4(col, alpha);
}
