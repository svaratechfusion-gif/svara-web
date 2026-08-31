// SVARA DIGITAL TWIN PLATFORM — verbatim content for the immersive Explore experience.
// Factored out of TwinExplore.vue to keep the component focused on structure, interaction and
// styling. All strings / figures are VERBATIM from the source (P06); nothing is invented.

export interface KV { k: string; v: string }

export const HERO_LINES = ['Test before you build.', 'Decide before you act.'] as const
export const BOOT: KV[] = [
  { k: 'SENSORS', v: 'ACTIVE' },
  { k: 'SYNC', v: '< 500MS' },
  { k: 'AI ANALYSIS', v: 'ONLINE' },
  { k: 'SIMULATIONS', v: 'READY' },
]
export const HEAD_STATUS: KV[] = [
  { k: 'SYNC', v: '< 500 MS' },
  { k: 'SENSORS', v: 'ACTIVE' },
  { k: 'SIMULATIONS', v: 'READY' },
]

export const PHYS_ELEMENTS = ['MACHINES', 'PIPES', 'WORKERS', 'VEHICLES', 'SENSORS', 'INFRASTRUCTURE']
export interface TwinPair { p: string; d: string }
export const TWIN_PAIRS: TwinPair[] = [
  { p: 'MACHINE 01', d: 'TWIN 01' },
  { p: 'SENSOR 14', d: 'TWIN SENSOR 14' },
  { p: 'LINE 03', d: 'DIGITAL LINE 03' },
]
export const FEEDS = ['IoT', 'SCADA / PLC', 'BACnet / Modbus', 'Edge AI', 'APIs']

export interface LiveMetric { l: string; v: string }
export const LIVE_METRICS: LiveMetric[] = [
  { l: 'TEMPERATURE', v: '68.4 °C' }, { l: 'PRESSURE', v: '4.2 BAR' }, { l: 'LOAD', v: '82 %' },
  { l: 'SPEED', v: '1,480 RPM' }, { l: 'ENERGY', v: '214 KW' }, { l: 'STATUS', v: 'NOMINAL' },
]
export interface Layer { k: string; b: string }
export const LAYERS: Layer[] = [
  { k: 'PHYSICAL GEOMETRY', b: 'The 3D structure — assets, machines and infrastructure with their spatial relationships.' },
  { k: 'OPERATIONAL DATA', b: 'Live sensor values, throughput, status and system state mapped onto the geometry.' },
  { k: 'AI INSIGHTS', b: 'Anomaly markers, predictions and optimisation recommendations layered over the model.' },
]
export const TIMELINE = ['NOW', 'T-1H', 'T-1D', 'T-1W']

export interface Scenario { k: string; d: string }
export const SCENARIOS: Scenario[] = [
  { k: 'SCENARIO A', d: 'Current configuration' },
  { k: 'SCENARIO B', d: 'New equipment' },
  { k: 'SCENARIO C', d: 'Layout change' },
  { k: 'SCENARIO D', d: 'Demand surge' },
  { k: 'SCENARIO E', d: 'Emergency event' },
]
export const WHATIF_PARAMS = ['LAYOUT', 'PROCESS', 'EQUIPMENT', 'POLICY', 'CAPACITY']
export const WHATIF_CHAIN = ['SIMULATING', 'SCENARIO COMPLETE', 'PREDICTED OUTCOME']
export const EMERGENCIES = ['EQUIPMENT FAILURE', 'FIRE', 'SECURITY BREACH', 'EVACUATION']
export const EMERGENCY_CHAIN = ['SIMULATING', 'ENVIRONMENT RESPONDING', 'ZERO REAL-WORLD RISK']
export const CAPACITY_CHAIN = ['CURRENT DEMAND', 'DEMAND SURGE', 'SIMULATE', 'INFRASTRUCTURE REQUIREMENT']
export const URBAN_LAYERS = ['TRAFFIC', 'UTILITY LOAD', 'PUBLIC SPACE']
export const URBAN_SCENARIOS = ['TRAFFIC SURGE', 'NEW ROAD', 'UTILITY DEMAND', 'EMERGENCY RESPONSE']

