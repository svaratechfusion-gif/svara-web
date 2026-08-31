/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck - client-only Framer Motion surface, mounted from Vue.
import React, { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

export type ProblemProduct = {
  id: string
  name: string
  descriptor: string
  x: number
  y: number
  drift: number
  delay: number
  tilt: number
}

const products: ProblemProduct[] = [
  { id: "erp", name: "ERP", descriptor: "Resource planning & finance core", x: 50, y: 16, drift: 3.2, delay: 0.1, tilt: -4 },
  { id: "crm", name: "CRM", descriptor: "Customer relationships & sales", x: 72, y: 28, drift: 3.8, delay: 0.8, tilt: 4 },
  { id: "hrm", name: "HRM", descriptor: "People, payroll & workforce", x: 83.5, y: 44, drift: 3.4, delay: 1.4, tilt: 5 },
  { id: "plc", name: "PLC", descriptor: "Programmable machine control", x: 79.5, y: 67, drift: 3.8, delay: 0.4, tilt: -4 },
  { id: "sensors", name: "Sensors", descriptor: "Real-time IoT telemetry", x: 61.5, y: 82, drift: 3.2, delay: 1.1, tilt: 3 },
  { id: "conveyor", name: "Conveyor", descriptor: "Automated material handling", x: 38.5, y: 82, drift: 3.8, delay: 1.7, tilt: -3 },
  { id: "cctv", name: "CCTV", descriptor: "Vision surveillance feeds", x: 20.5, y: 67, drift: 3.4, delay: 0.6, tilt: 4 },
  { id: "drone", name: "Drone", descriptor: "Autonomous aerial inspection", x: 16.5, y: 44, drift: 3.8, delay: 1.3, tilt: -5 },
  { id: "edge-ai", name: "Edge AI", descriptor: "On-device inference at the edge", x: 28, y: 28, drift: 3.2, delay: 1.9, tilt: 3 },
]

const particles = [
  [7, 20, 0.8], [13, 12, 1.1], [31, 7, 0.7], [63, 7, 1], [87, 11, 0.8],
  [94, 28, 1], [95, 60, 0.7], [91, 90, 1.1], [73, 97, 0.7], [50, 98, 1],
  [25, 96, 0.8], [6, 86, 1], [4, 65, 0.7], [3, 36, 1], [39, 26, 0.7],
  [66, 27, 1], [70, 66, 0.8], [35, 67, 0.7], [50, 34, 1.1], [51, 73, 0.7],
]

const spring = { type: "spring", duration: 0.6, bounce: 0 }

function connectionPath(product: ProblemProduct) {
  const midpointX = (product.x + 50) / 2
  const midpointY = (product.y + 50) / 2
  const offsetX = -(50 - product.y) * 0.12
  const offsetY = (50 - product.x) * 0.12
  return `M ${product.x} ${product.y} Q ${midpointX + offsetX} ${midpointY + offsetY} 50 50`
}

function OrbitStyles() {
  return (
    <style>{`
      .po { width: 100%; font-family: var(--font-sans, Inter, sans-serif); }
      .po__field { position: relative; width: 100%; min-height: 540px; aspect-ratio: 1 / 1; isolation: isolate; overflow: visible; }
      .po__grid { position: absolute; inset: 2% 1%; border-radius: 44px; opacity: .54; background-image: linear-gradient(rgba(16,42,91,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,42,91,.07) 1px, transparent 1px); background-size: 34px 34px; mask-image: radial-gradient(circle at 50% 50%, #000 7%, rgba(0,0,0,.78) 59%, transparent 100%); -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 7%, rgba(0,0,0,.78) 59%, transparent 100%); }
      .po__wash { position: absolute; inset: 10%; border-radius: 50%; background: radial-gradient(circle, rgba(47,127,230,.16) 0%, rgba(47,127,230,.055) 33%, rgba(255,255,255,0) 70%); filter: blur(5px); pointer-events: none; }
      .po__particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
      .po__particle { position: absolute; display: block; width: var(--size); height: var(--size); border-radius: 50%; background: rgba(47,127,230,.46); box-shadow: 0 0 10px rgba(47,127,230,.13); }
      .po__beam { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
      .po__beam-path { fill: none; stroke: rgba(47,127,230,.76); stroke-width: .42; stroke-linecap: round; vector-effect: non-scaling-stroke; filter: url(#po-beam-glow); }
      .po__core { position: absolute; left: 50%; top: 50%; width: 148px; height: 148px; transform: translate(-50%, -50%); z-index: 3; pointer-events: none; }
      .po__core-orbit { position: absolute; inset: 0; border: 1px dashed rgba(47,127,230,.36); border-radius: 50%; }
      .po__core-orbit--inner { inset: 12px; border-style: solid; border-color: rgba(47,127,230,.18); }
      .po__core-shell { position: absolute; inset: 24px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.86); border-radius: 50%; background: rgba(255,255,255,.32); box-shadow: 0 16px 42px rgba(16,42,91,.12), inset 0 1px 0 rgba(255,255,255,.78); backdrop-filter: blur(18px) saturate(1.15); -webkit-backdrop-filter: blur(18px) saturate(1.15); }
      .po__core-lens { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 82px; height: 82px; border-radius: 50%; background: radial-gradient(circle at 34% 28%, rgba(255,255,255,.38), rgba(255,255,255,0) 36%), radial-gradient(circle at 50% 55%, #244d8d 0%, #102a5b 73%); box-shadow: 0 10px 22px rgba(16,42,91,.24), inset 0 1px 1px rgba(255,255,255,.18); color: #fff; }
      .po__core-mark { font-family: var(--font-mono, monospace); font-size: 10px; font-weight: 700; letter-spacing: .17em; }
      .po__core-caption { margin-top: 5px; font-family: var(--font-mono, monospace); font-size: 6px; font-weight: 600; letter-spacing: .12em; opacity: .76; }
      .po__slot { position: absolute; width: clamp(102px, 9.9vw, 136px); aspect-ratio: 1.16 / 1; transform: translate(-50%, -50%); perspective: 1000px; z-index: 4; }
      .po__slot.is-active { z-index: 6; }
      .po__drift { width: 100%; height: 100%; }
      .po__module { position: relative; display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; padding: 4px 5px 6px; appearance: none; border: 1px solid rgba(255,255,255,.92); border-radius: 26px; background: rgba(255,255,255,.08); box-shadow: 0 2px 7px rgba(16,42,91,.025), 0 16px 34px rgba(16,42,91,.075), 0 0 24px rgba(47,127,230,.055), inset 0 1px 0 rgba(255,255,255,.86); backdrop-filter: blur(24px) saturate(1.14); -webkit-backdrop-filter: blur(24px) saturate(1.14); color: var(--color-ink-strong, #102a5b); cursor: pointer; isolation: isolate; transform-style: preserve-3d; transition: border-color 600ms cubic-bezier(.16,1,.3,1), box-shadow 600ms cubic-bezier(.16,1,.3,1); }
      .po__module::before { content: ""; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(122deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,.1) 35%, rgba(255,255,255,0) 64%); opacity: .58; pointer-events: none; transition: transform 600ms cubic-bezier(.16,1,.3,1), opacity 600ms cubic-bezier(.16,1,.3,1); }
      .po__module::after { content: ""; position: absolute; inset: -1px; border-radius: inherit; border: 1px solid rgba(47,127,230,0); pointer-events: none; transition: border-color 600ms cubic-bezier(.16,1,.3,1), box-shadow 600ms cubic-bezier(.16,1,.3,1); }
      .po__media { position: relative; z-index: 1; display: grid; flex: 1; width: 86%; min-height: 0; padding-bottom: 6px; place-items: center; }
      .po__image { display: block; width: 100%; height: 100%; object-fit: contain; mix-blend-mode: multiply; filter: contrast(1.04) saturate(.94); mask-image: radial-gradient(ellipse 78% 82% at 50% 50%, #000 52%, rgba(0,0,0,.96) 72%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 78% 82% at 50% 50%, #000 52%, rgba(0,0,0,.96) 72%, transparent 100%); transform: translateZ(22px) scale(1.56); transition: transform 600ms cubic-bezier(.16,1,.3,1); }
      .po__label { position: relative; z-index: 2; flex: 0 0 auto; margin-top: 7px; padding-bottom: 1px; font-family: var(--font-mono, monospace); font-size: 8px; font-weight: 700; letter-spacing: .08em; line-height: 1.2; text-transform: uppercase; }
      .po__module:hover, .po__module:focus-visible { border-color: rgba(255,255,255,1); box-shadow: 0 3px 8px rgba(16,42,91,.045), 0 20px 42px rgba(16,42,91,.13), 0 0 0 1px rgba(47,127,230,.3), 0 0 28px rgba(47,127,230,.1), inset 0 1px 0 rgba(255,255,255,1); outline: none; }
      .po__module:hover::before, .po__module:focus-visible::before { opacity: 1; transform: translate3d(6%, -8%, 0); }
      .po__module:hover::after, .po__module:focus-visible::after { border-color: rgba(47,127,230,.34); box-shadow: 0 0 22px rgba(47,127,230,.11); }
      .po__module:hover .po__image, .po__module:focus-visible .po__image { transform: translateZ(24px) scale(1.61); }
      .po__slot.is-active .po__module { border-color: rgba(255,255,255,1); box-shadow: 0 3px 8px rgba(16,42,91,.05), 0 22px 46px rgba(16,42,91,.15), 0 0 0 1px rgba(47,127,230,.46), 0 0 30px rgba(47,127,230,.13), inset 0 1px 0 rgba(255,255,255,1); }
      .po__slot.is-active .po__module::after { border-color: rgba(47,127,230,.5); box-shadow: 0 0 26px rgba(47,127,230,.16); }
      .po__slot.is-active .po__image { transform: translateZ(24px) scale(1.585); }
      @media (max-width: 1150px) { .po__field { min-height: 490px; } .po__slot { width: clamp(94px, 11vw, 122px); } .po__core { width: 134px; height: 134px; } .po__core-shell { inset: 22px; } .po__core-lens { width: 74px; height: 74px; } }
      @media (max-width: 720px) { .po__field { min-height: 0; } .po__grid { background-size: 25px 25px; border-radius: 28px; } .po__slot { width: clamp(58px, 19.9vw, 78px); border-radius: 18px; } .po__module { border-radius: 18px; padding: 3px 4px 4px; } .po__media { width: 90%; padding-bottom: 4px; } .po__image { transform: translateZ(14px) scale(1.38); } .po__label { margin-top: 4px; padding-bottom: 0; font-size: clamp(5.4px, 1.6vw, 6.8px); letter-spacing: .06em; } .po__core { width: 104px; height: 104px; } .po__core-shell { inset: 17px; } .po__core-lens { width: 60px; height: 60px; } .po__core-mark { font-size: 8px; } .po__core-caption { font-size: 4.8px; margin-top: 3px; } }
      @media (prefers-reduced-motion: reduce) { .po__module, .po__module::before, .po__module::after, .po__image { transition: none; } }
    `}</style>
  )
}

export default function ProblemOrbit({ activeId, onSelect }: { activeId: string | null, onSelect: (id: string | null) => void }) {
  const reducedMotion = useReducedMotion()
  const [selectedId, setSelectedId] = useState(activeId)
  const active = products.find(product => product.id === selectedId) ?? null

  useEffect(() => {
    setSelectedId(activeId)
  }, [activeId])

  return (
    <motion.div
      className="po"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      aria-label="SVARA enterprise systems connected to the Intelligence Core"
    >
      <OrbitStyles />
      <div className="po__field">
        <div className="po__grid" aria-hidden="true" />
        <div className="po__wash" aria-hidden="true" />
        <div className="po__particles" aria-hidden="true">
          {particles.map(([x, y, size], index) => (
            <motion.i
              key={`${x}-${y}`}
              className="po__particle"
              style={{ left: `${x}%`, top: `${y}%`, "--size": `${size}px` }}
              animate={reducedMotion ? { opacity: 0.42 } : { opacity: [0.2, 0.62, 0.2], scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 4.6 + (index % 4), delay: index * 0.12, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <svg className="po__beam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <filter id="po-beam-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="0" stdDeviation="0.6" floodColor="#2f7fe6" floodOpacity="0.45" />
            </filter>
          </defs>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.g key={active.id}>
                <motion.path
                  className="po__beam-path"
                  d={connectionPath(active)}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={spring}
                />
                {!reducedMotion ? (
                  <motion.circle
                    r="0.72"
                    fill="#2f7fe6"
                    initial={{ cx: active.x, cy: active.y, opacity: 0 }}
                    animate={{ cx: [active.x, (active.x + 50) / 2, 50], cy: [active.y, (active.y + 50) / 2, 50], opacity: [0, 0.9, 0] }}
                    transition={{ duration: 1.55, delay: 0.6, repeat: Infinity, repeatDelay: 0.45, ease: "easeInOut" }}
                  />
                ) : null}
              </motion.g>
            ) : null}
          </AnimatePresence>
        </svg>

        <div className="po__core" aria-hidden="true">
          <motion.div className="po__core-orbit" animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} />
          <motion.div className="po__core-orbit po__core-orbit--inner" animate={reducedMotion ? { rotate: 0 } : { rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
          <motion.div className="po__core-shell" animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.025, 1] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
            <div className="po__core-lens">
              <span className="po__core-mark">SVARA</span>
              <span className="po__core-caption">INTELLIGENCE CORE</span>
            </div>
          </motion.div>
        </div>

        {products.map(product => {
          const selected = selectedId === product.id
          const dimmed = !!selectedId && !selected
          return (
            <div key={product.id} className={`po__slot ${selected ? "is-active" : ""} ${dimmed ? "is-dimmed" : ""}`} style={{ left: `${product.x}%`, top: `${product.y}%` }}>
              <motion.div
                className="po__drift"
                animate={reducedMotion ? { y: 0 } : { y: [0, -product.drift, 0] }}
                transition={{ duration: 6.2 + product.delay, delay: product.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.button
                  type="button"
                  className="po__module problem-orbit__module"
                  onClick={() => {
                    const nextId = selected ? null : product.id
                    setSelectedId(nextId)
                    onSelect(nextId)
                  }}
                  aria-pressed={selected}
                  aria-label={`${product.name}: ${product.descriptor}`}
                  animate={{ opacity: dimmed ? 0.58 : 1, scale: selected ? 1.12 : 1, z: selected ? 18 : 12 }}
                  whileHover={reducedMotion ? undefined : { y: -7, rotateX: 5, rotateY: product.tilt, scale: selected ? 1.145 : 1.03, z: 22 }}
                  whileFocus={reducedMotion ? undefined : { y: -5, scale: selected ? 1.14 : 1.025, z: 20 }}
                  whileTap={{ scale: selected ? 1.09 : 0.985 }}
                  transition={spring}
                >
                  <span className="po__media">
                    <img className="po__image" src={`/images/products/${product.id}.png`} alt="" width="1254" height="1254" loading="lazy" decoding="async" />
                  </span>
                  <span className="po__label">{product.name}</span>
                </motion.button>
              </motion.div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
