/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck — React console runtime; excluded from vue-tsc.
// Procedural surveillance scene for the Vision AI console. Each "camera"
// is a seeded simulation of a manufacturing area: a dark wireframe floor,
// tracked entities (workers / forklifts / pallets) moving on paths, and an
// AI overlay — bounding boxes, class + confidence labels, motion trails,
// restricted zones and an occupancy heatmap. No video, no images: the
// entire feed is React + SVG driven by requestAnimationFrame.
import React, { useEffect, useRef, useState } from "react"
import { rng } from "../core/seed"
import { useConsoleLive } from "../core/useLive"

const CLASS_STYLE = {
  worker:   { color: "#4DA3FF", label: "WORKER" },
  helmet:   { color: "#39D98A", label: "PPE·HELMET" },
  novest:   { color: "#FFB020", label: "PPE·NO-VEST" },
  forklift: { color: "#FF7A59", label: "FORKLIFT" },
  pallet:   { color: "#9AA7BC", label: "PALLET" },
  intruder: { color: "#FF4D4D", label: "UNAUTHORIZED" },
}

export interface CameraDef {
  id: string
  name: string
  zone?: { x: number, y: number, w: number, h: number, label: string }
  entities: Array<{
    cls: keyof typeof CLASS_STYLE
    // Lissajous path parameters — smooth, non-repeating-feeling motion
    cx: number, cy: number, rx: number, ry: number, fx: number, fy: number, ph: number
    w: number, h: number
  }>
  heat?: boolean
}

/** Build a seeded camera definition. */
export function makeCamera(id: string, name: string, opts: { zone?: boolean, heat?: boolean, mix?: string[] } = {}): CameraDef {
  const r = rng(`cam:${id}`)
  const mix = opts.mix ?? ["worker", "worker", "helmet", "forklift", "pallet"]
  const n = 3 + Math.floor(r() * 3)
  const entities = Array.from({ length: n }, (_, i) => {
    const cls = mix[Math.floor(r() * mix.length)]
    const big = cls === "forklift"
    return {
      cls,
      cx: 15 + r() * 70, cy: 30 + r() * 45,
      rx: 6 + r() * (big ? 22 : 14), ry: 3 + r() * 9,
      fx: 0.05 + r() * 0.12, fy: 0.04 + r() * 0.1,
      ph: r() * Math.PI * 2,
      w: big ? 13 + r() * 4 : 5.5 + r() * 2, h: big ? 10 + r() * 3 : 11 + r() * 3,
    }
  })
  return {
    id, name, entities,
    heat: opts.heat ?? r() > 0.5,
    zone: opts.zone !== false && r() > 0.35
      ? { x: 8 + r() * 20, y: 52 + r() * 16, w: 20 + r() * 14, h: 18 + r() * 12, label: "RESTRICTED" }
      : undefined,
  }
}

function entityPos(e: CameraDef["entities"][0], t: number) {
  return {
    x: e.cx + Math.cos(t * e.fx * Math.PI * 2 + e.ph) * e.rx,
    y: e.cy + Math.sin(t * e.fy * Math.PI * 2 + e.ph * 1.7) * e.ry,
  }
}

/** Deterministic pseudo-confidence that breathes over time. */
function conf(seedPh: number, t: number) {
  return 0.86 + 0.11 * Math.sin(t * 0.9 + seedPh * 5) * Math.sin(t * 0.23 + seedPh)
}

/**
 * The scene itself. Renders at `detail` levels: "full" (main viewport,
 * labels + trails + heat) or "thumb" (grid tile, boxes only).
 */
