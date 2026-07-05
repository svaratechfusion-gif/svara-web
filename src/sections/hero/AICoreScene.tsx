"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Real PNG has an opaque light-gray gradient baked in — fading it to
// transparent lets it blend into the atmospheric background instead of
// showing a rectangular edge, same technique used for the dark-theme
// version of this asset, still needed since the source art didn't change.
const CORE_MASK = "radial-gradient(ellipse 58% 62% at 50% 50%, black 55%, transparent 85%)";

export default function AICoreScene() {
  return (
    <div className="absolute inset-0 z-10 overflow-visible">
      {/* Soft glow halo behind the core — shifted from far-right to
          center-right (62% from left) per the revised direction. */}
      <motion.div
        className="absolute left-[62%] top-1/2 h-[55vw] w-[55vw] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(147,197,253,0.4) 0%, rgba(219,234,254,0.2) 45%, transparent 70%)", filter: "blur(70px)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Slow rotating rings */}
      <motion.svg
        className="absolute left-[62%] top-1/2 h-[46vw] w-[46vw] max-h-[760px] max-w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-50"
        viewBox="0 0 520 520"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="260" cy="260" r="230" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 14" />
      </motion.svg>

      {/* Huge core — 45vw, center-right, still allowed to bleed toward the edge */}
      <motion.div
        className="absolute left-[62%] top-1/2 h-[48vw] w-[48vw] max-h-[820px] max-w-[820px] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.85, filter: "blur(24px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/hero/ai-core.png"
            alt="AI Core"
            fill
            sizes="50vw"
            className="object-contain"
            style={{ maskImage: CORE_MASK, WebkitMaskImage: CORE_MASK }}
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
