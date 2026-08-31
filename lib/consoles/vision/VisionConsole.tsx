/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck — React console runtime; excluded from vue-tsc.
// VISION AI — live surveillance command center. 70/30 split: a full
// AI-overlaid viewport cycling through nine simulated plant cameras, and
// an operations rail (camera grid, alert stream, health gauges,
// alerts-over-time, event history, model confidence). Everything animates
// from seeded simulations — no images, no video.
import React, { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ConsoleShell, Panel, Feed, AlertRow, Stat, Chip } from "../core/primitives"
import { StreamChart, RadialGauge, Meter } from "../core/charts"
import { useCycle, useFeed, useStream, useWalk, useClock, fmt } from "../core/useLive"
import { CameraScene, makeCamera } from "./CameraScene"
import { pick, rng } from "../core/seed"

const CAMS = [
  makeCamera("c01", "Assembly Line A", { mix: ["worker", "helmet", "worker", "forklift"] }),
  makeCamera("c02", "Loading Dock 2", { mix: ["forklift", "pallet", "worker", "novest"] }),
  makeCamera("c03", "Weld Cell 4", { mix: ["worker", "helmet", "helmet"], zone: true }),
  makeCamera("c04", "Warehouse North", { mix: ["forklift", "pallet", "pallet", "worker"] }),
  makeCamera("c05", "Paint Shop", { mix: ["worker", "helmet", "novest"] }),
  makeCamera("c06", "Perimeter Gate 1", { mix: ["worker", "intruder", "worker"], heat: false }),
  makeCamera("c07", "CNC Bay", { mix: ["worker", "helmet", "pallet"] }),
  makeCamera("c08", "Packaging Line", { mix: ["worker", "worker", "helmet", "pallet"] }),
  makeCamera("c09", "Yard South", { mix: ["forklift", "forklift", "worker"], heat: false }),
]

const ALERTS = [
  { title: "PPE violation — missing vest", severity: "warning", tag: "PPE" },
  { title: "Restricted zone intrusion", severity: "critical", tag: "ZONE" },
  { title: "Forklift proximity warning", severity: "warning", tag: "SAFETY" },
  { title: "Unauthorized entry detected", severity: "critical", tag: "ACCESS" },
  { title: "Thermal anomaly — conveyor motor", severity: "critical", tag: "FIRE" },
  { title: "Machine vibration anomaly", severity: "warning", tag: "ANOMALY" },
  { title: "Helmet compliance restored", severity: "info", tag: "PPE" },
  { title: "Camera occlusion cleared", severity: "info", tag: "SYSTEM" },
]

const EVENTS = [
  "Object track 4412 handed off C01→C04",
  "Re-ID matched worker #88 across 3 cams",
  "Zone dwell-time threshold reset",
  "Model helios-det-v9 hot-reloaded",
  "Frame drop recovered on RTSP/6",
  "Forklift route deviation logged",
  "Shift changeover — occupancy rising",
  "Calibration drift corrected on C07",
]

