// SVARA Resonance — field vertex shader (Prototype B1.1).
// Art direction of the SAME engine (no Bessel/architecture change). uProgress
// (0 dormant … 1 lock) makes the invisible law visible:
//   DISTURBANCE  a travelling front from uEntry — one region reacts, then
//                neighbours, then the field; a brief directional shove as it passes
//   VIBRATION    node-aware: antinodes unstable, future nodes calm (structure
//                is felt through behaviour before position)
//   MIGRATION    a 3-tier hierarchy via aFlow: primary leads (clean, reveals the
//                dominant geometry) → secondary fills → micro settles (turbulent)
//   DISCOVERY    a global vibration calm sharpens the lines into recognition
//   LOCK         ordered but alive
// Lavender peaks at discovery, then settles to an optical memory. uArt gates all
// B1.1 additions (0.0 = original B1 behaviour, for ?version=b1 comparison).

uniform float uTime;
uniform float uAmplitude;
uniform float uSize;
uniform float uDpr;
uniform float uProgress;
uniform float uArt;           // 1 = B1.1 art direction, 0 = original B1
uniform float uReview;        // 1 = static review (disable aerial fade so the
                              //     top-down camera distance can't clip alpha)
uniform vec2  uEntry;         // signal entry point (field-local xz)
uniform vec2  uPointer;
uniform float uPointerForce;
uniform float uPointerRadius;

attribute float aSize;
attribute float aSeed;
attribute float aSpec;
attribute float aTension;
attribute float aEnergy;
attribute float aDelay;
attribute float aFlow;        // 0 primary (leads) .. 1 micro (settles last)
attribute vec3  aTint;
attribute vec3  aTarget;

varying float vSpec;
varying vec3  vTint;
varying float vFade;
varying float vLav;

const float PI = 3.14159265;

vec3 turb3(vec3 p) {
  return vec3(sin(p.x * 3.1 + p.z * 1.7), sin(p.y * 2.3 + p.x * 1.1), cos(p.z * 2.7 + p.y * 1.3));
}

void main() {
  vec3 dormant = position;
  float t = uTime;
  float pr = uProgress;
  float ph = aSeed * 6.2831853;
  vec3 tremor = vec3(sin(t * 1.6 + ph), sin(t * 2.2 + ph * 1.7), cos(t * 1.9 + ph * 0.7));

  // ---- disturbance front: spatial (B1.1) vs regional (B1) onset ----
  float distN = clamp(length(dormant.xz - uEntry) / 6.6, 0.0, 1.0);
  float frontLead = mix(aDelay * 0.10, distN * 0.16, uArt);
  float front = smoothstep(0.0, 0.14, pr - frontLead);

  // ---- migration parameter: hierarchy stagger (B1.1) or B1 window ----
  float mStart = mix(0.40 + aDelay * 0.20, 0.38 + aFlow * 0.16 + aDelay * 0.10, uArt);
  float mEnd   = mix(0.80 + aDelay * 0.14, 0.72 + aFlow * 0.16 + aDelay * 0.12, uArt);
  float m = smoothstep(mStart, mEnd, pr);
  float over = sin(m * PI) * (aSeed - 0.5) * 0.16 * aEnergy;
  float me = clamp(m + over * (1.0 - m), 0.0, 1.15);
  float mc = clamp(me, 0.0, 1.0);

  // ---- curved transport; primary clean, micro looser/more turbulent (B1.1) ----
  vec3 dir = aTarget - dormant;
  vec2 perp = normalize(vec2(-dir.z, dir.x) + vec2(1e-4));
  vec3 pos = mix(dormant, aTarget, mc);
  float arcEnv = sin(mc * PI);
  float arcScale = mix(1.0, mix(0.7, 1.4, aFlow), uArt);
  pos.xz += perp * arcEnv * (0.12 + 0.32 * length(dir)) * (aSeed - 0.5) * arcScale;
  float turbScale = mix(1.0, mix(0.5, 1.5, aFlow), uArt);
  pos += turb3(dormant * 0.9 + t * 0.15) * arcEnv * 0.05 * (0.4 + aEnergy) * turbScale;

  // ---- disturbance shove: brief directional push as the front sweeps by (B1.1) ----
  float pulse = front * (1.0 - front) * 4.0;
  vec2 propDir = normalize(dormant.xz - uEntry + vec2(1e-4));
  pos.xz += propDir * pulse * (0.03 * uArt) * (1.0 - mc);

  // ---- vibration: node-aware behaviour, ramped by the front, calmed at discovery ----
  float behavB1  = mix(1.0, 0.15 + 0.85 * aEnergy, smoothstep(0.16, 0.40, pr));
  float behavB11 = mix(1.0, 0.12 + 0.88 * aEnergy, smoothstep(0.14, 0.40, pr));
  float behav = mix(behavB1, behavB11, uArt);
  float settle = mix(1.0, 0.12, mc);
  float discovery = smoothstep(0.72, 0.90, pr) * (1.0 - smoothstep(0.93, 1.0, pr));
  float vibA = uAmplitude * (0.6 + 1.8 * aEnergy) * front * behav * settle * (1.0 - 0.45 * discovery * uArt);
  pos += tremor * vibA;

  // ---- dormant tension + currents: fade before migration ----
  float dormW = 1.0 - smoothstep(0.10, 0.42, pr);
  float c = pos.x * 0.26 - pos.z * 0.2 + t * 0.045;
  vec2 current = vec2(sin(c + pos.z * 0.3), cos(c - pos.x * 0.3));
  pos.xz += current * (uAmplitude * 2.6) * aTension * dormW;
  float w1 = sin(dormant.x * 1.05 + dormant.z * 0.7 - t * 0.5);
  float w2 = sin(dormant.x * 0.4 - dormant.z * 1.25 - t * 0.31);
  pos.y += (w1 * 0.6 + w2 * 0.4) * uAmplitude * aTension * dormW;

  // ---- pointer pressure: authority fades as resonance takes over ----
  float ptrAuth = mix(1.0, 0.10, smoothstep(0.12, 0.9, pr));
  vec2 toP = pos.xz - uPointer;
  float pd = length(toP);
  float pf = smoothstep(uPointerRadius, 0.0, pd) * uPointerForce * ptrAuth;
  pos.xz += normalize(toP + vec2(1e-4)) * pf * 0.045;
  pos.y  += pf * 0.012;

  // ---- lock micro-life: ordered but never static ----
  float lock = smoothstep(0.9, 1.0, pr);
  pos += tremor * uAmplitude * 0.10 * lock;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float att = 4.4 / max(-mv.z, 0.001);
  gl_PointSize = uSize * aSize * att * uDpr;

  // Aerial depth fade — DISABLED in static review: the top-down review camera
  // sits beyond the fade's far cutoff, which would otherwise drive alpha to 0
  // (the B1.2 "blank canvas" bug).
  vFade = mix(smoothstep(12.0, 2.5, -mv.z), 1.0, uReview);
  vSpec = aSpec;
  vTint = aTint;

  // ---- lavender arc: rise into a discovery peak, settle to an optical memory ----
  float lavB1  = smoothstep(0.4, 1.0, pr);
  float lavB11 = smoothstep(0.45, 0.85, pr) * (1.0 - 0.5 * smoothstep(0.90, 1.0, pr));
  vLav = mix(lavB1, lavB11, uArt) * aEnergy;
}
