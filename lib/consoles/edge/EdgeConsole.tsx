/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck — React console runtime; excluded from vue-tsc.
// EDGE AI — distributed inference infrastructure. Left: animated network
// topology (core → regional gateways → edge nodes) with packets flowing on
// the links. Right: node roster with per-node compute utilization, cluster
// gauges and an ops log.
import React from "react"
import { motion } from "framer-motion"
import { ConsoleShell, Panel, Feed, Stat, Chip, UtilBar } from "../core/primitives"
import { StreamChart, RadialGauge } from "../core/charts"
import { useFeed, useStream, useWalk, fmt } from "../core/useLive"
import { pick } from "../core/seed"

// topology: 1 core, 3 gateways, 9 nodes
const GATEWAYS = [
  { id: "GW-N", x: 25, y: 38 }, { id: "GW-C", x: 50, y: 34 }, { id: "GW-S", x: 75, y: 38 },
]
const NODES = [
  { id: "EN-101", gw: 0, x: 10, y: 68 }, { id: "EN-102", gw: 0, x: 24, y: 72 }, { id: "EN-103", gw: 0, x: 36, y: 66 },
  { id: "EN-204", gw: 1, x: 44, y: 72 }, { id: "EN-205", gw: 1, x: 56, y: 68 },
  { id: "EN-306", gw: 2, x: 66, y: 72 }, { id: "EN-307", gw: 2, x: 78, y: 66 }, { id: "EN-308", gw: 2, x: 90, y: 70 },
]
const CORE = { x: 50, y: 10 }

const OPS = [
  "Model shard synced to EN-204 (42 MB)",
  "EN-307 thermal throttle cleared",
  "OTA rollout 2.4.1 — wave 2 complete",
  "Failover drill passed — GW-S",
  "Quantized int8 engine deployed",
  "Mesh re-route: EN-103 → GW-C",
  "Telemetry backlog flushed (11k msgs)",
  "New node enrolled: EN-309 staging",
]

function link(a: { x: number, y: number }, b: { x: number, y: number }) {
  return `M${a.x},${a.y} C${a.x},${(a.y + b.y) / 2} ${b.x},${(a.y + b.y) / 2} ${b.x},${b.y}`
}

