<script setup lang="ts">
interface IndustrySignal {
  type: string
  frequency: string
  latency: string
  connector: string
}

interface Industry {
  id: string
  name: string
  signals: number
  deployments: number
  roi: string
  signalList: IndustrySignal[]
}

const INDUSTRIES: Industry[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    signals: 847000,
    deployments: 234,
    roi: '340%',
    signalList: [
      { type: 'Vibration Sensors', frequency: '10 kHz', latency: '<50ms', connector: 'OPC-UA' },
      { type: 'Thermal Cameras', frequency: '30 Hz', latency: '<100ms', connector: 'RTSP' },
      { type: 'PLC Telemetry', frequency: '1 Hz', latency: '<10ms', connector: 'Modbus' },
      { type: 'Quality Vision', frequency: '60 fps', latency: '<200ms', connector: 'MQTT' },
      { type: 'Energy Meters', frequency: '1/min', latency: '<1s', connector: 'Modbus' },
      { type: 'ERP Events', frequency: 'Event', latency: '<500ms', connector: 'REST' },
    ]
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    signals: 523000,
    deployments: 156,
    roi: '280%',
    signalList: [
      { type: 'SCADA Telemetry', frequency: '1 Hz', latency: '<100ms', connector: 'DNP3' },
      { type: 'PMU Synchrophasors', frequency: '30-60 fps', latency: '<20ms', connector: 'IEEE C37.118' },
      { type: 'Smart Meters', frequency: '15 min', latency: '<5s', connector: 'DLMS/COSEM' },
      { type: 'Drone Inspection', frequency: 'Event', latency: '<1s', connector: 'RTSP' },
      { type: 'Weather Stations', frequency: '1/min', latency: '<1s', connector: 'MQTT' },
      { type: 'Asset Sensors', frequency: '1 Hz', latency: '<50ms', connector: 'OPC-UA' },
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics',
    signals: 412000,
    deployments: 189,
    roi: '410%',
    signalList: [
      { type: 'GPS Trackers', frequency: '10 sec', latency: '<2s', connector: 'MQTT' },
      { type: 'Warehouse Scanners', frequency: 'Event', latency: '<100ms', connector: 'HTTPS' },
      { type: 'Dock Cameras', frequency: '15 fps', latency: '<200ms', connector: 'RTSP' },
      { type: 'Fleet Telematics', frequency: '1 Hz', latency: '<500ms', connector: 'CAN Bus' },
      { type: 'Inventory RFID', frequency: 'Event', latency: '<50ms', connector: 'MQTT' },
      { type: 'WMS Events', frequency: 'Event', latency: '<200ms', connector: 'REST' },
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    signals: 298000,
    deployments: 98,
    roi: '220%',
    signalList: [
      { type: 'Patient Monitors', frequency: '125 Hz', latency: '<10ms', connector: 'HL7' },
      { type: 'Imaging Systems', frequency: 'Event', latency: '<5s', connector: 'DICOM' },
      { type: 'Lab Automation', frequency: 'Event', latency: '<1s', connector: 'ASTM' },
      { type: 'Asset Tracking', frequency: '1/min', latency: '<2s', connector: 'BLE' },
      { type: 'EHR Events', frequency: 'Event', latency: '<500ms', connector: 'FHIR' },
      { type: 'Environmental', frequency: '1/min', latency: '<1s', connector: 'MQTT' },
    ]
  },
  {
    id: 'retail',
    name: 'Retail',
    signals: 387000,
    deployments: 167,
    roi: '190%',
    signalList: [
      { type: 'POS Transactions', frequency: 'Event', latency: '<100ms', connector: 'REST' },
      { type: 'Store Cameras', frequency: '15 fps', latency: '<200ms', connector: 'RTSP' },
      { type: 'Inventory RFID', frequency: 'Event', latency: '<50ms', connector: 'MQTT' },
      { type: 'Footfall Sensors', frequency: '1/min', latency: '<1s', connector: 'MQTT' },
      { type: 'E-commerce Events', frequency: 'Event', latency: '<200ms', connector: 'Webhook' },
      { type: 'Supply Chain EDI', frequency: 'Event', latency: '<5s', connector: 'AS2' },
    ]
  },
  {
    id: 'public',
    name: 'Public Sector',
    signals: 156000,
    deployments: 45,
    roi: '180%',
    signalList: [
      { type: 'Traffic Cameras', frequency: '30 fps', latency: '<200ms', connector: 'RTSP' },
      { type: 'Environmental', frequency: '1/min', latency: '<1s', connector: 'MQTT' },
      { type: 'Infrastructure', frequency: '1 Hz', latency: '<100ms', connector: 'OPC-UA' },
      { type: 'Emergency Dispatch', frequency: 'Event', latency: '<500ms', connector: 'REST' },
      { type: 'Transit GPS', frequency: '10 sec', latency: '<2s', connector: 'GTFS-RT' },
      { type: '311 Reports', frequency: 'Event', latency: '<1s', connector: 'REST' },
    ]
  },
  {
    id: 'telecom',
    name: 'Telecommunications',
    signals: 678000,
    deployments: 112,
    roi: '310%',
    signalList: [
      { type: 'Cell Tower KPIs', frequency: '15 min', latency: '<1s', connector: 'SNMP' },
      { type: 'Core Network', frequency: '1 sec', latency: '<100ms', connector: 'Kafka' },
      { type: 'Subscriber Events', frequency: 'Event', latency: '<200ms', connector: 'REST' },
      { type: 'Fiber Sensors', frequency: '1 Hz', latency: '<50ms', connector: 'NETCONF' },
      { type: 'Edge Compute', frequency: 'Event', latency: '<10ms', connector: 'gRPC' },
      { type: 'Billing/CDR', frequency: 'Event', latency: '<5s', connector: 'SFTP' },
    ]
  },
  {
    id: 'finance',
    name: 'Financial Services',
    signals: 234000,
    deployments: 78,
    roi: '250%',
    signalList: [
      { type: 'Transaction Streams', frequency: 'Event', latency: '<10ms', connector: 'Kafka' },
      { type: 'Market Data', frequency: '1 ms', latency: '<1ms', connector: 'FIX' },
      { type: 'Risk Models', frequency: 'Event', latency: '<50ms', connector: 'gRPC' },
      { type: 'Fraud Alerts', frequency: 'Event', latency: '<100ms', connector: 'REST' },
      { type: 'Compliance Logs', frequency: 'Event', latency: '<1s', connector: 'Syslog' },
      { type: 'Customer Events', frequency: 'Event', latency: '<200ms', connector: 'Webhook' },
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    signals: 189000,
    deployments: 67,
    roi: '380%',
    signalList: [
      { type: 'Soil Sensors', frequency: '15 min', latency: '<1s', connector: 'LoRaWAN' },
      { type: 'Drone Imagery', frequency: 'Event', latency: '<2s', connector: 'RTSP' },
      { type: 'Equipment Telematics', frequency: '1 Hz', latency: '<500ms', connector: 'ISOBUS' },
      { type: 'Weather Stations', frequency: '1/min', latency: '<1s', connector: 'MQTT' },
      { type: 'Irrigation Controls', frequency: 'Event', latency: '<200ms', connector: 'MQTT' },
      { type: 'Yield Monitors', frequency: 'Event', latency: '<5s', connector: 'ISOXML' },
    ]
  },
  {
    id: 'construction',
    name: 'Construction',
    signals: 134000,
    deployments: 54,
    roi: '270%',
    signalList: [
      { type: 'Equipment Telematics', frequency: '1 Hz', latency: '<500ms', connector: 'J1939' },
      { type: 'Site Cameras', frequency: '1 fps', latency: '<1s', connector: 'RTSP' },
      { type: 'Laser Scanners', frequency: 'Event', latency: '<2s', connector: 'REST' },
      { type: 'Environmental', frequency: '1/min', latency: '<1s', connector: 'MQTT' },
      { type: 'Wearable Safety', frequency: 'Event', latency: '<500ms', connector: 'BLE' },
      { type: 'BIM Updates', frequency: 'Event', latency: '<5s', connector: 'IFC' },
    ]
  },
  {
    id: 'aerospace',
    name: 'Aerospace',
    signals: 98000,
    deployments: 23,
    roi: '420%',
    signalList: [
      { type: 'Engine Telemetry', frequency: '1 kHz', latency: '<10ms', connector: 'ARINC 429' },
      { type: 'Flight Data', frequency: 'Event', latency: '<100ms', connector: 'AFDX' },
      { type: 'Ground Sensors', frequency: '1 Hz', latency: '<50ms', connector: 'OPC-UA' },
      { type: 'Maintenance Logs', frequency: 'Event', latency: '<1s', connector: 'S1000D' },
      { type: 'Supply Chain', frequency: 'Event', latency: '<5s', connector: 'EDI' },
      { type: 'Simulator Data', frequency: '60 fps', latency: '<20ms', connector: 'HLA' },
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive',
    signals: 445000,
    deployments: 134,
    roi: '360%',
    signalList: [
      { type: 'Vehicle CAN Bus', frequency: '100 Hz', latency: '<10ms', connector: 'CAN FD' },
      { type: 'Assembly Cameras', frequency: '30 fps', latency: '<50ms', connector: 'GigE Vision' },
      { type: 'Robot Controllers', frequency: '1 kHz', latency: '<1ms', connector: 'OPC-UA' },
      { type: 'Test Bench Data', frequency: 'Event', latency: '<100ms', connector: 'XCP' },
      { type: 'Supply Chain', frequency: 'Event', latency: '<5s', connector: 'EDIFACT' },
      { type: 'Fleet Telemetry', frequency: '10 sec', latency: '<2s', connector: 'MQTT' },
    ]
  },
] as const

const selected = ref(INDUSTRIES[0].id)

const selectedIndustry = computed(() => INDUSTRIES.find(i => i.id === selected.value) || INDUSTRIES[0])
</script>

<template>
  <div class="industry-panel">
    <!-- Selector -->
    <div class="industry-selector" role="combobox" aria-label="Select industry">
      <select
        v-model="selected"
        class="industry-selector__select"
        @change="() => {}"
      >
        <option v-for="i in INDUSTRIES" :key="i.id" :value="i.id">
          {{ i.name }} ({{ i.deployments }} deployments)
        </option>
      </select>
    </div>

    <!-- Topology SVG -->
    <div class="industry-topology" role="img" :aria-label="`${selectedIndustry.name} signal topology`">
      <IndustryTopology :industry="selectedIndustry" />
    </div>

    <!-- Metrics row -->
    <div class="industry-metrics">
      <div class="metric">
        <span class="metric__label">Signals/Day</span>
        <span class="metric__value tabular-nums">{{ selectedIndustry.signals.toLocaleString() }}</span>
      </div>
      <div class="metric">
        <span class="metric__label">Deployments</span>
        <span class="metric__value tabular-nums">{{ selectedIndustry.deployments }}</span>
      </div>
      <div class="metric">
        <span class="metric__label">Typical ROI</span>
        <span class="metric__value">{{ selectedIndustry.roi }}</span>
      </div>
      <div class="metric">
        <span class="metric__label">Reference Arch</span>
        <span class="metric__value">3-node → 50-node</span>
      </div>
    </div>

    <!-- Signal inventory table -->
    <table class="signal-table" aria-label="Signal inventory">
      <thead>
        <tr>
          <th scope="col">Signal Type</th>
          <th scope="col">Frequency</th>
          <th scope="col">Latency Budget</th>
          <th scope="col">Connector</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in selectedIndustry.signalList" :key="s.type">
          <td>{{ s.type }}</td>
          <td><span class="font-mono">{{ s.frequency }}</span></td>
          <td><span class="font-mono">{{ s.latency }}</span></td>
          <td><span class="tag tag--product">{{ s.connector }}</span></td>
        </tr>
      </tbody>
    </table>

    <NuxtLink :to="`/industries/${selectedIndustry.id}`" class="industry-detail-link">
      Open reference architecture →
    </NuxtLink>
  </div>
</template>

<style scoped>
.industry-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-2);
  overflow-y: auto;
}

.industry-selector__select {
  width: 100%;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  padding-right: var(--space-8);
}

.industry-selector__select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-bg);
}

.industry-topology {
  aspect-ratio: 1;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  overflow: hidden;
}

.industry-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

.metric {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  padding: var(--space-3);
  text-align: center;
}

.metric__label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-1);
}

.metric__value {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--fg);
}

.signal-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-xs);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  overflow: hidden;
}

.signal-table th,
.signal-table td {
  padding: var(--space-2) var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
}

.signal-table th {
  background: var(--bg-panel);
  color: var(--fg-faint);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.signal-table td {
  color: var(--fg);
}

.signal-table tr:last-child td {
  border-bottom: none;
}

.signal-table tr:hover td {
  background: var(--bg-hover);
}

.tag--product {
  border-color: var(--accent);
  color: var(--accent);
  font-size: 9px;
}

.industry-detail-link {
  display: inline-block;
  margin-top: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
}

.industry-detail-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .industry-metrics { grid-template-columns: repeat(2, 1fr); }
}
</style>