/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck — React console runtime; excluded from vue-tsc.
// Shared chrome for every SVARA product console: the shell (window frame +
// toolbar + status footer), panels, live badges, stat readouts and the
// animated alert/event feed. Design language: white, thin hairlines, one
// blue accent, mono microtype — an operating platform, not a landing page.
import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LiveContext, useClock } from "./useLive"

/* ---------------- shell ---------------- */

export function ConsoleShell({ title, meta, status = "OPERATIONAL", children, footer }: {
  title: string, meta?: string, status?: string,
  children: React.ReactNode, footer?: React.ReactNode,
}) {
  // visibility gate — all tickers inside pause when the shell is off-screen
  const ref = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setLive(!!e?.isIntersecting), { threshold: 0.08 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const clockNode = <ShellClock />

  return (
    <LiveContext.Provider value={live}>
      <div ref={ref} className="cx" data-live={live}>
        <div className="cx-top">
          <span className="cx-top__dots"><i /><i /><i /></span>
          <span className="cx-top__title">{title}</span>
          {meta ? <span className="cx-top__meta">{meta}</span> : null}
          <span className="cx-top__spacer" />
          <span className="cx-top__status"><i className="cx-okdot" />{status}</span>
          {clockNode}
          <LiveBadge />
        </div>
        <div className="cx-body">{children}</div>
        {footer ? <div className="cx-foot">{footer}</div> : null}
      </div>
    </LiveContext.Provider>
  )
}

function ShellClock() {
  const t = useClock()
  return <span className="cx-top__clock">{t}</span>
}

export function LiveBadge({ label = "LIVE" }: { label?: string }) {
  return <span className="cx-live"><i className="cx-live__dot" />{label}</span>
}

/* ---------------- layout ---------------- */

export function Panel({ title, right, children, className = "", pad = true }: {
  title?: string, right?: React.ReactNode, children: React.ReactNode,
  className?: string, pad?: boolean,
}) {
  return (
    <section className={`cx-panel ${className}`}>
      {title ? (
        <header className="cx-panel__head">
          <h4 className="cx-panel__title">{title}</h4>
          {right ? <div className="cx-panel__right">{right}</div> : null}
        </header>
      ) : null}
      <div className={pad ? "cx-panel__body" : "cx-panel__body cx-panel__body--flush"}>{children}</div>
    </section>
  )
}

/* ---------------- readouts ---------------- */

/** Numeric readout that flashes on change — the "the number just moved" cue. */
export function Stat({ label, value, unit, tone }: {
  label: string, value: string, unit?: string, tone?: "ok" | "warn" | "crit",
}) {
  const [flash, setFlash] = useState(false)
  const prev = useRef(value)
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value
      setFlash(true)
      const id = setTimeout(() => setFlash(false), 360)
      return () => clearTimeout(id)
    }
  }, [value])
  return (
    <div className={`cx-stat ${tone ? `is-${tone}` : ""}`}>
      <span className="cx-stat__label">{label}</span>
      <span className={`cx-stat__value ${flash ? "is-flash" : ""}`}>
        {value}{unit ? <em className="cx-stat__unit">{unit}</em> : null}
      </span>
    </div>
  )
}

export function KV({ k, v, tone }: { k: string, v: React.ReactNode, tone?: string }) {
  return (
    <div className="cx-kv">
      <span className="cx-kv__k">{k}</span>
      <span className={`cx-kv__v ${tone ? `is-${tone}` : ""}`}>{v}</span>
    </div>
  )
}

export const SEVERITY_TONE: Record<string, string> = {
  critical: "crit", high: "crit", warning: "warn", medium: "warn", info: "ok", low: "ok",
}

/** Animated feed — new rows slide in on top (alerts, events, logs). */
export function Feed({ items, render, dense = false }: {
  items: Array<{ id: number }>, render: (item: any) => React.ReactNode, dense?: boolean,
}) {
  return (
    <ul className={`cx-feed ${dense ? "cx-feed--dense" : ""}`}>
      <AnimatePresence initial={false}>
        {items.map(item => (
          <motion.li
            key={item.id}
            layout="position"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
            className="cx-feed__row"
          >
            {render(item)}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

/** Standard alert row for Feed. */
export function AlertRow({ item }: { item: { title: string, detail?: string, severity: string, time: string, tag?: string } }) {
  const tone = SEVERITY_TONE[item.severity] ?? "ok"
  return (
    <div className={`cx-alert is-${tone}`}>
      <i className="cx-alert__pip" />
      <div className="cx-alert__main">
        <span className="cx-alert__title">{item.title}</span>
        {item.detail ? <span className="cx-alert__detail">{item.detail}</span> : null}
      </div>
      <div className="cx-alert__side">
        {item.tag ? <span className="cx-alert__tag">{item.tag}</span> : null}
        <span className="cx-alert__time">{item.time}</span>
      </div>
    </div>
  )
}

/** Status chip: ONLINE / SYNCING / DEGRADED... */
export function Chip({ tone = "ok", children }: { tone?: string, children: React.ReactNode }) {
  return <span className={`cx-chip is-${tone}`}>{children}</span>
}

/** Thin utilization bar with animated width. */
export function UtilBar({ value, tone }: { value: number, tone?: string }) {
  const t = tone ?? (value > 88 ? "crit" : value > 72 ? "warn" : "ok")
  return (
    <span className="cx-util">
      <motion.span
        className={`cx-util__fill is-${t}`}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 24 }}
      />
    </span>
  )
}
