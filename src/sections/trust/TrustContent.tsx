"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TOP_ROW = [
  { src: "/images/stats/ai-native.png", alt: "AI Native", width: 320, delay: 0 },
  { src: "/images/stats/dpiit-card.png", alt: "DPIIT Recognized", width: 280, delay: 0.4 },
  { src: "/images/stats/women-led.png", alt: "Women-led", width: 280, delay: 0.8 },
];

const BOTTOM_ROW = [
  { src: "/images/stats/enterprise-grade.png", alt: "Enterprise Grade", width: 280, delay: 1.2 },
  { src: "/images/stats/scalable.png", alt: "Scalable", width: 280, delay: 1.6 },
];

function Badge({ src, alt, width, delay }: { src: string; alt: string; width: number; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={Math.round((width * 1024) / 1536)}
        className="object-contain"
      />
    </motion.div>
  );
}

export default function TrustContent() {
  return (
    <div className="relative z-10 text-center">
      <h2
        className="text-3xl font-extrabold lg:text-4xl"
        style={{ color: "#1D2E6D" }}
      >
        Trusted by Innovation, Built for Enterprise
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "#5D8FBE" }}>
        Enterprise-grade AI infrastructure recognized by leading institutions.
      </p>

      <div className="mb-12 mt-16 flex flex-wrap justify-center gap-10">
        {TOP_ROW.map((badge) => (
          <Badge key={badge.alt} {...badge} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-14">
        {BOTTOM_ROW.map((badge) => (
          <Badge key={badge.alt} {...badge} />
        ))}
      </div>
    </div>
  );
}
