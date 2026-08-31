<script setup lang="ts">
// SVARA Intelligence Console — ONE interconnected, architectural AI machine (not
// floating cards). Four depth layers: (BACK) a large structural frame plate;
// (MID-BACK) framed conduits/rails carrying travelling signals; (MID) the SENSE
// / PREDICT / ACT modules embedded into the frame with custom industrial
// silhouettes; (FRONT) the dominant UNDERSTAND intelligence core instrument.
// Signals travel SENSE → UNDERSTAND → PREDICT → ACT. Palette locked to SVARA:
// warm ivory + deep navy + titanium/graphite/frosted-glass, pale blue for
// intelligence indicators only. Motion: 2–8px per-layer parallax, slow core
// rotation, scan sweep, travelling signals; respects prefers-reduced-motion.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const root = ref<HTMLElement>()
const reduced = ref(false)
function onMove(e: PointerEvent) {
  if (reduced.value || !root.value) return
  const r = root.value.getBoundingClientRect()
  root.value.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
  root.value.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
}
onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('pointermove', onMove, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('pointermove', onMove))

const coreTicks = Array.from({ length: 72 }, (_, i) => i)
</script>

<template>
  <div ref="root" class="console" aria-hidden="true">
    <div class="machine">
      <!-- ================= LAYER 0 · BACK : structural frame plate ============ -->
      <div class="frame" style="--depth: 3">
        <div class="frame__inner" />
        <span class="mount mount--tl" /><span class="mount mount--tr" />
        <span class="mount mount--bl" /><span class="mount mount--br" />
        <span class="frame__tab" />
        <span class="frame__notch" />
        <div class="frame__slots"><i /><i /><i /><i /><i /></div>
        <span class="frame__code">SVARA · INTELLIGENCE FABRIC / IX-04</span>
      </div>

      <!-- ============ LAYER 1 · MID-BACK : conduits + travelling signals ======= -->
      <svg class="conduits" style="--depth: 4" viewBox="0 0 100 100" preserveAspectRatio="none">
        <!-- engineered channels: faint channel bed, twin walls, ladder rungs -->
        <g class="conduits__bed" fill="none" stroke="#14223f" stroke-opacity="0.05" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke">
          <path d="M25 22 L28.5 22 L28.5 31 L29 31" />
          <path d="M29 61 L26 61 L26 66" />
          <path d="M71 36 L68.5 36" />
        </g>
        <g class="conduits__wall" fill="none" stroke="#14223f" stroke-opacity="0.22" stroke-width="0.32" stroke-linejoin="round" vector-effect="non-scaling-stroke">
          <!-- SENSE (top-left) → CORE (upper-left dock) -->
          <path d="M25 20 L30 20 L30 30 L29 30" />
          <path d="M25 24 L27 24 L27 32 L29 32" />
          <!-- CORE (lower-left dock) → PREDICT (bottom-left) -->
          <path d="M29 60 L25 60 L25 66" />
          <path d="M29 63 L27 63 L27 66" />
          <!-- CORE (right dock) → ACT (right) -->
          <path d="M68.5 34 L71 34" />
          <path d="M68.5 38 L70 38 L70 41 L71 41" />
        </g>
        <!-- ladder rungs (engineered detail) -->
        <g class="conduits__rung" stroke="#14223f" stroke-opacity="0.12" stroke-width="0.28" vector-effect="non-scaling-stroke">
          <line x1="25" y1="20" x2="25" y2="24" /><line x1="27" y1="32" x2="29" y2="32" />
          <line x1="25" y1="60" x2="25" y2="63" /><line x1="27" y1="66" x2="27" y2="63" />
          <line x1="68.5" y1="34" x2="68.5" y2="38" />
        </g>
        <g class="conduits__node" fill="#8fb0d8">
          <rect x="24.2" y="19.2" width="1.7" height="1.7" /><rect x="28.2" y="29.2" width="1.7" height="1.7" />
          <rect x="24.2" y="59.2" width="1.7" height="1.7" /><rect x="24.2" y="65.2" width="1.7" height="1.7" />
          <rect x="67.7" y="33.2" width="1.7" height="1.7" /><rect x="70.2" y="40.2" width="1.7" height="1.7" />
        </g>
        <!-- travelling signal pulses: SENSE → CORE → PREDICT / ACT (bright head + soft halo) -->
        <circle class="sig--halo" r="1.5" fill="#8fb0d8" fill-opacity="0.35">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M25 22 L30 22 L30 31 L29 31" />
        </circle>
        <circle class="sig" r="0.85" fill="#3f6fb0">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M25 22 L30 22 L30 31 L29 31" />
        </circle>
        <circle class="sig--halo" r="1.5" fill="#8fb0d8" fill-opacity="0.35">
          <animateMotion dur="3.1s" begin="1.1s" repeatCount="indefinite" path="M29 61 L25 61 L25 66" />
        </circle>
        <circle class="sig" r="0.85" fill="#3f6fb0">
          <animateMotion dur="3.1s" begin="1.1s" repeatCount="indefinite" path="M29 61 L25 61 L25 66" />
        </circle>
        <circle class="sig--halo" r="1.5" fill="#8fb0d8" fill-opacity="0.35">
          <animateMotion dur="2.3s" begin="0.6s" repeatCount="indefinite" path="M68.5 36 L71 36" />
        </circle>
        <circle class="sig" r="0.85" fill="#3f6fb0">
          <animateMotion dur="2.3s" begin="0.6s" repeatCount="indefinite" path="M68.5 36 L71 36" />
        </circle>
      </svg>

      <!-- faint backing plate behind the core (adds depth under the instrument) -->
      <div class="backplate" style="--depth: 3" />

      <!-- ============ LAYER 2 · MID : embedded SENSE / PREDICT / ACT =========== -->
      <div class="mod mod--sense" style="--depth: 6">
        <div class="mod__tabline"><span>S1</span></div>
        <div class="glass glass--sense">
          <div class="hd"><span class="hd__id">SENSE</span><span class="hd__meta">PERCEPTION</span></div>
          <svg class="spark" viewBox="0 0 170 34" preserveAspectRatio="none">
            <polyline fill="none" stroke="#3f6fb0" stroke-width="1.5" points="0,26 16,22 30,27 44,14 58,20 72,8 86,17 100,6 114,13 128,4 142,11 170,7" />
            <polyline fill="none" stroke="#14223f" stroke-opacity="0.16" stroke-width="1" points="0,30 24,29 48,31 72,28 96,30 120,28 144,29 170,29" />
          </svg>
          <div class="rows"><div class="row"><span>VISION</span><b>ONLINE</b></div><div class="row"><span>STREAMS</span><b>128</b></div></div>
          <span class="pin pin--tl" /><span class="pin pin--tr" /><span class="pin pin--bl" /><span class="pin pin--br" />
          <span class="mod__slot mod__slot--br"><i /><i /><i /></span>
        </div>
      </div>

      <div class="mod mod--predict" style="--depth: 6">
        <div class="glass glass--predict">
          <div class="hd"><span class="hd__id">PREDICT</span><span class="hd__meta">FORECAST</span></div>
          <div class="bars"><i style="--h: 38%" /><i style="--h: 60%" /><i style="--h: 46%" /><i style="--h: 80%" /><i style="--h: 54%" /><i style="--h: 90%" /><i style="--h: 68%" /></div>
          <div class="rows"><div class="row"><span>CONFIDENCE</span><b>0.94</b></div></div>
          <span class="pin pin--tl" /><span class="pin pin--tr" /><span class="pin pin--bl" /><span class="pin pin--br" />
          <span class="mod__slot mod__slot--tr"><i /><i /><i /></span>
        </div>
      </div>

      <div class="mod mod--act" style="--depth: 6">
        <div class="glass glass--act">
          <div class="hd col"><span class="hd__id">ACT</span><span class="hd__meta">EXECUTION</span></div>
          <div class="leds"><i class="on" /><i class="on" /><i /><i class="on" /><i /><i class="on" /><i class="on" /><i /></div>
          <div class="rows"><div class="row"><span>QUEUE</span><b>07</b></div><div class="row"><span>OPS/S</span><b>1.2k</b></div></div>
          <span class="pin pin--tl" /><span class="pin pin--tr" /><span class="pin pin--bl" /><span class="pin pin--br" />
          <span class="mod__slot mod__slot--l"><i /><i /><i /></span>
        </div>
      </div>

      <!-- small embedded controls / telemetry -->
      <div class="chip chip--latency" style="--depth: 7"><i class="dot" /> LATENCY 4.1ms</div>
      <div class="chip chip--sync" style="--depth: 8">
        <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="#14223f" stroke-opacity="0.14" stroke-width="3" /><circle class="chip__ring" cx="20" cy="20" r="15" fill="none" stroke="#3f6fb0" stroke-width="3" stroke-linecap="round" stroke-dasharray="72 94" transform="rotate(-90 20 20)" /></svg>
        <span>SYNC 76%</span>
      </div>

      <!-- ============ LAYER 3 · FRONT : dominant UNDERSTAND core =============== -->
      <div class="core" style="--depth: 9">
        <div class="core__housing">
          <div class="core__hd"><span class="hd__id">UNDERSTAND</span><span class="hd__meta">INTELLIGENCE CORE</span></div>
          <div class="core__stage">
            <svg viewBox="0 0 300 300">
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stop-color="#8fb0d8" stop-opacity="0.30" />
                  <stop offset="0.6" stop-color="#8fb0d8" stop-opacity="0.07" />
                  <stop offset="1" stop-color="#8fb0d8" stop-opacity="0" />
                </radialGradient>
                <radialGradient id="coreglow" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stop-color="#8fb0d8" stop-opacity="0.42" />
                  <stop offset="0.55" stop-color="#8fb0d8" stop-opacity="0.12" />
                  <stop offset="1" stop-color="#8fb0d8" stop-opacity="0" />
                </radialGradient>
                <radialGradient id="sphere" cx="42%" cy="38%" r="70%">
                  <stop offset="0" stop-color="#ffffff" stop-opacity="0.95" />
                  <stop offset="0.4" stop-color="#c7d4e6" stop-opacity="0.85" />
                  <stop offset="1" stop-color="#2b3e63" stop-opacity="0.9" />
                </radialGradient>
                <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stop-color="#8fb0d8" stop-opacity="0" />
                  <stop offset="1" stop-color="#8fb0d8" stop-opacity="0.45" />
                </linearGradient>
              </defs>
              <circle cx="150" cy="150" r="128" fill="url(#glow)" />
              <!-- dial ticks -->
              <g class="c-ticks" stroke="#14223f">
                <line
