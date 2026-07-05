"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Plane,
  Cpu,
  Wand2,
  Bot,
  Boxes,
  Route,
  Monitor,
  Cloud,
  Code2,
  TrendingUp,
} from "lucide-react";

const PRODUCTS = [
  { name: "Vision AI", icon: Eye },
  { name: "Drone AI", icon: Plane },
  { name: "Edge AI", icon: Cpu },
  { name: "Gen AI", icon: Wand2 },
  { name: "AI Agents", icon: Bot },
  { name: "Digital Twin", icon: Boxes },
  { name: "AI OS", icon: Route },
  { name: "Command Center", icon: Monitor },
  { name: "Unified Business Cloud", icon: Cloud },
  { name: "Digital Engineering", icon: Code2 },
  { name: "Growth Tech", icon: TrendingUp },
];

const BASE_RADIUS = 32; // % of container
const JITTER = 6; // % — deterministic wave, not random, to stay SSR-safe

const round = (n: number) => Math.round(n * 100) / 100;

const NODES = PRODUCTS.map((product, i) => {
  const angle = (i / PRODUCTS.length) * 2 * Math.PI - Math.PI / 2;
  const radius = BASE_RADIUS + JITTER * Math.sin(i * 2.4);
  return {
    ...product,
    x: round(50 + radius * Math.cos(angle)),
    y: round(50 + radius * Math.sin(angle)),
  };
});

export default function ProductsConstellation() {
  return (
    <div className="relative mx-auto mt-16 hidden aspect-square w-full max-w-[720px] lg:block">
      {/* connecting lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {NODES.map((node, i) => (
          <motion.line
            key={node.name}
            x1={50}
            y1={50}
            x2={node.x}
            y2={node.y}
            stroke="rgba(118,168,214,0.5)"
            strokeWidth={0.3}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* center hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
      >
        <div
          className="glow-pulse absolute inset-0 -z-10 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(118,168,214,0.5) 0%, transparent 70%)",
          }}
        />
        SVARA
        <br />
        AI OS
      </motion.div>

      {/* product nodes */}
      {NODES.map((node, i) => (
        <motion.div
          key={node.name}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
          className="absolute flex items-center gap-2 whitespace-nowrap rounded-full border bg-white px-4 py-2 text-xs font-semibold shadow-card"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(220,230,242,0.8)",
            color: "#1D2E6D",
          }}
        >
          <node.icon size={14} style={{ color: "#5D8FBE" }} />
          {node.name}
        </motion.div>
      ))}
    </div>
  );
}
