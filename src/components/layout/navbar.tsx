"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/divisions", label: "Divisions" },
  { href: "/products", label: "Products" },
  { href: "/technology", label: "Technology" },
  { href: "/contact", label: "Contact" },
];

// Minimal floating nav — logo top-left, single glass pill top-right. No
// rounded-rectangle bar, no horizontal links, no CTA button. Links live in a
// fullscreen overlay instead.
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-8 py-6">
        <Link
          href="/"
          style={{ fontSize: "22px", fontWeight: 800, color: "#132257", letterSpacing: "-0.03em" }}
        >
          SVARA
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur-xl transition-transform duration-300 hover:scale-105"
          style={{ borderColor: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.65)", color: "#132257" }}
        >
          Menu
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#132257" }} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ background: "rgba(248,251,255,0.98)" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-8 top-6 text-sm font-medium"
              style={{ color: "#132257" }}
            >
              Close
            </button>

            <nav className="flex flex-col items-center gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-[clamp(2rem,5vw,4rem)] font-black leading-none"
                    style={{ color: "#132257", letterSpacing: "-0.03em" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
