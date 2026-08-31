/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck — React console runtime; excluded from vue-tsc.
// DRONE AI — fleet operations. Left: mission map with drones flying seeded
// patrol paths over a site plan, live position, heading and scan cone.
// Right: fleet roster with battery/altitude/signal, flight telemetry
// streams and a mission log.
import React, { useEffect, useRef, useState } from "react"
import { ConsoleShell, Panel, Feed, Stat, Chip, UtilBar } from "../core/primitives"
import { StreamChart, Spark } from "../core/charts"
import { useConsoleLive, useFeed, useStream, useWalk, fmt } from "../core/useLive"
import { rng, pick } from "../core/seed"

const FLEET = [
  { id: "SVR-D01", mission: "Perimeter Patrol", ph: 0.0, spd: 0.055, r: 34 },
  { id: "SVR-D02", mission: "Stockpile Survey", ph: 2.1, spd: 0.042, r: 22 },
  { id: "SVR-D03", mission: "Flare Stack Inspect", ph: 4.2, spd: 0.036, r: 15 },
  { id: "SVR-D04", mission: "Roof Thermal Scan", ph: 1.2, spd: 0.048, r: 27 },
]

const LOG = [
  "Waypoint 14/22 reached — SVR-D01",
  "Thermal capture uploaded (214 frames)",
  "Geofence check OK — all units inside",
  "SVR-D03 hovering: close-visual inspect",
  "Wind 14 km/h NNW — plans adjusted",
  "RTK fix locked · ±2cm",
  "SVR-D02 begins orthomosaic pass 3",
  "Battery swap scheduled — SVR-D04",
]

function dronePos(d: typeof FLEET[0], t: number) {
  const a = t * d.spd * Math.PI * 2 + d.ph
  return {
    x: 50 + Math.cos(a) * d.r,
    y: 40 + Math.sin(a) * d.r * 0.62,
    heading: (a * 180) / Math.PI + 90,
  }
}