export default function EdgeConsole() {
  const inference = useStream("edge:inf", { min: 220, max: 480, points: 44, ms: 900 })
  const cpuAvg = useWalk("edge:cpu", { min: 38, max: 78, ms: 1400 })
  const memAvg = useWalk("edge:mem", { min: 51, max: 74, ms: 1700 })
  const netIn = useWalk("edge:net", { min: 1.4, max: 4.2, ms: 1100 })
  const nodeUtil = NODES.map((n, i) => useWalk(`edge:${n.id}`, { min: 22 + (i % 4) * 8, max: 68 + (i % 5) * 6, ms: 1300 + i * 90 }))

  const log = useFeed({
    ms: 3100, cap: 6,
    prime: OPS.slice(0, 3).map(m => ({ title: m })),
    make: () => (Math.random() < 0.25 ? null : { title: pick(OPS) }),
  })

  return (
    <ConsoleShell title="SVARA Edge AI" meta="Fleet: 2,914 nodes · 3 regions" status="MESH HEALTHY">
      <div className="ex">
        <div className="ex-main">
          <div className="cx-view ex-topo">
            <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {/* links with flowing packets */}
              {GATEWAYS.map((g, i) => (
                <g key={g.id}>
                  <path d={link(CORE, g)} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.3" />
                  <circle r="0.8" fill="#4DA3FF">
                    <animateMotion dur={`${2.2 + i * 0.5}s`} repeatCount="indefinite" path={link(CORE, g)} />
                  </circle>
                  <circle r="0.6" fill="rgba(255,255,255,0.6)">
                    <animateMotion dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" path={link(CORE, g)} />
                  </circle>
                </g>
              ))}
              {NODES.map((n, i) => {
                const g = GATEWAYS[n.gw]
                return (
                  <g key={n.id}>
                    <path d={link(g, n)} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.25" />
                    <circle r="0.55" fill="#39D98A" opacity="0.9">
                      <animateMotion dur={`${1.8 + (i % 5) * 0.45}s`} repeatCount="indefinite" path={link(g, n)} />
                    </circle>
                  </g>
                )
              })}
              {/* core */}
              <g>
                <circle cx={CORE.x} cy={CORE.y} r="4.6" fill="rgba(77,163,255,0.14)" stroke="#4DA3FF" strokeWidth="0.4" />
                <circle cx={CORE.x} cy={CORE.y} r="6.4" fill="none" stroke="#4DA3FF" strokeOpacity="0.3" strokeWidth="0.25">
                  <animate attributeName="r" values="5.4;7.4;5.4" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.4;0.08;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x={CORE.x} y={CORE.y + 0.9} textAnchor="middle" fill="#CFE4FF" fontSize="2.2" fontWeight="700" fontFamily="JetBrains Mono, monospace">CORE</text>
              </g>
              {GATEWAYS.map(g => (
                <g key={g.id}>
                  <rect x={g.x - 3.4} y={g.y - 2.2} width="6.8" height="4.4" rx="0.8"
                    fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3" />
                  <text x={g.x} y={g.y + 0.8} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="1.9" fontFamily="JetBrains Mono, monospace">{g.id}</text>
                </g>
              ))}
              {NODES.map((n, i) => (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r="1.7" fill="rgba(57,217,138,0.15)" stroke="#39D98A" strokeWidth="0.3" />
                  <circle cx={n.x} cy={n.y} r="0.55" fill="#39D98A">
                    <animate attributeName="opacity" values="1;0.3;1" dur={`${1.4 + (i % 4) * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                  <text x={n.x} y={n.y + 4.4} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="1.7" fontFamily="JetBrains Mono, monospace">{n.id}</text>
                </g>
              ))}
            </svg>
            <div className="cx-view__hud">
              <div className="ex-hud"><span>NETWORK TOPOLOGY · LIVE MESH</span><span>3 GATEWAYS · 8 SHOWN OF 2,914</span></div>
            </div>
          </div>

          <div className="ex-charts">
            <Panel title="Inference Throughput" right={<span className="ex-dim">REQ/S · FLEET</span>}>
              <StreamChart data={inference} min={180} max={520} height={54} />
            </Panel>
            <div className="ex-gauges">
              <RadialGauge label="CPU Avg" value={cpuAvg} size={92} />
              <RadialGauge label="Memory" value={memAvg} size={92} />
              <RadialGauge label="Uptime" value={99.98} display="99.98%" size={92} />
            </div>
          </div>
        </div>

        <div className="ex-rail">
          <Panel title="Cluster" >
            <div className="ex-stats">
              <Stat label="Nodes Online" value="2,911" />
              <Stat label="Degraded" value="3" tone="warn" />
              <Stat label="Ingress" value={fmt.fix(netIn, 1)} unit="GB/s" />
              <Stat label="P99 Latency" value="11" unit="ms" />
            </div>
          </Panel>
          <Panel title="Edge Nodes" right={<Chip tone="ok">ALL SYNCED</Chip>}>
            <div className="ex-nodes">
              {NODES.map((n, i) => (
                <div key={n.id} className="ex-node">
                  <span className="ex-node__id">{n.id}</span>
                  <UtilBar value={nodeUtil[i]} />
                  <span className="ex-node__v">{Math.round(nodeUtil[i])}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Operations Log">
            <Feed dense items={log} render={item => (
              <div className="ex-log"><span className="ex-log__t">{item.time}</span><span className="ex-log__m">{item.title}</span></div>
            )} />
          </Panel>
        </div>
      </div>

      <style>{`
        .ex { display: grid; grid-template-columns: minmax(0, 7fr) minmax(260px, 3fr); gap: 1px; background: rgba(16,42,91,0.06); }
        .ex-main { background: #fff; padding: 12px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .ex-topo { min-height: 360px; flex: 1; }
        .ex-topo svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .ex-hud { position: absolute; top: 10px; left: 14px; right: 14px; display: flex; justify-content: space-between; font-size: 8.5px; letter-spacing: 0.12em; color: rgba(255,255,255,0.6); }
        .ex-charts { display: grid; grid-template-columns: 1.5fr 1fr; gap: 10px; align-items: stretch; }
        .ex-charts .cx-panel { border: 1px solid rgba(16,42,91,0.08); border-radius: 10px; }
        .ex-gauges { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; align-items: center; border: 1px solid rgba(16,42,91,0.08); border-radius: 10px; padding: 8px; }
        .ex-dim { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.1em; color: var(--color-text-faint); }
        .ex-rail { background: #fff; display: flex; flex-direction: column; }
        .ex-rail > * + * { border-top: 1px solid rgba(16,42,91,0.07); }
        .ex-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ex-nodes { display: flex; flex-direction: column; gap: 7px; }
        .ex-node { display: grid; grid-template-columns: 52px 1fr 34px; align-items: center; gap: 8px; }
        .ex-node__id { font-family: var(--font-mono); font-size: 9.5px; color: var(--cx-ink); }
        .ex-node__v { font-family: var(--font-mono); font-size: 9.5px; color: var(--color-text-secondary); text-align: right; font-variant-numeric: tabular-nums; }
        .ex-log { display: flex; gap: 8px; align-items: baseline; min-width: 0; }
        .ex-log__t { font-family: var(--font-mono); font-size: 8.5px; color: var(--color-text-faint); flex-shrink: 0; font-variant-numeric: tabular-nums; }
        .ex-log__m { font-size: 10.5px; color: var(--cx-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        @media (max-width: 900px) { .ex { grid-template-columns: 1fr; } .ex-charts { grid-template-columns: 1fr; } }
      `}</style>
    </ConsoleShell>
  )
}
