"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MASK = "radial-gradient(ellipse 58% 62% at 50% 50%, black 55%, transparent 85%)";

// Core ~2.4x the module size, per the requested ratio (600:250).
const CORE_WIDTH = 600;
const CORE_HEIGHT = Math.round(CORE_WIDTH / 1.5);
const MODULE_WIDTH = 250;
const MODULE_HEIGHT = Math.round(MODULE_WIDTH / 1.5);
const MODULE_GAP = 100;

const MODULES = [
  { key: "vision", src: "vision-ai", alt: "Vision AI", label: "Vision AI" },
  { key: "agents", src: "agent-pod", alt: "AI Agents", label: "AI Agents" },
  { key: "twin", src: "digital-twin", alt: "Digital Twin", label: "Digital Twin" },
];

function connectorPath(fromX: number, fromY: number, toX: number, toY: number) {
  const midY = (fromY + toY) / 2;
  return `M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`;
}

export default function ModulesContent() {
  const stageRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const moduleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  // Real DOM measurement, not an assumed fixed canvas — flex layout resolves
  // actual positions at render time, so the previous fixed-coordinate
  // approach could drift from where things actually land (this was the
  // "lines too tall and disconnected" bug). Measuring after layout guarantees
  // the lines always start/end exactly where the elements really are.
  useEffect(() => {
    function measure() {
      const stage = stageRef.current;
      const core = coreRef.current;
      if (!stage || !core) return;
      const stageRect = stage.getBoundingClientRect();
      const coreRect = core.getBoundingClientRect();
      const fromX = coreRect.left + coreRect.width / 2 - stageRect.left;
      const fromY = coreRect.bottom - stageRect.top;
      const next = moduleRefs.current.map((el) => {
        if (!el) return "";
        const r = el.getBoundingClientRect();
        const toX = r.left + r.width / 2 - stageRect.left;
        const toY = r.top - stageRect.top;
        return connectorPath(fromX, fromY, toX, toY);
      });
      setPaths(next);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="relative z-10 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "#5EC8FF" }}
      >
        The Ecosystem
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-cinematic-heading mt-4"
        style={{ color: "#132257" }}
      >
        The SVARA
        <br />
        Ecosystem
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-cinematic-body mx-auto mt-6 max-w-2xl"
        style={{ color: "#5D8FBE" }}
      >
        Perception. Intelligence. Automation. Orchestration.
      </motion.p>

      {/* Reduced from mt-16 to mt-8 — most of the old whitespace was the
          previous fixed-canvas core sitting 210px down inside its own stage;
          flex-column stacking removes that empty buffer entirely. */}
      <div ref={stageRef} className="relative mx-auto mt-10 hidden lg:block">
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {paths.map((d, i) => (
            <motion.path
              key={MODULES[i].key}
              d={d}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            />
          ))}
        </svg>

        <div className="relative flex flex-col items-center">
          {/* Core — visually dominant, z-index above modules */}
          <motion.div
            ref={coreRef}
            className="relative z-20"
            style={{ width: CORE_WIDTH, height: CORE_HEIGHT }}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            <div
              className="absolute inset-[-15%] -z-10 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(147,197,253,0.4) 0%, transparent 70%)", filter: "blur(50px)" }}
            />
            <Image
              src="/images/hero/ai-core.png"
              alt="SVARA Core"
              fill
              sizes={`${CORE_WIDTH}px`}
              className="object-contain"
              style={{ maskImage: MASK, WebkitMaskImage: MASK }}
              priority
            />
          </motion.div>

          {/* 3 modules — tighter gap, z-index below core */}
          <div className="relative z-10 mt-6 flex justify-center" style={{ gap: MODULE_GAP }}>
            {MODULES.map((m, i) => (
              <motion.div
                key={m.key}
                ref={(el) => {
                  moduleRefs.current[i] = el;
                }}
                className="flex flex-col items-center"
                style={{ width: MODULE_WIDTH }}
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.2, ease: "easeOut" }}
              >
                <div className="relative" style={{ width: MODULE_WIDTH, height: MODULE_HEIGHT }}>
                  <Image
                    src={`/images/hero/${m.src}.png`}
                    alt={m.alt}
                    fill
                    sizes={`${MODULE_WIDTH}px`}
                    className="object-contain"
                    style={{ maskImage: MASK, WebkitMaskImage: MASK }}
                  />
                </div>
                <span className="mt-2 text-sm font-semibold" style={{ color: "#1D2E6D" }}>
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / tablet — simple stacked fallback, since the connector-line
          measurement above is desktop-only. */}
      <div className="mt-16 flex flex-col items-center gap-10 lg:hidden">
        <Image
          src="/images/hero/ai-core.png"
          alt="SVARA Core"
          width={220}
          height={147}
          className="h-auto w-[220px] object-contain"
          style={{ maskImage: MASK, WebkitMaskImage: MASK }}
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {MODULES.map((m) => (
            <div key={m.key} className="flex flex-col items-center">
              <Image
                src={`/images/hero/${m.src}.png`}
                alt={m.alt}
                width={160}
                height={107}
                className="h-auto w-[160px] object-contain"
                style={{ maskImage: MASK, WebkitMaskImage: MASK }}
              />
              <span className="mt-2 text-sm font-semibold" style={{ color: "#1D2E6D" }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
