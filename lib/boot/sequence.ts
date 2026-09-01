// BOOT COLD OPEN — the scripted text sequence that runs before the logo assembles.
//
// The copy and its beats are the brand's, transcribed verbatim from the storyboard; this
// module only owns the timing and the two canvas effects the script calls for (the thin
// connecting lines, and the single pulse). Keeping the schedule as data means the whole
// sequence can be re-timed in one table instead of by editing a tween chain.

export type BeatKind = 'tech' | 'line' | 'frag' | 'web' | 'pulse' | 'final'

export interface Beat {
  /** start time, seconds from the beginning of the cold open */
  at: number
  kind: BeatKind
  text: string
}

/**
 * The storyboard.
 *
 * The beats are no longer one second each: at that pace the longer statements were gone
 * before they could be read, and the web and pulse had no room to register. Each beat now
 * gets time proportional to how much there is to take in — the short technical line is
 * quick, the two long statements and the connecting-web beat hold longest, and the SVARA
 * flash stays deliberately brief because the script calls for it to appear "for a
 * fraction of a second and disappear".
 */
export const BEATS: readonly Beat[] = [
  { at: 0.0, kind: 'tech', text: 'INITIALIZING FUTURE SYSTEMS...' },
  { at: 1.6, kind: 'line', text: 'THE WORLD BUILT MACHINES.' },
  { at: 3.3, kind: 'line', text: 'THEN MACHINES BUILT INTELLIGENCE.' },
  { at: 5.0, kind: 'frag', text: 'BUT INTELLIGENCE WAS NEVER MEANT TO LIVE IN SILOS.' },
  { at: 7.0, kind: 'web', text: 'IT WAS MEANT TO BECOME THE LAYER BENEATH EVERYTHING.' },
  { at: 9.1, kind: 'pulse', text: 'SVARA' },
  { at: 10.4, kind: 'final', text: 'THE INTELLIGENCE IS UNLEASHING.' },
]

/** Index lookups so the canvas effects below stay pinned to their beats if times move. */
export const BEAT_WEB = 4
export const BEAT_PULSE = 5
export const BEAT_FINAL = 6

/** When the cold open hands over to the logo assembly. */
export const COLD_OPEN_S = 11.9

// ── the connecting-line network (beat 5: "everything connects through thin lines") ──

export interface Node { x: number, y: number, vx: number, vy: number }

export function makeNetwork(count: number, w: number, h: number): Node[] {
  const nodes: Node[] = []
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      // barely moving: the network should breathe, not swarm
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
    })
  }
  return nodes
}

/**
 * Draw the network at `alpha`, joining nodes closer than LINK_DIST. Quadratic in the node
 * count, which is why `count` stays small — at 70 nodes this is ~2.4k distance checks a
 * frame, cheap enough to sit alongside everything else on the one shared ticker.
 */
const LINK_DIST = 190

export function drawNetwork(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  w: number,
  h: number,
  alpha: number,
  px: number,
  py: number,
): void {
  if (alpha <= 0.001) return

  for (const n of nodes) {
    n.x += n.vx
    n.y += n.vy
    if (n.x < 0 || n.x > w) n.vx *= -1
    if (n.y < 0 || n.y > h) n.vy *= -1
  }

  // the whole web drifts slightly with the cursor — the "screen reacting" beat
  const ox = px * 26
  const oy = py * 18

  ctx.lineWidth = 1
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]!
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j]!
      const dx = a.x - b.x
      const dy = a.y - b.y
      const d = Math.hypot(dx, dy)
      if (d > LINK_DIST) continue
      // fade each link by its length, so the web has depth instead of a hard cutoff
      ctx.strokeStyle = `rgba(107, 166, 255, ${(1 - d / LINK_DIST) * 0.32 * alpha})`
      ctx.beginPath()
      ctx.moveTo(a.x + ox, a.y + oy)
      ctx.lineTo(b.x + ox, b.y + oy)
      ctx.stroke()
    }
  }

  ctx.fillStyle = `rgba(226, 240, 255, ${0.5 * alpha})`
  for (const n of nodes) ctx.fillRect(n.x + ox - 1, n.y + oy - 1, 2, 2)
}

/** The single pulse (beat 6): one expanding ring, no repeat. */
export function drawPulse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  maxR: number,
): void {
  if (t <= 0 || t >= 1) return
  const r = maxR * t
  const a = (1 - t) * 0.55
  ctx.strokeStyle = `rgba(0, 229, 255, ${a})`
  ctx.lineWidth = 2 * (1 - t) + 0.4
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.stroke()
}
