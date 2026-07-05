"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Ordered foundation-first (Physical) to top (Experience), matching how a
// real stack is built — each layer rises into place above the ones already
// revealed as the user scrolls through the pinned track.
const LAYERS = [
  { name: "Physical Intelligence Layer", description: "CCTV cameras, drones, sensors, machines, ERP systems, and mobile apps — captures raw signals." },
  { name: "Edge Processing Layer", description: "Stream processing, edge AI, and embedded inference for real-time local decisions." },
  { name: "Data Fusion Layer", description: "ETL, normalization, feature engineering, and orchestration — unifies fragmented data." },
  { name: "Intelligence Engine", description: "Computer vision, ML models, NLP, LLMs, AI agents, and prediction engines — SVARA's brain." },
  { name: "Simulation Layer", description: "Digital Twins, scenario simulations, forecasting, and risk analysis." },
  { name: "Orchestration Layer", description: "AI OS, agent orchestration, and workflow automation — converts insights into action." },
  { name: "Experience Layer", description: "Dashboards, Command Center, alerts, reports, mobile apps, and APIs — what customers see." },
];

function LayerRow({
  layer,
  index,
  total,
  scrollYProgress,
}: {
  layer: { name: string; description: string };
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const revealStart = Math.max(0, start - 0.03);
  const revealEnd = start + 0.06;

  const opacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [revealStart, revealEnd], [30, 0]);

  return (
    <motion.div
      className="flex items-center gap-5 rounded-2xl border px-6 py-5 shadow-card"
      style={{
        opacity,
        y,
        background: "rgba(255,255,255,0.85)",
        borderColor: "rgba(220,230,242,0.8)",
      }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
      >
        {index + 1}
      </div>
      <div>
        <h3 className="text-base font-bold" style={{ color: "#1D2E6D" }}>
          {layer.name}
        </h3>
        <p className="mt-1 text-sm" style={{ color: "#5D8FBE" }}>
          {layer.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ArchitectureStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={trackRef} className="relative" style={{ height: `${LAYERS.length * 60}vh` }}>
      <div className="sticky top-0 flex min-h-screen items-center px-8 xl:px-12">
        <div className="mx-auto flex w-full max-w-3xl flex-col-reverse gap-3">
          {LAYERS.map((layer, i) => (
            <LayerRow
              key={layer.name}
              layer={layer}
              index={i}
              total={LAYERS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
