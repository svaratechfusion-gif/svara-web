<script setup lang="ts">
// WorldViz — ten DISTINCT bespoke visualizations, one per SVARA product. Each is a
// self-contained animated SVG "instrument" (not a dashboard tile): machine-vision
// field, aerial flight command, distributed edge mesh, cognitive document field,
// agent network, orbital digital twin, conversational command core, interconnected
// business core, mechanical engineering blueprint, market trajectory. Pure SVG +
// SMIL/CSS motion → SSR-safe. The parent ProductWorld supplies the editorial frame.
// UPGRADE (2026-08): `vision` and `agents` render live, interactive "system"
// components driven by the deterministic sim engine; the rest keep their SVG
// instruments (upgraded one at a time). Dispatch stays a single v-if chain.
import VisionSystem from '~/components/products/worlds/systems/VisionSystem.vue'
import AgentSystem from '~/components/products/worlds/systems/AgentSystem.vue'
import EdgeSystem from '~/components/products/worlds/systems/EdgeSystem.vue'
import DroneSystem from '~/components/products/worlds/systems/DroneSystem.vue'
import CognitiveSystem from '~/components/products/worlds/systems/CognitiveSystem.vue'
import GrowthSystem from '~/components/products/worlds/systems/GrowthSystem.vue'
import OneAiOsSystem from '~/components/products/worlds/systems/OneAiOsSystem.vue'
import EngineeringSystem from '~/components/products/worlds/systems/EngineeringSystem.vue'
import BusinessCloudSystem from '~/components/products/worlds/systems/BusinessCloudSystem.vue'
import DigitalTwinSystem from '~/components/products/worlds/systems/DigitalTwinSystem.vue'
defineProps<{ kind: string }>()
</script>