v-for="t in coreTicks" :key="t" x1="150" :y1="t % 6 === 0 ? 20 : 24" x2="150" y2="28"
                  :stroke-opacity="t % 6 === 0 ? 0.5 : 0.18" :stroke-width="t % 6 === 0 ? 1.1 : 0.6"
                  :transform="`rotate(${t * 5} 150 150)`" />
              </g>
              <!-- concentric rings -->
              <circle cx="150" cy="150" r="118" fill="none" stroke="#14223f" stroke-opacity="0.12" />
              <circle class="c-seg" cx="150" cy="150" r="100" fill="none" stroke="#9aa3b2" stroke-opacity="0.5" stroke-width="1.3" stroke-dasharray="80 22 40 120 54 30" />
              <circle class="c-seg-b" cx="150" cy="150" r="100" fill="none" stroke="#3f6fb0" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="90 538" />
              <circle cx="150" cy="150" r="78" fill="none" stroke="#14223f" stroke-opacity="0.1" />
              <!-- waveform ring -->
              <path class="c-wave" :d="'M150 88 ' + 'q10 8 20 0 t20 0 t20 0'" fill="none" stroke="#3f6fb0" stroke-opacity="0.55" stroke-width="1.2" />
              <circle cx="150" cy="150" r="60" fill="none" stroke="#9aa3b2" stroke-opacity="0.3" stroke-dasharray="1 4" />
              <!-- scan sweep -->
              <g class="c-scan">
                <path d="M150 150 L150 32 A118 118 0 0 1 234 66 Z" fill="url(#sweep)" opacity="0.3" />
                <line x1="150" y1="150" x2="150" y2="32" stroke="#3f6fb0" stroke-width="1.4" stroke-opacity="0.8" />
              </g>
              <!-- radial connectors to orbital nodes -->
              <g stroke="#14223f" stroke-opacity="0.12" stroke-width="0.8">
                <line x1="150" y1="150" x2="150" y2="50" /><line x1="150" y1="150" x2="238" y2="150" /><line x1="150" y1="150" x2="90" y2="228" />
              </g>
              <!-- orbital nodes -->
              <g class="c-orbit"><circle cx="150" cy="50" r="4.6" fill="#14223f" /><circle cx="150" cy="50" r="8" fill="none" stroke="#3f6fb0" stroke-width="1" stroke-opacity="0.6" /></g>
              <g class="c-orbit c-orbit--rev"><circle cx="238" cy="150" r="3.4" fill="#3f6fb0" /><circle cx="90" cy="228" r="2.6" fill="#14223f" fill-opacity="0.7" /></g>
              <!-- central intelligence sphere: internal illumination + controlled highlights -->
              <circle class="c-illum" cx="150" cy="150" r="50" fill="url(#coreglow)" />
              <circle cx="150" cy="150" r="30" fill="url(#sphere)" stroke="#14223f" stroke-opacity="0.22" />
              <path d="M126 138 A30 30 0 0 1 168 126" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="1.4" stroke-linecap="round" />
              <ellipse cx="141" cy="139" rx="10" ry="6.5" fill="#ffffff" fill-opacity="0.72" />
              <circle cx="138" cy="136" r="2.4" fill="#ffffff" fill-opacity="0.95" />
              <circle class="c-pulse" cx="150" cy="150" r="30" fill="none" stroke="#3f6fb0" stroke-opacity="0.5" stroke-width="1" />
              <!-- radial telemetry -->
              <text x="44" y="52" class="c-tx">SIG 0.98</text><text x="214" y="52" class="c-tx">Δ 4ms</text>
              <text x="44" y="262" class="c-tx">NODES 512</text><text x="222" y="262" class="c-tx">LOCK</text>
            </svg>
          </div>
          <div class="core__foot"><span class="stat"><i class="dot" /> INFERENCE ACTIVE</span><span class="hd__meta">98.2%</span></div>
          <span class="pin pin--tl" /><span class="pin pin--tr" /><span class="pin pin--bl" /><span class="pin pin--br" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.console {
  position: absolute; inset: 0 0 0 auto; width: 50%; min-width: 600px; z-index: 1;
  --mx: 0; --my: 0;
  font-family: "Geist Sans", system-ui, sans-serif; color: #14223f; pointer-events: none; overflow: visible;
}
/* the whole machine: one substantial mass, ~72% hero height, kept clear of the
   headline (shifted right; extends off the right edge so it crops) */
