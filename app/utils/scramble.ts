// SCRAMBLE — the homepage's text reveal, extracted so the whole site can use it.
//
// Characters cycle through a glyph set before settling on the real text. The
// timing table is the reference's, unchanged: a 35ms frame, a typewriter cadence
// whose index restarts on C / E / O / P, and a simultaneous mode for hero titles.
//
// IT OPERATES ON TEXT NODES, NOT innerHTML. A heading anywhere on this site may
// wrap parts of itself in spans for a gradient fill, split lines with <br>, or
// hold a link — rewriting the element's markup would destroy all of that. Walking
// to the text nodes and rewriting only `nodeValue` leaves every element, class and
// style exactly where it was, so the effect can be pointed at markup it has never
// seen before.
//
// A character that has not started yet renders as a SPACE rather than being
// hidden. That reserves exactly the glyph's width — but ONLY in a monospaced
// face, which is why this is safe site-wide: styles/global-font.css puts Space
// Mono on every text element. Anywhere that is overridden (`.stride` uses
// Mulish) must be excluded by the caller, or the line will reflow as it types.
//
// One gsap.ticker subscription drives every run on the page and is removed the
// moment the last one finishes, so an idle page pays nothing.
import { gsap } from '~~/lib/gsap'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'
/** Characters that restart the typewriter cadence (the reference's quirk, kept). */
const RESET_CHARS = new Set(['C', 'E', 'O', 'P'])
/** ~30fps. */
const FRAME_MS = 35

export interface ScrambleOptions {
  /** Hero mode: every character scrambles at once instead of typing in order. */
  simultaneous?: boolean
  /** Called once the text has settled. */
  onDone?: () => void
}

interface Item { char: string, start: number, end: number }
interface Run {
  nodes: Text[]
  originals: string[]
  queues: Item[][]
  frame: number
  acc: number
  onDone?: () => void
}

const runs = new Set<Run>()
let subscribed = false

function buildQueue(text: string, simultaneous: boolean): Item[] {
  const queue: Item[] = []
  let typeIndex = 0
  for (const char of text) {
    if (RESET_CHARS.has(char)) typeIndex = 0
    const start = simultaneous ? 0 : typeIndex * 3 + Math.floor(Math.random() * 2)
    const end = simultaneous
      ? start + Math.floor(Math.random() * 20) + 25
      : start + Math.floor(Math.random() * 6) + 8
    queue.push({ char, start, end })
    typeIndex++
  }
  return queue
}

/** Deterministic pseudo-random glyph, so a given frame always renders the same. */
function glyphAt(index: number, frame: number): string {
  return CHARS[(index * 31 + frame * 17) % CHARS.length]!
}

/** Writes one frame across every text node. Returns true once all have settled. */
function render(run: Run): boolean {
  let complete = true
  for (let n = 0; n < run.queues.length; n++) {
    const queue = run.queues[n]!
    const node = run.nodes[n]!
    let out = ''
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i]!
      if (item.char === ' ' || item.char === '\n') { out += item.char; continue }
      if (run.frame < item.start) { out += ' '; complete = false; continue }
      if (run.frame >= item.end) { out += item.char; continue }
      out += glyphAt(i, run.frame)
      complete = false
    }
    node.nodeValue = out
  }
  return complete
}

function settle(run: Run): void {
  run.nodes.forEach((node, i) => { node.nodeValue = run.originals[i]! })
  runs.delete(run)
  run.onDone?.()
  if (!runs.size) unsubscribe()
}

function tick(_time: number, deltaMs: number): void {
  for (const run of [...runs]) {
    run.acc += deltaMs
    if (run.acc < FRAME_MS) continue
    run.acc = 0
    run.frame++
    if (render(run)) settle(run)
  }
}

function subscribe(): void {
  if (subscribed) return
  gsap.ticker.add(tick)
  subscribed = true
}

function unsubscribe(): void {
  if (!subscribed) return
  gsap.ticker.remove(tick)
  subscribed = false
}

/** Every non-blank text node under `el`, in document order. */
export function textNodesIn(el: Element): Text[] {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const out: Text[] = []
  let node = walker.nextNode()
  while (node) {
    if (node.nodeValue && node.nodeValue.trim()) out.push(node as Text)
    node = walker.nextNode()
  }
  return out
}

/**
 * Start the reveal on `el`. Returns a teardown that restores the original text —
 * call it on unmount, or the run keeps writing to detached nodes.
 */
export function attachScramble(el: Element, opts: ScrambleOptions = {}): () => void {
  const nodes = textNodesIn(el)
  if (!nodes.length) return () => {}

  const run: Run = {
    nodes,
    originals: nodes.map(node => node.nodeValue ?? ''),
    queues: nodes.map(node => buildQueue(node.nodeValue ?? '', !!opts.simultaneous)),
    frame: 0,
    acc: 0,
    onDone: opts.onDone,
  }

  runs.add(run)
  render(run)
  subscribe()

  return () => { if (runs.has(run)) settle(run) }
}
