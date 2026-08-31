/**
 * GLSL for the /ecosystem cinematic scene, ported verbatim from the Clarix
 * reference build. Four programs:
 *
 *   1. BG_*        — the full-screen procedural "ASCII grid": rounded-box cells
 *                    that bloom in a rainbow gradient and react to the cursor.
 *   2. HOLO_*      — an onBeforeCompile patch that wraps the hero model in a
 *                    holographic gradient and then dithers it into an ASCII
 *                    half-tone, plus the screen-space intro reveal circle.
 *   3. PARTICLE_*  — the point cloud that spin-assembles the SVARA logo.
 *
 * Every tuning constant is baked in — these are the reference's values.
 */

/* ══ 1 · BACKGROUND ASCII GRID ═══════════════════════════════════════════════ */

/** Writes clip space directly, so the plane ignores the camera entirely. */
export const BG_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  // Lock the plane to the screen completely ignoring the camera
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`

export const BG_FRAG = /* glsl */ `
uniform float time;
uniform vec2 mouse;
uniform vec3 bgColor;
uniform vec2 resolution;
uniform vec3 colorCyan;
uniform vec3 colorBlue;
uniform vec3 colorHotPink;
uniform vec3 colorPeach;
varying vec2 vUv;

// 2D Rotation for organic noise
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
   float pixelSize = 15.0;
   vec2 screenUv = vUv;
   float aspect = resolution.x / resolution.y;
   vec2 aspectUv = vec2(screenUv.x * aspect, screenUv.y);

   vec2 gridUv = aspectUv * (resolution.y / pixelSize);
   vec2 localUv = fract(gridUv) - 0.5;

   // --- 1. Procedural Background Colors ---
   float wave1 = sin(aspectUv.x * 4.0 - time * 0.8);
   float wave2 = cos(aspectUv.y * 3.0 + time * 0.6);
   float combinedWave = smoothstep(-0.8, 0.8, (wave1 + wave2) * 0.5);
   float wavePeach = sin(aspectUv.y * 3.0 - aspectUv.x * 2.0 + time * 0.9) * 0.5 + 0.5;

   vec3 mixColor = mix(colorBlue, colorCyan, combinedWave);
   vec3 pinkTransition = mix(mixColor, colorHotPink, smoothstep(0.1, 0.7, wavePeach));
   mixColor = mix(pinkTransition, colorPeach, smoothstep(0.5, 1.0, wavePeach));
   vec3 lightGridColor = mix(mixColor, vec3(1.0), 0.6);

   // --- 2. ASCII Grid ---
   float boxSize = 0.3 + sin(time * 2.0 + gridUv.x * 0.2 + gridUv.y * 0.2) * 0.1;
   float radius = 0.12;
   float d = length(max(abs(localUv) - (boxSize - radius), 0.0)) - radius;
   float alpha = smoothstep(0.05, 0.0, d);

   // --- 3. Interactive Organic Masking ---
   // Parallax radial mask: center shifts slightly towards the mouse
   vec2 radialCenter = mix(vec2(0.5, 0.5), mouse, 0.3);
   float radialMask = smoothstep(0.7, 0.1, distance(screenUv, radialCenter));

   vec2 p = aspectUv * 3.0;

   vec2 mouseAspect = vec2(mouse.x * aspect, mouse.y);
   float mouseDist = distance(aspectUv, mouseAspect);

   // Multi-layered rotated sine waves for blobs
   float noise = 0.0;
   noise += sin(p.x + time * 0.4) * sin(p.y + time * 0.3);
   p *= rotate2d(1.1);
   noise += sin(p.x * 1.5 - time * 0.5) * sin(p.y * 1.5 + time * 0.2);
   p *= rotate2d(2.3);
   noise += sin(p.x * 2.0 + time * 0.3) * sin(p.y * 2.0 - time * 0.4);

   // Dynamic shape morphing instead of space warping (prevents stretched ray artifacts)
   // Creates an organic ripple/push effect that morphs the blobs near the cursor
   noise += cos(mouseDist * 12.0 - time * 3.0) * smoothstep(0.6, 0.0, mouseDist) * 1.2;

   float blobMask = smoothstep(0.0, 1.5, noise);

   // Extra interactive element: reveal ASCII grid brightly right at the cursor
   float cursorHighlight = smoothstep(0.2, 0.0, mouseDist);

   float finalMask = clamp((radialMask * blobMask) + (cursorHighlight * 0.5), 0.0, 1.0);
   float finalAlpha = alpha * finalMask * 0.85;

   vec3 finalColor = mix(bgColor, lightGridColor, finalAlpha);
   gl_FragColor = vec4(finalColor, 1.0);
}
`

/* ══ 2 · HOLOGRAPHIC ASCII PATCH (onBeforeCompile) ═══════════════════════════ */

export const HOLO_VERT_PREFIX = 'varying vec3 vLocalPosition;\n'

export const HOLO_VERT_BODY = /* glsl */ `
#ifdef USE_INSTANCING
  vLocalPosition = (instanceMatrix * vec4(position, 1.0)).xyz;