/* ~14% larger (taller) and nudged left toward the headline (without overlapping);
   right edge bleeds a touch off-frame like the industrial reference */
.machine { position: absolute; top: 7%; bottom: 7%; left: 23%; right: -2%; }

/* per-layer parallax (2–8px differential by --depth) + gentle drift */
.frame, .conduits, .backplate, .mod, .chip, .core {
  transform: translate3d(calc(var(--mx) * var(--depth) * 1px), calc(var(--my) * var(--depth) * 1px), 0);
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ---------- LAYER 0 · structural frame plate ---------- */
.frame {
  position: absolute; inset: 4% 10% 4% 2%;
  background: linear-gradient(160deg, rgba(255,255,255,0.42), rgba(255,255,255,0.19));
  border: 1px solid rgba(20,34,63,0.17);
  box-shadow: 0 48px 100px -46px rgba(20,34,63,0.44), inset 0 1px 0 rgba(255,255,255,0.62);
  clip-path: polygon(0 6%, 40% 6%, 42% 0, 66% 0, 68% 6%, 94% 6%, 100% 15%, 100% 55%, 96% 60%, 100% 65%, 100% 92%, 93% 100%, 7% 100%, 0 92%);
}
.frame__inner { position: absolute; inset: 10px; border: 1px solid rgba(20,34,63,0.11); clip-path: inherit; }
.mount { position: absolute; width: 8px; height: 8px; border: 1px solid rgba(20,34,63,0.34); border-radius: 50%; background: rgba(255,255,255,0.72); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5); }
.mount--tl { top: 8%; left: 3%; } .mount--tr { top: 8%; right: 3%; } .mount--bl { bottom: 3%; left: 3%; } .mount--br { bottom: 3%; right: 8%; }
.frame__tab { position: absolute; top: 0; left: 43%; width: 24%; height: 6%; border: 1px solid rgba(20,34,63,0.17); border-bottom: none; background: rgba(255,255,255,0.36); }
.frame__notch { position: absolute; right: 0; top: 55%; width: 4%; height: 5%; background: var(--ivory, #efe9da); border: 1px solid rgba(20,34,63,0.14); }
.frame__slots { position: absolute; left: 2.4%; top: 40%; display: flex; flex-direction: column; gap: 6px; }
.frame__slots i { width: 14px; height: 3px; background: rgba(20,34,63,0.18); border-radius: 2px; }
.frame__code { position: absolute; bottom: 3%; left: 8%; font-family: ui-monospace, monospace; font-size: 9px; letter-spacing: 0.18em; color: #7a869e; }

/* ---------- LAYER 1 · conduits ---------- */
.conduits { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.sig { filter: drop-shadow(0 0 2px rgba(63,111,176,0.7)); }

/* backplate under the core */
.backplate {
  position: absolute; top: 15%; left: 26%; width: 49%; height: 62%;
  background: rgba(255,255,255,0.14); border: 1px solid rgba(20,34,63,0.06);
  clip-path: polygon(8% 0, 100% 0, 100% 84%, 92% 100%, 0 100%, 0 16%);
}

/* ---------- LAYER 2 · embedded modules (custom industrial silhouettes) ------ */
.mod { position: absolute; }
/* recessed machined pocket the module is set into (ties it to the chassis) */
.mod::before {
  content: ""; position: absolute; inset: -8px -10px -11px -8px; z-index: -1;
  background: linear-gradient(160deg, rgba(20,34,63,0.055), rgba(20,34,63,0.015));
  border: 1px solid rgba(20,34,63,0.10);
  box-shadow: inset 0 2px 6px rgba(20,34,63,0.09), inset 0 -1px 0 rgba(255,255,255,0.4);
  clip-path: polygon(0 11px, 11px 0, 100% 0, 100% calc(100% - 11px), calc(100% - 11px) 100%, 0 100%);
}
/* outer mounting tab bolting the module to the frame (structural extension) */
.mod::after {
  content: ""; position: absolute; top: 22%; width: 10px; height: 26%;
  background: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.16));
  border: 1px solid rgba(20,34,63,0.12);
}
.mod--sense::after, .mod--predict::after { left: -16px; border-right: none; }
.mod--act::after { right: -16px; border-left: none; }
/* connector slot docking toward the core (thin engineered contacts) */
.mod__slot { position: absolute; display: flex; gap: 3px; }
.mod__slot i { width: 3px; height: 8px; background: rgba(20,34,63,0.18); border-radius: 1px; }
.mod__slot--br { right: 10px; bottom: -5px; }
.mod__slot--tr { right: 12px; top: -5px; }
.mod__slot--l { left: -5px; top: 50%; flex-direction: column; transform: translateY(-50%); }
.mod__slot--l i { width: 8px; height: 3px; }
.mod--sense { top: 3%; left: 0%; width: 26%; }
.mod--predict { top: 66%; left: 1%; width: 27%; }
.mod--act { top: 9%; left: 71%; width: 25%; }
.mod__tabline { position: absolute; top: -1px; left: 14px; transform: translateY(-100%); display: flex; }
.mod__tabline span { font-family: ui-monospace, monospace; font-size: 8px; letter-spacing: 0.12em; color: #8b93a6; padding: 2px 8px; background: rgba(255,255,255,0.5); border: 1px solid rgba(20,34,63,0.12); border-bottom: none; clip-path: polygon(3px 0, 100% 0, 100% 100%, 0 100%); }

.glass {
  position: relative; padding: 13px 15px;
  background: linear-gradient(160deg, rgba(255,255,255,0.7), rgba(255,255,255,0.44));
  backdrop-filter: blur(16px) saturate(1.1); -webkit-backdrop-filter: blur(16px) saturate(1.1);
  border: 1px solid rgba(20,34,63,0.16);
  box-shadow: 0 22px 44px -22px rgba(20,34,63,0.3), inset 0 1px 0 rgba(255,255,255,0.75), inset 0 0 0 1px rgba(255,255,255,0.22);
}
/* custom silhouettes: clipped/stepped corners + a notch, different per module */
.glass--sense { clip-path: polygon(0 0, 86% 0, 90% 14%, 100% 14%, 100% 100%, 14px 100%, 0 calc(100% - 14px)); }
.glass--predict { clip-path: polygon(0 16px, 16px 0, 100% 0, 100% 78%, 92% 100%, 0 100%); }
.glass--act { clip-path: polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px)); padding: 12px 13px; }

.hd { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hd.col { flex-direction: column; align-items: flex-start; gap: 2px; }
.hd__id { font-size: 11px; font-weight: 600; letter-spacing: 0.22em; color: #14223f; }
.hd__meta { font-family: ui-monospace, "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.12em; color: #7a869e; }

.spark { width: 100%; height: 32px; margin: 9px 0 7px; display: block; }
.rows { display: flex; flex-direction: column; gap: 4px; }
.row { display: flex; justify-content: space-between; font-family: ui-monospace, monospace; font-size: 9.5px; letter-spacing: 0.06em; }
.row span { color: #7a869e; } .row b { color: #14223f; font-weight: 600; }
.bars { display: flex; align-items: flex-end; gap: 5px; height: 44px; margin: 11px 0 8px; }
.bars i { flex: 1; height: var(--h); background: linear-gradient(#3f6fb0, rgba(63,111,176,0.32)); border-radius: 1px; }
.bars i:nth-child(even) { background: linear-gradient(#9aa3b2, rgba(154,163,178,0.3)); }
.leds { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin: 11px 0 9px; }
.leds i { height: 6px; border-radius: 2px; background: rgba(20,34,63,0.12); }
.leds i.on { background: #3f6fb0; box-shadow: 0 0 6px rgba(63,111,176,0.45); }

/* mounting pins on modules/core */
.pin { position: absolute; width: 5px; height: 5px; border: 1px solid rgba(20,34,63,0.32); border-radius: 50%; background: rgba(255,255,255,0.7); }
.pin--tl { top: 6px; left: 6px; } .pin--tr { top: 6px; right: 6px; } .pin--bl { bottom: 6px; left: 6px; } .pin--br { bottom: 6px; right: 6px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #3f6fb0; box-shadow: 0 0 0 3px rgba(63,111,176,0.16); animation: blink 2.6s ease-in-out infinite; }
.stat { font-family: ui-monospace, monospace; font-size: 9.5px; letter-spacing: 0.08em; color: #46506e; display: flex; align-items: center; gap: 6px; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

/* ---------- chips ---------- */
.chip {
  position: absolute; z-index: 4; display: flex; align-items: center; gap: 7px; padding: 7px 11px;
  font-family: ui-monospace, monospace; font-size: 9px; letter-spacing: 0.1em; color: #46506e;
  background: rgba(255,255,255,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(20,34,63,0.13);
  box-shadow: 0 14px 30px -14px rgba(20,34,63,0.3), inset 0 1px 0 rgba(255,255,255,0.7);
  clip-path: polygon(9px 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%, 0 9px);
}
.chip--latency { top: 48%; left: 2%; }
.chip--sync { top: 85%; left: 40%; padding: 6px 10px 6px 6px; }
.chip--sync svg { width: 26px; height: 26px; }
.chip__ring { animation: spin 20s linear infinite; transform-origin: 20px 20px; }

/* ---------- LAYER 3 · dominant core ---------- */
.core { position: absolute; top: 18%; left: 29%; width: 42%; min-width: 250px; }
.core__housing {
  position: relative; padding: 12px 14px 10px;
  background:
    radial-gradient(115% 85% at 50% 26%, rgba(143,176,216,0.12), rgba(143,176,216,0) 62%),
    linear-gradient(155deg, rgba(255,255,255,0.80), rgba(238,242,248,0.50) 55%, rgba(255,255,255,0.5));
  backdrop-filter: blur(22px) saturate(1.16); -webkit-backdrop-filter: blur(22px) saturate(1.16);
  border: 1px solid rgba(20,34,63,0.24);
  box-shadow:
    0 52px 90px -34px rgba(20,34,63,0.46), 0 6px 14px rgba(20,34,63,0.1),
    inset 0 1px 0 rgba(255,255,255,0.92), inset 0 0 26px rgba(255,255,255,0.34),
    inset 0 -1px 0 rgba(20,34,63,0.07);
  clip-path: polygon(0 18px, 18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px));
}
/* titanium bevel highlight along the top two chamfers */
.core__housing::before {
  content: ""; position: absolute; inset: 1px; pointer-events: none;
  clip-path: inherit;
  background: linear-gradient(158deg, rgba(255,255,255,0.55), rgba(255,255,255,0) 26%);
}
.core__hd { display: flex; align-items: baseline; justify-content: space-between; padding: 0 2px; }
.core__stage { margin: 4px 0 2px; }
.core__stage svg { width: 100%; height: auto; display: block; }
.core__foot { display: flex; align-items: center; justify-content: space-between; padding: 2px 2px 0; }
.c-tx { font-family: ui-monospace, monospace; font-size: 8px; letter-spacing: 0.05em; fill: #7a869e; }
.c-ticks, .c-seg, .c-seg-b, .c-scan, .c-orbit, .c-pulse, .c-wave, .c-illum { transform-origin: 150px 150px; }
.c-illum { animation: coreglow 5.5s ease-in-out infinite; }
.c-seg { animation: spin 60s linear infinite; }
.c-seg-b { animation: spin 26s linear infinite reverse; }
.c-scan { animation: spin 10s linear infinite; }
.c-orbit { animation: spin 30s linear infinite; }
.c-orbit--rev { animation: spin 40s linear infinite reverse; }
.c-pulse { animation: pulse 3.4s ease-in-out infinite; }
.c-wave { animation: wave 4s ease-in-out infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.28); opacity: 0.15; } }
@keyframes wave { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }
@keyframes coreglow { 0%,100% { opacity: 0.72; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }

@media (prefers-reduced-motion: reduce) {
  .c-ticks, .c-seg, .c-seg-b, .c-scan, .c-orbit, .c-pulse, .c-wave, .c-illum, .dot, .chip__ring { animation: none !important; }
  .sig, .sig--halo { display: none; } /* SMIL animateMotion can't be paused via CSS — hide instead */
}
@media (max-width: 1100px) { .console { width: 56%; min-width: 480px; } }
</style>
