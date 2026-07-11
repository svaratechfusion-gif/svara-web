<script setup lang="ts">
interface Industry {
  id: string
  name: string
  signals: number
  deployments: number
  roi: string
  signalList: { type: string; frequency: string; latency: string; connector: string }[]
}

interface Props {
  industry: Industry
}

const props = defineProps<Props>()

// Topology node positions for each industry
const topologies: Record<string, { nodes: Array<{ id: string; label: string; x: number; y: number; type: 'source' | 'process' | 'sink' | 'action' }>; edges: Array<{ from: string; to: string }> }> = {
  manufacturing: {
    nodes: [
      { id: 'plc', label: 'PLC/SCADA', x: 10, y: 50, type: 'source' },
      { id: 'cameras', label: 'Cameras', x: 10, y: 75, type: 'source' },
      { id: 'sensors', label: 'IoT Sensors', x: 10, y: 25, type: 'source' },
      { id: 'sense', label: 'SENSE', x: 35, y: 35, type: 'process' },
      { id: 'stream', label: 'STREAM', x: 35, y: 65, type: 'process' },
      { id: 'parse', label: 'PARSE', x: 55, y: 50, type: 'process' },
      { id: 'forecast', label: 'FORECAST', x: 75, y: 30, type: 'process' },
      { id: 'anomaly', label: 'ANOMALY', x: 75, y: 50, type: 'process' },
      { id: 'risk', label: 'RISK', x: 75, y: 70, type: 'process' },
      { id: 'direct', label: 'DIRECT', x: 92, y: 50, type: 'action' },
      { id: 'mes', label: 'MES/ERP', x: 92, y: 20, type: 'sink' },
      { id: 'cmms', label: 'CMMS', x: 92, y: 80, type: 'sink' },
    ],
    edges: [
      { from: 'plc', to: 'sense' }, { from: 'cameras', to: 'stream' }, { from: 'sensors', to: 'sense' },
      { from: 'sense', to: 'parse' }, { from: 'stream', to: 'parse' },
      { from: 'parse', to: 'forecast' }, { from: 'parse', to: 'anomaly' }, { from: 'parse', to: 'risk' },
      { from: 'forecast', to: 'direct' }, { from: 'anomaly', to: 'direct' }, { from: 'risk', to: 'direct' },
      { from: 'direct', to: 'mes' }, { from: 'direct', to: 'cmms' },
    ]
  },
  energy: {
    nodes: [
      { id: 'scada', label: 'SCADA', x: 10, y: 50, type: 'source' },
      { id: 'pmus', label: 'PMUs', x: 10, y: 25, type: 'source' },
      { id: 'smart', label: 'Smart Meters', x: 10, y: 75, type: 'source' },
      { id: 'sense', label: 'SENSE', x: 35, y: 35, type: 'process' },
      { id: 'stream', label: 'STREAM', x: 35, y: 65, type: 'process' },
      { id: 'parse', label: 'PARSE', x: 55, y: 50, type: 'process' },
      { id: 'forecast', label: 'FORECAST', x: 75, y: 30, type: 'process' },
      { id: 'anomaly', label: 'ANOMALY', x: 75, y: 70, type: 'process' },
      { id: 'direct', label: 'DIRECT', x: 92, y: 50, type: 'action' },
      { id: 'ems', label: 'EMS', x: 92, y: 20, type: 'sink' },
      { id: 'derms', label: 'DERMS', x: 92, y: 80, type: 'sink' },
    ],
    edges: [
      { from: 'scada', to: 'sense' }, { from: 'pmus', to: 'sense' }, { from: 'smart', to: 'stream' },
      { from: 'sense', to: 'parse' }, { from: 'stream', to: 'parse' },
      { from: 'parse', to: 'forecast' }, { from: 'parse', to: 'anomaly' },
      { from: 'forecast', to: 'direct' }, { from: 'anomaly', to: 'direct' },
      { from: 'direct', to: 'ems' }, { from: 'direct', to: 'derms' },
    ]
  },
  logistics: {
    nodes: [
      { id: 'gps', label: 'GPS/Telematics', x: 10, y: 50, type: 'source' },
      { id: 'wms', label: 'WMS', x: 10, y: 25, type: 'source' },
      { id: 'cameras', label: 'Dock Cameras', x: 10, y: 75, type: 'source' },
      { id: 'sense', label: 'SENSE', x: 35, y: 35, type: 'process' },
      { id: 'stream', label: 'STREAM', x: 35, y: 65, type: 'process' },
      { id: 'parse', label: 'PARSE', x: 55, y: 50, type: 'process' },
      { id: 'forecast', label: 'FORECAST', x: 75, y: 30, type: 'process' },
      { id: 'optimize', label: 'OPTIMIZE', x: 75, y: 70, type: 'process' },
      { id: 'direct', label: 'DIRECT', x: 92, y: 50, type: 'action' },
      { id: 'tms', label: 'TMS', x: 92, y: 20, type: 'sink' },
      { id: 'wcs', label: 'WCS', x: 92, y: 80, type: 'sink' },
    ],
    edges: [
      { from: 'gps', to: 'sense' }, { from: 'wms', to: 'sense' }, { from: 'cameras', to: 'stream' },
      { from: 'sense', to: 'parse' }, { from: 'stream', to: 'parse' },
      { from: 'parse', to: 'forecast' }, { from: 'parse', to: 'optimize' },
      { from: 'forecast', to: 'direct' }, { from: 'optimize', to: 'direct' },
      { from: 'direct', to: 'tms' }, { from: 'direct', to: 'wcs' },
    ]
  }
}