#else
  vLocalPosition = position;
#endif
`

export const HOLO_FRAG_PREFIX = [
  'uniform float time;',
  'uniform float edgeBlurAmount;',
  'uniform float uRevealProgress;',
  'uniform vec2 uRevealOrigin;',
  'uniform vec2 resolution;',
  'uniform vec3 colorCyan;',
  'uniform vec3 colorPurple;',
  'uniform vec3 colorBlue;',
  'uniform vec3 colorPeach;',
  'uniform vec3 colorHotPink;',
  'varying vec3 vLocalPosition;',
  '',
].join('\n')

export const HOLO_FRAG_BODY = /* glsl */ `
vec3 vDir = normalize( vViewPosition );
float fresnel = 1.0 - max(dot(vDir, normal), 0.0);
float fresnelPow = pow(fresnel, 2.0); // Softer fresnel falloff

// Procedural waves (softer, slower)
// Bind to local position so waves stick to the geometry during rotation
float wave1 = sin(vLocalPosition.x * 2.0 - time * 1.0);
float wave2 = cos(vLocalPosition.y * 1.5 + time * 0.8);
float wave3 = sin(vLocalPosition.z * 2.5 + time * 0.5);
float combinedWave = (wave1 + wave2 + wave3) / 3.0;
combinedWave = smoothstep(-0.5, 0.5, combinedWave); // Softer mixing

float wavePeachRaw = sin(vLocalPosition.y * 2.0 - vLocalPosition.x * 1.0 + time * 1.2);
// Normalize to 0..1 for clean blending
float wavePeach = wavePeachRaw * 0.5 + 0.5;

// 1. Base cold colors (Blue -> Cyan)
vec3 mixColor = mix(colorBlue, colorCyan, combinedWave);

// 2. Clean transition to warm colors
// Smooth, gentle transitions between the pastel tones
vec3 pinkTransition = mix(mixColor, colorHotPink, smoothstep(0.2, 0.8, wavePeach));
mixColor = mix(pinkTransition, colorPeach, smoothstep(0.5, 0.95, wavePeach));

// 3. Purple rim light
mixColor = mix(mixColor, colorPurple, fresnel);

// Glowing rim effect (softer)
vec3 glow = colorCyan * fresnelPow * 1.5;

// Curved, softer lines
// Add distortion using X and Z to make the lines wavy/curved
float distortion = sin(vLocalPosition.x * 2.5 + time * 0.5) * 0.4 + cos(vLocalPosition.z * 2.0) * 0.4;
float curvedY = vLocalPosition.y + distortion;

// Less quantity (multiplier 1.2), slower movement
float lines = fract((curvedY - time * 0.2) * 1.2);

// Very soft transition for the lines
float lineIntensity = smoothstep(0.2, 0.6, lines) * smoothstep(1.0, 0.6, lines);
vec3 lineGlow = vec3(0.2, 0.8, 1.0) * lineIntensity * (0.3 + fresnel * 1.0);

vec3 finalEmission = mixColor * 0.6 + glow + lineGlow;

// --- ASCII Dynamic Shapes Effect ---
float pixelSize = 8.0;
vec2 localUv = fract(gl_FragCoord.xy / pixelSize) - 0.5;

