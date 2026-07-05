"use client";

import { useState } from "react";
import { Brain, Building2, Package, FileText, BookOpen } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const CATEGORIES = [
  {
    name: "AI Research",
    icon: Brain,
    topics: ["LLMs", "AI Agents", "Computer Vision", "Reinforcement Learning", "Edge Intelligence"],
    description: "Deep technical analysis of AI systems and emerging research.",
  },
  {
    name: "Industry Insights",
    icon: Building2,
    topics: ["Manufacturing AI", "Smart Cities", "Logistics Intelligence", "AgriTech"],
    description: "Industry-specific transformation opportunities.",
  },
  {
    name: "Product Updates",
    icon: Package,
    topics: ["New releases", "Features", "Product roadmaps", "Architecture updates"],
    description: "Latest SVARA product developments.",
  },
  {
    name: "Case Studies",
    icon: FileText,
    topics: ["Deployment stories", "Simulated ROI", "Use cases", "Success frameworks"],
    description: "Real-world transformation stories.",
  },
  {
    name: "Vision Papers",
    icon: BookOpen,
    topics: ["Future predictions", "Whitepapers", "Strategic frameworks"],
    description: "Long-form thought leadership.",
  },
];

export default function InsightsCategories() {
  const [active, setActive] = useState(0);
  const category = CATEGORIES[active];

  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Explore Knowledge Domains
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200"
              style={{
                borderColor: i === active ? "#1D2E6D" : "rgba(220,230,242,0.8)",
                color: i === active ? "white" : "#1D2E6D",
                background: i === active ? "#1D2E6D" : "white",
              }}
            >
              <cat.icon size={15} />
              {cat.name}
            </button>
          ))}
        </div>

        <div
          className="mt-10 rounded-3xl border bg-white p-8 shadow-card"
          style={{ borderColor: "rgba(220,230,242,0.8)" }}
        >
          <p className="text-base" style={{ color: "#5D8FBE" }}>
            {category.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {category.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border px-4 py-2 text-xs font-semibold"
                style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