export default function VisionConsole() {
  const [camIdx, selectCam] = useCycle(CAMS.length, 6000)
  const cam = CAMS[camIdx]
  const clock = useClock()

  const detections = useWalk("vis:det", { min: 3800, max: 5200, ms: 1100 })
  const gpu = useWalk("vis:gpu", { min: 52, max: 91, ms: 1400 })
  const latency = useWalk("vis:lat", { min: 9, max: 24, ms: 1600 })
  const health = useWalk("vis:health", { min: 96.2, max: 99.9, step: 0.4, ms: 2000 })
  const confidence = useWalk("vis:conf", { min: 91.5, max: 98.4, step: 0.8, ms: 1300 })
  const alertSeries = useStream("vis:alerts", { min: 0, max: 14, points: 40, ms: 1500 })

  const alerts = useFeed({
    ms: 3400,
    cap: 5,
    prime: [ALERTS[0], ALERTS[2], ALERTS[6]].map(a => ({ ...a, detail: "CAM-C02 · Loading Dock 2" })),
    make: () => {
      const r = Math.random()
      if (r < 0.25) return null
      const a = pick(ALERTS)
      const c = pick(CAMS)
      return { ...a, detail: `CAM-${c.id.toUpperCase()} · ${c.name}` }
    },
  })

  const events = useFeed({
    ms: 2100,
    cap: 6,
    prime: EVENTS.slice(0, 4).map(e => ({ title: e })),
    make: tick => (Math.random() < 0.2 ? null : { title: EVENTS[(tick * 3 + Math.floor(Math.random() * 3)) % EVENTS.length] }),
  })

  const activeTracks = useMemo(() => cam.entities.length, [cam])

  return (
    <ConsoleShell
      title="SVARA Vision AI"
      meta="Site: Pune GF-02 · 128 streams"
      status="ALL SYSTEMS NOMINAL"
    >
      <div className="vx">
        {/* ============ LEFT 70% — main viewport ============ */}
        <div className="vx-main">
          <div className="vx-toolbar">
            <div className="vx-toolbar__group">
              {["LIVE VIEW", "PLAYBACK", "ANALYTICS", "ZONES"].map((m, i) => (
                <button key={m} className={`vx-tab ${i === 0 ? "is-on" : ""}`} type="button">{m}</button>
              ))}
            </div>
            <div className="vx-toolbar__group">
              <Chip tone="info">DET · helios-det-v9</Chip>
              <Chip tone="ok">TRACKING</Chip>
              <Chip tone="ok">RE-ID</Chip>
            </div>
          </div>

          <div className="cx-view vx-view">
            <AnimatePresence mode="wait">
              <motion.div
                key={cam.id}
                className="vx-view__scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <CameraScene cam={cam} detail="full" />
              </motion.div>
            </AnimatePresence>

            <div className="cx-view__scan" />
            <span className="cx-view__corner tl" /><span className="cx-view__corner tr" />
            <span className="cx-view__corner bl" /><span className="cx-view__corner br" />

            <div className="cx-view__hud">
              <div className="vx-hud-top">
                <span className="vx-hud-id">CAM-{cam.id.toUpperCase()} — {cam.name.toUpperCase()}</span>
                <span className="vx-hud-rec"><i />REC</span>
              </div>
              <div className="vx-hud-bottom">
                <span>{clock} IST</span>
                <span>1920×1080 · 30FPS · H.265</span>
                <span>TRACKS {activeTracks} · INF {fmt.ms(latency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ RIGHT 30% — operations rail ============ */}
        <div className="vx-rail">
          <Panel title="Live Feeds" right={<span className="vx-count">{CAMS.length} ACTIVE</span>}>
            <div className="vx-grid">
              {CAMS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  className={`vx-thumb ${i === camIdx ? "is-on" : ""}`}
                  onClick={() => selectCam(i)}
                  aria-label={`Switch to ${c.name}`}
                >
                  <CameraScene cam={c} detail="thumb" />
                  <span className="vx-thumb__id">{c.id.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Alerts" right={<Chip tone="crit">{alerts.length} OPEN</Chip>}>
            <Feed items={alerts} render={item => <AlertRow item={item} />} />
          </Panel>

          <Panel title="Analytics Overview">
            <div className="vx-gauges">
              <RadialGauge label="System Health" value={health} display={fmt.pct(health)} />
              <RadialGauge label="GPU Util" value={gpu} tone={gpu > 85 ? "warn" : undefined} />
              <RadialGauge label="Cameras" value={126} max={128} display="126/128" />
            </div>
            <div className="vx-statrow">
              <Stat label="Detections / min" value={fmt.int(detections)} />
              <Stat label="Inference" value={fmt.ms(latency)} tone={latency > 20 ? "warn" : undefined} />
            </div>
          </Panel>

          <Panel title="Alerts Over Time" right={<span className="vx-count">LAST 60 MIN</span>}>
            <StreamChart data={alertSeries} min={0} max={16} height={56} />
          </Panel>

          <Panel title="AI Confidence">
            <Meter
              label="Mean detection confidence"
              value={confidence}
              min={80} max={100}
              bands={[
                { to: 0.5, color: "rgba(214,69,69,0.10)" },
                { to: 0.75, color: "rgba(214,145,43,0.10)" },
                { to: 1, color: "rgba(31,157,97,0.10)" },
              ]}
            />
          </Panel>

          <Panel title="Event History">
            <Feed
              dense
              items={events}
              render={item => (
                <div className="vx-event">
                  <span className="vx-event__t">{item.time}</span>
                  <span className="vx-event__msg">{item.title}</span>
                </div>
              )}
            />
          </Panel>
        </div>
      </div>

      <style>{`
        .vx { display: grid; grid-template-columns: minmax(0, 7fr) minmax(280px, 3fr); gap: 1px; background: rgba(16,42,91,0.06); }
        .vx-main { background: #fff; padding: 12px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .vx-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .vx-toolbar__group { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .vx-tab {
          padding: 5px 11px; border-radius: 7px; border: 1px solid transparent;
          background: transparent; cursor: default;
          font-family: var(--font-mono); font-size: 9px; font-weight: 600; letter-spacing: 0.1em;
          color: var(--color-text-secondary);
        }
        .vx-tab.is-on { background: rgba(47,127,230,0.08); border-color: rgba(47,127,230,0.3); color: var(--cx-accent); }
        .vx-view { flex: 1; min-height: 380px; }
        .vx-view__scene, .vx-view__scene svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .vx-hud-top { position: absolute; top: 10px; left: 28px; right: 28px; display: flex; justify-content: space-between; align-items: center; }
        .vx-hud-id { font-size: 10px; letter-spacing: 0.14em; color: rgba(255,255,255,0.85); }
        .vx-hud-rec { display: inline-flex; align-items: center; gap: 6px; font-size: 9.5px; letter-spacing: 0.16em; color: #FF5A5A; }
        .vx-hud-rec i { width: 7px; height: 7px; border-radius: 50%; background: #FF5A5A; animation: cx-blink 1.1s infinite; }
        .vx-hud-bottom {
          position: absolute; bottom: 10px; left: 28px; right: 28px;
          display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
          font-size: 9px; letter-spacing: 0.1em; color: rgba(255,255,255,0.6);
          font-variant-numeric: tabular-nums;
        }
        .vx-rail { background: #fff; display: flex; flex-direction: column; min-width: 0; }
        .vx-rail > * + * { border-top: 1px solid rgba(16,42,91,0.07); }
        .vx-count { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.1em; color: var(--color-text-faint); }
        .vx-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .vx-thumb {
          position: relative; aspect-ratio: 4/3; padding: 0; border-radius: 7px; overflow: hidden;
          border: 1px solid rgba(16,42,91,0.14); background: #0C1118; cursor: pointer;
          transition: transform 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms, box-shadow 200ms;
        }
        .vx-thumb svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .vx-thumb:hover { transform: scale(1.12); z-index: 2; box-shadow: 0 8px 24px rgba(16,42,91,0.28); }
        .vx-thumb.is-on { border-color: var(--cx-accent); box-shadow: 0 0 0 2px rgba(47,127,230,0.28); }
        .vx-thumb__id { position: absolute; left: 4px; bottom: 3px; font-family: var(--font-mono); font-size: 7px; letter-spacing: 0.1em; color: rgba(255,255,255,0.75); }
        .vx-gauges { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .vx-statrow { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; padding-top: 10px; border-top: 1px dashed rgba(16,42,91,0.1); }
        .vx-event { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
        .vx-event__t { font-family: var(--font-mono); font-size: 8.5px; color: var(--color-text-faint); font-variant-numeric: tabular-nums; flex-shrink: 0; }
        .vx-event__msg { font-size: 10.5px; color: var(--cx-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        @media (max-width: 900px) {
          .vx { grid-template-columns: 1fr; }
          .vx-view { min-height: 360px; }
        }
      `}</style>
    </ConsoleShell>
  )
}
