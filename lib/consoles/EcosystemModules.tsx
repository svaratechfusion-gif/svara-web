/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck - client-only Framer Motion module layer mounted from Vue.
import React, { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

export type EcosystemModule = {
  i: number
  id: string
  name: string
  category: string
  description: string
  asset: string
  x: number
  y: number
  size?: number
  float?: number
  delay?: number
  tilt?: number
}

const spring = { type: "spring", duration: 0.6, bounce: 0 }

function ModuleStyles() {
  return (
    <style>{`
      .eco-modules { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
      .eco-module__slot { position: absolute; width: clamp(106px, 9.7vw, 142px); aspect-ratio: 1.16 / 1; transform: translate(-50%, -50%) scale(var(--module-size, 1)); perspective: 1000px; pointer-events: auto; }
      .eco-module__slot.is-selected { z-index: 8; }
      .eco-module__float { width: 100%; height: 100%; }
      .eco-module { position: relative; display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; padding: 4px 5px 6px; appearance: none; border: 1px solid rgba(255,255,255,.92); border-radius: 24px; background: rgba(255,255,255,.08); box-shadow: 0 2px 7px rgba(16,42,91,.025), 0 16px 34px rgba(16,42,91,.075), 0 0 24px rgba(47,127,230,.055), inset 0 1px 0 rgba(255,255,255,.86); backdrop-filter: blur(24px) saturate(1.14); -webkit-backdrop-filter: blur(24px) saturate(1.14); color: var(--color-ink-strong, #102a5b); cursor: pointer; isolation: isolate; transform-style: preserve-3d; transition: border-color 600ms cubic-bezier(.16,1,.3,1), box-shadow 600ms cubic-bezier(.16,1,.3,1); }
      .eco-module::before { content: ""; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(122deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,.1) 35%, rgba(255,255,255,0) 64%); opacity: .58; pointer-events: none; transition: transform 600ms cubic-bezier(.16,1,.3,1), opacity 600ms cubic-bezier(.16,1,.3,1); }
      .eco-module::after { content: ""; position: absolute; inset: -1px; border: 1px solid rgba(47,127,230,0); border-radius: inherit; box-shadow: 0 0 0 rgba(47,127,230,0); pointer-events: none; transition: border-color 600ms cubic-bezier(.16,1,.3,1), box-shadow 600ms cubic-bezier(.16,1,.3,1); }
      .eco-module__media { position: relative; z-index: 1; display: grid; width: 86%; flex: 1; min-height: 0; padding-bottom: 6px; place-items: center; }
      .eco-module__image { display: block; width: 100%; height: 100%; object-fit: contain; mix-blend-mode: multiply; filter: contrast(1.04) saturate(.95); mask-image: radial-gradient(ellipse 79% 82% at 50% 50%, #000 51%, rgba(0,0,0,.96) 72%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 79% 82% at 50% 50%, #000 51%, rgba(0,0,0,.96) 72%, transparent 100%); transform: translateZ(22px) scale(1.55); transition: transform 600ms cubic-bezier(.16,1,.3,1); }
      .eco-module__meta { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; width: 100%; gap: 2px; padding-top: 5px; }
      .eco-module__category { color: rgba(16,42,91,.54); font-family: var(--font-mono, monospace); font-size: 5.75px; font-weight: 600; letter-spacing: .11em; line-height: 1.1; text-transform: uppercase; }
      .eco-module__name { color: var(--color-ink-strong, #102a5b); font-family: var(--font-mono, monospace); font-size: 8px; font-weight: 700; letter-spacing: .055em; line-height: 1.2; text-align: center; text-transform: uppercase; }
      .eco-module:hover, .eco-module:focus-visible { border-color: rgba(255,255,255,1); box-shadow: 0 3px 8px rgba(16,42,91,.045), 0 20px 42px rgba(16,42,91,.13), 0 0 0 1px rgba(47,127,230,.34), 0 0 28px rgba(47,127,230,.1), inset 0 1px 0 rgba(255,255,255,1); outline: none; }
      .eco-module:hover::before, .eco-module:focus-visible::before { opacity: 1; transform: translate3d(6%, -8%, 0); }
      .eco-module:hover::after, .eco-module:focus-visible::after { border-color: rgba(47,127,230,.38); box-shadow: 0 0 26px rgba(47,127,230,.14); }
      .eco-module:hover .eco-module__image, .eco-module:focus-visible .eco-module__image { transform: translateZ(24px) scale(1.6); }
      .eco-module__slot.is-selected .eco-module { border-color: rgba(255,255,255,1); box-shadow: 0 3px 8px rgba(16,42,91,.05), 0 22px 46px rgba(16,42,91,.15), 0 0 0 1px rgba(47,127,230,.52), 0 0 30px rgba(47,127,230,.13), inset 0 1px 0 rgba(255,255,255,1); }
      .eco-module__slot.is-selected .eco-module::after { border-color: rgba(47,127,230,.55); box-shadow: 0 0 28px rgba(47,127,230,.18); }
      .eco-module__slot.is-selected .eco-module__image { transform: translateZ(24px) scale(1.575); }
      @media (max-width: 860px) { .eco-module__slot { width: clamp(56px, 20vw, 78px); border-radius: 17px; } .eco-module { border-radius: 17px; padding: 3px 4px 4px; } .eco-module__media { width: 90%; padding-bottom: 4px; } .eco-module__image { transform: translateZ(14px) scale(1.36); } .eco-module__meta { gap: 1px; padding-top: 3px; } .eco-module__category { font-size: 4.2px; letter-spacing: .07em; } .eco-module__name { font-size: clamp(5.2px, 1.65vw, 6.5px); letter-spacing: .03em; } }
      @media (prefers-reduced-motion: reduce) { .eco-module, .eco-module::before, .eco-module::after, .eco-module__image { transition: none; } }
    `}</style>
  )
}

export default function EcosystemModules({
  items,
  selectedId,
  onHover,
  onSelect,
}: {
  items: EcosystemModule[]
  selectedId: number | null
  onHover: (id: number | null) => void
  onSelect: (id: number | null) => void
}) {
  const reducedMotion = useReducedMotion()
  const [localSelectedId, setLocalSelectedId] = useState(selectedId)

  useEffect(() => {
    setLocalSelectedId(selectedId)
  }, [selectedId])

  return (
    <div className="eco-modules" aria-label="SVARA platform modules">
      <ModuleStyles />
      {items.map(item => {
        const selected = localSelectedId === item.i
        const dimmed = localSelectedId !== null && !selected
        return (
          <div
            key={item.id}
            className={`eco-module__slot ${selected ? "is-selected" : ""}`}
            style={{ left: `${item.x}%`, top: `${item.y}%`, "--module-size": item.size ?? 1 }}
          >
            <motion.div
              className="eco-module__float"
              animate={reducedMotion ? { y: 0 } : { y: [0, -(item.float ?? 6), 0] }}
              transition={{ duration: 7 + (item.delay ?? 0), delay: item.delay ?? 0, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.button
                type="button"
                className="eco-module"
                aria-label={`${item.name}: ${item.description}`}
                aria-pressed={selected}
                animate={{ opacity: dimmed ? 0.7 : 1, scale: selected ? 1.08 : 1, z: selected ? 18 : 12 }}
                whileHover={reducedMotion ? undefined : { y: -7, rotateX: 5, rotateY: item.tilt ?? 4, scale: selected ? 1.11 : 1.035, z: 22 }}
                whileFocus={reducedMotion ? undefined : { y: -5, scale: selected ? 1.1 : 1.025, z: 20 }}
                whileTap={{ scale: selected ? 1.06 : 0.985 }}
                transition={spring}
                onMouseEnter={() => onHover(item.i)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(item.i)}
                onBlur={() => onHover(null)}
                onClick={() => {
                  const next = selected ? null : item.i
                  setLocalSelectedId(next)
                  onSelect(next)
                }}
              >
                <span className="eco-module__media">
                  <img className="eco-module__image" src={item.asset} alt="" width="1254" height="1254" loading="lazy" decoding="async" />
                </span>
                <span className="eco-module__meta">
                  <span className="eco-module__category">{item.category}</span>
                  <span className="eco-module__name">{item.name}</span>
                </span>
              </motion.button>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