export interface Predictive { n: string; k: string; flow?: string[]; list?: string[]; badge?: string; note?: string }
export const PREDICTIVE: Predictive[] = [
  { n: '01', k: 'PREDICTIVE MAINTENANCE', flow: ['EQUIPMENT HEALTH TREND', 'DEGRADATION DETECTED'], badge: 'PREDICTED FAILURE WINDOW: 2–6 WEEKS' },
  { n: '02', k: 'PERFORMANCE OPTIMISATION', flow: ['CURRENT PARAMETER', 'AI RECOMMENDATION', 'OPTIMISED PARAMETER'] },
  { n: '03', k: 'SUPPLY CHAIN SIMULATION', flow: ['SUPPLIER DISRUPTION', 'SIMULATION', 'MITIGATION STRATEGY'] },
  { n: '04', k: 'ENERGY OPTIMISATION', flow: ['CURRENT LOAD', 'SIMULATE DISTRIBUTION', 'REDUCED CONSUMPTION'], note: 'Without reducing output.' },
  { n: '05', k: 'ASSET LIFECYCLE', list: ['ASSET AGE', 'MAINTENANCE', 'REPLACEMENT', 'UPGRADE', 'ROI'] },
]

export const TRAINING_SCENARIOS = ['NORMAL OPERATION', 'EQUIPMENT FAILURE', 'EMERGENCY', 'EVACUATION', 'CRISIS PROTOCOL']
export const CONTROLS_3D = ['ROTATE', 'ZOOM', 'PAN', 'INSPECT', 'MEASURE', 'ANNOTATE']
export interface CollabUser { k: string; loc: string }
export const COLLAB_USERS: CollabUser[] = [
  { k: 'USER 01', loc: 'BENGALURU' }, { k: 'USER 02', loc: 'MUMBAI' }, { k: 'USER 03', loc: 'SITE' },
]
export const COLLAB_NOTES = ['CHECK VALVE', 'REVIEW LOAD', 'INSPECT ASSET']
export const XR_CHAIN = ['WEB 3D', 'VR', 'AR']

export const ECO_SYSTEMS = ['CCTV', 'DRONE AI', 'EDGE AI', 'AUTONOMOUS AGENTS']

export interface Diff { n: string; k: string; trad: string[]; svara: string[] }
export const DIFFERENTIATORS: Diff[] = [
  { n: '01', k: 'AI INTEGRATION', trad: ['Static models', 'Manual updates'], svara: ['Live AI-driven twin', 'Learns + adapts continuously'] },
  { n: '02', k: 'SVARA ECOSYSTEM', trad: ['Standalone simulation'], svara: ['CCTV + Drone + Edge AI + Agents'] },
  { n: '03', k: 'VERTICAL DEPTH', trad: [], svara: ['Manufacturing', 'Smart City', 'Port', 'Hospital', 'Data Centre'] },
  { n: '04', k: 'ACCESSIBILITY', trad: [], svara: ['No-code twin builder', 'Advanced API'] },
]
export const BUILDER_BLOCKS = ['ASSET', 'SENSOR', 'DATA SOURCE', 'MODEL', 'RULE', 'AI']

