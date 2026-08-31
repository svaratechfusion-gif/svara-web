/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
// @ts-nocheck — React navigator runtime; excluded from vue-tsc.
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export type ProductNavigatorItem = {
  id: string
  index: number
  label: string
}

export default function ProductNavigator({ items }: { items: ProductNavigatorItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "")

  useEffect(() => {
    let frame = 0

    const updateActive = () => {
      const focus = Math.min(window.innerHeight * 0.42, 420)
      const sections = items
        .map(item => ({ item, element: document.getElementById(item.id) }))
        .filter((entry): entry is { item: ProductNavigatorItem, element: HTMLElement } => !!entry.element)

      const containing = sections.find(({ element }) => {
        const rect = element.getBoundingClientRect()
        return rect.top <= focus && rect.bottom > focus
      })

      const nearest = containing ?? sections.reduce<typeof sections[number] | null>((best, entry) => {
        if (!best) return entry
        return Math.abs(entry.element.getBoundingClientRect().top - focus) < Math.abs(best.element.getBoundingClientRect().top - focus)
          ? entry
          : best
      }, null)

      if (nearest) setActiveId(nearest.item.id)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActive)
    }

    updateActive()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [items])

  const navigate = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    setActiveId(id)
    target.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `#${id}`)
  }

  return (
    <nav className="pn" aria-label="Product walkthrough">
      <span className="pn__eyebrow">PRODUCTS</span>
      <div className="pn__items">
        {items.map(item => {
          const active = item.id === activeId
          return (
            <motion.button
              key={item.id}
              type="button"
              className={`pn__item ${active ? "is-active" : ""}`}
              onClick={() => navigate(item.id)}
              aria-current={active ? "step" : undefined}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 460, damping: 32 }}
            >
              {active ? (
                <motion.span
                  className="pn__active"
                  layoutId="product-navigator-active"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              ) : null}
              <span className="pn__index">{String(item.index + 1).padStart(2, "0")}</span>
              <span className="pn__label">{item.label}</span>
              {active ? <motion.i className="pn__pulse" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} /> : null}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