float luma = dot(finalEmission, vec3(0.2126, 0.7152, 0.0722));

// 1. Dynamic Size: scale dramatically based on brightness
float currentSize = clamp(luma * 1.2, 0.05, 0.45);

// 2. Dynamic Shape: morph from square to circle based on color!
// wavePeach controls the warm colors.
// 0.0 (Cold blue/cyan) = Sharp Squares
// 1.0 (Warm pink/peach) = Perfect Circles
float currentRadius = mix(0.0, currentSize, wavePeach);

// SDF for dynamic rounded box
float d = length(max(abs(localUv) - (currentSize - currentRadius), 0.0)) - currentRadius;
float shapeAlpha = smoothstep(1.5 / pixelSize, 0.0, d);

// Keep discard for the ASCII grid so depth sorting works correctly
if (shapeAlpha < 0.1) discard;

// Soften/blur the geometric edges of the model using the fresnel angle
// Dynamic blur controlled by the slider (0.0 = sharp, 1.0 = extreme blur)
float edgeStart = mix(1.0, 0.7, edgeBlurAmount);
float edgeEnd = mix(0.99, 0.1, edgeBlurAmount);
float edgeBlur = smoothstep(edgeStart, edgeEnd, fresnel);

finalEmission *= 1.2; // Boost brightness a bit

// --- SPECTACULAR 2D SCREEN-SPACE REVEAL ---
// We use screen coordinates so the reveal is perfectly consistent
// regardless of how the 3D model is scaled or offset internally!
vec2 screenUv = gl_FragCoord.xy / resolution.xy;
screenUv.x *= resolution.x / resolution.y; // correct aspect ratio

// Only carve out the reveal DURING the intro animation. Once it completes the discard is
// fully disabled, so the model can NEVER be hidden again no matter where it flies during
// the scroll choreography (fixes the model vanishing when scrolling into the finale).
if (uRevealProgress < 0.999) {
  // Reveal emanates from the model's ACTUAL on-screen center (updated every frame on the CPU).
  vec2 revealOrigin = uRevealOrigin;
  float distFromCenter2D = distance(screenUv, revealOrigin);

  // Expand radius generously so the whole model is guaranteed to be revealed by the end.
  float currentRadius2D = uRevealProgress * 3.0;

  // Add digital grid noise based on pixel coordinates for a dissolving edge.
  float gridRandom = fract(sin(dot(floor(gl_FragCoord.xy / 8.0), vec2(12.9898, 78.233))) * 43758.5453);
  // Fade the noise out as the reveal completes so nothing stays permanently carved away.
  float noisyRadius2D = currentRadius2D - gridRandom * 0.15 * (1.0 - uRevealProgress);

  if (distFromCenter2D > noisyRadius2D) {
    discard;
  }

  // Glowing edge at the expansion border
  float revealEdge = smoothstep(noisyRadius2D - 0.05, noisyRadius2D, distFromCenter2D);
  vec3 revealGlow = colorHotPink * revealEdge * 3.0 + colorCyan * pow(revealEdge, 4.0) * 8.0;
  finalEmission += revealGlow;
}

// Multiply alpha by edgeBlur to make the silhouette soft and blurry
gl_FragColor = vec4(gl_FragColor.rgb + finalEmission, gl_FragColor.a * shapeAlpha * edgeBlur);
`

/* ══ 3 · LOGO PARTICLES ══════════════════════════════════════════════════════ */

export const PARTICLE_VERT = /* glsl */ `
uniform float time;
uniform float uProgress;
uniform float uScale;
attribute vec3 aRandomPosition;
attribute float aDelay;
attribute float aIsAmbient;
varying vec3 vLocalPosition;
varying float vIsAmbient;

