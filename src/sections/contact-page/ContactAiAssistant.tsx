"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "Which SVARA product fits manufacturing?",
  "Can Vision AI detect safety violations?",
  "What is Digital Twin?",
];

export default function ContactAiAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          className="mb-4 w-80 rounded-3xl border bg-white p-6 shadow-floating"
          style={{ borderColor: "rgba(220,230,242,0.8)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold" style={{ color: "#1D2E6D" }}>
              Ask SVARA AI
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X size={16} style={{ color: "#5D8FBE" }} />
            </button>
          </div>
          <p
            className="mt-3 rounded-xl px-3 py-2 text-xs font-semibold"
            style={{ background: "var(--tint)", color: "#5D8FBE" }}
          >
            Coming soon — this assistant isn&apos;t live yet.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <span
                key={prompt}
                className="rounded-xl border px-3 py-2 text-xs"
                style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
              >
                {prompt}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-floating transition-transform duration-300 hover:scale-105"
        style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
        aria-label="Ask SVARA AI"
      >
        <Sparkles size={22} />
      </button>
    </div>
  );
}
