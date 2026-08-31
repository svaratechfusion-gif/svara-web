// @ts-nocheck — React console runtime; excluded from vue-tsc (see
// nuxt.config.ts). Live-data hooks shared by every SVARA product console.
// All timers pause when the console leaves the viewport or the tab is
// hidden, so ten consoles on one page cost nothing while off-screen.
import { useEffect, useRef, useState, createContext, useContext } from "react"
import { rng, clamp, nextId, stamp } from "./seed"

/** Set by ConsoleShell: false while the console is off-screen. */
export const LiveContext = createContext(true)
export const useConsoleLive = () => useContext(LiveContext)

/** Interval that only fires while the console is visible + tab focused. */
export function useTicker(fn: (tick: number) => void, ms: number) {
  const live = useConsoleLive()
  const fnRef = useRef(fn)
  fnRef.current = fn
  useEffect(() => {
    if (!live) return
    let tick = 0
    const id = setInterval(() => {
      if (document.hidden) return
      fnRef.current(tick++)
    }, ms)
    return () => clearInterval(id)
  }, [live, ms])
}

/**
 * A value performing a seeded random walk inside [min, max].
 * Reads as live telemetry: drifts, never teleports.
 */
export function useWalk(seed: string, opts: {
  min: number, max: number, start?: number, step?: number, ms?: number,
}): number {
  const { min, max, start, step = (max - min) * 0.06, ms = 1200 } = opts
  const r = useRef(rng(seed))
  const [v, setV] = useState(start ?? min + (max - min) * 0.62)
  useTicker(() => {
    setV(prev => clamp(prev + (r.current() - 0.5) * 2 * step, min, max))
  }, ms)
  return v
}

/** Rolling series for stream charts — shifts left, appends a walked point. */
export function useStream(seed: string, opts: {
  points?: number, min: number, max: number, step?: number, ms?: number,
}): number[] {
  const { points = 48, min, max, step = (max - min) * 0.1, ms = 900 } = opts
  const r = useRef(rng(seed))
  const [data, setData] = useState<number[]>(() => {
    const rr = rng(seed + ":init")
    let v = min + (max - min) * 0.5
    return Array.from({ length: points }, () => {
      v = clamp(v + (rr() - 0.5) * 2 * step, min, max)
      return v
    })
  })
  useTicker(() => {
    setData(prev => {
      const last = prev[prev.length - 1] ?? (min + max) / 2
      const nv = clamp(last + (r.current() - 0.5) * 2 * step, min, max)
      return [...prev.slice(1), nv]
    })
  }, ms)
  return data
}

export interface FeedItem { id: number, time: string, [k: string]: unknown }

/**
 * Event feed — newest first, capped. `make` builds the next event; return
 * null to skip a beat (keeps cadence irregular, like real operations).
 */
export function useFeed<T extends object>(opts: {
  make: (tick: number) => T | null, ms?: number, cap?: number, prime?: T[],
}): Array<T & FeedItem> {
  const { make, ms = 2600, cap = 7, prime = [] } = opts
  const makeRef = useRef(make)
  makeRef.current = make
  const [items, setItems] = useState<Array<T & FeedItem>>(() =>
    prime.map((p, i) => ({ ...p, id: nextId(), time: stamp(new Date(Date.now() - (i + 1) * 47000)) })))
  useTicker(tick => {
    const next = makeRef.current(tick)
    if (!next) return
    setItems(prev => [{ ...next, id: nextId(), time: stamp() }, ...prev].slice(0, cap))
  }, ms)
  return items
}

/** Index that advances 0..n-1 on a timer — camera cycling, rotating focus. */
export function useCycle(n: number, ms: number): [number, (i: number) => void] {
  const [i, setI] = useState(0)
  const holdUntil = useRef(0)
  useTicker(() => {
    if (Date.now() < holdUntil.current) return
    setI(prev => (prev + 1) % n)
  }, ms)
  // manual select pauses auto-advance briefly so a click is respected
  const select = (idx: number) => { holdUntil.current = Date.now() + ms * 2.5; setI(idx % n) }
  return [i, select]
}

/** Live wall clock, "14:03:22". */
export function useClock(): string {
  const [t, setT] = useState("--:--:--")
  const live = useConsoleLive()
  useEffect(() => {
    if (!live) return
    setT(stamp())
    const id = setInterval(() => setT(stamp()), 1000)
    return () => clearInterval(id)
  }, [live])
  return t
}

export const fmt = {
  int: (v: number) => Math.round(v).toLocaleString("en-US"),
  fix: (v: number, d = 1) => v.toFixed(d),
  pct: (v: number, d = 1) => `${v.toFixed(d)}%`,
  ms: (v: number) => `${v.toFixed(0)}ms`,
}