function MissionMap({ t, focus }: { t: number, focus: number }) {
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {/* site plan */}
      <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.25" fill="rgba(255,255,255,0.04)">
        <rect x="12" y="14" width="26" height="18" rx="0.8" />
        <rect x="44" y="10" width="18" height="12" rx="0.8" />
        <rect x="58" y="30" width="30" height="22" rx="0.8" />
        <rect x="14" y="46" width="20" height="20" rx="0.8" />
        <circle cx="48" cy="58" r="7" />
      </g>
      <g stroke="rgba(255,255,255,0.07)" strokeWidth="0.2">
        <path d="M0,40 H100 M40,0 V80 M0,70 H100" fill="none" />
      </g>
      {/* geofence */}
      <rect x="4" y="4" width="92" height="72" rx="2" fill="none"
        stroke="#4DA3FF" strokeOpacity="0.45" strokeWidth="0.35" strokeDasharray="2.4 1.6" />
      <text x="6.5" y="8.4" fill="#4DA3FF" fillOpacity="0.7" fontSize="2.1" fontFamily="JetBrains Mono, monospace">GEOFENCE A-7 · ACTIVE</text>

      {FLEET.map((d, i) => {
        const p = dronePos(d, t)
        const active = i === focus
        // patrol path
        const path = Array.from({ length: 64 }, (_, k) => {
          const q = dronePos(d, k / 6)
          return `${q.x.toFixed(1)},${q.y.toFixed(1)}`
        }).join(" ")
        const trail = Array.from({ length: 10 }, (_, k) => dronePos(d, t - k * 0.35))
        return (
          <g key={d.id}>
            <polygon points={path} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.22" strokeDasharray="0.8 1.2" />
            <polyline points={trail.map(q => `${q.x},${q.y}`).join(" ")} fill="none"
              stroke={active ? "#4DA3FF" : "rgba(255,255,255,0.3)"} strokeOpacity="0.6" strokeWidth="0.3" />
            {/* scan cone */}
            <path
              d={`M${p.x},${p.y} L${p.x - 4},${p.y + 9} A9,4.4 0 0 0 ${p.x + 4},${p.y + 9} Z`}
              fill={active ? "rgba(77,163,255,0.14)" : "rgba(255,255,255,0.05)"}
              transform={`rotate(${p.heading} ${p.x} ${p.y})`}
            />
            <g transform={`translate(${p.x} ${p.y}) rotate(${p.heading})`}>
              <path d="M0,-2 L1.5,1.6 L0,0.8 L-1.5,1.6 Z"
                fill={active ? "#4DA3FF" : "rgba(255,255,255,0.75)"} />
            </g>
            {active ? (
              <circle cx={p.x} cy={p.y} r={3 + Math.sin(t * 3) * 0.5} fill="none" stroke="#4DA3FF" strokeOpacity="0.5" strokeWidth="0.3" />
            ) : null}
            <text x={p.x + 3} y={p.y - 2} fill={active ? "#9CC8FF" : "rgba(255,255,255,0.55)"}
              fontSize="2" fontFamily="JetBrains Mono, monospace">{d.id}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function DroneConsole() {
  const live = useConsoleLive()
  const [t, setT] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    if (!live) return
    let on = true
    const t0 = performance.now()
    const loop = (now: number) => { if (!on) return; setT((now - t0) / 1000); raf.current = requestAnimationFrame(loop) }
    raf.current = requestAnimationFrame(loop)
    return () => { on = false; cancelAnimationFrame(raf.current) }
  }, [live])

  const [focus, setFocus] = useState(0)
  const alt = useStream("drone:alt", { min: 38, max: 62, points: 40, ms: 800 })
  const spd = useStream("drone:spd", { min: 6, max: 15, points: 40, ms: 800 })
  const batteries = [
    useWalk("d1:bat", { min: 58, max: 88, step: 0.35, ms: 2600 }),
    useWalk("d2:bat", { min: 41, max: 76, step: 0.35, ms: 2600 }),
    useWalk("d3:bat", { min: 68, max: 94, step: 0.35, ms: 2600 }),
    useWalk("d4:bat", { min: 22, max: 45, step: 0.35, ms: 2600 }),
  ]
  const signal = useWalk("drone:sig", { min: 88, max: 99, ms: 1500 })
  const area = useWalk("drone:area", { min: 84, max: 97, step: 0.5, ms: 2100 })

  const log = useFeed({
    ms: 2900, cap: 6,
    prime: LOG.slice(0, 3).map(m => ({ title: m })),
    make: () => (Math.random() < 0.22 ? null : { title: pick(LOG) }),
  })

  const focused = FLEET[focus]
  const fp = dronePos(focused, t)

  return (
    <ConsoleShell title="SVARA Drone AI" meta="Mission: Site Survey 7 · 4 units airborne" status="MISSION ACTIVE">
      <div className="dx">
        <div className="dx-main">
          <div className="cx-view dx-map">
            <MissionMap t={t} focus={focus} />
            <div className="cx-view__scan" />
            <div className="cx-view__hud">
              <div className="dx-hud">
                <span>MISSION MAP · GRID 200m</span>
                <span>RTK ±2CM · GPS 14 SAT</span>
              </div>
            </div>
          </div>
          <div className="dx-telemetry">
            <Panel title={`Telemetry — ${focused.id}`} right={<Chip tone="info">{focused.mission.toUpperCase()}</Chip>}>
              <div className="dx-tstats">
                <Stat label="Altitude" value={fmt.fix(alt[alt.length - 1] ?? 0, 1)} unit="m" />
                <Stat label="Speed" value={fmt.fix(spd[spd.length - 1] ?? 0, 1)} unit="m/s" />
                <Stat label="Heading" value={`${Math.round(((fp.heading % 360) + 360) % 360)}°`} />
                <Stat label="Link" value={fmt.pct(signal, 0)} />
              </div>
              <div className="dx-tcharts">
                <div><span className="dx-chartlabel">ALT (m)</span><StreamChart data={alt} min={30} max={70} height={44} /></div>
                <div><span className="dx-chartlabel">SPD (m/s)</span><StreamChart data={spd} min={4} max={17} height={44} color="#102A5B" /></div>
              </div>
            </Panel>
          </div>
        </div>

        <div className="dx-rail">
          <Panel title="Fleet" right={<span className="dx-dim">{FLEET.length} AIRBORNE</span>}>
            <div className="dx-fleet">
              {FLEET.map((d, i) => (
                <button key={d.id} type="button"
                  className={`dx-drone ${i === focus ? "is-on" : ""}`}
                  onClick={() => setFocus(i)}>
                  <div className="dx-drone__head">
                    <span className="dx-drone__id">{d.id}</span>
                    <Chip tone={batteries[i] < 30 ? "crit" : batteries[i] < 50 ? "warn" : "ok"}>
                      {batteries[i] < 30 ? "RTB SOON" : "IN FLIGHT"}
                    </Chip>
                  </div>
                  <span className="dx-drone__mission">{d.mission}</span>
                  <div className="dx-drone__bat">
                    <span className="dx-dim">BAT {Math.round(batteries[i])}%</span>
                    <UtilBar value={batteries[i]} tone={batteries[i] < 30 ? "crit" : batteries[i] < 50 ? "warn" : "ok"} />
                  </div>
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Coverage">
            <Stat label="Survey area complete" value={fmt.pct(area)} />
            <div style={{ marginTop: 8 }}><UtilBar value={area} tone="ok" /></div>
          </Panel>

          <Panel title="Mission Log">
            <Feed dense items={log} render={item => (
              <div className="dx-log">
                <span className="dx-log__t">{item.time}</span>
                <span className="dx-log__m">{item.title}</span>
              </div>
            )} />
          </Panel>
        </div>
      </div>

      <style>{`
        .dx { display: grid; grid-template-columns: minmax(0, 7fr) minmax(260px, 3fr); gap: 1px; background: rgba(16,42,91,0.06); }
        .dx-main { background: #fff; padding: 12px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .dx-map { min-height: 360px; flex: 1; }
        .dx-map svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .dx-hud { position: absolute; top: 10px; left: 14px; right: 14px; display: flex; justify-content: space-between; font-size: 8.5px; letter-spacing: 0.12em; color: rgba(255,255,255,0.6); }
        .dx-telemetry .cx-panel { border: 1px solid rgba(16,42,91,0.08); border-radius: 10px; }
        .dx-tstats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .dx-tcharts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px; }
        .dx-chartlabel { display: block; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.12em; color: var(--color-text-faint); margin-bottom: 4px; }
        .dx-rail { background: #fff; display: flex; flex-direction: column; }
        .dx-rail > * + * { border-top: 1px solid rgba(16,42,91,0.07); }
        .dx-fleet { display: flex; flex-direction: column; gap: 6px; }
        .dx-drone {
          display: flex; flex-direction: column; gap: 4px; padding: 8px 10px;
          border: 1px solid rgba(16,42,91,0.1); border-radius: 9px; background: #fff;
          cursor: pointer; text-align: left; transition: border-color 180ms, box-shadow 180ms;
        }
        .dx-drone.is-on { border-color: var(--cx-accent); box-shadow: 0 0 0 2px rgba(47,127,230,0.18); }
        .dx-drone__head { display: flex; align-items: center; justify-content: space-between; }
        .dx-drone__id { font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; color: var(--cx-ink); }
        .dx-drone__mission { font-size: 10px; color: var(--color-text-secondary); }
        .dx-drone__bat { display: flex; flex-direction: column; gap: 3px; }
        .dx-dim { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.08em; color: var(--color-text-faint); }
        .dx-log { display: flex; gap: 8px; align-items: baseline; min-width: 0; }
        .dx-log__t { font-family: var(--font-mono); font-size: 8.5px; color: var(--color-text-faint); flex-shrink: 0; font-variant-numeric: tabular-nums; }
        .dx-log__m { font-size: 10.5px; color: var(--cx-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        @media (max-width: 900px) { .dx { grid-template-columns: 1fr; } .dx-map { min-height: 360px; } }
      `}</style>
    </ConsoleShell>
  )
}
