"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";

const WIDGETS = [
  {
    img: "cctv-connection-lost",
    label: "CCTV",
    width: 320,
    style: { top: 80, left: 240 },
    duration: 4.5,
    delay: 0,
  },
  {
    img: "erp-sync-failed",
    label: "ERP",
    width: 320,
    style: { top: 80, right: 240 },
    duration: 5.2,
    delay: 0.3,
  },
  {
    img: "iot-signal-lost",
    label: "IoT",
    width: 280,
    style: { top: 300, left: 120 },
    duration: 4.8,
    delay: 0.6,
  },
  {
    img: "drone-link-lost",
    label: "Drone",
    width: 360,
    style: { top: 240, left: "50%", transform: "translateX(-50%)" },
    duration: 5.5,
    delay: 0.9,
  },
  {
    img: "crm-data-mismatch",
    label: "CRM",
    width: 280,
    style: { top: 300, right: 120 },
    duration: 4.6,
    delay: 1.2,
  },
  {
    img: "data-silo",
    label: "Data Silo",
    width: 260,
    style: { bottom: 80, left: 220 },
    duration: 5,
    delay: 1.5,
  },
  {
    img: "hr-update-failed",
    label: "HR",
    width: 250,
    style: { bottom: 60, left: "50%", transform: "translateX(-50%)" },
    duration: 4.4,
    delay: 1.8,
  },
  {
    img: "supply-chain-out-of-sync",
    label: "Supply Chain",
    width: 280,
    style: { bottom: 80, right: 220 },
    duration: 5.3,
    delay: 2.1,
  },
];

function Widget({ img, label, width, style, duration, delay }: (typeof WIDGETS)[number]) {
  return (
    <div className="absolute" style={{ ...(style as CSSProperties), width }}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <Image
          src={`/images/problem/${img}.png`}
          alt={label}
          width={width}
          height={Math.round((width * 1024) / 1536)}
          className="h-auto w-full object-contain"
        />
      </motion.div>
    </div>
  );
}

export default function ProblemWidgets() {
  return (
    <>
      {/* Desktop — fixed bounded floating composition */}
      <div
        className="relative mx-auto mt-10 hidden overflow-hidden lg:block"
        style={{ height: 900, maxWidth: 1600 }}
      >
        {WIDGETS.map((widget) => (
          <Widget key={widget.img} {...widget} />
        ))}

        <div
          className="absolute text-center"
          style={{ top: 510, left: "50%", transform: "translateX(-50%)" }}
        >
          <p className="text-lg font-extrabold uppercase tracking-wide" style={{ color: "#1D2E6D" }}>
            Fragmented Systems
          </p>
          <p className="mt-1 text-sm font-medium" style={{ color: "#5D8FBE" }}>
            Disconnected &bull; Delayed &bull; Inefficient
          </p>
        </div>
      </div>

      {/* Mobile / tablet — simple 2-column grid */}
      <div className="mt-10 grid grid-cols-2 gap-8 lg:hidden">
        {WIDGETS.map((widget) => (
          <Image
            key={widget.img}
            src={`/images/problem/${widget.img}.png`}
            alt={widget.label}
            width={280}
            height={187}
            className="h-auto w-full object-contain"
          />
        ))}
      </div>
    </>
  );
}
