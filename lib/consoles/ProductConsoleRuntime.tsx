/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck — React console runtime; excluded from vue-tsc.
// Product console router for /products. Vision, Drone, and Edge reuse the
// dedicated consoles; the remaining product surfaces are full React-built
// live operating rooms using the same shared telemetry primitives.
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import VisionConsole from "./vision/VisionConsole"
import DroneConsole from "./drone/DroneConsole"
import EdgeConsole from "./edge/EdgeConsole"
import { ConsoleShell, Panel, Feed, AlertRow, Stat, Chip, UtilBar, KV } from "./core/primitives"
import { Bars, Meter, MultiStream, RadialGauge, Spark, StreamChart } from "./core/charts"
import { fmt, useConsoleLive, useFeed, useStream, useWalk } from "./core/useLive"
import { pick } from "./core/seed"

export type ProductConsoleKind =
  | "vision"
  | "drone"
  | "edge"
  | "cognitive"
  | "agents"
  | "digital-twin"
  | "business-cloud"
  | "ai-os"
  | "digital-engineering"
  | "growth"

export default function ProductConsoleRuntime({ kind }: { kind: ProductConsoleKind }) {
  if (kind === "vision") return <VisionConsole />
  if (kind === "drone") return <DroneConsole />
  if (kind === "edge") return <EdgeConsole />
  if (kind === "cognitive") return <CognitiveConsole />
  if (kind === "agents") return <AgentsConsole />
  if (kind === "digital-twin") return <DigitalTwinConsole />
  if (kind === "business-cloud") return <BusinessCloudConsole />
  if (kind === "ai-os") return <OneAiOsConsole />
  if (kind === "digital-engineering") return <DigitalEngineeringConsole />
  return <GrowthConsole />
}

function RuntimeStyles() {
  return (
    <style>{`
      .ops { display: grid; grid-template-columns: minmax(0, 7fr) minmax(270px, 3fr); gap: 1px; background: rgba(16,42,91,0.06); }
      .ops-main { background: #fff; padding: 12px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
      .ops-rail { background: #fff; display: flex; flex-direction: column; min-width: 0; }
      .ops-rail > * + * { border-top: 1px solid rgba(16,42,91,0.07); }
      .ops-view { min-height: 350px; flex: 1; }
      .ops-view svg { position: absolute; inset: 0; width: 100%; height: 100%; }
      .ops-hud { position: absolute; top: 10px; left: 14px; right: 14px; display: flex; justify-content: space-between; gap: 12px; font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.12em; color: rgba(255,255,255,0.62); }
      .ops-hud--bottom { top: auto; bottom: 10px; }
      .ops-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .ops-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .ops-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
      .ops-mini-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .ops-mini-panels .cx-panel, .ops-main .cx-panel { border: 1px solid rgba(16,42,91,0.08); border-radius: 10px; overflow: hidden; }
      .ops-dim { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.1em; color: var(--color-text-faint); white-space: nowrap; }
      .ops-log { display: flex; gap: 8px; align-items: baseline; min-width: 0; padding: 1px 0; }
      .ops-log__t { font-family: var(--font-mono); font-size: 8.5px; color: var(--color-text-faint); flex-shrink: 0; font-variant-numeric: tabular-nums; }
      .ops-log__m { font-size: 10.5px; color: var(--cx-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ops-list { display: flex; flex-direction: column; gap: 7px; }
      .ops-row { display: grid; grid-template-columns: 82px 1fr 38px; align-items: center; gap: 8px; }
      .ops-row__id { font-family: var(--font-mono); font-size: 9.5px; color: var(--cx-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ops-row__v { font-family: var(--font-mono); font-size: 9.5px; color: var(--color-text-secondary); text-align: right; font-variant-numeric: tabular-nums; }
      .ops-cardline { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 7px 9px; border: 1px solid rgba(16,42,91,0.08); border-radius: 9px; background: #fff; }
      .ops-cardline__main { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .ops-cardline__title { font-size: 11.5px; font-weight: 650; color: var(--cx-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ops-cardline__sub { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.06em; color: var(--color-text-faint); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ops-pipeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
      .ops-lane { min-height: 150px; border: 1px solid rgba(16,42,91,0.08); border-radius: 10px; background: #FBFCFE; padding: 8px; display: flex; flex-direction: column; gap: 7px; }
      .ops-lane__title { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-text-faint); }
      .ops-task { border: 1px solid rgba(47,127,230,0.16); border-radius: 8px; background: #fff; padding: 8px; box-shadow: 0 6px 18px rgba(16,42,91,0.04); }
      .ops-task__name { display: block; font-size: 11px; font-weight: 650; color: var(--cx-ink); }
      .ops-task__meta { display: block; margin-top: 3px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.06em; color: var(--color-text-faint); }
      .ops-task__bar { display: block; height: 3px; margin-top: 7px; border-radius: 999px; background: rgba(16,42,91,0.08); overflow: hidden; }
      .ops-task__bar i { display: block; height: 100%; border-radius: inherit; background: var(--cx-accent); }
      .ops-table-wrap { overflow: hidden; border: 1px solid rgba(16,42,91,0.08); border-radius: 10px; }
      .ops-kvgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
      @media (max-width: 900px) {
        .ops { grid-template-columns: 1fr; }
        .ops-grid4 { grid-template-columns: repeat(2, 1fr); }
        .ops-mini-panels, .ops-grid2 { grid-template-columns: 1fr; }
        .ops-pipeline { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 640px) {
        .ops-grid3, .ops-grid4, .ops-pipeline { grid-template-columns: 1fr; }
        .ops-view { min-height: 340px; }
      }
    `}</style>
  )
}

function useRafTime() {
  const live = useConsoleLive()
  const [t, setT] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    if (!live) return
    let mounted = true
    const t0 = performance.now()
    const loop = (now: number) => {
      if (!mounted) return
      setT((now - t0) / 1000)
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => { mounted = false; cancelAnimationFrame(raf.current) }
  }, [live])
  return t
}