<template>
  <div class="wv" :data-kind="kind">
    <VisionSystem v-if="kind === 'vision'" />
    <AgentSystem v-else-if="kind === 'agents'" />
    <EdgeSystem v-else-if="kind === 'edge'" />
    <DroneSystem v-else-if="kind === 'drone'" />
    <CognitiveSystem v-else-if="kind === 'cognitive'" />
    <GrowthSystem v-else-if="kind === 'growth'" />
    <OneAiOsSystem v-else-if="kind === 'aios'" />
    <EngineeringSystem v-else-if="kind === 'engineering'" />
    <BusinessCloudSystem v-else-if="kind === 'cloud'" />
    <DigitalTwinSystem v-else-if="kind === 'twin'" />
    <!-- 01 · VISION — machine-vision instrument -->
    <svg v-else-if="kind === '_vision_legacy'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <rect x="30" y="30" width="340" height="240" fill="#0a1428" />
      <g stroke="rgba(103,232,249,0.14)" stroke-width="0.5">
        <line v-for="x in 9" :key="`vx${x}`" :x1="30 + x * 34" y1="30" :x2="30 + x * 34" y2="270" />
        <line v-for="y in 6" :key="`vy${y}`" x1="30" :y1="30 + y * 34" x2="370" :y2="30 + y * 34" />
      </g>
      <!-- moving scan line -->
      <line x1="30" y1="30" x2="370" y2="30" stroke="#67E8F9" stroke-width="1.2" opacity="0.8">
        <animate attributeName="y1" values="30;270;30" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="30;270;30" dur="6s" repeatCount="indefinite" />
      </line>
      <!-- bounding boxes -->
      <g stroke="#67E8F9" stroke-width="1.4" fill="none">
        <rect x="88" y="96" width="70" height="92"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" /></rect>
        <rect x="228" y="140" width="86" height="60"><animate attributeName="opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite" /></rect>
      </g>
      <text x="88" y="90" class="wv__t wv__t--cy">PERSON · 0.98</text>
      <text x="228" y="134" class="wv__t wv__t--cy">VEHICLE · 0.94</text>
      <!-- crosshair -->
      <g stroke="#67E8F9" stroke-width="1"><line x1="200" y1="150" x2="200" y2="150"><animate attributeName="x1" values="180;220" dur="4s" repeatCount="indefinite" /></line></g>
      <circle cx="330" cy="60" r="4" fill="#67E8F9"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" /></circle>
      <text x="40" y="286" class="wv__t">CAM 04 · 60FPS · EDGE</text>
      <text x="300" y="286" class="wv__t wv__t--cy">● REC</text>
      <!-- corner brackets -->
      <path d="M30 46 V30 H46 M354 30 H370 V46 M30 254 V270 H46 M354 270 H370 V254" stroke="#67E8F9" stroke-width="1.4" />
    </svg>

    <!-- 02 · DRONE — aerial flight command -->
    <svg v-else-if="kind === 'drone'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g stroke="rgba(16,33,74,0.1)" stroke-width="0.5">
        <line v-for="x in 11" :key="`dx${x}`" :x1="x * 36" y1="0" :x2="x * 36" y2="300" />
        <line v-for="y in 8" :key="`dy${y}`" x1="0" :y1="y * 36" x2="400" :y2="y * 36" />
      </g>
      <path id="flight" d="M40 250 C120 180 140 90 220 100 S340 200 360 60" stroke="#67E8F9" stroke-width="1.4" stroke-dasharray="5 5" fill="none" />
      <g fill="#6C87FE"><rect x="118" y="88" width="8" height="8" transform="rotate(45 122 92)" /><rect x="218" y="96" width="8" height="8" transform="rotate(45 222 100)" /></g>
      <g><polygon points="0,-6 5,4 -5,4" fill="#0a1428" stroke="#67E8F9" stroke-width="1"><animateMotion dur="7s" repeatCount="indefinite"><mpath href="#flight" /></animateMotion></polygon></g>
      <text x="20" y="24" class="wv__t">MISSION // PATROL-07</text>
      <g class="wv__ann"><text x="360" y="40" class="wv__t wv__t--cy" text-anchor="end">ALT 120M</text><text x="360" y="56" class="wv__t" text-anchor="end">4K · THERMAL</text><text x="360" y="72" class="wv__t" text-anchor="end">RTK LOCK</text></g>
      <line x1="20" y1="280" x2="380" y2="280" stroke="rgba(16,33,74,0.2)" /><text x="20" y="296" class="wv__t">FLEET 37 · BVLOS READY</text>
    </svg>

    <!-- 03 · EDGE — distributed mesh -->
    <svg v-else-if="kind === 'edge'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g stroke="rgba(103,232,249,0.35)" stroke-width="0.8">
        <line x1="80" y1="70" x2="200" y2="150" /><line x1="200" y1="150" x2="330" y2="80" /><line x1="200" y1="150" x2="90" y2="220" /><line x1="200" y1="150" x2="320" y2="210" /><line x1="80" y1="70" x2="90" y2="220" /><line x1="330" y1="80" x2="320" y2="210" />
      </g>
      <g><circle r="2" fill="#67E8F9"><animateMotion dur="3s" repeatCount="indefinite" path="M80 70 L200 150" /></circle><circle r="2" fill="#67E8F9"><animateMotion dur="3.6s" repeatCount="indefinite" path="M330 80 L200 150" /></circle><circle r="2" fill="#67E8F9"><animateMotion dur="4.2s" repeatCount="indefinite" path="M200 150 L320 210" /></circle></g>
      <g v-for="(p, i) in [[80,70],[330,80],[90,220],[320,210]]" :key="`en${i}`">
        <rect :x="p[0]! - 9" :y="p[1]! - 9" width="18" height="18" fill="#fff" stroke="#0a1428" stroke-width="1.2" />
        <circle :cx="p[0]" :cy="p[1]" r="3" fill="#67E8F9"><animate attributeName="opacity" :values="i % 2 ? '1;0.3;1' : '0.3;1;0.3'" dur="2s" repeatCount="indefinite" /></circle>
      </g>
      <circle cx="200" cy="150" r="16" fill="#0a1428" /><text x="200" y="153" text-anchor="middle" class="wv__t wv__t--w">HUB</text>
      <text x="80" y="52" text-anchor="middle" class="wv__t">11MS</text><text x="330" y="62" text-anchor="middle" class="wv__t">9MS</text>
      <text x="20" y="290" class="wv__t">2,914 NODES · 99% BANDWIDTH SAVED</text>
    </svg>

    <!-- 04 · COGNITIVE — document / prompt field -->
    <svg v-else-if="kind === 'cognitive'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g fill="#fff" stroke="rgba(16,33,74,0.18)" stroke-width="1">
        <rect x="60" y="40" width="150" height="190" transform="rotate(-4 135 135)" />
        <rect x="95" y="55" width="150" height="190" transform="rotate(3 170 150)" />
      </g>
      <g stroke="rgba(16,33,74,0.14)" stroke-width="3" stroke-linecap="round"><line x1="115" y1="80" x2="215" y2="80" /><line x1="115" y1="98" x2="230" y2="98" /><line x1="115" y1="116" x2="200" y2="116" /></g>
      <g stroke="#67E8F9" stroke-width="3" stroke-linecap="round"><line x1="115" y1="150" x2="115" y2="150"><animate attributeName="x2" values="115;235;115" dur="4s" repeatCount="indefinite" /></line></g>
      <g stroke="#6C87FE" stroke-width="0.8" fill="#6C87FE"><circle cx="300" cy="90" r="3" /><circle cx="340" cy="130" r="3" /><circle cx="300" cy="170" r="3" /><line x1="300" y1="90" x2="340" y2="130" /><line x1="340" y1="130" x2="300" y2="170" /></g>
      <text x="290" y="76" class="wv__t">KNOWLEDGE</text>
      <rect x="60" y="252" width="230" height="26" fill="#0a1428" /><text x="72" y="269" class="wv__t wv__t--cy">▸ REASON OVER 412K NODES</text>
    </svg>

    <!-- 05 · AGENTS — agent network -->
    <svg v-else-if="kind === 'agents'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <circle cx="200" cy="150" r="60" fill="none" stroke="rgba(103,232,249,0.4)" stroke-width="0.6" stroke-dasharray="3 4"><animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="24s" repeatCount="indefinite" /></circle>
      <g stroke="rgba(16,33,74,0.2)" stroke-width="0.8">
        <line v-for="(a, i) in 6" :key="`al${i}`" x1="200" y1="150" :x2="200 + 92 * Math.cos(i * 1.047)" :y2="150 + 92 * Math.sin(i * 1.047)" />
      </g>
      <g><circle r="2.4" fill="#67E8F9"><animateMotion dur="2.6s" repeatCount="indefinite" path="M292 150 L200 150" /></circle><circle r="2.4" fill="#67E8F9"><animateMotion dur="3.2s" repeatCount="indefinite" path="M200 150 L154 230" /></circle></g>
      <g v-for="(a, i) in 6" :key="`an${i}`">
        <rect :x="200 + 92 * Math.cos(i * 1.047) - 11" :y="150 + 92 * Math.sin(i * 1.047) - 11" width="22" height="22" fill="#fff" stroke="#0a1428" stroke-width="1.2" transform-origin="center" />
      </g>
      <polygon points="200,124 223,137 223,163 200,176 177,163 177,137" fill="#0a1428" /><text x="200" y="154" text-anchor="middle" class="wv__t wv__t--w">CORE</text>
      <text x="20" y="28" class="wv__t">MULTI-AGENT // ORCHESTRATION</text>
      <text x="20" y="290" class="wv__t wv__t--cy">248 AGENTS · 3,402 WORKFLOWS/HR</text>
    </svg>

    <!-- 06 · TWIN — orbital digital twin -->
    <svg v-else-if="kind === 'twin'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g stroke="rgba(103,232,249,0.5)" fill="none">
        <ellipse cx="200" cy="150" rx="150" ry="52" stroke-width="0.8"><animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="40s" repeatCount="indefinite" /></ellipse>
        <ellipse cx="200" cy="150" rx="110" ry="38" stroke-width="0.6" stroke-dasharray="4 4" />
      </g>
      <g stroke="#0a1428" stroke-width="1.2" fill="rgba(16,33,74,0.06)">
        <path d="M170 175 L200 160 L230 175 L230 130 L200 115 L170 130 Z" /><path d="M200 160 L200 115 M170 130 L230 130" />
      </g>
      <g fill="#67E8F9"><circle cx="170" cy="130" r="3"><animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" /></circle><circle cx="230" cy="130" r="3"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" repeatCount="indefinite" /></circle><circle cx="200" cy="115" r="3" /></g>
      <line x1="200" y1="115" x2="200" y2="60" stroke="rgba(16,33,74,0.3)" stroke-dasharray="2 3" /><text x="206" y="58" class="wv__t">ASSET 031</text>
      <text x="20" y="28" class="wv__t">FACILITY TWIN // NOMINAL</text>
      <text x="20" y="290" class="wv__t wv__t--cy">SYNC 480MS · FIDELITY 99.2%</text>
    </svg>

    <!-- 07 · AIOS — command core + connected systems -->
    <svg v-else-if="kind === 'aios'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <circle cx="200" cy="150" r="46" fill="#0a1428" /><circle cx="200" cy="150" r="56" fill="none" stroke="rgba(103,232,249,0.4)" stroke-width="0.6"><animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="30s" repeatCount="indefinite" /></circle>
      <text x="200" y="147" text-anchor="middle" class="wv__t wv__t--w">SVARA</text><text x="200" y="160" text-anchor="middle" class="wv__t wv__t--cy" style="font-size:6px">AI CORE</text>
      <g v-for="(s, i) in ['SAP','SALESFORCE','ZOHO','TALLY','MS 365','GOOGLE']" :key="s">
        <line x1="200" y1="150" :x2="200 + 120 * Math.cos(i * 1.047 - 0.5)" :y2="150 + 88 * Math.sin(i * 1.047 - 0.5)" stroke="rgba(16,33,74,0.16)" stroke-width="0.8" />
        <rect :x="200 + 120 * Math.cos(i * 1.047 - 0.5) - 26" :y="150 + 88 * Math.sin(i * 1.047 - 0.5) - 9" width="52" height="18" fill="#fff" stroke="rgba(16,33,74,0.2)" />
        <text :x="200 + 120 * Math.cos(i * 1.047 - 0.5)" :y="150 + 88 * Math.sin(i * 1.047 - 0.5) + 2" text-anchor="middle" class="wv__t">{{ s }}</text>
        <circle r="2" fill="#67E8F9"><animateMotion :dur="`${2 + i * 0.3}s`" repeatCount="indefinite" :path="`M${200 + 120 * Math.cos(i * 1.047 - 0.5)} ${150 + 88 * Math.sin(i * 1.047 - 0.5)} L200 150`" /></circle>
      </g>
      <text x="20" y="290" class="wv__t wv__t--cy">16+ SYSTEMS · 128 AGENTS · NL COMMAND</text>
    </svg>

    <!-- 08 · CLOUD — interconnected business core -->
    <svg v-else-if="kind === 'cloud'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <rect x="160" y="115" width="80" height="70" fill="#0a1428" /><text x="200" y="147" text-anchor="middle" class="wv__t wv__t--w">UNIFIED</text><text x="200" y="160" text-anchor="middle" class="wv__t wv__t--w">CORE</text>
      <g v-for="(m, i) in ['CRM','ERP','HRMS','LMS','HELPDESK','AGENTS']" :key="m">
        <rect :x="[40,300,40,300,40,300][i]" :y="[50,50,135,135,220,220][i]" width="60" height="30" fill="#fff" stroke="rgba(16,33,74,0.2)" />
        <text :x="[70,330,70,330,70,330][i]" :y="[68,68,153,153,238,238][i]" text-anchor="middle" class="wv__t">{{ m }}</text>
        <line :x1="[100,300,100,300,100,300][i]" :y1="[65,65,150,150,235,235][i]" x2="200" y2="150" stroke="rgba(103,232,249,0.4)" stroke-width="0.8" />
        <circle r="2" fill="#6C87FE"><animateMotion :dur="`${2.4 + i * 0.4}s`" repeatCount="indefinite" :path="`M${[100,300,100,300,100,300][i]} ${[65,65,150,150,235,235][i]} L200 150`" /></circle>
      </g>
      <text x="20" y="292" class="wv__t wv__t--cy">ONE DATA MODEL · 10+ MODULES</text>
    </svg>

    <!-- 09 · ENGINEERING — mechanical blueprint -->
    <svg v-else-if="kind === 'engineering'" class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g stroke="rgba(16,33,74,0.1)" stroke-width="0.5"><line v-for="x in 20" :key="`gx${x}`" :x1="x * 20" y1="0" :x2="x * 20" y2="300" /><line v-for="y in 15" :key="`gy${y}`" x1="0" :y1="y * 20" x2="400" :y2="y * 20" /></g>
      <g stroke="#0a1428" stroke-width="1.4" fill="none"><circle cx="110" cy="150" r="46" /><circle cx="110" cy="150" r="30" /><g><line v-for="i in 8" :key="`gt${i}`" :x1="110 + 30 * Math.cos(i * 0.785)" :y1="150 + 30 * Math.sin(i * 0.785)" :x2="110 + 50 * Math.cos(i * 0.785)" :y2="150 + 50 * Math.sin(i * 0.785)" /><animateTransform attributeName="transform" type="rotate" from="0 110 150" to="360 110 150" dur="18s" repeatCount="indefinite" /></g></g>
      <g stroke="#67E8F9" stroke-width="1.2" fill="none"><rect x="200" y="100" width="50" height="34" /><rect x="280" y="100" width="50" height="34" /><line x1="250" y1="117" x2="280" y2="117" /><polygon points="278,113 278,121 284,117" fill="#67E8F9" /></g>
      <text x="205" y="94" class="wv__t">DISCOVER</text><text x="285" y="94" class="wv__t">BUILD</text>
      <g stroke="rgba(16,33,74,0.3)" stroke-width="0.6"><line x1="200" y1="180" x2="330" y2="180" /><line x1="200" y1="176" x2="200" y2="184" /><line x1="330" y1="176" x2="330" y2="184" /></g>
      <text x="20" y="290" class="wv__t wv__t--cy">318 PIPELINES · 99.4% BUILD HEALTH</text>
    </svg>

    <!-- 10 · GROWTH — market trajectory -->
    <svg v-else class="wv__svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g stroke="rgba(16,33,74,0.1)" stroke-width="0.5"><line v-for="y in 6" :key="`ly${y}`" x1="30" :y1="y * 40 + 10" x2="380" :y2="y * 40 + 10" /></g>
      <path d="M30 240 C110 230 150 180 210 150 S320 70 380 44" stroke="#67E8F9" stroke-width="2" fill="none" stroke-dasharray="600" stroke-dashoffset="600"><animate attributeName="stroke-dashoffset" from="600" to="0" dur="2.5s" fill="freeze" repeatCount="indefinite" /></path>
      <path d="M30 240 C110 230 150 180 210 150 S320 70 380 44 L380 250 L30 250 Z" fill="url(#gwg)" opacity="0.16" />
      <defs><linearGradient id="gwg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#67E8F9" /><stop offset="1" stop-color="#67E8F9" stop-opacity="0" /></linearGradient></defs>
      <g fill="#6C87FE"><circle cx="150" cy="180" r="3" /><circle cx="270" cy="106" r="3" /><circle cx="340" cy="66" r="3" /></g>
      <line x1="270" y1="106" x2="270" y2="40" stroke="rgba(16,33,74,0.2)" stroke-dasharray="2 3" /><text x="276" y="40" class="wv__t">CAMPAIGN +22%</text>
      <text x="20" y="28" class="wv__t">FORECAST // ROAS</text>
      <text x="20" y="290" class="wv__t wv__t--cy">REACH 42.8M/MO · ATTRIBUTION LIVE</text>
    </svg>
  </div>
</template>

<style scoped>
.wv { position: relative; width: 100%; height: 100%; min-height: 100%; }
.wv__svg { width: 100%; height: 100%; display: block; }
.wv :deep(.wv__t) { font-family: var(--font-mono, monospace); font-size: 7.5px; letter-spacing: 0.12em; fill: rgba(16, 33, 74, 0.6); text-transform: uppercase; }
.wv :deep(.wv__t--cy) { fill: #1a7fa0; }
.wv :deep(.wv__t--w) { fill: #fff; font-size: 8px; }
.wv__t { font-family: var(--font-mono, monospace); font-size: 7.5px; letter-spacing: 0.12em; fill: rgba(16, 33, 74, 0.6); text-transform: uppercase; }
.wv__t--cy { fill: #1a7fa0; }
.wv__t--w { fill: #fff; }
@media (prefers-reduced-motion: reduce) { .wv__svg :deep(animate), .wv__svg :deep(animateMotion), .wv__svg :deep(animateTransform) { display: none; } }
</style>
