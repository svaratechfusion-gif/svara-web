"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Replaces traditional CTA buttons with a single floating glass "object" —
// not a button, an interaction element, per the capsule-style direction.
export default function FloatingInteraction() {
  return (
    <motion.a
      href="/ecosystem"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9 }}
      whileHover={{ scale: 1.04 }}
      className="absolute bottom-[6%] left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border px-7 py-4 backdrop-blur-xl transition-shadow duration-300"
      style={{
        borderColor: "rgba(255,255,255,0.6)",
        background: "rgba(255,255,255,0.7)",
        boxShadow: "0 20px 60px rgba(29,46,109,0.12)",
      }}
    >
      <span className="text-sm font-semibold" style={{ color: "#132257" }}>
        Enter SVARA
      </span>
      <ArrowRight size={16} style={{ color: "#132257" }} />
    </motion.a>
  );
}