function MiniLog({ items }: { items: any[] }) {
  return (
    <Feed dense items={items} render={item => (
      <div className="ops-log">
        <span className="ops-log__t">{item.time}</span>
        <span className="ops-log__m">{item.title}</span>
      </div>
    )} />
  )
}

/* ---------------- Generative & Cognitive AI ---------------- */

const COG_EVENTS = [
  "Grounding pass resolved 18 source conflicts",
  "Policy citation appended to answer draft",
  "Knowledge graph edge promoted: supplier → invoice",
  "PII redaction completed for HR corpus",
  "Embeddings shard synced to vector tier",
  "RAG evaluator flagged low-source answer",
  "Contract clause summarized with 6 citations",
  "Executive brief regenerated from live facts",
]

function KnowledgeGraphScene() {
  const t = useRafTime()
  const nodes = [
    { id: "QUERY", x: 50, y: 38, r: 6.4, c: "#4DA3FF" },
    { id: "ERP", x: 20, y: 20, r: 3.4, c: "#39D98A" },
    { id: "POLICY", x: 78, y: 18, r: 3.8, c: "#FFB020" },
    { id: "DOCS", x: 22, y: 60, r: 3.8, c: "#9CC8FF" },
    { id: "CRM", x: 76, y: 58, r: 3.6, c: "#39D98A" },
    { id: "TICKETS", x: 50, y: 68, r: 3.2, c: "#FFFFFF" },
  ]
  const links = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 3], [2, 4], [3, 5], [4, 5]]
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="kg-core"><stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.35" /><stop offset="100%" stopColor="#4DA3FF" stopOpacity="0" /></radialGradient>
      </defs>
      <g stroke="rgba(255,255,255,0.07)" strokeWidth="0.18">
        {Array.from({ length: 10 }, (_, i) => <line key={`x${i}`} x1={i * 10} y1="0" x2={i * 10} y2="80" />)}
        {Array.from({ length: 8 }, (_, i) => <line key={`y${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} />)}
      </g>
      <circle cx="50" cy="38" r={25 + Math.sin(t * 1.4) * 2} fill="url(#kg-core)" />
      {links.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        const delay = (i % 5) * 0.15
        return (
          <g key={i}>
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(255,255,255,0.24)" strokeWidth="0.3" />
            <circle r="0.65" fill={i % 2 ? "#39D98A" : "#4DA3FF"}>
              <animateMotion dur={`${2.1 + (i % 4) * 0.3}s`} begin={`${delay}s`} repeatCount="indefinite"
                path={`M${na.x},${na.y} L${nb.x},${nb.y}`} />
            </circle>
          </g>
        )
      })}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={n.r + Math.sin(t * 1.9 + i) * 0.35} fill={n.c} fillOpacity={i === 0 ? 0.25 : 0.14} stroke={n.c} strokeWidth="0.35" />
          <text x={n.x} y={n.y + 0.8} textAnchor="middle" fill="rgba(255,255,255,0.86)" fontSize={i === 0 ? "2.4" : "2"} fontFamily="JetBrains Mono, monospace" fontWeight="700">{n.id}</text>
        </g>
      ))}
      <g transform={`translate(50 ${38 + Math.sin(t * 2) * 1.2})`}>
        <rect x="-20" y="-17" width="40" height="6" rx="1.2" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.25" />
        <text x="-17.5" y="-13" fill="#CFE4FF" fontSize="2" fontFamily="JetBrains Mono, monospace">ANSWER SYNTHESIS · 12 CITATIONS</text>
      </g>
    </svg>
  )
}

function CognitiveConsole() {
  const tokens = useStream("cog:tokens", { min: 820, max: 1820, points: 42, ms: 850 })
  const grounding = useWalk("cog:grounding", { min: 91.2, max: 98.8, step: 0.7, ms: 1500 })
  const latency = useWalk("cog:latency", { min: 380, max: 760, step: 55, ms: 1200 })
  const graphSync = useWalk("cog:sync", { min: 96.5, max: 99.9, step: 0.25, ms: 2200 })
  const queue = useWalk("cog:queue", { min: 114, max: 219, step: 14, ms: 1900 })
  const eventLog = useFeed({
    ms: 2400, cap: 6,
    prime: COG_EVENTS.slice(0, 3).map(title => ({ title })),
    make: () => (Math.random() < 0.18 ? null : { title: pick(COG_EVENTS) }),
  })
  const alerts = useFeed({
    ms: 4300, cap: 4,
    prime: [
      { title: "Low-grounding response held", severity: "warning", detail: "Legal workspace · needs citation", tag: "QA" },
      { title: "Sensitive source access approved", severity: "info", detail: "Finance corpus · controller policy", tag: "GOV" },
    ],
    make: () => {
      const items = [
        { title: "PII entity masked", severity: "info", detail: "HR article set · automatic redaction", tag: "DLP" },
        { title: "Conflicting source detected", severity: "warning", detail: "Procurement answer · 2 records disagree", tag: "RAG" },
        { title: "Answer released with citations", severity: "info", detail: "Board brief · 11 sources attached", tag: "OK" },
      ]
      return pick(items)
    },
  })

  return (
    <ConsoleShell title="SVARA Cognitive AI" meta="Knowledge Mesh · 412k entities" status="REASONING ACTIVE">
      <div className="ops">
        <div className="ops-main">
          <div className="cx-view ops-view">
            <KnowledgeGraphScene />
            <div className="cx-view__scan" />
            <div className="cx-view__hud ops-hud"><span>KNOWLEDGE GRAPH · LIVE RETRIEVAL</span><span>VECTOR TIER · 26 SHARDS</span></div>
            <div className="cx-view__hud ops-hud ops-hud--bottom"><span>GROUNDED ANSWERS ONLY</span><span>{fmt.ms(latency)} P95 · {fmt.pct(grounding)} CONF</span></div>
          </div>
          <div className="ops-mini-panels">
            <Panel title="Reasoning Throughput" right={<span className="ops-dim">TOKENS/S</span>}>
              <StreamChart data={tokens} min={700} max={1900} height={54} />
            </Panel>
            <Panel title="Grounding">
              <Meter value={grounding} min={80} max={100} label="Citation-backed confidence" />
            </Panel>
          </div>
        </div>
        <div className="ops-rail">
          <Panel title="Runtime">
            <div className="ops-grid2">
              <Stat label="Queue" value={fmt.int(queue)} />
              <Stat label="P95 Latency" value={fmt.ms(latency)} tone={latency > 690 ? "warn" : undefined} />
              <Stat label="Graph Sync" value={fmt.pct(graphSync)} />
              <Stat label="Sources" value="1,284" />
            </div>
          </Panel>
          <Panel title="Governed Alerts" right={<Chip tone="info">HUMAN-GATED</Chip>}>
            <Feed items={alerts} render={item => <AlertRow item={item} />} />
          </Panel>
          <Panel title="Source Health">
            <div className="ops-list">
              {[
                ["ERP", 98], ["CRM", 94], ["POLICY", 100], ["DOCS", 91], ["TICKETS", 96],
              ].map(([name, v]) => (
                <div key={name} className="ops-row">
                  <span className="ops-row__id">{name}</span>
                  <UtilBar value={v as number} />
                  <span className="ops-row__v">{v}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Event History"><MiniLog items={eventLog} /></Panel>
        </div>
      </div>
      <RuntimeStyles />
    </ConsoleShell>
  )
}

/* ---------------- Autonomous AI Agents ---------------- */

const AGENT_LOG = [
  "Procurement agent requested vendor quote comparison",
  "Finance agent reconciled 184 invoices",
  "Ops agent escalated delayed shipment",
  "HR agent drafted onboarding workflow",
  "Supervisor approved autonomous refund batch",
  "Tool call retry succeeded: SAP connector",
  "Planning agent split work order into 9 tasks",
  "Legal review inserted contract guardrail",
]

function AgentsConsole() {
  const activeAgents = useWalk("agents:active", { min: 214, max: 271, step: 12, ms: 1700 })
  const workflows = useStream("agents:wf", { min: 2600, max: 4100, points: 44, ms: 900 })
  const autonomy = useWalk("agents:auto", { min: 82, max: 94, step: 1.2, ms: 1600 })
  const toolLatency = useWalk("agents:lat", { min: 240, max: 620, step: 48, ms: 1300 })
  const log = useFeed({
    ms: 2300, cap: 6,
    prime: AGENT_LOG.slice(0, 4).map(title => ({ title })),
    make: () => (Math.random() < 0.16 ? null : { title: pick(AGENT_LOG) }),
  })
  const alerts = useFeed({
    ms: 5200, cap: 4,
    prime: [
      { title: "Approval required", severity: "warning", detail: "Refund agent · amount exceeds policy", tag: "HITL" },
      { title: "Workflow completed", severity: "info", detail: "Vendor onboarding · 17 tasks", tag: "DONE" },
    ],
    make: () => pick([
      { title: "Guardrail intervention", severity: "warning", detail: "Contract agent · clause ambiguity", tag: "SAFE" },
      { title: "Tool chain recovered", severity: "info", detail: "CRM connector · retry 2", tag: "TOOL" },
      { title: "Manual approval requested", severity: "warning", detail: "Purchase order · INR threshold", tag: "HITL" },
    ]),
  })
  const laneTasks = [
    [
      ["Lead triage", "CRM · SLA 02:14", 72],
      ["Invoice ingest", "Finance · 184 docs", 44],
    ],
    [
      ["Root-cause plan", "Ops · 9 hypotheses", 61],
      ["Policy check", "Legal · 12 refs", 88],
    ],
    [
      ["SAP update", "Tool call · retryable", 35],
      ["Email draft", "Comms · queued", 78],
    ],
    [
      ["Order release", "Approved · autonomous", 93],
      ["Ticket closeout", "CS · pending QA", 54],
    ],
  ]
  const lanes = ["INTAKE", "REASON", "TOOLS", "EXECUTE"]

  return (
    <ConsoleShell title="SVARA AI Agents" meta="Autonomy Fabric · 248 deployed" status="WORKFLOWS RUNNING">
      <div className="ops">
        <div className="ops-main">
          <Panel title="Workflow Orchestration" right={<Chip tone="ok">LIVE TASK GRAPH</Chip>}>
            <div className="ops-pipeline">
              {lanes.map((lane, i) => (
                <div key={lane} className="ops-lane">
                  <span className="ops-lane__title">{lane}</span>
                  {laneTasks[i].map(([name, meta, progress], k) => (
                    <motion.div
                      key={name}
                      className="ops-task"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (i + k) * 0.04 }}
                    >
                      <span className="ops-task__name">{name}</span>
                      <span className="ops-task__meta">{meta}</span>
                      <span className="ops-task__bar"><motion.i animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 90, damping: 18 }} /></span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </Panel>
          <div className="ops-mini-panels">
            <Panel title="Workflow Volume" right={<span className="ops-dim">PER HOUR</span>}>
              <StreamChart data={workflows} min={2200} max={4300} height={60} />
            </Panel>
            <Panel title="Autonomy Meter">
              <Meter value={autonomy} min={70} max={100} label="Tasks completed without handoff" />
            </Panel>
          </div>
        </div>
        <div className="ops-rail">
          <Panel title="Agent Runtime">
            <div className="ops-grid2">
              <Stat label="Active Agents" value={fmt.int(activeAgents)} />
              <Stat label="Tool Latency" value={fmt.ms(toolLatency)} tone={toolLatency > 560 ? "warn" : undefined} />
              <Stat label="Approvals" value="17" tone="warn" />
              <Stat label="Failures" value="0.12%" />
            </div>
          </Panel>
          <Panel title="Agent Groups" right={<Chip tone="info">L4</Chip>}>
            <div className="ops-list">
              {[
                ["Finance", 86], ["Procurement", 74], ["Operations", 91], ["Support", 79], ["HR", 66],
              ].map(([name, v]) => (
                <div key={name} className="ops-row">
                  <span className="ops-row__id">{name}</span>
                  <UtilBar value={v as number} />
                  <span className="ops-row__v">{v}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Interventions"><Feed items={alerts} render={item => <AlertRow item={item} />} /></Panel>
          <Panel title="Execution Log"><MiniLog items={log} /></Panel>
        </div>
      </div>
      <RuntimeStyles />
    </ConsoleShell>
  )
}

/* ---------------- Digital Twin ---------------- */

const TWIN_EVENTS = [
  "Conveyor C-14 synchronized to PLC stream",
  "CNC-08 bearing risk increased by 2.1%",
  "Simulation branch A/B-42 completed",
  "Robot cell R2 cycle-time drift corrected",
  "Energy model recalibrated with live meter",
  "Maintenance window proposed for pump P-7",
  "Line balance forecast improved by 3.4%",
  "Sensor fusion confidence restored",
]

function FactoryTwinScene() {
  const t = useRafTime()
  const machines = [
    { id: "CNC-08", x: 18, y: 26, w: 16, h: 10, tone: "#4DA3FF" },
    { id: "PRESS-2", x: 44, y: 18, w: 18, h: 12, tone: "#39D98A" },
    { id: "R2", x: 70, y: 28, w: 12, h: 12, tone: "#FFB020" },
    { id: "PACK-4", x: 60, y: 56, w: 22, h: 10, tone: "#4DA3FF" },
    { id: "PUMP-7", x: 18, y: 56, w: 14, h: 9, tone: "#FF6B6B" },
  ]
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.2">
        {Array.from({ length: 9 }, (_, i) => <line key={i} x1="0" x2="100" y1={10 + i * 8} y2={10 + i * 8} />)}
        {Array.from({ length: 11 }, (_, i) => <line key={i} y1="0" y2="80" x1={i * 10} x2={i * 10} />)}
      </g>
      <path d="M8,42 H38 C45,42 45,56 52,56 H92" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M8,42 H38 C45,42 45,56 52,56 H92" fill="none" stroke="#4DA3FF" strokeWidth="0.5" strokeDasharray="2 3" strokeDashoffset={-t * 8} />
      {machines.map((m, i) => (
        <g key={m.id}>
          <rect x={m.x} y={m.y} width={m.w} height={m.h} rx="1" fill="rgba(255,255,255,0.07)" stroke={m.tone} strokeOpacity="0.75" strokeWidth="0.35" />
          <rect x={m.x + 1.5} y={m.y + 2} width={m.w - 3} height="1.4" rx="0.4" fill={m.tone} opacity={0.25 + Math.abs(Math.sin(t * 1.6 + i)) * 0.35} />
          <circle cx={m.x + m.w - 2.5} cy={m.y + m.h - 2.2} r="1.2" fill={m.tone}>
            <animate attributeName="opacity" values="1;0.35;1" dur={`${1.1 + i * 0.25}s`} repeatCount="indefinite" />
          </circle>
          <text x={m.x + 1.2} y={m.y - 1.7} fill="rgba(255,255,255,0.76)" fontSize="2" fontFamily="JetBrains Mono, monospace">{m.id}</text>
        </g>
      ))}
      <g transform={`translate(70 28) rotate(${Math.sin(t * 1.8) * 28})`}>
        <line x1="6" y1="6" x2="16" y2="-2" stroke="#FFB020" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="16" cy="-2" r="1.8" fill="#FFB020" />
      </g>
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={12 + ((t * 11 + i * 11) % 75)} y={39.2 + Math.sin(t + i) * 0.8} width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.5)" />
      ))}
      <path d="M15,61 C30,50 54,66 82,48" fill="none" stroke="#FF6B6B" strokeWidth="0.35" strokeDasharray="1.6 1.2" />
      <text x="16" y="68" fill="#FF8D8D" fontSize="2.2" fontFamily="JetBrains Mono, monospace">PREDICTIVE MAINTENANCE RISK · PUMP-7</text>
    </svg>
  )
}

function DigitalTwinConsole() {
  const sync = useWalk("twin:sync", { min: 97.8, max: 99.9, step: 0.25, ms: 1500 })
  const risk = useStream("twin:risk", { min: 18, max: 68, points: 44, ms: 1000 })
  const oee = useWalk("twin:oee", { min: 82, max: 91, step: 0.8, ms: 1700 })
  const simulations = useWalk("twin:sims", { min: 12000, max: 18400, step: 420, ms: 2300 })
  const log = useFeed({
    ms: 2600, cap: 6,
    prime: TWIN_EVENTS.slice(0, 4).map(title => ({ title })),
    make: () => (Math.random() < 0.16 ? null : { title: pick(TWIN_EVENTS) }),
  })
  return (
    <ConsoleShell title="SVARA Digital Twin" meta="Factory Twin · Line GF-02" status="SYNCHRONIZED">
      <div className="ops">
        <div className="ops-main">
          <div className="cx-view ops-view">
            <FactoryTwinScene />
            <div className="cx-view__scan" />
            <div className="cx-view__hud ops-hud"><span>FACTORY TWIN · LIVE PLC MIRROR</span><span>{fmt.pct(sync)} SYNC FIDELITY</span></div>
            <div className="cx-view__hud ops-hud ops-hud--bottom"><span>5,914 TAGS · 42 EQUIPMENT MODELS</span><span>PREDICTIVE WINDOW 72H</span></div>
          </div>
          <div className="ops-mini-panels">
            <Panel title="Maintenance Risk" right={<span className="ops-dim">72H FORECAST</span>}>
              <StreamChart data={risk} min={0} max={80} height={58} color="#D6912B" />
            </Panel>
            <Panel title="Equipment Sync">
              <div className="ops-grid3">
                <RadialGauge label="Sync" value={sync} display={fmt.pct(sync)} size={84} />
                <RadialGauge label="OEE" value={oee} display={fmt.pct(oee)} size={84} />
                <RadialGauge label="Sensors" value={98.4} display="98.4%" size={84} />
              </div>
            </Panel>
          </div>
        </div>
        <div className="ops-rail">
          <Panel title="Twin Runtime">
            <div className="ops-grid2">
              <Stat label="Simulations" value={fmt.int(simulations)} />
              <Stat label="Live Assets" value="842" />
              <Stat label="Desync" value="0.18%" />
              <Stat label="Risk Items" value="7" tone="warn" />
            </div>
          </Panel>
          <Panel title="Equipment States" right={<Chip tone="warn">1 WATCH</Chip>}>
            <div className="ops-list">
              {[
                ["CNC-08", 72], ["PRESS-2", 93], ["ROBOT-R2", 88], ["PACK-4", 81], ["PUMP-7", 64],
              ].map(([name, v]) => (
                <div key={name} className="ops-row">
                  <span className="ops-row__id">{name}</span>
                  <UtilBar value={v as number} tone={(v as number) < 70 ? "warn" : "ok"} />
                  <span className="ops-row__v">{v}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Event History"><MiniLog items={log} /></Panel>
        </div>
      </div>
      <RuntimeStyles />
    </ConsoleShell>
  )
}

/* ---------------- Unified Business Cloud ---------------- */

const CLOUD_EVENTS = [
  "ERP order status propagated to CRM",
  "Finance ledger matched 4,812 payment rows",
  "HRMS shift roster published to workforce app",
  "Inventory reserve created for urgent order",
  "Customer risk score recalculated",
  "Purchase order approved by policy engine",
  "Revenue forecast refreshed from open pipeline",
  "Duplicate account merged across systems",
]

function BusinessCloudScene() {
  const t = useRafTime()
  const mods = [
    { id: "ERP", x: 20, y: 18, c: "#4DA3FF" },
    { id: "CRM", x: 78, y: 18, c: "#39D98A" },
    { id: "HRMS", x: 20, y: 60, c: "#FFB020" },
    { id: "FINANCE", x: 78, y: 60, c: "#9CC8FF" },
    { id: "ORDERS", x: 50, y: 68, c: "#FFFFFF" },
  ]
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.2">
        {Array.from({ length: 8 }, (_, i) => <line key={i} x1="0" x2="100" y1={i * 10} y2={i * 10} />)}
      </g>
      <rect x="36" y="28" width="28" height="18" rx="2" fill="rgba(77,163,255,0.13)" stroke="#4DA3FF" strokeWidth="0.4" />
      <text x="50" y="36" textAnchor="middle" fill="#CFE4FF" fontSize="2.4" fontFamily="JetBrains Mono, monospace" fontWeight="700">DATA PLANE</text>
      <text x="50" y="40" textAnchor="middle" fill="rgba(255,255,255,0.58)" fontSize="1.8" fontFamily="JetBrains Mono, monospace">EVENTS · IDENTITY · POLICY</text>
      {mods.map((m, i) => (
        <g key={m.id}>
          <path d={`M50,37 C50,${m.y} ${m.x},37 ${m.x},${m.y}`} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.35" />
          <circle r="0.65" fill={m.c}>
            <animateMotion dur={`${2 + i * 0.22}s`} begin={`${i * 0.1}s`} repeatCount="indefinite"
              path={`M${m.x},${m.y} C${m.x},37 50,${m.y} 50,37`} />
          </circle>
          <rect x={m.x - 9} y={m.y - 5} width="18" height="10" rx="1.4" fill="rgba(255,255,255,0.07)" stroke={m.c} strokeOpacity="0.65" strokeWidth="0.35" />
          <rect x={m.x - 7} y={m.y + 1.5} width={9 + Math.sin(t * 1.3 + i) * 4} height="1.1" rx="0.4" fill={m.c} opacity="0.65" />
          <text x={m.x} y={m.y - 0.8} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="2.2" fontFamily="JetBrains Mono, monospace">{m.id}</text>
        </g>
      ))}
    </svg>
  )
}

function BusinessCloudConsole() {
  const orders = useStream("cloud:orders", { min: 8400, max: 12800, points: 42, ms: 900 })
  const sync = useWalk("cloud:sync", { min: 97.2, max: 99.9, step: 0.35, ms: 1600 })
  const revenue = useWalk("cloud:rev", { min: 18.2, max: 23.8, step: 0.6, ms: 1800 })
  const records = useWalk("cloud:records", { min: 1200000000, max: 1208000000, step: 12000, ms: 2300 })
  const log = useFeed({
    ms: 2450, cap: 6,
    prime: CLOUD_EVENTS.slice(0, 4).map(title => ({ title })),
    make: () => (Math.random() < 0.15 ? null : { title: pick(CLOUD_EVENTS) }),
  })
  return (
    <ConsoleShell title="SVARA Business Cloud" meta="ERP · CRM · HRMS · Finance · Orders" status="TRANSACTIONS FLOWING">
      <div className="ops">
        <div className="ops-main">
          <div className="cx-view ops-view">
            <BusinessCloudScene />
            <div className="cx-view__scan" />
            <div className="cx-view__hud ops-hud"><span>ENTERPRISE DATA PLANE · LIVE MODULE SYNC</span><span>{fmt.pct(sync)} CONSISTENCY</span></div>
            <div className="cx-view__hud ops-hud ops-hud--bottom"><span>POLICY ENGINE ACTIVE</span><span>1.2B RECORDS · 47 SYSTEMS</span></div>
          </div>
          <div className="ops-mini-panels">
            <Panel title="Orders Throughput" right={<span className="ops-dim">TODAY</span>}>
              <StreamChart data={orders} min={7000} max={13500} height={58} />
            </Panel>
            <Panel title="Business KPIs">
              <div className="ops-grid3">
                <Stat label="Revenue" value={`$${fmt.fix(revenue, 1)}M`} />
                <Stat label="Open Orders" value="12,842" />
                <Stat label="Exceptions" value="14" tone="warn" />
              </div>
            </Panel>
          </div>
        </div>
        <div className="ops-rail">
          <Panel title="Modules" right={<Chip tone="ok">SYNCED</Chip>}>
            <div className="ops-list">
              {[
                ["ERP", 99], ["CRM", 96], ["HRMS", 92], ["FINANCE", 98], ["ORDERS", 94],
              ].map(([name, v]) => (
                <div key={name} className="ops-row">
                  <span className="ops-row__id">{name}</span>
                  <UtilBar value={v as number} />
                  <span className="ops-row__v">{v}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="System Readouts">
            <div className="ops-grid2">
              <Stat label="Records" value={`${fmt.fix(records / 1000000000, 2)}B`} />
              <Stat label="API Health" value="100%" />
              <Stat label="Approvals" value="382" />
              <Stat label="Queue" value="41" />
            </div>
          </Panel>
          <Panel title="Event History"><MiniLog items={log} /></Panel>
        </div>
      </div>
      <RuntimeStyles />
    </ConsoleShell>
  )
}

/* ---------------- One AI OS ---------------- */

const OS_EVENTS = [
  "Model gateway routed 18k requests to vision-v9",
  "Container sv-agent-42 rolled to version 2.8.1",
  "API traffic spike absorbed by autoscaler",
  "Inference pool promoted canary to stable",
  "Tenant policy bundle hot-reloaded",
  "Vector service scaled from 12 → 18 replicas",
  "Container image scanned: no critical CVEs",
  "GPU pool rebalanced across model deployments",
]

function OsMeshScene() {
  const t = useRafTime()
  const services = [
    { id: "API", x: 18, y: 20 },
    { id: "AUTH", x: 50, y: 14 },
    { id: "MODELS", x: 78, y: 22 },
    { id: "AGENTS", x: 24, y: 58 },
    { id: "VECTOR", x: 52, y: 62 },
    { id: "EVENTS", x: 80, y: 56 },
  ]
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect x="8" y="8" width="84" height="64" rx="3" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.28" />
      <text x="11" y="13" fill="rgba(255,255,255,0.6)" fontSize="2" fontFamily="JetBrains Mono, monospace">K8S CLUSTER · TENANT RUNTIME</text>
      {services.map((a, i) => services.slice(i + 1).map((b, j) => (
        <line key={`${a.id}-${b.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" />
      )))}
      {services.map((s, i) => (
        <g key={s.id}>
          <circle cx={s.x} cy={s.y} r={7 + Math.sin(t * 1.4 + i) * 0.5} fill="rgba(77,163,255,0.12)" stroke="#4DA3FF" strokeOpacity="0.7" strokeWidth="0.35" />
          <text x={s.x} y={s.y + 0.8} textAnchor="middle" fill="#DCEBFF" fontSize="2.15" fontFamily="JetBrains Mono, monospace" fontWeight="700">{s.id}</text>
        </g>
      ))}
      {Array.from({ length: 16 }, (_, i) => {
        const a = services[i % services.length]
        const b = services[(i * 2 + 3) % services.length]
        return (
          <circle key={i} r="0.65" fill={i % 3 ? "#4DA3FF" : "#39D98A"}>
            <animateMotion dur={`${1.7 + (i % 5) * 0.22}s`} begin={`${i * 0.08}s`} repeatCount="indefinite" path={`M${a.x},${a.y} L${b.x},${b.y}`} />
          </circle>
        )
      })}
      <g transform={`translate(50 ${39 + Math.sin(t * 1.2)})`}>
        <rect x="-12" y="-5" width="24" height="10" rx="1.5" fill="rgba(57,217,138,0.12)" stroke="#39D98A" strokeWidth="0.35" />
        <text x="0" y="0.8" textAnchor="middle" fill="#D8FFE9" fontSize="2.1" fontFamily="JetBrains Mono, monospace">ORCHESTRATOR</text>
      </g>
    </svg>
  )
}