const topology = computed(() => topologies[props.industry.id] || topologies.manufacturing)

const typeColors = {
  source: 'var(--accent)',
  process: 'var(--positive)',
  action: 'var(--warning)',
  sink: 'var(--negative)'
}

function nodeWidth(label: string) {
  return Math.max(50, label.length * 4.5 + 10)
}

function getNode(nodeId: string) {
  return topology.value.nodes.find(n => n.id === nodeId)
}

function getEdgePath(fromId: string, toId: string) {
  const from = getNode(fromId)
  const to = getNode(toId)
  if (!from || !to) return ''

  const fromX = from.x + nodeWidth(from.label)
  const fromY = from.y + 11
  const toX = to.x
  const toY = to.y + 11

  const midX = (fromX + toX) / 2
  return `M${fromX},${fromY} C${midX},${fromY} ${midX},${toY} ${toX},${toY}`
}

function getEdgeColor(fromId: string, toId: string) {
  const from = getNode(fromId)
  const to = getNode(toId)
  if (!from || !to) return 'var(--border-strong)'
  return typeColors[from.type as keyof typeof typeColors] || 'var(--border-strong)'
}
</script>

<template>
  <svg viewBox="0 0 100 100" class="topology-svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,4 L6,2 Z" fill="var(--border-strong)" />
      </marker>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Edges -->
    <g class="topology-edges" stroke="var(--border-strong)" stroke-width="1" fill="none" marker-end="url(#arrowhead)">
      <path
        v-for="edge in topology.edges"
        :key="`${edge.from}-${edge.to}`"
        :d="getEdgePath(edge.from, edge.to)"
        :stroke="getEdgeColor(edge.from, edge.to)"
      />
    </g>

    <!-- Nodes -->
    <g class="topology-nodes">
      <g
        v-for="node in topology.nodes"
        :key="node.id"
        class="topology-node"
        :transform="`translate(${node.x}, ${node.y})`"
      >
        <rect
          :width="nodeWidth(node.label)"
          :height="22"
          x="0"
          y="0"
          rx="4"
          :fill="typeColors[node.type]"
          :filter="node.type === 'process' ? 'url(#glow)' : 'none'"
          opacity="0.15"
        />
        <rect
          :width="nodeWidth(node.label)"
          :height="22"
          x="0"
          y="0"
          rx="4"
          :stroke="typeColors[node.type]"
          stroke-width="1"
          fill="none"
        />
        <text
          x="50%"
          y="14"
          text-anchor="middle"
          :fill="typeColors[node.type]"
          font-family="var(--font-mono)"
          font-size="7"
          font-weight="500"
        >
          {{ node.label }}
        </text>
      </g>
    </g>

    <!-- Legend -->
    <g class="topology-legend" transform="translate(5, 5)">
      <g v-for="[type, color] in Object.entries(typeColors)" :key="type" :transform="`translate(0, ${({source:0, process:16, action:32, sink:48}[type])})`">
        <rect x="0" y="0" width="10" height="10" rx="2" :fill="color" opacity="0.15" :stroke="color" stroke-width="1"/>
        <text x="14" y="8" font-family="var(--font-mono)" font-size="7" fill="var(--fg-muted)" text-anchor="start">
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}
        </text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.topology-svg {
  width: 100%;
  height: 100%;
  background: var(--bg);
}

.topology-node text {
  user-select: none;
  pointer-events: none;
}

.topology-legend text {
  user-select: none;
  pointer-events: none;
}

[data-density="dense"] .topology-svg {
  font-size: 0.9rem;
}

[data-density="comfortable"] .topology-svg {
  font-size: 1.1rem;
}
</style>