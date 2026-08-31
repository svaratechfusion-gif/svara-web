/**
 * Pure geometry + descriptive statistics for the divisions instrument charts.
 *
 * Kept out of the components so the maths is testable on its own and every
 * chart draws from ONE definition of "how a series becomes a path". All output
 * is in a normalised 0..100 × 0..H viewBox — the SVGs scale with
 * `preserveAspectRatio="none"`, so nothing here needs to know pixel sizes.
 */

export interface SeriesStats {
  min: number
  max: number
  median: number
  average: number
  points: number
}

/** Descriptive stats for the readout strip under a chart. */
export const statsOf = (series: readonly number[]): SeriesStats => {
  if (series.length === 0)
    return { min: 0, max: 0, median: 0, average: 0, points: 0 }
  const sorted = [...series].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return {
    min: sorted[0]!,
    max: sorted[sorted.length - 1]!,
    // even-length series take the mean of the two middle values, not the upper one
    median: sorted.length % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!,
    average: series.reduce((a, b) => a + b, 0) / series.length,
    points: series.length,
  }
}

/** X position (0..100) of index `i` in a series of length `n`. */
export const xAt = (i: number, n: number): number => (n <= 1 ? 0 : (i / (n - 1)) * 100)

/**
 * Y position of `value` inside `height`, scaled to the series' own range with a
 * headroom pad so the peak never touches the top edge and the floor never sits
 * exactly on the axis.
 */
export const yAt = (value: number, series: readonly number[], height: number, pad = 0.14): number => {
  const lo = Math.min(...series)
  const hi = Math.max(...series)
  const span = hi - lo || 1
  const t = (value - lo) / span
  const inner = height * (1 - pad * 2)
  return height - pad * height - t * inner
}

/**
 * Smooth line through the series as a cubic path. Control points are placed on
 * the horizontal midpoint between neighbours, which keeps the curve monotonic
 * between samples — no overshoot dipping below a floor the data never reached.
 */
export const linePath = (series: readonly number[], height: number): string => {
  const n = series.length
  if (n === 0) return ''
  const px = (i: number) => xAt(i, n)
  const py = (i: number) => yAt(series[i]!, series, height)
  let d = `M${px(0).toFixed(2)} ${py(0).toFixed(2)}`
  for (let i = 1; i < n; i++) {
    const cx = (px(i - 1) + px(i)) / 2
    d += ` C${cx.toFixed(2)} ${py(i - 1).toFixed(2)}, ${cx.toFixed(2)} ${py(i).toFixed(2)}, ${px(i).toFixed(2)} ${py(i).toFixed(2)}`
  }
  return d
}

/** The same curve closed down to the baseline, for the area fill. */
export const areaPath = (series: readonly number[], height: number): string => {
  const line = linePath(series, height)
  if (!line) return ''
  return `${line} L100 ${height} L0 ${height} Z`
}

/** Straight polyline points for a compact sparkline (`<polyline points="…">`). */
export const sparkPoints = (series: readonly number[], height: number): string =>
  series
    .map((v, i) => `${xAt(i, series.length).toFixed(1)},${yAt(v, series, height, 0.18).toFixed(1)}`)
    .join(' ')

export interface DonutArc {
  key: string
  value: number
  /** Percentage of the whole, 0..100. */
  share: number
  /** `stroke-dasharray` and `stroke-dashoffset` for a r=1 unit circle scaled to 100. */
  dash: string
  offset: number
}

/**
 * Ring segments as stroke-dash values on one shared circle: each arc is drawn as
 * a dash of its own share with a gap covering the rest, offset by everything
 * before it. One circle element per segment, no arc-flag trigonometry.
 */
export const donutArcs = (
  segments: readonly { k: string, v: number }[],
  circumference = 100,
  gap = 1.2,
): DonutArc[] => {
  const total = segments.reduce((a, s) => a + s.v, 0) || 1
  let cursor = 0
  return segments.map((s) => {
    const share = (s.v / total) * 100
    const len = Math.max(0, (share / 100) * circumference - gap)
    const arc: DonutArc = {
      key: s.k,
      value: s.v,
      share,
      dash: `${len.toFixed(2)} ${(circumference - len).toFixed(2)}`,
      offset: -cursor,
    }
    cursor += (share / 100) * circumference
    return arc
  })
}