export interface Vertical { k: string; env: string; apps: string[]; outcome: string[] }
export const VERTICALS: Vertical[] = [
  { k: 'MANUFACTURING', env: 'PRODUCTION FACILITY', apps: ['Production line simulation', 'Equipment twin', 'Quality optimisation', 'Layout planning'], outcome: ['15–25% OEE improvement', '30–50% reduction in unplanned downtime'] },
  { k: 'SMART CITIES', env: 'CITY ENVIRONMENT', apps: ['Traffic flow', 'Utility network', 'Emergency response'], outcome: ['Infrastructure investment optimisation', 'Emergency response improvement'] },
  { k: 'ENERGY & UTILITIES', env: 'GRID', apps: ['Grid load twin', 'Renewable integration simulation', 'Asset lifecycle modelling'], outcome: ['Energy waste reduction', 'Maintenance cost optimisation'] },
  { k: 'PORTS & LOGISTICS', env: 'PORT · CONTAINERS · VESSELS', apps: ['Berth allocation', 'Container yard twin', 'Vessel traffic modelling'], outcome: ['10–20% throughput improvement', 'Demurrage reduction'] },
  { k: 'HEALTHCARE', env: 'HOSPITAL', apps: ['Facility flow simulation', 'Equipment utilisation twin', 'Emergency drill environment'], outcome: ['Patient flow improvement', 'Capital investment optimisation'] },
  { k: 'CONSTRUCTION & REAL ESTATE', env: 'BUILDING / SITE', apps: ['BIM integration', 'Site progress twin', 'Safety simulation', 'Handover documentation'], outcome: ['Project delivery risk reduction', 'Post-occupancy performance monitoring'] },
]

export interface ArchLayer { k: string; items: string[] }
export const ARCH: ArchLayer[] = [
  { k: 'DATA INGESTION', items: ['IoT SENSORS', 'SCADA / PLC', 'BACnet / Modbus', 'SVARA EDGE AI', 'THIRD-PARTY APIs'] },
  { k: 'TWIN ENGINE', items: ['Physics-based simulation core', 'AI semantic layer', 'Real-time sync adapter'] },
  { k: 'STORAGE', items: ['Time-series database', 'Graph database'] },
  { k: 'VISUALISATION', items: ['Web 3D engine'] },
  { k: 'AI MODELS', items: ['Anomaly detection', 'Predictive maintenance', 'Optimisation recommendation'] },
  { k: 'API-FIRST LAYER', items: ['SVARA AGENTS', 'AI WRAPPER', 'THIRD-PARTY SYSTEMS'] },
]
export const TECH_STACK: KV[] = [
  { k: 'TIME SERIES', v: 'InfluxDB / TimescaleDB' },
  { k: 'GRAPH', v: 'Graph database' },
  { k: '3D', v: 'Three.js / CesiumJS' },
]
export const API_TARGETS = ['SVARA AGENTS', 'AI WRAPPER', 'THIRD-PARTY SYSTEMS']

export interface Tier { n: string; k: string; spec: string[]; v: string }
export const COMMERCIAL: Tier[] = [
  { n: '01', k: 'ASSET TWIN', spec: ['Single facility or asset', 'Monitoring', 'Basic simulation'], v: '₹3L–₹12L / month' },
  { n: '02', k: 'ENTERPRISE TWIN PLATFORM', spec: ['Multi-site digital twin network', 'Predictive AI', 'Scenario simulation'], v: '₹15L–₹60L / month' },
  { n: '03', k: 'SMART CITY / INFRASTRUCTURE', spec: ['City-scale twin', 'Government integration', 'Multi-year managed service'], v: '₹2Cr–₹30Cr+ project-based' },
  { n: '04', k: 'IMPLEMENTATION & MODELLING', spec: ['3D model creation', 'Sensor integration', 'Calibration', 'Go-live'], v: '₹10L–₹2Cr one-time' },
]

export const CMD_TELEMETRY: KV[] = [
  { k: 'TWIN STATUS', v: 'LIVE' }, { k: 'SYNC', v: '< 500MS' }, { k: 'SENSORS', v: 'CONNECTED' },
  { k: 'ANOMALIES', v: 'DETECTED' }, { k: 'SCENARIOS', v: 'RUNNING' }, { k: 'PREDICTIONS', v: 'ACTIVE' },
]
export const CMD_RING = ['LIVE DATA', 'SIMULATION', 'PREDICTION', 'TRAINING', 'OPTIMISATION']
export const FINAL_CHAIN = ['SIMULATING', 'SCENARIO RESULT', 'PREDICTED IMPACT', 'RECOMMENDATION', 'DECISION']