function OneAiOsConsole() {
  const api = useStream("os:api", { min: 18000, max: 52000, points: 42, ms: 800 })
  const gpu = useWalk("os:gpu", { min: 48, max: 87, step: 4, ms: 1300 })
  const containers = useWalk("os:containers", { min: 382, max: 464, step: 12, ms: 1900 })
  const deploy = useWalk("os:deploy", { min: 91, max: 99, step: 0.8, ms: 1700 })
  const log = useFeed({
    ms: 2400, cap: 6,
    prime: OS_EVENTS.slice(0, 4).map(title => ({ title })),
    make: () => (Math.random() < 0.14 ? null : { title: pick(OS_EVENTS) }),
  })
  return (
    <ConsoleShell title="SVARA One AI OS" meta="Runtime Layer · Services · Models · APIs" status="ORCHESTRATING">
      <div className="ops">
        <div className="ops-main">
          <div className="cx-view ops-view">
            <OsMeshScene />
            <div className="cx-view__scan" />
            <div className="cx-view__hud ops-hud"><span>SERVICE MESH · MODEL DEPLOYMENT PLANE</span><span>{fmt.int(api[api.length - 1] ?? 0)} REQ/MIN</span></div>
            <div className="cx-view__hud ops-hud ops-hud--bottom"><span>CONTAINERS {fmt.int(containers)} · GPU {fmt.pct(gpu, 0)}</span><span>CANARY HEALTH {fmt.pct(deploy)}</span></div>
          </div>
          <div className="ops-mini-panels">
            <Panel title="API Traffic" right={<span className="ops-dim">REQ/MIN</span>}>
              <StreamChart data={api} min={15000} max={56000} height={58} />
            </Panel>
            <Panel title="Model Deployment">
              <Meter value={deploy} min={80} max={100} label="Canary confidence" />
            </Panel>
          </div>
        </div>
        <div className="ops-rail">
          <Panel title="Runtime">
            <div className="ops-grid2">
              <Stat label="Services" value="64" />
              <Stat label="Containers" value={fmt.int(containers)} />
              <Stat label="GPU Util" value={fmt.pct(gpu, 0)} tone={gpu > 82 ? "warn" : undefined} />
              <Stat label="P99" value="42ms" />
            </div>
          </Panel>
          <Panel title="Running Services" right={<Chip tone="ok">HEALTHY</Chip>}>
            <div className="ops-list">
              {[
                ["API-GW", 93], ["MODEL-GW", 88], ["AGENT-RUN", 82], ["VECTOR", 78], ["EVENTS", 95],
              ].map(([name, v]) => (
                <div key={name} className="ops-row">
                  <span className="ops-row__id">{name}</span>
                  <UtilBar value={v as number} />
                  <span className="ops-row__v">{v}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Deployment Log"><MiniLog items={log} /></Panel>
        </div>
      </div>
      <RuntimeStyles />
    </ConsoleShell>
  )
}

/* ---------------- Digital Engineering ---------------- */

const ENG_EVENTS = [
  "CAD revision E-142 submitted for approval",
  "Thermal simulation completed: chassis v17",
  "CI pipeline passed 418 tests",
  "Architecture review requested by platform lead",
  "FEA stress hotspot reduced by 11%",
  "API contract regenerated from source schema",
  "Deployment package promoted to staging",
  "Engineering change order linked to BOM",
]

function CadSimulationScene() {
  const t = useRafTime()
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.18">
        {Array.from({ length: 12 }, (_, i) => <line key={`v${i}`} x1={i * 9} y1="0" x2={i * 9} y2="80" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 9} x2="100" y2={i * 9} />)}
      </g>
      <g transform={`translate(50 40) rotate(${Math.sin(t * 0.35) * 5})`}>
        <path d="M-22,-10 L5,-20 L24,-7 L19,15 L-4,22 L-25,8 Z" fill="rgba(77,163,255,0.08)" stroke="#4DA3FF" strokeWidth="0.5" />
        <path d="M-22,-10 L-4,22 M5,-20 L-4,22 M24,-7 L-4,22 M19,15 L-22,-10" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.3" />
        <circle cx={7 + Math.sin(t * 1.5) * 3} cy={-2 + Math.cos(t) * 2} r="8" fill="#FFB020" opacity="0.13" />
        <circle cx={-12 + Math.sin(t * 1.2) * 3} cy={8} r="7" fill="#FF5A5A" opacity="0.12" />
        <text x="-27" y="-15" fill="rgba(255,255,255,0.7)" fontSize="2" fontFamily="JetBrains Mono, monospace">CAD MODEL · SIM HEATMAP</text>
      </g>
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={(i * 7 + t * 8) % 100} cy={28 + Math.sin(t * 1.8 + i) * 16} r="0.45" fill={i % 3 ? "#4DA3FF" : "#FFB020"} opacity="0.75" />
      ))}
    </svg>
  )
}

