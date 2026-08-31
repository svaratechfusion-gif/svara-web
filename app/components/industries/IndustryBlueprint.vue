<script setup lang="ts">
// INDUSTRY BLUEPRINT — a bespoke engineered technical world per industry,
// in the EcoDomains idiom (structure strokes + animated --sig signal dots +
// mono technical annotations). Static geometry per branch → SSR-safe, no
// ClientOnly needed. The parent frames it with panel + corner pins + code.
defineProps<{ slug: string }>()
</script>

<template>
  <svg class="ib" viewBox="0 0 360 240" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <!-- MANUFACTURING — production line, vision node scanning, edge -->
    <g v-if="slug === 'manufacturing'">
      <line x1="34" y1="176" x2="326" y2="176" stroke="rgba(20,34,63,0.22)" stroke-width="1.4" />
      <g stroke="rgba(20,34,63,0.28)" stroke-width="1.2" fill="rgba(255,255,255,0.55)">
        <rect x="70" y="150" width="40" height="26" rx="2" /><rect x="160" y="150" width="40" height="26" rx="2" /><rect x="250" y="150" width="40" height="26" rx="2" />
      </g>
      <path d="M90 150 L90 92 M180 150 L180 92 M270 150 L270 92" stroke="rgba(20,34,63,0.12)" stroke-width="1" stroke-dasharray="3 4" />
      <rect x="150" y="52" width="60" height="30" rx="3" fill="rgba(63,111,176,0.08)" stroke="var(--sig)" stroke-width="1.3" />
      <path d="M180 82 L150 118 L210 118 Z" fill="rgba(63,111,176,0.05)" stroke="var(--sig)" stroke-width="0.9" stroke-dasharray="3 3" />
      <text x="180" y="71" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="#14223f">VISION AI</text>
      <g class="ib__sig" fill="var(--sig)"><circle r="2.6"><animateMotion dur="3s" repeatCount="indefinite" path="M50 176 H320" /></circle><circle r="2.6"><animateMotion dur="3s" begin="1.4s" repeatCount="indefinite" path="M50 176 H320" /></circle></g>
      <g font-family="var(--font-mono)" font-size="8" fill="#7a869e"><text x="34" y="200">PRODUCTION LINE</text><text x="250" y="200">EDGE · TWIN</text></g>
    </g>

    <!-- SMART CITIES — street grid, monitoring nodes, hub -->
    <g v-else-if="slug === 'smart-cities'">
      <g stroke="rgba(20,34,63,0.16)" stroke-width="1">
        <path d="M40 70 H320 M40 120 H320 M40 170 H320 M110 40 V200 M180 40 V200 M250 40 V200" />
      </g>
      <g fill="rgba(255,255,255,0.7)" stroke="var(--sig)" stroke-width="1.1">
        <circle cx="110" cy="70" r="4" /><circle cx="250" cy="120" r="4" /><circle cx="180" cy="170" r="4" /><circle cx="110" cy="170" r="4" />
      </g>
      <circle cx="180" cy="120" r="16" fill="rgba(63,111,176,0.08)" stroke="var(--sig)" stroke-width="1.4" />
      <circle class="ib__ring" cx="180" cy="120" r="16" fill="none" stroke="var(--sig)" stroke-width="1" />
      <text x="180" y="123" text-anchor="middle" font-family="var(--font-mono)" font-size="7" fill="#14223f">HUB</text>
      <g class="ib__sig" fill="var(--sig)"><circle r="2.4"><animateMotion dur="2.6s" repeatCount="indefinite" path="M110 70 L180 120" /></circle><circle r="2.4"><animateMotion dur="3s" begin="0.8s" repeatCount="indefinite" path="M250 120 L180 120" /></circle></g>
      <text x="40" y="216" font-family="var(--font-mono)" font-size="8" fill="#7a869e">CITY GRID · MONITORING NODES</text>
    </g>

    <!-- LOGISTICS — warehouse racks, route path, fleet -->
    <g v-else-if="slug === 'logistics'">
      <g stroke="rgba(20,34,63,0.26)" stroke-width="1.2" fill="rgba(255,255,255,0.5)">
        <rect x="40" y="54" width="70" height="14" /><rect x="40" y="74" width="70" height="14" /><rect x="40" y="94" width="70" height="14" />
        <rect x="130" y="54" width="70" height="14" /><rect x="130" y="74" width="70" height="14" /><rect x="130" y="94" width="70" height="14" />
      </g>
      <path d="M60 150 C120 120 200 200 300 150" stroke="var(--sig)" stroke-width="1.4" stroke-dasharray="5 4" fill="none" />
      <g class="ib__sig" fill="var(--sig)"><circle r="3"><animateMotion dur="3.4s" repeatCount="indefinite" path="M60 150 C120 120 200 200 300 150" /></circle></g>
      <rect x="286" y="140" width="24" height="16" rx="2" fill="rgba(63,111,176,0.1)" stroke="var(--sig)" stroke-width="1.1" />
      <text x="298" y="151" text-anchor="middle" font-family="var(--font-mono)" font-size="7" fill="#14223f">FLEET</text>
      <g font-family="var(--font-mono)" font-size="8" fill="#7a869e"><text x="40" y="128">WAREHOUSE</text><text x="40" y="210">ROUTE · ASSET INTELLIGENCE</text></g>
    </g>

    <!-- RETAIL — store floor, zones, flow -->
    <g v-else-if="slug === 'retail'">
      <rect x="46" y="46" width="268" height="148" rx="3" stroke="rgba(20,34,63,0.24)" stroke-width="1.3" fill="rgba(255,255,255,0.4)" />
      <g stroke="rgba(20,34,63,0.14)" stroke-width="1"><path d="M120 46 V194 M200 46 V194 M46 120 H314" /></g>
      <g fill="rgba(63,111,176,0.14)" stroke="var(--sig)" stroke-width="0.9">
        <circle cx="84" cy="84" r="9" /><circle cx="160" cy="160" r="13" /><circle cx="256" cy="84" r="7" /><circle cx="256" cy="160" r="10" />
      </g>
      <rect x="150" y="188" width="20" height="10" fill="var(--sig)" opacity="0.5" />
      <g class="ib__sig" fill="var(--sig)"><circle r="2.4"><animateMotion dur="3s" repeatCount="indefinite" path="M160 194 V120 L84 84" /></circle></g>
      <g font-family="var(--font-mono)" font-size="8" fill="#7a869e"><text x="46" y="212">STORE ZONES · FOOTFALL FLOW</text></g>
    </g>

    <!-- HEALTHCARE — facility floor, monitoring, assets -->
    <g v-else-if="slug === 'healthcare'">
      <rect x="46" y="50" width="268" height="140" rx="3" stroke="rgba(20,34,63,0.22)" stroke-width="1.3" fill="rgba(255,255,255,0.4)" />
      <g stroke="rgba(20,34,63,0.16)" stroke-width="1" fill="rgba(255,255,255,0.5)">
        <rect x="46" y="50" width="80" height="66" /><rect x="46" y="116" width="80" height="74" /><rect x="234" y="50" width="80" height="66" /><rect x="234" y="116" width="80" height="74" />
      </g>
      <g fill="rgba(63,111,176,0.14)" stroke="var(--sig)" stroke-width="1"><circle cx="86" cy="83" r="6" /><circle cx="86" cy="153" r="6" /><circle cx="274" cy="83" r="6" /><circle cx="274" cy="153" r="6" /></g>
      <circle cx="180" cy="120" r="18" fill="rgba(63,111,176,0.08)" stroke="var(--sig)" stroke-width="1.4" />
      <path class="ib__ecg" d="M164 120 H172 L176 110 L182 130 L186 120 H196" stroke="var(--sig)" stroke-width="1.3" fill="none" />
      <g class="ib__sig" fill="var(--sig)"><circle r="2.3"><animateMotion dur="2.8s" repeatCount="indefinite" path="M86 83 L180 120" /></circle><circle r="2.3"><animateMotion dur="3.2s" begin="1s" repeatCount="indefinite" path="M274 153 L180 120" /></circle></g>
      <text x="46" y="210" font-family="var(--font-mono)" font-size="8" fill="#7a869e">FACILITY · OPERATIONAL VISIBILITY</text>
    </g>

    <!-- ENERGY — grid towers, inspection drone, asset -->
    <g v-else-if="slug === 'energy'">
      <line x1="34" y1="180" x2="326" y2="180" stroke="rgba(20,34,63,0.2)" stroke-width="1.2" />
      <g stroke="rgba(20,34,63,0.3)" stroke-width="1.2" fill="none">
        <path d="M80 180 L80 80 M64 180 L96 180 M70 100 L90 100 M66 130 L94 130" />
        <path d="M240 180 L240 80 M224 180 L256 180 M230 100 L250 100 M226 130 L254 130" />
      </g>
      <path d="M80 84 C150 60 170 60 240 84" stroke="var(--sig)" stroke-width="1.2" fill="none" />
      <path d="M80 94 C150 72 170 72 240 94" stroke="rgba(20,34,63,0.2)" stroke-width="1" fill="none" />
      <path d="M120 50 L200 50" stroke="var(--sig)" stroke-width="1" stroke-dasharray="4 4" />
      <g class="ib__sig" fill="var(--sig)"><circle r="2.6"><animateMotion dur="3.6s" repeatCount="indefinite" path="M120 50 L200 50" /></circle><circle r="2.4"><animateMotion dur="3s" repeatCount="indefinite" path="M80 84 C150 60 170 60 240 84" /></circle></g>
      <rect x="150" y="42" width="20" height="12" rx="2" fill="rgba(63,111,176,0.12)" stroke="var(--sig)" stroke-width="1" />
      <text x="34" y="206" font-family="var(--font-mono)" font-size="8" fill="#7a869e">GRID · DRONE INSPECTION · ASSETS</text>
    </g>

    <!-- AGRICULTURE — field rows, drone sweep, sensors -->
    <g v-else-if="slug === 'agriculture'">
      <g stroke="rgba(20,34,63,0.2)" stroke-width="1.1" fill="none">
        <path d="M40 200 C120 176 240 176 320 200" /><path d="M40 176 C120 152 240 152 320 176" /><path d="M40 152 C120 128 240 128 320 152" /><path d="M40 128 C120 104 240 104 320 128" />
      </g>
      <path d="M50 70 H310" stroke="var(--sig)" stroke-width="1.1" stroke-dasharray="5 5" />
      <g class="ib__sig" fill="var(--sig)"><circle r="3"><animateMotion dur="4s" repeatCount="indefinite" path="M50 70 H310 M310 70 L50 70" /></circle></g>
      <rect x="172" y="62" width="24" height="14" rx="2" fill="rgba(63,111,176,0.12)" stroke="var(--sig)" stroke-width="1" />
      <text x="184" y="72" text-anchor="middle" font-family="var(--font-mono)" font-size="7" fill="#14223f">DRONE</text>
      <g fill="rgba(63,111,176,0.14)" stroke="var(--sig)" stroke-width="0.8"><circle cx="110" cy="164" r="4" /><circle cx="200" cy="152" r="4" /><circle cx="260" cy="176" r="4" /></g>
      <text x="40" y="220" font-family="var(--font-mono)" font-size="8" fill="#7a869e">FIELD · CROP OBSERVATION</text>
    </g>

    <!-- CONSTRUCTION — rising structure wireframe, progress monitor -->
    <g v-else>
      <g stroke="rgba(20,34,63,0.28)" stroke-width="1.2" fill="rgba(255,255,255,0.4)">
        <path d="M90 190 L90 90 L170 60 L170 160 Z" />
        <path d="M170 60 L230 82 L230 182 L170 160" fill="rgba(20,34,63,0.05)" />
        <path d="M90 90 L150 112 L230 82 M150 112 L150 212 M90 140 L150 162 L230 132 M90 190 L150 212 L230 182" stroke-width="1" />
      </g>
      <path d="M110 70 L110 40 L200 40" stroke="rgba(20,34,63,0.3)" stroke-width="1.2" fill="none" />
      <line x1="200" y1="40" x2="200" y2="60" stroke="rgba(20,34,63,0.3)" stroke-width="1.2" stroke-dasharray="3 3" />
      <rect x="90" y="112" width="60" height="28" fill="rgba(63,111,176,0.1)" stroke="var(--sig)" stroke-width="1.1" />
      <g class="ib__sig" fill="var(--sig)"><circle r="2.6"><animateMotion dur="3.4s" repeatCount="indefinite" path="M200 40 L200 60" /></circle></g>
      <text x="34" y="216" font-family="var(--font-mono)" font-size="8" fill="#7a869e">SITE · STRUCTURE · PROGRESS</text>
    </g>
  </svg>
</template>

<style scoped>
.ib { width: 100%; height: 100%; }
.ib__ring { transform-origin: 180px 120px; animation: ib-ping 3.4s ease-out infinite; }
@keyframes ib-ping { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2.4); opacity: 0; } }
.ib__ecg { stroke-dasharray: 60; stroke-dashoffset: 60; animation: ib-draw 2.4s ease-in-out infinite; }
@keyframes ib-draw { 0% { stroke-dashoffset: 60; } 55%, 100% { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) { .ib__sig circle, .ib__ring, .ib__ecg { animation: none; } }
</style>