void main() {
  vLocalPosition = position;
  vIsAmbient = aIsAmbient;

  float safeProgress = clamp(uProgress, 0.0, 1.0);

  float startThreshold = aDelay * 0.4;
  float particleProgress = clamp((safeProgress - startThreshold) / (1.0 - startThreshold), 0.0, 1.0);

  // Sharper ease out so they snap firmly into place
  float rushEase = 1.0 - pow(1.0 - particleProgress, 4.0);

  // Clean Spin: rotate the random position around Y axis (Local Space)
  float spin = (1.0 - particleProgress) * 10.0;
  float s = sin(spin);
  float c = cos(spin);

  vec3 spiraledPos = aRandomPosition;
  spiraledPos.x = aRandomPosition.x * c - aRandomPosition.z * s;
  spiraledPos.z = aRandomPosition.x * s + aRandomPosition.z * c;

  // FLATTEN the depth of shattered particles so they stay close to the camera
  // and don't shrink into tiny specks due to 3D perspective!
  spiraledPos.z *= 0.15;

  // Smooth vertical convergence without crazy noise
  spiraledPos.y = mix(spiraledPos.y, position.y, rushEase);

  vec3 currentPos = mix(spiraledPos, position, rushEase);

  // Add continuous slow drift to ambient particles AND shattered logo particles!
  // rushEase is 1.0 when assembled, 0.0 when scattered.
  // So (1.0 - rushEase) makes them drift only when scattered!
  float driftFactor = (aIsAmbient > 0.5) ? 1.0 : (1.0 - rushEase);
  if (driftFactor > 0.01) {
     currentPos.x += sin(time * 0.4 + aRandomPosition.y) * 1.5 * driftFactor;
     currentPos.y += cos(time * 0.3 + aRandomPosition.x) * 1.5 * driftFactor;
     currentPos.z += sin(time * 0.5 + aRandomPosition.z) * 1.5 * driftFactor;
  }

  vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);

  // Expand the base size of shattered logo particles by 4x to counteract any depth shrinking
  float shatterBoost = mix(4.5, 1.0, rushEase);
  float baseSize = (aIsAmbient > 0.5 ? 40.0 : (16.0 * shatterBoost)) * uScale;

  // Point size attenuation with less aggressive clamping
  gl_PointSize = clamp(baseSize / max(0.5, -mvPosition.z), 4.0, 120.0);

  gl_Position = projectionMatrix * mvPosition;
}
`

export const PARTICLE_FRAG = /* glsl */ `
uniform float time;
uniform float uProgress;
uniform float uShatterFade;
uniform vec3 colorCyan;
uniform vec3 colorBlue;
uniform vec3 colorPeach;
uniform vec3 colorHotPink;
varying vec3 vLocalPosition;
varying float vIsAmbient;

void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  if (r > 1.0) discard;

  float dist = sqrt(r);
  // Stronger core, softer edge for a denser "juicy" look without additive washout
  float glow = smoothstep(1.0, 0.2, dist);

  // Spatial Gradient + Flowing Time Animation
  float waveX = sin(time * 1.5) * 1.5;
  float waveY = cos(time * 1.2) * 0.8;

  // Map ambient particles into the gradient bounds so they shimmer too
  float effX = vIsAmbient > 0.5 ? mod(vLocalPosition.x + time, 6.0) - 3.0 : vLocalPosition.x;
  float effY = vIsAmbient > 0.5 ? mod(vLocalPosition.y + time, 2.0) - 1.0 : vLocalPosition.y;

  float tX = smoothstep(-3.0, 3.0, effX + waveX);
  float tY = smoothstep(-1.0, 1.0, effY + waveY);

  // Bilinear blend of 4 colors
  vec3 leftColor = mix(colorBlue, colorCyan, tY);
  vec3 rightColor = mix(colorHotPink, colorPeach, tY);

  // Boost the vibrancy of the colors to make them "juicy"
  vec3 finalColor = mix(leftColor, rightColor, tX) * 1.4;

  // Fade out logo particles during the final shatter phase, but keep ambient particles fully visible
  float alphaMultiplier = vIsAmbient > 0.5 ? 1.0 : (1.0 - uShatterFade);

  // Global fade-in to prevent abrupt popping when they first appear
  float globalFadeIn = smoothstep(0.0, 0.15, uProgress);

  gl_FragColor = vec4(finalColor, glow * alphaMultiplier * globalFadeIn);
}
`
