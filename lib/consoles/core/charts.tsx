/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck — React console runtime; excluded from vue-tsc.
// Chart primitives for the SVARA consoles — pure SVG, continuously fed by
// useStream/useWalk. No chart library, no images: thin strokes, one accent,
// engineering-monitor aesthetics.
import React, { useId } from "react"
import { motion } from "framer-motion"

const ACCENT = "#2F7FE6"
const INK = "#102A5B"

function pathFrom(data: number[], w: number, h: number, min: number, max: number, pad = 3) {
  const n = data.length
  const span = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (n - 1)) * w
    const y = pad + (1 - (v - min) / span) * (h - pad * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return `M${pts.join(" L")}`
}

/** Continuously-updating line chart with soft area fill. */
export function StreamChart({ data, min, max, height = 72, color = ACCENT, showFill = true, grid = 3 }: {
  data: number[], min: number, max: number, height?: number,
  color?: string, showFill?: boolean, grid?: number,
}) {
  const id = useId()
  const W = 200
  const d = pathFrom(data, W, height, min, max)
  const last = data[data.length - 1] ?? min
  const ly = 3 + (1 - (last - min) / (max - min || 1)) * (height - 6)
  return (
    <svg className="cxc-stream" viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: grid }, (_, i) => {
        const y = ((i + 1) / (grid + 1)) * height
        return <line key={i} x1="0" x2={W} y1={y} y2={y} className="cxc-grid" />
      })}
      {showFill ? <path d={`${d} L${W},${height} L0,${height} Z`} fill={`url(#${id}-f)`} stroke="none" /> : null}
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <circle cx={W} cy={ly} r="2.6" fill={color} className="cxc-stream__tip" />
    </svg>
  )
}

/** Multi-series stream (thin lines, shared scale). */
export function MultiStream({ series, min, max, height = 72 }: {
  series: Array<{ data: number[], color?: string, dash?: boolean }>,
  min: number, max: number, height?: number,
}) {
  const W = 200
  return (
    <svg className="cxc-stream" viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {[1, 2, 3].map(i => (
        <line key={i} x1="0" x2={W} y1={(i / 4) * height} y2={(i / 4) * height} className="cxc-grid" />
      ))}
      {series.map((s, i) => (
        <path
          key={i}
          d={pathFrom(s.data, W, height, min, max)}
          fill="none"
          stroke={s.color ?? (i === 0 ? ACCENT : INK)}
          strokeOpacity={i === 0 ? 1 : 0.45}
          strokeWidth="1.4"
          strokeDasharray={s.dash ? "3 3" : undefined}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

/** Radial gauge — animated arc with the value in the middle. */
export function RadialGauge({ value, max = 100, label, display, size = 108, color = ACCENT, tone }: {
  value: number, max?: number, label: string, display?: string,
  size?: number, color?: string, tone?: "ok" | "warn" | "crit",
}) {
  const R = 44
  const C = 2 * Math.PI * R
  const frac = Math.min(1, Math.max(0, value / max))
  const toneColor = tone === "crit" ? "#D64545" : tone === "warn" ? "#D6912B" : color
  return (
    <div className="cxc-gauge" style={{ width: size }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(16,42,91,0.08)" strokeWidth="6" />
        <motion.circle
          cx="50" cy="50" r={R} fill="none"
          stroke={toneColor} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={C}
          animate={{ strokeDashoffset: C * (1 - frac) }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="cxc-gauge__center">
        <span className="cxc-gauge__value">{display ?? `${Math.round(frac * 100)}%`}</span>
      </div>
      <span className="cxc-gauge__label">{label}</span>
    </div>
  )
}

/** Vertical bar series that re-animates when data updates. */
export function Bars({ data, min = 0, max, height = 64, color = ACCENT }: {
  data: number[], min?: number, max: number, height?: number, color?: string,
}) {
  return (
    <div className="cxc-bars" style={{ height }}>
      {data.map((v, i) => (
        <motion.span
          key={i}
          className="cxc-bars__bar"
          style={{ background: color }}
          animate={{ height: `${((v - min) / (max - min || 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 160, damping: 26 }}
        />
      ))}
    </div>
  )
}

/** Large horizontal confidence/health meter with a moving needle. */
export function Meter({ value, min = 0, max = 100, label, display, bands }: {
  value: number, min?: number, max?: number, label: string, display?: string,
  bands?: Array<{ to: number, color: string }>,
}) {
  const frac = Math.min(1, Math.max(0, (value - min) / (max - min || 1)))
  return (
    <div className="cxc-meter">
      <div className="cxc-meter__head">
        <span className="cxc-meter__label">{label}</span>
        <span className="cxc-meter__value">{display ?? `${value.toFixed(1)}%`}</span>
      </div>
      <div className="cxc-meter__track">
        {(bands ?? [{ to: 1, color: "rgba(47,127,230,0.14)" }]).map((b, i, arr) => {
          const from = i === 0 ? 0 : arr[i - 1]!.to
          return (
            <span key={i} className="cxc-meter__band"
              style={{ left: `${from * 100}%`, width: `${(b.to - from) * 100}%`, background: b.color }} />
          )
        })}
        <motion.span
          className="cxc-meter__needle"
          animate={{ left: `${frac * 100}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
        />
        <motion.span
          className="cxc-meter__fill"
          animate={{ width: `${frac * 100}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
        />
      </div>
    </div>
  )
}

/** Tiny sparkline for table rows. */
export function Spark({ data, min, max, color = ACCENT, width = 64, height = 18 }: {
  data: number[], min: number, max: number, color?: string, width?: number, height?: number,
}) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="cxc-spark" aria-hidden="true">
      <path d={pathFrom(data, width, height, min, max, 2)} fill="none" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}