function DigitalEngineeringConsole() {
  const build = useStream("eng:build", { min: 82, max: 100, points: 42, ms: 900 })
  const sim = useWalk("eng:sim", { min: 42, max: 79, step: 4, ms: 1500 })
  const approvals = useWalk("eng:approvals", { min: 18, max: 31, step: 2, ms: 1900 })
  const pipeline = useWalk("eng:pipeline", { min: 91, max: 99, step: 0.7, ms: 1600 })
  const log = useFeed({
    ms: 2550, cap: 6,
    prime: ENG_EVENTS.slice(0, 4).map(title => ({ title })),
    make: () => (Math.random() < 0.15 ? null : { title: pick(ENG_EVENTS) }),
  })
  return (
    <ConsoleShell title="SVARA Digital Engineering" meta="CAD · Simulation · Delivery Workflows" status="ENGINEERING LIVE">
      <div className="ops">
        <div className="ops-main">
          <div className="cx-view ops-view">
            <CadSimulationScene />
            <div className="cx-view__scan" />
            <div className="cx-view__hud ops-hud"><span>CAD + SIMULATION WORKSPACE</span><span>REV E-142 · APPROVAL PATH ACTIVE</span></div>
            <div className="cx-view__hud ops-hud ops-hud--bottom"><span>FEA SOLVER 64% · CI HEALTH {fmt.pct(pipeline)}</span><span>{fmt.int(approvals)} OPEN APPROVALS</span></div>
          </div>
          <div className="ops-mini-panels">
            <Panel title="Build Health" right={<span className="ops-dim">CI/CD</span>}>
              <StreamChart data={build} min={78} max={100} height={58} />
            </Panel>
            <Panel title="Simulation Load">
              <div className="ops-grid3">
                <RadialGauge label="Solver" value={sim} size={84} />
                <RadialGauge label="Pipeline" value={pipeline} display={fmt.pct(pipeline)} size={84} />
                <RadialGauge label="Tests" value={98.6} display="418/424" size={84} />
              </div>
            </Panel>
          </div>
        </div>
        <div className="ops-rail">
          <Panel title="Workflow">
            <div className="ops-grid2">
              <Stat label="Pipelines" value="318" />
              <Stat label="Deployments" value="5,914" />
              <Stat label="Approvals" value={fmt.int(approvals)} tone="warn" />
              <Stat label="Sim Jobs" value="42" />
            </div>
          </Panel>
          <Panel title="Engineering Queue" right={<Chip tone="info">CONTROLLED</Chip>}>
            <div className="ops-list">
              {[
                ["CAD REV", 82], ["SIMULATION", 64], ["API REVIEW", 91], ["QA GATE", 76], ["RELEASE", 88],
              ].map(([name, v]) => (
                <div key={name} className="ops-row">
                  <span className="ops-row__id">{name}</span>
                  <UtilBar value={v as number} />
                  <span className="ops-row__v">{v}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Event History"><MiniLog items={log} /></Panel>
        </div>
      </div>
      <RuntimeStyles />
    </ConsoleShell>
  )
}

/* ---------------- Growth Intelligence ---------------- */

const GROWTH_EVENTS = [
  "High-intent lead routed to enterprise sales",
  "PR mention classified: positive analyst note",
  "Campaign bid adjusted from conversion signal",
  "Website account surge detected: manufacturing",
  "Competitor mention spike added to brief",
  "ABM audience refreshed from CRM changes",
  "Lead score recalculated from product usage",
  "Crisis keyword monitor cleared",
]

function GrowthScene() {
  const t = useRafTime()
  const stages = [
    { id: "VISITORS", x: 14, w: 72, y: 14 },
    { id: "MQL", x: 21, w: 58, y: 26 },
    { id: "SQL", x: 29, w: 42, y: 38 },
    { id: "PIPELINE", x: 36, w: 28, y: 50 },
    { id: "WON", x: 43, w: 14, y: 62 },
  ]
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.2">
        {Array.from({ length: 8 }, (_, i) => <line key={i} x1="8" x2="92" y1={10 + i * 8} y2={10 + i * 8} />)}
      </g>
      {stages.map((s, i) => (
        <g key={s.id}>
          <path d={`M${s.x},${s.y} H${s.x + s.w} L${s.x + s.w - 5},${s.y + 8} H${s.x + 5} Z`}
            fill={i % 2 ? "rgba(57,217,138,0.11)" : "rgba(77,163,255,0.11)"}
            stroke={i % 2 ? "#39D98A" : "#4DA3FF"} strokeOpacity="0.55" strokeWidth="0.35" />
          <rect x={s.x + 4} y={s.y + 2} width={(s.w - 8) * (0.55 + Math.sin(t * 1.1 + i) * 0.08)} height="1.2" rx="0.5"
            fill={i % 2 ? "#39D98A" : "#4DA3FF"} opacity="0.75" />
          <text x="50" y={s.y + 5.4} textAnchor="middle" fill="rgba(255,255,255,0.82)" fontSize="2.2" fontFamily="JetBrains Mono, monospace">{s.id}</text>
        </g>
      ))}
      <g>
        <path d="M8,69 C20,58 28,70 40,58 S63,58 72,47 S86,42 94,30" fill="none" stroke="#FFB020" strokeWidth="0.45" />
        <circle cx={8 + (t * 14) % 86} cy={69 - Math.sin(t * 1.2) * 8} r="0.8" fill="#FFB020" opacity="0.85" />
        <text x="8" y="75" fill="#FFE0A6" fontSize="2" fontFamily="JetBrains Mono, monospace">PR SENTIMENT + CAMPAIGN INTELLIGENCE</text>
      </g>
    </svg>
  )
}

function GrowthConsole() {
  const leads = useStream("growth:leads", { min: 420, max: 980, points: 42, ms: 900 })
  const sentiment = useWalk("growth:sent", { min: 68, max: 91, step: 2.2, ms: 1400 })
  const conversion = useWalk("growth:conv", { min: 7.1, max: 12.4, step: 0.55, ms: 1700 })
  const reach = useWalk("growth:reach", { min: 38.2, max: 46.8, step: 0.8, ms: 1900 })
  const log = useFeed({
    ms: 2350, cap: 6,
    prime: GROWTH_EVENTS.slice(0, 4).map(title => ({ title })),
    make: () => (Math.random() < 0.14 ? null : { title: pick(GROWTH_EVENTS) }),
  })
  const alerts = useFeed({
    ms: 5100, cap: 4,
    prime: [
      { title: "Manufacturing account surge", severity: "info", detail: "14 target accounts active", tag: "ABM" },
      { title: "Competitor mention spike", severity: "warning", detail: "Analyst coverage · watchlist", tag: "PR" },
    ],
    make: () => pick([
      { title: "High-intent lead", severity: "info", detail: "Energy enterprise · 92 score", tag: "MQL" },
      { title: "Campaign anomaly", severity: "warning", detail: "CPC variance above threshold", tag: "ADS" },
      { title: "Positive press mention", severity: "info", detail: "Industry publication · syndicated", tag: "PR" },
    ]),
  })
  return (
    <ConsoleShell title="SVARA Growth Intelligence" meta="Marketing · Leads · PR · Campaigns" status="INTELLIGENCE ACTIVE">
      <div className="ops">
        <div className="ops-main">
          <div className="cx-view ops-view">
            <GrowthScene />
            <div className="cx-view__scan" />
            <div className="cx-view__hud ops-hud"><span>LEAD PIPELINE · PR MONITORING · CAMPAIGN CONTROL</span><span>{fmt.fix(reach, 1)}M REACH</span></div>
            <div className="cx-view__hud ops-hud ops-hud--bottom"><span>CONVERSION INDEX {fmt.fix(conversion, 1)}</span><span>SENTIMENT {fmt.pct(sentiment, 0)}</span></div>
          </div>
          <div className="ops-mini-panels">
            <Panel title="Lead Velocity" right={<span className="ops-dim">QUALIFIED / HR</span>}>
              <StreamChart data={leads} min={320} max={1040} height={58} />
            </Panel>
            <Panel title="Campaign Intelligence">
              <div className="ops-grid3">
                <RadialGauge label="Sentiment" value={sentiment} size={84} />
                <RadialGauge label="Pipeline" value={82} size={84} />
                <RadialGauge label="PR Risk" value={18} display="LOW" size={84} />
              </div>
            </Panel>
          </div>
        </div>
        <div className="ops-rail">
          <Panel title="Growth Readouts">
            <div className="ops-grid2">
              <Stat label="Reach" value={`${fmt.fix(reach, 1)}M`} />
              <Stat label="Leads" value={fmt.int(leads[leads.length - 1] ?? 0)} />
              <Stat label="Conv Index" value={fmt.fix(conversion, 1)} />
              <Stat label="Open PR" value="3" tone="warn" />
            </div>
          </Panel>
          <Panel title="Live Alerts"><Feed items={alerts} render={item => <AlertRow item={item} />} /></Panel>
          <Panel title="Channel Health" right={<Chip tone="ok">OPTIMIZING</Chip>}>
            <div className="ops-list">
              {[
                ["ABM", 88], ["SEARCH", 74], ["SOCIAL", 68], ["PR", 81], ["EMAIL", 77],
              ].map(([name, v]) => (
                <div key={name} className="ops-row">
                  <span className="ops-row__id">{name}</span>
                  <UtilBar value={v as number} />
                  <span className="ops-row__v">{v}%</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Event History"><MiniLog items={log} /></Panel>
        </div>
      </div>
      <RuntimeStyles />
    </ConsoleShell>
  )
}