export function CameraScene({ cam, detail = "full", className = "" }: {
  cam: CameraDef, detail?: "full" | "thumb", className?: string,
}) {
  const live = useConsoleLive()
  const [t, setT] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    if (!live) return
    let mounted = true
    const t0 = performance.now()
    // thumbnails tick at ~12fps — cheap; the main feed runs at rAF rate
    let last = 0
    const loop = (now: number) => {
      if (!mounted) return
      raf.current = requestAnimationFrame(loop)
      if (detail === "thumb" && now - last < 80) return
      last = now
      setT((now - t0) / 1000)
    }
    raf.current = requestAnimationFrame(loop)
    return () => { mounted = false; cancelAnimationFrame(raf.current) }
  }, [live, detail])

  const full = detail === "full"
  const positions = cam.entities.map(e => entityPos(e, t))

  return (
    <svg
      className={`cxv ${className}`}
      viewBox="0 0 100 75"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* floor perspective grid */}
      <g stroke="rgba(255,255,255,0.07)" strokeWidth="0.22">
        {Array.from({ length: 7 }, (_, i) => {
          const y = 26 + i * 8
          return <line key={`h${i}`} x1="0" x2="100" y1={y} y2={y} />
        })}
        {Array.from({ length: 11 }, (_, i) => {
          const x = i * 10
          const spread = (x - 50) * 0.55
          return <line key={`v${i}`} x1={50 + spread * 0.45} y1="26" x2={x} y2="75" />
        })}
        <line x1="0" x2="100" y1="26" y2="26" stroke="rgba(255,255,255,0.14)" strokeWidth="0.3" />
      </g>

      {/* static structure: racking + machines silhouettes */}
      <g fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.25">
        <rect x="4" y="12" width="20" height="14" />
        <rect x="76" y="10" width="19" height="16" />
        <rect x="40" y="15" width="14" height="11" />
        {full ? (
          <g stroke="rgba(255,255,255,0.09)">
            <line x1="9" y1="12" x2="9" y2="26" /><line x1="14" y1="12" x2="14" y2="26" /><line x1="19" y1="12" x2="19" y2="26" />
            <line x1="81" y1="10" x2="81" y2="26" /><line x1="86" y1="10" x2="86" y2="26" /><line x1="91" y1="10" x2="91" y2="26" />
          </g>
        ) : null}
      </g>

      {/* occupancy heatmap */}
      {full && cam.heat ? (
        <g style={{ mixBlendMode: "screen" }}>
          {positions.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y + 3} r={cam.entities[i].cls === "forklift" ? 15 : 10}
              fill="url(#cxv-heat)" opacity="0.55" />
          ))}
        </g>
      ) : null}
      <defs>
        <radialGradient id="cxv-heat">
          <stop offset="0%" stopColor="#FF5A3C" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#FFB020" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFB020" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* restricted zone */}
      {cam.zone ? (
        <g>
          <rect x={cam.zone.x} y={cam.zone.y} width={cam.zone.w} height={cam.zone.h}
            fill="rgba(255,77,77,0.07)" stroke="#FF4D4D" strokeOpacity="0.75"
            strokeWidth="0.35" strokeDasharray="1.6 1.1" />
          {full ? (
            <text x={cam.zone.x + 1.2} y={cam.zone.y + 3} fill="#FF6B6B" fontSize="2.3"
              fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">⬢ {cam.zone.label}</text>
          ) : null}
        </g>
      ) : null}

      {/* entities: trails, marker, bounding box, label */}
      {cam.entities.map((e, i) => {
        const p = positions[i]
        const s = CLASS_STYLE[e.cls]
        const c = conf(e.ph, t)
        const inZone = cam.zone
          && p.x > cam.zone.x && p.x < cam.zone.x + cam.zone.w
          && p.y > cam.zone.y && p.y < cam.zone.y + cam.zone.h
        const color = inZone ? "#FF4D4D" : s.color
        // motion trail — sampled history along the same path
        const trail = full
          ? Array.from({ length: 9 }, (_, k) => entityPos(e, t - (k + 1) * 0.22))
          : []
        return (
          <g key={i}>
            {full ? (
              <polyline
                points={[`${p.x},${p.y + e.h / 2}`, ...trail.map(q => `${q.x},${q.y + e.h / 2}`)].join(" ")}
                fill="none" stroke={color} strokeOpacity="0.3" strokeWidth="0.35"
              />
            ) : null}
            {/* body glyph */}
            {e.cls === "forklift" || e.cls === "pallet" ? (
              <rect x={p.x - e.w / 2} y={p.y - e.h / 4} width={e.w} height={e.h * 0.75}
                fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.25" rx="0.6" />
            ) : (
              <g stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" fill="none">
                <circle cx={p.x} cy={p.y - e.h / 2 + 1.2} r="1.15" fill="rgba(255,255,255,0.16)" />
                <line x1={p.x} y1={p.y - e.h / 2 + 2.4} x2={p.x} y2={p.y + e.h / 4} />
                <line x1={p.x - 1.6} y1={p.y - e.h / 4} x2={p.x + 1.6} y2={p.y - e.h / 4} />
                <line x1={p.x} y1={p.y + e.h / 4} x2={p.x - 1.3} y2={p.y + e.h / 2} />
                <line x1={p.x} y1={p.y + e.h / 4} x2={p.x + 1.3} y2={p.y + e.h / 2} />
              </g>
            )}
            {/* bounding box */}
            <rect
              x={p.x - e.w / 2 - 0.8} y={p.y - e.h / 2 - 0.8}
              width={e.w + 1.6} height={e.h + 1.6}
              fill="none" stroke={color} strokeWidth={full ? 0.38 : 0.5} rx="0.4"
              strokeOpacity={0.55 + 0.4 * Math.abs(Math.sin(t * 1.1 + i))}
            />
            {/* corner ticks */}
            <g stroke={color} strokeWidth={full ? 0.55 : 0.7}>
              <path d={`M${p.x - e.w / 2 - 0.8},${p.y - e.h / 2 + 1} v-1.8 h1.8`} fill="none" />
              <path d={`M${p.x + e.w / 2 + 0.8},${p.y - e.h / 2 + 1} v-1.8 h-1.8`} fill="none" />
            </g>
            {full ? (
              <g>
                <rect x={p.x - e.w / 2 - 0.8} y={p.y - e.h / 2 - 4.6} width={Math.max(15, s.label.length * 1.5 + 7)} height="3.2"
                  fill={color} fillOpacity="0.92" rx="0.4" />
                <text x={p.x - e.w / 2 + 0.2} y={p.y - e.h / 2 - 2.3} fill="#0B0F16" fontSize="2.05"
                  fontWeight="700" fontFamily="JetBrains Mono, monospace">
                  {inZone ? "ZONE BREACH" : s.label} {(c * 100).toFixed(0)}%
                </text>
              </g>
            ) : null}
          </g>
        )
      })}

      {/* slow pan vignette to sell "camera" */}
      <rect x="0" y="0" width="100" height="75" fill="url(#cxv-vig)" pointerEvents="none" />
      <defs>
        <radialGradient id="cxv-vig" cx="50%" cy="42%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  )
}
